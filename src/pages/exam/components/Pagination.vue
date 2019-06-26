<template lang="html">
  <div class="pagination">
    <ul>
			<!-- <li  @click="page(1)">首页</li> -->
      <li :class="{disabled: curPage == 1}" @click="prevPage" v-if="pageCount > 1">&lt;<i class="iconfont icon-fenye-shangyiye"></i></li>
      <li :class="{active: curPage == 1}" v-if="pageCount > 0" @click="page(1)">1</li>
      <li class="ellipsis" v-show="curPage > 5 && pageCount > 10">...</li>
      <li :class="{active: curPage == index+offset}" v-for="(item,index) in middlePages" :key="index" @click="page(index+offset)">{{index+offset}}</li>
      <li class="ellipsis" v-show="curPage < bigLimit && pageCount > 10">...</li>
      <li :class="{active: curPage == pageCount}" @click="page(pageCount)" v-if="pageCount > 1">{{pageCount}}</li>
      <li :class="{disabled: curPage == pageCount}" @click="nextPage" v-if="pageCount > 1">&gt;<i class="iconfont icon-fenye-shangyiye1"></i></li>
			<!-- <li  @click="page(pageCount)">尾页</li> -->
			
    </ul>
		<!-- <div class="jumpBox"  @click="page(pageCount)">跳转到<span></span>页</div> -->
		<!-- <div class="jumpBox">
			<span>跳转到</span>
			<input type="number" id="jumpPage" @keyup.enter="pageSkip" class="jumpPage" />
			<span>页</span>
		</div> -->
  </div>
</template>
 <script>
  export default {
    props:['pageCount'],
    data(){
      return {
        curPage: 1,
      };
    },
    computed:{
      middlePages(){
        if(this.pageCount <= 2){
          return 0;
        }else if(this.pageCount> 2 && this.pageCount <= 10){
          return this.pageCount-2;
        }else{
          return this.curPage > 999 ? 5 : 8;
        }
      },
      bigLimit(){
        return this.middlePages > 5 ? this.pageCount-6 : this.pageCount -3;
      },
      offset(){
        if(this.curPage <= 5){
          return 2;
        }else if(this.curPage >= this.bigLimit){
          return this.bigLimit-2;
        }else{
          return this.middlePages > 5 ? this.curPage-3 : this.curPage-2;
        }
      }
    },
    methods:{
      page(indexPage){//点击跳转页码
        this.$emit('togglePage',indexPage);
        this.curPage = indexPage;
      },
      prevPage(){
        if(this.curPage != 1){
          this.page(this.curPage-1);
        }
      },
      nextPage(){
        if(this.curPage != this.pageCount){
          this.page(this.curPage+1);
        }
      },
			pageSkip(){
				var skipPage = document.getElementById("jumpPage").value;
				this.page(skipPage);
			}
    }
  };
</script>
 
<style scoped>
    .pagination{
        float: right;
    }
    .pagination ul li{
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
				background-color: #f4f4f5;
        box-sizing: border-box;
        text-align: center;
        margin: 0 5px;
        color: #606266;
        min-width: 30px;
        border-radius: 2px;
    }
    .pagination ul li i{
        font-size: 12px;
    }
    .pagination ul li.active{
        background: #e64a3b;
        color: #fff;
    }
    .pagination ul li.ellipsis{
        border: none;
    }
    .pagination ul li.disabled{
        color: #dcdcdc;
        cursor:not-allowed
    }
		/* 跳转栏 */
		.jumpBox{
			margin-left: 2.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
		}
		
		.jumpPage{
			width: 55px;
			height: 26px;
			border: 1px solid #999999;
			margin: 0 5px;
			border-radius: 2px;
		}
</style>