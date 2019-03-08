import {SAVETENDLIST, SAVEAUTHLIST,SAVELOCKLIST,SAVEMYLOCKLIST,DELECTLOCK,ADDLOCK,EDITLOCK,ADDFRIENDINFO,EDITFRIENDINFO,SAVENACTLOCKLIST} from '../constants/user'

//用户管理
export const onSaveTendList = (data) => {
  return {
    data,
    type: SAVETENDLIST
  }
}
//授权管理
export const onSaveAuthList = (data) => {
  return {
    data,
    type: SAVEAUTHLIST
  }
}
//锁具管理
export const onSaveLockList = (data) => {
  return {
    data,
    type: SAVELOCKLIST
  }
} 
export const onSaveNectLockList = (data) =>{
  return {
    data,
    type:SAVENACTLOCKLIST
  }
}
//我的锁具管理
export const onSaveMyLocklist = (data) => {
  return {
    data,
    type: SAVEMYLOCKLIST
  }
}
//删除锁具
export const onDelectLock = (data) =>{
  console.log(data)
  return {
    data,
    type:DELECTLOCK
  }
}
//添加门锁
export const onAddLock = (data) =>{
  return{
    data,
    type:ADDLOCK
  }
}
//编辑门锁
export const onEditLock = (data) =>{
  return{
    data,
    type:EDITLOCK
  }
}
//添加用户
export const onAddFriendInfo = (data) => {
  return {
    data,
    type:ADDFRIENDINFO
  }
}
//编辑用户
export const onEditFriendInfo = (data) =>{
  console.log('action',data)
  return {
    data,
    type:EDITFRIENDINFO
  }
}