import React from 'react'
import { Result, WhiteSpace, List, Button, WingBlank } from 'antd-mobile' 
import { connect } from 'react-redux'
import cookies from 'browser-cookies' 
import { Redirect } from 'react-router-dom'

import { logoutSubmit } from '../../redux/user.redux'

@connect(
  state => state.user,
  { logoutSubmit } 
)
class UserCenter extends React.Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout(){
    cookies.erase('userid')
    this.props.logoutSubmit()
  }
  render(){
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user?(
      <div>
        <Result
          img = { <img style = {{ width:60 }} src = { require(`../img/${props.avatar}.png`) } alt={prompt.avatar} /> }
          title = { props.user }
          message = { props.type === 'boss' ? props.company : null }
        />
        <WhiteSpace />
        <List renderHeader = {()=>('简介')}>
          <Item>
            { props.title }
            { props.desc.split('\n').map(v =>(
              <Brief key = {v}>{ v }</Brief>
            )) }
            { props.salary ? <Brief>薪资：{props.salary}</Brief> : null }
          </Item>
        </List>
        <WhiteSpace />
				<WingBlank>
					<Button type="warning" onClick={this.logout}>注销</Button>
				</WingBlank>
      </div>
    ):<Redirect to = '/login'></Redirect>
  }
}

export default UserCenter

