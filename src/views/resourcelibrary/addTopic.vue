<template>
    <div class="addTopic">
        <div class="addTopic1">
            <h1>试卷批量导入</h1>
            <p>1.支持批量导入的题目类型</p>
            <p>单选题、多选题、判断题、简答题</p>
            <p>2.支持excel批量导入，具体请查看模版</p>
        </div>
        <div class="addTopic1">
            <h1>请先下载模板</h1>
            <ui>
                <li>建议按照多次分批导入,导入前建议试题变好分类,方便题库管理</li>
                <li>请使用微软的Office,不要使用WPS</li>
            </ui>

        </div>
        <div class="addTopic1">
            <i-button type="primary" @click="handleUplaodExcel">
                下载EXECL格式模板
                <Icon type="arrow-down-a"></Icon>
            </i-button>
             <i-button type="primary">
                下载Word格式模板
                <Icon type="arrow-down-a"></Icon>
            </i-button>

        </div>
        <div class="addTopic1">
            <h1>导入试题</h1>
            <div>
                    <!-- <i-button type="primary">
                        下载EXECL格式模板
                        <Icon type="arrow-down-a"></Icon>
                    </i-button> -->
                <Upload
                    multiple
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    action="http://192.168.100.222:9910/api/upload/fms" :on-success="handleGetSuccess">
                    <i-button type="ghost" icon="ios-cloud-upload-outline">选择文件并上传</i-button>
                </Upload>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'addtopic',
    data(){
        return{

        }
    },
    mounted() {

    },
    methods:{
        handleGetSuccess(response, file, fileList) {
            let data ={
                user_id:'1',
                source_name:"11",
                exam_subject:'',
                exam_type:'',
                exam_level:'11',
                key:response.url

            }
                // "user_id":"***",                                  //账号id-当前登录人的账号id，必须
                // "source_name":"***",                                  //文件名称
                // "exam_subject":"***",                                  //学科类型
                // "exam_type":"***",                                  //文件分类
                // "exam_level":"***",                                  //文件等级
                // "key":"***"                                            //文件key
           // }         
            this.$axios({
                url: '/api/examLibrary/uploadSchedulingFile',
                method: 'post',
                data: data,
            }).then((res)=>{
                this.$Message.success(res.data.Result);
                // this.name='',
                // this.label='',
                // this.classification='',
                // this.grade='',
                console.log(res)
            }).catch(function(err){
                console.log(err);
            })
        },
        handleUplaodExcel() {
            
        }

    }
    
}
</script>

<style lang="less" scoped>
.addTopic{
    height: 100%;
    background-color: #ffffff;
    padding-left: 30px;
    .addTopic1{
        margin-bottom: 20px;
        p,li{
            font-size: 16px;
        }
        
    }
}
</style>