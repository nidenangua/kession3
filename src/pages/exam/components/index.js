
import ExamBar from './ExamBar'
import Pagination from './Pagination'
import Button from './Button'
import ExamTitle from './ExamTitle'
import Echarts from './Echarts'
import ExamSort from './ExamSort'
import ExamSelect from './ExamSelect'
import PopupPackage from './PopupPackage'
import Buy from './Buy'


const examComponents = {
	install(Vue){

		Vue.component('ExamBar',ExamBar)
		Vue.component('Pagination',Pagination)
		Vue.component('Button',Button)
		Vue.component('ExamTitle',ExamTitle)
		Vue.component('Echarts',Echarts)
		Vue.component('ExamSort',ExamSort)
		Vue.component('ExamSelect',ExamSelect)
		Vue.component('PopupPackage',PopupPackage)
		Vue.component('Buy',Buy)
		
	}
}
 export default examComponents