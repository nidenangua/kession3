<template>
	<div style="width: 100%;">
		<div class="package-exam">
			<exam-title :data-list="childsclass" @change="change"  @showmenu="showmenu" />
			<div class="package-exam__position">
				<exam-bar index='3'></exam-bar>
			</div>
		</div>
		<!-- 考试记录列表 -->
		<div class="package-exam__item">
			<div class="package-exam__nav">
				<span :class="{active:typeid==0}" @click="getPaperList()">全部试卷</span>
				<span :class="{active:typeid==(n+1)}" v-for="(site,n) in typeData" :key="n" @click="getPaperList('',site.typeid,n+1)">{{site.typename}}</span>	
			</div>
			<div class="package-exam__item-title">
				<p>试卷名称</p>
				<span>最新得分</span>
			</div>
		</div>
			
		<div v-if="showList" class="package-exam__show">
			<div class="package-exam__showbox">
				<div class="package-exam__box" v-for="(item,i) in allData" :key="i">
					<div class="package-exam__left">
						<div class="package-exam__title">
							<span></span>{{item.title}}
						</div>
						<div class="package-exam__text">
							<span>{{item.studentcount}}人参加</span>
							<span>考试时间：{{item.exam_time}}分钟</span>
							<span>总分：{{item.paper_sumscore}}分</span>
							<div class="package-exam__difficulty">
								难度: 
								<i class="package-exam__star" :style="{width:(item.paper_level==0&&13+'px')||(item.paper_level==1&&26+'px')||(item.paper_level==2&&50+'px')}"></i>
								<i class="package-exam__star-bg" ></i>
							</div>
						</div>
					</div>
					<div class="package-exam__right">
						<div class="package-exam__score" v-if="item.sumscore!=-1"><i>{{item.sumscore}}</i>分</div>
						<div class="package-exam__score" v-else>&nbsp;&nbsp;- -</div>
						<div >
							<p v-if="item.is_repractice==-1" class="package-exam__right-start" @click="openExam(item.paperid,item.get_viewurl)">开始做题</p>
							<p v-else-if="item.is_repractice==0" class="disabled">重新做题</p>
							<p v-else-if="item.is_repractice==1" class="package-exam__right-again" @click="openExam(item.paperid,item.get_viewurl)">重新做题</p>
							<p v-else-if="item.is_repractice==2" @click="againExam(item.paperid,item.get_viewurl)">继续做题</p>
						</div>
					</div>
				</div>
				
			</div>
			<div class="package-exam__pagination">
				<Pagination :page-count="pageCount" @togglePage="getPaperList" />
			</div>
		</div>
		<!-- 无数据提示 -->
		<div class="package-exam__noShow" v-if="showNodata">
			<no-data  />
		</div>		
			
		<!-- <exam-sort v-if="showSort" @closeSort='closeSort' :paper-id="paperId" @openExam="openExam"></exam-sort> -->
		<exam-select v-if="onshow" @closemenu="closemenu" @setchange="getPaperList" />
	</div>
</template>

