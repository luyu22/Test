<template>
  <div class="AITestCourse col" v-wechat-title="title">
    <div class="course_title">
      <span class="course_text">测肤提示</span>
    </div>
    <div class="tip_box">
      <div class="tip_box1">
          <div class="tip_text">1.默认使用后置摄像头，拍照更清晰，也可使用前置拍照或上传照片.</div>
          <div class="tip_text">
            2.拍照前请保持拍摄正面姿势，关闭美颜，摘掉眼镜
            留海不遮挡脸部，素颜拍摄更准确哦~
          </div>
      </div>
    </div>

<!--    <div class="course_title">-->
<!--      <span class="course_text">视频步骤</span>-->
<!--    </div>-->
<!--    <div class="course_video"></div>-->

    <div class="course_title">
      <span class="course_text">拍摄步骤</span>
    </div>
    <div class="buzhou_box">
      <span class="buzhou_text">1.平视后置或前置摄像头</span>
      <div class="buzhou_img"><img src="../assets/xingzhuang7.png" alt="" style="width: 100%;"></div>
    </div>
    <div class="buzhou_box">
      <span class="buzhou_text">2.寻找合适位置，不能太近或太远</span>
      <div class="buzhou_img"><img src="../assets/xingzhuang2.png" alt="" style="width: 100%;"></div>
    </div>
    <div class="buzhou_box">
      <span class="buzhou_text">3.找到合适位置后，闭眼拍照</span>
      <div class="buzhou_img"><img src="../assets/xingzhuang9.png" alt="" style="width: 100%;"></div>
    </div>

    <div class="course_title">
      <span class="course_text">准备工作</span>
    </div>
    <div class="work_box">
      <div class="work_text">1.擦干净镜头</div>
      <div class="work_text">2.摘眼镜、撩留海</div>
      <div class="work_text">3.擦干净镜头</div>
      <div class="work_text">4.上传照片要选择正面无遮挡、不模糊</div>
    </div>



        <div class="gotest" @click="test">
          <span class="gotest_text">开始测一测</span>
        </div>






  </div>
</template>

<script>
    export default {
        name: "AITestCourse",
      components:{

      },
      data(){
        return{
          title:'拍照教程',






        }
      },
      created(){

      },
      mounted(){


      },
      methods: {
        getTitle() {
        },
        goReport(){
          console .log("goreport")
        },
        test(){
          this.$router.push({
            path:'/AITest',

          })
        }

      },

    }
</script>

<style scoped>

.course_title{
  width: 261px;
  margin: 36px auto;
  text-align: center;
}
  .course_text{

    font-size:36px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,128,158,1);
    background:linear-gradient(22deg,rgba(218,160,255,1) 0%, rgba(253,179,238,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .tip_box{
    width: 677px;
    /*height: 233px;*/
    margin: 20px auto;
    background: #F9F7FD;
  }
  .tip_box1{
    width:593px;
    /*height: 163px;*/
    margin: 29px auto;
  }
  .tip_text{
    margin-top: 5px;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(249,95,102,1);
  }
  .course_video{
    width: 661px;
    height: 315px;
    margin: 0 auto;
    background: grey;
  }
  .buzhou_box{
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .buzhou_text{
    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(50,47,47,1);
  }
  .buzhou_img{
    margin-top: 50px;
    margin-bottom: 20px;
    width: 391px;
    /*height: 351px;*/
  }
  .work_box{
    margin-left: 119px;

  }
  .work_text{
  margin-top: 26px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(50,47,47,1);
  }
  .gotest{
    width:332px;
    height:80px;
    background:rgba(250,98,107,1);
    box-shadow:0px 3px 9px 0px rgba(251,88,97,0.5);
    border-radius:40px;
    margin: 90px auto;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .gotest_text{
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
  }

</style>
