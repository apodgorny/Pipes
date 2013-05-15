/**
 * H.Api.Google kind definition
 * @author: Lex Podgorny
 */

H.kind({
	name: 'H.Api.Google',
	accountId    : null,                          //The Service Account email. Check your Gogole Console -> API Access,
	certificate  : null,                          //Absolute path to the service account private key (in .pem format)
	insertFields : [
		'created',
		'id',
		'kind',
		'modelInfo',
		'modelType',
		'selfLink',
		'storageDataLocation',
		'storagePMMLLocation',
		'storagePMMLModelLocation',
		'trainingComplete',
		'trainingInstances',
		'trainingStatus',
		'utility'
	],
	
	events: {
		connected : function(sToken) { return { token: sToken }; },
		expire    : '',
		error     : function(sError) { return { error: sError }; }
	},
	
	/********* PRIVATE ***********/
	
	_sAccessToken        : null,
	_sAccessTokenType    : null,
	_nAccessTokenExpires : null,
	_bRequestPending     : false,
	_oSleep              : require('sleep'),
	_oApi                : null,
	
	_getCurrentSeconds: function() {
		return new Date().getTime() / 1000;
	},
	
	_requestNewToken: function() {
		var oThis      = this,
			bHasErrors = false;
			
		this._bRequestPending = true;
		this._oApi.accessTokenRequest(function(sError, oData) {
			console.log('RESPONSE:', sError, oData);
			oThis._bRequestPending = false;
			oThis._sAccessToken        = oData.access_token;
			oThis._sAccessTokenType    = oData.token_type;
			oThis._nAccessTokenExpires = oThis._getCurrentSeconds() + oData.expires_in;
			oThis.emitConnected(oThis._sAccessToken);
			console.log('Set to expire in', oData.expires_in);
			setTimeout(function() {
				oThis.emitExpire();
			}, oData.expires_in);
		});
		
		console.log('Done');
	},
	
	/********* PUBLIC ***********/
	
	onConstruct: function() {
		var oApiClass = require('node-google-prediction');
		
		this._oApi = new oApiClass({
			claimSetISS        : this.accountId,
			path               : this.certificate,
			modelInsertFields  : this.insertFields.join(',')
		});
			
		console.log('construct');
	},
	
	connect: function() {
		this._requestNewToken();
	}
});