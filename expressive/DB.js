/**
 * Created by nmrony on 11/24/13.
 */
var filesystem = require( 'fs' ),
    models = {},
    relationships = {};

var singleton = function singleton() {
    var orm = require( "orm" ),
        paging = require( "orm-paging" ),
        modelsPath = "";
    this.setup = function ( DSN, app, dbType ) {
        app.use( orm.express( DSN, {
            define: function ( db, models, next ) {
                db.use(paging);
                init( dbType, db, models );
                next();
            }
        } ) );
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