<template>
    <div class="AITest col" v-wechat-title="title">
      <div class="test_bg" v-if="showBg">
        <div class="test_bg2">
          <div class="test_text">
            Hi~  我是您的智能小助理，能测肤、懂护肤、
            还可以帮助您快速找到并解决肌肤困扰哟~
          </div>
          <div class="course" @click="goCourse">测肤教程</div>
          <div class="upload_wrap">
            <van-uploader   :after-read="afterRead"  accept="image/*"   >
              <div class="test_buttom" @click="test">
                <img src="../assets/paizhao2.png" alt="" class="test_paizhao">

                <span class="test_buttom_text">马上测肤</span>
              </div>

            </van-uploader>
          </div>


          <div class="go_record" @click="goReport" >测肤记录</div>



        </div>
<!--        <input type="file" accept="image/*">-->
<!--        <img :src="testImg" alt="">-->

      </div>

      <div class="fail_wrap" v-if="!showBg">
        <div class="head_bg">
          <div class="head_bg1">
            <img :src="testImg" alt="" style="width: 100%;height: 100%;" >
          </div>
          <div class="scan scan1">
            <img src="../assets/juxing16kb.png" alt="" style="width: 100%;height: 100%;">
          </div>
        </div>
        <div class="jindutiao"></div>
        <div class="fail_text">
          <img src="../assets/ts8.png" alt="" class="tip_icon">
          <span class="tip_text1">{{tipText}}</span>
        </div>
<!--        <div class="re_take">重新拍摄</div>-->
        <div class="upload_wrap">
          <van-uploader  :after-read="afterRead" accept="image/*">
            <div class="re_take">重新拍摄</div>

          </van-uploader>

        </div>

        <div class="yonghu_xy"></div>

      </div>

    </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "AITest",
      components:{

      },
      data(){
        return{
          title:'AI测肤',
          testImg:"",
          showBg:true,
          tipText:"正在检测中，请稍等~",
          options:"",
          temfile:""






        }
      },
      created(){
        this.getTitle()
        // var vConsole = new VConsole();
        // console.log('Hello world');

        // this.getGoods()
      },
      mounted(){


      },

      methods: {
        getTitle() {
        },
        goReport(){
          this.$router.push({
            path:'/AITestRecord',
            query:{



            }
          })

        },
        test(){
          console.log("dianjile")

        },

        afterRead(file) {
          // 此时可以自行将文件上传至服务器
          this.tipText='正在检测中，请稍等~'
          var that=this
          this.testImg=file.content

          this.showBg = false
          console.log(file);
          lrz( file.file )

            .then(function(rst) {
              console.log(rst)
              let files = new window.File(
                [rst.file],
                file.file.name,
                { type: file.file.type }
              );
            console.log(files)


              var data = new FormData();
              data.append("time",Math.round(new Date().getTime()/1000))
              if(document.cookie.indexOf("lighteshop_appkey")==-1){
                data.append("token","1071")
              }else{

                data.append("token",that.$cookies.get('lighteshop_appkey'))
              }
              data.append("img",files)
              let url='?mod=appapi&act=upload_tmpimg'
              let url1='?mod=appapi&act=cefu_api&ctrl=check_all'
              // let PostUrl = '/api/'+url
              let PostUrl1 = 'http://localhost:8080/api/?mod=appapi&act=upload_tmpimg'
              let PostUrl2 = 'http://localhost:8080/api/?mod=appapi&act=cefu_api&ctrl=check_all'
              let PostUrl = window.location.protocol +'//'+ window.location.host +url
              let PostUrl3 = window.location.protocol +'//'+ window.location.host +url1
              console.log(PostUrl)

              axios.post(PostUrl1, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }).then(res => {
                console.log(res);
                if(res.data.success=='0'){

                  that.tipText='图片上传失败,请重试'

                }
                var data1 = new FormData();
                data1.append("time",Math.round(new Date().getTime()/1000))
                if(document.cookie.indexOf("lighteshop_appkey")==-1){
                  data1.append("token","1071")
                }else{

                  data1.append("token",that.$cookies.get('lighteshop_appkey'))
                }
                data1.append("img_id",res.data.data.id)
                axios.post(PostUrl2, data1, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                }).then(res => {
                  console.log(res);
                  if(res.data.success=='0'){

                    that.tipText='图片上传失败请重试'

                  }else {
                    console.log(res.data)
                    that.temid=res.data.data
                    setTimeout(function () {
                      that.$router.push({
                        path:'/AITestReport',
                        query:{
                          id:res.data.data.check_id,


                        }
                      })
                    },3000)
                  }


                }).catch(err => {
                  that.tipText='图片上传失败请重试'
                  that.$alert({
                    title: '提示',
                    content: err
                  })
                });

              }).catch(err => {
                that.tipText='图片上传失败请重试'
                that.$alert({
                  title: '提示',
                  content: err
                })

              });



              //成功时执行

            }).catch(function(error) {

            //失败时执行

          }).always(function() {

            //不管成功或失败，都会执行

          })





        },
        beforeRead(file) {
          // 此时可以自行将文件上传至服务

        },
        goCourse(){
          this.$router.push({
            path:'/AITestCourse',

          })
        }

      },
    }
</script>

<style scoped>

  .course{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 15px;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,107,116,1);
  }
  .upload_wrap{
    display: flex;
    align-items: center;
    justify-content: center;
  }
.test_bg{
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("../assets/juxing4.png");
  background-size: 100% 100%;
}
  .test_bg2{
    width: 564px;
    height: 683.5px;
    margin: 205px auto;
    background-image: url("../assets/tuceng111.png");
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .test_text{
    width: 506px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(37,38,38,1);
    margin-top: 339px;
  }
  .test_buttom{
    /*margin-top: 50px;*/
    width: 349px;
    height: 97px;
    background-image: url("../assets/juxing666.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
  }
  .test_paizhao{
    width: 35px;
    height: 32px;
    margin-left: 77px;
  }
  .test_buttom_text{
    margin-left: 17px;
    font-size:36px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
  }
  .go_record{
    margin-top: 32px;
    text-decoration:underline;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
.head_bg{
  width: 534px;
  height: 534px;
  margin-top: 111px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/tuoyuan31.png");
  background-size: 100% 100%;

}
  .head_bg1{
    width: 310px;
    height: 404px;
    border-radius:45%;
    -webkit-transform: translateZ(0);
    -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);
  }
  .jindutiao{
    width: 470px;
    height: 14px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 127px;
    background-image: url("../assets/juxing17kb.png");
    background-size: 100% 100%;

  }
  .fail_text{
    margin-top: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tip_icon{
    width: 26px;
    height: 26px;
    margin-right: 8px;
  }
  .tip_text1{

    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(49,49,49,1);
  }
  .re_take{
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    font-size:36px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
    width:332px;
    height:80px;
    background:rgba(250,98,107,1);
    box-shadow:0px 3px 9px 0px rgba(251,88,97,0.5);
    border-radius:40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yonghu_xy{
    margin-top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .scan{
    width: 421px;
    height: 80px;
    position: absolute;
    opacity: 0.6;

  }
  .scan1{
    animation: myScan 1s infinite alternate;

    -webkit-animation: myScan 1s infinite alternate;
  }
  @keyframes  myScan{

    from { top:5px; }

    to { top: 404px; }

  }
  @keyframes updown {


  }


</style>
