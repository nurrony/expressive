var _ = require( 'lodash' );
var ProductModel = function () {

    var
        _listProducts = function ( models, callback ) {
            models.posts.find( function ( err, products ) {
                if ( err ) {
                    callback( err, null );
                }
                callback( null, products )
            } );

        },

        _getByUser = function ( models, uid, callback ) {
            console.log( uid );
            models.posts.findByUsers( {"users_id": uid} ).find( function ( err, post ) {
                if ( err ) {
                    callback( err, null )
                }
                callback( null, post );
            } );
        },

        _productDetails = function ( models, obj, callback ) {
            models.posts.find( obj, function ( err, products ) {
                if ( err ) {
                    callback( err, null );
                }
                callback( null, products );
            } );
        };


    return {
        getProducts      : _listProducts,
        getProductDetails: _productDetails,
        getByUser        : _getByUser
    }

}();

module.exports = ProductModel;