<template>
	<div class="popupPackage">
		<div class="popupPackage-box" v-if="dataList!=null">
			<div class="popupPackage-box__title">
				<p>查看套餐包</p>
				<img src="@/assets/exam/close.png" @click="close" />
			</div>
			<div class="popupPackage-box__item">
				<div class="popupPackage-box__image">
					<img :src="dataList.photourl" />
					<h2 :class="{disabled:dataList.user_status==2}" v-if="type=='my'">{{dataList.user_title}}</h2>
				</div>
				<h1>{{dataList.title}}</h1>
				<p v-if="dataList.user_status==1">(使用中 有效期至{{dataList.expiredate}})</p>
				<p v-else-if="dataList.user_status==2" style="color: #999;">(已过期 有效期至{{dataList.expiredate}})</p>
				<div class="popupPackage-box__item-price">价格：<i>￥{{dataList.price}}</i></div>
				<span>套餐包有效天数：{{dataList.days}}天</span>
			</div>
			<div class="popupPackage-box__text">
				<div class="popupPackage-box__text-box">
						<div class="popupPackage-box__class">考试权限：</div>
						<div class="popupPackage-box__left">{{dataList.examtf_name}}</div>
						<div class="popupPackage-box__right" v-if="dataList.examtf>0">
							<a v-for="(item,i) in dataList.examtf_list" :key="i" >{{item.title}}</a>	
						</div>
				</div>
				<div class="popupPackage-box__text-box">
						<div class="popupPackage-box__class">练习权限：</div>
						<div class="popupPackage-box__left">{{dataList.examtf_name}}</div>
						<div class="popupPackage-box__right" v-if="dataList.examtf>0">
							<a v-for="(item,i) in dataList.examtf_list" :key="i" >{{item.title}}</a>	
						</div>
				</div>
				<div class="popupPackage-box__text-box">
						<div class="popupPackage-box__class">查看解析权限：</div>
						<div class="popupPackage-box__left">{{dataList.examtf_name}}</div>
						<div class="popupPackage-box__right" v-if="dataList.examtf>0">
							<a v-for="(item,i) in dataList.examtf_list" :key="i" >{{item.title}}</a>	
						</div>
				</div>
			
				<p>套餐包介绍：{{dataList.descript}}</p>
			</div>
			<div class="popupPackage-box__btn" v-if="type=='my'">
				<div class="popupPackage-box__buy" v-if="dataList.use_flag==2" @click="onBuy(dataList.price,dataList.id)">重新购买</div>
				<div class="popupPackage-box__retrun" @click="close">返回</div>
			</div>
			<div class="popupPackage-box__btn" v-else-if="type=='buy'">
				<div class="popupPackage-box__buy" v-if="dataList.isuser==0" @click="onBuy(dataList.price,dataList.id)">立即购买</div>
				<div class="popupPackage-box__retrun" @click="close">返回</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default({
		name:"PopupPackage",
		props:['dataList','type'],
		data() {
			return {
				
			}
		},
		methods: {
			close(){
				this.$emit('closePopup')
			},
			onBuy(price,id){
				this.$emit('onBuy',price,id)
			}
		},
		created(){
		
		}
	})
</script>

<style scoped>
	.disabled{
		background: #eee !important;
		color: #999 !important;
	}
	.popupPackage{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 888;
	}
	.popupPackage-box{
		width: 800px;
		height: 682px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -341px;
		margin-left: -400px;
		background: #fff;
		border-radius: 10px;
	}
	.popupPackage-box__title{
		margin-top: 20px;
		height: 40px;
		width: 100%;
	}
	.popupPackage-box__title p{
		font-size: 16px;
		color: #333;
		margin-left: 20px;
		float: left;
		font-weight: 400;
	}
	.popupPackage-box__title img{
		width: 16px;
		height: 16px;
		margin-right: 20px;
		float: right;
		
	}
	/* 文字 */
	.popupPackage-box__item{
		width: 360px;
		margin: 0 auto;
		text-align: center;
	}
	.popupPackage-box__image{
		width: 100%;
		height: 222px;
		position: relative;
	}
	.popupPackage-box__image h2{
		width:66px;
		height:30px;
		background:#F28550;
		border-radius:0px 15px 15px 0px;
		font-size:14px;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:#fff;
		line-height: 30px;
		text-align: center;
		position: absolute;
		left: 0;
		top: 14px;
		z-index: 10;
	}
	.popupPackage-box__image img{
		width: 100%;
		height: 100%;
		border-radius: 10px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.popupPackage-box__item-price{
		font-size: 14px;
		color: #666;
		margin-top: 18px;
	}
	.popupPackage-box__item-price i{
		color: #E64A3B;
		font-style: normal;
	}
	.popupPackage-box__item h1{
		font-size: 16px;
		color: #666;
		margin-top: 18px;
	}
	.popupPackage-box__item p{
		font-size: 12px;
		color: #E64A3B;
		margin-top: 10px;
	}
	.popupPackage-box__item span{
		display: inline-block;
		font-size: 14px;
		color: #666;
		margin-top: 18px;
	}
	/* 底部 */
	.popupPackage-box__text{
		width: 620px;
		margin: 0 auto;	
	}
	.popupPackage-box__text p{
		width: 100%;
		float: left;
		margin-top: 16px;
		font-size: 14px;
		color: #666;
	}
	.popupPackage-box__text-box{
		width: 100%;
		font-size: 14px;
		color: #666;
		margin-top: 10px;
		float: left;
	}
	.popupPackage-box__class{
		float: left;
	}
	.popupPackage-box__left{
		float: left;
	}
	.popupPackage-box__right{
		width: 430px;
		float: left;
		line-height: 20px;
	}
	.popupPackage-box__right a{
		color: #37A7ED;
		display: inline-block;
		font-size: 12px;
		margin-left: 20px;
		
	}
	/* 按钮 */
	.popupPackage-box__btn{
		width: 100%;
		float: left;
		font-size: 14px;
		margin-top: 10px;
		text-align: center;
	}
	.popupPackage-box__retrun{
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
	.popupPackage-box__buy{
		display: inline-block;
		width: 110px;
		height: 36px;
		border-radius: 18px;
		background: #E5412C;
		border: 1px solid #E5412C;
		line-height: 36px;
		margin: 10px 4px 0 4px;	
		color: #fff;
		cursor: pointer;
	}
</style>
