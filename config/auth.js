// config/auth.js

// NOTE: Since this file is cheked into public repository removing all the keys from config
module.exports = {
	development:{
	    'facebook' : {
	        'consumerKey': '...',
	        'consumerSecret': '...',
	        'callbackUrl': '...'	        					   
	    },
	    'twitter' : {
	        'consumerKey': '...',
	        'consumerSecret': '...',
	        'callbackUrl': '...'  
	    },
	    'google': {
	    	'consumerKey': '...', 
	    	'consumerSecret': '...',
	    	'realm': '...',
            'returnURL': '...'
	    }		
	}
}