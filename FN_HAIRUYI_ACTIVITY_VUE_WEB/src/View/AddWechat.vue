<template>
  <div class="AddWechat col" v-wechat-title="indexData.title">

<!--    <div class="top0"></div>-->
<!--    <div class="top_bg">-->
<!--        <span class="title_text">专属导师一对一指导</span>-->
<!--    </div>-->

<!--    <div class="mid_bg1">-->
<!--      <div class="jieyi_wrap">-->
<!--          <div class="jieyi_title">专属解疑 </div>-->
<!--          <div class="jieyi_box">-->
<!--            <div class="jieyi_item">-->
<!--                <div class="dian_icon"></div>-->
<!--              <span>分阶段培</span>-->
<!--            </div>-->

<!--            <div class="jieyi_item">-->
<!--              <div class="dian_icon"></div>-->
<!--              <span>分阶段培</span>-->
<!--            </div>-->

<!--            <div class="jieyi_item">-->
<!--              <div class="dian_icon"></div>-->
<!--              <span>分阶段培</span>-->
<!--            </div>-->

<!--            <div class="jieyi_item">-->
<!--              <div class="dian_icon"></div>-->
<!--              <span>分阶段培</span>-->
<!--            </div>-->

<!--            <div class="jieyi_item">-->
<!--              <div class="dian_icon"></div>-->
<!--              <span>分阶段培训</span>-->
<!--            </div>-->
<!--            <div class="jieyi_item">-->
<!--              <div class="dian_icon"></div>-->
<!--              <span>分阶段培训</span>-->
<!--            </div>-->


<!--          </div>-->
<!--      </div>-->

<!--    </div>-->
    <div class="page_wrap" :style="{backgroundImage: 'url(' + indexData.page_bj + ')', backgroundSize:'100% 100%'}">

      <div class="mid_bg2" :style="{marginLeft: indexData.qr_code_x+'%', marginTop: indexData.qr_code_y+'%'}">
<!--        <div class="daoshi_title">专属解疑</div>-->
        <div class="code_wrap" :style="{backgroundImage: 'url(' + indexData.tutor_qrcode + ')', backgroundSize:'100% 100%'}">
<!--          <div class="code_img">-->

<!--          </div>-->
        </div>
        <div class="wx_info">
          {{indexData.tutor_code_str}}
        </div>
        <div class="add_button">
          <div class="button1" @click="toAdd" :style="{backgroundImage: 'url(' + indexData.copy_btn + ')', backgroundSize:'100% 100%'}">
<!--            <span class="button_text">复制去微信添加</span>-->
          </div>
          <div class="button2" :style="{backgroundImage: 'url(' + indexData.save_btn + ')', backgroundSize:'100% 100%'}" @click.stop="toSave">
<!--            <span class="button_text">保存二维码</span>-->
          </div>
        </div>
      </div>

      <div class="mid_bg3" >
        <div class="wc_item" v-for="(item,index) in indexData.list" :key="index" :style="{backgroundImage: 'url(' + indexData.list_bj + ')', backgroundSize:'100% 100%'}">
          <div class="wc_img">
            <img :src="item.qrcode" alt=""  style="width: 100%;height: 100%">
          </div>
          <div class="wc_name">{{item.str}}</div>
          <div class="wc_name1">{{item.str1}}</div>
          <div class="wc_add" :style="{backgroundImage: 'url(' + indexData.copy_btn + ')', backgroundSize:'100% 100%'}" @click="toAdd1(item)">
<!--            <span class="add_text">复制去微信添加</span>-->
          </div>
          <div class="wc_add1" :style="{backgroundImage: 'url(' + indexData.save_btn + ')', backgroundSize:'100% 100%'}" @click.stop="toSave1(item)">
<!--            <span class="add_text">保存二维码</span>-->
          </div>

        </div>

      </div>

    </div>



  </div>

</template>

<script>
    import {XCircle} from "vux";

    export default {
        name: "AddWechat",
      components: {
      },
      data(){
        return{
          title:'添加专属导师微信',
          percent: 80,
          test:[],
          CateData:"",
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
          this.GET('?mod=appapi&act=tutor_wx&ctrl=page_msg',{

          },(res)=>{
            console.log(res.data)
            this.indexData = res.data.data
            this.title=res.data.data.title

          })
        },


        goReport(){
          console .log("goreport")
        },
        goodsClick(){

        },
        toAdd(){
          this.copyStrFree(this.indexData.tutor_code,"微信号已复制")
          setTimeout(function () {
            window.location.href='http://192.168.0.114:8080/#/AddWecha?a=native://wechat'
          },1000)

        },
        toAdd1(item){
          this.copyStrFree(item.wx_num,"微信号已复制")
          setTimeout(function () {
            window.location.href='http://192.168.0.114:8080/#/AddWecha?a=native://wechat'
          },1000)

        },
        toSave(){
          var that =this
          setTimeout(function () {
            window.location.href='navite://save#'+that.indexData.tutor_qrcode
          },1000)

        },
        toSave1(item){
          setTimeout(function () {
            window.location.href='navite://save#'+item.qrcode
          },1000)

        },

      },
    }
