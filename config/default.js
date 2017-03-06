module.exports = {
	port: 3000,
	session: {
		secret: 'CIT',
		key: 'CIT',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://localhost:27017/CIT'
};