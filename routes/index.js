var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/login', function(req, res, next) {
  res.send('登录成功');
});

module.exports = router;
