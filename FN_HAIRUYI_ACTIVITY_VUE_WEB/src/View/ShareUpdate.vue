<template>
  <div >
  <div class="ShareUpdate col" v-wechat-title="indexData.title">
      <div class="top_back" v-if="this.$route.params.is_toweixin==0&&this.$route.params.platform=='wap'">
        <div class="back_arrow" @click="backto"></div>
        <div class="topspan_text">{{indexData.title}}</div>
      </div>

      <div class="top_bg" :style="{backgroundImage: 'url(' + bj_img + ')', backgroundSize:'100% 100%'}">
        <div class="rule" @click="navigateToRule">{{indexData.rule_str}}</div>
        <div class="top_info">{{info_str}}</div>
        <div class="inner">
          <img :src="info_img" alt="" style="width: 100%;height: 100%;">
        </div>
      </div>
      <div class="main0">
     <div class="main">
      <div class="serve_type">
          <div class="type_name" v-if="indexData.pay_info">{{indexData.pay_info.title}}</div>
          <div class="card_wrap">
            <div  @click="SelectTime(item,index)" v-bind:class="[index==yearIndex? card_have : card_not]" v-for="(item,index) in indexData.pay_info.list">
              <div class="card_name">{{item.name}}</div>
              <div class="card_money">
                <span class="money_left">¥</span>
                <span class="money_mid">{{item.price}}</span><span class="money_right">/{{item.unit}}</span>
              </div>
              <div class="not_money">
                <del class="not_money_text">{{item.cost_price_str}}</del>
              </div>
              <div class="tip_text">
                {{item.str}}
              </div>
            </div>
<!--            <div class="card"></div>-->
<!--            <div class="card"></div>-->
          </div>
          <div class="now_price">
            <div class="now_price_text">{{indexData.pay_info.list[0].act_str}}</div>
            <div class="now_price_name">¥{{price}}</div>
            <del class="now_price_not">¥{{cost_price}}</del>
          </div>
          <div class="line2"></div>
          <div class="open_auto">
            <div class="open_text">
              {{indexData.pay_info.list[0].auto_str}}
            </div>
            <div class="open_text1">
              {{indexData.pay_info.list[0].auto_str1}}
            </div>
            <div class="open_switch">
              <van-switch v-model="checked" active-color="#6ED169" size="24px" />
            </div>
          </div>

          <div class="line2"></div>

          <div class="cut" v-if="yhq_price!=0">
            <div class="cut_text"> {{indexData.pay_info.list[0].is_yh_str}}</div>
            <div class="cut_price" v-if="checked">{{indexData.pay_info.list[0].auto_yh_str}}</div>
            <div class="cut_show" v-if="checked">
              <div :style="{background:'#'+ indexData.pay_info.list[0].auto_yh_unit_bjcolor, color:'#'+indexData.pay_info.list[0].auto_yh_unit_fontcolor}">{{indexData.pay_info.list[0].auto_yh_unit_str}}</div>
            </div>
<!--            <div class="cut_price" v-if="!checked">{{indexData.pay_info.list[0].yh_str}}</div>-->
<!--            <div class="cut_show" v-if="!checked">-->
<!--              <div :style="{background:'#'+ indexData.pay_info.list[0].yh_unit_bjcolor, color:'#'+indexData.pay_info.list[0].yh_unit_fontcolor}">{{indexData.pay_info.list[0].yh_unit_str}}</div>-->
<!--            </div>-->

          </div>
          <div class="line2"></div>
          <div class="after_cut">
            <div class="after_cut_text">{{indexData.pay_info.list[0].money_str}}</div>
            <div class="after_cut_price">¥{{checked?yh_price:price}}</div>
          </div>
          <div class="line2"></div>
          <div class="open_time">
            <div class="open_time_text">{{indexData.pay_info.list[0].write_str}}</div>
            <div class="open_time_stepper">
              <van-stepper v-model="value" />

            </div>
            <div class="year">{{unit}}</div>


          </div>

      </div>
      <div class="pay_way">
        <div class="pay_way_text">支付方式</div>

        <div v-for="(item,index) in indexData.pay_type" >
          <div class="pay_way_1" @click="selectPay(item,index)">
            <div class="pay_way_img" :style="{backgroundImage: 'url(' + item.img + ')'}">
            </div>
            <div class="pay_way_way">{{item.str}}</div>
            <div class="have_yue" v-if="item.info">
              {{item.info}}
            </div>
            <div class="pay_select">
              <div  v-bind:class="[index==payIndex? payClass : paynoClass]"></div>
            </div>

          </div>
          <div class="line2"></div>
      </div>


      </div>
       <div style="margin-bottom: 100px;">
         <div class="shuoming">{{indexData.info_list.title}}</div>
         <div class="shuoming_text" v-for="item in indexData.info_list.content">
           {{item}}
         </div>
       </div>

   </div>
      </div>
