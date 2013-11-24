/**
 * Created by nmrony on 10/29/13.
 */
var _ = require( 'lodash' );
var ProductModel = function () {

    var
        _listProducts = function ( models, callback ) {
            models.products.find( function ( err, products ) {
                if ( err ) callback( err, null );
                console.log(products);
                callback( null, products )
            } );

        },
        _productDetails = function ( models, obj, callback ) {
            models.products.find( obj, function ( err, products ) {
                if ( err ) callback( err, null );
                callback( null, products )
            } );
        },

        _create = function ( models, obj, callback ) {
            obj = ( _.isArray( obj )) ? obj : [obj];
            models.products.create( obj, function ( err, success ) {
                if ( err ) {
                    callback( err, null );
                    return;
                }
                callback( null, success );
                return;
            } );
        },
    _delete = function ( models, id, callback ) {
        models.products.find({ id: id }).remove(function (err) {
            if(err){
                callback(err,null); return;
            }
            callback(null,{success:1, message: "Product deleted successfully with ID#"+ id});
            return;
        });
    };


    return {
        getProducts      : _listProducts,
        getProductDetails: _productDetails,
        createProduct    : _create,
        deleteProduct : _delete
    }

}();

module.exports = ProductModel;
