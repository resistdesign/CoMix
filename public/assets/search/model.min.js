
angular.module( "App" )
	.factory( "searchModel", [
		
		function(){
			
			var searchModel = {
				
				term: "",
				
				timestamp: new Date().getTime()
				
			};
			
			return searchModel;
			
		}
		
	] );
