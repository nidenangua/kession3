<template>
	<div style="width: 100%;">
		<div class="practice">
			<exam-title :data-list="childsclass" @change="change"  @showmenu="showmenu" />
			<div class="practice-position" >
				<exam-bar index='2' @toggle="toggle"></exam-bar>
			</div>
		</div>
		<div class="practice-item" v-if="chaper==0&&knowledge==0">
			<div class="practice-box1" @click="openExamAll(0)">
				<div class="practice-box1__img"></div>
				<p>顺序练习</p>
			</div>
			<div class="practice-box2" @click="openExamAll(1)">
				<div class="practice-box2__img"></div>
				<p>随机练习</p>
			</div>
		</div>
		<!-- 练习中心列表 -->
		<div class="practice__bank" v-else>
			<div class="practice__nav">
				<span :class="{active:active==0}" v-if="chaper==1" @click="nav(0)">章节练习</span>
				<span :class="{active:active==1}" v-if="knowledge==1" @click="nav(1)">知识点练习</span>
			</div>
			<div v-if="active==0">
				<div v-if="allData!=null">
					<div class="practice__bank-title">
						<p>章节</p>
						<span>已做/做题</span>
					</div>
					<div v-for="(item,i) in allData" :key="i">
						<div class="practice__box">
							<div class="practice__left" @click="openSub(i)">
								<img v-if="showSub==i" src="@/assets/exam/zhedie.png" />
								<img v-else src="@/assets/exam/open.png" />
								<span>{{item.name}}</span>	
							</div>
							<div class="practice__right">
								<p v-if="item.do_num==0" class="practice__right-start" @click="openSort(item.sectionid)">开始做题</p>
								<p v-else-if="item.do_num>0&&item.do_num<item.tk_num" @click="openSort(item.sectionid)">继续做题</p>
								<p v-else-if="item.do_num==item.tk_num" class="examAgain" @click="openSort(item.sectionid)">重新做题</p>
								<div class="practice__progress">
									<div class="practice__progress-box">
										<span :style="{width: (item.do_num*100/item.tk_num)+'%'}"></span>
									</div>
									<i>{{item.do_num}}/{{item.tk_num}}</i>
								</div>	
							</div>
						</div>
					
						<div v-if="showSub==i" v-for="(child,n) in item.childs" :key="n">
							<div class="practice__box">
								<div class="practice__left marginLeft32" @click="openSub2(n)">
									<img v-if="showSub2==n" src="@/assets/exam/zhedie.png" />
									<img v-else src="@/assets/exam/open.png" />
									<span>{{child.name}}</span>	
								</div>
								<div class="practice__right">
									<p v-if="child.do_num==0" class="practice__right-start" @click="openSort(child.sectionid)">开始做题</p>
									<p v-else-if="child.do_num>0&&child.do_num<child.tk_num" @click="openSort(child.sectionid)">继续做题</p>
									<p v-else-if="child.do_num==child.tk_num" class="examAgain" @click="openSort(child.sectionid)">重新做题</p>
									<div class="practice__progress">
										<div class="practice__progress-box">
											<span :style="{width: (child.do_num*100/child.tk_num)+'%'}"></span>
										</div>
										<i>{{child.do_num}}/{{child.tk_num}}</i>
									</div>	
								</div>
							</div>
							<div v-if="showSub2==n" class="practice__box" v-for="(subChild,m) in child.childs" :key="m">
								<div class="practice__left marginLeft60">
									<span>{{subChild.name}}</span>	
								</div>
								<div class="practice__right">
									<p v-if="subChild.do_num==0" class="practice__right-start" @click="openSort(subChild.sectionid)">开始做题</p>
									<p v-else-if="subChild.do_num>0&&subChild.do_num<subChild.tk_num" @click="openSort(subChild.sectionid)">继续做题</p>
									<p v-else-if="subChild.do_num==subChild.tk_num" class="examAgain" @click="openSort(subChild.sectionid)">重新做题</p>
									<div class="practice__progress">
										<div class="practice__progress-box">
											<span :style="{width: (subChild.do_num*100/subChild.tk_num)+'%'}"></span>
										</div>
										<i>{{subChild.do_num}}/{{subChild.tk_num}}</i>
									</div>	
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 无数据提示 -->
				<div class="practice-nodata" v-else>
					<no-data  />
				</div>
			</div>
			<div v-else-if="active==1">
				<!-- 无数据提示 -->
				<div class="practice-nodata" v-if="knowledgeNodata">
					<no-data  />
				</div>	
			</div>
		</div>			
		<exam-sort v-if="showSort" @closeSort='closeSort' @openExam="openExam"></exam-sort>	
		<exam-select v-if="onshow" @closemenu="closemenu" @setchange="getPaperSection" />
	</div>
