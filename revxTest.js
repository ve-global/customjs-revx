var onTagPageLoad = (function(window,document) {
	/*
	1. define static variables
	2.Check if we are on correct url
	3. Check if selector are defined
	4.load specific varaible
	5.load pixel
	*/

	

	//static varaibles to be changed

	var category='google_tag_params.ecomm_category';
	var productId='google_tag_params.ecomm_prodid';
	var beforePrice='document.querySelectorAll(".product-shop .price-box .old-price .price")[0].innerHTML.trim()';
	var specialPrice='google_tag_params.ecomm_totalvalue';
	var productIdBasket='a';
	var productTotalBasket='a';
	var productTotalCheckout='a';
	var totalComplete='a';
	var productIdComplete='a';

	

	var config = [
	{
		url:'/',
		text: 'RevX remarketing tag home page',
		params: {
			window._atm_params.f="v",
			isVeInteractive = false}
		]

	},
	{
		url:'category',
		text: 'RevX remarketing tag category & sub-category pages',
		params: [
			window._atm_params.f="b",
			window._atm_params.cn = getElementValue(category),
			isVeInteractive = false
		]

	},

	{
		url:'product',
		text: 'RevX remarketing tag product page',
		params: [
			 window._atm_params.f="c",
			 window._atm_params.id = getElementValue(productId),
			 window._atm_params.oprc=  getElementValue(specialPrice),
			 window._atm_params.sprc = getElementValue(specialPrice),
			 isVeInteractive = false
		]

	},
		{
		url:'/checkout/cart',
		text: 'RevX remarketing tag basket page',
		params: [
			window._atm_params.f="s",
			window._atm_params.id= getElementValue(productIdBasket),
			window._atm_params.sprc = getElementValue(productTotalBasket),
			isVeInteractive = false
		]

	},
		{
		url:'/checkout/onepage',
		text: 'RevX remarketing tag checkout page',
		params: [
			 window._atm_params.f="s",
		     window._atm_params.sprc = getElementValue(productTotalCheckout),
		     isVeInteractive = false
		]

	},

	{
		url: '/onepage/success',
		text:'RevX remarketing tag conversion page',
		params: [
			window._atm_params.t = 'p',
			window._atm_params.sprc = getElementValue(totalComplete),
			window._atm_params.id= getElementValue(productIdComplete),
			isVeInteractive = false
		]
	},
	{
		url: '/onepage/success',
		text:'RevX Remarketing Conversion Pixel conversion page',
		params: [
			orderId = getElementValue(totalComplete),
			orderValue = getElementValue(productIdComplete),
			isVeInteractive = false
			]
	},

		{
		url: '/onepage/success',
		text:'RevX remarketing tag conversion page',
		params: [
			isVeInteractive = true
		]		
	}];


	var urlConfig = needsToRun();

	
	/*if (!urlConfig) {
		return false;}*/
	
if (urlConfig){
	// First thing
	console.log(urlConfig.text); 

	window._atm_params.t = "r";
	window._atm_client_id = "6840";
	window._atm_params.channel = getDevice();
	createPixel();
	}


/*	if (window.google_tag_params ) {
	
		window._atm_params.id= window.google_tag_params.ecomm_prodid;
		window._atm_params.sprc = window.google_tag_params.ecomm_totalvalue;
	} else {
		getAsyncValue(window.google_tag_params,'ecomm_prodid', function (value) {
			window._atm_params.id= value;
		})
	}
	*/

	function createPixel() {

	setTimeout(function(){

		if (config[i].isVeinteractive) {
			console.log('VE pixel');
		    var ast=document.createElement('img');
		    ast.width="1"; ast.height="1";    ast.src=config.url;
		} else {
			var ast=document.createElement('script'); ast.type="text/javascript";
			ast.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//cdn.atomex.net/static/js/pxs/" + window._atm_client_id + "/ast.js";
		}
		document.body.appendChild(ast);

	},1);

	}


	function needsToRun() {
		var url;
		for (var i = config.length - 1; i >= 0; i--) {
			url = config[i].url;
			 var path = window.location.pathname;
 			 var pathEnd = path.substr(-4);
 			 var categoryTitle = document.querySelectorAll(".container .breadcrumbs li strong")[0];
 			 var description = document.querySelectorAll(".quick-overview")[0];
			if (window.location.pathname === url){
				//Maybe you need more logic for urls that are not fully matching
				window._atm_params = {};
				return config[i];
			}
			if (pathEnd ==='html' && categoryTitle){
				return config[1];
			}
			if (description){
				if (description.innerHTML === "DESCRIPTION"){
				return config[2];
				}
			}
		return false;
		}
	}	

	function getElementValue(myValue) {
		var element = myValue;
		if(element){
			return element;
		}
		return '';
	}

	function getDevice(){
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  			return "m";
		}
		else {  return "d";
		}
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