<!--   <div class="pay">-->
<!--     <div class="pay_left">-->
<!--        <div  v-on:click="changeAgree" v-bind:class="[agree? agreeClass : agreenotClass]">-->

<!--        </div>-->
<!--       <div class="pay_left_text">-->
<!--         已阅读并同意-->
<!--       </div>-->
<!--       <div class="pay_left_text1">-->
<!--         《嗨如意支付条款》-->
<!--       </div>-->
<!--     </div>-->
<!--     <div class="pay_right">-->
<!--       <div class="pay_right_text">立即支付</div>-->
<!--       <div class="pay_right_text1">¥</div>-->
<!--       <div class="pay_right_text2">1399</div>-->
<!--     </div>-->
<!--   </div>-->
  </div>
    <footer>
      <div class="test_but" :style="{backgroundImage: 'url(' + indexData.btn_data.bj_img + ')'}">
        <div class="pay_left">
          <div  v-on:click="changeAgree" v-bind:class="[agree? agreeClass : agreenotClass]">

          </div>
          <div class="pay_left_text">
            {{indexData.btn_data.left_btn.str}}
          </div>
          <div class="pay_left_text1" @click="navigateToPayRule">
            {{indexData.btn_data.left_btn.str1}}
          </div>
        </div>
        <div class="pay_right" v-on:click="toPay">
          <div class="pay_right_text">{{indexData.btn_data.right_btn.str}}</div>
          <div class="pay_right_text1">¥</div>
          <div class="pay_right_text2">{{checked?yh_price*value:price*value}}</div>
        </div>
      </div>

    </footer>











  </div>
</template>

