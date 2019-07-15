const { exec,escape} = require('../db/mysql')

const handleLogin = (username,  pwd) => {
  const sql = `
        select username from users where username=${escape(username)} and pwd=${escape(pwd)}
    `
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const handleRegister = (username,  pwd) => {
  let sql = `select username from users where username= ${escape(username)}`
  return exec(sql).then(rows => {
    if(rows[0]){
      return {
        msg: `用户名已存在`
      }
    }

    sql = `insert into users (username, pwd) values (${escape(username)}, ${escape(pwd)})`
    return exec(sql).then(result => {
      return {
        id: result.insertId
      }
    })
  })
}

module.exports = {
  handleLogin,
  handleRegister
}
