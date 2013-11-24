/**
 * Module dependencies.
 */

var express = require( 'express' );
var http = require( 'http' );
var path = require( 'path' );
var app = module.exports = express()
    , server = http.createServer( app )
    , io = require( 'socket.io' ).listen( server )
    , expressive = require( './expressive/main' )
    , cms = expressive();
// all environments
app.configure( function () {
    cms.init( app,express, 'local', {sio: io, "my greeting": " Hello Expressive"} );
    app.use( express.static( path.join( __dirname, 'public' ) ) );
    app.use( function ( req, res, next ) {
        throw new Error( req.url + ' not found' );
    } );
    app.use( function ( err, req, res, next ) {
        console.log( err );
        res.send( err.message );
    } );
} );
app.configure( 'development', function () {
    io.enable( 'browser client minification' );  // send minified client
    io.enable( 'browser client etag' );          // apply etag caching logic based on version number
    io.enable( 'browser client gzip' );          // gzip the file
    app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
    process.on( 'uncaughtException', function ( err ) {
        process.stdout.write( err.message );
    } )

} );

server.listen( app.get( 'port' ), app.get( "ip" ), function () {
    console.log( 'Expressive cms is running and server listening on port http://' + app.get( "ip" ) + ':' + app.get( 'port' ) + '/ ' );
    io = null;
} );