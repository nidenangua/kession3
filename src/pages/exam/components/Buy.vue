<template>
	<div class="buy">
		<div class="buy-box">
			<h1>确认购买该考试套餐包吗？从当前余额中扣除{{price}}元</h1>
			<div class="buy-box__btn">
				<span @click="close">取消</span>
				<span class="active" @click="buy">确定</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default({
		name:"Buy",
		props:['price','id'],
		data() {
			return {
				
			}
		},
		methods:{
			close(){
				this.$emit('close')
			},
			buy(){
				this.$emit('buy',this.id)
			}
		}
	})
</script>

<style scoped>
	.buy{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.buy-box{
		width: 500px;
		height: 150px;
		border-radius: 5px;
		background: #fff;
		position: absolute;
		top: 50%;
		margin-top: -100px;
		left: 50%;
		margin-left: -250px;
	}
	.buy-box h1{
		font-size: 18px;
		color: #999;
		font-weight: normal;
		margin:30px 0 0 20px;
	}
	.buy-box__btn{
		margin-top: 40px;
		margin-right: 30px;
	}
	.buy-box__btn span{
		display: inline-block;
		padding: 5px 20px;
		border: 1px solid #999;
		border-radius: 3px;
		font-size: 14px;
		color: #999;
		float: right;
		margin-left: 10px;
		cursor: pointer;
	}
	.active{
		color: #fff !important;
		border: 1px solid #e5412c !important;
		background: #e5412c;
	}
</style>
