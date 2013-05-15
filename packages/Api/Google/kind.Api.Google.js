/**
 * H.Api.Google kind definition
 * @author: Lex Podgorny
 */

H.kind({
	name         : 'H.Api.Google',
	callbackPath : 'google/oauth2callback',
	clientId     : null,                          // To be set at construct
	clientSecret : null,                          // To be set at construct
	
	components : [
		{
			name          : 'endpoint1',
			kind          : 'H.Endpoint',
			token         : '',
			path          : H.setTo('callbackPath'),
			onTokenChange : H.setTo('onToken')
		}
	],
	
	onConstruct: function() {
		this.inherited();
		this.passport = require('passport'),
		console.log(this.kindName, 'is awaiting oauth callback at', this.$.endpoint1.url);
	},
	
	connect: function() {
		var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
		console.log('Connecting...');
		this.passport.use(new GoogleStrategy({
			clientID     : this.clientId,
			clientSecret : this.clientSecret,
			callbackURL  : this.$.endpoint1.url,
		}, function(accessToken, refreshToken, profile, done) {
			console.log('accessToken');
			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
			// 	return done(err, user);
			// });
		})
	);
	},
	
	onToken: function(oEvent) {
		console.log('onToken', oEvent.newValue);
	},
	
	disconnect: function() {
	}
});