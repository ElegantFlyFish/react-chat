import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'


const socket = io('ws://localhost:8989')
// @connect(
//   state => state.chatuser,
//   { getUserList }
// )
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text:'',
      msg:[]
    }
  }
  componentDidMount(){
    //const socket = io('ws://localhost:8989')
    socket.on('receiveMsg',v => {
      console.log(v)
      this.setState({
        msg:[...this.state.msg,v.text]
      })
    })
  }
  handleSubmit(){
    socket.emit('sendMsg',{ text:this.state.text })
    this.setState({ text:'' })
  }
  render(){
    //console.log(this.props)
    //console.log();
    return (
      <div>
        { this.state.msg.map(v => {
          return <p key={v}>{v}</p>
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