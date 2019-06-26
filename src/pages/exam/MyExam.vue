<template>
	<div style="width: 100%;position:relative">
		<div class="myexam">
			<exam-title :data-list="childsclass" @change="change"  @showmenu="showmenu" />
			<div class="myexam-position">
				<exam-bar index='1'></exam-bar>
			</div>
		</div>
		<div class="myexam-box"  v-if="allData!=null">
			<!-- 进度条 -->
			<div class="myexam-progress">
				<div class="myexam-progress__left">
					<div class="myexam-progress__item">
						<h1>试题：</h1>
						<div class="myexam-progress__box">
							<p  :style="{width:allData.do_num*100/allData.tk_num+'%'}"></p>
						</div>
						<span >已做{{allData.do_num}}题/共{{allData.tk_num}}题</span>
					</div>
					<div class="myexam-progress__item">
						<h1>试卷：</h1>
						<div class="myexam-progress__box">
							<p  :style="{width:allData.user_paper_num*100/allData.paper_num+'%'}"></p>
						</div>
						<span >已做{{allData.user_paper_num}}题/共{{allData.paper_num}}题</span>
					</div>
					<div class="myexam-progress__item">
						<h1>知识点：</h1>
						<div class="myexam-progress__box">
							<p :style="{width:allData.user_knowledge_num*100/allData.knowledge_num+'%'}"></p>
						</div>
						<span>已做{{allData.user_knowledge_num}}题/共{{allData.knowledge_num}}题</span>
					</div>
				</div>
				<div class="myexam-progress__right" v-if="showDay">
					<div class="myexam-progress__btn" @click="openExam(url)"><img src="@/assets/exam/kaoshi.png" />每日一练</div>
					<span></span>
				</div>
			</div>
			<!-- 学习情况文字 -->
			<div class="myexam-record">
				<div class="myexam-record__item">
					<div class="myexam-record__text"><span>{{allData.total_continedotkday}}</span>天</div>
					<p>连续学习</p>
				</div>
				<div class="myexam-record__item">
					<div class="myexam-record__text"><span>{{Math.floor(allData.total_dotktime/60)}}</span>小时<span>{{Math.floor(allData.total_dotktime%60)}}</span>分钟</div>
					<p>连续学习</p>
				</div>
				<div class="myexam-record__item">
					<div class="myexam-record__text"><span >{{allData.zhunquelv}}</span>%</div>
					<p>正确率</p>
				</div>
				<div class="myexam-record__item">
					<div class="myexam-record__text"><span >{{allData.error_num}}</span>题</div>
					<p>错题数</p>
				</div>
				<div class="myexam-record__item">
					<div class="myexam-record__text"><span >{{allData.collect_num}}</span>题</div>
					<p>收藏题数</p>
				</div>
			</div>
			<!-- 学习图表 -->
			<div class="myexam-chart" >
				<echarts v-if="allData!=null" :data-list="allData.day_record"></echarts>
			</div>
		</div>		
		<exam-select v-if="onshow" @closemenu="closemenu" @setchange="getSubjectStatistics" />
	
	</div>
	
</template>

<script>
	import {GetPaperList,GetAllPaperCategory,GetSubjectStatistics} from '@/apis/exam'
	export default({
		name:"MyExam",
		data() {
			return {
				allData:null,//接口数据
				childsclass:null,//二级菜单课程名称
				onshow:false,//切换课程页面开关
				moduleData:null,//模块数据
				showDay:false,//每日一练开关
				url:null,//每日一练地址
			}
		},
		methods: {
			openExam(url){//前往每日一练
				this.$store.created((userid,apptoken,schoolid)=>{
					location.href = `${url}#/Exercise?type=6&isrand=0&knowledgeid=0&categoryid=${this.$route.query.categoryid}&schoolid=${schoolid}`
				})
			},
			change(){//切换新课程后请求新课程学习数据
				this.getSubjectStatistics()
			},
			showmenu(){//显示切换课程页面
				this.onshow = true
			},
			closemenu(){this.onshow = false},//关闭切换课程页面
			getSubjectStatistics(){//请求课程的数据
				this.$showMask()
				this.onshow = false
			
				if(localStorage.childsclass){
					this.childsclass = JSON.parse(localStorage.childsclass)
				}else{
					this.childsclass = null
				}

				//获取用户学习情况
				GetSubjectStatistics({
					categoryid:this.$route.query.categoryid||0,
				}).then(res=>{
					this.allData = res.data
					this.moduleData = res.module
					this.url = res.get_viewurl
					for( let i in this.moduleData){
						if(this.moduleData[i].module_id==6){
							this.showDay = true
						}else{
							this.showDay = false
						}
					}
					this.$hideMask()
				})
			}
		},
		created(){
			
		
		},

		activated(){
			this.getSubjectStatistics()	
		
		}
	})
