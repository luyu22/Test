<template>
  <div class="TaobaoAndJd col" v-wechat-title="title">
    <div class="tbbj"  :style="{backgroundImage: 'url(' + topImg + ')', backgroundSize:'100% 100%'}" @click="tbTopClick">

    </div>
<!--    <div class="tbbj" v-if="!showTbTop" :style="{backgroundImage: 'url(' + indexData.list[1].adv_list[0].img + ')', backgroundSize:'100% 100%'}" @click="jdTopClick">-->

<!--    </div>-->
    <div class="huichang" :style="{backgroundImage: 'url(' + indexData.list[0].bjimg + ')', backgroundSize:'100% 100%'}">
        <div class="huichang_wrap" >
          <div class="tb_text"  :style="{background:index==tabIndex?'#'+item.tab_check_bjcolor:'#'+item.tab_bjcolor,color:index==tabIndex?'#FFFFFF':'#C5443E'}" v-for="(item,index) in indexData.list " @click="ChangeTab(item,index)"  >
            <span id="tab_text">{{item.str}}</span>
          </div>
<!--          <div class="tb_text" @click="ChangeJd" :style="{fontWeight:fontWeight1,color:'#'+indexData.list[1].str_color}">淘宝会场</div>-->
<!--          <div class="tb_text" @click="ChangeTab" :style="{fontWeight:fontWeight1,color:'#'+indexData.list[1].str_color}">淘宝会场</div>-->
<!--          <span class="tb_text" @click="ChangeJd" :style="{fontWeight:fontWeight1,color:'#'+indexData[1].str_color}">淘宝</span>-->
        </div>
    </div>
    <div class="banner_wrap" :style="{backgroundImage: 'url(' + indexData.list[0].bjimg + ')', backgroundSize:'100% 100%'}">
      <div class="banner_img" v-for="item in listData" :style="{backgroundImage: 'url(' + item.img + ')', backgroundSize:'100% 100%'}" @click="bannerClick(item)"></div>

    </div>

    <div class="dibu_bg" :style="{background:'#'+indexData.color, backgroundSize:'100% 100%'}"></div>

  </div>
</template>

<script>
    export default {
        name: "TaobaoAndJd",
        data(){

            return{
                title:'加载中',
                indexData:"",
                copyText:"",
                bannerData:"",
                topImg:"",
                changeImg:"",
                listData:"",
                fontColor:"",
                tabIndex:"0",


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
                this.GET('?mod=appapi&act=double_eleven_view&ctrl=top_cate',{
                    platform:this.$route.params.platform,
                    show_type_str:this.$route.params.show_type_str,
                    version:this.$route.params.version,
                },(res)=>{
                    if (res.data.success==0){
                        this.$alert({
                            title: '提示',
                            content: res.data.msg
                        })
                    }
                    console.log(res.data)
                    this.indexData = res.data.data
                    this.title=res.data.data.title
                    this.changeImg=res.data.data.list[0].tab_img
                    this.topImg=res.data.data.list[0].adv_list[0].img
                    this.getList(this.indexData.list[0].type)


                })

            },
            getList(type){
                this.GET('?mod=appapi&act=double_eleven_view&ctrl=adv_list',{
                    platform:this.$route.params.platform,
                    show_type_str:this.$route.params.show_type_str,
                    version:this.$route.params.version,
                    type:type
                },(res)=>{
                    if (res.data.success==0){
                        this.$alert({
                            title: '提示',
                            content: res.data.msg
                        })

                    }

                    console.log(res.data)
                    this.listData = res.data.data


                })

            },

            ChangeTab(item,index){
                this.tabIndex=index

                // this.changeImg=this.indexData.list[1].tab_check_img
                if (item.adv_list[0]){
                    this.topImg=item.adv_list[0].img
                }

                this.getList(item.type)

            },
            bannerClick(item){
                console.log(item)
                this.appOpenWeb(item,'jump_SkipUIIdentifier')

            },
            tbTopClick(){
                console.log(this.indexData.list[this.tabIndex].adv_list[0].SkipUIIdentifier)
                this.appOpenWeb({
                    is_need_login: "1",
                    SkipUIIdentifier: this.indexData.list[this.tabIndex].adv_list[0].SkipUIIdentifier,
                    show_type_str: "",
                    url: this.indexData.list[this.tabIndex].adv_list[0].url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                }, 'jump_SkipUIIdentifier')
            },

        }
    }
</script>

<style scoped>
.tbbj{
  width: 100%;
  height: 280px;
  position: relative;

}
  .huichang{
    width: 100%;
    height: 125px;
    position: relative;

  }
  .dibu_bg{
    width: 100%;
    height: 280px;
    position: relative;

  }
  .huichang_wrap{
    align-items: center;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    margin-top: 24px;
    width: 100%;
    height: 64px;
    position: relative;
    /*background-image: url("../assets/tuceng16.png");*/
    /*background-size: 100% 100%;*/

  }
  .tb_text{
    font-size:30px;
    font-weight:bold;
    color:#C5443E;
    flex: 1;
    text-align: center;
    font-size:30px;
    font-family:PingFang SC;
    /*color:rgba(243,255,243,1);*/
    background: #6F0000;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*padding-left: 20px;*/
    /*padding-right: 20px;*/
    /*line-height:35px;*/
  }
  .jd_text{
    margin-left: 61px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(243,255,243,1);
  }
  .banner_wrap{
    /*display: flex;*/
    /*flex-wrap: nowrap;*/
    width: 100%;
    height: 860px;
    position: relative;

  }
  .banner_img{
    float: left;
    width: 375px;
    height: 168px;
    position: relative;
    z-index: 50;

  }
  #tab_text{

  }
</style>
