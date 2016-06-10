

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
				sc:  getNumberFromHref(3,'')//subcategory id
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
				c: getNumberFromHref(2,'.prodDetailPage .commonBreadCrums #bc1 a'), //category id
				sc: getNumberFromHref(4,'.prodDetailPage .commonBreadCrums #bc1 a'),  //subcategory id
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