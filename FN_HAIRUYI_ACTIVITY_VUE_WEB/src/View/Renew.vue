<template>
<div class="ShareCenter col" v-wechat-title="indexData.title">
  <div class="main">
    <div class="top_back" v-if="this.$route.params.is_toweixin==0&&this.$route.params.platform=='wap'">
      <div class="back_arrow" @click="backto"></div>
      <div class="topspan_text">{{indexData.title}}</div>
    </div>
  <div class="renew_top" :style="{backgroundImage: 'url(' + indexData.bjimg + ')', backgroundSize:'100% 100%'}">
<!--    <div class="renew_top_text">{{indexData.title}}</div>-->
    <div class="renew_top_icon"></div>
    <div class="renew_top_img" :style="{backgroundImage: 'url(' + indexData.head_img + ')', backgroundSize:'100% 100%'}"></div>
    <div class="name_icon">
      <div class="renew_top_name">{{indexData.nickname}}</div>
      <div class="renew_top_year" :style="{backgroundImage: 'url(' + indexData.label_img + ')', backgroundSize:'100% 100%'}">
        <span class="top_year_text">{{indexData.str1}}</span>
      </div>
    </div>
    <div class="renew_top_yeartext"></div>
    <div class="renew_top_time">
     {{indexData.str}}
    </div>

  </div>

<!--  <div class="zu1">-->

<!--  </div>-->

  <FNImageBanner
    :imageList="indexData.adv_data"
    :FNSpecialShopItemData="indexData.adv_data"/>

  <div class="pay-way">
    <div class="pay-way-way">
      <div class="pay-way-text">{{indexData.buy_data[0].title}}</div>
      <div class="pay-way-from">{{indexData.buy_data[0].content}}</div>
    </div>
    <div class="line2"></div>
    <div class="pay-way-way">
      <div class="pay-way-havetext">{{indexData.buy_data[1].title}}</div>
      <div class="pay-way-havepaytime">{{indexData.buy_data[1].content}}</div>
    </div>
    <div class="line2"></div>

    <div class="pay-way-way">
      <div class="pay-way-auto">{{indexData.buy_data[2].title}}</div>
      <div class="pay-way-cut">{{indexData.buy_data[2].second_title}}</div>
      <div class="pay-way-switch">
        <van-switch v-model="checked" active-color="#6ED169" size="24px" />
      </div>
    </div>

    <div class="line2"></div>
    <div class="pay-way-way">
      <div class="pay-way-havepay">{{indexData.buy_data[3].title}}</div>
      <div class="pay-way-havepaymoney">{{indexData.buy_data[3].content}}</div>
    </div>
  </div>
  <div class="want_pay">{{indexData.card_data.title}}</div>
  <div class="want_pay_way" v-for="(item,index) in indexData.card_data.list" :style="{backgroundImage: 'url(' + (index == cardIndex?item.check_bjimg:item.bjimg) + ')', backgroundSize:'100% 100%'}" @click="changeCard(item,index)">
    <div class="want_pay_topbg" :style="{backgroundImage: 'url(' + item.label_img + ')', backgroundSize:'100% 100%'}"></div>
    <div class="want_pay_cardtime">{{item.str}}</div>
    <div class="want_pay_cardtip">{{item.info}}</div>
    <div class="want_pay_cardmoney">
      <span class="money_s">¥</span><span class="money_b">{{item.price}}</span>
    </div>
    <div class="want_pay_price">原价:¥{{item.cost_price}}</div>
  </div>


  <div v-if="!checked">
    <div class="renew_way">{{indexData.pay_data.title}}</div>
    <div class="renew_waybox">
      <div v-for="(item,index) in indexData.pay_data.list">
        <div class="pay_way_1" @click="selectPay(item,index)">
          <div class="pay_way_img" :style="{backgroundImage: 'url(' + item.img + ')'}">
          </div>
          <div class="pay_way_way">{{item.str}}</div>
          <div class="have_yue" v-if="showYue">
               {{item.info}}
          </div>
          <div class="pay_select">
            <div   v-bind:class="[index==payIndex? payClass : paynoClass]"></div>
          </div>
        </div>
        <div class="line2" v-if="index!=(indexData.pay_data.list.length-'1')"></div>
    </div>

<!--      <div class="line2"></div>-->

    </div>
  </div>

    <div class="warm" v-if="checked">
      <div class="warm_img" :style="{backgroundImage: 'url(' + indexData.ico + ')', backgroundSize:'100% 100%'}"></div>
      <div class="warm_text">
        {{indexData.info1}}
      </div>
    </div>
  </div>

  <footer>
    <div class="buy_buttom" :style="{backgroundImage: 'url(' + indexData.btn_img + ')', backgroundSize:'100% 100%'}" v-if="!checked" @click="toPay">
      <!--    <div class="buttom_text">立即购买</div>-->
    </div>
    <div class="buy_buttom" :style="{backgroundImage: 'url(' + indexData.btn_img1 + ')', backgroundSize:'100% 100%'}" v-if="checked" @click="toXiugai">
      <!--    <div class="buttom_text">立即购买</div>-->
    </div>
  </footer>


