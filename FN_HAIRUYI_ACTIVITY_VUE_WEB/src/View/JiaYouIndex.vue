<template>
  <div class="JiaYouIndex col" v-wechat-title="title">
    <div class="jiayou_wrap" v-if="!showOrder">

      <div class="top_wrap">
        <div class="top_item">
          <van-dropdown-menu active-color="#007DFA">
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu>
        </div>
        <div class="top_item" @click="itemClick(item)" v-for="(item,index) in topData.sort" :key="index">
          <span class="item_text" :style="{color:item.type==selectedType?'#'+topData.select_color:'#'+topData.color}">{{item.str}}</span>
        </div>


      </div>

<!--      <div class="you_wrap" >-->
<!--        <img src="../assets/timg2.png" alt="" class="you_img">-->
<!--        <div class="you_title">珠海市南屏加油站</div>-->
<!--        <div class="you_address">南湾北路397号</div>-->
<!--        <div class="you_star">-->
<!--          <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--          <span class="star_text">4.9</span>-->
<!--        </div>-->
<!--        <div class="you_daohang">-->
<!--          <img src="../assets/daohang1.png" alt="" class="danghang_icon">-->
<!--          <span class="danghang_text">1.2km</span>-->
<!--        </div>-->
<!--        <div class="you_price">-->
<!--          <span class="price_text">¥5.21/升</span>-->
<!--          <div class="jiang_wrap">-->
<!--            <span class="jiang_text">直降￥0.24</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div class="you_wrap" @click="youClick(item)" v-for="(item,index) in listData" :key="index">
          <img :src="item.pic" alt="" class="you_img">
          <div class="you_title">{{item.name}}</div>
          <div class="you_address">{{item.address}}</div>
          <div class="you_star" v-if="item.star_num">
            <img :src="item.star_icon" alt="" class="star_icon">
            <span class="star_text">{{item.star_num}}</span>
          </div>
          <div class="you_daohang" @click="daoHang(item)"  @click.stop>
            <img :src="item.address_icon" alt="" class="danghang_icon">
            <span class="danghang_text">{{item.distance_str}}</span>
          </div>
          <div class="you_price">
            <span class="price_text">{{item.price_str}}</span>
            <div class="jiang_wrap" :style="{backgroundImage: 'url(' + item.discount_bg + ')', backgroundSize:'100% 100%'}" v-if="item.discount_str">
              <span class="jiang_text" >{{item.discount_str}}</span>
            </div>
          </div>
        </div>

      </van-list>



    </div>

    <div class="order_show" v-if="showOrder">
      <van-list
        v-model="loading1"
        :finished="finished1"
        finished-text="没有更多了"
        @load="onLoad1"
        :immediate-check="false"
      >

      <div class="no_order" v-if="noOrder">
        <img src="../assets/noorder.png" alt="" style="width: 100%;height: 100%;">
        <div class="no_order_text"><span>暂无订单</span></div>
      </div>
      <div class="order_wrap" v-for="(item,index) in orderData.order" :key="index" @click="goOrderDetail(item)">
        <div class="order_top">
          <span class="order_date" :style="{color:'#'+item.time_color}">{{item.time}}</span>
          <span class="pay_info" :style="{color:'#'+item.status_color}">{{item.status}}</span>
        </div>
        <div class="order_line"></div>
        <div class="order_mid">
          <img :src="item.pic" alt="" class="order_img">
          <div class="order_info">
            <span class="order_info_text">{{item.station_name}}</span>
            <span class="order_info_text1">{{item.msg}}</span>
          </div>
          <span class="order_pay" :style="{color:'#'+item.order_sum_color}">{{item.order_sum}}</span>
        </div>
        <div class="order_line"></div>
        <div class="order_bottom">
          <img :src="item.doubt_icon" alt="" class="wenhao_icon" @click.stop="openYiwen">
          <span class="wenhao_text">{{item.doubt}}</span>
          <div class="fapiao" :style="{color:'#'+item.btn_color}" @click.stop="openFapiao">
            {{item.btn}}
          </div>
        </div>
      </div>