<script>
    import { Toast } from 'vant';
    import { Dialog } from 'vant';
    export default {
        name: "ShareUpdata",
        components: {
            [Dialog.Component.name]: Dialog.Component
        },
        data() {
            return {
                info_img:"",
                info_str:"",
                bj_img:"",
                indexData:"",
                checked: true,
                value: 1,
                showYue:true,
                payIndex:"",
                payImg:require('../assets/ShareUpdateDui.png'),
                payClass: 'payClass',
                paynoClass: 'paynoClass',
                agree:false,
                agreeClass:'pay_left_select',
                agreenotClass:'pay_left_notselect',
                index:"",
                yearIndex:"0",
                card_have:"card",
                card_not:"card_not",
                payType:"",
                price:"",
                cost_price:"",
                auto_yh_str:"",
                yh_price:"",
                unit:"",
                id:"",
                yhq_price:"",
                options :{
                    title: '', // 默认无标题
                    no: {
                        text: '取消',
                        style: {}
                    },
                    yes: {
                        text: '确定',
                        style: {}
                    },
                }





            };
        },
        created(){
            this.getHomeData()

        },
      mounted() {
          console.log(111777)
        this.checkBuy()
      },
      methods: {
            changeAgree() {


                this.agree=!this.agree
            },
            SelectTime(item,index){

                this.yearIndex =index
                this.price=item.price
                this.cost_price=item.cost_price
                this.auto_yh_str=item.auto_yh_str
                this.yh_price=item.yh_price
                this.unit=item.unit
                this.id =item.id
                this.yhq_price=item.yhq_price
                console.log(this.id)


            },
            selectPay(item,index){
                this.payIndex = index
                this.payType=  item.type

            },
            getHomeData() {
                this.GET('?mod=appapi&act=share_app&ctrl=index',{
                    version:this.$route.params.version,
                    platform:this.$route.params.platform,
                    is_toweixin:this.$route.params.is_toweixin
                },(res)=>{
                  console.log(res.data.data.jump_url)
                    if(res.data.data.jump_url!=""){
                      if (this.$route.params.platform=='wap'){
                        console.log(111)
                        this.$router.push({
                          path: `/ShareCenter/${this.$route.params.version}/${this.$route.params.platform}/${this.$route.params.is_toweixin}`,
                        })
                      }else {
                        this.isLogin(()=>{
                          this.appOpenWeb({
                            is_need_login:"1",
                            SkipUIIdentifier: "pub_wailian",
                            show_type_str:"",
                            url: res.data.data.jump_url,
                            jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                          },'jump_SkipUIIdentifier')
                        })
                      }
                    }
                    console.log(res.data,res.data.success)
                    this.indexData = res.data.data
                    this.bj_img=res.data.data.top.bj_img
                    this.price=res.data.data.pay_info.list[0].price
                    this.cost_price =res.data.data.pay_info.list[0].cost_price
                    this.auto_yh_str=res.data.data.pay_info.list[0].auto_yh_str
                    this.yh_price=res.data.data.pay_info.list[0].yh_price
                    this.unit= res.data.data.pay_info.list[0].unit
                    this.info_str = res.data.data.top.info_str
                    this.info_img = res.data.data.top.info_img
                    this.payType = res.data.data.pay_type[0].type
                    this.yhq_price=res.data.data.pay_info.list[0].yhq_price
                    this.id=res.data.data.pay_info.list[0].id
                    console.log(this.id)


                })
            },
            toPay(){
                this.isLogin(()=>{
                if(this.agree) {
                    this.$confirm({
                        title: '提示',
                        content: '确定支付吗',
                        yesText: '取消',
                        noText:"确定"
                    }).then(()=>{
                        console.log(123)
                    }).catch(()=>{
                        this.GET('?mod=appapi&act=share_app&ctrl=create_order', {
                            gid: this.id,
                            num: this.value,
                            is_xufei:0,
                            is_auto: Number(this.checked),
                            pay_type: this.payType,
                            version:this.$route.params.version,
                            platform:this.$route.params.platform,
                            is_toweixin:this.$route.params.is_toweixin

                        }, (res) => {
                            console.log(res.data)
                                this.GET('?mod=appapi&act=share_app&ctrl=payment', {

                                oid: res.data.data.oid,
                                type:this.payType,
                                version:this.$route.params.version,
                                platform:this.$route.params.platform,
                                is_toweixin:this.$route.params.is_toweixin

                            }, (res) => {
                                if(res.data.success==1) {
                                    if (this.$route.params.platform == 'wap') {
                                        if (this.payType == "wx") {
                                            console.log("go wx")
                                            window.location.href=res.data.data.url

                                        }
                                        if (this.payType == "zfb") {
                                            console.log("go zfb")

                                            window.location.href=res.data.data.url
                                        }
                                        if (this.payType == "yue") {
                                            // Toast.success('余额支付成功');
                                            console.log("go yue")
                                            window.location.href=res.data.data.url
                                        }


                                    }else {


                                    if (this.payType == "wx") {
                                        console.log("go wx")
                                        this.appOpenWeb(res.data.data, "wechat_pay")

                                    }
                                    if (this.payType == "zfb") {
                                        console.log("go zfb")
                                        this.appOpenWeb(res.data.data, "alipay_topay")
                                    }
                                    if (this.payType == "yue") {
                                        // Toast.success('余额支付成功');
                                        console.log("go yue")
                                        this.appOpenWeb({
                                            is_need_login: "1",
                                            SkipUIIdentifier: "pub_wailian",
                                            show_type_str: "",
                                            url: res.data.data.url,
                                            jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                                        }, 'jump_SkipUIIdentifier')
                                    }
                                }

                                }else {  this.$alert({
                                    title: '提示',
                                    content: res.data.msg
                                })}
                                console.log(res.data)


                            })


                        })

                    })


                }else { this.$alert({
                    title: '提示',
                    content: '请先阅读支付条款'
                })}
                })
                // this.isLogin(()=>{
                //     if(this.agree) {
                //         this.$dialog.confirm({
                //             title: '确认支付吗',
                //             message: ''
                //         }).then(() => {
                //             console.log(111)
                //             this.GET('?mod=appapi&act=share_app&ctrl=create_order', {
                //                 gid: this.id,
                //                 num: this.value,
                //                 is_xufei:0,
                //                 is_auto: Number(this.checked),
                //                 pay_type: this.payType,
                //                 version:this.$route.params.version
                //
                //             }, (res) => {
                //                 console.log(res.data)
                //                 this.GET('?mod=appapi&act=share_app&ctrl=payment', {
                //
                //                     oid: res.data.data.oid,
                //                     type:this.payType,
                //                     version:this.$route.params.version
                //
                //                 }, (res) => {
                //                     if(res.data.success==1){
                //                         if (this.payType=="wx"){
                //                             console.log("go wx")
                //                             this.appOpenWeb(res.data.data,"wechat_pay")
                //
                //                         }
                //                         if (this.payType=="zfb"){
                //                             console.log("go zfb")
                //                             this.appOpenWeb(res.data.data,"alipay_topay")
                //                         }
                //                         if (this.payType=="yue"){
                //                             Toast.success('余额支付成功');
                //                             console.log("go yue")
                //                             this.appOpenWeb({
                //                                 is_need_login:"1",
                //                                 SkipUIIdentifier: "pub_wailian",
                //                                 show_type_str:"",
                //                                 url: res.data.data.url,
                //                                 jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                //                             },'jump_SkipUIIdentifier')
                //                         }
                //
                //                     }else {  Toast.fail(res.data.msg);}
                //                     console.log(res.data)
                //
                //
                //                 })
                //
                //
                //             })
                //         }).catch(() => {
                //             // on cance
                //             console.log(222)
                //         });
                //
                //     }else {
                //         Toast('请先阅读条款');
                //     }
                //
                //
                // })

            },
            navigateToRule(){
                if (this.$route.params.platform == 'wap') {
                    window.location.href=this.indexData.rule_url
                }else {
                  this.appOpenWeb({
                      is_need_login:"1",
                      SkipUIIdentifier: "pub_wailian",
                      show_type_str:"",
                      url: this.indexData.rule_url,
                      jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                  },'jump_SkipUIIdentifier')
                }
            },
            navigateToPayRule(){
                if (this.$route.params.platform == 'wap') {
                    window.location.href=this.indexData.btn_data.left_btn.url
                }else {
                    this.appOpenWeb({
                        is_need_login: "1",
                        SkipUIIdentifier: "pub_wailian",
                        show_type_str: "",
                        url: this.indexData.btn_data.left_btn.url,
                        jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                    }, 'jump_SkipUIIdentifier')
                }
            },
            backto(){
                this.$router.go(-1)
            },
            checkBuy(){
              // this.GET('?mod=appapi&act=share_app&ctrl=index',{
              //
              // },(res)=>{
              //   console.log(res.data)
              //
              // })
            }





        },


    }
