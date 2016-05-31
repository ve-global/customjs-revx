{onTagPageLoad: (function(window) {
setTimeout(function(){
 
 var websiteUrl = window.location.href;
var test = "";
 var path = window.location.pathname;
 var pathEnd = path.substr(-4);
 var google_tag_params ={};
 var Description = document.querySelectorAll(".quick-overview")[0];
 
//check if mobile or desktop
 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  var device = "m";
}
else {  var device = "d";}

    if(websiteUrl === 'http://www.sendmygift.com/'){
 console.log('RevX remarketing tag home page');
	window._atm_client_id = "6840";
	window._atm_params = new Object;
	// Pass in data parameters as applicable on each page
	// If you want to pass in multiple values, use javascript array
	// Example: _atm_params.id = ["123", "345"]
	_atm_params.t = "r";
	_atm_params.f="v";
         _atm_params.channel=device;
	var ast=document.createElement('script'); ast.type="text/javascript";
	ast.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//cdn.atomex.net/static/js/pxs/" + _atm_client_id + "/ast.js";
	document.body.appendChild(ast);
    }
    
       if( pathEnd ==='html' && document.querySelectorAll(".container .breadcrumbs li strong")[0].innerHTML){
      
 console.log('RevX remarketing tag category & sub-category pages');
	window._atm_client_id = "6840";
	window._atm_params = new Object;
	// Pass in data parameters as applicable on each page
	// If you want to pass in multiple values, use javascript array
	// Example: _atm_params.id = ["123", "345"]
	_atm_params.t = "r";
	_atm_params.f="b";
	//_atm_params.c=” category id”;
	//_atm_params.sc=” sub-category id”;
	_atm_params.cn = google_tag_params.ecomm_category;
	//_atm_params.scn = "";
	
 _atm_params.channel=device;

	var ast=document.createElement('script'); ast.type="text/javascript";
	ast.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//cdn.atomex.net/static/js/pxs/" + _atm_client_id + "/ast.js";
	document.body.appendChild(ast);
     }
     

if (Description && Description.innerHTML === "DESCRIPTION") {
     console.log('RevX remarketing tag product page');
     window._atm_client_id = "6840";
 window._atm_params = new Object;
 // Pass in data parameters as applicable on each page
 // If you want to pass in multiple values, use javascript array
 // Example: _atm_params.id = ["123", "345"]
 _atm_params.t = "r";
 _atm_params.f="c";
 _atm_params.cn = document.querySelectorAll(".container .breadcrumbs li:nth-child(2) span")[0].innerHTML;  //-- Eg- Flowers
 //_atm_params.scn = "sub-category name";   //-- Eg- Flowers with Cake
 //_atm_params.c=” category id”;
 //_atm_params.sc=” sub-category id”;
 _atm_params.id= google_tag_params.ecomm_prodid;  // -- Eg- FINUPD136_VL_Cities
 _atm_params.oprc= document.querySelectorAll(".product-shop .price-box .old-price .price")[0].innerHTML.trim(); // Eg- 1016
	_atm_params.sprc = google_tag_params.ecomm_totalvalue;
	
 _atm_params.channel=device;
	var ast=document.createElement('script'); ast.type="text/javascript";
	ast.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//cdn.atomex.net/static/js/pxs/" + _atm_client_id + "/ast.js";
	document.body.appendChild(ast);
}

            
        if(websiteUrl.substr(0,39) === 'http://www.sendmygift.com/checkout/cart'){
 console.log('RevX remarketing tag basket page');

	window._atm_client_id = "6840";
	window._atm_params = new Object;
	// Pass in data parameters as applicable on each page
	// If you want to pass in multiple values, use javascript array
	// Example: _atm_params.id = ["123", "345"]
	_atm_params.t = "r";
	_atm_params.f="s";
	_atm_params.id= google_tag_params.ecomm_prodid;
	_atm_params.sprc = google_tag_params.ecomm_totalvalue;

 _atm_params.channel=device;

	var ast=document.createElement('script'); ast.type="text/javascript";
	ast.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//cdn.atomex.net/static/js/pxs/" + _atm_client_id + "/ast.js";
	document.body.appendChild(ast);

     }
     
     
         if(websiteUrl.substr(0,43) === 'https://www.sendmygift.com/checkout/onepage' && websiteUrl.substr(0,51) !== 'https://www.sendmygift.com/checkout/onepage/success'){
 console.log('RevX remarketing tag checkout page');

	window._atm_client_id = "6840";
	window._atm_params = new Object;
	// Pass in data parameters as applicable on each page
	// If you want to pass in multiple values, use javascript array
	// Example: _atm_params.id = ["123", "345"]
	_atm_params.t = "r";
	_atm_params.f="s";
	_atm_params.id=""; //--Pass comma separated product ids if >1 product is added
	_atm_params.sprc = quoteBaseGrandTotal;
 _atm_params.channel=device;

	var ast=document.createElement('script'); ast.type="text/javascript";
	ast.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//cdn.atomex.net/static/js/pxs/" + _atm_client_id + "/ast.js";
	document.body.appendChild(ast);

     }
     
     
    
            if(websiteUrl.substr(0,51) === 'https://www.sendmygift.com/checkout/onepage/success'){
 console.log('RevX remarketing tag conversion page');
  
    	window._atm_client_id = "6840";
	window._atm_params = new Object;
	// Pass in data parameters as applicable on each page
	// If you want to pass in multiple values, use javascript array
	// Example: _atm_params.id = ["123", "345"]
	_atm_params.t = "r";
	_atm_params.f="p";
	_atm_params.id= google_tag_params.ecomm_prodid;
	_atm_params.sprc = google_tag_params.ecomm_totalvalue;
 _atm_params.channel=device;

	var ast=document.createElement('script'); ast.type="text/javascript";
	ast.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//cdn.atomex.net/static/js/pxs/" + _atm_client_id + "/ast.js";
	document.body.appendChild(ast);
     }
     
     
     
        if(websiteUrl.substr(0,51) === 'https://www.sendmygift.com/checkout/onepage/success'){
 console.log('RevX Remarketing Conversion Pixel conversion page');
  
	var orderid=document.querySelectorAll(".container p")[0].innerHTML.substr(0,40).replace(/\D/g,'');
       var ordervalue=google_tag_params.ecomm_totalvalue;

	  var ast=document.createElement('script'); ast.type="text/javascript";
	ast.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//trk.atomex.net/cgi-bin/tracker.fcgi/conv?px=10850&ty=1&tid="+ orderid + "&tamt=" + ordervalue;
	document.body.appendChild(ast); 

  console.log('VE pixel');
    var ast=document.createElement('img');
    ast.width="1"; ast.height="1";    ast.src="//cdsch2.veinteractive.com/DataReceiverService.asmx/Pixel?journeycode=76B8CA61-D900-47E1-B544-55D8D04919BB";
    document.body.appendChild(ast);
   
     }
    
 
},1);
})(window)}
