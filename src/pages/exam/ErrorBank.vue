<template>
	<div style="width: 100%;">
		<div class="error-bank">
			<exam-title :data-list="childsclass" @change="change"  @showmenu="showmenu" />
			<div class="error-bank__position">
				<!-- 导航栏 -->
				<exam-bar index='6'></exam-bar>
			</div>
		</div>
		<div class="error-bank__item">
			<div class="error-bank__head" v-if="allData!=null">
				<div class="error-bank__head-box1">
					<p><i>{{allData.error_num}}</i>题</p>

					<span>错题总数</span>
				</div>
				<div class="error-bank__head-box2">
					<p><i>{{allData.today_error}}</i>题</p>

					<span>今日错题</span>
				</div>
				<div class="error-bank__head-box3">
					<p><i>{{allData.zhunquelv}}</i>%</p>

					<span>正确率</span>
				</div>
				<div class="error-bank__head-right">
					<span></span>
					<!-- <div class="error-bank__head-btn1">查看错题</div> -->
					<div class="error-bank__head-btn2" @click="openSort(allData.get_viewurl,0)" v-if="allData.error_num>0"><img src="@/assets/exam/kaoshi2.png" />错题重做</div>
					<div class="error-bank__head-btn2 disabled" v-else><img src="@/assets/exam/kaoshi1.png" />错题重做</div>
				</div>
			</div>
			<div class="error-bank__main">
				<div class="error-bank__main-title">错题情况</div>
				<div class="error-bank__main-subtitle">
					<p>题型</p>
					<span>错题数</span>
				</div>
				<div class="error-bank__main-list" v-for="(item,i) in allDataList" :key="i">
					<div class="error-bank__main-left">{{item.tktype_name}}</div>
					<div class="error-bank__main-right">
						<span>{{item.error_num}}</span>
						<div class="error-bank__main-btn2" @click="openSort(item.get_viewurl,item.tktype)" v-if="item.error_num>0">错题重做</div>
						<div class="error-bank__main-btn2 disabled" v-else>错题重做</div>
						<!-- <div class="error-bank__main-btn1">查看错题</div> -->
					</div>
				</div>
			</div>
		</div>		
		<exam-sort v-if="showSort" @closeSort='closeSort' @openExam="openExam" />
		<exam-select v-if="onshow" @closemenu="closemenu" @setchange="errorTkHome" />
	</div>
</template>

<script>
	import {ErrorTkHome,GetCountErrorTk} from '@/apis/user'
	import store from '@/store'
	export default{
		name:"ErrorBank",
		data() {
			return {
				showSort:false,//显示考试顺序选择页面
				onshow:false,//显示切换考试页面
				allData:null,//所有数据
				allDataList:[],//所有错题列表
				childsclass:null,//切换考试二级菜单列表
				/*type 1题库练习2错题练习,3收藏练习，4章节练习，5知识点练习*/
				type:null,
				/* get_viewurl*/
				url:null,
				schoolid:store.state.schoolid,//学校机构id
				tktype:null,//题型分类
			}
		},
		methods: {		
			openExam(isrand){//前往试卷进行考试
				this.$store.created((userid,apptoken,schoolid)=>{
					location.href = `${this.url}#/Exercise?type=2&categoryid=${this.$route.query.categoryid}&schoolid=${schoolid}&isrand=${isrand}&tktype=${this.tktype}`	
				})
			},
			openSort(url,type){//显示选择考试顺序
				this.url = url
				this.tktype = type
				this.showSort = true
			},
			closeSort(){//关闭选择考试顺序
				this.showSort = false
			},
			change(){//切换课程后更新页面数据
				this.errorTkHome()
			},
			showmenu(){//显示切换考试二级菜单栏
				this.onshow = true
			},
			closemenu(){this.onshow = false},//关闭切换考试二级菜单栏
			errorTkHome(){//请求错题页面数据
				this.onshow = false
				if(localStorage.childsclass){
					this.childsclass = JSON.parse(localStorage.childsclass)
				}else{
					this.childsclass = null
				}
				let categoryid = this.$route.query.categoryid
				ErrorTkHome({
					categoryid:categoryid,
	
				}).then(res=>{
			
					if(res.result==true){
						this.allData = res.data
					}
				}),
				GetCountErrorTk({//请求错题列表数据
					categoryid:categoryid,
					
				}).then(res=>{
	
					if(res.result==true){
						this.allDataList = res.data
					}
				})
			}
		},
		
		activated(){
			document.title='错题练习'
			this.errorTkHome()
		}
	}
</script>

