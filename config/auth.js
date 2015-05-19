module.exports = {
	development:{
	    'facebook' : {
	        'consumerKey': '922022444524995',
	        'consumerSecret': '3fd7862f0833867fe5cbfba8bb899482',
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