<template>
    <transition name="fade">
        <div class="ktj-masked" v-show="visible" @click="click">
			<img src="@/assets/exam/loading.gif" />
		</div>
    </transition>
</template>
<script>
export default {
    name:'Masked',
    data(){
        return{
            visible:false,
            params:{

            }
        }
    },
    methods:{
        click(){
            if(typeof this.params.click === 'function'){
                this.params.click()
            }
        }
    }
}
</script>
<style scoped>
.ktj-masked{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.5);
    top: 0;
    left: 0;
    z-index: 99;
}
.ktj-masked img{
	position: absolute;
	top: 50%;
	left:50%;
	margin-left:-20px;
	height: 40px;
	width:40px;
	line-height: 30px;
	margin-top: -20px;
	
}
</style>
