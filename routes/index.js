var PostModel = require('../models/posts');
var CommentModel = require('../models/comments');
module.exports = function(app) {
	app.get('/', function(req, res) {
		res.redirect('/posts');
	});
	app.get('/skip', function(req, res) {
		res.status('200');
		var author = req.query.author;
		var page = req.query.page;
		PostModel.getPostSkip(author, page)
			.then(function(posts) {
				res.json(posts);
			})
	});
	app.get('/screening', function(req, res) {
		res.status('200');
		var rank = req.query.rank;
		if (rank == 0) {
			rank = '';
		}
		PostModel.getPostRank(rank)
			.then(function(posts) {
				res.json(posts);
			})
	});
	// app.get('/delete', function(req, res) {
	// 	var commentId = req.query.commentId;
	// 	var author = req.query.author;
	// 	CommentModel.delCommentById(commentId, author)
	// 		.then(function(posts) {
	// 			res.json(posts);
	// 		})
	// });
	app.use('/signup', require('./signup'));
	app.use('/signin', require('./signin'));
	app.use('/signout', require('./signout'));
	app.use('/posts', require('./posts'));
	app.use('/modify', require('./modify'));
	// 404 page
	app.use(function(req, res) {
		if (!res.headersSent) {
			res.status(404).render('404');
		}
	});
};