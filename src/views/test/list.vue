<template>
<div class="list">
    <div class="listTitle">
        <div class="listTitleTab">
            <Tabs active-key="key1">
                <Tab-pane label="培训完成" key="key1"></Tab-pane>
                <Tab-pane label="进行中" key="key2"></Tab-pane>
                <Tab-pane label="认证" key="key3"></Tab-pane>
            </Tabs>
        </div>
        <div class="listSearch">
            <i-input :value.sync="listSearch" placeholder="请输入" style="width: 500px"></i-input>
        </div>
    </div>
    <div class="listTable">
        <div class="listItem" >
            <div class="listItemPublic picBox">
                <img src="" alt="" srcset="" class="pic">
            </div>
            <div class="listItemPublic title" >
                <h4>PHP初级考试</h4>
                <p>一段假想的简介，这是一段比较长的简介</p>
            </div>
            <div class="listItemPublic studyPro">  
                学习进度    
            </div>
            <div class="listItemPublic studySlider">
                <Slider :value="11" :tip-format="format"></Slider>
            </div>
            <div class="listItemPublic studyAction">
                  <i-button type="primary">
                    开始考试
                </i-button>
            </div>
        </div>

    </div>
    
</div>
    
</template>
<script>
export default {
    name:"list",
    data(){
        return {
            listSearch:'',
            totalList:[],
        }
    },
    mounted() {
        this.getList();
        // getTableData().then(res => {
        //     this.tableData = res.data
        // }).catch(err => {
        //     console.log(err)
        // })
    },
    methods:{
        format (val) {
            return '进度' + val + '%';
        },
        getList() {
             this.$axios({
                    url: '/api/examManager/queryExamListByUserId',
                    method: 'post',
                    data: {
                        person_id:"1",                              //人员id，必须
                        user_id:"",                                  //账号id-当前登录人的账号id，必须  
                        flag:"1",                                     //0-培训完成,1-进行中
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