const crypto = require('crypto');

const encrypt = (pwd) => {
  let md5 = crypto.createHash('md5');
  return md5.update(pwd).digest('hex');
}

module.exports = { encrypt }
