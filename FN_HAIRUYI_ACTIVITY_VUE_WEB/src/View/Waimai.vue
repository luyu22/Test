<template>
  <div class="Waimai col" v-wechat-title="title">
    <div class="tuceng1" :style="{backgroundImage: 'url(' + indexData.list[0].bjimg + ')', backgroundSize:'100% 100%'}" v-if="indexData.list[0].bjimg">
      <div class="topwrap">
        <img :src="indexData.list[0].img" alt="" style="width: 100%;height: 100%">
      </div>

    </div>

    <div class="tuceng2" :style="{backgroundImage: 'url(' + indexData.list[1].bjimg + ')', backgroundSize:'100% 100%'}" v-if="indexData.list[1].bjimg">
      <div class="yongjin_warp">
        <img :src="indexData.list[1].img" alt="" style="width: 100%;height: 100%">
<!--        <div class="yongjin_text">-->
<!--          <div class="yongjin_info">-->
<!--            <span class="yongjin_infob">01.</span><span class="yongjin_infos">发现省钱好券</span><br>  <span class="grey_text">下单前先领优惠券</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="yongjin_text2">-->
<!--          <div class="yongjin_info">-->
<!--            <span class="yongjin_infos">使用优惠下单</span><span class="yongjin_infob">.02</span><br>  <span class="grey_text">结算前使用红包优惠抵扣部分现金</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="yongjin_text3">-->
<!--          <div class="yongjin_info">-->
<!--            <span class="yongjin_infob">03.</span><span class="yongjin_infos">下单成功返佣金</span><br>  <span class="grey_text">全员下单均有佣金</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>

    <div class="tuceng3" :style="{backgroundImage: 'url(' + indexData.list[2].bjimg + ')', backgroundSize:'100% 100%'}" v-if="indexData.list[2].bjimg">
      <div class="skyblue">
<!--        <div class="fanli_title">返利注意事项</div>-->
        <div class="fanli_content" v-html="indexData.list[2].content">
<!--          <span class="fanli_font" >-->
<!--          </span>-->
        </div>
      </div>
    </div>
    <div class="bottom_button" :style="{backgroundImage: 'url(' + indexData.list[3].bjimg + ')', backgroundSize:'100% 100%'}" v-if="indexData.list[3].bjimg">
      <div class="left_button" @click="share">
        <div :style="{backgroundImage: 'url(' + indexData.list[3].btn_list[0].img + ')', backgroundSize:'100% 100%'}" class="left_button_img"></div>
      </div>
      <div class="right_button" @click="xiadan">
        <div :style="{backgroundImage: 'url(' + indexData.list[3].btn_list[1].img + ')', backgroundSize:'100% 100%'}" class="right_button_img"></div>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        name: "Waimai",
        data(){

            return{
                title:'加载中',
                indexData:"",





            }
        },
        created(){
            this.getIndex()

        },
        mounted(){
          //操作数据
        },
        methods: {
          getIndex(){
              this.GET('?mod=appapi&act=takeOutActivity&ctrl=eleme',{
                  platform:this.$route.params.platform,

              },(res)=>{
                  console.log(res.data)
                  this.indexData = res.data.data
                  this.title=res.data.data.title

              })

          },
            share(){
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: this.indexData.list[3].btn_list[0].skip,
                    show_type_str:"",
                    url: "",
                    jsonInfo: `{"goods_source":"buy_eleme","gid":"1","outlink_style":"1","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF"}`
                },'jump_SkipUIIdentifier')
            },
            xiadan() {
              //如果是提示则中断不让跳转..
                if (this.indexData.list[3].btn_list[1].is_to_tip) {
                    this.$alert({
                        title: '提示',
                        content: this.indexData.list[3].btn_list[1].tip_str
                    })
                } else {
                this.appOpenWeb({
                    is_need_login: "1",
                    SkipUIIdentifier: this.indexData.list[3].btn_list[1].skip,
                    show_type_str: "",
                    url: this.indexData.list[3].btn_list[1].url,
                    jsonInfo: `{"goods_source":"buy_eleme","gid":"1","outlink_style":"1","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF"}`
                }, 'jump_SkipUIIdentifier')
               }
            },



        }
    }
</script>

<style scoped>
  .left_button_img{
    width: 100%;
    height: 100%;
  }
  .right_button_img{
    width: 100%;
    height: 100%;
  }
  .fanli_title{
    /*position: relative;*/
    margin-left: 32px;
    padding-top: 40px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(255,202,0,1);
  }
  .fanli_content{
    position: relative;
    width: 608px;
    /*height: 480px;*/
    margin-left: 32px;
    /*margin-bottom: 75px;*/
  }
  .fanli_font{
    display: inline-block;
    margin-bottom: 35px;
    font-size:20px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(240,207,110,1);
  }
.tuceng1{
  position: relative;
  width: 100%;
  height: 282px;

}
.tuceng2{
  position: relative;
  width: 100%;
  height: 863px;


}
.tuceng3{
  position: relative;
  width: 100%;
  /*height: 783px;*/

  padding-bottom: 111px;
}
.bottom_button{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 98px;

}
.skyblue{
  width: 658px;
  /*height: 642px;*/
  margin-left: 45px;
  margin-top: 30px;
  /*background-image: url("../assets/juxing52.png");*/
  /*background-size:100% 100%;*/
}
  .topwrap{
    position: absolute;
    left: 16px;
    top: 16px;
    height: 253px;
    width: 728px;
  }
  .yongjin_warp{
    margin-top: 1px;
    margin-left: 24px;
    width: 713px;
    height: 848px;

  }
  .yongjin_text{
    width: 250px;
    position: absolute;
    top: 195px;
    left: 419px;
  }
.yongjin_infob{
  font-size:36px;
  font-family:PingFang SC;
  font-weight:800;
  color:rgba(27,27,30,1);
}
  .yongjin_infos{
    font-size:28px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(27,27,30,1);
  }
  .grey_text{
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(209,209,213,1);
  }
.yongjin_text2{
  width: 250px;
  position: absolute;
  top: 393px;
  left: 115px;
}
  .yongjin_text3{
    width: 250px;
    position: absolute;
    top: 641px;
    left: 408px;
  }
  .left_button{
    float: left;
    margin-top: 18px;
    margin-left: 84px;
    width: 242px;
    height: 66px;

  }
.right_button{
float: right;
  margin-right: 66px;
  margin-top: 16px;
  width: 242px;
  height: 66px;

}
</style>
