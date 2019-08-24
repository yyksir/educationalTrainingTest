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
                        <i-input :value.sync="name" placeholder="请输入..." style="width: 300px"></i-input>
                    </div>
                    <div class="boxContentlitem">
                        <span>学科类型</span>
                        <i-input :value.sync="label" placeholder="请输入..." style="width: 300px"></i-input>
                    </div>
                    <div class="boxContentlitem">
                        <span>文件分类</span>
                        <i-input :value.sync="classification" placeholder="请输入..." style="width: 300px"></i-input>
                    </div>
                    <div class="boxContentlitem">
                        <span>文件等级</span>
                        <i-input :value.sync="grade" placeholder="请输入..." style="width: 300px"></i-input>
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
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    key: 'address'
                }
            ],
            data1: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }
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
                    url: '/saas/restPersonService/queryPersonListByPositionIds',
                    method: 'post',
                    data: {
                        page: 1,
                        page_size: 10,
                        pd: "e10adc3949ba59abbe56e057f20f883e",
                        person_id: "RY91885782044b4abeb426d5dd9111d80a",
                        project_id: "Pj6105020001",
                        user_id: "7445ae8a-e1c4-469f-9910-190ac2611e4f",
                    }
                }).then((res)=>{
                    console.log(res)
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