<style lang="less">
	@import '../../../styles/common.less';
	@import './article-publish.less';
</style>

<template>
	<div style="background-color: #FFFFFF;">
		<Row>
			<Col span="20">
			<p class="p">
				<Icon type="paper-airplane"></Icon>
				培训活动
			</p>
			</Col>
			<Col span="4" class="col-4">
			<Button type="success" @click="handleEditOpenness">添加培训活动</Button>
			</Col>
		</Row>
		<Table border :columns="columns1" :data="data1"></Table>
		<!--<video width="800" height="500" autoplay="autoplay" controls="controls">
			<source src="http://192.168.100.222:9910/api/upload/fms/15665498368086302510452.mp4" type="video/mp4"></source>
		</video>-->
		<div class="pages">
			<Page @on-page-size-change="changes" @on-change="change" :page-size="mypage.pageSN" :current="mypage.pageCurrent" :total="mypage.total_row_number" :page-size-opts="mypage.pagesize" placement="top" show-elevator show-sizer></Page>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				columns1: [{
						title: 'id',
						key: 'c_id'
					},
					{
						title: '图片',
						key: 'options',
						align: 'center',
						width: 110,
						render: (h) => {
							return h('img', {　　　　　　　　
								attrs: {　　　　　　　　　　
									src: '/dist/a18a9373bdf6e4f027bfe33a448ea98c.jpg',
								},
								style: {　　　　　　　　　　
									marginRight: '5px'　　　　　　　　
								},
								on: {　　　　　　　　　　
									click: () => {　　　　　　　　　　　　
										this.menu2('/');　　　　　　　　　　
									}　　　　　　　　
								}　　　　　　
							});
						}　　　　
					},
					{
						title: '名称',
						key: 'c_title'
					},
					{
						title: '讲师',
						key: 'c_lecturer'
					},
					{
						title: '开始时间',
						key: 'c_start_time'
					},
					{
						title: '结束时间',
						key: 'c_end_time'
					},
					{
						title: '状态',
						key: 'c_status'
					},
					{
						title: '分配',
						key: 'c_person_no'
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.golearn(params.row)
										}
									}
								}, '进入培训'),
							]);
						}
					}
				],
				data1: [],
				mypage: {
					row_start_number: 0,
					row_count: 3,
					total_row_number: 0,
					pagesize: [
						3, 6, 9, 12
					],
					pageSN: 3,
					pageCurrent: 1
				},
			};
		},
		methods: {
			menu2() {},
			change: function(v) {
				this.mypage.pageCurrent = v;
				this.mypage.row_start_number = (v - 1) * this.mypage.pageSN;
				this.getlist();
			},
			changes: function(v) {
				this.mypage.row_start_number = 0;
				this.mypage.pageSN = v;
				this.getlist();
			},
			handleEditOpenness() {
				this.$router.push({
					name: 'addlearn',
				});
			},
			//开始培训事件
			golearn(val) {
				this.$router.push({
					name: 'startlearn',
					query: {
						id: val.c_id,
						url: val.source_file,
						time: val.c_person_no,
						c_title: val.c_title
					}
				});
			},
			//获取列表接口
			getlist() {
				this.$axios({
					url: '/api/train/list',
					method: 'post',
					data: {
						"person_id": "1", // 培训人员id
						"pageno": 1,
						"pagesize": 5,
						"pageno": this.mypage.row_start_number,
						"pagesize": this.mypage.pageSN
					}
				}).then((res) => {
					this.data1 = res.data.Content
				}).catch(function(err) {
					console.log(err);
				})
			}
		},
		computed: {},
		mounted() {
			this.getlist()
		},
	};
</script>