<template>
	<div style="width: 100%;">
		<div class="collect-bank">
			<exam-title :data-list="childsclass" @change="change"  @showmenu="showmenu" />
			<div class="collect-bank__position">
				<!-- 导航栏 -->
				<exam-bar index='7'></exam-bar>
			</div>
		</div>
				<div class="collect-bank__item" v-if="allData!=null">
					<div class="collect-bank__head">
						<div class="collect-bank__head-box1">
							<p ><i>{{allData.collect_num}}</i>题</p>
							<span>收藏总数</span>
						</div>
						<div class="collect-bank__head-box2">
							<p><i>{{allData.today_collect}}</i>题</p>
							<span>今日收藏</span>
						</div>
						<div class="collect-bank__head-right">
							<span></span>
							<!-- <div class="collect-bank__head-btn1">查看收藏</div> -->
							<div class="collect-bank__head-btn2" @click="openSort(allData.get_viewurl,0)" v-if="allData.collect_num>0"><img src="@/assets/exam/kaoshi2.png" />收藏重做</div>
							<div class="collect-bank__head-btn2 disabled" v-else><img src="@/assets/exam/kaoshi1.png" />收藏重做</div>
						</div>
					</div>
					<div class="collect-bank__main">
						<div class="collect-bank__main-title">收藏情况</div>
						<div class="collect-bank__main-subtitle">
							<p>题型</p>
							<span>收藏数</span>
						</div>
						<div class="collect-bank__main-list" v-for="(item,i) in allDataList" :key="i" >
							<div class="collect-bank__main-left">{{item.tktype_name}}</div>
							<div class="collect-bank__main-right">
								<span>{{item.collect_num}}</span>
								<div class="collect-bank__main-btn2" @click="openSort(item.get_viewurl,item.tktype)" v-if="item.collect_num>0">收藏重做</div>
								<div class="collect-bank__main-btn2 disabled" v-else>收藏重做</div>
								<!-- <div class="collect-bank__main-btn1" >查看收藏</div> -->
							</div>
						</div>
					</div>
				</div>
			
		
		<exam-sort v-if="showSort" @closeSort='closeSort' @openExam="openExam" />
		<exam-select v-if="onshow" @closemenu="closemenu" @setchange="collectTkHome" />
	</div>
</template>

<script>
	import {CollectTkHome,GetCountCollectTk} from '@/apis/user'
	import store from '@/store'
	export default{
		name:"CollectBank",
		data() {
			return {
				showSort:false,//显示考试顺序开关
				onshow:false,//显示切换考试分类开关
				allData:null,//所有数据
				allDataList:[],//所有列表数据
				url:null,//链接地址
				schoolid:store.state.schoolid,//学校机构id
				tktype:null,//题型分类
			}
		},
		methods: {
			openExam(isrand){//前往试卷进行考试
				this.$store.created((userid,apptoken,schoolid)=>{
					location.href = `${this.url}#/Exercise?type=3&categoryid=${this.$route.query.categoryid}&schoolid=${schoolid}&isrand=${isrand}&tktype=${this.tktype}`
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
			change(){//切换考试分类后请求新数据
				this.errorTkHome()
			},
			showmenu(){//显示切换考试分类页面
				this.onshow = true
			},
			closemenu(){this.onshow = false},//关闭切换考试分类页面
			collectTkHome(){//请求数据
				this.onshow = false
				if(localStorage.childsclass){
					this.childsclass = JSON.parse(localStorage.childsclass)
				}else{
					this.childsclass = null
				}
				CollectTkHome({//请求所有数据
					categoryid:this.$route.query.categoryid,
					
				}).then(res=>{
					if(res.result==true){
						this.allData = res.data
					}
				}),
				GetCountCollectTk({//请求所有列表数据
					categoryid:this.$route.query.categoryid,
				}).then(res=>{
					if(res.result==true){
						this.allDataList = res.data
					}
				})
			}
		},
		
		activated(){
			this.collectTkHome()
		}
	}
</script>

<style>
	.collect-bank{
		width: 100%;
		position: relative;
		height: 155px;
	}
	.collect-bank__position{
		position: absolute;
		top: 59px;
		width: 100%;
	}
	.collect-bank__item{
		width: 100%;
		border: solid 1px #ebebeb;
		background-color: #ffffff;
		margin-top: 20px;
	}
	.collect-bank__head{
		width: 100%;
		height: 160px;
		border-bottom: solid 1px #ebebeb;
		
	}
	.collect-bank__head-box1{
		width: 200px;
		height: 120px;
		border-radius: 6px;
		border: solid 1px #ebebeb;
		text-align: center;
		margin: 20px 0 0 140px;
		float: left;
	}
	.collect-bank__head-box1 p{
		font-size: 16px;
		color: #333;
		margin: 22px 0 10px 0;
	}
	.collect-bank__head-box1 p i{
		font-size: 40px;
		font-style: normal;
		font-weight: bold;
		margin-right: 5px;
	}
	.collect-bank__head-box1 span{
		color: #7f7f7f;
		font-size: 14px;
	}
	.collect-bank__head-box2{
		width: 200px;
		height: 120px;
		border-radius: 6px;
		border: solid 1px #ebebeb;
		text-align: center;
		margin: 20px 0 0 80px;
		float: left;
	}
	.collect-bank__head-box2 p{
		font-size: 16px;
		color: #333;
		margin: 22px 0 10px 0;
	}
	.collect-bank__head-box2 p i{
		font-size: 40px;
		font-style: normal;
		font-weight: bold;
		margin-right: 5px;
	}
	.collect-bank__head-box2 span{
		color: #7f7f7f;
		font-size: 14px;
	}
	.collect-bank__head-right{
		width: 360px;
		float: right;
	}
	.collect-bank__head-right span{
		display: inline-block;
		width: 1px;
		height: 124px;
		background-color: #eeeeee;
		float: left;
		margin-top: 18px;
	}
	.collect-bank__head-btn1{
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
	.collect-bank__head-btn2{
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
	.collect-bank__head-btn2 img{
		width: 12px;
		height: 14px;
		margin: 0 4px -2px 0;
	}
	/* 内容部分 */
	.collect-bank__main{
		padding-bottom: 20px;
		margin-left: 20px;
		background: #fff;
	}
	.collect-bank__main-title{
		height: 55px;
		margin-left: 30px;
		line-height: 55px;
		color: #333;
		font-size: 16px;
	}
	.collect-bank__main-subtitle{
		width: calc(100% - 40px);
		height: 40px;
		background-color: #f5f6fc;
		font-size: 16px;
		color: #999;
		line-height: 40px;
	}
	.collect-bank__main-subtitle p{
		margin-left: 30px;
		text-align: center;
		float: left;
	}
	.collect-bank__main-subtitle span{
		display: inline-block;
		width: 300px;
		float: right;
	}
	.collect-bank__main-list{
		height: 77px;
		width: calc(100% - 40px);
		line-height: 77px;
		color: #333;
		font-size: 14px;
		border-bottom: 1px solid #eeeeee;
	}
	.collect-bank__main-list:hover{
		background: #fff8f7;
	}
	/* 列表样式 */
	.collect-bank__main-left{
		margin-left: 30px;
		float: left;
	}
	.collect-bank__main-right{
		width: 300px;
		float: right;
	}
	.collect-bank__main-right span{
		margin-left: 16px;
		float: left;
	}
	.collect-bank__main-btn1{
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
	.collect-bank__main-btn2{
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
