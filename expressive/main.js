/**
 *
 * I don't believe on licensing. but if it helps anyone then i will be the happiest man in the world
 *
 **/


var _ = require( 'lodash' ),
    dns = require( 'dns' ),
    config = require( '../config' ),
    dbConfig = require( '../config/database' ),
    DB = require( './DB' ),
    multipart = require( 'connect-multiparty' ),
    multipartMiddleware = multipart(),
    everyAuth = require( 'everyauth' );

var BuildExpressive = function () {
    var _config = null,
        _app = {},
        _dbConfig = null,
        _expressiveDefault = null;
    var
        _getDomainName = function ( ip ) {
            ip = ip || '127.0.0.1';
            dns.resolve( ip, function ( err, domain ) {
                if ( err ) {
                    throw new Error( "An error has occured during reversing domanin name: " + err.message );
                }
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
                'salt'             : _config.salt || 'hello expressive',
                multipartMiddleware: multipartMiddleware
            };

        },

        _setExpressiveGlobals = function ( app, express, config ) {

            config = _.assign( {}, _expressiveDefault, config );

            if ( _.isPlainObject( config ) ) {
                _.each( config, function ( value, vars ) {
                    app.set( vars, value );
                } );
            }
            app.use( express.favicon() );
            app.use( express.logger( 'dev' ) );
            // as Connect-3 is going to remove multipart middleware so we aren't going to use bodyParser.
            //app.use(express.bodyParser());
            app.use( express.methodOverride() );
            app.use( express.cookieParser( config.salt ) );
            app.use( express.session() );
            app.use( everyAuth.middleware( app ) );
            app.use( app.router );
            //return _.assign({},app,app);
            _app = _.assign( {}, app, _app )
        },

        _getGlobal = function ( key ) {
            var value = '';

            var check = ( typeof key !== 'undefined' && key !== '' &&
                typeof (value = _app.get( key )) !== 'undefined'
                ) ? value : null;

            if ( check ) {
                return check;
            } else {
                throw new Error( "Expressive Error: You must provide a valid key" );
            }
        },

        _prepareDb = function ( app ) {
            DB.setup( _dbConfig, app);
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

        _init = function ( app, express, env, config ) {
            _initConfig( app, env );
            _prepareDb( app );
            _setExpressiveGlobals( app, express, config );
            //_getDomainName(_config.ip);


            _initAdminComponents( app );
            _initFrontendComponents( app );
        },

        _getUrl = function ( path ) {
            path = (path) ? '/' + path : '';
            return process.cwd().path;
        };

    return {
        init     : _init,
        /* setGlobal : _setGlobal,*/
        getGlobal: _getGlobal,
        getUrl   : _getUrl
    }

};


module.exports = function () {
    var expressive = new BuildExpressive();

    if ( typeof global.expressive === 'undefined' ) {
        global.expressive = expressive;
    }

    return expressive;

};