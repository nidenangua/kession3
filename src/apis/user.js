import {$get,$post} from './main.entrance'

export function GetCourseDataList(params){
  return new Promise((resolve)=>{
    $post('/webapi/course/GetCourseDataList',{
      params:params
    }).then(res => {
      resolve(res.data)
    })
  })
}


export function GetUserInfo(params){//获取用户信息
    return new Promise(resolve=>{
        $get('/webapi/User/GetUserInfo',params).then(res=>{
            resolve(res.data)
        })
    })
}

/**
 *获取会员登录状态
 */ 
export function GetUserLoginStatus(params){
    return new Promise(resolve=>{
        $get('/plus/ajaxs.ashx?a=checkislogin&json=1',params,{
            takeUserIdAndAppToken:false
        }).then(res=>{
            resolve(res.data)
        })
    })
    
}
/**
 *获取课程列表
 */ 
export function GetMyCourseList(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/GetMyCourseList',params).then(res => {
      resolve(res.data)
    })
  })
}
/**
 *获取课程试卷列表
 */ 
export function GetCoursePaperList(params){//获取课程列表
  return new Promise((resolve)=>{
    $post('/webapi/course/GetCoursePaperList',params,{
            takeUserIdAndAppToken:false
        }).then(res => {
      resolve(res.data)
    })
  })
}
/**
 *获取我的班级列表
 */ 
export function GetMyRoomList(params){//获取我的班级列表
  return new Promise((resolve)=>{
    $post('/webapi/user/GetMyRoomList',params).then(res => {
      resolve(res.data)
    })
  })
}
/**
 *退出班级列表
 */ 
export function OutMyRoomList(params){//退出班级列表
  return new Promise((resolve)=>{
    $post('/webapi/user/OutMyRoomList',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *获取用户练习记录
 */ 
export function GetTestRecordList(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/GetTestRecordList',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *删除用户练习记录
 */ 
export function DeletePaperTest(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/DeletePaperTest',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *获取用户考试记录
 */ 
export function GetPaperRecordList(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/GetPaperRecordList',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *删除用户考试记录
 */ 
export function DeletePaperRecord(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/DeletePaperRecord',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *获取错题首页
 */ 
export function ErrorTkHome(params){//获取错题首页
  return new Promise((resolve)=>{
    $get('/webapi/user/ErrorTkHome',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *获取收藏首页
 */ 
export function CollectTkHome(params){//获取收藏首页
  return new Promise((resolve)=>{
    $post('/webapi/user/CollectTkHome',params).then(res => {
      resolve(res.data)
    })
  })
}
/**
 *获取收藏分类数
 */ 
export function GetCountCollectTk(params){//获取收藏分类数
  return new Promise((resolve)=>{
    $post('/webapi/user/GetCountCollectTk',params).then(res => {
      resolve(res.data)
    })
  })
}
/**
 *获取错题分类数
 */ 
export function GetCountErrorTk(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/GetCountErrorTk',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *获取我的考试套餐包列表
 */ 
export function MyFeeSellList(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/MyFeeSellList',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *获取我的考试套餐包详情
 */ 
export function GetFeePackagesList(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/GetFeePackagesList',params).then(res => {
      resolve(res.data)
    })
  })
}
/**
 *获取所有套餐包详情
 */ 
export function GetFeePackagesDetail(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/GetFeePackagesDetail',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *购买套餐包
 */ 
export function BuyFeePackages(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/BuyFeePackages',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *我的套餐包详情
 */ 
export function MyFeeSellDetail(params){
  return new Promise((resolve)=>{
    $post('/webapi/user/MyFeeSellDetail',params).then(res => {
      resolve(res.data)
    })
  })
}