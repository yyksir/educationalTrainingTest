<template>
    <div class="resourceBox">
        <div class="boxTitle">
           <span class="line"></span> 
           <span>视频列表</span> 
        </div>
        <div class="boxContent">
            <!-- <div>
                创建人 <i-input :value.sync="value" placeholder="请输入..." style="width: 300px"></i-input>
            </div> -->
            <div class="boxContentCondition">
                <div class="boxContentConditionBox">
                    <div class="boxContentlitem">
                        <span>文件名称</span>
                        <i-input :value.sync="name" placeholder="请输入文件名称" style="width: 300px"></i-input>
                    </div>
                    <div class="boxContentlitem">
                        <span>学科类型</span>
                        <i-input :value.sync="label" placeholder="请输入学科类型" style="width: 300px"></i-input>
                    </div>
                    <div class="boxContentlitem">
                        <span>文件分类</span>
                        <i-input :value.sync="classification" placeholder="请输入文件分类" style="width: 300px"></i-input>
                    </div>
                    <div class="boxContentlitem">
                        <span>文件等级</span>
                        <i-input :value.sync="grade" placeholder="请输入文件等级" style="width: 300px"></i-input>
                    </div> 
                </div>
                <div class="boxContentConditionBoxCheck">
                    <div class="checkBtn">
                        <i-button type="primary">查询</i-button>
                        <i-button type="primary">重置</i-button>     
                    </div>
                </div>
            </div>
            <div class="boxContentConditionaction">
                <Dropdown style="margin-left: 20px" >
                    <i-button type="primary">
                        新增
                        <Icon type="arrow-down-b"></Icon>
                    </i-button>
                    <Dropdown-menu slot="list">
                        <Dropdown-item @click.native="WriteBaseInfo('视频')">视频</Dropdown-item>
                        <Dropdown-item @click.native="WriteBaseInfo('ppt')">ppt</Dropdown-item>
                        <Dropdown-item @click.native="WriteBaseInfo('试卷')">试卷</Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
                <i-button type="primary">修改</i-button>
                <i-button type="primary">删除</i-button>
            </div>
            <div>
                <i-table :columns="columns1" :data="data1"></i-table>
            </div>
            
           

        </div>
    </div>
</template>
<script>
export default {
    name:"resoureLibrary",
    data() {
        return{
            name:'',
            label:'',
            classification:'',
            grade:'',
            list:[],
            columns1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '发送人',
                    key: 'name'
                },
                {
                    title: '发送时间',
                    key: 'sendTime'
                },
                {
                    title: '文件类型',
                    key: 'fileLabel'
                },
                {
                    title: '视频名称',
                    key: 'videoName'
                },
                {
                    title: '大类',
                    key: 'bigClass'
                },
                {
                    title: '浏览次数',
                    key: 'BrowseNumber'
                },
                {
                    title: '学习次数',
                    key: 'studyNumber'
                },
                {
                    title: '评价次数',
                    key: 'ratenuber'
                },
                {
                    title: '课程分数',
                    key: 'score'
                }
            ],
            data1: [
                {
                    name: '管理员',
                    sendTime:'2019.08.24',
                    fileLabel:"视频",
                    videoName:'111',
                    bigClass:"111",
                    BrowseNumber:'11',
                    studyNumber:'111',
                    ratenuber:'5',
                    score:'98',
                },
                {
                    name: '管理员',
                    sendTime:'2019.08.24',
                    fileLabel:"视频",
                    videoName:'111',
                    bigClass:"111",
                    BrowseNumber:'11',
                    studyNumber:'111',
                    ratenuber:'5',
                    score:'98',
                },
                {
                    name: '管理员',
                    sendTime:'2019.08.24',
                    fileLabel:"视频",
                    videoName:'111',
                    bigClass:"111",
                    BrowseNumber:'11',
                    studyNumber:'111',
                    ratenuber:'5',
                    score:'97',
                },
               {
                    name: '管理员',
                    sendTime:'2019.08.24',
                    fileLabel:"视频",
                    videoName:'111',
                    bigClass:"111",
                    BrowseNumber:'11',
                    studyNumber:'111',
                    ratenuber:'5',
                    score:'60',
                },
            ],
        }
    },
    created() {
    },
    mounted () {
        this.getlist();

    },
    methods:{
        getlist() {
            // {
             //   http://localhost:8080/online-study/studyLibrary/saveOrUpdateStudyLibrary
            //     "user_id":"***",                                  //账号id-当前登录人的账号id，必须
            //     "stu_name":"***",                                  //文件名称
            //     "stu_subject":"***",                                  //学科类型
            //     "stu_type":"***",                                  //文件分类
            //     "stu_level":"***",                                  //文件等级
            //     "usable":"***"                                    //是否可用
            //     "stu_id":"***"                                    //文件id
            //     "usable":"***"                                    //是否可用
            //     "click_volume":"***"                                //点击量
            //     } 
            this.$axios({
                    url: '/api/studyLibrary/queryLibrary',
                    method: 'post',
                    data: {
                         user_id:"1",
                    }
                }).then((res)=>{
                    this.data1 = [];
                    res.data.Content.forEach((element,index) => {
                        let ovj ={}
                        ovj.name= '管理员',
                        ovj.sendTime=element.create_time||"201908.24",
                        ovj.fileLabel=element.source_file||'视频',
                        ovj.videoName=element.source_file||'视频',
                        ovj.bigClass=element.stu_name||"0",
                        ovj.BrowseNumber='0',
                        ovj.studyNumber='0',
                        ovj.ratenuber=element.stu_level||"0",
                        ovj.score='0',
                       this.data1.push(ovj);
                    });
                    console.log(res)
                    console.log(this.data1)
                }).catch(function(err){
                    console.log(err);
                })
        },
        WriteBaseInfo(name){
            if(name=='试卷') {
                this.$router.push('/addTopic');
            }else{
                this.$router.push('/addVideoAndppt');
            }
            console.log(name)
        }
    },
    watch: {
        '$route' (to, from) {
            this.getlist(); 
        }
    }
}
</script>

<style lang="less" scoped>
.line{
   display: inline-block; 
   height: 100%;
   width: 10px;
   background-color: blue;
   float: left;
   margin-right: 10px;
}
.resourceBox{
    height: 100%;
    font-size: 14px;
    background-color: #ffffff;
    padding: 15px;
}
.boxTitle{
    height: 50px;
    line-height: 50px;
}
.boxContent{
    height: calc(~"100% - 50px");
    .boxContentCondition{
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 20px;
        overflow: hidden;
        .boxContentConditionBox{
            overflow: hidden;
            .boxContentlitem{
                float: left;
                margin-right: 10px;
            } 
        }
        .boxContentConditionBoxCheck{
            padding-right: 20px;
            .checkBtn{
                text-align: right;
            }
        }

    }
    .boxContentConditionaction{
        padding-bottom: 20px;
        padding-top: 20px;
    }
    
}

</style>