<script>
	import {GetPaperList,GetAllPaperType} from '@/apis/paper'
	import store from '@/store'
	export default{
		name:"PackageExam",
		data() {
			return {
				showList:true,//内容列表开关
				showNodata:false,//无内容提示页面开关
				typeData:null,//套卷分类导航数据
				typeid:0,//套卷分类id
				showSort:false,//做题顺序开关
				allData:[],//接口数据
				childsclass:null,//二级菜单分类
				onshow:false,//切换课程页面开关
				pageCount:null,//总页数
				paperId:null,//试卷id
				get_viewurl:null,//试卷链接地址
				schoolid:store.state.schoolid,//学校机构id
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
			openSort(id,url){//打开选择考试顺序
				this.showSort = true
				this.paperId = id
				this.get_viewurl = url
			},
			closeSort(){//关闭考试选择显示
				this.showSort = false
			},
			change(id){//选择课程后更新数据
				this.getPaperList(id)
			},
			showmenu(){//显示二级菜单栏
				this.onshow = true
			},
			closemenu(){this.onshow = false},//关闭二级菜单栏显示
			getPaperList(p=1,typeid,n){//请求套卷数据
				if(n){
					this.typeid = n
				}else{
					this.typeid = 0
				}
				
				this.onshow = false
				
				if(typeid){
					localStorage.typeid = typeid
				}else{
					localStorage.typeid = 0
				}
				if(localStorage.childsclass){
					this.childsclass = JSON.parse(localStorage.childsclass)
				}else{
					this.childsclass = null
				}
				//获取套卷练习数据
				GetPaperList({
					categoryid:this.$route.query.categoryid,
					typeid:typeid||0,
					page:p,
					pagesize:5,
				}).then(res=>{
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
		created(){
			//获取套卷练习分类名称
			GetAllPaperType({
				schoolid:store.state.schoolid
			}).then(res=>{
				if(res.result==true){
					this.typeData = res.data
					
				}
			})
			
			
		},
		activated(){
			document.title='套卷练习'
			this.getPaperList()		
		}	
	}
</script>

<style scoped>
	.package-exam{
		width: 100%;
		position: relative;
		height: 155px;
	}
	.package-exam__position{
		position: absolute;
		top: 59px;
		width: 100%;
	}
	/* 考试记录列表 */
	/* 标题 */
	.package-exam__show{
		width: calc(100% - 40px);
		padding: 0 19px;
		background: #fff;
		border: solid 1px #ebebeb;
		border-top: none;
	}
	.package-exam__showbox{
		height: 500px;
	}
	.package-exam__noShow{
		width: 100%;
		background: #fff;
		height: 450px;
		padding-top: 100px;
		background: #fff;
		border: 1px solid #ebebeb;
		border-top: none;
	}
	.package-exam__item{
		width: 100%;
		background: #fff;
		margin-top: 20px;
		border: solid 1px #ebebeb;
		border-bottom: none;
	}
	.package-exam__item-title{
		width: calc(100% - 40px);
		height: 40px;
		margin: 0 auto;
		background-color: #f5f6fc;
		margin-top: 20px;
		font-size: 16px;
		color: #999;
		line-height: 40px;
	}
	.package-exam__item-title p{
		width: 400px;
		text-align: center;
		float: left;
	}
	.package-exam__item-title span{
		display: inline-block;
		width: 300px;
		float: right;
	}
	
	/* 导航栏 */
	.package-exam__nav{
		padding-left: 40px;
		height: 56px;
		border-bottom: 1px solid #ebebeb;
		font-size: 16px;
		color: #333;
		line-height: 56px;	
	}
	.package-exam__nav span{
		margin-right: 60px;
		display: inline-block;
		height: 56px;
		cursor: pointer;
	}
	.active{
		border-bottom: 2px solid #e5412c;
		color: #e5412c;
		box-sizing: border-box;
	}
	.package-exam__box{
		width: calc(100% - 40px);
		height: 85px;
		margin: 0 auto;
		border-bottom: 1px solid #ebebeb;
	}
	.package-exam__box:hover{
		background: #fff8f7;
	}
	.package-exam__left{
		float: left;
	}
	.package-exam__title{
		font-size: 14px;
		color: #333;
		margin: 17px 0 0 0;
	}
	.package-exam__title span{
		color: #e5412c;
	}
	.package-exam__text{
		font-size: 12px;
		color: #999;
		margin: 14px 0 0 0;
	}
	.package-exam__text span{
		margin-right: 38px;
		float: left;
	}
	
	.package-exam__right{
		width: 300px;
		float: right;
		margin: 25px 0 0 0;
	}
	.package-exam__score{
		font-size: 12px;
		color:#999;
		float: left;
		line-height: 38px;
	}
	.package-exam__score i{
		font-size: 18px;
		color: #e5412c;
		font-style:normal;
	}
	.package-exam__right span{
		font-size: 12px;
		color: #999;
		float: right;
		line-height: 36px;
		margin-right: 20px;
	}
	.package-exam__right p{
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
	}
	.package-exam__right-start{
		background: #e5412c !important;
		color: #fff !important;
	}
	.disabled{
		background-color: #f5f7fa !important;
		color: #c0c4cc !important;
		border: 1px solid #e4e7ed !important;
		cursor: not-allowed !important;
	}
	.package-exam__right-again{
		color: #333 !important;
		border: 1px solid #ccc !important;
	}
	/* 难度 */
	.package-exam__difficulty {
	  float: left;
	  display: inline-block;
	  position: relative;
	  
	   
	}
	.package-exam__star {
	  position: absolute;
	  left:35px;
	  top: 50%;
	  margin-top: -10px;
	  display: block;
	  width: 80px;
	  height: 20px;
	  background: url("../../assets/exam/me_test_icon_hard.png") no-repeat left center;
	  z-index: 10;
	}
	.package-exam__star-bg {
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
	.package-exam__pagination{
		width: 100%;
		height: 60px;
		background: #fff;
	}
</style>