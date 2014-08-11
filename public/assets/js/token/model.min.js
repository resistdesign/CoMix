
/**
 * @name - tokenModel
 */

/**
 * @info - Activation/Password Reset Token Model
 */

angular.module( "App" )
	.factory( "tokenModel", [
		
		function(){
			
			return {
				
				/**
				 * @api-value text activate - The activation token.
				 */
				
				activate: undefined,
				
				/**
				 * @api-value text reset - The password reset token.
				 */
				
				reset: undefined
				
			};
			
		}
		
	] );
