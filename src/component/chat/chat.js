import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem } from 'antd-mobile'
import io from 'socket.io-client'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

const socket = io('ws://localhost:8989')

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text:'',
      msg:[]
    }
  }
  componentDidMount(){
    console.log(this.props)
    this.props.getMsgList()
    this.props.recvMsg()
    //const socket = io('ws://localhost:8989')
    // socket.on('receiveMsg',v => {
    //   console.log(v)
    //   this.setState({
    //     msg:[...this.state.msg,v.text]
    //   })
    // })
  }
  handleSubmit(){
   // socket.emit('sendMsg',{ text:this.state.text })
    //this.setState({ text:'' })
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({ text:'' })
  }
  render(){
    //console.log(this.props)
    //console.log();
    return (
      <div>
        { this.props.chat.chatmsg.map(v => {
          return <p key={v._id}>{v.content}</p>
        }) }
        <List className = "stick-footer">
          <InputItem
            value = { this.state.text }
            onChange = { v => this.setState({ text:v }) }
            extra = { <span onClick = { ()=>this.handleSubmit() }  >Send</span> }
          />
        </List>
      </div>
    )
  }
}

export default Chat