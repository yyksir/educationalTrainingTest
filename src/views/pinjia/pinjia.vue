<style lang="less">
	@import './pinjia.less';
</style>

<template>
	<div class="pj">
		<div>
			<img src="../../images/qq.jpg"/>
		</div>
		<h1 class="tec">{{c_title}}</h1>
		<p class="tec ft20">请对我们的课程作出评价</p>
		<Rate show-text v-model="valueText" @on-change="getval()"/>
		<div class="tec">
			 <Input class="wid300" v-model="value5" type="textarea" placeholder="您的评价使我们更加完美" />
		</div>
		<p class="tec">
			<Button class="wid100" type="success" @click="goks()">评价并进入考试</Button>
			<Button class="wid100" type="success" @click="goback()">提交评价</Button>
		</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				c_title:'',
				valueText: 3,
				value5:''
			};
		},
		methods: {
			getval(){
				console.log(this.valueText)
			},
			//进入考试
			goks(){
//				this.$router.pu
			},
			goback(){
				
			}
		},
		mounted() {
			this.c_title = this.$route.query.c_title;
		},
	};
</script>

<style>

</style>