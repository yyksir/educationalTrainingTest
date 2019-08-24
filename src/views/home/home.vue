<style lang="less">
	@import "./home.less";
	@import "../../styles/common.less";
</style>
<template>
	<div class="home-main">
		<Row>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
			<infor-card id-name="user_created_count" :end-val="count.createUser" iconType="android-person-add" color="#2d8cf0" intro-text="查看视频人数"></infor-card>
			</Col>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
			<infor-card id-name="visit_count" :end-val="count.visit" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="参与答题人数"></infor-card>
			</Col>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
			<infor-card id-name="collection_count" :end-val="count.collection" iconType="upload" color="#ffd572" intro-text="新增视频文件"></infor-card>
			</Col>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
			<infor-card id-name="transfer_count" :end-val="count.transfer" iconType="shuffle" color="#f25e43" intro-text="昨日访问次数"></infor-card>
			</Col>
		</Row>
		<Row>
			<i-col span="24">
				<Card :padding="0">
					<p slot="title" class="card-title">
						<Icon type="map"></Icon>
						用户行为分析
					</p>
					<Row>
						<i-col span="6">
							<div style="text-align: center;">用户访问数</div>
						</i-col>
						<i-col span="6">
							<div style="text-align: center;">参与率</div>
						</i-col>
						<i-col span="6">
							<div style="text-align: center;">视频播放次数</div>
						</i-col>
						<i-col span="6">
							<div style="text-align: center;">播放率</div>
						</i-col>
					</Row>
					<data-source-pie></data-source-pie>
				</Card>
			</i-col>
		</Row>
		<Row class="margin-top-10">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="ios-shuffle-strong"></Icon>
					用户登陆系统统计
				</p>
				<div class="line-chart-con">
					<service-requests></service-requests>
				</div>
			</Card>
		</Row>
	</div>
</template>

<script>
	import cityData from './map-data/get-city-value.js';
	import homeMap from './components/map.vue';
	import dataSourcePie from './components/dataSourcePie.vue';
	import visiteVolume from './components/visiteVolume.vue';
	import serviceRequests from './components/serviceRequests.vue';
	import userFlow from './components/userFlow.vue';
	import countUp from './components/countUp.vue';
	import inforCard from './components/inforCard.vue';
	import mapDataTable from './components/mapDataTable.vue';
	import toDoListItem from './components/toDoListItem.vue';

	export default {
		name: 'home',
		components: {
			homeMap,
			dataSourcePie,
			visiteVolume,
			serviceRequests,
			userFlow,
			countUp,
			inforCard,
			mapDataTable,
			toDoListItem
		},
		data() {
			return {
				count: {
					createUser: 112,
					visit: 81,
					collection: 20,
					transfer: 383
				},
				cityData: cityData,
				showAddNewTodo: false,
				newToDoItemValue: ''
			};
		},
		computed: {
			avatorPath() {
				return localStorage.avatorImgPath;
			}
		},
		methods: {
			addNewToDoItem() {
				this.showAddNewTodo = true;
			},
			addNew() {
				if(this.newToDoItemValue.length !== 0) {
					setTimeout(() => {
						this.newToDoItemValue = '';
					}, 200);
					this.showAddNewTodo = false;
				} else {
					this.$Message.error('请输入待办事项内容');
				}
			},
			cancelAdd() {
				this.showAddNewTodo = false;
				this.newToDoItemValue = '';
			}
		}
	};
</script>