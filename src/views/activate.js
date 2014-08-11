

/**
 * @info - Activation View
 */

angular.module( "App" )
	.directive( "viewsActivate", [
		
		"$routeParams", "tokenModel", "$location",
		function( $routeParams, tokenModel, $location ){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/activate.html",
				link: function( scope, element, attrs ){
					
					// *** Token ***
					
					tokenModel.activate = $routeParams.token;
					
					// *** Create Password ***
					
					$location.path( "/reset/" + tokenModel.activate );
					
				}
				
			};
			
		}
		
	] );
