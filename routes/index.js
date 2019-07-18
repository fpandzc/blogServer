const express = require('express');
const router = express.Router();
const { loginCheck } = require('../src/middleware/middleware')
const { SuccessModel, ErrorModel } = require('../src/model/resModel');

/* GET home page. */
router.get('/index', loginCheck, function(req, res, next) {
  return res.json(
    new SuccessModel('主页')
  );
});

module.exports = router;
