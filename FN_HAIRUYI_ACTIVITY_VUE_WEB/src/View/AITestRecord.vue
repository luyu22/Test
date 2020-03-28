<template>
  <div class="AITestRecord col" v-wechat-title="title">
    <div class="record_bg">
      <div class="year_text">{{year}}年</div>
      <div class="record_box" v-for="(item,index) in indexData" :key="index">
        <div class="record_time">
          <img src="../assets/taiyang.png" alt="" class="sun_icon">
          <span class="sun_text">{{item.time}}</span>
        </div>
        <div class="record_point">
          <img src="../assets/jiance.png" alt="" class="sun_icon">
          <span class="sun_text">{{item.str2}}:</span>
          <span class="sun_point">{{item.score}}</span>
        </div>
        <div class="record_buttom" @click="goReport(item)">
          <span class="report_text">{{item.str}}</span>
        </div>
      </div>
      <div class="norecord" v-if="indexData.length==0">暂时没有记录，快去测测你的皮肤吧~</div>




    </div>
<!--    <div class="year_text">2019年</div>-->

  </div>



</template>

<script>


    export default {
      name: "AiTestRecord",
      components:{

      },
      data(){
        return{
          title:'测肤记录',
          year:"",
          indexData:""






        }
      },
      created(){
        this.getTitle()

        // this.getGoods()

      },
      mounted(){


      },
      methods: {
        getTitle() {
          this.GET('?mod=appapi&act=cefu_api&ctrl=recode',{

          },(res)=>{
            console.log(res.data)
            this.indexData = res.data.data
            this.year=new Date().getFullYear()

          })
        },
        goReport(item){
          this.$router.push({
            path:'/AITestReport',
            query:{
              id:item.id,


            }
          })
        }

      },
    }
</script>

<style scoped>

  .norecord{
    margin-top: 30px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
.record_bg{
  background: #FFE8F2;
  width: 100%;
  height: 100%;
  position: absolute;
}
  .year_text{
    margin-left: 20px;
    margin-top: 40px;
    padding-bottom: 15px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(49,47,48,1);
  }
  .record_box{
    position: relative;
    margin:14px auto;
    width: 705px;
    height: 108px;
    background: #FFF;
  }
  .record_time{
    position: absolute;
    top: 17px;
    left: 25px;
  }
  .sun_icon{
    width: 23px;
    height: 23px;
  }
  .sun_text{
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(49,47,48,1);
  }
.record_point{
  position: absolute;
  top: 54px;
  left: 25px;
}
  .sun_point{

    font-size:36px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(243,91,134,1);
  }
  .record_buttom{
    width: 191px;
    height: 76px;
    position: absolute;
    top: 21px;
    right:19px;
    background-image: url("../assets/juxing63.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .report_text{
    padding-left: 5px;
    padding-right: 5px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
</style>
