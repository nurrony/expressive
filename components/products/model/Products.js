var _ = require( 'lodash' );
var ProductModel = function () {

    var
        _listProducts = function ( models, callback ) {
            models.products.find( function ( err, products ) {
                if ( err ) callback( err, null );
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
        }


    return {
        getProducts      : _listProducts,
        getProductDetails: _productDetails,
        createProduct    : _create
    }

}();

module.exports = ProductModel;