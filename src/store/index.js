import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {GetUserInfo,GetUserLoginStatus} from '@/apis/user'
const store = new Vuex.Store({
    state:{
        isUserInfoReady:false,
        userData:{},
        userid: 0 ,//116810(kunpark)/117911(yugutou22)
        apptoken:'',
		schoolid:0,
    },
    mutations:{
        updateUserState(state,data){
			console.log(data)
            state.userid = data.userid
            state.apptoken = data.apptoken
			state.schoolid = data.schoolid
        },
		updateState(state){
		    /**获取用户信息 */
		    GetUserInfo().then(res=>{
			
		        if(res.result){
		            let data = res.data[0];
		            let hash = Math.ceil(Math.random()*99999999999);
		            data.userFace = `/uploadfiles/avatar/${state.userid}.jpg?${hash}`;
		            state.userData = data;
		        }
		
		        state.isUserInfoReady = true
		      
		    })
		    
		}
    }
})

/**
 * 有userid时返回
 */
store.created = function(callback){
    if(this.state.userid && this.state.apptoken){
        typeof callback === 'function' && callback(this.state.userid,this.state.apptoken,this.state.schoolid)
    }else{
        setTimeout(()=>{
            this.created(callback)
        },100)
    }
}

GetUserLoginStatus().then(res=>{
	console.log(res)
	if(res.islogin == 'true'){
		store.commit('updateUserState',{
			userid:res.userid,
			apptoken:res.apptoken,
			schoolid:res.schoolid,
		})
	}
})


export default store