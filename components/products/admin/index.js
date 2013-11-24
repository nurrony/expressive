var _ = require( 'lodash' );
var productmodel = require( './model/Products' );
var multipartMiddleware = expressive.getGlobal( 'multipartMiddleware' );

var ProductsController = function () {
    return {
        index: function ( req, res, next ) {
            res.json( {greetings: "hello Admin"} );
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

        create       : function ( req, res, next ) {
            productmodel.createProduct( req.models, req.body, function ( err, result ) {
                res.json( result );
            } );
        },
        deleteProduct: function ( req, res, next ) {
            var id = req.params.id;
            if ( !id ) {
                res.end( "ID not provided" );
            }
            productmodel.deleteProduct( req.models, id, function ( err, result ) {
                res.json( result );
            } );


        }

    };
};

module.exports = function ( app ) {

    var ProductsCtrl = new ProductsController();
    console.log( "In Admin Product Ctrl:" );
    app.get( '/admin/products', ProductsCtrl.index );
    app.get( '/admin/products/list', ProductsCtrl.list );
    app.get( '/admin/products/:id', ProductsCtrl.details );
    app.delete( '/admin/products/remove/:id', ProductsCtrl.deleteProduct );
    app.post( '/admin/products/create', multipartMiddleware, ProductsCtrl.create );

};