var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
	res.render('signup');
});

// POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
	var name = req.fields.name;
	var userName = req.fields.userName;
	var bio = req.fields.bio;
	var avatar = req.files.avatar.path.split(path.sep).pop();
	var password = req.fields.password;
	var repassword = req.fields.repassword;

	// 校验参数
	try {
		if (!(userName.length >= 1 && userName.length <= 10)) {
			throw new Error('登录名请限制在 1-10 个字符');
		}
		if (!(name.length >= 1 && name.length <= 20)) {
			throw new Error('名字请限制在 1-20 个字符');
		}
		if (!(bio.length >= 1 && bio.length <= 30)) {
			throw new Error('个人简介请限制在 1-30 个字符');
		}
		if (!req.files.avatar.name) {
			throw new Error('缺少头像');
		}
		if (password.length < 6) {
			throw new Error('密码至少 6 个字符');
		}
		if (password !== repassword) {
			throw new Error('两次输入密码不一致');
		}
	} catch (e) {
		// 注册失败，异步删除上传的头像
		fs.unlink(req.files.avatar.path);
		req.flash('error', e.message);
		return res.redirect('/signup');
	}

	// 明文密码加密
	password = sha1(password);

	// 待写入数据库的用户信息
	var user = {
		name: name,
		userName: userName,
		password: password,
		bio: bio,
		avatar: avatar
	};
	// 用户信息写入数据库
	UserModel.create(user)
		.then(function(result) {
			// 此 user 是插入 mongodb 后的值，包含 _id
			user = result.ops[0];
			// 将用户信息存入 session
			delete user.password;
			req.session.user = user;
			// 写入 flash
			req.flash('success', '注册成功');
			// 跳转到首页
			res.redirect('/posts');
		})
		.catch(function(e) {
			// 注册失败，异步删除上传的头像
			fs.unlink(req.files.avatar.path);
			// 用户名被占用则跳回注册页，而不是错误页
			if (e.message.match('E11000 duplicate key')) {
				req.flash('error', '登录名已被占用');
				return res.redirect('/signup');
			}
			next(e);
		});
});

module.exports = router;