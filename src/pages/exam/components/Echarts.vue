<template>
	<!-- 学习图表 -->
	<div class="echarts" id='main'>	
	</div>	
</template>

<script>
	export default({
		name:"Echarts",
		props:['dataList'],
		data() {
			return {
				echarts:{
					title: {text: '考试练习情况'},
				    backgroundColor: '#FFF',
				    grid: {
				        top: '9%',
				        bottom: '19%',
				        left: '6%',
				        right: '4%'
				    },
				    tooltip: {
				        trigger: 'axis',
				        label: {
				            show: true
				        }
				    },
				    xAxis: {
				        boundaryGap: true, //默认，坐标轴留白策略
				        axisLine: {
				            show: false
				        },
				        splitLine: {
				            show: false
				        },
				        axisTick: {
				            show: false,
				            alignWithLabel: true
				        },
				        data: [
				           
				        ]
				    },
				    yAxis: {
				        axisLine: {
				            show: false
				        },
				        splitLine: {
				            show: true,
				            lineStyle: {
				                type: 'dashed',
				                color: 'rgba(229,65,44,0.2)'
				            }
				        },
				        axisTick: {
				            show: false
				        },
				        splitArea: {
				            show: true,
				            areaStyle: {
				                color: 'rgb(255,245,244)'
				            }
				        }
				    },
				    series: {
				        type: 'line',
				        symbol: 'circle',
				        symbolSize: 7,
				        lineStyle: {
				            color: 'rgb(229,65,44)',
				            shadowBlur: 12,
				            shadowColor: 'rgb(229,65,44,0.9)',
				            shadowOffsetX: 1,
				            shadowOffsetY: 1
				        },
				        itemStyle: {
				            color: 'rgb(229,65,44)',
				            borderWidth: 1,
				            borderColor: '#FFF'
				        },
				        label: {
				            show: false,
				            distance: 1,
				            emphasis: {
				                show: true,
				                offset: [25, -2],
				                //borderWidth:1,
				                // borderColor:'rgb(33,148,246)',
				                //formatter:'{bg|{b}\n数据量:{c}}',
				                backgroundColor:'rgb(229,65,44)',
				                color: '#FFF',
				                padding: [8, 20, 8, 6],
				                //width:60,
				                height: 36,
				                formatter: function(params) {
				                    var name = params.name;
				                    var value = params.data;
				                    var str = name + '\n学习时间：' + value + '分钟';
				                    return str;
				                },
				                rich: {
				                    bg: {
				                        backgroundColor: {
				                            image: ''
				                        },
				                        width: 78,
				                        //height:42,
				                        color: '#FFF',
				                        padding: [20, 0, 20, 10]
				                    },
				                    br: {
				                        width: '100%',
				                        height: '100%'
				                    }
				
				                }
				            }
				        },
				        data: [
				            
				        ]
				    }
				},
				
			}
		},
		methods:{
			getChart(){
				// 引入 ECharts 主模块
				var echarts = require('echarts');
				
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('main'));
				// 绘制图表
				myChart.setOption(
				   this.echarts	
				)
			}
		},
		created(){
			let datax = []
			let datay = []
			console.log(this.dataList)
			if(this.dataList!=''){
				for(var i in this.dataList){
					datax.push(this.dataList[i].date)
				}
				for(var n in this.dataList){
					datay.push(this.dataList[n].time)
				}
			
			}else{
				datax.push('您还没有学习记录')
				datay.push(0)
			}
		
			this.echarts.xAxis.data = datax
			this.echarts.series.data = datay

		},
		mounted() {
			this.getChart()
		},
		activated() {
			// this.getChart()
		}
	})
</script>

<style scoped>
	.echarts{
		width: 100%;
		height: 100%;
	}
	
</style>
