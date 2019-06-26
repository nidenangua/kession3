<template>
	<div class="noData">
		<p>暂时没有内容哦</p>
	</div>
</template>

<script>
</script>

<style scoped>
	.noData{
		width: 60%;
		height: 300px;
		background: url(image/nodata_pc.png) no-repeat center center;
		background-size: contain;
		margin-left: 20%;
		position: relative;
	}
	.noData p{
		width: 100%;
		position: absolute;
		bottom: -10px;
		font-size:14px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color: #888;
		text-align: center;
	}
</style>
