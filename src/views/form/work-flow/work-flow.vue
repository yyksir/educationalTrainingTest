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
								<DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
							</FormItem>
							</Col>
							<Col span="2" style="text-align: center">结束时间</Col>
							<Col span="5">
							<FormItem prop="time">
								<DatePicker type="date" placeholder="Select data" v-model="formValidate.time"></DatePicker>
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
								<Option value="beijing">New York</Option>
								<Option value="shanghai">London</Option>
								<Option value="shenzhen">Sydney</Option>
							</Select>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="关联的试卷" prop="glsj">
						<Row>
							<Col span="10">
							<Select v-model="formValidate.glsj" placeholder="选择关联的试卷">
								<Option value="beijing">New York</Option>
								<Option value="shanghai">London</Option>
								<Option value="shenzhen">Sydney</Option>
							</Select>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="人员" prop="person">
						<Row>
							<Col span="10">
							<Select v-model="formValidate.person" multiple placeholder="选择人员">
								<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
				cityList: [{
						value: 'New York',
						label: 'New York'
					},
					{
						value: 'London',
						label: 'London'
					},
					{
						value: 'Sydney',
						label: 'Sydney'
					},
					{
						value: 'Ottawa',
						label: 'Ottawa'
					},
					{
						value: 'Paris',
						label: 'Paris'
					},
					{
						value: 'Canberra',
						label: 'Canberra'
					}
				],
				formValidate: {
					name: '',
					city: '',
					date: '',
					time: '',
					teacher: '',
					person: []
				},
				ruleValidate: {
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
					person: [{
						required: true,
						message: '请选择人员',
						type: 'array',
						trigger: 'change'
					}],
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
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Message.success('Success!');
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			}
		},
		mounted() {

		}
	};
</script>