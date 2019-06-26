import {$get,$post} from './main.entrance'
/*
*请求课程列表
* 
*/
export function GetAllPaperCategory(params){
  return new Promise((resolve)=>{
    $get('/webapi/paper/GetAllPaperCategory',params).then( res=> {
      resolve(res.data)
    })
  })
}
/*
*请求考试题库列表
* 
*/
export function GetPaperList(params){
  return new Promise((resolve)=>{
    $get('/webapi/paper/GetPaperList',params).then(res => {
      resolve(res.data)
    })
  })
}
/*
*请求首页模块列表
* 
*/
export function GetSubjectStatistics(params){
  return new Promise((resolve)=>{
    $post('/webapi/paper/SubjectStatistics',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *获取我的考试套餐包列表
 */ 
export function MyFeeSellList(params){//获取我的考试套餐包列表
  return new Promise((resolve)=>{
    $post('/webapi/user/MyFeeSellList',params).then(res => {
      resolve(res.data)
    })
  })
}

/**
 *获取我的考试套餐包详情
 */ 
export function MyFeeSellDetail(params){//获取我的考试套餐包详情
  return new Promise((resolve)=>{
    $post('/webapi/user/MyFeeSellDetail',params).then(res => {
      resolve(res.data)
    })
  })
}
/**
 *获取所有套餐包详情
 */ 
export function GetFeePackagesDetial(params){//获取所有套餐包详情
  return new Promise((resolve)=>{
    $post('/webapi/user/GetFeePackagesDetial',params).then(res => {
      resolve(res.data)
    })
  })
}

