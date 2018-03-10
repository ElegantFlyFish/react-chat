const utils = require('utility');
const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

const filter = { pwd:0, __v:0 }

Router.get('/list',(req,res) => {
  //User.remove({},(err,doc)=>{})
  const { type } = req.query
  User.find({type},(err,doc) => {
    if(!err){
      res.json({ code:0, data:doc });
    }else{
      console.log(err);
    }
  });
}) 

Router.post('/login',(req, res) => {
  const { user, pwd } = req.body
  User.findOne({ user, pwd:md5Pwd(pwd) }, filter, (err, doc) => {
    if(!doc){
      return res.json({ code:1, msg:'用户名或密码错误！'})
    }
    res.cookie('userid',doc._id);
    return res.json({ code:0, data:doc})
  })
})

Router.post('/register',(req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({ user },(err, doc) => {
    if(doc){
      return res.json({ code:1, msg:'用户名重复！' })
    }
    const userModel = new User({ user, pwd:md5Pwd(pwd), type })
    userModel.save((err, doc) => {
      if(err){
        return res.json({ code:1, msg:`服务器错误：${err}`})
      }
      if(doc){
        const { user, type, _id } = doc
        res.cookie('userid', _id)
        return res.json({ code:0 ,data:{ user, type, _id } })
      }
    })
  })
})

Router.post('/update',(req, res) => {
  const userid = req.cookies.userid
  if(!userid){
    return res.json({ code:1 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,(err, doc) => {
    const data = Object.assign({}, {
      user:doc.user,
      type:doc.type
    }, body)
    return res.json({code:0,data});
  })
})

//密码加密自定义
function md5Pwd(pwd){
  const salt = 'qwedD43~@&*%$213sdc_+=';//定义一个足够复杂的字符
  return utils.md5(utils.md5(salt)+pwd);
}

Router.get('/info',(req,res) => {
  //console.log(req.cookies)
  // 校验用户的cookie
  const { userid }  = req.cookies
  if(!userid){
    res.json({ code:1})
  }
  User.findOne({ _id:userid }, filter, (err,doc) => {
    if(err){
      res.json({ code:1, msg:`服务器错误：${err}` })
    }
    if(doc){
      res.json({ code:0, data:doc })
    }
  })
  
})

module.exports = Router