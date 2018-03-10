const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('socket connected')
  socket.on('sendMsg',v =>{
    io.emit('receiveMsg',v)
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(8989,function(){
  console.log('express started');
})