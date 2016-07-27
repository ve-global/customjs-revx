# customjs-revx   
    var urlVe = window.location.href;
    var settings = {
        clientId: '6911',
        domain: 'www.uniqlo.com/',
        journeycode: 'A0270D56-2CD9-485F-B570-E2AE46A7F18D',
        veHostDomain: 'cdshk.veinteractive.com',
        default_atm_params: {
            t: 'r',
            channel: getDevice()
        },
        webpages:[{
            name: 'Homepage',
            url: {
                path: '/my/'
            },
            atm_params: {
                f: 'v'
            }
        },
        {
            name: 'Category',
            url: {
                selector: '.category-products .contProd' 
            },
            atm_params: {
                f: 'b',
            //  c: getNumberFromHref(1,''),  //category id
                cn: urlVe.substr(urlVe.lastIndexOf('/') + 1).replace('.html','')//category name
            }
        },
      {
            name: 'Product',
            url: {
                selector: '.product-view #prodInfo' 
            },
            atm_params: {
                f: 'c',
                cn: getValueBySelector(".pathdetail a:nth-child(1)"),//category name
                //scn: getValueBySelector(""),//subcategory name
                //c: getNumberFromHref(2,''), //category id
                oprc:  getValueBySelector(".basic .old-price span"),  //original price
                id: getNumberFromHref(6,'.basicinfo_wrap .basic Li:nth-child(1)'), //sku
              //  id2: getNumberFromHref(7,"#product_id"), //sku2
                sprc: getValueBySelector(".basic .special-price span") //sale price
            }
        },
    
     {
            name: 'Basket',
            url: {
                path: '/my/store/checkout/cart/'
            },
            atm_params: {
                f: 's',
                id: getListProductId("#shopping-cart-table .product-image img","([0-9]+){5,}"),  //product id, pass coma if >1 product added
                sprc: getValueBySelector("#shopping-cart-totals-table .price .price") //total basket
            }

        },{
            name: 'Checkout',
            url: {
                path: '/my/store/onestepcheckout'
            },
            atm_params: {
                f: 's',
                id:  getListProductId("#onestepcheckout-summary .name img","([0-9]+){5,}"),  //product id, pass coma if >1 product added
                sprc: getValueBySelector('.subtotal .price') //total basket 
            }
        },
       {
            name: 'Conversion',
            url: {
                path: '/my/store/checkout/onepage/success/'
            },
            atm_params: {
                f: 'p',
              tid: getValueBySelector('.odr-nbr'),
              tamt: getValueBySelector('#refcandy-mint','data-amount') //total amount paid
            }

         //   isConversionPage: {
          //      orderId: '',
           //    orderValue: '',
              //  pixelId: ''
           // }
        }]
    };

