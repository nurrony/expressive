var _ = require( 'lodash' );
var productmodel = require( './model/Products' );
var multipartMiddleware = expressive.getGlobal( 'multipartMiddleware' );

var ProductsController = function () {
    return {
        index: function ( req, res, next ) {
            console.log( "hello world" );
        },
        list : function ( req, res, next ) {
            productmodel.getProducts( req.models, function ( err, allProducts ) {
                if ( err ) res.send( err );
                res.json( allProducts );
                allProducts = null;
            } );

        },

        details: function ( req, res, next ) {
            //generally we assume that you are going to get the details by using id
            var obj = {id: req.params.id};
            productmodel.getProductDetails( req.models, obj, function ( err, product ) {
                if ( err ) res.send( err );
                res.json( product );
                product = obj = null;
            } );
        },

        create: function ( req, res, next ) {
            console.log( req.files );
            productmodel.createProduct( req.models, req.body, function ( err, result ) {
                res.json( result );
            } );
        }

    }
}

module.exports = function ( app ) {

    var ProductsCtrl = new ProductsController();
    console.log( "In product Ctrl:" )
    app.get( '/products', ProductsCtrl.list );
    app.get( '/products/:id', ProductsCtrl.details );
    app.post( '/products/create', multipartMiddleware, ProductsCtrl.create );

}