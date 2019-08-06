const express = require('express');
const router = express.Router();
const { handleLogin, handleRegister, isExistUsername } = require('../src/controller/users');
const { SuccessModel, ErrorModel } = require('../src/model/resModel');
const { encrypt } = require('../src/utils/encryption');

router.post('/login', function(req, res, next) {
  let [username,pwd] = [req.body.username, encrypt(req.body.pwd)];
  const result = handleLogin(username, pwd);

  return result.then(data => {
    if(!data){
      return res.json(
        new ErrorModel('登录失败')
      );
    }
    req.session.username = data.username
    return res.json(
      new SuccessModel('登录成功')
    );
  })
});

router.post('/register', function(req, res, next) {
  let [username,pwd] = [req.body.username, encrypt(req.body.pwd)];
  const result = handleRegister(username, pwd);

  return result.then(data => {
    if(!data.id){
      return res.json(
        new ErrorModel('注册失败')
      );
    }
    return res.json(
      new SuccessModel('注册成功')
    );
  })
});

router.post('/username', function(req, res, next) {
  let username = req.body.username;
  const result = isExistUsername(username);

  return result.then(data => {
    if(data){
      return res.json(
        new ErrorModel('用户名已存在')
      );
    }
    return res.json(
      new SuccessModel('注册成功')
    );
  })
});

router.get('/logout', function(req, res, next) {
  //清除session
  req.session.destroy((err) => {
    if(err){
      return res.json(
        new ErrorModel('注销失败')
      );
    }
    return res.json(
      new SuccessModel('注销成功')
    );
  })
});

module.exports = router;