</script>

<style scoped>
.top_back{
  height: 80px;
  background-color: #FFFFFF;
  position: relative;
  text-align: center;
}
.top_bg{
  position: relative;
}
.back_arrow{
  position: absolute;
  top: 23px;
  left: 30px;
  width: 20px;
  height: 34px;
  background-image: url("../assets/back.png");
  background-size:100% 100%;
}
.topspan_text{
  padding-top: 18px;
  /*height: 42px;*/
  font-size:36px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(38,37,42,1);
  /*line-height:21px;*/
}
  .rule{
    position: absolute;
    top: 10px;
    right: 25px;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:#BE5500;
    line-height:42px;
  }
  .test_but{
    width: 100%;
    height: 102px;
    position: fixed;
    bottom: 0;
    background-size:100% 100%;

  }
  .top_info{
    position: absolute;
    left: 96px;
    top: 40px;
    color: #BE5500;
    font-size:34px;
    font-family:PingFang SC;
    font-weight:800;
    line-height:42px;
  }
  .payClass{
    width: 40px;
    height: 40px;
    background-image: url("../assets/ShareUpdateDui.png");
    background-size:100% 100%;
  }
  .paynoClass{
    width: 40px;
    height: 40px;
    background-image: url("../assets/ShareUpdateDuino.png");
    background-size:100% 100%;
  }
  .shuoming{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(98,97,93,1);
    line-height:42px;
    margin-left: 25px;
    margin-top: 34px;
  }
  .shuoming_text{
    width: 696px;
    /*height: 141px;*/
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    font-size:20px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(98,97,93,1);
    line-height:30px;
  }
  .pay{
    /*position: fixed;*/
    /*bottom: 0;*/
    /*right: 0;*/
    height: 102px;
    /*background-image: url("../assets/ShareUpdatePay.png");*/
    /*background-size:100% 100%;*/


  }
  .pay_left{
    height: 102px;
    width: 46%;
    float: left;
    position: relative;
    z-index: 999;

  }



