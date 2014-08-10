

/**
 * @info - Apply a CSS class after a timeout in milliseconds.
 */

angular.module( "App" )
	.directive( "classWithTimeout", [
		
		function(){
			
			return {
				
				restrict: "A",
				link: function( scope, element, attrs ){
					
					/**
					 * @setting text:number class-with-timeout - The CSS class to apply followed by the number of milliseconds to wait before applying the class. Example: `css-class-name:3000`
					 */
					
					var params = attrs.classWithTimeout.split( ":" );
					
					var className = params[ 0 ];
					var ms = parseFloat( params[ 1 ] );
					
					setTimeout( function(){
						
						element.addClass( className );
						
					}, ms );
					
				}
				
			};
			
		}
		
	] );
