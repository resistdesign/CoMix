

/**
 * @info - Character Search
 */

angular.module( "App" )
	.directive( "viewsSearch", [
		
		"searchModel",
		function( searchModel ){
			
			return {
				
				restrict: "A",
				replace: true,
				scope: {},
				templateUrl: "views/search.html",
				link: function( scope, element, attrs ){
					
					// Code...
					
				}
				
			};
			
		}
		
	] );
