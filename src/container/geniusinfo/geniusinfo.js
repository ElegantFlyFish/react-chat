import React from 'react';
import { Button, NavBar, List, InputItem, TextareaItem, WhiteSpace, WingBlank } from "antd-mobile";
import { connect } from 'react-redux'; 
import { Redirect } from 'react-router-dom';

import AvatarSelector from "../../component/avatar-selector/avatar-selector";
import { update } from "../../redux/user.redux";

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:'',
      desc:''
    }
  }
  handlerChange(key,v){
    this.setState({
      [key]:v
    })
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode = "dark" leftContent = "Back">BossInfo Page</NavBar>
        <AvatarSelector selectAvatar = { imgName => this.setState({avatar:imgName}) }></AvatarSelector>
        <WhiteSpace/>
        <List renderHeader = {() => '基本信息'}>
          <InputItem onChange = { v => this.handlerChange('title',v)} >求职岗位</InputItem>
        </List>
        <List renderHeader={() => '个人简介'}>
          <TextareaItem rows = {3} placeholder = "请输入职位简介" onChange = { v => this.handlerChange('desc',v)} >职位简介</TextareaItem>
        </List>
        <WhiteSpace/>
        <WingBlank>
          <Button type="primary" onClick = { () => {
            this.props.update(this.state)
          } }>更新</Button>
        </WingBlank>
      </div>
    )
  }
}

export default GeniusInfo