<!--      <div class="nomore_text" v-if="!noOrder">没有更多了</div>-->

      <div class="overlay" v-if="show" @click="show = false" >
        <div class="wrapper" @click.stop>
          <div class="tip_box">
            <div class="tip_box_title">{{orderData.doubt.title}}</div>
            <div class="top_box_content">
              <span v-html="orderData.doubt.content"></span>
            </div>
            <div class="tip_box_line"></div>
            <div class="tip_box_confirm" @click="closeYiwen">{{orderData.doubt.btn}}</div>
          </div>
        </div>

      </div>

      <div class="overlay" v-if="show1" @click="show1 = false" >
        <div class="wrapper" @click.stop>
          <div class="tip_box">
            <div class="tip_box_title">{{orderData.invoice.title}}</div>
            <div class="top_box_content">
              <span v-html="orderData.invoice.content"></span>
            </div>
            <div class="tip_box_line"></div>
            <div class="tip_box_confirm" @click="closeFapiao">{{orderData.invoice.btn}}</div>
          </div>
        </div>

      </div>
     </van-list>
    </div>


<!--    <div class="getlocation">定位</div>-->
<!--    <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"></el-amap>-->
<!--    <div class="toolbar">-->
<!--      <span v-if="loaded">location: lng = {{ lng }} lat = {{ lat }}</span>-->
<!--      <span v-else>正在定位</span>-->
<!--    </div>-->
<!--    <div id="allmap"></div>-->


    <div class="you_bottom">
      <div class="bottom_item" v-for="(item,index) in topData.bottom" :key="index" @click="tabClick(item)">
        <img :src="item.type==currentTab?item.icon1:item.icon" alt="" class="jiayou_img">
        <span class="jiayou_text">{{item.str}}</span>
      </div>
