import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadData } from '../../redux/user.redux'

@withRouter
@connect(
  null,
  { loadData }
)
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList = ['./login','./register']
    const currentLocation = this.props.location.pathname
    if(publicList.includes(currentLocation)){
      return null
    }
    //获取用户信息
    axios.get('/user/info')
      .then(res => {
        //console.log(res);
        if(res.status === 200){
          if(res.data.code === 0){
            //有登陆信息
            this.props.loadData(res.data.data)
          }else{
            this.props.history.push('/login')
          }
        }
      })
    /*
     是否登陆
     当前的url为login则不进行跳转
     当前的身份是牛人或boss
     用户信息是否完善（完善信息，头像选择...）
    */
  }
  render(){
    return null
  }
}

export default AuthRoute