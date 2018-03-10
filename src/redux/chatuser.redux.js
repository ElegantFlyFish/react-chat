import axios from 'axios'
//action
const USER_LIST = 'USER_LIST'

const initState = {
  userList:[]
}
//reducer
export function chatuser(state = initState, action){
  switch(action.type){
    case USER_LIST:
      return { ...state,userList:action.payload }
    default:
      return state
  }
}

//action creater
function userList(data){
  return { type:USER_LIST, payload:data }
}

export function getUserList(type){
  return dispatch => {
    axios.get('/user/list',{ params:{ type:type } })
    .then(res => {
      if(res.status === 200){
        // this.setState({data:res.data.data})
        dispatch(userList(res.data.data))
      }
    })
  }
}
