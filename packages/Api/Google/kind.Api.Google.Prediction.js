/**
 * H.Api.Google.Prediction kind definition
 * @requires node-google-prediction (to install: npm install node-google-prediction)
 * 
 * USAGE: 
 * 1.) Create google prediction api account, enable api access to it
 * 2.) In google api access console (https://code.google.com/apis/console/) create Service Account (Create client Id->Service Account)
 * 3.) Download provided private key file, store it securely, memorize provided password
 * 4.) Run the "openssl pkcs12 -in originalKey.p12 -out convertedKey.pem -nodes -clcerts" command supplying password when prompted
 * 5.) Supply path to generated pem file to "certificate" parameter of this kind
 * 6.) In the same api console lookup the email provided for the service account, supply it for "accountId" paramenter of this kind
 * 
 * @author: Lex Podgorny
 */

H.kind({
	name         : 'H.Api.Google.Prediction',
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
	
	_oApi                : null,
	_sAccessToken        : null,
	_sAccessTokenType    : null,
	_nAccessTokenExpires : null,
	
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
		var oThis = this;
		this._oApi.accessTokenRequest( function(sError, oData) {
			if (sError)              { throw new Error(sError); }
			if (!oData.access_token) { throw new Error('No access token found in response '); }
			if (oData.error)         { throw new Error('Token request came back with error: ' + oData.error); }
			
			oThis._sAccessToken        = oData.access_token;
			oThis._sAccessTokenType    = oData.token_type;
			oThis._nAccessTokenExpires = oData.expires_in;
			
			oThis.list(function(oData, oError) {
				console.log('List Callback');
				console.log(oData, oError);
			});
			
			// oThis.predict('languageidentifier1', 'Como estas', function(oData, oError) {
			// 	console.log('Callback');
			// 	console.log(oData, oError);
			// });
		});
	},
	
	list: function(fCallback) {
 		console.log('this._sAccessToken', this._sAccessToken);
		this._oApi.list({
			token      : this._sAccessToken,
			maxResults : 100
		}, fCallback);
	},
	
	predict: function(sModelId, sCsvData, fCallback) {
 		console.log('this._sAccessToken', this._sAccessToken);
		this._oApi.predict({
			id    : sModelId,
			token : this._sAccessToken, 
			body  : {
				input : sCsvData
			}
		}, fCallback);
	}
});