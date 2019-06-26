import {$get,$post} from './main.entrance'


/*
*请求套卷列表
* 
*/
export function GetPaperList(params){
  return new Promise((resolve)=>{
    $get('/webapi/paper/GetPaperList',params).then( res=> {
      resolve(res.data)
    })
  })
}

/*
*请求套卷列表分类名称
* 
*/
export function GetAllPaperType(params){
  return new Promise((resolve)=>{
	$get(`/webapi/paper/GetAllPaperType`,params).then( res=> {
		resolve(res.data)
	})
  })
}
/*
*请求练习中心章节列表
* 
*/
export function GetPaperSection(params){
  return new Promise((resolve)=>{
    $post('/webapi/paper/GetPaperSection',params).then(res => {
      resolve(res.data)
    })
  })
}

/*
*请求知识点列表
* 
*/
export function GetPaperKnowledge(params){
  return new Promise((resolve)=>{
    $post('/webapi/paper/GetPaperKnowledge',params).then( res=> {
      resolve(res.data)
    })
  })
}