</script>

<style scoped>

  .top0{
    width: 100%;
    height: 128px;
    /*background-image: url("../assets/tuceng9.png");*/
    /*background-size: 100% 100%;*/
  }
.top_bg{
  display: flex;
  /*align-items: center;*/
  justify-content: center;
  width: 100%;
  height: 111px;
  /*background-image: url("../assets/tuceng10.png");*/
  /*background-size: 100% 100%;*/
}
.title_text{
  /*margin-top: 34px;*/
  font-size:60px;
  font-family:PingFang SC;
  font-weight:800;
  color:rgba(255,255,255,1);
  text-shadow:0px 4px 6px rgba(1,97,62,0.4);
}
.mid_bg1{
  width: 100%;
  height: 293px;
  /*background-image: url("../assets/tuceng14.png");*/
  /*background-size: 100% 100%;*/
}
.mid_bg2{
  margin-left: auto;
  margin-right: auto;
  width: 380px;
  margin-top: 85%;
  /*height: 427px;*/
  display: flex;
  flex-direction: column;
  align-items: center;
  /*background-image: url("../assets/tuceng12.png");*/
  /*background-size: 100% 100%;*/
}
.mid_bg3{

  width: 100%;
  height: 378px;
  background-image: url("../assets/tuceng1313.png");
  background-size: 100% 100%;
}
  .jieyi_wrap{
    height: 246px;
    width: 734px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 34px;
    /*background-image: url("../assets/zu8.png");*/
    /*background-size: 100% 100%;*/

  }
  .jieyi_title{
    margin-top: -34px;
    width: 216px;
    height: 68px;
    /*background-image: url("../assets/juxing12.png");*/
    /*background-size: 100% 100%;*/
    font-size:34px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .jieyi_box{
    display: flex;
    flex-wrap: wrap;
    margin-top: 29px;
    /*height: 100px;*/

    width: 100%;
  }
  .jieyi_item{
    margin-top: 14px;
    width: 160px;
    display: flex;
    align-items: center;
    margin-left: 22px;
    font-size:27px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(16,140,86,1);

  }
  .dian_icon{
    width:10px;
    height:10px;
    background:rgba(16,140,86,1);
    border-radius:50%;
    margin-right: 5px;

  }
  .daoshi_title{
    width: 216px;
    height: 68px;
    font-size:34px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
    /*background-image: url("../assets/juxing12.png");*/
    /*background-size: 100% 100%;*/
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .code_wrap{
    width: 228px;
    height: 217px;
    margin-top: 7px;
    margin-left: auto;
    margin-right: auto;
    /*background-image: url("../assets/juxing7.png");*/
    /*background-size: 100% 100%;*/
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .code_img{
    width:186px;
    height:184px;
    /*margin-top: 17px;*/
    /*margin-left: 19px;*/
    border-radius:6px;
  }
  .wx_info{
    /*width:321px;*/
    /*margin-left: auto;*/
    /*margin-right: auto;*/
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .add_button{
    display: flex;
    align-items: center;
    margin-top: 10px;

  }
  .button1{
    width: 196px;
    /*margin-left: 185px;*/
    /*background-image: url("../assets/juxing42.png");*/
    /*background-size: 100% 100%;*/
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .button2{
    width: 152px;
    margin-left: 25px;
    /*background-image: url("../assets/juxing42.png");*/
    /*background-size: 100% 100%;*/
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .button_text{
    padding-right: 16px;
    padding-left: 16px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .wc_item{
    /*background-image: url("../assets/juxing3.png");*/
    position: relative;
    /*background-size: 100% 100%;*/
    width: 665px;
    height: 156px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
  .wc_img{
    width: 124px;
    height: 124px;
    position: absolute;
    left: 16px;
    top: 16px;

  }
  .wc_name{
    position: absolute;
    left: 160px;
    top: 24px;

    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .wc_name1{
    position: absolute;
    left: 160px;
    top: 72px;

    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .wc_add{
    width: 196px;
    /*background-image: url("../assets/juxing42.png");*/
    /*background-size: 100% 100%;*/
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 26px;

  }
  .add_text{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    padding-left: 16px;
    padding-right: 16px;
  }
  .wc_add1{
    /*background-image: url("../assets/juxing42.png");*/
    /*background-size: 100% 100%;*/
    width: 152px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 94px;

  }
  .page_wrap{
    width: 100%;
    min-height: 1334px;
  }
</style>
