
/**
 * @info - Forgot Password View
 */

angular.module( "App" )
	.directive( "viewsForgot", [
		
		"chAPI",
		function( chAPI ){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/forgot.html",
				link: function( scope, element, attrs ){
					
					// *** Values ***
					
					/**
					 * @value text email - The email address of the user.
					 */
					
					scope.email = undefined;
					
					// *** API ***
					
					/**
					 * @function text callService - Call the service to send a password reset request email to the user.
					 */
					
					scope.callService = function(){
						
						if( !scope.email ){
							
							alert( "Please enter your email address." );
							
							return;
							
						}
						
						chAPI.callService( "Allow.HumanTier", "sendResetPasswordEmail", [ scope.email ], function( data ){
							
							var msg = "You will receive an email containing a link to reset your password shortly.";
							
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