.pay_left_text{
  position: absolute;
  font-size:30px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(50,51,56,1);
  line-height:42px;
  left: 100px;
  top: 21px;
}
  .pay_left_text1{
   position: absolute;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(50,51,56,1);
    line-height:42px;
    left: 85px;
    top: 61px;
  }
  .pay_right{
    height: 102px;
    width: 54%;
    float: right;
    display: flex;
    z-index: 999;

  }
  .pay_right_text{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(50,51,56,1);
    line-height:42px;
    margin-left: 60px;
  }
  .pay_right_text1{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;

    color:rgba(50,51,56,1);
    line-height:42px;
    margin-left: 20px;
  }
  .pay_right_text2{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:48px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(50,51,56,1);
    line-height:42px;
  }
  .pay_way{
    margin-top: 24px;
    width:707px;
    height:326px;
    background:rgba(255,255,255,1);
    border-radius:26px;
    margin-left: auto;
    margin-right: auto;
  }

  .main{
    width:750px;
    height:1460px;
    background:linear-gradient(to bottom, #fff, #E7E6E6);
  }
  .line2{
    width:706px;
    height:2px;
    background:rgba(238,238,238,1);
  }

  .inner{
    width: 702px;
    height: 407px;
    margin-top: 98px;
    margin-left: auto;
    margin-right: auto;

  }
  .serve_type{
    /*display: flex;*/
    width: 702px;
    /*height: 761px;*/
    background-image: url("../assets/ShareUpdateMid.png");
    margin-left: auto;
    margin-right: auto;
  }
  .type_name{

    height:29px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(39,36,34,1);
    line-height:42px;
    margin-left: 25px;
    padding-top: 35px;
    padding-bottom: 35px;
    /*margin-top: 40px;*/
  }
  .card_wrap{
    width: 100%;
    height: 222px;
    /*float: left;*/
    margin-top: 22px;
  }
  .card{
    float: left;
    margin-left: 20px;
    width: 214px;
    height: 222px;
    background-image: url("../assets/ShareUpdateTuijian.png");
    background-size:100% 100%;
    position: relative;

  }.card_not{
     float: left;
     margin-left: 20px;
     width: 214px;
     height: 222px;
     background-image: url("../assets/ShareUpdateChaozhi.png");
     background-size:100% 100%;
     position: relative;

   }
  .card_name{
    position: absolute;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(39,36,34,1);
    line-height:42px;
    top: 15px;
    left: 8px;
  }
  .card_money{
    position: absolute;
    top: 65px;
    left: 9px;
  }
  .money_left{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(39,36,34,1);
    line-height:42px;
  }
  .money_mid{

    font-size:32px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(39,36,34,1);
    line-height:42px;
  }
  .money_right{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(39,36,34,1);
    line-height:42px;
  }
  .not_money{
    position: absolute;
    left: 9px;
    top: 110px;
  }
  .not_money_text{

    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(109,109,109,1);
    line-height:42px;
  }
  .tip_text{
    position: absolute;
    left: 9px;
    top: 150px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(254,82,82,1);
    line-height:42px;

  }
  .now_price{
    height: 87px;
    width: 100%;
    margin-top: 8px;
    display: flex;
  }
  .now_price_text{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(39,36,34,1);
    line-height:42px;
    margin-left: 40px;
  }
  .now_price_name{
    display: flex;
    align-items: center;
    justify-items: center;

    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,178,69,1);
    line-height:42px;
    margin-left: 117px;
  }
  .now_price_not {
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(109,109,109,1);
    line-height:42px;
    margin-left: 30px;
  }
  .open_auto{
    display: flex;
    height: 87px;
    width: 100%;


  }
  .open_text{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(39,36,34,1);
    line-height:42px;
    margin-left: 40px;
  }
  .open_text1{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:#B1ADAD;
    line-height:42px;

  }
  .open_switch{
    display: flex;
    align-items: center;
    justify-items: center;
    margin-left: 100px;
  }

  .cut{
    display: flex;
    height: 87px;
    width: 100%;

  }
  .cut_text{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(39,36,34,1);
    line-height:42px;
    margin-left: 41px;
  }
  .cut_price{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,178,69,1);
    line-height:42px;
    margin-left: 98px;

  }
  .cut_show{
    width: 107px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-items: center;
    margin-left: 19px;
    margin-top: 29px;
    /*background-image: url("../assets/ShareUpdateAuto.png");*/
    /*background-size:100% 100%;*/
  }
  .after_cut{
    display: flex;
    height: 87px;
    width: 100%;

  }
  .after_cut_text{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(39,36,34,1);
    line-height:42px;
    margin-left: 40px;
  }
  .after_cut_price{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,178,69,1);
    line-height:42px;
    margin-left: 66px;
  }
  .open_time{
    display: flex;
    height: 87px;
    width: 100%;
  }
  .open_time_text{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(39,36,34,1);
    line-height:42px;
    margin-left: 40px;
  }
  .open_time_stepper{
    display: flex;
    align-items: center;
    justify-items: center;
    margin-left: 280px;
  }
  .year{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(39,36,34,1);
    line-height:42px;
    margin-left: 13px;
  }
