const { exec,escape} = require('../db/mysql')

const handleAddBlog = (blogData) => {
  const {tittle,content,author,createTime} = blogData
  let sql = `insert into blogs (tittle, content, author, createTime, updateTime) values (${escape(tittle)}, ${escape(content)},${escape(author)},${escape(createTime)},${escape(createTime)}) `
  return exec(sql).then(result => {
    return {
      id: result.insertId
    }
  })
}

const handleGetBlogList = (author) => {
  let sql = `select id,tittle,author,createTime,updateTime from blogs where author=${escape(author)}`;
  return exec(sql).then(rows => {
    return rows
  })
}

const handleGetBlogDetail = (id,author) => {
  let sql = `select tittle,content,author,createTime,updateTime from blogs where author=${escape(author)} and id=${escape(id)}`;
  return exec(sql).then(rows => {
    return rows
  })
}

const handleUpdateBlog = (id, blogData) => {
  //blogData 是页面发送的数据
  //id 是编辑博客的id
  const {tittle,content,author,updateTime} = blogData
  const sql =  `
        update blogs set 
        tittle='${tittle}',
        content='${content}',
        updateTime='${updateTime}'
        where author='${author}'
        and id='${id}'
    `
  //告诉前端是否更新成功
  return exec(sql).then(updateResult => {
    return updateResult.affectedRows > 0
  })
}

const handleDeleteBlog = (id, author) => {
  //blogData 是页面发送的数据
  const sql =  `
        delete from blogs where id='${id}' and author='${author}'
    `

  return exec(sql).then(delResult => {
    return delResult.affectedRows > 0
  })
}

module.exports = {
  handleAddBlog,
  handleGetBlogList,
  handleGetBlogDetail,
  handleUpdateBlog,
  handleDeleteBlog
}


