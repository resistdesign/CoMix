
/**
 * @name - App
 */

/**
 * @info - CoMix Application
 */

angular.module( "App", [ "PSVG" ] )
	.controller( "AppCTRL", [
		
		"$scope",
		function( scope ){
			
			/**
			 * @value true/false intro - A value designating whether or not the app is in intro mode.
			 */
			
			scope.intro = true;
			
			return this;
			
		}
		
	] );
