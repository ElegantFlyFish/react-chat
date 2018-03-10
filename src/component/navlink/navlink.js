import React from 'react'
import { PropTypes } from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import '../../static/icons/fontawesome-all.css'

@withRouter
class NavLinkBar extends React.Component{
  // constructor(){
  //   super()
  // }
  static propTypes = {
    data:PropTypes.array.isRequired
  }
  render(){
    const navList = this.props.data.filter(v => !v.hide)
    const { pathname } = this.props.location
    return (
      <div>
        <TabBar>
          { navList.map(v => (
            <TabBar.Item
              key = { v.path }
              title = { v.text }
              icon = { <i className={`fas ${v.icon} fa-2x`}></i> }
              selectedIcon = { <i className={`fas ${v.icon} fa-2x`}></i> }
              selected = { pathname === v.path }
              onPress = { ()=>{
                this.props.history.push(v.path)
              } }
            >
            </TabBar.Item>
          )) }
        </TabBar>
      </div>
    )
  }
}

export default NavLinkBar