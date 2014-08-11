
/**
 * @info - Forgot Password View
 */

angular.module( "App" )
	.directive( "viewsForgot", [
		
		function(){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/forgot.html",
				link: function( scope, element, attrs ){
					
					// *** Values ***
					
					scope.email = undefined;
					
					// *** API ***
					
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
