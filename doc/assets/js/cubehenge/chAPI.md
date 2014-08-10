# chAPI

### A factory used to access the CubeHenge JSON Gateway.


#### Settings



#### Externally Accessible Values



#### Externally Accessible Functions

1. `login(username,password,useToken,resultFunction,faultFunction)` (nothing) - Login to CubeHenge.

 - `username` (text) - The name of the user logging in.
 - `password` (text) - The user's password.
 - `useToken` (true/false) - A value designating whether or not to use an authentication token.
 - `resultFunction` (Function) - The function to be called upon a successful response. Will receive: `data`
 - `faultFunction` (Function) - The function to be called upon a failed response. Will receive: `data`

1. `logout(resultFunction,faultFunction)` (nothing) - Logout of CubeHenge.

 - `resultFunction` (Function) - The function to be called upon a successful response. Will receive: `data`
 - `faultFunction` (Function) - The function to be called upon a failed response. Will receive: `data`

1. `callService(service,method,args,resultFunction,faultFunction)` (nothing) - Call a CubeHenge service.

 - `service` (text) - The name of the service to call.
 - `method` (text) - The method to be called.
 - `args` (list) - A list of arguments to pass to the service.
 - `resultFunction` (Function) - The function to be called upon a successful response. Will receive: `data`
 - `faultFunction` (Function) - The function to be called upon a failed response. Will receive: `data`



#### Internally Accessible Values



#### Internally Accessible Functions


