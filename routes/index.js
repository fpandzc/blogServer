const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/api/list', function(req, res, next) {
  if(!req.session.username){
    return res.send('未登录');
  }
  res.send('首页');
});

module.exports = router;
