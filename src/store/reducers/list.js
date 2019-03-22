import { combineReducers } from 'redux'
import {SAVETENDLIST, SAVEAUTHLIST,SAVELOCKLIST,SAVEMYLOCKLIST,DELECTLOCK,ADDLOCK,EDITLOCK,ADDFRIENDINFO,EDITFRIENDINFO,SAVENACTLOCKLIST } from '../constants/user'

const INITIAL_STATE = {
  tendList:{},
  lockList:[],
  myLockList:{},
  authList:{}
}
function list (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVETENDLIST:
      return {
        ...state,
        tendList:action.data
      };
    case SAVEAUTHLIST:
      return {
        ...state,
        authList:action.data
      };
    case SAVELOCKLIST:
      return {
        ...state,
        lockList:action.data
      };
    case SAVENACTLOCKLIST:
      return {
        ...state,
        lockList:state.lockList.concat(action.data)
      }
    case SAVEMYLOCKLIST:
      return {
        ...state,
        myLockList:action.data
      }
    case DELECTLOCK:
      let res1 = state.lockList;
      res1.splice(action.data,1);
      return {
        ...state,
        lockList:res1
      }
    case ADDLOCK:
      let res2 = state.lockList;
      res2.push(action.data);
      return {
        ...state,
        lockList:res2
      }
    case EDITLOCK:
      let res3 = state.lockList;
      // res3.splice(action.data.data,1,action.data.index);
      res3[action.data.index]=action.data.data
      return {
        ...state,
        lockList:res3
      }
    case ADDFRIENDINFO:
    console.log(action.data)
      return {
        ...state,
        tendList:state.tendList.concat([action.data])
      }
    case EDITFRIENDINFO:
    let res5 = state.tendList;
    let arr = [];
    res5.map((item)=>{
      if(item.id === action.data.id){
        item = action.data
      }
      arr.push(item)
    })
      return {
        ...state,
        tendList:arr
      }
    default:
      return state
  }
}

export default combineReducers({list})
