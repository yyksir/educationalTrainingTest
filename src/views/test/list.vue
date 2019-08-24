<template>
<div class="list">
    <div class="listTitle">
        <div class="listTitleTab">
            <Tabs active-key="key1" @on-click="handleGetTab">
                <Tab-pane label="培训完成" key="1"></Tab-pane>
                <Tab-pane label="进行中" key="2"></Tab-pane>
                <Tab-pane label="认证" key="3"></Tab-pane>
            </Tabs>
        </div>
        <div class="listSearch">
            <i-input :value.sync="listSearch" placeholder="请输入" style="width: 500px"></i-input>
        </div>
    </div>
    <div class="listTable">
        <template v-if="tabKey==2">
            <div class="listItem" v-for="item in AuthList" :key="item.id" >
                <div class="listItemPublic picBox">
                    <img src="" alt="" srcset="" class="pic">
                </div>
                <div class="listItemPublic title" >
                    <h4>{{item.title}}</h4>
                    <p>{{item.desc}}</p>
                </div>
                <div class="listItemPublic studyPro" >  
                    {{item.record}}    
                </div>
                <div class="listItemPublic studySlider">
                    <Rate :value.sync="item.level" disabled></Rate>
                    <!-- <Progress :percent="parseInt(item.study_progress)>100?100:parseInt(item.study_progress)" status="active"></Progress> -->
                </div>
                <div class="listItemPublic studyAction">
                    <!-- <i-button type="primary" v-show="parseInt(item.study_progress)>100">
                            开始考试
                    </i-button> -->
                    <i-button type="primary" v-show="tabKey==2" @click="handleGoTest(item)">
                            重新考试
                    </i-button>
                    <i-button type="primary" v-show="tabKey==2">
                            查看认证
                    </i-button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="listItem" v-for="item in totalList" :key="item.c_id" >
                <div class="listItemPublic picBox">
                    <img src="" alt="" srcset="" class="pic">
                </div>
                <div class="listItemPublic title" >
                    <h4>{{item.c_title}}</h4>
                    <p>{{item.c_describe}}</p>
                </div>
                <div class="listItemPublic studyPro" >  
                    学习进度    
                </div>
                <div class="listItemPublic studySlider">
                    <Progress :percent="parseInt(item.study_progress)>100?100:parseInt(item.study_progress)" status="active"></Progress>
                </div>
                <div class="listItemPublic studyAction">
                    <i-button type="primary" v-show="parseInt(item.study_progress)>=100" @click="handleGoTest(item)">
                            开始考试
                    </i-button>
                    <!-- <i-button type="primary" v-show="tabKey==2">
                            重新考试
                    </i-button>
                    <i-button type="primary" v-show="tabKey==2">
                            查看认证
                    </i-button> -->
                </div>
            </div>
        </template>
    </div>
    
</div>
    
</template>
<script>
export default {
    name:"list",
    data(){
        return {
            tabKey:0,
            listSearch:'',
            totalList:[],
            AuthList:[],
        }
    },
    mounted() {
        this.getList();
    },
    methods:{
        handleGetTab(key) {
            this.tabKey = key;
            if(key==2) {
                this.queryAuthListByUserId()
            }else{
                this.getList()
            }
            console.log(key)
        },
        getList() {
            this.$axios({
                url: '/api/examManager/queryExamListByUserId',
                method: 'post',
                data: {
                    person_id:"1",                              //人员id，必须
                    user_id:"",                                  //账号id-当前登录人的账号id，必须  
                    flag:this.tabKey,                                     //0-培训完成,1-进行中
                    search_name:this.listSearch,                               //输入的搜索名称
                    page:"1",                                  //分页页码，必须  
                    pageSize:"20"                                 //分页条数，必须  
                }
            }).then((res)=>{
                this.totalList = res.data.Content;
                console.log(res.data)
            }).catch(function(err){
                console.log(err);
            })
        },
        queryAuthListByUserId() {
            this.$axios({
                url: '/api/examManager/queryAuthListByUserId',
                method: 'post',
                data: {
                    person_id:"1",                              //人员id，必须
                    user_id:"",                                  //账号id-当前登录人的账号id，必须  
                    flag:"0",                                     //0-培训完成,1-进行中
                    search_name:this.listSearch,                               //输入的搜索名称
                    page:"1",                                  //分页页码，必须  
                    pageSize:"20"                                 //分页条数，必须  
                }
            }).then((res)=>{
                this.AuthList = res.data.Content;
                console.log(res.data)
            }).catch(function(err){
                console.log(err);
            })
        },
        handleGoTest(item) {
            this.$router.push({
                name: "testList",
                query: { order: JSON.stringify(item)}
            });
        }
    }
    
}
</script>
<style lang="less" scoped>
.list{
    height: 100%;
    background-color: #ffffff;
}
.listTitle{
    margin-top: 20px;
    padding-top: 20px;
    overflow: hidden;
}
.listTitleTab{
    width: 300px;
    float: left;
    margin-left: 30px;
}
.listSearch{
    float: right;
    margin-right: 30px;
    
}
.listTable{
    height: calc(~"100% - 72px");
}
.listItem{
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    height: 70px;
    border-bottom: 1px solid #eeeeee;
    .picBox{
        width: 10%;
        height: 100%;
       .pic{
            height: 100%;
            width: 100%;
        } 
    }
    .title{
        width: 30%;
        p{
            line-height: 25px;
        }
    }
    .studyPro{
        width: 20%;
        line-height: 50px;
    }
    .studySlider{
        width: 20%;
        line-height: 50px;
    }
    .studyAction{
        width: 20%;
        text-align: center;
        line-height: 50px;
    }
}
.listItemPublic{
    float: left;
    height: 100%;
}
</style>