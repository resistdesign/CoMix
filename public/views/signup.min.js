
/**
 * @info - Sign-Up View
 */

angular.module( "App" )
	.directive( "viewsSignup", [
		
		function(){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/signup.html",
				link: function( scope, element, attrs ){
					
					// *** Values ***
					
					scope.first = undefined;
					scope.last = undefined;
					scope.email = undefined;
					
					// *** API ***
					
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
