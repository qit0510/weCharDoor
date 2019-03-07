import { combineReducers } from 'redux'
import {SAVETENDLIST, SAVEAUTHLIST,SAVELOCKLIST,SAVEMYLOCKLIST,DELECTLOCK,ADDLOCK,EDITLOCK } from '../constants/user'

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
      res3.splice(action.data.data,1,action.data.index);
      return {
        ...state,
        lockList:res3
      }
    default:
      return state
  }
}

export default combineReducers({list})
