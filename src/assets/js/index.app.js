
/**
 * @name - App
 */

/**
 * @info - CoMix Application
 */

angular.module( "App", [ "PSVG", "ngRoute" ] )
	.config( [
		
		"$routeProvider",
		function( $routeProvider ){
			
			$routeProvider
				
				// *** Main App Views ***
				
				.when( "/login", { directives: { "main": "views-login" } } )
				.when( "/search", { directives: { "main": "views-search" } } )
				
				// *** Default ***
				
				.otherwise( "/" );
			
		}
		
	] )
	.controller( "AppCTRL", [
		
		"$scope", "$location",
		function( scope, $location ){
			
			/**
			 * @value true/false intro - A value designating whether or not the app is in intro mode.
			 */
			
			scope.intro = $location.path() && $location.path() !== "/" ? false : true;
			
			// *** Setup ***
			
			return this;
			
		}
		
	] );
