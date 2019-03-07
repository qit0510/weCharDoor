import {SETUSERINFO, SAVEFRIENDINFO,SETUSER} from '../constants/user'

export const onSaveUserInfo = (data) => {
 return {
  data,
  type: SETUSERINFO
 }
}
export const onSetUserInfo = (data) => {
  return {
    data,
    type:SETUSER
  }
}
export const onSaveFriendInfo = (data) => {
  return {
    data,
    type:SAVEFRIENDINFO
  }
}
