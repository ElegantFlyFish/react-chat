import React from 'react'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
  handleClick(v){
    this.props.history.push(`/chat/${v._id}`)
  }
  render(){
    const Header = Card.Header
    const Body = Card.Body
    return (
      this.props.userList ? 
      <div>
        <WingBlank>
          <WhiteSpace size="xl" />
            {this.props.userList.map(v => (
              v.avatar ? 
              <Card key = { v._id } onClick = {()=>{ this.handleClick(v) }}>
                <Header
                  title = {v.user}
                  thumb = { require(`../img/${v.avatar}.png`) }
                  extra = { <span>{ v.title }</span> }
                />
                <Body>
                  { v.type === 'boss' ? <div>{ `公司${v.company}` }</div> : null }
                  <div>{ v.desc.split('\n').map(d=>(
                    <div key={d}>{d}</div>
                  )) }</div>
                  { v.type === 'boss' ? <div>{ `薪资：${v.salary}` }</div> : null }
                </Body>
              </Card>:null
            ))}
          <WhiteSpace size="xl" />
        </WingBlank>
      </div> : null
    )
  }
}

export default UserCard