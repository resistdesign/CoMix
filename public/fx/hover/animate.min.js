
/**
 * @info - Animate child objects as frames on hover.
 */
 
 /**
 * @info - Notes: Sets initial opacity of frames to 0 for a clean entrance and then to 1 once all frames are initially hidden.
 */

angular.module( "App" )
	.directive( "fxHoverAnimate", [
		
		"isSet",
		function( isSet ){
			
			return {
				
				restrict: "A",
				link: function( scope, element, attrs ){
					
					// *** Setup ***
					
					/**
					 * @setting number fx-hover-animate - The number of times to repeat the animation each time a user hovers the target object.
					 */
					
					var repeat = isSet( attrs.fxHoverAnimate ) ? parseFloat( attrs.fxHoverAnimate ) : 0;
					
					/**
					 * @setting number fx-fps - The number of **frames per second** for the animation.
					 */
					
					var fps = isSet( attrs.fxFps ) ? parseFloat( attrs.fxFps ) : 30;
					
					/**
					 * @setting nothing anim-frame - Add this to child objects to designate them as animation frames.
					 */
					
					var frames = element.children( "*[anim-frame]" );
					
					frames.hide();
					frames.css( "opacity", 1 );
					
					var lastFrame = 0;
					var currentRepeatCount = 0;
					var stop = false;
					
					// *** Listen ***
					
					var timePerFrame = 1000 / fps;
					
					var nextFrame = function(){
						
						frames.hide();
						
						if( stop ){
							
							lastFrame = 0;
							
							return;
							
						}
						
						angular.element( frames[ lastFrame ] ).show();
						
						lastFrame++;
						
						if( lastFrame < frames.length ){
							
							setTimeout( nextFrame, timePerFrame );
							
						}else{
							
							setTimeout( function(){
								
								frames.hide();
								
							}, 1000 / 30 );
							
							lastFrame = 0;
							
							if( currentRepeatCount > 0 ){
								
								currentRepeatCount--;
								
								setTimeout( nextFrame, timePerFrame );
								
							}
							
						}
						
					};
					
					var onHover = function( event ){
						
						if( frames.length > 0 ){
							
							stop = false;
							
							currentRepeatCount = repeat;
							
							nextFrame();
							
						}
						
					};
					
					var onLeave = function( event ){
						
						stop = true;
						
					};
					
					element.bind( "mouseover", onHover );
					element.bind( "mouseout", onLeave );
					
					// *** Destroy ***
					
					scope.$on( "$destroy", function(){
						
						element.unbind( "mouseover", onHover );
						element.unbind( "mouseout", onLeave );
						
					} );
					
				}
				
			};
			
		}
		
	] );
