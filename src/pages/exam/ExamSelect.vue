<template>
	<div class="exam-select">
		<div class="exam-select__title">
			<p>选择考试分类</p>
			<!-- <div class="exam-select__search">
				<input type="text" placeholder="请输入你要搜索的分类" />
				<img src="@/assets/exam/search.png" />
			</div> -->
		</div>
		<div style="width:100%;">
		<div class="exam-select__item" v-for="(item,i) in allClass" :key="i">
			<div class="exam-select__top" >
				<p>{{item.categoryname}}</p>
				<span></span>
			</div>
			<div class="exam-select__bottom" >
				<p @click="setClasses(item.categoryid,item.categoryname,item.childs)">全部</p>
				<span :class="{active:active==child.categoryid}" v-for="(child,n) in item.childs"  :key="n" @click="setClasses(child.categoryid,child.categoryname,child.childs)">{{child.categoryname}}</span>	
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import {GetPaperList,GetAllPaperCategory,GetSubjectStatistics} from '@/apis/exam'
	import store from '@/store'
	export default({
		name:"ExamSelect",
		data() {
			return {
				allClass:[],//全部分类
				active:null,//当前选中
				id:null,//课程id
				classes:null,//课程名称
				userid:store.state.userid
			}
		},
		methods: {
			getAllPaperCategory(){
				
				//请求接口获取一级课程列表
				GetAllPaperCategory({

				}).then(res=>{
					this.allClass = res.data
					localStorage.allClass = JSON.stringify(res.data)
				})
			},
			// 选择课程并存储
			setClasses(id,classes,childsclass){
				this.classes = classes
				this.id = id
				this.$store.created(userid=>{
					localStorage[`classes_${userid}`] = classes
					localStorage[`id_${userid}`] = id
				})
				
				if(childsclass){
					localStorage.childsclass = JSON.stringify(childsclass)
				}
				this.active = id
				this.$router.push({//跳转至选中课程首页
					name:'MyExam',
					query:{
						categoryid:id
					}
				})
			}
		},
		created(){
			this.$store.created(userid=>{
				if(localStorage[`classes_${userid}`]){
					this.$router.push({//跳转至选中课程首页
						name:'MyExam',
						query:{
							categoryid:localStorage[`id_${userid}`]
						}
					})
				}else{
					this.getAllPaperCategory()
					if(localStorage[`classes_${userid}`]){
						this.classes = localStorage[`classes_${userid}`]
					}
					if(localStorage[`id_${userid}`]){
						this.id = localStorage[`id_${userid}`]
						this.active = localStorage[`id_${userid}`]
					}
				}
			})	

		},
		activated(){
			// if(localStorage[`classes_${this.userid}`]){
			// 	this.classes = localStorage[`classes_${this.userid}`]
			// }
			// if(localStorage[`id_${this.userid}`]){
			// 	this.id = localStorage[`id_${this.userid}`]
			// 	this.active = localStorage[`id_${this.userid}`]
			// }	
		}
	})
</script>

<style scoped>
	.active{
		color: #e5412c !important;
		border: 1px solid #e5412c !important;
	}
	.exam-select{
		width:100%;
		background: #fff;
		
	}
	.exam-select__title{
		line-height: 55px;
		height: 55px;
		width: 100%;
		border-bottom: 1px solid #ebebeb;
	}
	.exam-select__title p{
		font-size: 16px;
		color: #333;
		margin-left: 20px;
		float: left;
	}
	.exam-select__search{
		width: 298px;
		height: 34px;
		background-color: #f6f6f6;
		border-radius: 18px;
		float: right;
		margin-right: 30px;
		margin-top: 10px;
	}
	.exam-select__search input{
		width: 200px;
		height: 34px;
		float: left;
		margin-left: 12px;
		background: #f6f6f6;
		border: none;
		outline: none;
		
	}
	.exam-select__search input::placeholder{
		font-size: 16px;
		color: #888888;
	}
	.exam-select__search img{
		width: 20px;
		height: 20px;
		margin-right: 10px;
		float: right;
		margin-top: 7px;
	}

	.exam-select__item{
		width: calc(100% - 60px);
		padding: 0 30px 20px 30px;
		
	}
	.exam-select__top{
		width: 100%;
		line-height: 34px;
		margin-top: 20px;
		
		height: 34px;
	}
	.exam-select__top p{
		color: #333;
		font-size: 16px;
		float: left;
		width: 100px;
	}
	.exam-select__top span{
		display: inline-block;
		height: 1px;
		width: calc(100% - 160px);
		background: #ebebeb;
		float: left;
		margin-top: 16.5px;
	}
	.exam-select__bottom{
		width: 100%;
	}
	.exam-select__bottom p{
		font-weight: normal;
		font-size: 14px;
		width: 96px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		border: 1px solid #ccc;
		box-sizing: content-box;
		color: #666666;
		border-radius: 16px;
		margin-top: 20px;
		cursor: pointer;
		display: inline-block;
	}
	.exam-select__bottom p:hover{
		color: #e5412c;
		border: 1px solid #e5412c;
	}
	.exam-select__bottom span{
		cursor: pointer;
	}
	.exam-select__bottom span:hover{
		color: #e5412c;
		border: 1px solid #e5412c;
	}
	.exam-select__bottom span{
		display: inline-block;
		margin-left: 30px;
		border-radius: 16px;
		padding: 6.5px 20px;
		font-size: 14px;
		color: #666666;
		border: 1px solid #ccc;
		box-sizing: content-box;
		margin-top: 20px;
	}
</style>
