<template>
	<div style="width: 100%;">
		<div class="practice-record">
			<exam-title :data-list="childsclass" @change="change"  @showmenu="showmenu" />
			<div class="practice-record__position">
				<!-- 导航栏 -->
				<exam-bar index='4'></exam-bar>
			</div>
		</div>
		<div v-if="showList">
			<!-- 练习记录列表 -->
			<div class="practice-record__item" >
				<div class="practice-record__box" v-if="allData.length>0" v-for="(item,i) in allData" :key="i">
					<div class="practice-record__left">
						<div class="practice-record__title">
							<span>[{{item.type_name}}]</span>{{item.title}}({{item.adddate_mm}})
						</div>
						<div class="practice-record__text">
							<span>练习时间：{{item.adddate}}</span>
							<span>用时：{{Math.floor(item.exam_time/60)>=10?Math.floor(item.exam_time/60):'0'+Math.floor(item.exam_time/60)}}分{{item.exam_time%60>=10?item.exam_time%60:'0'+item.exam_time%60}}秒</span>
							<span>总{{item.do_num}}题/对{{item.do_num-item.error_num}}题</span>
							<span>正确率：{{item.zhunquelv}}%</span>
						</div>
					</div>
					<div class="practice-record__right">
						<p @click="deletePaperTest(item.id)">删除</p>
						<!-- <p v-if="item.is_repractice==0" class="disabled" @click="openExam()">重新做题</p> -->
						<p class="practice-record__right-again" @click="openExam(item.get_viewurl,item.type,item.isrand,item.sectionid,item.knowledgeid)">重新做题</p>
						<!-- <p v-else-if="item.is_repractice==2">继续做题</p> -->
						<span @click="openAnswer(item.get_viewurl,item.id,item.title,item.tk_num,item.exam_time,item.do_num)">查看解析</span>
					</div>
				</div>
				
			</div>
			
			<div class="practice-record__pagination">
				<Pagination :page-count="pageCount" @togglePage="getTestRecordList" />
			</div>
		</div>
		<!-- 无数据提示 -->
		<div class="practice-record__noShow" v-if="showNodata">
			<no-data />
		</div>		
			
		<exam-select v-if="onshow" @closemenu="closemenu" @setchange="getTestRecordList" />
	</div>
</template>

<script>
	import {GetTestRecordList,DeletePaperTest} from '@/apis/user'
	import store from '@/store'
	export default{
		name:"PracticeRecord",
		data() {
			return {
				showList:true,//显示内容开关
				showNodata:false,//无内容提示开关
				allData:[],//全部数据列表
				onshow:false,//切换考试显示开关
				pageCount:null,//总页面数
				childsclass:null,//切换考试二级分类
				page:1,
			}
		},
		methods: {
			openExam(url,type,isrand,sectionid,knowledgeid){//前往试卷进行考试
				this.$store.created((userid,apptoken,schoolid)=>{
					location.href = `${url}#/Exercise?type=${type}&categoryid=${this.$route.query.categoryid}&schoolid=${schoolid}&isrand=${isrand}&sectionid=${sectionid}&knowledgeid=${knowledgeid}`
				})
			},
			change(id){//切换课程请求更新数据
				this.getTestRecordList(id)
			},
			showmenu(){//显示切换考试开关
				this.onshow = true
			},
			closemenu(){this.onshow = false},//关闭切换考试开关
			openAnswer(url,id,title,tknum,time,donum){//查看解析
				location.href = `${url}#/ParsingPage?type=2&id=${id}&categoryid=${this.$route.query.categoryid}&title=${title}&tknum=${tknum}&answertime=${time}&dtnum=${donum}`
			},
			deletePaperTest(id){//删除练习记录
				DeletePaperTest({
					ids:id,
					categoryid:this.$route.query.categoryid,
				}).then(res=>{
					
				})
				this.getTestRecordList(this.page)
			},
			getTestRecordList(p=1){//请求接口数据
				this.page = p
				this.onshow = false
				if(localStorage.childsclass){
					this.childsclass = JSON.parse(localStorage.childsclass)
				}else{
					this.childsclass = null
				}
				GetTestRecordList({
					sectionid: 1,
					categoryid:this.$route.query.categoryid,
					page:p,
					pagesize:10,
				}).then(res=>{
					console.log(res)
					if(res.result==true){
						this.allData = res.data
						this.pageCount = res.pagecount
						this.showList = true
						this.showNodata = false
					}else{
						this.showList = false
						this.showNodata = true
					}
				})
			}
		},
		activated(){
			document.title='练习记录'
			this.getTestRecordList()
		}
	}
</script>

<style scoped>
	.disabled{
		background-color: #f5f7fa !important;
		color: #c0c4cc !important;
		border: 1px solid #e4e7ed !important;
		cursor: not-allowed !important;
	}
	.practice-record{
		width: 100%;
		position: relative;
		height: 155px;
	}
	.practice-record__position{
		position: absolute;
		top: 59px;
		width: 100%;
	}
	/* 练习记录列表 */
	.practice-record__item{
		margin-top: 20px;
		width: 100%;
		height: 534px;
		background: #fff;
		border: solid 1px #ebebeb;
		border-bottom: none;
	}
	.practice-record__box{
		height: 85px;
		border-bottom: 1px solid #ebebeb;
	}
	.practice-record__box:hover{
		background: #fff8f7;
	}
	.practice-record__left{
		float: left;
	}
	.practice-record__title{
		font-size: 14px;
		color: #333;
		margin: 17px 0 0 25px;
	}
	.practice-record__title span{
		color: #e5412c;
	}
	.practice-record__text{
		font-size: 12px;
		color: #999;
		margin: 14px 0 0 25px;
	}
	.practice-record__text span{
		margin-right: 38px;
	}
	
	.practice-record__right{
		width: 400px;
		float: right;
		margin: 25px 22px 0 0;
	}

	.practice-record__right span{
		font-size: 12px;
		color: #999;
		float: right;
		line-height: 36px;
		margin-right: 20px;
		cursor: pointer;
	}
	.practice-record__right p{
		width: 100px;
		height: 36px;
		border-radius: 18px;
		border: solid 1px #e5412c;
		font-size: 14px;
		color: #e5412c;
		text-align: center;
		line-height: 36px;
		float: right;
		margin-left: 20px;
		cursor: pointer;
	}
	.practice-record__right-again{
		color: #333 !important;
		border: 1px solid #ccc !important;
	}
	.practice-record__pagination{
		width: 100%;
		height: 60px;
		background: #fff;
		border: 1px solid #ebebeb;
		border-top: none;
		box-sizing: content-box;
	}
	.practice-record__noShow{
		height: 450px;
		padding-top: 100px;
		background: #fff;
		border: 1px solid #ebebeb;
		border-top: none;
	}
</style>

