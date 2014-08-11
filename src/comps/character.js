

/**
 * @info - Character Display
 */

angular.module( "App" )
	.directive( "compsCharacter", [
		
		"marvelAPI",
		function( marvelAPI ){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {
					
					/**
					 * @setting object/number character - The character object to display or the `id` of the character to fetch and display.
					 */
					
					character: "=?"
					
				},
				templateUrl: "comps/character.html",
				link: function( scope, element, attrs ){
					
					// *** Values ***
					
					scope.displayCharacter = undefined;
					
					// *** Watch ***
					
					var unwatchCharacter = scope.$watch( "character", function( newValue, oldValue ){
						
						if( "object" === typeof scope.character ){
							
							scope.displayCharacter = scope.character;
							
						}else{
							
							marvelAPI.get( "/v1/public/characters/" + scope.character, {}, function( data ){
								
								scope.displayCharacter = data.data.results[ 0 ];
								
							}, function( data ){
								
								// Ignore.
								
							} );
							
						}
						
					} );
					
					// *** Destroy ***
					
					scope.$on( "$destroy", function(){
						
						unwatchCharacter();
						
					} );
					
				}
				
			};
			
		}
		
	] );
