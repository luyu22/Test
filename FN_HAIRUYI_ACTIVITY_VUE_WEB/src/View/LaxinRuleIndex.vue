<template>
<div class="LaxinRuleIndex col" v-wechat-title="indexData.title">
    <div class="top" :style="{backgroundImage: 'url(' + indexData.bj_img + ')', backgroundSize:'100% 100%'}">
        <div class="pmd_bg" :style="{backgroundImage: 'url(' + indexData.pmd_bjimg + ')', backgroundSize:'100% 100%'}">
          <van-notice-bar
            color="#FFFFFF"
            background-color="none"
            left-icon="volume"
            class="pmd_bg1"

          >
            <span v-if="pmdData.length>0">{{msg.msg}}</span>
<!--            <span v-else>恭喜  用户 125****5412  成功邀请  7人 销售额达 ¥4576</span>-->
          </van-notice-bar>
        </div>
        <div class="my_invite" :style="{backgroundImage: 'url(' + indexData.btn_img + ')', backgroundSize:'100% 100%'}" @click="toMyInvite">

        </div>
        <div class="end_text">
          {{indexData.adv_one_data.str}}
        </div>

    </div>

    <div class="top2" :style="{backgroundImage: 'url(' + indexData.adv_one_data.img + ')', backgroundSize:'100% 100%'}">
      <div class="end_time">
        <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="item">{{timeData.days}}</span><span style="color: #FFFFFF">天</span><span class="item">{{ timeData.hours }}</span><span style="color: #FFFFFF">时</span> <span class="item">{{ timeData.minutes }}</span><span style="color: #FFFFFF">分</span><span class="item">{{ timeData.seconds }}</span><span style="color: #FFFFFF">秒</span>
          </template>
        </van-count-down>
      </div>
      <div v-for="item in indexData.adv_one_data.list">
<!--        <div class="adv" :style="{backgroundImage: 'url(' + item.img + ')', backgroundSize:'100% 100%'}" @click="toAdv(item)">-->

<!--        </div>-->
        <div class="adv">
        <img :src="item.img" alt="" style="width: 100%;height: 100%;" @click="toAdv(item)">
        </div>
      </div>

      <div class="more_adv_top" :style="{backgroundImage: 'url(' + indexData.adv_more_data.img + ')', backgroundSize:'100% 100%'}">
      </div>

      <div v-for="item in indexData.adv_more_data.list">
        <div class="adv1" >
          <img :src="item.img" alt=""  style="width: 100%;height: 100%;" @click="toAdv(item)">
        </div>
      </div>

    </div>

    <div class="act_join_top" :style="{backgroundImage: 'url(' + indexData.act_join.img + ')', backgroundSize:'100% 100%'}">


    </div>
    <div class="act_join_content" :style="{backgroundImage: 'url(' + indexData.act_join.act_img + ')', backgroundSize:'100% 100%'}">
      <div class="join_title" :style="{backgroundColor:'#'+indexData.act_join.act_bjcolor,color:'#'+indexData.act_join.act_color}">
        <div style="padding-top: 5px">{{indexData.act_join.act_time}}</div>

      </div>

    </div>

    <div class="act_rule_top" :style="{backgroundImage: 'url(' + indexData.act_rule.img + ')', backgroundSize:'100% 100%'}"></div>
    <div class="act_rule_content" :style="{backgroundImage: 'url(' + indexData.act_rule.bjimg + ')', backgroundSize:'100% 100%'}">
      <div class="html_wrap">
        <div v-html="indexData.act_rule.html_data">{{indexData.act_rule.html_data}}</div>
      </div>

    </div>




</div>
</template>

