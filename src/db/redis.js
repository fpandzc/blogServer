const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
    console.error(err)
})

const set = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

const get = (key) => {
    console.info('get', key)
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            console.info('get',val)
            if (!val) {
                resolve(val)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val)
            }
        })
    })
}

module.exports = {
    set,
    get
}