<template>
	<div class="exam-sort">
		<div class="exam-sort__box">
			<div class="exam-sort__title">
				<p>选择做题模式</p>
				<img src="@/assets/exam/close.png" @click="close" />
			</div>
			<div class="exam-sort__box1" @click="getExam(0)">
				<div class="exam-sort__box1-img"></div>
				<p>顺序练习</p>
			</div>
			<div class="exam-sort__box2" @click="getExam(1)">
				<div class="exam-sort__box2-img"></div>
				<p>随机练习</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default({
		name:"ExamSort",
		props:['paperId'],
		data() {
			return {
				
			}
		},
		methods: {
			close() {
				this.$emit('closeSort')
			},
			getExam(isrand){
				this.$emit('openExam',isrand)
			}
		}
	})
</script>

<style scoped>
	.exam-sort{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.exam-sort__box{
		width: 600px;
		height: 300px;
		border-radius: 10px;
		background: #fff;
		position: absolute;
		top: 50%;
		margin-top: -150px;
		left: 50%;
		margin-left: -300px;
	}
	.exam-sort__title{
		margin-top: 20px;
	}
	.exam-sort__title p{
		font-size: 16px;
		color: #333;
		margin-left: 20px;
		float: left;
	}
	.exam-sort__title img{
		width: 16px;
		height: 16px;
		margin-right: 20px;
		float: right;
	}
	.exam-sort__box1{
		width: 188px;
		height: 100px;
		border-radius: 6px;
		border: solid 1px #ccc;
		color:#333;
		font-size: 16px;
		text-align: center;
		position: absolute;
		top:110px;
		left: 67px;
	}
	.exam-sort__box1:hover{
		border: solid 1px #e5412c;
		color: #e5412c;
	}
	.exam-sort__box1:hover .exam-sort__box1-img{
		background: url(../../../assets/exam/me_test_btn_order_h.png) no-repeat center;
	}
	.exam-sort__box1-img {
		width: 40px;
		height: 40px;
		background: url(../../../assets/exam/me_test_btn_order_n.png) no-repeat center;
		margin-top: 20px;
		position: absolute;
		left: 50%;
		margin-left: -20px;
	}
	.exam-sort__box1 p{
		margin-top: 68px;
	}
	.exam-sort__box2{
		width: 188px;
		height: 100px;
		border-radius: 6px;
		border: solid 1px #ccc;
		color:#333;
		font-size: 16px;
		text-align: center;
		position: absolute;
		top:110px;
		right: 67px;
	}
	.exam-sort__box2:hover{
		border: solid 1px #e5412c;
		color: #e5412c;
	}
	.exam-sort__box2:hover .exam-sort__box2-img{
		background: url(../../../assets/exam/me_test_btn_random_h.png) no-repeat center;
	}
	.exam-sort__box2-img{
		width: 40px;
		height: 40px;
		background: url(../../../assets/exam/me_test_btn_random_n.png) no-repeat center;
		margin-top: 20px;
		position: absolute;
		left: 50%;
		margin-left: -20px;
	}
	.exam-sort__box2 p{
		margin-top: 68px;
	}
</style>
