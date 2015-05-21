let Twitter  = require('twitter')
let FB = require('fb')
let Promise = require('promise')

require('songbird')

module.exports = (app) => {
	let twitterConfig = app.config.auth.twitter	
	
	return async (req, res) => {
		let networkName = req.query.networkType

		if(!req.body && !networkName){
		    throw Error('Invalid network name')
		}
		let id = req.params.id
		let text = req.body.text;
		if(networkName === 'twitter') {
		let twitterClient = new Twitter({
		  consumer_key: twitterConfig.consumerKey,
		  consumer_secret: twitterConfig.consumerSecret,
		  access_token_key: req.user.twitter.token,
		  access_token_secret: req.user.twitter.secret
		})

		if (text.length > 140) {
		    return req.flash('error', 'Status is over 140 characters')
		}
		if (!text.length) {
		    return req.flash('error', 'Status cannot be empty')
		}                
		let twitRes = await twitterClient.promise.post('statuses/retweet/' + id, {text})          
		} else {
		  let shareLink = req.body.shareLink;
		  FB.setAccessToken(req.user.facebook.token);      
		  let response = await new Promise((resolve, reject) => FB.api('me/feed', 'post', { link: shareLink, message: text || "test share"}, resolve))                
		}
		    
		res.redirect('/timeline')
	}
}