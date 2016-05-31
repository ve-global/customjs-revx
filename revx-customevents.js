
var onTagPageLoad = (function(window,document) {
	function getAsyncValue(object, key, callback) {
		if(object && object[key]) {
			return callback(object[key]);
		} else{
			var timerId = window.setInterval(function(){
				if(object && object[key]) {
					clerInterval(timerId);
					return callback(object[key]);
				}
			},500); 
		}
	}


	function getElementValue(selector) {
		var element = document.querySelectorAll(selector);
		if(element){
			return element.innerHTML.trim();
		}
		return '';
	}

	function needsToRun(conf) {
		var url;
		for (var i = conf.length - 1; i >= 0; i--) {
			url = conf[i].url;
			if (window.location.hostname === url){	//Maybe you need more logic for urls that are not fully matching
				return conf[i];
			}
		}
		return false;
	}

	function getDevice(){
		return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? 'm' : 'd';
	}

	var config = {
		getLog: function (t) { return 'RevX remarketing tag ' + t + ' page';},
		getScriptUrl: function (id) {return document.location.protocol + '//cdn.atomex.net/static/js/pxs/' + id + '/ast.js';},
		getTrackBackUrl: function(px, id, value) { return document.location.protocol + '//trk.atomex.net/cgi-bin/tracker.fcgi/conv?px='+px+'&ty=1&tid='+ id + '&tamt=' + value;},
		vePixelUrl: '//' + settings.veHostDomain + '/DataReceiverService.asmx/Pixel?journeycode=' + settings.journeycode

	};

	//This should come from settings.js
	var settings = {
		clientId: '6840',
		journeycode: '76B8CA61-D900-47E1-B544-55D8D04919BB',
		veHostDomain: 'cdsch2',
		default_atm_params: {
			t: 'r'
		},
		webpages:[{
			name: 'Homepage',
			url:' https://www.sendmygift.com/checkout/onepage',
			text: 'RevX remarketing tag checkout page',
			atm_params: {
				f: 'v',
			}
		},{
			name: 'Category',
			url: 'https://www.sendmygift.com/onepage/success',
			text:'RevX remarketing tag conversion page',
			atm_params: {
				f: 'b',
				cn: {
					google :'google_tag_params.ecomm_category'
				}
			}
		},{
			name: 'Product',
			url: 'https://www.sendmygift.com/onepage/success',
			text:'RevX Remarketing Conversion Pixel conversion page',
			atm_params: {
				f: 'c',
				cn: {
					selector: '.container .breadcrumbs li:nth-child(2) span'
				},
				oprc: {
					selector:'.product-shop .price-box .old-price .price'
				},
				id: {
					google: 'google_tag_params.ecomm_totalvalue'
				},
				sprc: {
					google: 'google_tag_params.ecomm_totalvalue'
				}
			}
		},{
			name: 'Basket',
			url: 'https://www.sendmygift.com/onepage/success',
			text:'RevX Remarketing Conversion Pixel conversion page',
			atm_params: {
				f: 's',
				id: {
					google: 'google_tag_params.ecomm_totalvalue'
				},
				sprc: {
					google:'google_tag_params.ecomm_totalvalue'
				}
			}

		},{
			name: 'Checkout',
			url: 'https://www.sendmygift.com/onepage/success',
			text:'RevX Remarketing Conversion Pixel conversion page',
			atm_params: {
				f: 's',
				id: '',	//MATT. Why Empty?
				sprc: {
					globalVar: quoteBaseGrandTotal // MATT: What is this?
				}
			}

		},{
			name: 'Conversion',
			url: 'https://www.sendmygift.com/onepage/success',
			text:'RevX Remarketing Conversion Pixel conversion page',
			atm_params: {
				f: 'p',
				id:{
					google: 'google_tag_params.ecomm_totalvalue'
				},
				sprc: {
					google: 'google_tag_params.ecomm_totalvalue'
				}
			}
			isConversionPage: {
				orderId: {
					func: function(){return document.querySelectorAll(".container p")[0].innerHTML.substr(0,40).replace(/\D/g,'');}
				},
				orderValue: {
					google: 'google_tag_params.ecomm_totalvalue'
				},
				pixelId: '10850'
			}
		}]
	};



	var urlSettings = needsToRun(settings);

	if (!urlSettings) {
		return;
	}

	// First thing
	console.log(urlSettings.text); 

	// Second. Get all the params needed, either from page or from google.

	window._atm_client_id = settings.clientId;
	window._atm_params = {};
	window._atm_params.t = settings.default_atm_params.t;
	window._atm_params.channel = getDevice();

	// Third. Get all values from Google

	getAsyncValue(window.google_tag_params,'ecomm_prodid', function (value) {
		_atm_params.id= window.google_tag_params.ecomm_prodid;
		_atm_params.sprc = window.google_tag_params.ecomm_totalvalue;

		doTracking();
	})


	function doTracking() {
		createJS(settings.getScriptUrl(settings.clientId));
		if (urlSettings.isConversionPage) { //Check if it is falsy
			createPixel(config.vePixelUrl);
			var pixelSettings = urlSettings.isConversionPage;
			var orderId;
			var orderValue;

			createJS(getTrackBackUrl(pixelSettings.pixelId, orderId, orderValue ));
		}
	}

	
	setTimeout(function(){

		if (config[i].isVeinteractive) {
			console.log('VE pixel');
		    var ast=document.createElement('img');
		    ast.width="1"; ast.height="1";    ast.src=config.url;
		} else {
			var ast=document.createElement('script'); ast.type="text/javascript";
			ast.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//cdn.atomex.net/static/js/pxs/" + _atm_client_id + "/ast.js";
		}
		document.body.appendChild(ast);

	},1};


	//HELPERS
	function getValue(object){
		if (object.selector) {
			return getValueBySelector(object.selector)
		} else if (object.google) {
			return getValueByGoogle(object.google);
		} else if (object.func) {
			return getValueByFunction(object.func);
		} else{
			return '';
		}
	}

	function getValueByGoogle (param) {

	}

	function getValueByFunction (func) {
		try {
			return func()
		} catch (e) {
			return '';
		}
	}

	function getValueBySelector(selector) {
		var element = document.querySelectorAll(selector);
		if(element){
			return element.innerHTML.trim();
		}
		return '';
	}

	function createJS(url) {
		var ast = document.createElement('script'); 
		ast.type = "text/javascript";
		ast.src = url;
		document.body.appendChild(ast);
	}

	function createPixel(url) {
	    var ast = document.createElement('img');
	    ast.width = "1"; 
	    ast.height = "1";    
	    ast.src = url;
	    document.body.appendChild(ast);   
	}

	function getAsyncValue(object,key, callback) {
		var timerId = window.setInterval(function(){
			if(object && object[key]) {
				callback(object[key]);
				clerInterval(timerId);
			}
		},500); 
	}

}(window,document));





