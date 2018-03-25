import React from 'react'
import { PropTypes } from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../static/icons/fontawesome-all.css'

@withRouter
@connect(
  state => state.chat
)
class NavLinkBar extends React.Component{
  static propTypes = {
    data:PropTypes.array.isRequired
  }
  render(){
    //console.log(this.props)
    const navList = this.props.data.filter(v => !v.hide)
    const { pathname } = this.props.location
    const Item = TabBar.Item
    return (
      <div>
        <TabBar>
          { navList.map(v => (
            <Item
              badge = { v.path === '/msg' ? this.props.unread : 0 }
              key = { v.path }
              title = { v.text }
              icon = { <i className={`fas ${v.icon} fa-2x`}></i> }
              selectedIcon = { <i className={`fas ${v.icon} fa-2x`}></i> }
              selected = { pathname === v.path }
              onPress = { ()=>{
                this.props.history.push(v.path)
              } }
            >
            </Item>
          )) }
        </TabBar>
      </div>
    )
  }
}

export default NavLinkBar