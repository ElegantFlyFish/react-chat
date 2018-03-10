import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from "prop-types";

class AvatarSelector extends React.Component{
  static propTypes = {
    selectAvatar:PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){

    const avatarList = ['boy','bull','chick','crab','girl','hedgehog','hippopotamus','koala','lemur','man','pig','tiger','whale','woman','zebra']
          .map(v => ({ icon:require(`../img/${v}.png`), text:v}))
    const gridHeader = this.state.icon 
                                ? (<div>
                                    <span>已经选择头像：</span>
                                    <img style = {{ width:20 }} src = { this.state.icon } alt = {this.state.text} />
                                  </div>)
                                : (<div>请选择头像</div>)
    return (
      <div>
        <List renderHeader={ () => gridHeader }>
          <Grid data={avatarList} 
            onClick = { 
              ele => {
                this.setState(ele)
                this.props.selectAvatar(ele.text)
              }
            } 
            columnNum ={ 5 } 
            activeStyle = { false } />
        </List>    
      </div>
    )
  }
}
export default AvatarSelector
