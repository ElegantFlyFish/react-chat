import React from "react"
import {Redirect} from 'react-router-dom'
import Logo from "../../component/logo/logo"
import { Button, WhiteSpace, WingBlank, List, InputItem } from 'antd-mobile'
import { connect } from "react-redux"

import { login } from '../../redux/user.redux'
import AppForm from '../../component/app-form/app-from'

@connect(
  state => state.user,
  { login }
)
@AppForm
class Login extends React.Component{
  constructor(props){
    super(props)
    // this.state = {
    //   user:'',
    //   pwd:''
    // }
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
  }
  login(){
    this.props.login(this.props.state);
  }
  register(){
    this.props.history.push('/register')
  }
  // handlerChange(key,val){
  //   this.setState({
  //     [key]:val
  //   })
  // }
  render(){
    return (
      <div>
        { this.props.redirectTo ? <Redirect to = { this.props.redirectTo }></Redirect> : null }
        <Logo></Logo>
        <List>
          <InputItem onChange = { v => this.props.handlerChange('user',v)} >用户名</InputItem>
          <InputItem type="password" onChange = { v => this.props.handlerChange('pwd',v)}>密　码</InputItem>
        </List>
        <WhiteSpace />
        <div style={{color:"red"}} className="am-notice-bar">{this.props.msg ? this.props.msg : null}</div>
        <WhiteSpace />
        <WingBlank>
          <Button onClick = {this.login} type="primary">登陆</Button>
          <WhiteSpace />
          <Button onClick = {this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login