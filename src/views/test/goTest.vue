<template>
<div class="gotest">
    <div class="title">
        {{this.order.c_exam }}
    </div>
    <div class="btn">
        <i-button type="primary" @click="submitTest">交卷</i-button>
    </div>
    <div class="goTestContent">
        <div v-for="(item,index) in totalList" :key="index" class="congtentItem" @click="handleSureIndex(item,index)">
            <div class="itemTitle">
                {{item.exam_name}}
            </div>
            <div>
                <Radio-group v-model="item.analysis_answer" @on-change="changeaRdio">
                    <Radio label="A" :key="item.exam_A"  >
                        <span>{{item.exam_A}}</span>
                    </Radio>
                    <Radio  label="B" :key="item.exam_B" >
                    <span>{{item.exam_B}}</span>
                    </Radio>
                    <Radio  label="C" :key="item.exam_C" >
                        <span>{{item.exam_C}}</span>
                    </Radio>
                    <Radio label="D" :key="item.exam_D" >
                        <span>{{item.exam_D}}</span>
                    </Radio>
                    <!-- <Radio value="E" :label="item.exam_E" :key="item.exam_E" >
                        <span>{{item.exam_E}}</span>
                    </Radio> -->
                </Radio-group>
            </div>
        </div>
    </div>

</div>
</template>
<script>
export default {
    name:'gotest',
    data() {
        return{
            totalList:[],
            order:JSON.parse(this.$route.query.order),
            sureIndex:-1,
            chosenOrder:'',
            choose_answer:[],

        }
    },
    mounted() {
        this.startExam();
        console.log(this.order)
    },
    methods:{
        startExam() {
             this.$axios({
                url: '/api/examManager/startExam',
                method: 'post',
                data: {
                    person_id:"1",                              //人员id，必须
                    user_id:"", 
                    source_name:this.order.c_exam                                 //账号id-当前登录人的账号id，必须  
                }
            }).then((res)=>{
                this.totalList = res.data.Content;
                console.log(res.data)
            }).catch(function(err){
                console.log(err);
            })
        },
        handleSureIndex(item,index) {
            this.sureIndex = index;
        },
        changeaRdio(kwy){
            this.choose_answer.push({
                exam_id:this.totalList[this.sureIndex].exam_id,
                answer:kwy
            })
            console.log(this.choose_answer)
            console.log(kwy)
        },
        submitTest() {
            this.$axios({
                url: '/api/examManager/submitPaper',
                method: 'post',
                data: {
                    person_id:this.order.person_id,                              //人员id，必须
                    user_id:"1", 
                    c_exam:this.order.c_exam,                                  //试卷的唯一标识（试卷名称），必须
                    c_id:this.order.c_id,                                  //培训id，必须
                    title:this.order.title,                                  //培训名称，必须
                    desc:this.order.desc, 
                    choose_answer: this.choose_answer                               //培训概要，必须  
                }
            }).then((res)=>{
                this.$router.push({
                    name: "testCertification",
                    query: { order: JSON.stringify(res.data.Item)}
                });
                console.log(res.data)
            }).catch(function(err){
                console.log(err);
            })

            
        }
    },
    watch:{
        '$route' (to, from) {
            this.startExam(); 
        }
    }
    
}
</script>
<style lang="less" scoped>
.gotest{
    height: 100%;
    background-color: #ffffff;
    .title{
        height: 50px;
        text-align: center;
        font-size: 16px;
        padding-top: 20px;
    }
    .btn{
        text-align: right;
        margin-right: 30px;
    }
}
.goTestContent{
    height: calc(~"100% - 80px");
    font-size: 16px;
    overflow:scroll;
    .congtentItem{
        padding: 20px 20px;
    }
}

</style>