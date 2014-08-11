
/**
 * @name - marvelAPI
 */

/**
 * @info - Marvel API
 */

angular.module( "App" )
	.factory( "marvelAPI", [
		
		"$http",
		function( $http ){
			
			var URI = "http://gateway.marvel.com:80";
			
			var API_TOKEN = "7d07dfa5c01380ec4f864177019a7e8b";
			
			return {
				
				/**
				 * @api-function nothing get - Make a `GET` request to the Marvel API.
				 * 
				 * @arg text endpoint - The RESTful endpoint.
				 * @arg object query - The URL query parameters represented as key/value pairs.
				 * @arg Function success - The function to call upon success. Will receive `data, status, headers, config`
				 * @arg Function error - The function to call when there is an error. Will receive `data, status, headers, config`
				 */
				
				get: function( endpoint, query, success, error ){
					
					query = query || {};
					
					query.apikey = API_TOKEN;
					
					$http( {
						
						method: "GET",
						url: URI + endpoint,
						params: query
						
					} ).success( success ).error( error );
					
				}
				
			};
			
		}
		
	] );
