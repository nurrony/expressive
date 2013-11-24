var _ = require( 'lodash' ),
    productmodel = require( './model/Products' ),
    multipartMiddleware = expressive.getGlobal( 'multipartMiddleware' );
var templateDir = __dirname + '/views/';
var ProductsController = function () {
    return {
        index: function ( req, res, next ) {
            res.render( templateDir + "index" );
        },
        list : function ( req, res, next ) {
            productmodel.getProducts( req.models, function ( err, allProducts ) {
                console.log( "in frondend list" );
                if ( err ) {
                    res.send( err );
                }
                res.json( allProducts );
                allProducts = null;
            } );

        },

        details   : function ( req, res, next ) {
            //generally we assume that you are going to get the details by using id
            var obj = {id: req.params.id};
            productmodel.getProductDetails( req.models, obj, function ( err, product ) {
                if ( err ) {
                    res.send( err );
                }
                res.json( product );
                product = obj = null;
            } );
        },
        findByUser: function ( req, res, next ) {
            var uid = req.params.uid;
            productmodel.getByUser( req.models, uid, function ( err, product ) {
                if ( err ) {
                    res.send( "Error happened" );
                }
                res.json( product );
            } );
        }

    };
};

module.exports = function ( app ) {

    console.log( "In Frontend Product Ctrl:" );
    var ProductsCtrl = new ProductsController();
    app.get( '/products', ProductsCtrl.list );
    app.get( '/products/:id', ProductsCtrl.details );
    app.get( '/products/user/:uid', ProductsCtrl.findByUser );

};