<template>
	<div style="width: 100%;">
		<div class="exam-record">
			<exam-title :data-list="childsclass" @change="change"  @showmenu="showmenu" />
			<div class="exam-record__position">
				<exam-bar index='5'></exam-bar>
			</div>
		</div>
		<!-- 考试记录列表 -->
		<div class="exam-record__item">
			<div class="exam-record__item-title">
				<p>考试记录</p>
				<span>得分</span>
			</div>
		</div>
		<div v-if="showList"  class="exam-record__show">
			<div class="exam-record__showbox">
				<div class="exam-record__box"  v-for="(item,i) in allData" :key="i">
					<div class="exam-record__left">
						<div class="exam-record__title">
							<span>[{{item.type_name}}]</span>{{item.title}}({{item.adddate_mm}})
						</div>
						<div class="exam-record__text">
							<span>练习时间:{{item.adddate}}</span>
							<span>用时：{{Math.floor(item.time/60)>=10?Math.floor(item.time/60):'0'+Math.floor(item.time/60)}}分{{item.time%60>=10?item.time%60:'0'+item.time%60}}秒</span>
							<span>总分：{{item.paper_sumscore}}分</span>
							<div class="exam-record__difficulty">
								难度: 
								<i class="exam-record__star" :style="{width:(item.paper_level==0&&13+'px')||(item.paper_level==1&&26+'px')||(item.paper_level==2&&50+'px')}"></i>
								<i class="exam-record__star-bg" ></i>
								<span v-if="item.paper_level==2">难</span>
							</div>
						</div>
					</div>
					<div class="exam-record__right">
						<div class="exam-record__score" v-if="item.batch==1">
							<div v-if="item.iscorrect==1"><i>{{item.sumscore}}</i>分</div>
							<div v-else-if="item.iscorrect==0">待批卷</div>
						</div>
						<div class="exam-record__score" v-else-if="item.batch==0">- -</div>
						<p v-if="item.is_delrecord==1" @click="deletePaperRecord(item.id)">删除</p>
						<p v-if="item.is_repractice==0" class="disabled">重新做题</p>
						<p v-else-if="item.is_repractice==1" class="exam-record__right-again" @click="openExam(item.paperid,item.get_viewurl)">重新做题</p>
						<p v-else-if="item.is_repractice==2"  @click="againExam(item.paperid,item.get_viewurl)">继续做题</p>
						<span v-if="item.batch==1" @click="openAnswer(item.get_viewurl,item.id,item.title,item.tk_num,item.time,item.do_num,item.paperid)">查看解析</span>
						<span v-else-if="item.batch==0">未完成</span>
					</div>
				</div>
			</div>
			<div class="exam-record__pagination">
				<Pagination :page-count="pageCount" @togglePage="getPaperRecordList" />
			</div>
		</div>
		<!-- 无数据提示 -->
		<div class="exam-record__noShow" v-if="showNodata">
			<no-data  />
		</div>		
		<exam-select v-if="onshow" @closemenu="closemenu" @setchange="getPaperRecordList" />
	</div>	
</template>

