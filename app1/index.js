var H = require('../H');

H.require(
	'packages/Api/Google',
	'packages/Web'
);

var oGoogle = H.Api.Google.construct({
	clientId     : '7122539847.apps.googleusercontent.com',
	clientSecret : 'myfTKyOas_gEeE1BMBK4u-29'
});
	
oGoogle.connect();