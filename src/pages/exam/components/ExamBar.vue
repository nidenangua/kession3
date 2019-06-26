<template>
	<div class="exam-bar">
		<div class="exam-bar__item" @click="open('/exam/myexam')" >
			<img v-if="index==1" src="@/assets/exam/me_nav_icon1_s.png" />
			<img v-else src="@/assets/exam/me_nav_icon1_n.png" />
			<p :class="{active:index==1}">考试报告</p>
		</div>
		<div class="exam-bar__item" @click="open('/exam/practice')">
			<img v-if="index==2" src="@/assets/exam/me_nav_icon2_s.png" />
			<img v-else src="@/assets/exam/me_nav_icon2_n.png" />
			<p :class="{active:index==2}">练习中心</p>
		</div>
		<div class="exam-bar__item" @click="open('/exam/PackageExam')">
			<img v-if="index==3" src="@/assets/exam/me_nav_icon4_s.png" />
			<img v-else src="@/assets/exam/me_nav_icon4_n.png" />
			<p :class="{active:index==3}">套卷练习</p>
		</div>
		<div class="exam-bar__item" @click="open('/exam/practiceRecord')">
			<img v-if="index==4" src="@/assets/exam/me_nav_icon5_s.png" />
			<img v-else src="@/assets/exam/me_nav_icon5_n.png" />
			<p :class="{active:index==4}">练习记录</p>
		</div>
		<div class="exam-bar__item" @click="open('/exam/examRecord')">
			<img v-if="index==5" src="@/assets/exam/me_nav_icon6_s.png" />
			<img v-else src="@/assets/exam/me_nav_icon6_n.png" />
			<p :class="{active:index==5}">考试记录</p>
		</div>
		<div class="exam-bar__item" v-if="showError" @click="open('/exam/ErrorBank')">
			<img v-if="index==6" src="@/assets/exam/me_nav_icon7_s.png" />
			<img v-else src="@/assets/exam/me_nav_icon7_n.png" />
			<p :class="{active:index==6}">错题练习</p>
		</div>
		<div class="exam-bar__item" v-if="showCollect" @click="open('/exam/CollectBank')">
			<img v-if="index==7" src="@/assets/exam/me_nav_icon8_s.png" />
			<img v-else src="@/assets/exam/me_nav_icon8_n.png" />
			<p :class="{active:index==7}">收藏练习</p>
		</div>
	</div>
</template>

<script>
	import {GetSubjectStatistics} from '@/apis/exam'
	export default({
		name:'examBar',
		props:['index'],
		data() {
			return {
				dataList:[],
				showCollect:false,
				showError:false,
				chaper:null,
				knowledge:null,
			}
		},
		methods:{
			open(url){
				this.$router.push({
					path:url,
					query:{
						categoryid:this.$route.query.categoryid
					}
				})
			}
		},
		created() {
			//获取模块数据
			GetSubjectStatistics({
				categoryid:this.$route.query.categoryid,
			}).then(res=>{
				this.dataList = res.module
				for(let i in this.dataList){
					if(this.dataList[i].module_id=="5"){
						this.showCollect = true
					}
					if(this.dataList[i].module_id=="4"){
						this.showError = true
					}
					if(this.dataList[i].module_id=="0"){
						this.chaper = this.dataList[i].isopen_chaper
						this.knowledge = this.dataList[i].isopen_knowledge
					}
					
				}
				this.$emit('toggle',this.chaper,this.knowledge)
			})
		}
	})
</script>

<style scoped>
	.exam-bar{
		width: 100%;
		height: 94px;
		background: #fff;
		border: 1px solid #ebebeb;
	}
	.exam-bar__item{
		width: calc(100% / 7);
		height: 100%;
		float: left;
		text-align: center;
		font-size: 12px;
		color: #7f7f7f;
		position: relative;
		cursor: pointer;
	}
	.exam-bar__item img{
		width: 28px;
		height: 28px;
		margin-top: 22px;
	}
	.exam-bar__item p{
		width: 60px;
		height: 34px;
		position: absolute;
		left: 50%;
		top: 60px;
		margin-left: -30px;
		text-align: center;
		
	}
	.active{
		color: #e5412c;
		border-bottom: 2px solid #e5412c ;
		box-sizing: border-box;
	}
</style>
