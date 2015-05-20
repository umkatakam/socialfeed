let Twitter  = require('twitter')
let FB = require('fb')
let Promise = require('promise')

require('songbird')

module.exports = (app, action) => {	
	let twitterConfig = app.config.auth.twitter	
	return async (req, res) => {
		let networkType = req.query.networkType
		let id = req.params.id		
		console.log("networkType", networkType)
		if (networkType === 'twitter') {
			let twitterClient = new Twitter ({
			  consumer_key: twitterConfig.consumerKey,
			  consumer_secret: twitterConfig.consumerSecret,
			  access_token_key: req.user.twitter.token,
			  access_token_secret: req.user.twitter.secret
			})
			if (action === 'like') {
				await twitterClient.promise.post('favorites/create', {id})
			} else {
				await twitterClient.promise.post('favorites/destroy', {id})
			}
		} else if (networkType === 'facebook') {
			console.log(id)
			FB.setAccessToken(req.user.facebook.token);
			let url = '/' + id + '/likes' 
			let httpAction = action === 'like' ? 'post' : 'delete'
      let response = await new Promise((resolve, reject) => FB.api(url, httpAction, resolve))
		}
		res.end()
	}
}