var config = {
	local: {
		ip: '127.0.0.1',
		port: 3000,
		db: 'mysql',
		components: ['categories','products']
	},
	staging: {
		ip: '127.0.0.1',
		port: 8000,
		db: 'mongo',
		components: ['categories','products']
		
	},
	production: {
		ip: '192.168.20.3',
		port: 5000,
		db: 'mysql',
		components: ['categories','discovery']
	}
}

module.exports = function(mode) {
	return config[ mode || process.argv[2] || 'local'] || config.local;
}