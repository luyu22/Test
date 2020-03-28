<template>
  <div class="ShareCenter col" v-wechat-title="memData.title">
    <div class="top_back" v-if="this.$route.params.is_toweixin==0&&this.$route.params.platform=='wap'">
      <div class="back_arrow" @click="backto"></div>
      <div class="topspan_text">{{memData.title}}</div>
    </div>
    <div class="header">
      <div class="header_img"  :style="{backgroundImage: 'url(' + memData.head_img + ')', backgroundSize:'100% 100%'}"></div>
      <div class="header_name">{{memData.info}}</div>
      <div class="header_earn">
<!--        嗨如意已为您赚 <span class="header_earn_money">4521.5</span> 元-->
        {{memData.info1}}
      </div>
    </div>

    <div class="card_xu" :style="{backgroundImage: 'url(' + memData.use_data.bj_img + ')', backgroundSize:'100% 100%'}">
      <div class="card_name" >{{memData.use_data.str}}</div>
      <div class="card_isauto">{{memData.use_data.str1}}</div>
      <div class="card_time">{{memData.use_data.time_str}}</div>
      <div class="card_open" :style="{backgroundImage: 'url(' + memData.use_data.font_img + ')', backgroundSize:'100% 100%'}" @click="toXufei"></div>
    </div>

    <div class="my_money">
      <span class="my_money_name">{{memData.money_data.str}}</span>

      <span class="my_money_detail">{{memData.money_data.str1}}</span>
    </div>

    <div class="money_box_wrap" >
      <div class="money_box" v-for="item in memData.money_data.list">
        <div class="money_box_toptext">{{item.val}}</div>
        <div class="money_box_bottext">{{item.name}}</div>
      </div>

    </div>

    <div class="my_quanyi">{{memData.mine_data.title}}</div>
    <div style="width: 100%;" >
      <div class="quanyi_img" v-for="item in memData.mine_data.list" :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'100% 100%'}"></div>

    </div>

    <div class="my_detail">{{memData.mem_pc_data.title}}</div>
    <div class="look_detail" :style="{backgroundImage: 'url(' + memData.mem_pc_data.bj_img + ')', backgroundSize:'100% 100%'}">
      <div class="look_detail_title" >{{memData.mem_pc_data.str}}</div>
      <div class="look_detail_url" v-model="copyText">{{copyText}}</div>
      <div class="look_detail_copy" @click="copy" :style="{backgroundImage: 'url(' + memData.mem_pc_data.btn_img + ')', backgroundSize:'100% 100%'}"></div>
    </div>

<!--    <div v-html="htmlData.str" class="htmlclass"> {{htmlData.str}}</div>-->










  </div>

</template>