</script>

<style scoped>
	.myexam{
		width: 100%;
		position: relative;
		height: 155px;
	}
	.myexam-position{
		position: absolute;
		top: 59px;
		width: 100%;
	}
	.myexam-box{
		width: 100%;
		height: 836px;
		background-color: #ffffff;
		border: solid 1px #ebebeb;
		margin-top: 20px;
	}
	/* 进度条 */
	.myexam-progress{
		width: 100%;
		height: 142px;
		background: #fff;
		margin-top: 20px;
		padding-top: 15px;
		border-bottom: solid 1px #ebebeb;
	}
	.myexam-progress__left{
		float: left;
		
	}
	.myexam-progress__item{
		padding: 15px 0;
	}
	.myexam-progress__left h1{
		width: 90px;
		font-size: 14px;
		color: #333;
		text-align: right;
		float: left;
		font-weight: normal;
	}
	.myexam-progress__left .myexam-progress__box{
		width: 540px;
		height: 10px;
		background-color: #f7f7f7;
		border-radius: 5px;
		float: left;
		margin: 4px 8px 0 4px;
		position: relative;
	}
	.myexam-progress__box p{
		background: #e5412c;
		height: 100%;
		border-radius: 5px;
		position: absolute;
		left: 0;
		top: 0;
	}
	.myexam-progress__left span{
		font-size: 12px;
		color: #999;
		float: left;
	}
	.myexam-progress__right{
		float: right;
		
	}
	.myexam-progress__right span{
		display: inline-block;
		width: 1px;
		height: 120px;
		background: #eee;
		float: right;
	}
	.myexam-progress__btn{
		width: 200px;
		height: 36px;
		background-color: #e5412c;
		border-radius: 18px;
		color: #fff;
		font-size: 14px;
		text-align: center;
		line-height: 36px;
		margin: 45px  51px 0 51px;
		float: right;
		cursor: pointer;
	}
	.myexam-progress__btn img{
		width: 12px;
		height: 14px;
		margin: 0 4px -2px 0;
	}
	/* 学习情况文字 */
	.myexam-record{
		padding: 20px 0 20px 17px;
		height: 122px ;
		border-bottom: solid 1px #ebebeb;
		width: 100%;
	}
	.myexam-record__item{
		width: calc(20% - 24px);
		height: 120px;
		border-radius: 6px;
		border: solid 1px #ebebeb;
		margin-right: 18px;
		float: left;
		text-align: center;
	}
	.myexam-record__text{
		font-size: 16px;
		color: #333;
		margin-top: 26px;
	}
	.myexam-record__text span{
		font-size: 40px;
		color: #333;
		font-weight: bold;
	}
	.myexam-record__item p{
		margin-top: 10px;
		font-size: 14px;
		color: #7f7f7f;
	}
	/* 学习图表 */
	.myexam-chart{
		
		width: calc(100% - 155px);
		height: 473px;
		margin: 20px auto 0 auto;
	}
	/* 加载中 */
	#divprogressbar{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(255,255,255,0.7);
		z-index: 999;
		text-align: center;
	}
	#divprogressbar img{
		position: absolute;
		top: 50%;
		left:50%;
		margin-left:-20px;
		height: 40px;
		width:40px;
		line-height: 30px;
		margin-top: -20px;
		color: #333;
		font-size: 20px;
		letter-spacing: 5px;
	}
</style>
