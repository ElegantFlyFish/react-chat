import React from "react";
import {Redirect} from 'react-router-dom';
import Logo from "../../component/logo/logo"
import {Button, WhiteSpace, WingBlank, List, Radio, InputItem} from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';

import AppForm from '../../component/app-form/app-from'

@connect(
  state => state.user,
  { register }
)
@AppForm
class Register extends React.Component{
  constructor(props){
    super(props)
    // this.state = {
    //   type:'genius',
    //   user:'',
    //   pwd:'',
    //   repeatpwd:''
    // }
    this.handlerRegister = this.handlerRegister.bind(this)
  }
  // handlerChange(key,v){
  //   this.setState({
  //     [key]:v
  //   })
  // }
  handlerRegister(){
    //console.log(this.state);
    this.props.register(this.props.state)
  }
  render(){
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        {/* <div>注册页</div> */}
        <List>
            <InputItem onChange = { v => this.props.handlerChange('user',v)} >　用户名</InputItem>
            <InputItem type="password" onChange = { v => this.props.handlerChange('pwd',v)} >　密　码</InputItem>
            <InputItem type="password" onChange = { v => this.props.handlerChange('repeatpwd',v)} >确认密码</InputItem>
        </List>
        <WhiteSpace />
        <div className="am-notice-bar">{this.props.msg ? this.props.msg : null}</div>
        <WhiteSpace />
        <List renderHeader={() => '身份类型'}>
          <RadioItem 
          checked={ this.props.state.type === 'genius' } 
          onChange = { () => this.props.handlerChange('type','genius') } 
          >牛人</RadioItem>
          <RadioItem 
          checked={ this.props.state.type === 'boss' }
          onChange = { () => this.props.handlerChange('type','boss')}
          >Boss</RadioItem>
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={ this.handlerRegister }>提交</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register