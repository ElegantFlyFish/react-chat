const mongoose = require('mongoose');
const connectOption = {
  user:'zdgf',
  pass:'zdgf'
}
const DB_URL = 'mongodb://zdgf:zdgf@127.0.0.1:27017/chatApp';
mongoose.connect(DB_URL,connectOption);

const models = {
  user:{
    'user':{'type':String, 'require':true},
    'pwd':{'type':String, 'require':true},
    'type':{'type':String, 'require':true},
    'avatar':{'type':String},
    'desc':{'type':String},
    'title':{'type':String},
    'company':{'type':String},
    'salary':{'type':String}
  },
  chat:{
    'chatid':{'type':String, 'require':true},
    'from':{'type':String, 'require':true },
    'to':{'type':String, 'require':true},
    'read':{'type':Boolean, 'default':false},
    'content':{'type':String,'require':true,default:''},
    'create_time':{'type':String,default:Date.now}
  }
}

for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

mongoose.connection.on('connected',function(){
  console.log('mongo connected alreday!');
})

module.exports = {
  getModel:function(name){
    return mongoose.model(name)
  }
}