<!--      <div class="bottom_item">-->
<!--        <img src="../assets/dingdan.png" alt="" class="jiayou_img">-->
<!--        <span class="jiayou_text">我的订单</span>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
  import { Dialog } from 'vant';
    export default {
        name: "JiaYouIndex",
      components: {
      },
      data(){
          let self =this;
        return{
          title:'加油',
          p:1,
          p1:1,
          percent: 80,
          test:[],
          CateData:"",
          value1: 0,
          option1: [

          ],
          currentIndex:0,
          center: [121.59996, 31.197646],
          lng: "113.553986",
          lat:  "22.224979",
          loaded: false,

          selectedType:"",
          noOrder:false,
          show: false,
          showOrder:false,
          currentTab:"",
          listData:"",
          sort:"",
          topData:"",
          orderData:"",
          show1: false,
          isLoading: false,
          loading: false,
          finished: false,
          coord_type:"",
          loading1: false,
          finished1: false,





        }
      },
      created(){

      },
      mounted(){
          this.getTitle()




      },
      watch:{

        value1(newName, oldName){
          console.log(newName)
          this.p=1
          this.finished=false
          this.getList()

        },


      },
      activated(){
          //缓存钩子

      },
      methods: {
        getTitle() {
          this.GET('?mod=appapi&act=oil_station&ctrl=index_top',{

          },(res)=>{
            console.log(res.data)
            this.topData = res.data.data
            this.value1=res.data.data.oil_code[0].type
            this.selectedType=res.data.data.sort[0].type
            this.currentTab=res.data.data.bottom[0].type
            this.title=res.data.data.bottom[0].title
            for (let i =0;i<res.data.data.oil_code.length;i++){
                this.option1.push({ text: res.data.data.oil_code[i].str, value: res.data.data.oil_code[i].type })

            }


          })
        },
        getList() {
          this.GET('?mod=appapi&act=oil_station&ctrl=index_list',{
            p:this.p,
            lat:this.$route.params.lat,
            lng:this.$route.params.lng,
            sort:this.selectedType,
            oil_code:this.value1
          },(res)=>{
            console.log(res.data)
            this.listData=res.data.data
            this.loading = false;

          })
        },
        daoHang(item){
          console.log(item)
          if(item.map_type=="baidu"){
            this.coord_type='bd09'

          }
          if(item.map_type=="gaode"){
            this.coord_type='gcj02'

          }

          // window.location.href = "http://api.map.baidu.com/marker?location=" + lat + "," + lng + "&title=" + titleName + "&content=" +content+ "&output=html"
          // window.location.href="http://api.map.baidu.com/geocoder?location="+ item.lat + "," + item.lng + "&coord_type=gcj02&output=html&src=webapp.baidu.openAPIdemo"
          this.appOpenWeb({
            is_need_login: "1",
            SkipUIIdentifier: "pub_guide",
            show_type_str: "",
            destination_name:item.name,
            destination_lat:item.lat,
            destination_lng:item.lng,
            coord_type:this.coord_type,
            url: "",
            jsonInfo: "{\"outlink_style\":\"1\",\"outlink_check_fontcolor\":\"000000\",\"outlink_check_bgcolor\":\"FFFFFF\"}"
          }, 'jump_SkipUIIdentifier')

        },

        onLoad() {
          console.log(0)
          setTimeout(() => {
            this.p++

            this.GET('?mod=appapi&act=oil_station&ctrl=index_list',{
              p:this.p,
              lat:this.$route.params.lat,
              lng:this.$route.params.lng,
              sort:this.selectedType,
              oil_code:this.value1
            },(res)=>{
              if (res.data.data.length > 0) {


                console.log(res.data.data)
                this.listData = this.listData.concat(res.data.data)
                this.loading = false;
              }else {
                this.loading = false;
                this.finished = true;
                console.log(this.listData)
              }

            })


          }, 500);

        },
        onLoad1() {
          console.log('orderload')
          setTimeout(() => {
            this.p1++


            this.GET('?mod=appapi&act=oil_station&ctrl=order_list',{
              p:this.p1,

            },(res)=>{
              console.log(res.data.data)
              if (res.data.data.order.length > 0) {



                this.orderData.order = this.orderData.order.concat(res.data.data.order)
                this.loading1 = false;
              }else {

                this.loading1 = false;
                this.finished1 = true;
                console.log(this.orderData)
              }

            })




          }, 500);

        },


        tabClick(item) {

          this.currentTab=item.type;
          if(item.type=="order"){
            this.p1=1
            this.finished1=false
            this.showOrder=true
            this.title=item.title
            this.GET('?mod=appapi&act=oil_station&ctrl=order_list',{
              p:this.p1
            },(res)=>{
              console.log(res.data)
              this.loading1 = false;
              this.orderData=res.data.data
              if(res.data.data.order.length==0){
                this.noOrder=true
              }

            })

          }else {
            this.showOrder=false
            this.title=item.title
          }

        },
        youClick(item) {
          console.log(item)
          this.$router.push({
            path:'/JiaYouDetail',
            query:{
              station_id:item.station_id,
              lat:this.$route.params.lat,
              lng:this.$route.params.lng,
              company:item.company,
              oil_code:this.value1

            }
          })

        },
        goOrderDetail(item){
          this.$router.push({
            path:'/JiaYouMyOrder',
            query:{
              orderId:item.orderId,


            }
          })
        },


        goReport(){
          console .log("goreport")
        },
        itemClick(item){
          this.selectedType=item.type
          this.p=1
          this.finished=false
          this.getList()
        },
        openYiwen(){
          this.show=true
        },
        closeYiwen(){
          this.show=false
        },
        openFapiao(){
          this.show1=true
        },
        closeFapiao(){
          this.show1=false
        },


      },
    }
</script>

<style scoped>
  .order_show{
    margin-bottom: 100px;
  }
  .no_order_text{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,1);
  }

  #container{height:100%}
  .jiayou_wrap{
    margin-bottom: 110px;
  }
  .getlocation{
    margin-left:4rem;
    font-size:15px;
    font-weight: 500;
    margin-top:0.3rem;
  }
  .amap-demo {
    height: 15rem;
    margin-top: 0.3rem;
  }

  .JiaYouIndex{
    width:750px;
    min-height:1334px;
    background:rgba(247,247,247,1);
  }