.pay_way_text{

  font-size:30px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(34,34,39,1);
  line-height:42px;
  padding-top: 24px;
  margin-left: 28px;
}
  .pay_way_1{
    position: relative;
    display: flex;
    width: 100%;
    height: 85px;
  }
  .pay_way_img{
    display: flex;
    align-items: center;
    justify-items: center;
    width: 50px;
    height: 50px;
    background-size:100% 100%;
    margin-left: 34px;
    margin-top: 24px;
  }
  .pay_way_way{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(34,34,39,1);
    line-height:42px;
    margin-left: 28px;
  }
  .have_yue{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:#FB5240;
    line-height:42px;
    margin-left: 15px;
  }
  .pay_select{
    display: flex;
    align-items: center;
    justify-items: center;

    position: absolute;
    right: 30px;
    top: 21px;

  }
  .pay_select_dui{
    width: 40px;
    height: 40px;
    /*background-image: url("../assets/ShareUpdateDui.png");*/
    background-size:100% 100%;


  }
.pay_left_select{
  position: absolute;
  width: 40px;
  height: 40px;
  background-image: url("../assets/ShareUpdateDui.png");
  background-size:100% 100%;
  left: 31px;
  top: 35px;


}
.pay_left_notselect{
  position: absolute;
  width: 40px;
  height: 40px;
  background-image: url("../assets/ShareUpdateDuino.png");
  background-size:100% 100%;
  left: 31px;
  top: 35px;
}
  footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(88px + constant(safe-area-inset-bottom));
        height: calc(88px + env(safe-area-inset-bottom));

  }
</style>
