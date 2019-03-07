import { combineReducers } from 'redux'
import { SETUSERINFO,SAVEFRIENDINFO ,SETUSER} from '../constants/user'

const INITIAL_STATE = {
  userInfo: {
  },
  friendInfo:{
  },
 }
 function user (state = INITIAL_STATE, action) {
  switch (action.type) {
   case SETUSERINFO:
    return {
     ...state,
     userInfo:JSON.parse(action.data)
    };
    case SETUSER:
    return {
      ...state,
      userInfo:action.data
    }
    case SAVEFRIENDINFO:
    return {
      ...state,
      friendInfo:action.data
    }
   default:
    return state
  }
 }

 export default combineReducers({user})
