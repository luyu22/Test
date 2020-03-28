<template>
  <div class="PreSellActivity col" v-wechat-title="title">
    <div class="act_top" v-for="item in oneBannerData" :style="{backgroundImage: 'url(' + item.img + ')', backgroundSize:'100% 100%'}" @click="BannerClick(item)">

    </div>
    <div class="act_mid" :style="{backgroundImage: 'url(' + indexData[1].img + ')', backgroundSize:'100% 100%'}">
      <div class="qxl" :style="{backgroundImage: 'url(' + indexData[1].ico + ')', backgroundSize:'100% 100%'}"></div>
      <div class="banner" v-for="item in indexData[1].list" :style="{backgroundImage: 'url(' + item.img + ')', backgroundSize:'100% 100%'}" @click="BannerClick(item)"></div>

    </div>
    <div class="act_bottom" :style="{backgroundImage: 'url(' + indexData[2].img + ')', backgroundSize:'100% 100%'}">
      <div class="xbt" :style="{backgroundImage: 'url(' + indexData[2].ico + ')', backgroundSize:'100% 100%'}"></div>
      <div class="banner" v-for="item in indexData[2].list" :style="{backgroundImage: 'url(' + item.img + ')', backgroundSize:'100% 100%'}" @click="BannerClick(item)"></div>

    </div>

  </div>
</template>

<script>
    export default {
        name: "PreSellActivity",
        data(){

            return{
                title:'加载中',
                indexData:"",
                copyText:"",
                oneBannerData:"",
                moreBannerData:"",
                moreBannerData1:""






            }
        },
        created(){
          this.getIndexdata()
            this.getTitle()
        },
        mounted(){
            //操作数据


        },
        methods: {
            getIndexdata(){
                this.GET('?mod=appapi&act=tmActivity&ctrl=getIndex',{
                    SkipUIIdentifier:this.$route.params.SkipUIIdentifier,
                    show_type_str:this.$route.params.show_type_str,
                    platform:this.$route.params.platform,

                },(res)=>{


                    console.log(res.data)
                    // for(let i=0;i<=res.data.data.length;i++){
                    //   if (res.data.data[i].type=="tm_act_one_banner_01"){
                    //       this.oneBannerData=res.data.data[i].list
                    //   }
                    //     if (res.data.data[i].type=="tm_act_more_banner_01"){
                    //         this.moreBannerData=res.data.data[i].list
                    //     }
                    //     if (res.data.data[i].type=="tm_act_more_banner_02"){
                    //         this.moreBannerData1=res.data.data[i].list
                    //     }
                    //
                    // }
                    this.indexData = res.data.data
                    // this.title=res.data.data.title
                    console.log(this.indexData)
                    for (let i =0;i<this.indexData.length;i++){
                          if (this.indexData[i].type=="tm_act_one_banner_01"){
                              this.oneBannerData=this.indexData[i].list
                              console.log(this.oneBannerData)
                          }
                            if (this.indexData[i].type=="tm_act_more_banner_01"){
                                this.moreBannerData=this.indexData[i].list
                                console.log(this.moreBannerData)
                            }
                            if (this.indexData[i].type=="tm_act_more_banner_02"){
                                this.moreBannerData1=this.indexData[i].list
                                console.log(this.moreBannerData)
                            }
                    }



                })

            },
            getTitle(){
                this.GET('?mod=appapi&act=tmActivity&ctrl=get_tiitle',{
                    SkipUIIdentifier:this.$route.params.SkipUIIdentifier,
                    show_type_str:this.$route.params.show_type_str,
                    platform:this.$route.params.platform,

                },(res)=>{

                    console.log(res.data)
                    this.title=res.data.data.title



                })
            },
            BannerClick(item){
                console.log(item)
                this.appOpenWeb(item,'jump_SkipUIIdentifier')
            }
        }
    }
</script>

<style scoped>
.act_top{
  width: 100%;
  height: 650px;
  position: relative;
}
  .act_mid{
    width: 100%;
    /*height: 1028px;*/
    position: relative;
    /*background-image: url("../assets/a15.png");*/
    /*background-size: 100% 100%;*/
    /*padding-bottom: 20px;*/
  }
  .qxl{
    width: 282px;
    height: 77px;
    /*background-image: url("../assets/qiangxianling.png");*/
    /*background-size: 100% 100%;*/
    margin-left: auto;
    margin-right: auto;
  }
  .banner{
    width: 693px;
    height: 291px;

    margin-right: auto;
    margin-left: auto;
    margin-top: 25px;
  }
.act_bottom{
  width: 100%;
  /*height: 1751px;*/
  position: relative;
  /*background-image: url("../assets/a16.png");*/
  /*background-size: 100% 100%;*/
  padding-bottom: 20px;
}
  .xbt{
    width: 306px;
    height: 77px;
    /*background-image: url("../assets/xiangbuting.png");*/
    /*background-size: 100% 100%;*/
    margin-left: auto;
    margin-right: auto;
    margin-top: 46px;
  }

</style>
