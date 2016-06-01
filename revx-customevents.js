
var onTagPageLoad = (function(window,document) {
	var settings = {
		clientId: '6840',
		domain: 'sendmygift',
		journeycode: '76B8CA61-D900-47E1-B544-55D8D04919BB',
		veHostDomain: 'cdsch2',
		default_atm_params: {
			t: 'r'
		},
		webpages:[{
			name: 'Homepage',
			url: {
				path: '/'
			},
			atm_params: {
				f: 'v',
			}
		},{
			name: 'Category',
			url: {
				regexp: /[a-z]*.html/
			},
			needsGoogleParams: window.google_tag_params,
			atm_params: {
				f: 'b',
				cn: {
					google :'ecomm_category'
				}
			}
		},{
			url: {
				regexp: /[a-z]*.html/,
				selector: '.quick-overview'
			},
			atm_params: {
				f: 'c',
				needsGoogleParams: window.google_tag_params,
				cn: {
					selector: '.container .breadcrumbs li:nth-child(2) span'
				},
				oprc: {
					selector:'.product-shop .price-box .old-price .price'
				},
				id: {
					google: 'ecomm_prodid'
				},
				sprc: {
					google: 'ecomm_totalvalue'
				}
			}
		},{
			name: 'Basket',
			url: {
				path: 'checkout/cart'
			},
			needsGoogleParams: window.google_tag_params,
			atm_params: {
				f: 's',
				id: {
					google: 'ecomm_prodid'
				},
				sprc: {
					google: 'ecomm_totalvalue'
				}
			}

		},{
			name: 'Checkout',
			url: {
				path: 'checkout/onepage'
			},
			atm_params: {
				f: 's',
				id: '',	//MATT. Why Empty? shouldn't be google: 'ecomm_prodid'?
				sprc: {
					globalVar: quoteBaseGrandTotal // MATT: What is this?
				}
			}
		},{
			name: 'Conversion',
			url: {
				path: 'checkout/onepage/success'
			},
			needsGoogleParams: window.google_tag_params,
			atm_params: {
				f: 'p',
				id:{
					google: 'ecomm_prodid'
				},
				sprc: {
					google: 'ecomm_totalvalue'
				}
			}
			isConversionPage: {
				orderId: {
					func: function(){
						var elem = document.querySelector(".container p"); // MATT. this selector is not very good
						if (elem) {
							var innerHTML = elem.innerHTML;
							return innerHTML.substr(0,40).replace(/\D/g,''); //MATT. this is veeeery dodgy
						}
						return '';
					}
				},
				orderValue: {
					google: 'ecomm_totalvalue'
				},
				pixelId: '10850'	//MATT. Is this correct?
			}
		}]
	};

	var config = {
		getLog: function (t) { return 'RevX remarketing tag ' + t + ' page';},
		getScriptUrl: function (id) {return document.location.protocol + '//cdn.atomex.net/static/js/pxs/' + id + '/ast.js';},
		getTrackBackUrl: function(px, id, value) { return document.location.protocol + '//trk.atomex.net/cgi-bin/tracker.fcgi/conv?px='+px+'&ty=1&tid='+ id + '&tamt=' + value;},
		vePixelUrl: '//' + settings.veHostDomain + '/DataReceiverService.asmx/Pixel?journeycode=' + settings.journeycode
	};
	
	setTimeout(function(){
		var urlSettings = needsToRun(settings);

		if (!urlSettings) { return false; } //Doesn't match any url

		// 1.- thing
		console.log(config.getLog(urlSettings.name)); 

		// 2.-. Get all the params needed. These are common.
		window._atm_client_id = settings.clientId;
		window._atm_params = {};
		window._atm_params.t = settings.default_atm_params.t;
		window._atm_params.channel = getDevice();

		// 3.- Needs to wait for Google tracking values
		if (urlSettings.needsGlobalParams) { 
			waitForGlobaVar(urlSettings.needsGlobalParams, continueTracking);

		} else {
			continueTracking();
		}

		function setGlobalVariables() {
			for(param in urlSettings.atm_params){
				if (urlSettings.atm_params).hasOwnProperty(param)) {
					window._atm_params[param] = getValue(urlSettings.atm_params[param]);
				}
			}
		}

		// 4.- Continues tracking after values from Google are in the page if they are needed.
		function continueTracking () {

			// 5.- Sets the variables into the global _atm_params
			setGlobalVariables();

			// 6.- Adds the JS from atomex
			createJS(config.getScriptUrl(settings.clientId));

			// 6B.- If it is the conversion page adds both the Pixel from Ve and the JS tracback from atomex
			if (urlSettings.isConversionPage) {

				createPixel(config.vePixelUrl);

				var pixelSettings = urlSettings.isConversionPage;
				var orderId = getValue(pixelSettings.orderId);
				var orderValue getValue(pixelSettings.orderValue);

				createJS(config.getTrackBackUrl(pixelSettings.pixelId, orderId, orderValue ));
			}

		}

	},1};

	function waitForGlobaVar(object, callback) {
		if(object) {
			return callback(object);
		} else{
			var timerId = window.setInterval(function(){
				if(object) {
					clerInterval(timerId);
					return callback(object);
				}
			},500); 
		}
	}

	function needsToRun(conf) {
		var url;
		for (var i = conf.length - 1; i >= 0; i--) {
			if (matchWebPage(conf[i].url)){
				return conf[i];
			}
		}
		return false;
	}


	//HELPERS
	function matchWebPage(objectUrl) {
		var matches = false;
		if (objectUrl.hasOwnProperty(path)) {
			matches = (window.location.pathname === objectUrl.path);
			if (!matches) return false;
		}
		if (objectUrl.hasOwnProperty(regexp)) {
			matches = (window.location.href.search(objectUrl.regexp) !== -1);
			if (!matches) return false;
		}
		if (objectUrl.hasOwnProperty(selector)) { 
			matches = document.querySelector(objectUrl.selector);
			if (!matches) return false;
		}
		if (objectUrl.hasOwnProperty(func)) {
			matches = getValueByFunction(objectUrl.func);
			if (!matches) return false;
		}
		return matches;
	}

	function getValue(object){
		if 		(object.selector) 	{ return getValueBySelector(object.selector); } 
		else if (object.func) 		{ return getValueByFunction(object.func); } 
		else if (object.globalVar) 	{ return object.globalVar; }
		else if (object.google) 	{ return getValueByGoogle(object.google); } 
		else 						{ return ''; }
	}

	function getValueByGoogle (param) {
		return = window.google_tag_params[param];
	}

	function getValueByFunction (func) {
		try {
			return func();
		} catch (e) {
			return '';
		}
	}

	function getValueBySelector(selector) {
		var element = document.querySelector(selector);
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

	function getDevice(){
		return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? 'm' : 'd';
	}


}(window,document));





