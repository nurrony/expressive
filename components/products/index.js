var _ = require('lodash');
var productmodel = require('./model/Products');
var ProductsController = function(){
	return {
		index: function(req, res, next){
			console.log("hello world");
		},
        list: function(req, res, next){
           productmodel.getProducts(req.models,function(err,allProducts){
             if(err) res.send(err);             
             res.json(allProducts);
             allProducts = null;
           });
           
        },
        details: function(req, res, next){
            //generally we assume that you are going to get the details by using id
            var obj = {id: req.params.id};
           productmodel.getProductDetails(req.models,obj,function(err,product){
             if(err) res.send(err);             
             res.json(product);
             product = obj =  null;
           });
        }
	}
}

module.exports = function(app){
   
    var ProductsCtrl = new ProductsController();

    app.get('/products',ProductsCtrl.list);	
    app.get('/products/:id',ProductsCtrl.details);
    
}