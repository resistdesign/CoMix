
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
				
				// *** Auth ***
				
				.when( "/login", { directives: { "main": "views-login" } } )
				.when( "/activate/:token", { directives: { "main": "views-activate" } } )
				.when( "/reset/:token", { directives: { "main": "views-reset" } } )
				.when( "/forgot", { directives: { "main": "views-forgot" } } )
				.when( "/signup", { directives: { "main": "views-signup" } } )
				
				// *** Main App Views ***
				
				.when( "/collections", { directives: { "main": "views-collections" } } )
				.when( "/show", { directives: { "main": "views-show" } } )
				
				// *** Default ***
				
				.otherwise( { main: true, directives: { "main": "" } } );
			
		}
		
	] )
	.controller( "AppCTRL", [
		
		"$scope", "$location", "$rootScope", "$route",
		function( scope, $location, $rootScope, $route ){
			
			/**
			 * @value true/false intro - A value designating whether or not the app is in intro mode.
			 */
			
			scope.intro = true;
			
			var setIntro = function(){
				
				scope.intro = !$route.current || $route.current.main;
				
			};
			
			// *** Path ***
			
			$rootScope.$on( "$routeChangeSuccess", function( event, data ){
				
				setIntro();
				
			} );
			
			// *** Return Controller ***
			
			return this;
			
		}
		
	] );
