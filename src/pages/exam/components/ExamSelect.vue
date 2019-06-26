<template>
	<div class="exam-select">
		<div class="exam-select__box">
			<div class="exam-select__title">
				<p>选择考试分类</p>
				<img src="@/assets/exam/close.png" @click="close" />
			</div>
			<div class="exam-select__top">
				<p>已选分类：</p>
				<span>{{classes}}</span>
			</div>
			
			<div class="exam-select__item" v-for="(item,i) in allClass" :key="i" >
				<div class="exam-select__left">{{item.categoryname}}：</div>
				<div class="exam-select__right">
					<p :class="{active:active==item.categoryid}" @click="setClasses(item.categoryid,item.categoryname,item.childs)">全部</p>
					<span :class="{active:active==child.categoryid}" v-for="(child,n) in item.childs"  :key="n" @click="setClasses(child.categoryid,child.categoryname,child.childs)">
						{{child.categoryname}}
					</span>
				</div>
			</div>
			
			
		</div>
		
	</div>
</template>

<script>
	import {GetPaperList,GetAllPaperCategory,GetSubjectStatistics} from '@/apis/exam'
	import Bus from './bus.js'
	import store from '@/store'
	export default({
		name:"ExamSelect",
		data() {
			return {
				allClass:[],//全部分类
				active:null,
				id:null,
				classes:null,
				url:null,
				userid:store.state.userid
			}
		},
		methods: {
			close(){
				this.$emit('closemenu')
			},
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
					localStorage.removeItem(`name_${userid}`)
				})
				if(childsclass){
					localStorage.childsclass = JSON.stringify(childsclass)
				}else{
					localStorage.removeItem("childsclass")
				}
				
				Bus.$emit('name', null)
				Bus.$emit('active', null)
				Bus.$emit('classes', classes)
				this.active = id
				this.$router.push({
					path:this.$route.path,
					query:{
						categoryid:id
					}
				})
				this.$emit('setchange')
			}
		},
		created(){
			this.$store.created(userid=>{
				if(localStorage[`classes_${userid}`]){
					this.classes = localStorage[`classes_${userid}`]
				}
				if(localStorage[`id_${userid}`]){
					this.id = localStorage[`id_${userid}`]
					this.active = localStorage[`id_${userid}`]
				}
			})
			
			this.getAllPaperCategory()
		},
		activated(){

		}
	})
</script>

<style scoped>
	.active{
		background: #e5412c !important;
		color: #fff !important;
		border: 1px solid #e5412c !important;
	}
	.exam-select{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.exam-select__box{
		width: 800px;
		height: 780px;
		background-color: #ffffff;
		border-radius: 10px;
		position: absolute;
		left: 50%;
		margin-left: -400px;
		top: 50%;
		margin-top: -390px; 
		overflow:auto;
	}
	.exam-select__title{
		margin-top: 20px;
		height: 40px;
		width: 100%;
	}
	.exam-select__title p{
		font-size: 16px;
		color: #333;
		margin-left: 20px;
		float: left;
	}
	.exam-select__title img{
		width: 16px;
		height: 16px;
		margin-right: 20px;
		float: right;
	}
	.exam-select__top{
		font-size: 16px;
		color: #333;
		height: 32px;
		width: 100%;
		padding-bottom: 20px;
		border-bottom: 1px solid #eeeeee;
	}
	.exam-select__top p{
		margin-left: 30px;
		float: left;
		line-height: 32px;
	}
	.exam-select__top span{
		display: inline-block;
		float: left;
		margin-left: 30px;
		border-radius: 16px;
		padding: 6.5px 20px;
		font-size: 14px;
		color: #fff;
		background: #e5412c;
		cursor: pointer;
	}
	.exam-select__item{
		width: 100%;
		
		padding-bottom: 20px;
		float: left;
	}
	.exam-select__left{
		width: 100px;
		margin-left: 30px;
		float: left;
		line-height: 34px;
		margin-top: 20px;
	}
	.exam-select__right{
		float: left;
		width: 670px;
	}
	.exam-select__right p{
		font-weight: normal;
		font-size: 14px;
		width: 96px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		border: 1px solid #ccc;
		box-sizing: content-box;
		color: #666;
		float: left;
		margin-left: 30px;
		border-radius: 16px;
		margin-top: 20px;
	}
	.exam-select__right p:hover{
		color: #e5412c;
		border: 1px solid #e5412c;
	}
	.exam-select__right span{
		display: inline-block;
		float: left;
		margin-left: 30px;
		border-radius: 16px;
		padding: 6.5px 20px;
		font-size: 14px;
		color: #666;
		border: 1px solid #ccc;
		box-sizing: content-box;
		margin-top: 20px;
		cursor: pointer;
	}
	.exam-select__right span:hover{
		color: #e5412c;
		border: 1px solid #e5412c;
	}
</style>
