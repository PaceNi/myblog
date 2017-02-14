module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: '校园信息',
			description: 'this is my first blog',
			foo: {
				bar: 'baz'
			}
		});
		// res.redirect('/posts');
	});
	app.use('/signup', require('./signup'));
	app.use('/signin', require('./signin'));
	app.use('/signout', require('./signout'));
	app.use('/posts', require('./posts'));
};