</template>

<script>
	import {GetPaperSection,GetPaperKnowledge} from '@/apis/paper'
	import store from '@/store'
	export default({
		name:"Practice",
		data() {
			return {
				name:null,//
				active:0,//当前样式
				showMenu:false,//显示二级菜单栏
				onshow:false,//显示切换课程页面开关
				url:null,//跳转链接
				showSub:null,//显示二级分类
				showSub2:null,//显示三级分类
				allData:[],//全部数据列表
				childsclass:null,//二级菜单分类列表
				showSort:false,//考试顺序开关
				sectionId:null,//章节id
				knowledge:null,//知识点开关
				chaper:null,//章节开关
				schoolid:store.state.schoolid,//学校机构id
				knowledgeNodata:true,//知识点无内容提示
				chaperNodata:false,//章节无内容提示
			}
		},
		methods: {
			nav(i){
				this.active = i
			},
			/*
			* 章节、知识点开关
			* */
			toggle(chaper,knowledge){
				this.chaper = chaper
				this.knowledge = knowledge
				
			},
			openExamAll(isrand){//前往全部试卷进行考试
				this.$store.created((userid,apptoken,schoolid)=>{
					location.href = `${this.url}#/Exercise?type=1&categoryid=${this.$route.query.categoryid}&schoolid=${schoolid}&isrand=${isrand}`
				})
			},
			openExam(isrand){//前往试卷进行考试
				this.$store.created((userid,apptoken,schoolid)=>{
					location.href = `${this.url}#/Exercise?type=4&categoryid=${this.$route.query.categoryid}&schoolid=${schoolid}&isrand=${isrand}&sectionid=${this.sectionId}`
				})
			},
			openSort(id){//显示选择考试顺序
				this.sectionId = id	
				this.showSort = true
			},
			closeSort(){//关闭选择考试顺序
				this.showSort = false
			},
			openSub(i){//打开二级试卷
				if(this.showSub==i){
					this.showSub = null
				}else{
					this.showSub = i
				}	
			},
			openSub2(n){//打开三级试卷
				if(this.showSub2==n){
					this.showSub2 = null
				}else{
					this.showSub2 = n
				}	
			},
			change(){//切换课程重新请求更新数据
				this.getPaperSection()
				this.getPaperKnowledge()
			},
			showmenu(){//显示切换考试菜单
				this.onshow = true
			},
			closemenu(){this.onshow = false},//关闭切换考试菜单
			getPaperSection(){//请求章节数据
				this.onshow = false
				if(localStorage.childsclass){
					this.childsclass = JSON.parse(localStorage.childsclass)
				}else{
					this.childsclass = null
				}
				GetPaperSection({
					categoryid:this.$route.query.categoryid,
				}).then(res=>{
					if(res.result==true){
						this.allData = res.data
						this.url = res.get_viewurl
					}else{
						this.allData = null	
					}	
				})
			},
			getPaperKnowledge(){
				this.onshow = false
				if(localStorage.childsclass){
					this.childsclass = JSON.parse(localStorage.childsclass)
				}else{
					this.childsclass = null
				}
				GetPaperKnowledge({
					categoryid:this.$route.query.categoryid,
				}).then(res=>{
					console.log(res)
					// if(res.result==true){
					// 	this.allData = res.data
					// 	this.url = res.get_viewurl
					// }else{
					// 	this.allData = null	
					// }	
				})
			}
			
		},
		
		activated(){
			document.title='练习中心'
			this.getPaperSection()
			this.getPaperKnowledge()
		}
	})
</script>

