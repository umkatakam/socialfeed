let Twitter  = require('twitter')
let FB = require('fb')
let Promise = require('promise')

require('songbird')

module.exports = (app) => {
	let twitterConfig = app.config.auth.twitter	
	return async (req, res) => {
		let networkType = req.query.networkType
		let id = req.params.id
		let reply = req.body.reply
		if(!reply) {
			return req.flash('error', 'Status cannot be empty')
		}
		if(networkType === 'twitter') {
			if(reply.length > 140) {
				return req.flash('error', 'Status is over 140 characters')
			}
			let twitterClient = new Twitter({
	          consumer_key: twitterConfig.consumerKey,
	          consumer_secret: twitterConfig.consumerSecret,
	          access_token_key: req.user.twitter.token,
	          access_token_secret: req.user.twitter.secret
	      	})

			await twitterClient.promise.post('statuses/update', {
			  status: reply,
			  in_reply_to_status_id: id
			})
		} else if(networkType === 'facebook'){
			console.log(id, reply)
		} else {
			return req.flash('error', 'Invalid networkType') 
		}
		res.redirect('/timeline')
	}
}