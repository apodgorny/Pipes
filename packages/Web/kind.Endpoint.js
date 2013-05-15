H.kind(
	'H.Endpoint', {
		path : '',
		url  : null,
		
		onConstruct: function() {
			H.Server.start();
			this.url = H.Server.createEndpoint(this.path, this, this.onRequest);
		},
		
		onRequest: function(oUrl) {
			var oParams = oUrl.params(),
				sParam;
				
			for (sParam in oParams) {
				console.log('PARAM', sParam, oParams[sParam]);
				if (H.isDefined(this[sParam])) {
					this[sParam] = oParams[sParam];
				}
			}
		}
	}
);