<script>
    export default {
        name: "LaxinRuleIndex",
        data() {
            return {
                copyText:"http://hairuyi.com/admin/?mod=&actlogin&ctrl=index",
                indexData:"",
                time:"",
                pmdData:"",
                index:0,
                msg:""


            };
        },
        created(){
                this.getIndex()
            this.getPmd()
            this.changePmd()


        },
        methods: {
              getIndex(){
                  this.GET('?mod=appapi&act=wph_new&ctrl=index', {

                  }, (res) => {
                      console.log(res.data)
                      this.indexData=res.data.data
                      this.time = res.data.data.adv_one_data.djs * 1000


                  })
              },
            toAdv(item){

                this.appOpenWeb(item,'jump_SkipUIIdentifier')
            },
            getPmd(){
                this.GET('?mod=appapi&act=wph_new&ctrl=pmd', {

                }, (res) => {
                    console.log(res.data.data)
                    this.pmdData=res.data.data
                    this.msg =res.data.data[0]
                    // console.log(this.pmdData)
                })
            },
            changePmd(){
                  // const that = this
                  //   setInterval(function () {
                  //       console.log(that.pmdData)
                  //       that.index=that.index+1
                  //       if(that.index==(that.pmdData.length-1)){
                  //           that.msg =that.pmdData[0].msg
                  //           console.log(that.msg)
                  //       }else {
                  //           that.msg= that.pmdData[that.index].msg
                  //           console.log(that.msg)
                  //       }
                  //
                  //   },10000)
                setTimeout(() => {
                    if (this.index<this.pmdData.length){
                        this.index=this.index+1
                    }else {this.index=0}

                          if(this.index==(this.pmdData.length)){
                              this.msg =this.pmdData[0]
                              console.log(this.msg)
                              this.changePmd()
                          }else {
                              this.msg= this.pmdData[`${this.index}`]
                              console.log(this.msg)
                              this.changePmd()
                          }
                }, 15000);

            },
            toMyInvite(){
                this.isLogin(()=>{
                    this.appOpenWeb({
                        is_need_login:"1",
                        SkipUIIdentifier: "pub_wailian",
                        show_type_str:"",
                        url: this.indexData.url,
                        jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                    },'jump_SkipUIIdentifier')
                })
            }


        }
    }
</script>

<style scoped>
  .item{
    display: inline-block;
    width: 50px;
    margin-right: 5px;
    color: #A5DCFB;
    text-align: center;
    font-size:30px;
    font-family:zcoolqingkehuangyouti;
    font-weight:400;
    color:rgba(165,220,251,1);
    line-height:36px;
  }
.top{
  position: relative;
  width: 100%;
  height: 800px;
  z-index: 3;
}
  .pmd_bg{
    width: 602px;
    height: 50px;
    margin-top: 28px;
    margin-left: 85px;
  }
  .pmd_bg1{
    height: 100%;
    background-color: #490B6C;
  }
  .my_invite{
    width: 285px;
    height: 74px;
    position: absolute;
left: 231px;
    bottom: 53px;
  }
  .top2{
    width: 100%;
    /*height: 1004px;*/
    z-index: 2;
    margin-top: -100px;
  }
  .end_text{
    width: 431px;
    height: 28px;
    position: absolute;
    left: 160px;
    bottom: 11px;
    color: #FFF;
    text-align: center;
    font-size: 25px;
  }
  .end_time{
    /*text-align: center;*/
    width: 400px;
    height: 44px;
    margin-top: 123px;
    margin-left: 180px;
    text-align: center;
    color: #FFFFFF;
  }
  .adv{
    width: 700px;
    /*height: 257px;*/
    margin-right: auto;
    margin-left: auto;
  }

  .more_adv_top{
    height: 92px;
    width: 100%;

  }
  .adv1{
    width: 700px;
    /*height: 257px;*/
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
  }
  .act_join_top{
height: 94px;
    width: 100%;


  }
  .act_join_content{
    height: 839px;
    width: 100%;



  }
  .join_title{
    width: 512px;
    height: 48px;
    margin-left: 114px;
    text-align: center;
  }
.act_rule_top{
  height: 94px;
  width: 100%;
}
  .act_rule_content{
    /*height: 1506px;*/
    width: 100%;
  }
  .html_wrap{
    width: 582px;
    margin-left: auto;
    margin-right: auto;
    /*height: 1355px;*/
  }
</style>
