import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
		{//选择考试分类
		  path: '/',
		  name: 'ExamSelect',
		  component: resolve=>{
		      require(['@/pages/exam/ExamSelect'],resolve)
		  }
		},
		{//我的考试记录
		  path: '/exam/myexam',
		  name: 'MyExam',
		  component: resolve=>{
		      require(['@/pages/exam/MyExam'],resolve)
		  }
		},
		{//练习记录
		  path: '/exam/PracticeRecord',
		  name: 'PracticeRecord',
		  component: resolve=>{
		      require(['@/pages/exam/PracticeRecord'],resolve)
		  }
		},
		{//收藏练习
			path: '/exam/CollectBank',
			name: 'CollectBank',
			component: resolve=>{
			    require(['@/pages/exam/CollectBank'],resolve)
			}
		},
		{//错题练习
			path: '/exam/ErrorBank',
			name: 'ErrorBank',
			component: resolve=>{
			    require(['@/pages/exam/ErrorBank'],resolve)
			}
		},
		{//考试记录
			path: '/exam/ExamRecord',
			name: 'ExamRecord',
			component: resolve=>{
			    require(['@/pages/exam/ExamRecord'],resolve)
			}
		},
		{//练习中心
			path: '/exam/Practice',
			name: 'Practice',
			component: resolve=>{
			    require(['@/pages/exam/Practice'],resolve)
			}
		},
		{//套卷练习
			path: '/exam/PackageExam',
			name: 'PackageExam',
			component: resolve=>{
			    require(['@/pages/exam/PackageExam'],resolve)
			}
		},
		{//套餐包首页
			path: '/exam/Package',
			name: 'Package',
			component: resolve=>{
			    require(['@/pages/exam/Package'],resolve)
			}
		}
  ]
})
