

/**
 * @info - Reset Password View
 */

angular.module( "App" )
	.directive( "viewsReset", [
		
		"$routeParams", "tokenModel", "$location", "chAPI",
		function( $routeParams, tokenModel, $location, chAPI ){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/reset.html",
				link: function( scope, element, attrs ){
					
					// *** Token ***
					
					var resetMode = undefined === typeof tokenModel.activate
					var token = tokenModel.activate || $routeParams.token;
					tokenModel.reset = resetMode ? undefined : $routeParams.token;
					
					// *** Values ***
					
					scope.password = undefined;
					
					scope.confirmedPassword = undefined;
					
					// *** API ***
					
					var method = resetMode ? "resetPasswordForUser" : "activateUser";
					
					scope.callService = function(){
						
						if( !scope.password ){
							
							alert( "Please enter a new password." );
							
							return;
							
						}
						
						if( scope.password !== scope.confirmedPassword ){
							
							alert( "Passwords do not match." );
							
							return;
							
						}
						
						chAPI.callService( "Allow.HumanTier", method, [ token, scope.password ], function( data ){
							
							var msg = resetMode ? "Your password has been reset." : "Your account has been activated.";
							
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
