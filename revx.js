
var onTagPageLoad =(function(window) {
	
	function needsToRun() {
		var url;
		for (var i = config.length - 1; i >= 0; i--) {
			url = config[i].url;
			if (window.location.hostname === url){	//Maybe you need more logic for urls that are not fully matching
				return config[i];
			}
		}
		return false;
	}

	var config = [{
		url:' https://www.sendmygift.com/checkout/onepage',
		text: 'RevX remarketing tag checkout page',
		params: {
			_atm_params.t : 'r',
			_atm_params.id:''
			_atm_params.sprc : getQuoteBaseGrandTotal()
		}

	},{
		url: 'https://www.sendmygift.com/onepage/success',
		text:'RevX remarketing tag conversion page',
		params: {
			_atm_params.t : 'p',
			_atm_params.id= getEcommProdid()

		}
	},{
		url: 'https://www.sendmygift.com/onepage/success',
		text:'RevX Remarketing Conversion Pixel conversion page',
		params: {},
		isVeInteractive: true

	},{

	},{

	}];



	var urlConfig = needsToRun();

	if (!urlConfig) {
		return;
	}
	/*If it comes here you would have somthing like this: 
	{
		url:' https://www.sendmygift.com/checkout/onepage',
		text: 'RevX remarketing tag checkout page',
		params: {
			_atm_params.t : 'r',
			_atm_params.id:''
			_atm_params.sprc : getQuoteBaseGrandTotal()
		}

	}

	*/

	// First thing
	console.log(urlConfig.text); 

	// Second. Get all the params needed, either from page or from google.

	window._atm_client_id = "6840";
	window._atm_params = {};
	window._atm_params.t = "r";

	// Third. Get all values from Google
	if (window.google_tag_params ) {
		_atm_params.id= window.google_tag_params.ecomm_prodid;
		_atm_params.sprc = window.google_tag_params.ecomm_totalvalue;

		createPixel();
	} else {
		getAsyncValue(window.google_tag_params,'ecomm_prodid', function (value) {
			_atm_params.id= value;

			createPixel();
		})
	}

	function createPixel() {

	}

	var common_config = {
		atm_params.channel: getDevice(),
		_atm_client_id: "6840"
	};


	

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

	function needsToRun() {
		var url;
		for (var i = config.length - 1; i >= 0; i--) {
			url = config[i].url;
			if (window.location.hostname === url){	//Maybe you need more logic for urls that are not fully matching
				return config[i];
			}
		}
		return false;
	}

	function getElementValue(selector) {
		var element = document.querySelectorAll(selector);
		if(element){
			return element.innerHTML.trim();
		}
		return '';
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




