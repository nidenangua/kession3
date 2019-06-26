import axios from 'axios'
import SCHOOL_ADMIN from '../main'
function ready(callback){
    if(SCHOOL_ADMIN){
        callback(SCHOOL_ADMIN)
    }else{
        setTimeout(()=>{
            ready(callback)
        },100)
    }
}
export function $post(url,params,config = {}){
    return new Promise(resolve=>{
        if(config.takeUserIdAndAppTokenAndSchoolId === false){
            /**将对象转换成字符串 */
            params = JSON.stringify(params);
            axios.post(url,params).then(res=>{
                resolve(res)
            }).catch(error=>{
                console.log(error)
            })
        }else{
             ready(APP=>{
                APP.$store.created((userid,apptoken,schoolid)=>{
                    params.userid = userid
                    params.apptoken = apptoken
					params.schoolid = schoolid
                    params = JSON.stringify(params);
                    axios.post(url,params).then(res=>{
                        resolve(res)
                    }).catch(error=>{
                        console.log(error)
                    })
                })
            })
        }
    })
}

export function $get(url,params = {},config = {}){
    return new Promise(resolve=>{
        if(config.takeUserIdAndAppToken === false){
            axios.get(url,{
                params:params
            }).then(res=>{
                resolve(res)
            }).catch(error=>{
                console.log(error)
            })
        }else{
            ready(APP=>{
                APP.$store.created((userid,apptoken,schoolid)=>{
                    params.userid = userid
                    params.apptoken = apptoken
					params.schoolid = schoolid
                    axios.get(url,{
                        params:params
                    }).then(res=>{
                        resolve(res)
                    }).catch(error=>{
                        console.log(error)
                    })
                })
            })
            
        }
        
    })
}