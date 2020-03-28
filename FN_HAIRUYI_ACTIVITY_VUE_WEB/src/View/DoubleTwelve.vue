<template>
  <div class="PreSell col" v-wechat-title="title">
    <div class="sell_top" :style="{backgroundImage: 'url(' + indexData.top_img + ')', backgroundSize:'100% 100%'}"></div>

    <div class="sell_mid" :style="{backgroundImage: 'url(' + indexData.first_list.bj_img + ')', backgroundSize:'100% 100%'}" v-if="first_list_show">
      <div class="wanfa" :style="{backgroundImage: 'url(' + indexData.first_list.bj_img1 + ')', backgroundSize:'100% 100%'}">
        <div class="wanfa_img" :style="{backgroundImage: 'url(' + indexData.first_list.ico + ')', backgroundSize:'100% 100%'}"></div>
        <div class="open_time1">{{indexData.first_list.str}}</div>
        <div class="end_time1">{{indexData.first_list.str1}}</div>
        <div class="riqi_img" :style="{backgroundImage: 'url(' + indexData.first_list.list_img + ')', backgroundSize:'100% 100%'}"></div>
        <div class="left_bg" :style="{backgroundImage: 'url(' + indexData.second_list.label_img + ')', backgroundSize:'100% 100%'}">
          <span class="left_bgtext">{{indexData.first_list.label_str}}</span>
        </div>
        <div class="rule_box">
          <div class="redbg" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[0].img + ')', backgroundSize:'100% 100%'}"><span class="redbg_num">{{indexData.first_list.flow_list[0].num}}</span></div>
          <div class="rule_info">{{indexData.first_list.flow_list[0].str}}</div>
          <div class="rule_info1">{{indexData.first_list.flow_list[0].str1}}</div>
        </div>

        <div class="rule_box">
          <div class="redbg" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[0].img + ')', backgroundSize:'100% 100%'}"><span class="redbg_num">{{indexData.first_list.flow_list[1].num}}</span></div>
          <div class="rule_info">{{indexData.first_list.flow_list[1].str}}</div>
          <div class="rule_info1">{{indexData.first_list.flow_list[1].str1}}</div>
          <div class="day_box">
            <div class="day_item" v-for="item in indexData.first_list.flow_list[1].time_list" :style="{backgroundImage: 'url(' + item.img + ')', backgroundSize:'100% 100%',color:'#'+item.str_color}">
              <span style="font-size:15px;font-family:PingFang SC;font-weight:800;color:rgba(210,29,6,1);">{{item.str}}</span>
            </div>
            <!--            <div class="day_item"><span style="font-size:15px;font-family:PingFang SC;font-weight:800;color:rgba(210,29,6,1);">10月21日</span></div>-->
            <!--            <div class="day_item"><span style="font-size:15px;font-family:PingFang SC;font-weight:800;color:rgba(210,29,6,1);">10月21日</span></div>-->
            <!--            <div class="day_item"><span style="font-size:15px;font-family:PingFang SC;font-weight:800;color:rgba(210,29,6,1);">10月21日</span></div>-->
            <!--            <div class="day_item"><span style="font-size:15px;font-family:PingFang SC;font-weight:800;color:rgba(210,29,6,1);">10月21日</span></div>-->
            <!--            <div class="day_item"><span style="font-size:15px;font-family:PingFang SC;font-weight:800;color:rgba(210,29,6,1);">10月21日</span></div>-->
            <!--            <div class="day_item"><span style="font-size:15px;font-family:PingFang SC;font-weight:800;color:rgba(210,29,6,1);">10月21日</span></div>-->
            <!--            <div class="day_item"><span style="font-size:15px;font-family:PingFang SC;font-weight:800;color:rgba(210,29,6,1);">10月21日</span></div>-->
          </div>
        </div>

        <div class="rule_box">
          <div class="redbg" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[0].img + ')', backgroundSize:'100% 100%'}"><span class="redbg_num">{{indexData.first_list.flow_list[2].num}}</span></div>
          <!--          <span class="rule_info2">21日当天红包最大，一定要季的0点蹲点抢！</span>-->
          <div class="rule_info">{{indexData.first_list.flow_list[2].str}}</div>
        </div>

        <div class="tip">{{indexData.first_list.flow_list[2].str1}}</div>
        <div class="tip">{{indexData.first_list.flow_list[2].str2}}</div>
        <div class="click_lingqu" @click="Lingqu" :style="{backgroundImage: 'url(' + indexData.first_list.flow_list[2].btn_img + ')', backgroundSize:'100% 100%'}"></div>
        <div class="tip1">{{indexData.first_list.flow_list[2].str3}}</div>

      </div>
    </div>

    <div class="sell_mid1" :style="{backgroundImage: 'url(' + indexData.second_list.bj_img + ')', backgroundSize:'100% 100%'}" v-if="second_list_show">
      <div class="zhuanqian" :style="{backgroundImage: 'url(' + indexData.second_list.bj_img1 + ')', backgroundSize:'100% 100%'}">
        <div class="left_bg1" :style="{backgroundImage: 'url(' + indexData.second_list.label_img + ')', backgroundSize:'100% 100%'}">
          <span class="left_bgtext" :style="{color:'#'+indexData.second_list.label_str_color}">{{indexData.second_list.label_str}}</span>
        </div>
        <div class="rule_box">
          <div class="redbg" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[0].img + ')', backgroundSize:'100% 100%'}"><span class="redbg_num">{{indexData.second_list.flow_list[0].num}}</span></div>
          <div class="rule_info">{{indexData.second_list.flow_list[0].str}}</div>
        </div>
        <div class="rule_box">
          <div class="redbg" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[1].img + ')', backgroundSize:'100% 100%'}"><span class="redbg_num">{{indexData.second_list.flow_list[1].num}}</span></div>
          <div class="rule_info">{{indexData.second_list.flow_list[1].str}}</div>
        </div>
        <div class="rule_box">
          <div class="redbg" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[2].img + ')', backgroundSize:'100% 100%'}"><span class="redbg_num">{{indexData.second_list.flow_list[2].num}}</span></div>
          <div class="rule_info">{{indexData.second_list.flow_list[2].str}}</div>
        </div>
        <div class="tip">{{indexData.second_list.flow_list[2].str1}}</div>
        <div class="anli_img" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[2].img1 + ')', backgroundSize:'100% 100%'}"></div>
        <div class="copy_info">{{indexData.second_list.flow_list[2].str2}}</div>
        <div class="copy_kl" @click="CopyKl" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[2].img2 + ')', backgroundSize:'100% 100%'}"></div>
      </div>
    </div>

    <div class="sell_mid2" :style="{backgroundImage: 'url(' + indexData.third_list.bj_img + ')', backgroundSize:'100% 100%'}" v-if="third_list_show">
      <div class="yushou_rule" :style="{backgroundImage: 'url(' + indexData.third_list.bj_img1 + ')', backgroundSize:'100% 100%'}">
        <div class="wanfa_img1" :style="{backgroundImage: 'url(' + indexData.third_list.ico + ')', backgroundSize:'100% 100%'}"></div>
        <div class="open_time1">{{indexData.third_list.str}}</div>
        <div class="end_time1">{{indexData.third_list.str1}}</div>
        <div class="left_bg1" :style="{backgroundImage: 'url(' + indexData.third_list.label_img + ')', backgroundSize:'100% 100%'}">
          <span class="left_bgtext" :style="{color:'#'+indexData.third_list.label_str_color}">{{indexData.third_list.label_str}}</span>
        </div>
        <div class="youhui_text">{{indexData.third_list.flow_str}}</div>
        <div class="youhuiquan" :style="{backgroundImage: 'url(' + indexData.third_list.flow_img + ')', backgroundSize:'100% 100%'}"></div>
        <div class="left_bg2" :style="{backgroundImage: 'url(' + indexData.third_list.label_img + ')', backgroundSize:'100% 100%'}">
          <span class="left_bgtext" :style="{color:'#'+indexData.third_list.label_str1_color}">{{indexData.third_list.label_str1}}</span>
        </div>
        <div class="rule_box">
          <div class="redbg" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[2].img + ')', backgroundSize:'100% 100%'}"><span class="redbg_num">{{indexData.third_list.flow_list[0].num}}</span></div>
          <div class="rule_info">{{indexData.third_list.flow_list[0].str}}</div>
        </div>
        <div class="rule_box">
          <div class="redbg" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[2].img + ')', backgroundSize:'100% 100%'}"><span class="redbg_num">{{indexData.second_list.flow_list[1].num}}</span></div>
          <div class="rule_info">{{indexData.third_list.flow_list[1].str}}</div>
        </div>
        <div class="rule_box">
          <div class="redbg" :style="{backgroundImage: 'url(' + indexData.second_list.flow_list[2].img + ')', backgroundSize:'100% 100%'}"><span class="redbg_num">{{indexData.third_list.flow_list[2].num}}</span></div>
          <div class="rule_info">{{indexData.third_list.flow_list[2].str}}</div>
        </div>
        <div class="liji_copy_kl" @click="CopyKl1" :style="{backgroundImage: 'url(' + indexData.third_list.flow_list[2].img1 + ')', backgroundSize:'100% 100%'}"></div>
      </div>
    </div>

    <div class="red_packet" :style="{backgroundImage: 'url(' + indexData.six_list.bj_img + ')', backgroundSize:'100% 100%'}" v-if="six_list_show">
      <div class="red_packet1" :style="{backgroundImage: 'url(' + indexData.six_list.bj_img1 + ')', backgroundSize:'100% 100%'}">
        <div class="wanfa_img3" :style="{backgroundImage: 'url(' + indexData.six_list.label_img + ')', backgroundSize:'100% 100%'}"></div>
        <div class="flow_wrap">
          <div v-for="(item,index) in indexData.six_list.flow_list" :key="index">
            <div class="flow_item" :style="{backgroundImage: 'url(' + item.img + ')', backgroundSize:'100% 100%'}" >
              <div class="flow_date" :style="{color:'#'+item.str_color}">{{item.str}}</div>
              <div class="str_wrap">
                <div class="flow_str" :style="{color:'#'+item.str1_color}">{{item.str1}}</div>
                <div class="flow_str" :style="{color:'#'+item.str2_color}">{{item.str2}}</div>
              </div>

            </div>
          </div>



        </div>
        <div class="bottom_text" :style="{color:'#'+indexData.six_list.bottom_str_color}">{{indexData.six_list.bottom_str}}</div>

