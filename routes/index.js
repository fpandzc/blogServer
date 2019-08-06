const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const router = express.Router();
const {loginCheck} = require('../src/middleware/middleware')
const {SuccessModel, ErrorModel} = require('../src/model/resModel');
const {
  handleAddBlog,
  handleGetBlogList,
  handleGetBlogDetail,
  handleUpdateBlog,
  handleDeleteBlog
} = require('../src/controller/index');

/* GET home page. */
router.get('/index', loginCheck, function (req, res, next) {
  const data = {};
  data.username = req.session.username;
  return res.json(
    new SuccessModel(data, '已登录')
  );
});

router.post('/imgAdd', function (req, res, next) {
  const form = new formidable.IncomingForm();
  form.parse(req, function (error, fields, files) {
    let url = `../blogData/${req.session.username}`;

    fs.stat(url, (err, stats) => {
      if (err && err.errno === -4058) {
        fs.mkdir(url, err => {
          if (err) {
            return res.json(
              new ErrorModel('目录创建失败')
            );
          }
          url = `${url}/${files.image.name}`;
          fs.writeFile(url, fs.readFileSync(files.image.path), err => {
            url = `${req.protocol}://${req.hostname}:3000/${req.session.username}/${files.image.name}`;
            return res.json(
              new SuccessModel({
                url: url
              }, '图片上传成功')
            );
          });
        })
      } else {
        url = `${url}/${files.image.name}`;
        fs.writeFile(url, fs.readFileSync(files.image.path), err => {
          url = `${req.protocol}://${req.hostname}:3000/${req.session.username}/${files.image.name}`;
          return res.json(
            new SuccessModel({
              url: url
            }, '图片上传成功')
          );
        });
      }
    })
  });
});

router.post('/addBlog', function (req, res, next) {
  let [tittle, content, author,createTime] = [req.body.tittle, req.body.content, req.session.username, req.body.createTime];
  let blogData = {
    tittle,
    content,
    author,
    createTime
  };

  const result = handleAddBlog(blogData);

  return result.then(data => {
    if (!data.id) {
      return res.json(
        new ErrorModel('新增博客失败')
      );
    }
    return res.json(
      new SuccessModel('新增博客成功')
    );
  })
})

router.get('/blogList', function (req, res, next) {
  const author = req.session.username;
  const result = handleGetBlogList(author);

  return result.then(data => {

    return res.json(
      new SuccessModel({blogList: data}, '博客列表查询成功')
    );
  })
})

router.get('/blogDetail', function (req, res, next) {
  const author = req.session.username,
    id = req.query.id;
  const result = handleGetBlogDetail(id, author);

  return result.then(data => {
    if (data && data.length === 1) {
      return res.json(
        new SuccessModel({blogDetail: data[0]}, '博客详情查询成功')
      );
    }

    return res.json(
      new ErrorModel('博客详情查询失败')
    );
  })
})

router.post('/updateBlog', function (req, res, next) {
  let [tittle, content, author,updateTime] = [req.body.tittle, req.body.content, req.session.username, req.body.updateTime]
  let blogData = {
    tittle,
    content,
    author,
    updateTime
  };
  const id = req.query.id;
  const result = handleUpdateBlog(id, blogData);

  return result.then(data => {
    if (!data.id) {
      return res.json(
        new ErrorModel('更新博客失败')
      );
    }
    return res.json(
      new SuccessModel('更新博客成功')
    );
  })
})

router.get('/deleteBlog', function (req, res, next) {
  const author = req.session.username,
    id = req.query.id;
  const result = handleDeleteBlog(id, author);

  return result.then(data => {
    if (!data) {
      return res.json(
        new ErrorModel('删除博客失败')
      );
    }
    return res.json(
      new SuccessModel('删除博客成功')
    );
  })
})

module.exports = router;
