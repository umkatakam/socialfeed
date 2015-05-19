let Promise = require('promise')
let Twitter  = require('twitter')
let _ = require('lodash')
let requestPromise = require('request-promise')

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

	return async (req,res) => {
		let twitterClient = new Twitter({
		  consumer_key: twitterConfig.consumerKey,
		  consumer_secret: twitterConfig.consumerSecret,
		  access_token_key: req.user.twitter.token,
		  access_token_secret: req.user.twitter.secret
		})

		let [tweets] = await twitterClient.promise.get('statuses/home_timeline') 
		let twitterPosts = _.map(tweets, function(tweet) {
		return {
		  id: tweet.id_str,
		  image: tweet.user.profile_image_url,
		  text: tweet.text,
		  name: tweet.user.name,
		  username: "@" + tweet.user.screen_name,
		  liked: tweet.favorited,
		  retweeted: tweet.retweeted,
		  retweedStatusId: tweet.retweeted && tweet.retweeted_status ? tweet.retweeted_status.id_str : null,
		  network: networks.twitter
		}
		})

		let atoken = req.user.facebook.token;

		let response = await requestPromise({
		    uri: `https://graph.facebook.com/me/home/?access_token=${atoken}&limit=10`,
		    resolveWithFullResponse: true
		})
		  
		let fbFeeds;
		if(response && response.body){
		  let fbPosts = JSON.parse(response.body);
		  let fbData = fbPosts.data;
		  fbFeeds = _.map(fbData, function(post){
		    let liked = post.likes && post.likes.data && post.likes.data.length > 0;
		    let likedCount = 0;
		    if(liked) {
		      likedCount = post.likes.data.length
		    }
		    return {
		        id: post.id,
		        image: post.picture,
		        text: post.description,
		        name: post.from.name,
		        username: post.name,
		        liked: liked,
		        likedCount: likedCount,            
		        network: networks.facebook
		    }
		  });
		}

		res.render('timeline.ejs',{
		  twitterPosts: twitterPosts || [],
		  fbFeeds: fbFeeds || []
		})
	}
}

