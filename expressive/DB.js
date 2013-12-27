/**
 * Created by nmrony on 11/24/13.
 * need to test for mongodb instance
 */
var filesystem = require( 'fs' ),
    _ = require("lodash" ),
    models = {},
    relationships = {};

var singleton = function singleton() {
    var orm = require( "orm" ),
        paging = require( "orm-paging" ),
        modelsPath = "";
    this.setup = function ( databases , app) {
        _.each(databases, function(dbInfo, protocol){
            var dbport = dbInfo.port !== '' ? (':' + dbInfo.port) : ''
                , _dbDSN = protocol + '://' + dbInfo.username + ':' + dbInfo.password + '@' + dbInfo.host + dbport + '/' + dbInfo.dbname;

            app.use( orm.express( _dbDSN, {
                define: function ( db, models, next ) {
                    db.use(paging);
                    init( protocol, db, models );
                    next();
                }
            } ) );
        });

    }

    this.model = function ( name ) {
        return models[name];
    }

    this.orm = function () {
        return orm;
    }

    function init( dbType, db, models ) {
        var baseDir = process.cwd(),
            modelsPath = baseDir + '/config/dbSchema/' + dbType + '/';
        filesystem.readdirSync( modelsPath ).forEach( function ( name ) {

            var object = require( modelsPath + name );
            var options = object.options || {}
            var modelName = name.replace( /\.js$/i, "" );
            models[modelName] = db.define( modelName, object.model, options );
            if ( "relations" in object ) {
                relationships[modelName] = object.relations;
            }
        } );

        for ( var name in relationships ) {
            var relation = relationships[name];
            for ( var relName in relation ) {
                var related = relation[relName];
                models[name][relName]( related, models[related] );
            }
        }

        db.sync( function ( err ) {
            !err && console.log( "Database Tables Created Successfully!" );
        } );

    }

    if ( singleton.caller != singleton.getInstance ) {
        throw new Error( "This object cannot be instanciated" );
    }
}

singleton.instance = null;

singleton.getInstance = function () {
    if ( this.instance === null ) {
        this.instance = new singleton();
    }
    return this.instance;
}

module.exports = singleton.getInstance();