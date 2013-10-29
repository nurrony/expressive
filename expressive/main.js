/**
 *
 * I don't believe on licensing. but if it helps anyone then i will be the happiest man in the world
 *
 **/


var _ = require( 'lodash' ),
    orm = require( 'orm' ),
    dns = require( 'dns' ),
    config = require( '../config' ),
    dbConfig = require( '../config/database' ),
    multipart = require( 'connect-multiparty' ),
    multipartMiddleware = multipart(),
    dbSchema = require( '../config/dbSchema' );


var BuildExpressive = function () {
    var _config = null,
        _app = {},
        _dbConfig = null,
        _expressiveDefault = null;
    var
        _getDomainName = function ( ip ) {
            ip = ip || '127.0.0.1';
            dns.resolve( ip, function ( err, domain ) {
                if ( err ) throw new Error( "An error has occured during reversing domanin name: " + err.message );
                console.log( domain );
                _config.hostname = domain;
            } );
            console.log( "In _getDomainName:" );
            console.log( _config.hostname );
        },
        _initConfig = function ( app, env ) {
            _config = config( env );
            _dbConfig = dbConfig( _config.db );
            _expressiveDefault = {
                dbms               : 'mysql',
                port               : _config.port,
                ip                 : _config.ip || '127.0.0.1',
                'view engine'      : _config.view_engine || 'jade',
                multipartMiddleware: multipartMiddleware,
                orm                : orm
            };

        },

        _setExpressiveGlobals = function ( app, config ) {

            config = _.assign( {}, _expressiveDefault, config );

            if ( _.isPlainObject( config ) ) {
                _.each( config, function ( value, vars ) {
                    app.set( vars, value );
                } );
            }
            //return _.assign({},app,app);
            _app = _.assign( {}, app, _app )
        },

        _setGlobal = function ( key, value ) {
            _app.set( key, value );
            _app = _.assign( {}, _app );
        },

        _removeGlobal = function ( key ) {
            if ( typeof _app.get( key ) !== 'undefined' && typeof key !== '' && typeof key !== 'undefined' )
                _app.splice( key );
            _app = _.assign( {}, _app );
        },

        _getGlobal = function ( key ) {
            var value = '';

            var check = ( typeof key !== 'undefined' && key !== '' &&
                          typeof (value = _app.get( key )) !== 'undefined'
                        ) ? value : null;

            if ( check ) return check; else throw new Error( "Expressive Error: You must provide a valid key" );
        },

        _prepareDb = function ( app ) {

            var dbport = _dbConfig.port !== '' ? (':' + _dbConfig.port) : ''
                , _dbDSN = _config.db + '://' + _dbConfig.username + ':' + _dbConfig.password + '@' + _dbConfig.host + dbport + '/' + _dbConfig.dbname;

            app.use( orm.express( _dbDSN, {
                define: function ( db, models ) {
                    _.each( dbSchema, function ( structure, tblname ) {

                        var settings = structure.settings || {},
                            _structure = _.omit( structure, 'settings', settings );
                        models[tblname] = db.define( tblname, _structure, settings );
                    } );
                    //
                    if ( _dbConfig.sync ) {
                        db.sync( function ( err ) {
                            !err && console.log( "Database Tables Created Successfully!" );
                        } );

                    }
                }


            } ) );
        },

        _initFrontendComponents = function ( app ) {

            var baseDir = process.cwd();

            _.each( _config.components, function ( component ) {
                require( baseDir + '/components/' + component + '/frontend/' )( app );
            } );

        },

        _initAdminComponents = function ( app ) {

            var baseDir = process.cwd();

            _.each( _config.components, function ( component ) {
                require( baseDir + '/components/' + component + '/admin/' )( app );
            } );

        },

        _init = function ( app, env, config ) {
            _initConfig( app, env );
            _setExpressiveGlobals( app, config );
            //_getDomainName(_config.ip);
            _prepareDb( app );

            _initAdminComponents( app );
            _initFrontendComponents( app );
        },

        _getUrl = function ( path ) {
            path = (path) ? '/' + path : '';
            return process.cwd().path;
        }

    return {
        init     : _init,
        /* setGlobal : _setGlobal,*/
        getGlobal: _getGlobal,
        getUrl   : _getUrl
    }

};


module.exports = function () {
    expressive = new BuildExpressive();

    if ( typeof global.expressive === 'undefined' ) global.expressive = expressive;

    return expressive;

};