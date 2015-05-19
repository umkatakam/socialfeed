module.exports = {
	development:{
	    'facebook' : {
	        'consumerKey': '1587369738209177',
	        'consumerSecret': 'ecde57608d52ab00858f1a4acfbb6970',
	        'callbackUrl': 'http://socialfeed.com:8000/auth/facebook/callback'	        					   
	    },
	    'twitter' : {
	        'consumerKey': 'P1NVgDoWXUz9CqV6yfS4fwTig',
	        'consumerSecret': 'oTM40peOV3UaCt1dUB9Kdl5sK4Aok81bfYgbOQ9hzf72Hp8MLx',
	        'callbackUrl': 'http://socialfeed.com:8000/auth/twitter/callback'	        					   
	    },
	    'google': {
	    	'consumerKey': '114303301164-as8r3am5i73jvaiaevqtvf6umnf7bebl.apps.googleusercontent.com',            
	    	'consumerSecret': 'dCxctSwl83XbtdEL0cYa6MYb',
	    	'realm': 'http://socialfeed.com:8000/',
            'returnURL': 'http://socialfeed.com:8000/auth/google/callback'	    
	    }		
	}
}