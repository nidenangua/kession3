<template>
	<div class="exam-title" @mouseleave="colseShow">
		<div class="exam-title__title" @click="onshow" >
			<p>{{classes}}<i v-if="name!=null">-{{name}}</i></p>
			<img src='@/assets/exam/xiabiao.png' />
			<span></span>
		</div>
		<div class="exam-title__subtitle" v-if="show" >
			<div class="exam-title__item">
				<span>{{classes}}</span>
				<div class="exam-title__item-box" @click="showmenu">
					<img src="@/assets/exam/qiehuan.png" />
					切换考试
				</div>
			</div>
			<div class="exam-title__list" v-if="dataList!=null" v-for="(item,i) in dataList" :key="i"  @click="setclass(i,item.categoryid,item.categoryname)">
				<span :class="{active:active==item.categoryid}">{{item.categoryname}}</span>
				<img v-if="active==item.categoryid" src="@/assets/exam/right.png" />
			</div>
		</div>
	</div>
</template>

<script>
	import Bus from './bus.js'
	import store from '@/store'
	export default({
		name:"ExamTitle",
		props:['dataList'],
		data() {
			return {
				show:false,
				active:null,
				name:null,
				classes:null,
				userid:store.state.userid
			}
		},
		methods:{
			onshow(){
				this.show = true
			},
			colseShow(){
				this.show = false
			},
			setclass(i,id,name){
				this.active = id
				if(name){
					this.name = name
				}
				this.$store.created(userid=>{
					localStorage[`name_${userid}`] = name
					localStorage[`id_${userid}`] = id 
				})
				this.$router.push({
					query:{
						categoryid:id
					}
				})
				
				this.show = false
				this.$emit('change')
			},
			showmenu(){
				
				this.$emit('showmenu')
			}
		},
		activated(){
			this.$store.created(userid=>{
				if(localStorage[`name_${userid}`]){
					this.name = localStorage[`name_${userid}`]
				}
				if(localStorage[`classes_${userid}`]){
					this.classes = localStorage[`classes_${userid}`]
				}
				if(localStorage[`id_${userid}`]){
					this.active = localStorage[`id_${userid}`]
				}
			})
			
		},
		created(){
			this.$store.created(userid=>{
				if(localStorage[`name_${userid}`]){
					this.name = localStorage[`name_${userid}`]
				}
				if(localStorage[`id_${userid}`]){
					this.active = localStorage[`id_${userid}`]
				}
				if(localStorage[`classes_${userid}`]){
					this.classes = localStorage[`classes_${userid}`]
				}
			})
			
		},
		mounted(){
			Bus.$on('name', (data) => {
				this.name = data
			}) 
			Bus.$on('active', (data) => {
				console.log(data)
				this.active = data
			})
			Bus.$on('classes', (data) => {
				console.log(data)
				this.classes = data
			})
		}
	})
</script>

<style scoped>
	.active{
		color: #e64a3b !important;
	}
	.exam-title{
		z-index: 200;
		height: 57px;
		position: absolute;
		top: 0;
		width: 100%;
	}
	.exam-title__title{
		width: 100%;
		height: 57px;
		border: 1px solid #ebebeb;
		border-bottom: none;
		background: #fff;
		line-height: 57px;
		font-size: 18px;
		color: #333;
	}
	.exam-title__title p{
		margin-left: 20px;
		float: left;
	}
	.exam-title__title i{
		font-style: normal;
	}
	.exam-title__title img{
		margin: 20px 20px 0 20px;
		float: left;
		cursor: pointer;
	}
	.exam-title__title span{
		width: 1px;
		height: 32px;
		background-color: #eeeeee;
		float: left;
		margin-top: 12.5px;
	}
	/* 子标题 */
	.exam-title__subtitle{
		width: 400px;
		height: 200px;
		background: #fff;
		z-index: 300;
		box-shadow: 4px 4px 10px 0px
		rgba(116, 148, 179, 0.2);
		border-radius: 4px;
	}
	.exam-title__item{
		height: 52px;
		border-bottom: 1px solid #ebebeb;
	}
	.exam-title__item span{
		display: inline-block;
		width: 108px;
		height: 32px;
		background-color: #e64a3b;
		border-radius: 16px;
		font-size: 14px;
		color: #fff;
		text-align: center;
		line-height: 32px;
		float: left;
		margin: 10px 0 0 20px;
	}
	.exam-title__item-box{
		font-size: 14px;
		height: 52px;
		line-height: 52px;
		float: right;
		margin-right: 20px;
	}
	.exam-title__item-box img{
		width: 18px;
		height: 16px;
		margin-right: 3px;
		margin-bottom: -2.5px;
	}
	.exam-title__list{
		height: 42px;
		line-height: 42px;
		background: #fff;
	}
	.exam-title__list span{
		font-size: 14px;
		color: #333;
		margin-left: 20px;
		float: left;
		cursor: pointer;
	}
	.exam-title__list img{
		width: 18px;
		height: 13px;
		float: right;
		margin-right: 20px;
		margin-top: 14.5px;
		
	}
	.exam-title__list:hover{
		background: #f7f7f7;
	}
</style>
