
/**
 * @info - Nova Cast hover fx.
 */
 
 /**
 * @info - Notes: Sets initial opacity of frames to 0 for a clean entrance and then to 1 once all frames are initially hidden.
 */

angular.module( "App" )
	.directive( "fxHoverAnimate", [
		
		function(){
			
			return {
				
				restrict: "A",
				link: function( scope, element, attrs ){
					
					// *** Setup ***
					
					/**
					 * @setting nothing anim-frame - Add this to child objects to designate them as animation frames.
					 */
					
					var frames = element.children( "*[anim-frame]" );
					
					frames.hide();
					frames.css( "opacity", 1 );
					
					var lastFrame = 0;
					
					// *** Listen ***
					
					var nextFrame = function(){
						
						frames.hide();
						
						angular.element( frames[ lastFrame ] ).show();
						
						lastFrame++;
						
						if( lastFrame < frames.length ){
							
							setTimeout( nextFrame, 1000 / 30 );
							
						}else{
							
							setTimeout( function(){
								
								frames.hide();
								
							}, 1000 / 30 );
							
							lastFrame = 0;
							
						}
						
					};
					
					var onHover = function( event ){
						
						if( frames.length > 0 ) nextFrame();
						
					};
					
					element.bind( "mouseover", onHover );
					
					// *** Destroy ***
					
					scope.$on( "$destroy", function(){
						
						element.unbind( "mouseover", onHover );
						
					} );
					
				}
				
			};
			
		}
		
	] );