<script>
	import {GetPaperRecordList,DeletePaperRecord} from '@/apis/user'
	export default{
		name:"ExamRecord",
		data() {
			return {
				showNodata:false,//无内容提示开关
				showList:true,//显示内容开关
				allData:[],//全部数据
				pageCount:null,//总页面数
				childsclass:null,//切换考试二级分类数据
				onshow:false,//切换开始显示开关
				page:1,
			}
		},
		methods: {
			openExam(id,url){//前往试卷进行考试
				this.$store.created((userid,apptoken,schoolid)=>{
					location.href = `${url}#/PaperInfo?paperid=${id}&categoryid=${this.$route.query.categoryid}&schoolid=${schoolid}`
				})
			},
			againExam(id,url){//继续考试
				this.$store.created((userid,apptoken,schoolid)=>{
					location.href = `${url}#/TestPage?paperid=${id}&categoryid=${this.$route.query.categoryid}&schoolid=${schoolid}`
				})
			},
			openAnswer(url,id,title,tknum,time,donum,paperid){//查看解析
				location.href = `${url}#/ParsingPage?type=1&id=${id}&categoryid=${this.$route.query.categoryid}&title=${title}&tknum=${tknum}&answertime=${time}&dtnum=${donum}&paperid=${paperid}`
			},
			change(){//切换考试后请求更新数据
				this.getPaperRecordList()
			},
			showmenu(){//显示切换考试菜单栏
				this.onshow = true
			},
			closemenu(){this.onshow = false},//关闭切换考试菜单栏
			deletePaperRecord(id){//删除考试记录
				DeletePaperRecord({
					ids:id,
					categoryid:this.$route.query.categoryid,
				}).then(res=>{
					
				})
				this.getPaperRecordList(this.page)
			},
			getPaperRecordList(p=1){//获取考试记录
				this.page = p
				if(localStorage.childsclass){
					this.childsclass = JSON.parse(localStorage.childsclass)
				}else{
					this.childsclass = null
				}
				GetPaperRecordList({
					categoryid:this.$route.query.categoryid,
					page:p,
					pagesize:5,
				}).then(res=>{
					if(res.result==true){
						this.allData = res.data
						this.pageCount = res.pagecount
						this.showNodata = false
						this.showList = true
					}else{
						this.showList = false
						this.showNodata = true
					}
				})
			}	
		},
		activated(){
			this.getPaperRecordList()
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
	.exam-record{
		width: 100%;
		position: relative;
		height: 155px;
	}
	.exam-record__position{
		position: absolute;top: 59px;width: 100%;
	}
	/* 考试记录列表 */
	/* 标题 */
	.exam-record__item{
		width: 100%;
		background: #fff;
		margin-top: 20px;
		border: solid 1px #ebebeb;
	}
	.exam-record__item-title{
		width: 100%;
		height: 40px;
		background-color: #f5f6fc;
		margin-top: 20px;
		font-size: 16px;
		color: #999;
		line-height: 40px;
	}
	.exam-record__item-title p{
		width: 400px;
		text-align: center;
		float: left;
	}
	.exam-record__item-title span{
		display: inline-block;
		width: 422px;
		float: right;
	}
	/* 考试记录 */
	
	.exam-record__show{
		width: 100%;
	
		background: #fff;
		border: solid 1px #ebebeb;
		border-top: none;
		
	}
	.exam-record__showbox{
		height: 500px;
	}
	.exam-record__noShow{
		width: 100%;
		background: #fff;
		padding-top: 100px;
		height: 450px;
		background: #fff;
		border: 1px solid #ebebeb;
		border-top: none;
	}
	.exam-record__box{
		height: 85px;
		border-bottom: 1px solid #ebebeb;
	}
	.exam-record__box:hover{
		background: #fff8f7;
	}
	.exam-record__left{
		float: left;
	}
	.exam-record__title{
		font-size: 14px;
		color: #333;
		margin: 17px 0 0 25px;
	}
	.exam-record__title span{
		color: #e5412c;
	}
	.exam-record__text{
		font-size: 12px;
		color: #999;
		margin: 14px 0 20px 25px;
	}
	.exam-record__text span{
		margin-right: 38px;
		float: left;
	}
	
	.exam-record__right{
		width: 400px;
		float: right;
		margin: 25px 22px 0 0;
	}
	.exam-record__score{
		font-size: 12px;
		color:#999;
		float: left;
		line-height: 38px;
	}
	.exam-record__score i{
		font-size: 18px;
		color: #e5412c;
		font-style:normal;
	}
	.exam-record__right span{
		font-size: 12px;
		color: #999;
		float: right;
		line-height: 36px;
		cursor: pointer;
	}
	.exam-record__right p{
		width: 100px;
		height: 36px;
		border-radius: 18px;
		border: solid 1px #e5412c;
		font-size: 14px;
		color: #e5412c;
		text-align: center;
		line-height: 36px;
		float: right;
		cursor: pointer;
		margin-left: 20px;
	}
	.exam-record__right-again{
		color: #333 !important;
		border: 1px solid #ccc !important;
	}
	/* 难度 */
	.exam-record__difficulty {
		float: left;
		display: inline-block;
		position: relative;
	}
	.exam-record__difficulty span{
		color: #e5412c;
	}
	.exam-record__star {
	  position: absolute;
	  left:35px;
	  top: 50%;
	  margin-top: -10px;
	  display: block;
	  height: 20px;
	  background: url("../../assets/exam/me_test_icon_hard.png") no-repeat left center;
	  z-index: 10;
	  margin-right: 10px;
	}
	.exam-record__star-bg {
	  position: absolute;
	  left:35px;
	  top: 50%;
	  z-index: 1;
	  margin-top: -10px;
	  display: block;
	  width: 80px;
	  height: 20px;
	  background: url("../../assets/exam/me_test_icon_easy.png") no-repeat left center;
	}
	.exam-record__pagination{
		height: 60px;
		background: #fff;
		padding-right: 20px;
	}
</style>