<!--        <div class="open_time1">{{indexData.five_list.str}}</div>-->
<!--        <div class="yuanwang_img1" @click="ToYuanwang1" :style="{backgroundImage: 'url(' + indexData.five_list.img + ')', backgroundSize:'100% 100%'}"></div>-->
      </div>
    </div>

    <div class="sell_mid3" :style="{backgroundImage: 'url(' + indexData.four_list.bj_img + ')', backgroundSize:'100% 100%'}" v-if="four_list_show">
      <div class="yuanwang" :style="{backgroundImage: 'url(' + indexData.four_list.bj_img1 + ')', backgroundSize:'100% 100%'}">
        <div class="wanfa_img2" :style="{backgroundImage: 'url(' + indexData.four_list.ico + ')', backgroundSize:'100% 100%'}"></div>
        <div class="open_time1">{{indexData.four_list.str}}</div>
        <div class="yuanwang_img" @click="ToYuanwang" :style="{backgroundImage: 'url(' + indexData.four_list.img + ')', backgroundSize:'100% 100%'}"></div>
      </div>
    </div>


    <div class="sell_bottom" :style="{backgroundImage: 'url(' + indexData.five_list.bj_img + ')', backgroundSize:'100% 100%'}" v-if="five_list_show">
      <div class="rukou" :style="{backgroundImage: 'url(' + indexData.five_list.bj_img1 + ')', backgroundSize:'100% 100%'}">
        <div class="wanfa_img3" :style="{backgroundImage: 'url(' + indexData.five_list.ico + ')', backgroundSize:'100% 100%'}"></div>
        <div class="open_time1">{{indexData.five_list.str}}</div>
        <div class="yuanwang_img1" @click="ToYuanwang1" :style="{backgroundImage: 'url(' + indexData.five_list.img + ')', backgroundSize:'100% 100%'}"></div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "DoubleTwelve",
        data(){

            return{
                title:'加载中',
                indexData:"",
                copyText:"",
                first_list_show:"",
                second_list_show:"",
                third_list_show:"",
                four_list_show:"",
                five_list_show:"",
                six_list_show:"",





            }
        },
        created(){
            this.getIndexdata()

        },
        mounted(){
            //操作数据


        },
        methods: {
            getIndexdata(){
                this.GET('?mod=appapi&act=tmActivity&ctrl=strategy_index',{
                    SkipUIIdentifier:this.$route.params.SkipUIIdentifier,
                    show_type_str:this.$route.params.show_type_str,
                    platform:this.$route.params.platform,

                },(res)=>{
                    if (res.data.success==0){
                        // document.getElementById("wrap_img").style.visibility="hidden"
                        // document.getElementById("wrap_wrap").style.display="none"
                        // document.getElementById("share_icon").style.display=none
                        this.$alert({
                            title: '提示',
                            content: res.data.msg
                        })

                    }

                    console.log(res.data)

                    this.indexData = res.data.data
                    this.title=res.data.data.title
                    this.first_list_show=res.data.data.first_list.is_show
                    this.second_list_show=res.data.data.second_list.is_show
                    this.third_list_show=res.data.data.third_list.is_show
                    this.four_list_show=res.data.data.four_list.is_show
                    this.five_list_show=res.data.data.five_list.is_show
                    this.six_list_show=res.data.data.six_list.is_show


                })

            },
            Lingqu(){
                this.appOpenWeb({
                    is_need_login: "1",
                    SkipUIIdentifier: this.indexData.first_list.flow_list[2].SkipUIIdentifier,
                    show_type_str: "",
                    url: this.indexData.first_list.flow_list[2].url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                }, 'jump_SkipUIIdentifier')
            },
            CopyKl(){
                console.log(this.indexData.second_list.flow_list[2].tkl_content)
                var text = this.indexData.second_list.flow_list[2].tkl_content
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
                    title: '口令已复制',
                    content: this.indexData.second_list.flow_list[2].tkl_content
                })
            },
            CopyKl1(){
                console.log(this.indexData.third_list.flow_list[2].SkipUIIdentifier)
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: this.indexData.third_list.flow_list[2].SkipUIIdentifier,
                    show_type_str:"",
                    url: this.indexData.third_list.flow_list[2].url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                },'jump_SkipUIIdentifier')
            },
            ToYuanwang(){
                this.appOpenWeb({
                    is_need_login: "1",
                    SkipUIIdentifier: this.indexData.four_list.SkipUIIdentifier,
                    show_type_str: "",
                    url: this.indexData.four_list.url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                }, 'jump_SkipUIIdentifier')
            },
            ToYuanwang1(){
                this.appOpenWeb({
                    is_need_login: "1",
                    SkipUIIdentifier: this.indexData.five_list.SkipUIIdentifier,
                    show_type_str: "",
                    url: this.indexData.five_list.url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                }, 'jump_SkipUIIdentifier')
            },

        }
    }
