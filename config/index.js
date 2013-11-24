var config = {
    local     : {
        ip        : 'nmrony.local',
        port      : 3000,
        db        : 'mysql',
        salt      : 'myexpress salt',
        components: ['products']
    },
    staging   : {
        ip        : '127.0.0.1',
        port      : 8000,
        db        : 'mongo',
        salt      : 'myexpress salt',
        components: ['products']

    },
    production: {
        ip        : '192.168.20.3',
        port      : 5000,
        db        : 'mysql',
        salt      : 'myexpress salt',
        components: ['categories', 'discovery']
    }
};

module.exports = function ( mode ) {
    return config[ mode || process.argv[2] || 'local'] || config.local;
};