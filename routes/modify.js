var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', function(req, res, next) {
	res.render('modify');
});

// POST /signup 用户注册
router.post('/', function(req, res, next) {
	var name = req.fields.name;
	var password = req.fields.password;
	var repassword = req.fields.repassword;

	// 校验参数
	try {
		if (password.length < 6) {
			throw new Error('密码至少 6 个字符');
		}
		if (password !== repassword) {
			throw new Error('两次输入密码不一致');
		}
	} catch (e) {
		req.flash('error', e.message);
		return res.redirect('/modify');
	}

	// 明文密码加密
	password = sha1(password);

	UserModel.getUserByName(name)
		.then(function(user) {
			name = user._id;
			UserModel.updatePswById(name, {
				password: password
			})
			req.flash('success', '修改密码成功');
			if (req.session.user._id == name) {
				req.session.user = null;
				// 编辑成功后跳转到上一页
				res.redirect('/signin');
			} else {
				res.redirect('/modify');
			}
		})
		.catch(next);
});

module.exports = router;