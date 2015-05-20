let Twitter  = require('twitter')
let FB = require('fb')
let Promise = require('promise')

require('songbird')

module.exports = (app) => {
	let twitterConfig = app.config.auth.twitter	

	return async (req, res) => {
		let status = req.body.reply
    let networkType = req.body.networkType
    
    if (!networkType) {
      return req.flash('error', 'Invalid network type')
    }

    if (!status) {
      return req.flash('error', 'Status cannot be empty')
    }

    if (networkType === 'twitter') {
	    if(status.length > 140) {
	      return req.flash('error', 'Status is over 140 characters')
	    }
	    let config = {
		      consumer_key: twitterConfig.consumerKey,
		      consumer_secret: twitterConfig.consumerSecret,
		      access_token_key: req.user.twitter.token,
		      access_token_secret: req.user.twitter.secret
		  }
		  console.log(config)
      let twitterClient = new Twitter(config)	      

      await twitterClient.promise.post('statuses/update', {status})      
    } else if(networkType === 'facebook') {
      FB.setAccessToken(req.user.facebook.token);      
      let response = await new Promise((resolve, reject) => FB.api('me/feed', 'post', { message: status}, resolve))
      console.log(response)
    } 
    res.redirect('/timeline')
	}
}