<style lang="less">
	@import './start-learn.less';
</style>

<template>
	<div style="height: 100%">
		<p v-show="showmp4" style="padding-top: 15px;">
			<Button type="success" @click="goback()">返回</Button>
			<Button type="success" @click="playMedia(1)">重新学习</Button>
			<Button type="success" @click="playMedia(2)">继续观看</Button>
		</p>
		<div v-show="showmp4" style="height: 100%;">
			<div style="float: left;width: 60%;">
				<h2 style="text-align: center;margin-top: 20px 0 20px 0;">{{c_title}}</h2>
				<video width="100%" ref='video' id="video1" controls="controls" @ended="myFunction()">

				</video>
			</div>
			<div style="float: left;width: 40%;">

			</div>
		</div>
		<Modal v-model="modal1" title="提示" @on-ok="ok" @on-cancel="cancel">
			<p style="text-align: center;">您以完成此次课程培训，快去评价考试吧。good luck!!!</p>
		</Modal>
		<iframe v-show="showppt" src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' width='100%' height='100%' frameborder='1'>
            </iframe>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				geturl: '',
				getid: '',
				showmp4: false,
				showppt: false,
				times: '',
				showpj: false,
				videoTime: 0,
				hasTime: 0,
				c_title: '',
				modal1: true,
			};
		},
		methods: {
			ok() {
				this.$router.push({
					name: 'pinjia',
					query: {
						id: this.c_id,
						c_title: this.c_title
					}
				});
			},
			cancel() {

			},
			myFunction() {
				this.showpj = true;
				this.modal1 = true;
			},
			//评价页面
			playMedia(val) {       //设置结束时间
				var that = this;
				var video = document.getElementById("video1");  
				video.play();  
				if(val == 1) {
					video.currentTime = 0;  
				} else {
					video.currentTime = 700;  
				}
				that.videoTime = Math.floor(video.duration);
			},
			handleSubmit() {

			},
			countTime() {
				var _this = this;
				var second = 0;
				var minute = 0;
				var hour = 0;
				var setTi = setInterval(function() {
					second++;
					if(second == 60) {
						second = 0;
						minute += 1;
					}
					if(minute == 60) {
						minute = 0;
						hour += 1;
					}
					_this.times = hour + "时" + minute + "分" + second + "秒";
				}, 1000)
			},
			//			parse(){}
		},
		mounted() {
			this.countTime();
			this.geturl = this.$route.query.url;
			this.hasTime = this.$route.query.time;
			this.c_title = this.$route.query.c_title;
			this.id = this.$route.query.id;
			console.log(this.geturl.includes('.mp4'))
			if(this.geturl.includes('.mp4')) {
				this.showmp4 = true;
				this.$refs.video.src = "http://192.168.100.222:9910/api/upload/fms/15665498368086302510452.mp4";
			} else {
				this.showppt = true
			}
		},
	};
</script>

<style>

</style>