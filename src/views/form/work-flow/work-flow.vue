<style lang="less">
	@import '../../../styles/common.less';
	@import './work-flow.less';
</style>

<template>
	<div class="content">
		<div class="cont">
			<div class="top">
				添加培训活动
			</div>
			<div class="contents">
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
					<FormItem label="开始时间">
						<Row>
							<Col span="3">
							<FormItem prop="date">
								<DatePicker type="datetime" placeholder="请选择开始时间" v-model="formValidate.date"></DatePicker>
							</FormItem>
							</Col>
							<Col span="2" style="text-align: center">结束时间</Col>
							<Col span="5">
							<FormItem prop="time">
								<DatePicker type="datetime" placeholder="请选择结束时间" v-model="formValidate.time"></DatePicker>
							</FormItem>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="名称" prop="name">
						<Row>
							<Col span="10">
							<Input v-model="formValidate.name" placeholder="请输入名称"></Input>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="概述" prop="desc">
						<Row>
							<Col span="10">
							<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入概述"></Input>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="讲师" prop="teacher">
						<Row>
							<Col span="10">
							<Input v-model="formValidate.teacher" placeholder="请输入名称"></Input>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="关联培训文件" prop="glwj">
						<Row>
							<Col span="10">
							<Select v-model="formValidate.glwj" placeholder="选择关联的文件">
								<Option v-for="item in wjlist" :value="item.stu_id" :key="item.stu_id">{{ item.stu_name }}</Option>
							</Select>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="关联的试卷" prop="glsj">
						<Row>
							<Col span="10">
							<Select v-model="formValidate.glsj" placeholder="选择关联的试卷">
								<Option v-for="item in sjlist" :value="item.source_name" :key="item.source_name">{{ item.source_name }}</Option>
							</Select>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="时长（秒）" prop="contime">
						<Row>
							<Col span="10">
							<Input v-model="formValidate.contime" placeholder="请输入时长"></Input>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="人员" prop="person">
						<Row>
							<Col span="10">
							<Select v-model="formValidate.person" multiple placeholder="选择人员">
								<Option v-for="item in personlist" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
					</FormItem>
					<FormItem>
						<Button type="primary" @click="handleSubmit('formValidate')">确认添加</Button>
						<Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
					</FormItem>
				</Form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'workflow',
		data() {
			return {
				personlist: [{
					id: 'RY9cbc786de1754b90a9ab915be30764dc',
					name: '赖星其'
				}, {
					id: 'RY6e82de377e024c6a89e3132c096d68b0',
					name: '王永存'
				}, {
					id: 'RY6e7c8ae47ccb443ebcda04b5fc622ad3',
					name: '王咏梅'
				}],
				wjlist: [],
				sjlist: [],
				formValidate: {
					name: '',
					city: '',
					date: '',
					time: '',
					teacher: '',
					person: [],
					contime: ''
				},
				ruleValidate: {
					contime: [{
						required: true,
						message: '时长不能为空',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '名称不能为空',
						trigger: 'blur'
					}],
					teacher: [{
						required: true,
						message: '讲师不能为空',
						trigger: 'blur'
					}],
					glwj: [{
						required: true,
						message: '请选择关联的文件',
						trigger: 'change'
					}],
					glsj: [{
						required: true,
						message: '请选择关联的试卷',
						trigger: 'change'
					}],
					//					person: [{
					//						required: true,
					//						message: '请选择人员',
					//						type: 'array',
					//						trigger: 'change'
					//					}],
					date: [{
						required: true,
						type: 'date',
						message: '请选择开始时间',
						trigger: 'change'
					}],
					time: [{
						required: true,
						type: 'date',
						message: '请选择结束时间',
						trigger: 'change'
					}],
					desc: [{
							required: true,
							message: '请输入概述',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 20,
							message: '概述不可少于20个字',
							trigger: 'blur'
						}
					]
				}

			};
		},
		methods: {
			handleSubmit(name) {
				var a = new Date(this.formValidate.date)
//				var date_value=a.getFullYear() +''+  (a.getMonth() + 1)+ ''+  a.getDate()  +''+  a.getHours() +''+  a.getMinutes() +''+  a.getSeconds();
//console.log(date_value)
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.addLearn()
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			//添加培训
			addLearn() {
				this.$axios({
					url: '/api/train/add',
					method: 'post',
					data: {
						"c_start_time": this.formValidate.date, // 开始时间
						"c_end_time": this.formValidate.time, // 结束时间
						"c_title": this.formValidate.name,
						"c_describe": this.formValidate.desc,
						"c_lecturer": this.formValidate.teacher,
						"c_exam": this.formValidate.glsj,
						"c_course": this.formValidate.glwj,
						"c_duration": Number(this.formValidate.contime), // 培训时长
						"c_user": this.formValidate.person
					}
				}).then((res) => {
					this.$Message.info('新增成功');
					 this.$store.commit('removeTag', 'addlearn');
                this.$store.commit('closePage', 'addlearn');
					this.$router.push({
						name: 'form',
					});
				}).catch(function(err) {
					this.$Message.error('新增失败');
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			//获取培训列表
			getpxlist() {
				this.$axios({
					url: '/api/studyLibrary/queryLibrary',
					method: 'post',
					data: {

					}
				}).then((res) => {
					this.wjlist = res.data.Content
				}).catch(function(err) {
					console.log(err);
				})
			},
			uniqueArr(arr, key) { 
				let hash = {}; 
				return arr.reduce((newArr, item, index, arr) => {  
					hash[item[key]] ? '' : hash[item[key]] = true && newArr.push(item);  
					return newArr; 
				}, [])
			},

			//获取试题列表
			getsjlist() {
				this.$axios({
					url: '/api/examLibrary/queryLibrary',
					method: 'post',
					data: {

					}
				}).then((res) => {
					//					this.sjlist = res.data.Content;
					let newarr = this.uniqueArr(res.data.Content, 'source_name')
					this.sjlist = newarr;
					console.log(newarr)
				}).catch(function(err) {
					console.log(err);
				})
			},
			//			获取人员
			getuserList() {
				this.$axios({
					url: '/api/restDeptService/queryDeptPositionPersonTree',
					method: 'post',
					data: {
						projectId: 'Pj3310030001',
						user_id: '324'
					}
				}).then((res) => {}).catch(function(err) {
					console.log(err);
				})
			}
		},
		mounted() {
			this.getpxlist();
			this.getsjlist();
			//			this.getuserList()
		}
	};
</script>