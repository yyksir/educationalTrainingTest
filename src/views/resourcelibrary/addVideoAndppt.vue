<template>
    <div class="addvideoandppt">
        <div class="addvideoandpptTitle">
            基本信息
        </div>
        <div class="contentBox">
            
            <div class="boxContentConditionBox clearfix">
                <div class="boxContentlitem">
                    <span>文件名称</span>
                    <i-input  v-model="name" placeholder="请输入..." style="width: 300px"></i-input>
                </div>
                <div class="boxContentlitem">
                    <span>学科类型</span>
                    <i-input v-model="label" placeholder="请输入..." style="width: 300px"></i-input>
                </div>
                <div class="boxContentlitem">
                    <span>文件分类</span>
                    <i-input v-model="classification" placeholder="请输入..." style="width: 300px"></i-input>
                </div>
                <div class="boxContentlitem">
                    <span>文件等级</span>
                    <i-input v-model="grade" placeholder="请输入..." style="width: 300px"></i-input>
                </div> 
                
            </div>
        </div>
        <div class="boxContentlitemBottom">
            <i-col span="12">
                <Date-picker 
                type="date" 
                placeholder="选择日期" 
                style="width: 200px"
        
                @on-change="handleChange"
                ></Date-picker>
            </i-col>
        </div>
        <div class="fileInfo">文件信息</div>
        <div class="fileupload">
            <Upload action="http://192.168.100.222:9910/api/upload/fms" :on-success="handleGetSuccess">
                <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
            </Upload>
        </div>
        <div class="btnBox">
            <i-button type="primary" class="btn" @click="handleSave">保存</i-button>
            <i-button type="primary" class="btn">取消</i-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'addVideoandppt',
    data() {
        return {
            name:'',
            label:'',
            classification:'',
            grade:'',
            file:{},
            attachment:'',
        }
    },
    mounted() {

    },
    methods:{
        handleGetSuccess(response, file, fileList) {
            this.attachment = response.url
            console.log(response)
            console.log(file)
            console.log(fileList)
        },
       handleChange (date) {
           console.log(date)
        // this.value3 = date;
        },
        handleSave() {
            if(!this.attachment) {
                return;
            }
            let data = {
                user_id:"1",
                person_id:'1',
                stu_name:this.name||"23",
                stu_subject:this.label||"23",
                stu_type:this.classification||"23",
                stu_level:this.grade||"23",
                source_file:this.attachment,
            }
             this.$axios({
                url: '/api/studyLibrary/saveOrUpdateStudyLibrary',
                method: 'post',
                data: data,
            }).then((res)=>{
                this.$Message.success(res.data.Result);
                this.name='',
                this.label='',
                this.classification='',
                this.grade='',
                this.$router.push({
                    path: "/component/resourcelibrary",
                    // query: { order: JSON.stringify(res.data.Item)}
                });
                console.log(res)
            }).catch(function(err){
                console.log(err);
            })
        }

    }
    
}
</script>

<style lang="less" scoped>
.addvideoandppt{
    height: 100%;
    font-size: 14px;
    background-color: #ffffff;
    padding: 15px;
   
    .addvideoandpptTitle{
        height: 50px;
        background-color:yellowgreen;
        line-height: 50px;
        margin-bottom: 20px;
    }
    .fileupload{
        padding-top: 20px;
    }
}
.fileInfo{
    margin-top: 30px;
    height: 50px;
    background-color:yellowgreen;
    line-height: 50px;
}
.boxContentConditionBox{
    overflow: hidden;
    .boxContentlitem{
        float: left;
        margin-right: 10px;
    } 
    
}
.boxContentlitemBottom{
    margin-top: 20px;
    height: 30px;
}
.btnBox{
    text-align: center;
    .btn{
        width: 100px;
        height: 40px;
        font-size: 14px;
        margin: 0 20px;
    }
}
</style>