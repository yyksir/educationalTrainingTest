<template>
	<Row>
		<i-col span="6">
			<div style="width:100%;height:300px;line-height: 300px;text-align: center;font-size: 20px;">12</div>
		</i-col>
		<i-col span="6">
			<div style="width:100%;height:300px;" id="data_source_con"></div>
		</i-col>
		<i-col span="6">
			<div style="width:100%;height:300px;line-height: 300px;text-align: center;font-size: 20px;">12</div>
		</i-col>
		<i-col span="6">
			<div style="width:100%;height:300px" id="data_source_con1"></div>
		</i-col>
	</Row>

</template>

<script>
	import echarts from 'echarts';

	export default {
		name: 'dataSourcePie',
		data() {
			return {
				//
			};
		},
		mounted() {
			this.$nextTick(() => {
				var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
				var option = {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '15',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: 35,
								name: '访问人数'
							},
							{
								value: 5,
								name: '未访问人数'
							},
						]
					}]
				};
				dataSourcePie.setOption(option);
				window.addEventListener('resize', function() {
					dataSourcePie.resize();
				});
				var dataSourcePie1 = echarts.init(document.getElementById('data_source_con1'));
				var option2 = {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					series: [{
						name: '播放来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '15',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: 35,
								name: '播放次数'
							},
							{
								value: 5,
								name: '未播放次数'
							},
						]
					}]
				};
				dataSourcePie1.setOption(option2);
				window.addEventListener('resize', function() {
					dataSourcePie1.resize();
				});
			});
		}
	};
</script>