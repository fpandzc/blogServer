 const { ErrorModel } = require('../model/resModel')
const loginCheck  = (req,res,next) => {
  if(res.session.username){
    next()
  }

  return new ErrorModel('未登录')
}