.top_wrap{
  position: relative;
  width:100%;
  height:88px;
  background:rgba(255,255,255,1);
  display: flex;
  align-items: center;

}
  .top_item{
    /*font-size:32px;*/
    /*font-family:PingFang SC;*/
    /*font-weight:500;*/
    /*color:rgba(51,51,51,1);*/
    flex: 1;
    text-align: center;
    /*height: 88px;*/
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .item_text{

    font-size:32px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .you_wrap{
    width:100%;
    height:254px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 12px 0px rgba(35,125,227,0.12);
    margin-top: 24px;
    position: relative;
  }
  .you_img{
    width: 152px;
    height: 152px;
    position: absolute;
    left: 30px;
    top: 32px;
  }
.you_title{

  font-size:32px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(0,0,0,1);
  position: absolute;
  left: 203px;
  top: 39px;
}
  .you_address{
    width: 540px;
    position: absolute;
    left: 204px;
    top: 89px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
  }
  .you_star{
    position: absolute;
    left: 204px;
    top: 132px;
  }
  .star_icon{
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .star_text{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .you_daohang{
    width: 68px;
    height: 68px;
    position: absolute;
    top: 130px;
    right: 52px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
.danghang_icon{
  width: 30px;
  height: 31px;
  margin-bottom: 6px;
}
  .danghang_text{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    opacity:0.75;
  }
  .you_price{
    position: absolute;
    left: 208px;
    top: 191px;
    display: flex;
    align-items: center;


  }
  .price_text{
    margin-right: 15px;
    font-size:34px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(252,63,65,1);
  }
  .jiang_wrap{
    /*background-image: url("../assets/yjjx1.png");*/
    /*background-size: 100% 100%;*/
  }
  .jiang_text{
    padding-left: 5px;
    padding-right: 5px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(0,124,250,1);
  }
  .you_bottom{
    position: fixed;
    bottom: 0;
    width:100%;
    height:98px;
    background:rgba(255,255,255,1);
    box-shadow:1px -4px 16px 0px rgba(202,215,227,0.49);
    display: flex;
    align-items: center;
  }
  .bottom_item{
    flex: 1;
    text-align: center;
    /*height: 88px;*/
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .jiayou_img{
width: 46px;
    height: 42px;

  }
  .jiayou_text{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
  }
  .wrapper {
    /*z-index: 2;*/
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .tip_box{
    width:628px;
    /*height:342px;*/
    background:rgba(255,255,255,1);
    border-radius:16px;
    position: relative;
  }
  .tip_box_title{
    margin-top: 50px;
    text-align: center;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .top_box_content{
    width:553px;
    margin-left: 37px;
    margin-top: 52px;
    margin-bottom: 47px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .tip_box_line{
    width:100%;
    height:1.5px;

    background:rgba(221,221,221,1);
  }
  .tip_box_confirm{
    height: 96px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(54,144,255,1);
  }

  .order_wrap{
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width:710px;
    height:346px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 16px 0px rgba(229,240,253,0.49);
    border-radius:10px;
    position: relative;
  }
  .jiayou_img{
    width: 46px;
    height: 42px;

  }
  .jiayou_text{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .order_top{
    height: 84px;
    width: 100%;
    display: flex;
    align-items: center;

  }
  .order_date{
    margin-left: 36px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(153,153,153,1);
  }
  .pay_info{

    position: absolute;
    right: 36px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .order_line{
    width:640px;
    height:1px;
    border:1px solid rgba(221,221,221,1);
    margin-left: auto;
    margin-right: auto;
  }
  .order_mid{
    position: relative;
    height: 160px;
    width: 100%;


  }
  .order_bottom{
    height: 99px;
    display: flex;
    align-items: center;
    width: 100%;


  }
  .order_img{
    width: 128px;
    height: 128px;
    position: absolute;
    top: 16px;
    left: 34px;
  }
  .order_info{
    width: 360px;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    position: absolute;
    left: 186px;
    top: 20px;
  }
  .order_info_text1{

    font-size:28px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .order_info_text{


    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .order_pay{
    position: absolute;
    top: 22px;
    right: 41px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(252,63,65,1);
  }
  .wenhao_icon{
    width: 28px;
    height: 28px;
    margin-left: 34px;
    margin-right: 10px;
  }
  .wenhao_text{

    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .fapiao{
    width: 170px;
    height: 66px;
    position: absolute;
    right: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(54,144,255,1);
    border:2px solid #3391FF;
    border-radius: 40px;

  }
  .nomore_text{
    text-align: center;
    margin-top: 40px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .no_order{
    width: 483px;
    height: 348px;
    margin-top: 348px;
    margin-left: 151px;
  }
</style>
