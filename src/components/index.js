import noData from './noData'
import Masked from './Masked'
import Toast from './toast'

const components = {
    install(Vue){
		Vue.use(noData)
		
		
		/**
		 * 遮罩层加载
		 */
		const maskedConstructor = Vue.extend(Masked)
		const maskedInstance = new maskedConstructor()
		maskedInstance.$mount(document.createElement('div'))
		
		document.body.appendChild(maskedInstance.$el)
		Vue.prototype.$showMask = (params = {})=>{
		    maskedInstance.visible = true
		    maskedInstance.params = params
		}
		Vue.prototype.$hideMask = ()=>{
		    maskedInstance.visible = false
		}
		/**
		 * 提示框组件
		 */
		const toastConstructor = Vue.extend(Toast)
		const toastInstance = new toastConstructor()
		toastInstance.$mount(document.createElement('div'))
		document.body.appendChild(toastInstance.$el)
		
		/**
		 * 显示信息提示框
		 * @param {String} msg 
		 * @param {String} type 
		 * @param {Number} duration 
		 */
		
		Vue.prototype.$toast = function(msg, type = 'tips', duration = 1500){
		    return new Promise(resolve=>{
		        toastInstance.duration = duration
		        toastInstance.msg = msg
		        toastInstance.show = true
		        toastInstance.type = type
		        setTimeout(() => {
		            toastInstance.duration = 0
		            toastInstance.show = false
		            resolve()
		        }, duration)
		    })
		}
    }
}
export default components
