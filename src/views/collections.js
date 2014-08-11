

/**
 * @info - Colections View
 */

angular.module( "App" )
	.directive( "viewsCollections", [
		
		function(){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/collections.html",
				link: function( scope, element, attrs ){
					
					
					
				}
				
			};
			
		}
		
	] );
