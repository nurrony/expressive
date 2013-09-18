
var ProductModel = function () {

       var 
         _listProducts = function (models,callback) {
           models.products.find(function(err,products){
              if(err) callback(err, null);
              callback(null,products)
           });

         },
         _productDetails = function (models,obj,callback){
            models.products.find(obj,function(err,products){
              if(err) callback(err, null);
              callback(null,products)
           }); 
         }
       

       
      return {
           getProducts : _listProducts,
           getProductDetails:_productDetails
      }

}();

module.exports = ProductModel;