

/**
 * @info - Colections View
 */

angular.module( "App" )
	.directive( "viewsCollections", [
		
		"marvelAPI", "chAPI",
		function( marvelApi, chAPI ){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/collections.html",
				link: function( scope, element, attrs ){
					
					// *** Values ***
					
					scope.tempTerm = "Spider";
					
					scope.term = "";
					
					scope.searchResults = undefined;
					
					scope.collections = undefined;
					
					scope.selectedCharacters = undefined;
					
					scope.selectedCollection = undefined;
					
					// *** API ***
					
					scope.setSelectedCollection = function( collection ){
						
						scope.selectedCollection = collection;
						
					};
					
					scope.addCharacterToCollection = function( collection, character ){
						
						var currentChars = collection.characters || "";
						
						var charList = currentChars.split( "," );
						
						for( var k in charList ){
							
							var id = charList[ k ];
							
							if( id === character.id ){
								
								return;
								
							}
							
						}
						
						charList.push( character.id );
						
						collection.characters = charList.join( "," );
						
						scope.updateCollection( collection );
						
					};
					
					scope.removeCharacterFromCollection = function( collection, characterId ){
						
						var currentChars = collection.characters || "";
						
						var charList = currentChars.split( "," );
						
						var newChars = [];
						
						var charRemoved = false;
						
						for( var k in charList ){
							
							var id = charList[ k ];
							
							if( id === characterId ){
								
								charRemoved = true;
								
							}else{
								
								newChars.push( id );
								
							}
							
						}
						
						if( charRemoved ){
							
							collection.characters = newChars.join( "," );
							
							scope.updateCollection( collection );
							
						}
						
					};
					
					scope.newCollection = function(){
						
						var name = prompt( "Enter a name for your new collection.", "" );
						
						if( name ) scope.createCollection( name );
						
					};
					
					scope.createCollection = function( name ){
						
						chAPI.callService( "Marvel.CoMix", "createCollection", [ name ], function( data ){
							
							scope.listCollections();
							
						}, function( data ){
							
							alert( data.faultString );
							
						} );
						
					};
					
					scope.removeCollection = function( collection ){
						
						var ok = confirm( "Are you sure you want to remove the collection '" + collection.name + "'?" );
						
						if( !ok ) return;
						
						chAPI.callService( "Marvel.CoMix", "removeCollection", [ collection ], function( data ){
							
							scope.listCollections();
							
							scope.selectedCollection = undefined;
							
						}, function( data ){
							
							alert( data.faultString );
							
						} );
						
					};
					
					scope.updateCollection = function( collection ){
						
						chAPI.callService( "Marvel.CoMix", "updateCollection", [ collection ], function( data ){
							
							// Ignore.
							
						}, function( data ){
							
							alert( data.faultString );
							
						} );
						
					};
					
					scope.listCollections = function(){
						
						chAPI.callService( "Marvel.CoMix", "listCollections", [], function( data ){
							
							scope.collections = data.data;
							
						}, function( data ){
							
							alert( data.faultString );
							
						} );
						
					};
					
					scope.searchByName = function( term ){
						
						if( undefined === typeof term || term === "" ) return;
						
						marvelApi.get( "/v1/public/characters", {
							
							nameStartsWith: term,
							orderBy: "name",
							limit: 100,
							offset: 3
							
						}, function( data, status, headers, config ){
							
							scope.searchResults = data.data.results;
							
						}, function( data, status, headers, config ){
							
							// Ignore.
							
						} );
						
					};
					
					// *** Watch ***
					
					var termTimeout = undefined;
					
					var invalidateTempTerm = function(){
						
						clearTimeout( termTimeout );
						
						termTimeout = setTimeout( function(){
							
							scope.$evalAsync( function(){
								
								scope.term = scope.tempTerm;
								
							} );
							
						}, 1000 );
						
					};
					
					var unwatchTempTerm = scope.$watch( "tempTerm", function( newValue, oldValue ){
						
						invalidateTempTerm();
						
					} );
					
					var unwatchTerm = scope.$watch( "term", function( newValue, oldValue ){
						
						scope.searchByName( newValue );
						
					} );
					
					var unwatchSelectedCollection = scope.$watch( "selectedCollection", function( newValue, oldValue ){
						
						if( newValue ){
							
							var chars = newValue.characters || "";
							
							var newCharList = chars.split( "," );
							
							var cleanCharList = [];
							
							for( var k in newCharList ){
								
								var currNewChar = newCharList[ k ];
								
								if( currNewChar !== "" ){
									
									cleanCharList.push( currNewChar );
									
								}
								
							}
							
							scope.selectedCharacters = cleanCharList;
							
						}else{
							
							scope.selectedCharacters = undefined;
							
						}
						
					}, true );
					
					// *** Destroy ***
					
					scope.$on( "$destroy", function(){
						
						unwatchTempTerm();
						unwatchTerm();
						unwatchSelectedCollection();
						
					} );
					
					// *** Initialize ***
					
					scope.listCollections();
					
				}
				
			};
			
		}
		
	] );
