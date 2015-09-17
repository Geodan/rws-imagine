var cowconfig_geodan ={
	key: 'imagine',
	protocol:'wss',
	url:'websocket.geodan.nl', 
	port:443,
	dir: 'imagine'
  };
          
var cowconfig_local ={
	key: 'imagine',
	protocol:'ws',
	url:'192.168.207.101', 
	port:8081
  };

//Set the correct config here
window.cowconfig = cowconfig_geodan;