
/**
 * @info - The login view
 */

/**
 * @tags - Login
 */

angular.module( "App" )
	.directive( "viewsLogin", [
		
		"chAPI", "$location",
		function( chAPI, $location ){
			
			var CS_TOOLS_EMAIL = "CS_TOOLS_EMAIL";
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/login.html",
				link: function( scope, element, attrs ){
					
					// *** Values ***
					
					/**
					 * @value object user - The user object.
					 * */
					
					/**
					 * @value text user.email - The email address of the user.
					 * */
					
					scope.user = {
						
						email: angular.element.cookie( CS_TOOLS_EMAIL )
						
					};
					
					// *** API ***
					
					/**
					 * @function nothing login - Login.
					 * */
					
					scope.login = function(){
						
						// Clear stored email.
						angular.element.cookie( CS_TOOLS_EMAIL, undefined, { expires: 14 } );
						
						chAPI.login( scope.user.email, scope.user.password, true, function( data ){

							// Store email.
							angular.element.cookie( CS_TOOLS_EMAIL, scope.user.email, { expires: 14 } );

							// Go to show.
							$location.path( "/collections" );
							
						}, function( data ){
							
							alert( data.faultString );
							
						} );
						
					};
					
				}
				
			};
			
		}
		
	] );
