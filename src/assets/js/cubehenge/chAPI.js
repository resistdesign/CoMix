
/**
 * @name - chAPI
 * */

/**
 * @info - A factory used to access the CubeHenge JSON Gateway.
 * */

/**
 * @tags - CubeHenge JSON API
 * */

angular.module( "App" )
	.factory( "chAPI", [
		
		"$rootScope",
		function( $rootScope ){
			
			var ch = new com.cubehenge.CubeHengeJSON();
			ch.gatewayURI = "/cubehenge/json.php";
			
			var updateRootScope = function( functionRef, args ){

				if( "function" === typeof functionRef ){

					$rootScope.$evalAsync( function(){
						
						functionRef.apply( this, args );
						
					} );
					
				}
				
			};
			
			var chAPI = {
				
				/**
				 * @api-function nothing login - Login to CubeHenge.
				 * 
				 * @arg text username - The name of the user logging in.
				 * @arg text password - The user's password.
				 * @arg true/false useToken - A value designating whether or not to use an authentication token.
				 * @arg Function resultFunction - The function to be called upon a successful response. Will receive: `data`
				 * @arg Function faultFunction - The function to be called upon a failed response. Will receive: `data`
				 * */
				
				login: function( username, password, useToken, resultFunction, faultFunction ){
					
					ch.login( username, password, useToken, function(){
						
						updateRootScope( resultFunction, arguments );
						
					}, function(){

						updateRootScope( faultFunction, arguments );
						
					} );
					
				},

				/**
				 * @api-function nothing logout - Logout of CubeHenge.
				 *
				 * @arg Function resultFunction - The function to be called upon a successful response. Will receive: `data`
				 * @arg Function faultFunction - The function to be called upon a failed response. Will receive: `data`
				 * */

				logout: function( resultFunction, faultFunction ){

					ch.logout( function(){

						updateRootScope( resultFunction, arguments );

					}, function(){

						updateRootScope( faultFunction, arguments );

					} );
					
				},

				/**
				 * @api-function nothing callService - Call a CubeHenge service.
				 *
				 * @arg text service - The name of the service to call.
				 * @arg text method - The method to be called.
				 * @arg list args - A list of arguments to pass to the service.
				 * @arg Function resultFunction - The function to be called upon a successful response. Will receive: `data`
				 * @arg Function faultFunction - The function to be called upon a failed response. Will receive: `data`
				 * */

				callService: function( service, method, args, resultFunction, faultFunction ){

					ch.callJSONService( service, method, args, function(){

						updateRootScope( resultFunction, arguments );

					}, function(){

						updateRootScope( faultFunction, arguments );

					} );
					
				}
				
			};
			
			return chAPI;
			
		}
		
	] );
