<template>
  <div>
    <div :style="'width:'+width+';top:'+top+';margin-left:-'+marginLeft+'px'" class="dialog-wrapper" v-show="myVisible" id="dialog">
      <div :class="align ? 'dialog-header align-' + align : 'dialog-header'">
        <span class="f18">{{title}}</span>
		<div class="click_close" @click="$emit('update:visible',false)">
		    <img src="./images/close.png">
		</div>
        <!-- <i class="iconfont icon-guanbi" @click="myVisible=false" aria-hidden="true"></i> -->
      </div>
      <div class="dialog-container" :class="align ? 'align-' + align : ''">
          <slot></slot>
      </div>
    </div>
    <div class="dialog-bg" v-show="myVisible"></div>
  </div>
</template>
<script>
    export default {
        props: {
            visible: Boolean,
            title:String,
            width:String,
            top:String,
            align:String
        },
        data() {
            return {
                myVisible: this.visible,
                marginLeft:null
            }
        },
        watch: {
            myVisible: function (val) {
                this.$emit('update:visible', val)
                var o = document.getElementById("div1");
                
                if(this.visible==true){
                    this.$nextTick(()=>{
                        this.marginLeft = (document.getElementById('dialog').offsetWidth||document.getElementById('dialog').clientWidth)/2
                    })
                }
            },
            visible: function (val) {
                this.myVisible = val
            }
        },
        mounted(){
            if(this.visible==true){
                this.$nextTick(()=>{
                    this.marginLeft = (document.getElementById('dialog').offsetWidth||document.getElementById('dialog').clientWidth)/2
                })
            }
        }
    }
</script>
<style scoped>
	
    .dialog-bg{
        position: fixed;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        z-index: 10;
    }
    .dialog-wrapper{
        position: fixed;
        left: 50%;
        width: 1000px;
        margin-left: -400px;
        top: 100px;
        z-index: 100;
        background: #fff;
        border-radius: 5px;
        padding:0 15px;
        box-sizing: border-box;
    }
    .dialog-container{
        padding: 20px;
    }
    .dialog-header{
        line-height: 55px;    
        border-bottom: 1px solid #eee;
		text-align: center;
    }
    .dialog-header i{
        position: absolute;
        right: -60px;
        top: -40px;
        font-size: 40px;
        color: #fff;
        cursor: pointer;
    }
	.click_close{
		width: 48px;
	    height: 48px;
	    position: absolute;
	    right: -45px;
	    top: -50px;
	    z-index: 20;
	}
</style>
