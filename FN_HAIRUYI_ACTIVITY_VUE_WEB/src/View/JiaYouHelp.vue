<template>
  <div class="JiaYouHelp col" v-wechat-title="topData.title">
    <div class="help_wrap">
      <div class="title_top">
        <div class="left_bg" :style="{background: '#'+topData.left_color}"></div>
        <span class="help_title" >{{topData.title}}</span>
      </div>


      <van-collapse v-model="activeNames">
        <van-collapse-item :title="item.title" :name="index+1" v-for="(item,index) in topData.help_list">
          {{item.context}}
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="kefu" :style="{color:'#'+topData.btn_color,background:'#'+topData.btn_bj}" @click="phoneCall">
      {{topData.btn_font}}
    </div>
  </div>
</template>

<script>
    export default {
        name: "JiaYouHelp",
      components: {
      },
      data(){
        return{
          title:'加油',
          activeNames: [],
          topData:""





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
          this.GET('?mod=appapi&act=oil_station&ctrl=use_help',{

          },(res)=>{
            console.log(res.data)
            this.topData = res.data.data

          })
        },
        phoneCall(){
          window.location.href = "tel:"+this.topData.phone;
        }



      },
    }
</script>

<style scoped>
  .left_bg{
    width: 8px;
    height: 34px;
    background: #3391FF;
    display: inline-block;
    margin-left: 41px;
  }
.help_wrap{
  width:710px;
   min-height:1030px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  background:rgba(255,255,255,1);
  box-shadow:0px 4px 16px 0px rgba(210,213,255,0.49);
  border-radius:12px;
}
.JiaYouHelp{
  width:100%;
  /*height:1206px;*/
  min-height: 1334px;
  background:rgba(247,250,255,1);
}
  .help_title{
    margin-left: 13px;
    /*margin-top: 40px;*/
    display: inline-block;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .title_top{
    margin-top: 40px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
  }
  .kefu{
    width:710px;
    height:88px;
    background:linear-gradient(101deg,rgba(0,157,252,1),rgba(0,124,250,1));
    box-shadow:0px 2px 20px 0px rgba(0,127,250,0.4);
    border-radius:12px;
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);

  }
</style>
