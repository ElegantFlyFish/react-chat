import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'

import NavLinkBar from  '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import UserCenter from '../usercenter/usercenter'

function Msg(){
  return <div>消息首页</div>
}

@connect(
  state => state
)
class Dashboard extends React.Component{
  render(){
    const user = this.props.user
    const { pathname } = this.props.location
    const navList = [
      {
       path:'/boss',
       text:'Genius', 
       icon:'fa-user-secret',
       title:'genius list',
       component:Boss,
       hide:user.type === 'genius'
      },
      {
        path:'/genius',
        text:'Boss', 
        icon:'fa-dollar-sign',
        title:'boss list',
        component:Genius,
        hide:user.type === 'boss'
       },
       {
        path:'/msg',
        text:'MSG', 
        icon:'fa-comment-alt',
        title:'msg list',
        component:Msg
       },
       {
        path:'/usercenter',
        text:'Uc', 
        icon:'fa-user',
        title:'user center',
        component:UserCenter
       }
    ]
    return (
      <div>
        <NavBar 
          mode="dark"
          leftContent="Back"
          onLeftClick={() => console.log('onLeftClick')}
          className="fix-header">
          { navList.find(v => v.path === pathname).title }
        </NavBar>
        <div style = {{ marginTop:45 }}>
          <Switch>
            { navList.map(v =>(
              <Route key = { v.path } path = { v.path } component = { v.component } />
            )) }
          </Switch>
        </div>
        <NavLinkBar data = { navList }></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard
