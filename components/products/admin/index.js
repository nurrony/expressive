var _ = require( 'lodash' );
var productAdminmodel = require( './model/Products' );
var multipartMiddleware = expressive.getGlobal( 'multipartMiddleware' );

var ProductsController = function () {
    return {
        index: function ( req, res, next ) {
            res.json( {greetings:"hello Admin"} );
        },
        list : function ( req, res, next ) {
            productAdminmodel.getProducts( req.models, function ( err, allProducts ) {
                if ( err ) res.send( err );
                res.json( allProducts );
                allProducts = null;
            } );

        },

        details: function ( req, res, next ) {
            //generally we assume that you are going to get the details by using id
            var obj = {id: req.params.id};
            productAdminmodel.getProductDetails( req.models, obj, function ( err, product ) {
                if ( err ) res.send( err );
                res.json( product );
                product = obj = null;
            } );
        },

        create: function ( req, res, next ) {
            productAdminmodel.createProduct( req.models, req.body, function ( err, result ) {
                res.json( result );
            } );
        }

    };
};

module.exports = function ( app ) {

    var ProductsCtrl = new ProductsController();
    console.log("In Admin Product Ctrl:");
    app.get( '/admin/products', ProductsCtrl.index );
    app.get( '/admin/products/:id', ProductsCtrl.details );
    app.post( '/admin/products/create', multipartMiddleware, ProductsCtrl.create );

};