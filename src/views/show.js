

/**
 * @info - Show all views in pinium.
 */

angular.module( "App" )
	.directive( "viewsShow", [
		
		"chAPI", "$location", "searchModel", "viewModel", "psvgEventTypes",
		function( chAPI, $location, searchModel, viewModel, psvgEventTypes ){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/show.html",
				link: function( scope, element, attrs ){
					
					// *** Child Elements ***

					var contentScroller = element.find( ".content-scroller" );
					
					// *** Display Mode Animation ***
					
					var animateScroll = function(){
						
						contentScroller.stop();

						if( viewModel.displayMode ){
							
							var getContentWidth = function(){

								var lastChild = contentScroller.children().last();
								var lcBBox = lastChild[ 0 ].getBoundingClientRect();

								var contentWidth = lcBBox.left + lcBBox.width;

								contentWidth = contentWidth - contentScroller[ 0 ].clientWidth;
								
								return contentWidth;
								
							};
							
							contentScroller.animate( { scrollLeft: 0 }, 500, function(){

								contentScroller.animate( { scrollLeft: -100 }, 2000, "linear", function(){
									
									var contentWidth = getContentWidth();
									
									var duration = ( contentWidth / 100 ) * 1000;
									
									contentScroller.animate( { scrollLeft: contentWidth }, duration, "linear", function(){

										contentScroller.animate( { scrollLeft: contentWidth + 100 }, 2000, "linear", function(){

											animateScroll();

										} );

									} );

								} );
								
							} );
							
						}
						
					};
					
					// *** Voice Control ***

					var voiceRec;

					if( "webkitSpeechRecognition" in window ){

						voiceRec = new webkitSpeechRecognition();
						voiceRec.continuous = true;
						voiceRec.interimResults = true;
						
						voiceRec.onstart = function(){
							
							scope.$evalAsync( function(){
								
								scope.listening = true;
								
							} );
							
						};

						voiceRec.onend = function(){

							scope.$evalAsync( function(){

								scope.listening = false;

							} );

						};

						voiceRec.onresult = function( event ){

							scope.$evalAsync( function(){

								var newTerms = [];

								for( var i = event.resultIndex; i < event.results.length; i++ ){

									var currRes = event.results[ i ];

									if( currRes.isFinal ){

										var currResTran = currRes[ 0 ].transcript;

										if( currResTran ) newTerms.push( currResTran );

									}

								}

								var newTermStr = newTerms.join( " " );

								while( newTermStr.length && newTermStr.indexOf( " " ) === 0 ){

									newTermStr = newTermStr.substr( 1, newTermStr.length );

								}

								if( newTermStr.toLowerCase() === "show me everything" ){

									scope.liveSearchTerm = "";

									return;

								}

								if( newTermStr ) scope.liveSearchTerm = newTermStr;

							} );

						};

					}

					// *** Helpers ***
					
					var getViewGroups = function( viewList ){

						var viewsGroup = {

							label: "Views",
							children: [],
							"class": "view-bg"

						};

						var toolsGroup = {

							label: "Tools",
							children: [],
							"class": "tool-bg"
							
						};
						
						var deprecatedGroup = {

							label: "Deprecated",
							children: [],
							"class": "deprecated-bg"

						};
						
						var allViewGroups = [ viewsGroup, toolsGroup ];
						
						var processMap = {};
						
						for( var k in viewList ){
							
							var view = viewList[ k ];
							
							if( view.phase === "Deprecated" ){
								
								deprecatedGroup.children.push( view );
								
							}else{

								if( view.type === "Task" ){

									var process = view.process;

									var processObj = processMap[ process ] || {

										label: process,
										children: [],
										"class": "process-bg"

									};

									processMap[ process ] = processObj;

									processObj.children.push( view );

								}else{

									if( view.type === "View" ){

										viewsGroup.children.push( view );

									}else{

										toolsGroup.children.push( view );

									}

								}
								
							}
							
						}

						function compareByTaskOrder( a, b )
						{
							if ( a.taskorder < b.taskorder )
								return -1;
							if ( a.taskorder > b.taskorder )
								return 1;
							return 0;
						}
						
						for( var l in processMap ){
							
							var procObj = processMap[ l ];
							
							procObj.children.sort( compareByTaskOrder );
							
							allViewGroups.push( procObj );
							
						}

						function compareByModule( a, b )
						{
							if( a.modules && a.modules[0] && b.modules && b.modules[0] ){
								if ( a.modules[0].name < b.modules[0].name )
									return -1;
								if ( a.modules[0].name > b.modules[0].name )
									return 1;
							}
							return 0;
						}

						toolsGroup.children.sort( compareByModule );
						deprecatedGroup.children.sort( compareByModule );
						
						allViewGroups.push( deprecatedGroup );
						
						return allViewGroups;
						
					};
					
					var autoRefreshTimeout = undefined;
					var liveSearchTermTimeout = undefined;
					
					var triggerAutoRefresh = function(){

						clearTimeout( autoRefreshTimeout );

						autoRefreshTimeout = setTimeout( function(){

							// Refresh every 5 minutes.

							scope.search( scope.searchTerm );

						}, 30 * 1000 );
						
					};
					
					var syncSearchTerms = function(){

						scope.$evalAsync( function(){
							
							searchModel.term = scope.liveSearchTerm;
							
							searchModel.timestamp = new Date().getTime();
							
							scope.searchTerm = scope.liveSearchTerm;
							
							triggerAutoRefresh();

						} );

					};
					
					var invalidateLiveSearchTerm = function(){
						
						clearTimeout( liveSearchTermTimeout );
						
						liveSearchTermTimeout = setTimeout( syncSearchTerms, 1000 );
						
					};
					
					// *** Values ***
					
					scope.viewModel = viewModel;
					
					scope.viewGroups = undefined;
					
					scope.searchTerm = searchModel.term;
					
					scope.liveSearchTerm = searchModel.term;
					
					scope.listening = false;
					
					// *** API ***
					
					scope.startVoice = function(){

						try{

							if( voiceRec ) voiceRec.start();
							
						}catch( err ){
							
							// Ignore.
							
						}
						
					};

					scope.stopVoice = function(){

						try{

							if( voiceRec ) voiceRec.stop();

						}catch( err ){

							// Ignore.

						}

					};
					
					scope.toggleVoice = function(){
						
						if( scope.listening ){
							
							scope.stopVoice();
							
						}else{
							
							scope.startVoice();
							
						}
						
					};

					scope.search = function( term ){
						
						triggerAutoRefresh();
						
						chAPI.callService( "PiniumViews.PiniumViews", "getAllViews", [ term ], function( data ){
							
							scope.viewGroups = getViewGroups( data.data );
							
						}, function( data ){
							
							alert( data.faultString );
							
						} );
						
					};
					
					scope.open = function( id ){

						$location.path( "/details/" + id );
						
					};
					
					// *** Watch ***

					var unwatchSearchTerm = scope.$watch( "searchTerm", function( newValue, oldValue ){

						scope.search( scope.searchTerm );

					} );

					var unwatchLiveSearchTerm = scope.$watch( "liveSearchTerm", function( newValue, oldValue ){
						
						invalidateLiveSearchTerm();
						
					} );
					
					var unwatchDisplayMode = scope.$watch( "viewModel.displayMode", function( newValue, olvValue ){
						
						setTimeout( animateScroll, 0 );
						
					} );
					
					// *** Destroy ***

					var cleanupDisplayModeAnimation = function(){

						unwatchDisplayMode();
						contentScroller.stop();

					};
					
					var destroy = function(){

						unwatchSearchTerm();
						unwatchLiveSearchTerm();

						cleanupDisplayModeAnimation();

						if( voiceRec ) voiceRec.stop();
						voiceRec = undefined;

						clearTimeout( autoRefreshTimeout );

						element.unbind( psvgEventTypes.LAYOUT_CHANGED, onLayoutChanged );
						
					};
					
					var onLayoutChanged = function(){
						
						if( element.parent().length < 1 ) destroy();
						
					};
					
					scope.$on( "$destroy", function(){

						destroy();
						
					} );

					// IMPORTANT: Destroy on removal.
					element.bind( psvgEventTypes.LAYOUT_CHANGED, onLayoutChanged );
					
					// *** Initialize ***
					
					contentScroller.mousewheel( function( event, delta ) {

						this.scrollLeft -= ( delta * 30 );

						event.preventDefault();

					} );
					
				}
				
			};
			
		}
		
	] );

