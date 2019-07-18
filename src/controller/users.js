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

  const sql = `insert into users (username, pwd) values (${escape(username)}, ${escape(pwd)})`
  return exec(sql).then(result => {
    return {
      id: result.insertId
    }
  })
}

const isExistUsername = (username) => {
  const sql = `select username from users where username= ${escape(username)}`

  return exec(sql).then(rows => {
    return rows[0]
  })
}

module.exports = {
  handleLogin,
  handleRegister,
  isExistUsername
}