</div>

</template>

<script>
    import FNImageBanner from "../components/common/FNImageBanner"
    import { Toast } from 'vant';
    export default {
        name: "Renew",
        components:{
            FNImageBanner,


        },
        data() {
            return {
                value: 1,
                showYue:true,
                payIndex:"0",
                payImg:require('../assets/ShareUpdateDui.png'),
                payClass: 'payClass',
                paynoClass: 'paynoClass',
                agree:false,
                index:"",
                checked:false,
                agreeClass:'pay_left_select',
                agreenotClass:'pay_left_notselect',
                indexData:"",
                btn_img:"",
                cardIndex:"",
                cid:"1",
                options :{
                    title: '', // 默认无标题
                    yes: {
                        text: '确定',
                        style: {}
                    },
                    no: {
                        text: '取消',
                        style: {}
                    }
                }
            };
        },
        created(){
            this.getIndexData()
        },



        methods: {
            changeAgree() {
                this.agree=!this.agree


            },
            getIndexData() {
                this.GET('?mod=appapi&act=share_app&ctrl=xufei',{
                    version:this.$route.params.version,
                    platform:this.$route.params.platform,
                    is_toweixin:this.$route.params.is_toweixin
                },(res)=>{
                    console.log(res.data)
                    this.indexData = res.data.data
                    this.checked =Boolean(Number(res.data.data.buy_data[2].is_auto))
                    console.log(this.checked)
                    this.btn_img =res.data.data.btn_img
                    this.payType = res.data.data.pay_data.list[0].type
                    for (let i = 0;i<res.data.data.card_data.list.length;i++){
                            if(res.data.data.card_data.list[i].is_check==1){
                                this.cardIndex=i
                                this.cid=i+1
                            }
                    }



                })
            },
            selectPay(item,index){
                this.payIndex = index
                this.payType=  item.type

            },
            changeCard(item,index){
              this.cardIndex=index

                this.cid= item.id
                console.log(this.cid,this.cardIndex)


            },
            toPay(){
                this.isLogin(()=>{
                        this.$confirm({
                            title: '提示',
                            content: '确定支付吗',
                            yesText: '取消',
                            noText:"确定"
                        }).then(()=>{
                            console.log(123)
                        }).catch(()=>{

                            this.GET('?mod=appapi&act=share_app&ctrl=create_order', {
                                gid: this.cid,
                                num: 1,
                                is_xufei:1,
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
                                    console.log(res.data)
                                    if(res.data.success==1) {
                                        if (this.$route.params.platform == 'wap') {
                                            if (this.payType == "wx") {
                                                console.log("go wx1")
                                                window.location.href=res.data.data.url


                                            }
                                            if (this.payType == "zfb") {
                                                console.log("go zfb1")
                                                window.location.href=res.data.data.url
                                            }
                                            if (this.payType == "yue") {
                                                // Toast.success('余额支付成功');
                                                console.log("go yue")
                                                window.location.href=res.data.data.url
                                            }

                                        } else {

                                        if (this.payType == "wx") {
                                            console.log("go wx")
                                            this.appOpenWeb(res.data.data, "wechat_pay")

                                        }
                                        if (this.payType == "zfb") {
                                            console.log("go zfb")
                                            this.appOpenWeb(res.data.data, "alipay_topay")
                                        }
                                        if (this.payType == "yue") {
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


                                })


                            })
                        })



                })

            },
            toXiugai(){
                this.isLogin(()=>{
                    this.$confirm({
                        title: '提示',
                        content: '确定修改吗',
                        yesText: '取消',
                        noText:"确定"
                    }).then(()=>{
                        console.log(123)
                    }).catch(()=>{
                        this.GET('?mod=appapi&act=share_app&ctrl=update_xufei', {
                            gid: this.cid,
                            is_auto: Number(this.checked),
                            version:this.$route.params.version,
                            platform:this.$route.params.platform,
                            is_toweixin:this.$route.params.is_toweixin
                        }, (res) => {
                            console.log(res.data)
                            this.$alert({
                                title: '提示',
                                content: res.data.msg
                            });


                        })
                    })





                })



            },
            backto(){
                this.$router.go(-1)
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
  footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(88px + constant(safe-area-inset-bottom));
        height: calc(88px + env(safe-area-inset-bottom));
  }

  .name_icon{
    position: absolute;
    top: 55px;
    left: 167px;
height: 38px;
    width: 560px;
  }
  .renew_top{
    width: 100%;
    height: 160px;
    /*background: black;*/
position: relative;
  }
  .renew_top_text{
    font-size:36px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:42px;
    position: absolute;
    left: 300px;
  }
  .renew_top_img{
    position: absolute;
    width:90px;
    height:90px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(166,166,166,1);
    border-radius:50%;
    left: 52px;
    bottom: 22px;
  }
  .renew_top_name{
    /*position: absolute;*/
    float: left;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:40px;
    /*left: 167px;*/
    /*bottom: 72px;*/
  }

  .renew_top_year{
    position: relative;
    margin-top: 5px;
    width: 90px;
    height: 30px;
    /*font-size:30px;*/
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:40px;
    /*left: 278px;*/
    float: left;
    /*bottom: 70px;*/

  }
  .top_year_text{
position: absolute;
    top: -5px;
    left: 36px;
    font-size:12px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(235,174,28,1);
    line-height:40px;
  }
  .renew_top_time{
    position: absolute;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(190,189,189,1);
    line-height:24px;
    left: 166px;
    bottom: 30px;

  }

  .pay-way{
    width:702px;
    height:384px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 24px 0px rgba(34,33,38,0.1);
    border-radius:17px;
    margin-left: 27px;
    margin-top: 23px;
  }
  .pay-way-way{

    display: flex;
height: 95px;
    width: 100%;
    position: relative;
  }

  .line2{
    width:706px;
    height:2px;
    background:rgba(238,238,238,1);
  }
  .pay-way-text{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(39,39,41,1);
    line-height:40px;
    margin-left: 25px;
  }
  .pay-way-from{
    position: absolute;
    right: 30px;
    top: 30px;
      display: flex;
      align-items: center;
      justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(235,174,28,1);
    line-height:40px;
    margin-left: 370px;
    }
  .pay-way-havetext{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(39,39,41,1);
    line-height:40px;
    margin-left: 25px;
  }
  .pay-way-havepaytime{
    position: absolute;
    right: 30px;
    top: 30px;
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(235,174,28,1);
    line-height:40px;
    margin-left: 370px;
  }
  .pay-way-auto{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(39,39,41,1);
    line-height:40px;
    margin-left: 25px;
  }
  .pay-way-cut{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(158,154,154,1);
    line-height:42px;
    margin-left: 17px;
  }
  .pay-way-switch{
    position: absolute;
    right: 30px;
    top: 20px;
    display: flex;
    align-items: center;
    justify-items: center;
    margin-left: 140px;
  }
  .pay-way-havepay{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(39,39,41,1);
    line-height:40px;
    margin-left: 25px;
  }
  .pay-way-havepaymoney{
    position: absolute;
    right: 30px;
    top: 30px;
    display: flex;
    align-items: center;
    justify-items: center;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(235,174,28,1);
    line-height:40px;
    margin-left: 370px;
  }
  .want_pay{
    margin-left: 34px;
    margin-top: 38px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(44,44,46,1);
    line-height:40px;
  }
  .want_pay_way{
width: 691px;
    height: 150px;
    position: relative;
    margin-top: 46px;
    margin-left: auto;
    margin-right: auto;

  }
.want_pay_topbg{
  position: absolute;
  width: 135px;
  height: 42px;

  top: -21px;
}
  .want_pay_cardtime{
    position: absolute;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(38,37,42,1);
    line-height:42px;
top: 46px;
    left: 36px;
  }
  .want_pay_cardtip{
    position: absolute;
    left: 39px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(79,79,81,1);
    line-height:42px;
    top: 100px;
  }
  .want_pay_cardmoney{
    position: absolute;
    left: 519px;
    top: 60px;

  }
  .money_s{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(250,82,70,1);
    line-height:42px;
  }
  .money_b{

    font-size:36px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(250,82,70,1);
    line-height:42px;
  }
  .want_pay_price{
    position: absolute;
    left: 510px;
    top: 100px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(79,79,81,1);
    line-height:42px;
  }
  .renew_way{
margin-left: 56px;
    margin-top: 24px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(34,34,39,1);
    line-height:42px;
  }
  .renew_waybox{
  width: 707px;
    /*height: 272px;*/
margin-top: 24px;
    margin-bottom: 140px;
    margin-left: auto;
    margin-right: auto;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 24px 0px rgba(34,33,38,0.1);
    border-radius:26px;
  }



  .pay_way_1{
    display: flex;
    width: 100%;
    height: 90px;
    position: relative;
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
  }
  .pay_select{
    display: flex;
    align-items: center;
    justify-items: center;
    /*margin-left: 230px;*/

    position: absolute;
    right: 30px;
    top: 21px;
  }
  .pay_select_dui{
    width: 40px;
    height: 40px;
    background-size:100% 100%;


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


  .warm{
    height: 80px;
    margin-top: 35px;
    position: relative;
    margin-bottom: 100px;
  }
  .warm_img{
    width: 32px;
    height: 32px;
    position: absolute;
    left: 35px;
  }
  .warm_text{
    width: 612px;
    /*height: 63px;*/
position: absolute;
    left: 78px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(254,94,77,1);
    line-height:40px;
  }
  .buy_buttom{
    height: 95px;
    width: 100%;
    /*background-color: red;*/
    text-align: center;
    position: fixed;
    bottom: 0;
    　left: 0;
    　right:0;
    opacity: 0.9;
  }
  .buttom_text{
    padding-top: 30px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:white;
    line-height:42px;
  }
</style>
