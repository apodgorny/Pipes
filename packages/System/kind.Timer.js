H.kind(
	'H.Timer', {
		interval : 1000,
		count 	 : 0,
		
		events: {
			TIMER: function(nCount) {
				return {
					conunt: nCount
				}
			}
		},
		
		/****** PRIVATE ********/
		
		_bEnabled: false,

		_onTimer: function(bReset) {
			if (!this._bEnabled) { return; }
			
			if (bReset) { this.count = 0; } 
			else 		{ this.count ++;  }
			
			this.emitTimer(this.count);
			
			var oThis = this;
			setTimeout(function() { oThis._onTimer(); }, this.interval);
		},
		
		/************************/
		
		start: function(bReset) {
			this._bEnabled = true;
			this._onTimer(bReset);
		},
		
		stop: function() {
			this._bEnabled = false;
		},
		
		onCountChange: function() {
			console.log('original', this.kindName);
		}
	}
);