<style>
	
	.error-bank{
		width: 100%;
		position: relative;
		height: 155px;
	}
	.error-bank__position{
		position: absolute;
		top: 59px;
		width: 100%;
	}
	.error-bank__item{
		width: 100%;
		background-color: #ffffff;
		border: solid 1px #ebebeb;
		margin-top: 20px;
	}
	.error-bank__head{
		width: 100%;
		height: 160px;
		border-bottom: solid 1px #ebebeb;
	}
	.error-bank__head-box1{
		width: 200px;
		height: 120px;
		border-radius: 6px;
		border: solid 1px #ebebeb;
		text-align: center;
		margin: 20px 0 0 40px;
		float: left;
	}
	.error-bank__head-box1 p{
		font-size: 16px;
		color: #333;
		margin: 22px 0 10px 0;
	}
	.error-bank__head-box1 p i{
		font-size: 40px;
		font-style: normal;
		font-weight: bold;
		margin-right: 5px;
	}
	.error-bank__head-box1 span{
		color: ##7f7f7f;
		font-size: 14px;
	}

	.error-bank__head-box2{
		width: 200px;
		height: 120px;
		border-radius: 6px;
		border: solid 1px #ebebeb;
		text-align: center;
		margin: 20px 0 0 40px;
		float: left;
	}
	.error-bank__head-box2 p{
		font-size: 16px;
		color: #333;
		margin: 22px 0 10px 0;
	}
	.error-bank__head-box2 p i{
		font-size: 40px;
		font-style: normal;
		font-weight: bold;
		margin-right: 5px;
	}
	.error-bank__head-box2 span{
		color: ##7f7f7f;
		font-size: 14px;
	}
	.error-bank__head-box3{
		width: 200px;
		height: 120px;
		border-radius: 6px;
		border: solid 1px #ebebeb;
		text-align: center;
		margin: 20px 0 0 40px;
		float: left;
	}
	.error-bank__head-box3 p{
		font-size: 16px;
		color: #333;
		margin: 22px 0 10px 0;
	}
	.error-bank__head-box3 p i{
		font-size: 40px;
		font-style: normal;
		font-weight: bold;
		margin-right: 5px;
	}
	.error-bank__head-box3 span{
		color: ##7f7f7f;
		font-size: 14px;
	}
	.error-bank__head-right{
		width: 360px;
		float: right;
	}
	.error-bank__head-right span{
		display: inline-block;
		width: 1px;
		height: 124px;
		background-color: #eeeeee;
		float: left;
		margin-top: 18px;
	}
	.error-bank__head-btn1{
		width: 120px;
		height: 36px;
		border-radius: 18px;
		border: solid 1px #e5412c;
		font-size: 14px;
		color: #e5412c;
		text-align: center;
		line-height: 36px;
		margin-left: 50px;
		margin-top: 60px;
		float: left;
		cursor: pointer;
	}
	.error-bank__head-btn2{
		width: 120px;
		height: 36px;
		border-radius: 18px;
		border: solid 1px #e5412c;
		font-size: 14px;
		color: #e5412c;
		background: #fff;
		text-align: center;
		line-height: 36px;
		margin-right: 50px;
		margin-top: 60px;
		float: right;
		cursor: pointer;
	}
	.error-bank__head-btn2 img{
		width: 12px;
		height: 14px;
		margin: 0 4px -2px 0;
	}
	/* 内容部分 */
	.error-bank__main{
		padding-bottom: 20px;
	}
	.error-bank__main-title{
		height: 55px;
		margin-left: 30px;
		line-height: 55px;
		color: #333;
		font-size: 16px;
	}
	.error-bank__main-subtitle{
		width: calc(100% - 40px);
		height: 40px;
		margin: 0 auto;
		background-color: #f5f6fc;
		font-size: 16px;
		color: #999;
		line-height: 40px;
	}
	.error-bank__main-subtitle p{
		margin-left: 30px;
		text-align: center;
		float: left;
	}
	.error-bank__main-subtitle span{
		display: inline-block;
		width: 300px;
		float: right;
	}
	.error-bank__main-list{
		height: 77px;
		width: calc(100% - 40px);
		margin: 0 auto;
		line-height: 77px;
		color: #333;
		font-size: 14px;
		border-bottom: 1px solid #eeeeee;
	}
	.error-bank__main-list:hover{
		background: #fff8f7;
	}
	/* 列表样式 */
	.error-bank__main-left{
		margin-left: 30px;
		float: left;
	}
	.error-bank__main-right{
		width: 300px;
		float: right;
	}
	.error-bank__main-right span{
		margin-left: 16px;
		float: left;
	}
	.error-bank__main-btn1{
		width: 100px;
		height: 36px;
		border-radius: 18px;
		border: solid 1px #e5412c;
		font-size: 14px;
		color: #e5412c;
		text-align: center;
		line-height: 36px;
		margin-right: 20px;
		margin-top: 20px;
		float: right;
		cursor: pointer;
	}
	.error-bank__main-btn2{
		width: 100px;
		height: 36px;
		border-radius: 18px;
		border: solid 1px #e5412c;
		font-size: 14px;
		color: #e5412c;
		background: #fff;
		text-align: center;
		line-height: 36px;
		margin-top: 20px;
		float: right;
		cursor: pointer;
	}
	.disabled{
		cursor: not-allowed;
		background-color: #f5f7fa;
		border-color: #e4e7ed;
		color: #c0c4cc;
	}
</style>

