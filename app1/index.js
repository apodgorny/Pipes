var H = require('../H');

H.require(
	'packages/Api/Google',
	'packages/Web'
);

var oGoogle = H.Api.Google.construct({
	clientId     : '',
	clientSecret : ''
});
	
oGoogle.connect();
