// jQuery Required

if( !com ) var com = {};
if( !com.cubehenge ) com.cubehenge = {};

com.cubehenge.CubeHengeJSON = function()
{
	
	var CUBEHENGE_AUTH_TOKEN = "CUBEHENGE_AUTH_TOKEN";
	
	var instance = this;
	
	this.gatewayURI = "./cubehenge/json.php";
	this.authToken = $.cookie( CUBEHENGE_AUTH_TOKEN );
	
	this.authAgent = "Allow.HumanTier";
	
	this.login = function( username, password, useToken, resultFunction, faultFunction )
	{
		
		var loginResult = function( data )
		{
			
			if( useToken ){
				
				instance.authToken = data;
				$.cookie( CUBEHENGE_AUTH_TOKEN, instance.authToken, { expires: 14 } );
				
			}
			
			if( resultFunction ) resultFunction( data );
			
		};
		
		var loginFault = function( data )
		{
			
			if( faultFunction ) faultFunction( data );
			
		};
		
		instance.callJSONService( instance.authAgent, "login", [ username, password, useToken ], loginResult, loginFault );
		
	};
	
	this.logout = function( resultFunction, faultFunction )
	{
		
		var logoutResult = function( data )
		{
			
			instance.authToken = undefined;
			$.cookie( CUBEHENGE_AUTH_TOKEN, instance.authToken, { expires: 14 } );
			
			if( resultFunction ) resultFunction( data );
			
		};
		
		var logoutFault = function( data )
		{
			
			if( faultFunction ) faultFunction( data );
			
		};
		
		instance.callJSONService( instance.authAgent, "logout", [], logoutResult, logoutFault );
		
	};
	
	this.callJSONService = function( service, method, args, resultFunction, faultFunction )
	{
		
		var serviceGatewayURI = instance.gatewayURI + "/" + service + "." + method;
		
		function onResult( data, status ){
			
			if( status && status.toLowerCase().indexOf( "error" ) != -1 ){
				
				if( !data.faultString ) data.faultString = data.responseText ? data.responseText : "Communication Error.";
				
				if( faultFunction != null ) faultFunction( data );
				
			}else if( data && data.faultString ){
				
				if( faultFunction != null ) faultFunction( data );
				
			}else{
				
				if( resultFunction != null ) resultFunction( data );
				
			}
			
		}
		
		$.ajax({
			type: "POST",
			url: serviceGatewayURI,
			data: { "org_cubehenge_allow_auth_token": instance.authToken, "args": args },
			dataType: "json",
			success: onResult,
			error: onResult
		});
		
	};
	
}