<template>
  <div class="KouBei col" v-wechat-title="indexData.title" :style="{backgroundImage: 'url(' + indexData.bj_img + ')', backgroundSize:'100% 100%'}" >

    <div class="top_bg" :style="{backgroundImage: 'url(' + indexData.top_img + ')', backgroundSize:'100% 100%'}" >
    </div>
    <div class="ruzhu_text" :style="{color:'#'+indexData.info_color}" v-if="indexData.store_list.length!=0">{{indexData.info}}</div>
    <div class="sj_box" v-if="indexData.store_list.length!=0">
      <div class="sj_box1" v-for="(item,index) in indexData.store_list" :key="index">
        <img :src="item.img" alt="" class="sj_img">
        <span class="sj_text" :style="{color:'#'+item.name_color}">{{item.name}}</span>
      </div>

    </div>

    <div class="gogogo">
      <img :src="indexData.btn_img" alt="" class="go_img" @click="xiadan">
    </div>

    <div class="rule_str" v-html="indexData.rule_str">

    </div>

    <div class="kb_bottom" :style="{background:'#'+indexData.btn_list_color}">
      <img :src="indexData.btn_list[0].img" alt="" class="bt1" @click="share">
      <img :src="indexData.btn_list[1].img" alt="" class="bt2" @click="xiadan">
    </div>

  </div>
</template>

<script>
    export default {
        name: "KouBei",
      components: {
      },
      data(){
        return{
          title:'口碑',
          storeData:"",
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
          this.GET('?mod=appapi&act=tb_public_praise&ctrl=index',{
            platform:this.$route.params.platform,
          },(res)=>{
            console.log(res.data)
            this.indexData = res.data.data


          })
        },
        goTo(){
          this.appOpenWeb({
            is_need_login: "1",
            SkipUIIdentifier: this.indexData.btn_list[1].skip,
            show_type_str: "",
            url: this.indexData.buy_url,
            jsonInfo: `{"goods_source":"buy_koubei","gid":"1","outlink_style":"1","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF"}`
          }, 'jump_SkipUIIdentifier')

        },
        share(){
          //如果是提示则中断不让跳转..
          if (this.indexData.btn_list[0].is_to_tip=="1") {
            this.$alert({
              title: '提示',
              content: this.indexData.btn_list[0].tip_str
            })
          } else {
            this.appOpenWeb({
              is_need_login: "1",
              SkipUIIdentifier: this.indexData.btn_list[0].skip,
              show_type_str: "",
              url: "",
              jsonInfo: `{"goods_source":"buy_koubei","gid":"1","outlink_style":"1","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF"}`
            }, 'jump_SkipUIIdentifier')
          }
        },
        xiadan() {
          //如果是提示则中断不让跳转..
          if (this.indexData.btn_list[1].is_to_tip=="1") {
            this.$alert({
              title: '提示',
              content: this.indexData.btn_list[1].tip_str
            })
          } else {
            this.appOpenWeb({
              is_need_login: "1",
              SkipUIIdentifier: this.indexData.btn_list[1].skip,
              show_type_str: "",
              url: this.indexData.btn_list[1].url,
              jsonInfo: `{"goods_source":"buy_koubei","gid":"1","outlink_style":"1","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF"}`
            }, 'jump_SkipUIIdentifier')
          }
        },



      },
    }
</script>

<style scoped>

.KouBei{
  width:100%;
  min-height:1316px;
  /*background-image: url("../assets/koubeibg.png");*/
  /*background-size: 100% 100%;*/
}
.rule_str{
    width: 641px;
  min-height: 285px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 35px;
  margin-bottom: 148px;
}
  .kb_bottom{
    width:100%;
    position: fixed;
    bottom: 0;
    height:110px;
    background:rgba(255,255,255,1);
    border:2px solid rgba(255,255,255,1);
    display: flex;
    align-items: center;

  }
  .top_bg{
    height: 669px;
    width: 100%;

  }
  .ruzhu_text{
    margin-top: 37px;
    margin-left: 59px;
    font-size:22px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(250,245,227,1);
  }
  .sj_box{
    /*height: 356px;*/
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .sj_box1{
    /*height: 172px;*/
    width: 183px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 50px;
    margin-top: 15px;
    /*justify-content: center;*/
  }
  .sj_img{
      width: 183px;
    height: 140px;

  }
  .sj_text{
    font-size:24px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(250,245,227,1);
  }
.gogogo{
  margin-top: 26px;
  /*margin-bottom: 185px;*/
  display: flex;
  align-items: center;
  justify-content: center;
}
  .go_img{
width: 234px;
    height: 135px;

  }
  .bt1{
    margin-left: 53px;
    width: 261px;
    height: 74px;
  }
  .bt2{
    position: absolute;
    right: 51px;
    width: 261px;
    height: 74px;
  }
</style>
