const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const app = express()


const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('socket connected')
  socket.on('sendmsg',v =>{
    // console.log(v)
    // io.emit('receiveMsg',v)
    const { from, to, msg } = v
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid, from, to, content:msg},(err, doc) => {
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(8989,function(){
  console.log('express started');
})