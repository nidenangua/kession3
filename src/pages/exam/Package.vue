<template>
	<div>
		<popup-package v-if="showPopup" :data-list='detailData' :type="type" @onBuy="onBuy" @closePopup="closePopup" />
		<div class="package">
			<div class="package-title">题库购买</div>
			<div class="package-nav">
				<div class="package-nav__left">
					<p @click="nav(0)" :class="{index:index==0}">我的考试包</p>
					<p @click="nav(1)" :class="{index:index==1}">购买考试包</p>
					<p @click="nav(2)" :class="{index:index==2}">购买明细</p>
				</div>
				<div class="package-nav__right" v-if="index!=1">
					<span @click="subNav(0)" :class="{active:active==0}">所有记录</span>
					<span @click="subNav(1)" :class="{active:active==1}">即将要到期</span>
					<span @click="subNav(2)" :class="{active:active==2}">已过期</span>
				</div>
				
			</div>
			<!-- 我的考试包 -->
			<div class="package-my" v-if="index==0" >
				<div  v-if="myData!=null">
					<div class="package-my__item" >
						<div class="package-my__box" v-for="(my,i) in myData" :key="i">
							<div class="package-image">
								<img :src="my.photourl" />
								<!-- <h1 v-if="my.use_flag==0">{{my.user_title}}</h1>
								<h1 v-else-if="my.use_flag==1">{{my.user_title}}</h1> -->
								<h1 :class="{disabled:my.use_flag==2}">{{my.user_title}}</h1>
							</div>
							<p>{{my.title}}</p>
							<p><i>有效期至：{{my.expiredate}}</i></p>
							<span @click="openPopup(my.id,'my')">查看套餐包</span>
						</div>
					</div>
					<div class="package-page">
						<Pagination :page-count="pageCountMy" @togglePage="myFeeSellList" />
					</div>
				</div>
				<!-- 无数据提示 -->
				<div class="package-noShow" v-else>
					<no-data />
				</div>
			</div>
			<!-- 购买考试包 -->
			<div class="package-buy" v-if="index==1" >
				<div v-if="buyData!=null">
					<div class="package-buy__item"  >
						<div class="package-buy__box" v-for="(buy,n) in buyData" :key="n">
							<div class="package-image">
								<img :src="buy.photourl" />
								<h1 v-if="buy.isuser==1">已拥有</h1>
							</div>
							<p>{{buy.title}}</p>
							<div class="package-buy__day">
								<i>有效期：{{buy.days}}天</i>
								<h1>价格：<span>￥{{buy.price}}</span></h1>
							</div>
							<div class="package-buy__btn">
								<div class="package-buy__buy" v-if="buy.isuser==0" @click="onBuy(buy.price,buy.id)">立即购买</div>
								<div class="package-buy__see" @click="openPopup(buy.id,'buy')">查看套餐包</div>
							</div>
						</div>
					</div>
					<div class="package-page">
						<Pagination :page-count="pageCountBuy" @togglePage="getFeePackagesList" />
					</div>
				</div>
				<!-- 无数据提示 -->
				<div class="package-noShow" v-else>
					<no-data />
				</div>
			</div>
			<!-- 购买明细 -->
			<div class="package-detail" v-if="index==2">
				<div v-if="myData!=null">
					<div class="package-detail__item">
						<div class="package-detail__title">
							<div class="package-detail__title-number">序号</div>
							<div class="package-detail__title-name">考试包名称</div>
							<div class="package-detail__title-price">价格</div>
							<div class="package-detail__title-time">购买时间</div>
							<div class="package-detail__title-term">有效期</div>
							<div class="package-detail__title-state">状态</div>
						</div>
						<div class="package-detail__main" v-for="(my,m) in myData" :key="m">
							<div class="package-detail__title-number">{{m}}</div>
							<div class="package-detail__title-name">{{my.title}}</div>
							<div class="package-detail__title-price">￥{{my.price}}</div>
							<div class="package-detail__title-time">{{my.adddate}}</div>
							<div class="package-detail__title-term">{{my.expiredate}}</div>
							<!-- <div class="package-detail__title-state" v-if="my.use_flag==0">未使用</div>
							<div class="package-detail__title-state" v-else-if="my.use_flag==1">已使用</div> -->
							<div class="package-detail__title-state " :class="{disabled2:my.use_flag==2}" >{{my.user_title}}</div>
						</div>
					</div>
					<div class="package-page">
						<Pagination :page-count="pageCountDetail" @togglePage="myFeeSellList" />
					</div>
				</div>
				<!-- 无数据提示 -->
				<div class="package-noShow" v-else>
					<no-data />
				</div>
			</div>
		</div>
		<!-- 购买套餐包 -->
		<buy :price="price" :id="id" @close="closeBuy" @buy="buyPackage" v-if="showBuy" />
	</div>
