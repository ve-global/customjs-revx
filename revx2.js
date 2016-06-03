	var settings = {
		clientId: '6861',
		domain: 'www.industrybuying.com',
		journeycode: 'B866791F-F789-47CD-8A75-BFF8E79451F7',
		veHostDomain: 'cdsch2.veinteractive.com',
		default_atm_params: {
			t: 'r',
			channel: getDevice()
		},
		webpages:[{
			name: 'Homepage',
			url: {
				path: '/'
			},
			atm_params: {
				f: 'v'
			}
		},{
			name: 'Category',
			url: {
				selector: '.topCategoriesArea .strokedHeading.marb span' 
			},
			needsGoogleParams: window.google_tag_params,
			atm_params: {
				f: 'b',
				c: getNumberFromHref(1,''),  //category id
				cn: getValueBySelector('.row.brandheading h1') //category name
			}
		},{
			name: 'SubCategory',
			url: {
				selector: '#product_filters #AH_CategoryListView h3'    
			},
			needsGoogleParams: window.google_tag_params,
			atm_params: {
				f: 'b',
				c: getNumberFromHref(1,''),  //category id
				cn: getValueBySelector(".innerContainerWrap .leafSearchBreadCrums a [itemprop='name']"), //category name,
				scn: getValueBySelector(".innerContainerWrap .leafSearchBreadCrums span span [itemprop='name']"),//subcategory name
				sc:  getNumberFromHref(4,'')//subcategory id
			}
		},{
			name: 'Product',
			url: {
				selector: '.prodDetailPage .product_info h2' 
			},
			atm_params: {
				f: 'c',
				cn: getValueBySelector(".prodDetailPage .commonBreadCrums a [itemprop='name']"),//category name
				scn: getValueBySelector(".prodDetailPage .commonBreadCrums #bc1 [itemprop='name']"),//subcategory name
				c: getNumberFromHref(3,'.prodDetailPage .commonBreadCrums #bc1 a'), //category id
				sc: getNumberFromHref(6,'.prodDetailPage .commonBreadCrums #bc1 a'),  //subcategory id
				oprc: getValueBySelector("#AH_ListPrice"),  //original price
				id: getValueBySelector(".prodDetailPage .product_info .product_infotable li:nth-child(1) div:nth-child(2)"), //sku
				sprc: getValueBySelector("#AH_PricePerPiece") //sale price
			}
		},{
			name: 'Basket',
			url: {
				path: '/order/cart/'
			},
			needsGoogleParams: window.google_tag_params,
			atm_params: {
				f: 's',
				id:  getListProductId('.cart_page .item_details h6'),  //product id, pass coma if >1 product added
				sprc: getValueBySelector(".grand_totalbg .price-area #order_total")//total basket
			}

		},{
			name: 'Checkout',
			url: {
				path: '/order/checkout/'
			},
			atm_params: {
				f: 's',
				//id: getProductIdBasket(),  //product id, pass coma if >1 product added
				sprc: getValueBySelector(".grand_totalbg #order_total").replace('&nbsp;','')//total basket
			}
		},{
			name: 'Conversion',
			url: {
				selector: '.thankyou .header-line'
			},
			needsGoogleParams: window.google_tag_params,
			atm_params: {
				f: 'p',
				id:  getListProductId('.item_details_payment h6'),
				sprc: getValueBySelector("#order_value_for_pixels")  //total amount paid
			},

			isConversionPage: {
				orderId: '',
				orderValue: '',
				pixelId: ''
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
		for(var defaultParam in settings.default_atm_params){
			if ((settings.default_atm_params).hasOwnProperty(defaultParam)) {
				window._atm_params[defaultParam] = settings.default_atm_params[defaultParam];
			}
		}


		//for(var specialParam in settings.webpages[0].atm_params){
		//	if ((settings.webpages[0]).hasOwnProperty(specialParam)) {
		//		window._atm_params[specialParam] = settings.webpages[0].atm_params[specialParam];
		//	}
		//}

		// 3.- Needs to wait for Google tracking values
		if (urlSettings.needsGlobalParams) { 
			waitForGlobaVar(urlSettings.needsGlobalParams, continueTracking);

		} else {
			continueTracking();
		}

		function setGlobalVariables() {
			for(var param in urlSettings.atm_params){
				if ((urlSettings.atm_params).hasOwnProperty(param)) {
					window._atm_params[param] = urlSettings.atm_params[param];
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
			}

		}

	},1);

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
		for (var i = conf.webpages.length - 1; i >= 0; i--) {  // was conf.length 
			if (matchWebPage(conf.webpages[i].url)){   // was conf[i].url
				return conf.webpages[i];  //same
			}
		}
		return false;
	}


	//HELPERS
	function matchWebPage(objectUrl) {
		var matches = false;
		if (objectUrl.hasOwnProperty('path')) {     //need a string
			matches = (window.location.pathname === objectUrl.path);
			if (!matches) return false;
		}
		if (objectUrl.hasOwnProperty('regexp')) {
			matches = (window.location.href.search(objectUrl.regexp) !== -1);
			if (!matches) return false;
		}
		if (objectUrl.hasOwnProperty('selector')) { 
			matches = document.querySelector(objectUrl.selector);
			if (!matches) return false;
		}
		if (objectUrl.hasOwnProperty('func')) {
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
		return window.google_tag_params[param];
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

	function getNumberFromHref(type,selector){
		switch(type){
			case 1:
				var hrefValue = window.location.pathname;  
					if(hrefValue){
						var pattern = new RegExp("[0-9]+");
						return hrefValue.match(pattern); //return null if no match
					}
					return '';
				break;
			case 2: 
				var hrefValue = document.querySelector(selector);
					if(hrefValue){
						hrefValue = document.querySelector(selector).trim();
						var pattern = new RegExp("[0-9]+");
						return hrefValue.match(pattern); //return null if no match
					}
					return '';
				break;
			case 3: 
				var hrefValue = document.querySelector(selector);
					if(hrefValue){
						hrefValue = document.querySelector(selector).href;
						var pattern = new RegExp("[0-9]+");
						return hrefValue.match(pattern); //return null if no match
					}
					return '';
				break;
			case 4:
				var hrefValue = window.location.pathname;  
					if(hrefValue){
						var pattern = new RegExp("[0-9]+", "g");
						if(hrefValue.match(pattern)!=null && hrefValue.match(pattern).length>1){
						return hrefValue.match(pattern)[1]; //return null if no match
						}
					}
					return '';
				break;
			case 5: 
				var hrefValue = document.querySelector(selector);
					if(hrefValue){
						hrefValue = document.querySelector(selector).trim();
						var pattern = new RegExp("[0-9]+", "g");
						return hrefValue.match(pattern)[1]; //return null if no match
					}
					return '';
				break;
			case 6: 
				var hrefValue = document.querySelector(selector);
					if(hrefValue){
						hrefValue = document.querySelector(selector).href;
						var pattern = new RegExp("[0-9]+", "g");
						return hrefValue.match(pattern)[1]; //return null if no match
					}
					return '';
				break;
		}
	}	

	function getListProductId(selector){
		var element = document.querySelectorAll(selector);
		if(element){
			var basket = [];
			for (var i = element.length - 1; i >= 0; i--) {  
				if (element[i]){   
					basket[i] = element[i].getAttribute("data-sku");  
				}
			}
			return basket.toString();
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
