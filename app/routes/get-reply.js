let Twitter  = require('twitter')
let FB = require('fb')
let Promise = require('promise')

require('songbird')

let networks = {
  twitter: {
      'icon': 'twitter',
      'name': 'Twitter',
      'class': 'btn-info'    
  },
  facebook: {
      icon: 'facebook',
      name: 'Facebook',
      class: 'btn-primary'
  }
}

module.exports = (app) => {
	let twitterConfig = app.config.auth.twitter	
	return async (req, res) => {
	    let id = req.params.id
	    let networkType = req.query.networkType
	    if (networkType === 'twitter') {
			let twitterClient = new Twitter({
		        consumer_key: twitterConfig.consumerKey,
		        consumer_secret: twitterConfig.consumerSecret,
		        access_token_key: req.user.twitter.token,
		        access_token_secret: req.user.twitter.secret
		    })
		    let [tweet] = await twitterClient.promise.get('/statuses/show/' + id)

		    tweet = {
		        id: tweet.id_str,
		        image: tweet.user.profile_image_url,
		        text: tweet.text,
		        name: tweet.user.name,
		        username: "@" + tweet.user.screen_name,
		        liked: tweet.favorited,
		        network: networks.twitter
		    }

		    res.render('reply.ejs', {
		        post: tweet,
		        networkType : networkType
		    })
		} else if (networkType === 'facebook') {
			console.log(id)
			FB.setAccessToken(req.user.facebook.token);
			let url = '/' + id 
      		let response = await new Promise((resolve, reject) => FB.api(url, resolve))
      		console.log(response)
      		let post = {
      			id: response.id,
      			image: '',
      			text: response.message,
      			name: response.from.name,
      			username: '',
      			network: networks.facebook
      		}
      		res.render('reply.ejs', {
		        post: post,
		        networkType : networkType
		    })
		}
	}
}