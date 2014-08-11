
/**
 * @info - Sign-Up View
 */

angular.module( "App" )
	.directive( "viewsSignup", [
		
		"chAPI",
		function( chAPI ){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/signup.html",
				link: function( scope, element, attrs ){
					
					// *** Values ***
					
					/**
					 * @value text first - The first name of the user.
					 */
					
					scope.first = undefined;
					
					/**
					 * @value text last - The first last of the user.
					 */
					
					scope.last = undefined;
					
					/**
					 * @value text email - The email address of the user.
					 */
					
					scope.email = undefined;
					
					// *** API ***
					
					/**
					 * @function text callService - Call the service to create a new user.
					 */
					
					scope.callService = function(){
						
						if( !scope.first || !scope.last ){
							
							alert( "Please enter your first and last name." );
							
							return;
							
						}
						
						if( !scope.email ){
							
							alert( "Please enter your email address." );
							
							return;
							
						}
						
						chAPI.callService( "Marvel.CoMix", "createAccount", [ scope.first, scope.last, scope.email ], function( data ){
							
							var msg = "You will receive an email containing a link to activate your account shortly.";
							
							alert( msg );
							
							$location.path( "/login" );
							
						}, function( data ){
							
							alert( data.faultString );
							
						} );
						
					};
					
				}
				
			};
			
		}
		
	] );