<script>
    import { Toast } from 'vant';

    export default {
        name: "ShareCenter",
        data() {
            return {
                copyText:"http://hairuyi.com/admin/?mod=&actlogin&ctrl=index",
                memData:"",
                htmlData:""

            };
        },
        created(){
            this.getMemData()


        },
        methods: {
            copy(){

                    var text = this.copyText
                    var eleInput = document.createElement('input');
                    eleInput.value = text;
                    document.body.appendChild(eleInput);
                    // eleInput.style.position = 'absolute';
                // eleInput.style.top = '-999999px';
                    eleInput.select();
                eleInput.setSelectionRange(0, eleInput.value.length);//兼容IOS
                    document.execCommand("Copy")
                document.body.removeChild(eleInput);
                    // Toast.success('复制成功');
                this.$alert({
                    title: '提示',
                    content: '复制成功'
                })

            },
            getMemData() {
                this.GET('?mod=appapi&act=share_app&ctrl=mem_index',{
                    version:this.$route.params.version,
                    platform:this.$route.params.platform,
                    is_toweixin:this.$route.params.is_toweixin


                },(res)=>{
                    console.log(res.data)
                    this.memData = res.data.data
                    this.copyText =res.data.data.mem_pc_data.url


                })
            },
            toXufei(){

                if (this.$route.params.platform=='wap'){
                      console.log(111)
                    this.$router.push({
                        path: `/Renew/${this.$route.params.version}/${this.$route.params.platform}/${this.$route.params.is_toweixin}`,
                    })
                }else {
                    this.isLogin(()=>{
                        this.appOpenWeb({
                            is_need_login:"1",
                            SkipUIIdentifier: "pub_wailian",
                            show_type_str:"",
                            url: this.memData.use_data.url,
                            jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                        },'jump_SkipUIIdentifier')
                    })
                }


            },
            backto(){
                this.$router.go(-1)
            }
            // html(){
            //     this.GET('?mod=appapi&act=share_app&ctrl=html',{
            //
            //     },(res)=>{
            //         console.log(res.data)
            //         this.htmlData = res.data.data
            //
            //
            //
            //     })
            // }


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
.header{
  position: relative;
  width: 100%;
  height: 90px;
  margin-top: 67px;

}
  .header_img{
    position: absolute;
    width:90px;
    height:90px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(166,166,166,1);
    border-radius:50%;
    margin-left: 31px;
  }
  .header_name{
    height:33px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,0,0,1);
    line-height:40px;
    position: absolute;
    left: 137px;
    top: 3px;

  }
  .header_earn{
    position: absolute;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(37,36,30,1);
    line-height:40px;
    left: 137px;
    bottom: 10px;
  }
.header_earn_money{

  font-size:30px;
  font-family:PingFang SC;
  font-weight:bold;
  color:#FD5D32;
  line-height:40px;

}
  .card_xu{
    position: relative;
    height: 168px;
    width: 100%;
margin-top: 27px;

  }
  .card_name{
    position: absolute;
    font-size:36px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(215,110,12,1);
    line-height:40px;
    left: 81px;
    top: 32px;
  }
.card_isauto{
  position: absolute;
  font-size:18px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(215,110,12,1);
  line-height:40px;
  left: 248px;
  top: 49px;
}
.card_time{
  position: absolute;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(215,110,12,1);
  line-height:40px;
  left: 83px;
  bottom: 41px;
}
  .card_open{

    width: 144px;
    height: 50px;
    position: absolute;
    top: 63px;
    right: 43px;
  }
  .my_money{
    position: relative;
    height: 30px;
    width: 100%;
    margin-top: 46px;
  }
  .my_money_name{
    margin-left: 26px;
    height:30px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(12,12,12,1);
    line-height:40px;
  }
  .my_money_detail{

    height:18px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(140,139,139,1);
    line-height:40px;
  }
  .money_box_wrap{
    position: relative;
    width: 100%;
    height: 85px;
    margin-top: 55px;

  }
  .money_box{
    float: left;
    position: relative;
    width: 140px;
    height: 85px;
    /*margin-top: 55px;*/
    margin-left: 43px;
  }
  .money_box_toptext{
text-align: center;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(235,174,28,1);
    line-height:40px;
  }
  .money_box_bottext{
    position: absolute;
    bottom: 0;
    /*left: 10px;*/
    /*padding-top: 37px;*/
text-align: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(153,152,151,1);
    line-height:40px;
  }
  .my_quanyi{
    height: 29px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(12,12,12,1);
    line-height:40px;
    margin-top: 54px;
    margin-left: 26px;
  }
  .quanyi_img{
    float: left;
width: 200px;
    height: 254px;
    margin-left: 38px;
    margin-top: 3px;

  }
  .my_detail{

    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(12,12,12,1);
    line-height:40px;
    margin-top: 27px;
    margin-left: 26px;
  }
  .look_detail{
  position: relative;
    margin-top: 4px ;
width: 738px;
    height: 317px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 100px;

  }
  .look_detail_title{
     position: absolute;
     width: 595px;
     top: 59px;
     left: 55px;
     font-size:27px;
     font-family:PingFang SC;
     color:rgba(12,12,12,1);
     /*line-height:40px;*/
   }
.look_detail_url{
  position: absolute;
  /*width: 600px;*/
  top: 150px;
  left: 55px;
  font-size:25px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(127,127,127,1);
  line-height:40px;
}
  .look_detail_copy{
    width: 188px;
    height: 56px;

    position: absolute;
    left: 265px;
    bottom: 46px;
  }
</style>
