/**
 * H.Request kind definition
 * @author: Lex Podgorny
 */

H.kind({
	name: 'H.Request',
	
	// Inputs
	
	url		: '',
	method	: 'GET',
	query	: {},
	trigger : 0,
	
	// Outputs
	
	content : '',
	error	: '',
	
	send: function() {
		var oThis = this,
			oUrl = H.Url(this.url).params(this.query),
			oRequest = oUrl.request({},
				function(oResponse, sData) {
					oThis.content = sData;
				},
				function(oError) {
					oThis.error = oError.message;
				}
			);
	},
	
	onTriggerChange: function() {
		console.log('onTriggerChange');
		this.send();
	},
	
});