<style scoped>
	.disabled{
		background-color: #f5f7fa !important;
		color: #c0c4cc !important;
		border: 1px solid #e4e7ed !important;
		cursor: not-allowed !important;
	}
	.examAgain{
		color: #333 !important;
		border: 1px solid #ebebeb !important;
	}
	.practice{
		width: 100%;
		position: relative;
		height: 155px;
	}
	.practice-position{
		position: absolute;
		top: 59px;
		width: 100%;
	}
	.practice-item{
		width: 100%;
		height: 400px;
		border: solid 1px #ebebeb;
		background: #fff;
		margin-top: 20px;
		position: relative;
	}
	.practice-box1{
		width: 188px;
		height: 100px;
		border-radius: 6px;
		border: solid 1px #ccc;
		color:#333;
		font-size: 16px;
		text-align: center;
		position: absolute;
		top:150px;
		left: 296px;
		cursor: pointer;
	}
	.practice-box1:hover{
		border: solid 1px #e5412c;
		color: #e5412c;
	}
	.practice-box1:hover .practice-box1__img{
		background: url(../../assets/exam/me_test_btn_order_h.png) no-repeat center;
	}
	.practice-box1__img {
		width: 40px;
		height: 40px;
		background: url(../../assets/exam/me_test_btn_order_n.png) no-repeat center;
		margin-top: 20px;
		position: absolute;
		left: 50%;
		margin-left: -20px;
	}
	.practice-box1 p{
		margin-top: 68px;
	}
	.practice-box2{
		width: 188px;
		height: 100px;
		border-radius: 6px;
		border: solid 1px #ccc;
		color:#333;
		font-size: 16px;
		text-align: center;
		position: absolute;
		top:150px;
		right: 296px;
	}
	.practice-box2:hover{
		border: solid 1px #e5412c;
		color: #e5412c;
	}
	.practice-box2:hover .practice-box2__img{
		background: url(../../assets/exam/me_test_btn_random_h.png) no-repeat center;
	}
	.practice-box2__img{
		width: 40px;
		height: 40px;
		background: url(../../assets/exam/me_test_btn_random_n.png) no-repeat center;
		margin-top: 20px;
		position: absolute;
		left: 50%;
		margin-left: -20px;
	}
	.practice-box2 p{
		margin-top: 68px;
	}
	/* 标题 */
	.practice__bank{
		width: 100%;
		background: #fff;
		min-height: 655px;
		margin-top: 20px;
		border: solid 1px #ebebeb;
	}
	.practice__bank-title{
		width: calc(100% - 40px);
		height: 40px;
		margin: 0 auto;
		background-color: #f5f6fc;
		margin-top: 20px;
		font-size: 16px;
		color: #999;
		line-height: 40px;
	}
	.practice__bank-title p{
		width: 400px;
		text-align: center;
		float: left;
	}
	.practice__bank-title span{
		display: inline-block;
		width: 300px;
		float: right;
	}
	
	/* 导航栏 */
	.practice__nav{
		padding-left: 40px;
		height: 56px;
		border-bottom: 1px solid #ebebeb;
		font-size: 16px;
		color: #333;
		line-height: 56px;
		
	}
	.practice__nav span{
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
	.practice__box{
		width: calc(100% - 40px);
		height: 60px;
		margin: 0 auto;
		border-bottom: 1px solid #ebebeb;
	}
	.practice__box:hover{
		background: #fff8f7;
	}
	.practice__left{
		float: left;
	}
	.practice__left span{
		color: #333;
		font-size: 16px;
		float: left;
		line-height: 60px;
	}
	.practice__left img{
		width: 22px;
		height: 22px;
		border-radius: 4px;
		float: left;
		margin: 18px 10px 0 2px;
	}
	.practice__title{
		font-size: 14px;
		color: #333;
		margin: 17px 0 0 25px;
	}

	.practice__right{
		width: 320px;
		float: right;
		margin: 12px 0 0 0;
		padding-right: 3px;
	}
	
	.practice__right p{
		width: 100px;
		height: 34px;
		border-radius: 18px;
		border: solid 1px #e5412c;
		font-size: 14px;
		color: #e5412c;
		text-align: center;
		line-height: 34px;
		float: right;
		cursor: pointer;
	}
	.practice__right-start{
		background: #e5412c !important;
		color: #fff !important;
	}
	.practice__progress{
		float: left;
		line-height: 40px;
	}
	.practice__progress i{
		font-size: 12px;
		color: #7f7f7f;
		float: left;
		font-style: normal;
		margin-left: 5px;
	}
	.practice__progress-box{
		width: 100px;
		height: 6px;
		background-color: #f7f7f7;
		border-radius: 3px;
		margin: 18px 0 0 0;
		float: left;
		position: relative;
	}
	.practice__progress-box span{
		display: inline-block;
		background: #e5412c;
		height: 6px;
		border-radius: 3px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.marginLeft32{
		margin-left: 32px;
	}
	.marginLeft60{
		margin-left: 60px;
	}
	.practice-nodata{
		width: 100%;
		background: #fff;
		height: 450px;
		padding-top: 100px;
		background: #fff;
	}
</style>