</template>

<script>
	import {MyFeeSellList,GetFeePackagesList,GetFeePackagesDetail,BuyFeePackages,MyFeeSellDetail} from '@/apis/user'
	export default({
		name:"Package",
		data() {
			return {
				showPopup:false,//显示弹出层开关
				index:0,//导航显示
				active:0,//右侧分类当前样式
				pageCountMy:0,//我的套餐包总页面数
				pageCountBuy:0,//购买套餐包总页面数
				pageCountDetail:0,//购买明细总页面数
				detailData:null,//套餐包详情数据
				buyData:null,//数据	
				myData: null,//数据
				type:null,//数据
				price:0,//价格
				showBuy:false,//显示购买提示
				id:null,//套餐包id
			}
		},
		methods:{
			closeBuy(){//取消购买套餐包
				this.showBuy = false
			},
			onBuy(price,id){//显示购买套餐包
				this.showBuy = true
				this.price = price
				this.id = id
			},
			buyPackage(id){//购买套餐包
				this.showBuy = false
				BuyFeePackages({
					packageid:id
				}).then(res=>{
					if(res.result==true){
						this.$toast('购买成功')
					}else if(res.result==false){
						this.$toast(res.msg)
					}
				})
				this.myFeeSellList()
				this.getFeePackagesList()
			},
			openPopup(id,type){//打开套餐包详情页开关并请求数据
				if(type=='buy'){
					this.getFeePackagesDetail(id)
				}else if(type=='my'){
					this.myFeeSellDetail(id)
				}
				
				this.type = type
				this.showPopup = true
			},
			closePopup(){//关闭详情页
				this.showPopup = false
			},
			nav(i){//导航切换
				this.index = i
			},
			subNav(i){//右侧导航切换
				this.active = i
				this.myFeeSellList(1,i)
				this.getFeePackagesList(1,i)
			},
			getData(index){
				if(index==0){
					this.myFeeSellList()
				}else if(index==1){
					this.getFeePackagesList()
				}
			},
			/**
			 * 获取我的套餐包数据
			 * @param {type}  
			 */
			myFeeSellList(p=1,showtype){
				MyFeeSellList({
					page:p,
					pagesize:5,
					showtype: showtype||0,
				}).then(res=>{
					if(res.result==true){
						this.myData = res.data
						this.pageCountMy = res.pagecount
						this.pageCountDetail = res.pagecount
					}else{
						this.myData = null	
					}	
				})
			},
			getFeePackagesList(p=1,showtype){
				GetFeePackagesList({
					page:p,
					pagesize:5,
					showtype: showtype||0,
				}).then(res=>{
					if(res.result==true){
						this.buyData = res.data
						this.pageCountBuy = res.pagecount
					}else{
						this.buyData = null
					}	
				})
			},
			getFeePackagesDetail(id){
				GetFeePackagesDetail({
					id:id
				}).then(res=>{
					if(res.result==true){
						this.detailData = res.data
						
					}else{
						this.detailData = null
					}
				})
			},
			myFeeSellDetail(id){
				MyFeeSellDetail({
					id:id
				}).then(res=>{
					if(res.result==true){
						this.detailData = res.data
						
					}else{
						this.detailData = null
					}
				})
			}
		},
		activated(){
			this.myFeeSellList()
			this.getFeePackagesList()
		}
	})
</script>

