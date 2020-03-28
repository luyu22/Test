<template>
  <div class="JiaYouMyOrder col" v-wechat-title="title">
    <div class="jy_top" :style="{backgroundImage: 'url(' + indexData.top_bj + ')', backgroundSize:'100% 100%'}">
        <span class="jy_top_text">{{indexData.status_str}}</span>
      <span class="jy_top_text1">{{indexData.time}}</span>
    </div>

    <div class="state_info">
      <div class="station_name">{{indexData.station_name}}</div>
      <div class="station_address" @click="goDaohang">
        <img :src="indexData.address_icon" alt="" class="address_icon">
        <span>{{indexData.address}}</span>
      </div>
    </div>

    <div class="orderinfo_top">
      <div class="left_tip"></div>
      <div class="title_text1">{{indexData.order_tips}}</div>
    </div>
    <div class="info_wrap">
        <div class="info_item" v-for="(item,index) in indexData.order_msg" :key="index">
          <span>{{item}}</span>
        </div>
    </div>
    <div class="orderinfo_top">
      <div class="left_tip"></div>
      <div class="title_text1">{{indexData.payment_tips}}</div>
      <div class="payment">{{indexData.payment}}</div>
    </div>
    <div class="payinfo_wrap">
      <div class="payinfo_item" v-for="(item,index) in indexData.pay_msg" :key="index">
        <span class="payinfo_item_text" >{{item.str}}</span>
        <span class="payinfo_item_text1" :style="{color:'#'+item.color}">{{item.str1}}</span>
      </div>
    </div>

  </div>
</template>

<script>

    export default {
        name: "JiaYouMyOrder",
      components: {
      },
      data(){
        return{
          title:'订单详情',
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
          const query = this.$route.query
          this.query=query
          this.GET('?mod=appapi&act=oil_station&ctrl=order_detail',{
            orderId:this.query.orderId
          },(res)=>{
            console.log(res.data)
            this.indexData = res.data.data
            this.title=res.data.data.title

          })
        },
        goDaohang(){
          if(this.indexData.map_type=="baidu"){
            this.coord_type='bd09'

          }
          if(this.indexData.map_type=="gaode"){
            this.coord_type='gcj02'

          }

          this.appOpenWeb({
            is_need_login: "1",
            SkipUIIdentifier: "pub_guide",
            show_type_str: "",
            destination_name:this.indexData.address,
            destination_lat:this.indexData.lat,
            destination_lng:this.indexData.lng,
            coord_type:this.coord_type,
            url: "",
            jsonInfo: "{\"outlink_style\":\"1\",\"outlink_check_fontcolor\":\"000000\",\"outlink_check_bgcolor\":\"FFFFFF\"}"
          }, 'jump_SkipUIIdentifier')
        }



      },
    }
</script>

<style scoped>
.payinfo_item{
  display: flex;
  align-items: center;
  margin-left: 33px;
  margin-top: 23px;

}
.payinfo_item_text{

  font-size:24px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(153,153,153,1);


}
.payinfo_item_text1{

  position:absolute ;
  right: 35px;
  font-size:28px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(252,63,65,1);

}




  .payinfo_wrap{
    width:100%;
    /*height:230px;*/
    background:rgba(255,255,255,1);
  }
.payment{
  position: absolute;
  right: 35px;
  font-size:32px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(252,63,65,1);

}
  .info_item{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(153,153,153,1);
    margin-left: 33px;
    margin-top: 23px;
  }

  .info_wrap{
    margin-bottom: 20px;
    width: 100%;
    /*height: 228px;*/
    display: flex;
    flex-direction: column;

  }
  .left_tip{
    background: #4A99E2;
    margin-left: 20px;
    margin-right: 9px;
    width: 4px;
    height: 28px;

  }
  .title_text1{
    font-size:28px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
  .orderinfo_top{
    width: 100%;
    height: 97px;
    display: flex;
    align-items: center;
  }
.jy_top{
  width: 100%;
  height: 228px;
  position: relative;

}
  .jy_top_text{
    left: 32px;
    bottom: 101px;
    position: absolute;
    font-size:38px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);

  }
.jy_top_text1{
  left: 32px;
  bottom: 50px;
  position: absolute;
  font-size:28px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);

}
  .state_info{

    width: 100%;
    height: 149px;
    background: #FDFFFF;

  }
  .station_name{
    margin-top: 41px;
    margin-left: 32px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
  .station_address{
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    margin-left: 32px;
  }
  .address_icon{
    width: 22px;
    height: 26px;
    margin-right: 10px;
  }
</style>
