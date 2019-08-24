<template>
    <div class="testCertification">
        <div class="title">
            <div class="titleCenter">

           
                <div class="rate">
                    <Rate :value.sync="order.level" disabled></Rate>
                </div>
            
                <div class="titleContent">
                    {{this.order.c_exam}}--{{this.order.record}}
                </div> 
             </div> 
        </div>
        <div class="imgcertifi">
            <img src="../../images/fiveRadio.png" alt="" srcset="">
        </div>
         
    </div>
    
</template>
<script>
export default {
    name:'testCertification',
    data() {
        return {
             order:JSON.parse(this.$route.query.order),
     
        }
    },
    mounted() {
        console.log(this.order)

    },
    menthods:{

    },
     watch:{
        '$route' (to, from) {
            this.order = JSON.parse(this.$route.query.order)
            console.log(order)

            //this.startExam(); 
        }
    }
    
}
</script>
<style lang="less" scoped>
.title{
    padding: 30px 0;
}
.titleCenter{
    margin: auto;
    width: 20%;
}
.testCertification{
    height: 100%;
    background-color: #ffffff;
}
.imgcertifi{
    text-align: center;
}
.titleContent{
    font-size: 20px;
    text-align: center;
    font-size: 20px;
}
.rate{
    float: left;
    
}
</style>