</script>

<style scoped>
  .flow_wrap{
    width: 100%;
    height: 370px;

  }
  .flow_item{
    float: left;
    margin-top: 30px;
    margin-left: 37px;
    width: 186px;
    height: 156px;
    /*display: flex;*/
    /*justify-content: center;*/
    /*flex-direction: column;*/

  }
  .flow_date{
    /*height: 21px;*/
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(255,255,255,1);
    text-align: center;


  }
  .str_wrap{
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .flow_str{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(251,212,37,1);
  }
.bottom_text{
  margin-top: 40px;
  text-align: center;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(16,15,15,1);
}
  .rule_box{
    position: relative;
  }
  .sell_top{
    width: 100%;
    height: 658.9px;
    position: relative;
    /*background-image: url("../assets/a5767.png");*/
    /*background-size: 100% 100%;*/
  }
  .sell_mid{
    width: 100%;
    height:1285px;
    position: relative;
    /*background-image: url("../assets/a09.png");*/
    /*background-size: 100% 100%;*/
  }
  .wanfa{
    width: 705px;
    height:1287px;
    position: relative;
    /*background-image: url("../assets/a22.png");*/
    /*background-size: 100% 100%;*/
    margin-right: auto;
    margin-left: auto;

  }
  .sell_mid1{

    width: 100%;
    height:1211px;
    position: relative;
    /*background-image: url("../assets/a010.png");*/
    /*background-size: 100% 100%;*/
  }
  .zhuanqian{
    margin-top: 9px;
    margin-right: auto;
    margin-left: auto;
    width: 704px;
    height:1194px;
    position: relative;
    /*background-image: url("../assets/tuceng13.png");*/
    /*background-size: 100% 100%;*/
  }
  .sell_mid2{
    width: 100%;
    height:1206px;
    position: relative;

  }
  .yushou_rule{
    margin-top: 9px;
    margin-right: auto;
    margin-left: auto;
    width: 704px;
    height:1196px;
    position: relative;

  }
  .click_lingqu{
    margin-top: 15px;
    margin-right: auto;
    margin-left: auto;
    width: 342px;
    height:75px;
    position: relative;

  }
  .copy_kl{
    margin-top: 15px;
    margin-right: auto;
    margin-left: auto;
    width: 342px;
    height:75px;
    position: relative;
    /*background-image: url("../assets/copyshare.png");*/
    /*background-size: 100% 100%;*/
  }
  .liji_copy_kl{
    margin-top: 15px;
    margin-right: auto;
    margin-left: auto;
    width: 342px;
    height:75px;
    position: relative;

  }
  .sell_mid3{
    width: 100%;
    height:530px;
    position: relative;

  }
  .yuanwang{
    margin-top: 17px;
    margin-right: auto;
    margin-left: auto;
    width: 704px;
    height:506px;
    position: relative;

  }
  .sell_bottom{
    width: 100%;
    height:766px;
    position: relative;

  }
  .red_packet{

    width: 100%;
    height:567px;
    position: relative;

  }
  .rukou{
    margin-top: 9px;
    margin-right: auto;
    margin-left: auto;
    width: 704px;
    height:506px;
    position: relative;

  }
  .red_packet1{
    margin-top: 9px;
    margin-right: auto;
    margin-left: auto;
    width: 704px;
    height:567px;
    position: relative;

  }
  .wanfa_img{
    width: 266px;
    height: 37px;
    position: relative;
    display: inline-block;
    margin-top: 39px;
    margin-left: 218px;
  }
  .wanfa_img1{
    width: 266px;
    height: 37px;
    position: relative;

    display: inline-block;
    margin-top: 39px;
    margin-left: 218px;
  }
  .wanfa_img2{
    width: 266px;
    height: 37px;
    position: relative;

    display: inline-block;
    margin-top: 39px;
    margin-left: 218px;
  }
  .wanfa_img3{
    width: 266px;
    height: 37px;
    position: relative;

    display: inline-block;
    margin-top: 39px;
    margin-left: 218px;
  }
  .open_time1{
    text-align: center;
    width:610px;
    /*height:29px;*/
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(16,16,15,1);
    line-height:60px;
    margin-left: auto;
    margin-right: auto;
  }
  .end_time1{
    width:589px;
    text-align: center;
    /*height:29px;*/
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(16,16,15,1);
    line-height:60px;
    margin-left: auto;
    margin-right: auto;
  }
  .riqi_img{
    width: 663px;
    height: 118px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    /*display: inline-block;*/
    margin-top: 9px;
    /*margin-left: 218px;*/
  }
  .left_bg{
    margin-top: 28px;
    width: 263px;
    height: 101px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left_bg1{
    margin-top: 36px;
    width: 263px;
    height: 101px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left_bg2{
    margin-top: 28px;
    width: 293px;
    height: 101px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left_bgtext{
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(255,255,255,1);
    /*line-height:60px;*/
  }
  .redbg{
    display: inline-block;
    /*justify-content: center;*/
    margin-top: 24px;
    margin-left: 38px;
    width: 54px;
    height: 53px;
    /*background-image: url("../assets/redbg.png");*/
    /*background-size: 100% 100%;*/

  }
  .redbg_num{
    font-size:36px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(255,255,255,1);
    margin-left: 31%;
  }
  .rule_info{
    margin-left: 11px;
    display: inline-block;
    /*width:470px;*/
    font-size:29.5px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(34,34,36,1);
  }
  .rule_info1{
    margin-left: 113px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(39,38,36,1);
    line-height:60px;
  }
  .rule_info2{
    width: 532px;
    margin-left: 21px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(34,34,36,1);
  }
  .day_box{
    width: 560px;
    margin-left: 53px;
    margin-top: 3px;
    display: flex;
    flex-wrap: wrap;
  }
  .day_item{
    width: 151px;
    height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 35px;
    margin-top: 24px;
  }
  .tip{
    /*margin-left: 226px;*/
    text-align: center;
    margin-top: 14px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(210,29,6,1);
  }
  .tip1{
    margin-top: 10px;
    /*margin-left: 160px;*/
    text-align: center;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(250,94,75,1);
  }
  .anli_img{
    width: 629px;
    height: 529px;
    margin-top: 27px;
    /*background-image: url("../assets/anli.png");*/
    /*background-size: 100% 100%;*/
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .copy_info{
    margin-top: 25px;
    margin-left: 144px;
    margin-right: auto;
    /*width:480px;*/
    /*height:23px;*/
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(34,34,36,1);
    line-height:60px;
  }
  .youhui_text{
    margin-left: auto;
    margin-right: auto;
    width: 579px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(16,15,15,1);
    line-height:36px;
  }
  .youhuiquan{
    margin-top: 38px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 623px;
    height: 225px;

  }
  .yuanwang_img{
    margin-top: 18px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 654px;
    height: 318px;


  }
  .yuanwang_img1{
    margin-top: 18px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 654px;
    height: 318px;


  }
</style>
