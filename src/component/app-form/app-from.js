import React from 'react'

// 表单装饰器
export default function AppForm(Comp){
  return class WrapperForm extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
      this.handlerChange = this.handlerChange.bind(this)
    }
    handlerChange(key,v){
      this.setState({
        [key]:v
      })
    }
    render(){
      return (
        <Comp handlerChange = { this.handlerChange } state = {this.state} {...this.props} ></Comp>
      )
    }
  }
}
