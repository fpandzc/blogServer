const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

const conn = mysql.createConnection(MYSQL_CONF);

conn.connect()

function exec(sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql,(err, result) => {
            if (err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports  = {
    exec
}