<style scoped>
	.disabled{
		background: #eee !important;
		color: #999 !important;
	}
	.disabled2{
		color: #999 !important;
	}
	.index{
		background: #f4f4f4;
	}
	.active{
		color: #E64A3B !important;
	}
	.package{
		width: 100%;
		border: 1px solid #EBEBEB;
	}
	.package-title{
		height: 55px;
		background: #fff;
		color: #333;
		font-size: 16px;
		line-height: 55px;
		padding: 0 20px;
		border-bottom: 1px solid #EBEBEB;
	}
	.package-nav{
		height: 70px;
		border-bottom: 1px solid #EBEBEB;
		padding: 0 20px;
		background: #fff;
	}
	.package-nav__left{
		border-left: 1px solid #EBEBEB;
		height: 30px;
		margin-top: 19px;
		float: left;
	}
	.package-nav__left p{
		padding: 5px 15px;
		font-size: 14px;
		color: #888888;
		border: 1px solid #EBEBEB;
		border-left: none;
		float: left;
		cursor: pointer;
	}
	.package-nav__right{
		height: 30px;
		margin-top: 19px;
		float: right;
		line-height: 30px;
	}
	.package-nav__right span{
		font-size: 14px;
		color: #333;
		margin-left: 28px;
		cursor: pointer;
	}
	.package-nav__right span i{
		font-style: normal;
		color: #E64A3B;
	}
	/* 我的考试包 */
	.package-my{
		
	}
	.package-my__item{
		background: #fff;
		height: 640px;
		padding: 20px 20px 0 20px;
	}
	.package-my__box{
		width: 299px;
		height: 305px;
		margin: 0 30px 0 30px;
		float: left;
		font-size: 14px;
		text-align: center;
		color: #666;
		cursor: pointer;
		line-height: 1;
	}
	.package-image{
		width: 100%;
		height: 185px;
		position: relative;
	}
	.package-image h1{
		width:66px;
		height:30px;
		background:rgba(242,133,80,1);
		border-radius:0px 15px 15px 0px;
		font-size:14px;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:#fff;
		line-height: 30px;
		text-align: center;
		position: absolute;
		left: 0;
		top: 19px;
		z-index: 10;
	}
	.package-image img{
		width: 100%;
		height: 100%;
		border-radius: 5px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.package-my__box img{
		width: 100%;
		height: 185px;
		border-radius: 6px;
	}
	.package-my__box p{
		width: 100%;
		margin-top: 5px;
		line-height: 1.5;
	}
	.package-my__box p i{
		font-style: normal;
		color: #888;
		line-height: 1.5;
	}
	.package-my__box span{
		display: inline-block;
		width: 110px;
		height: 36px;
		border-radius: 18px;
		background: #f9f9f9;
		border: 1px solid #eee;
		line-height: 36px;
		margin-top: 10px;
	}
	/* 购买考试包 */
	.package-buy{
		
	}
	.package-buy__item{
		background: #fff;
		height: 640px;
		padding: 20px 20px 0 20px;
	}
	.package-buy__box{
		width: 299px;
		height: 305px;
		margin: 0 30px 0 30px;
		float: left;
		font-size: 14px;
		text-align: center;
		color: #666;
		line-height: 1;
	}
	.package-buy__box img{
		width: 100%;
		height: 185px;
		border-radius: 6px;
	}
	.package-buy__box p{
		width: 100%;
		margin-top: 5px;
		text-align: left;
		line-height: 1.5;
	}
	.package-buy__day{
		width: 100%;
		margin-top: 5px;
		height: 20px;
		line-height: 1.5;
	}
	.package-buy__day i{
		display: inline-block;
		font-style: normal;
		color: #888;
		float: left;
	}
	.package-buy__day h1{
		font-size: 14px;
		font-weight: normal;
		float: right;
		color: #888;
	}
	.package-buy__day h1 span{
		color: #EC4A46;
	}
	.package-buy__btn{
		
	}
	.package-buy__see{
		display: inline-block;
		width: 110px;
		height: 36px;
		border-radius: 18px;
		background: #f9f9f9;
		border: 1px solid #eee;
		line-height: 36px;
		margin: 10px 4px 0 4px;	
		cursor: pointer;
	}
	.package-buy__buy{
		display: inline-block;
		width: 110px;
		height: 36px;
		border-radius: 18px;
		background: #E5412C;
		border: 1px solid #E5412C;
		line-height: 36px;
		margin: 10px 4px 0 4px;	
		color: #fff;
	}
	/* 购买记录 */
	.package-detail{
		background: #fff;
		padding-top: 20px;	
	}
	.package-detail__item{
		height: 640px;
	}
	.package-detail__title{
		height: 40px;
		background: #f5f5f5;
		margin: 0 20px 0 20px;
		font-size: 14px;
		color: #999;
		line-height: 40px;
	}
	.package-detail__title-number{
		width: 90px;
		float: left;
		text-align: center;
	}
	.package-detail__title-name{
		width: 370px;
		float: left;
	}
	.package-detail__title-price{
		width: 40px;
		float: left;
		text-align: center;
		margin-right: 58px;
	}	
	.package-detail__title-time{
		width: 155px;
		float: left;
		text-align: center;
		margin-right: 57px;
	}
	.package-detail__title-term{
		width: 155px;
		float: left;
		margin-right: 77px;
		text-align: center;
	}
	.package-detail__title-state{
		width: 50px;
		float: left;
		text-align: center;
	}
	.package-detail__main{
		height: 50px;
		background: #fff;
		margin: 0 20px 0 20px;
		font-size: 14px;
		color: #666;
		line-height: 50px;
		border-bottom: 1px solid #ebebeb;
	}
	/* 分页 */
	.package-page{
		height: 60px;
		background: #fff;
		padding-right: 20px;
	}
	/* 无内容提示 */
	.package-noShow{
		width: 100%;
		height: 450px;
		padding-top: 100px;
		background: #fff;
	}
</style>
