<template>
  <div class="JiaYouOrder col" v-wechat-title="title">

    <div class="order_info">
      <div class="jyz_name">{{query.name}}</div>
      <div class="jyz_address">{{query.address}}</div>
      <div class="yh_price">
        <span class="yh_info">优惠价</span>
        <span class="yh_jine">¥{{oilPrice}}</span>
      </div>
      <div class="yqh">
        <img src="../assets/jiayouicon.png" alt="" class="yqh_icon">
        <span class="yqh_text">油枪号</span>
        <span class="yqh_tip">{{tipText}}</span>
      </div>
      <div class="input_wrap" style="position: relative">
        <input type="number" class="yq_input" placeholder="请输入油枪号"  v-model="yqNum">
        <div class="yqh_info">{{oilType}}</div>
      </div>
<!--      <div class="jy_jine" >-->
<!--        <img src="../assets/jiayou1.png" alt="" class="jine_icon">-->
<!--        <span class="jine_text">加油金额</span>-->
<!--        <span class="liang liang_tip" v-if="money<1">最低可输入1元</span>-->
<!--        <span class="liang" v-else>约3.0升</span>-->

<!--      </div>-->
<!--      <div class="jine_box" v-if="!showInput">-->

<!--        <div class="jine_item" >-->
<!--          <span class="cz_jine">￥200</span>-->
<!--        </div>-->
<!--        <div class="jine_item">-->
<!--          <span class="cz_jine">￥500</span>-->
<!--        </div>-->
<!--        <div class="jine_item" @click="showMoneyInput">-->
<!--          <span class="cz_jine">其他金额</span>-->
<!--        </div>-->

<!--      </div>-->
<!--      <div class="input_wrap" v-if="showInput">-->
<!--        <input type="text" class="yq_input" placeholder="" v-model="money">-->
<!--      </div>-->

    </div>

<!--    <div class="order_yhq">-->
<!--      <div class="yhq_item">-->
<!--          <span class="left_text">选择优惠券</span>-->
<!--        <span class="left_text1">输入加油金额后查看</span>-->
<!--        <img src="../assets/fh.png" alt="" class="right_back">-->
<!--      </div>-->
<!--      <div class="pay_line"></div>-->
<!--      <div class="yhq_item">-->
<!--        <span class="left_text">选择优惠券</span>-->
<!--        <img src="../assets/hxjs.png" alt="" class="detail_icon" @click="show = true">-->
<!--        <span class="yh_money">¥0</span>-->

<!--      </div>-->

<!--    </div>-->

<!--    <div class="pay_wrap">-->
<!--      <div class="pay_box">-->
<!--        <img src="../assets/share_wx.png" alt="" class="wechat_icon">-->
<!--        <span class="pay_text">微信支付</span>-->
<!--        <div class="select_bg"></div>-->
<!--      </div>-->
<!--      <div class="pay_line"></div>-->
<!--      <div class="pay_box">-->
<!--        <img src="../assets/share_wx.png" alt="" class="wechat_icon">-->
<!--        <span class="pay_text">微信支付</span>-->
<!--        <div class="select_bg"></div>-->
<!--      </div>-->

<!--    </div>-->

<!--    <div class="topay" @click="toPay" >-->
<!--        <div class="pay_price">-->
<!--        实付：-->
<!--        </div>-->
<!--      <div class="pay_price1">-->
<!--        ¥256.54-->
<!--      </div>-->
<!--      <div class="pay_yh_price">已优惠￥4.20</div>-->
<!--      <div class="pay_button" :style="{background:paybg,color:paytextcolor}">确认支付</div>-->

<!--    </div>-->
        <div class="topay1" @click="toPay">
          <div class="jiayou_button">前往加油</div>
        </div>

<!--    <div v-if="show" @click="show = false" class="overlay">-->
<!--      <div class="wrapper" @click.stop>-->
<!--        <div class="block">-->
<!--          <div class="sm_title">易加油实际优惠明细</div>-->
<!--          <div class="sm_box">-->
<!--              <span class="sm_box_text">直降优惠</span>-->
<!--            <span class="sm_box_text1">-￥2.20</span>-->
<!--          </div>-->
<!--          <div class="sm_box">-->
<!--            <span class="sm_box_text">优惠券</span>-->
<!--            <span class="sm_box_text1">-￥2.20</span>-->
<!--          </div>-->
<!--          <div class="sm_box">-->
<!--            <span class="sm_box_text">渠道服务费</span>-->
<!--            <span class="sm_box_text1">-￥2.20</span>-->
<!--          </div>-->

<!--          <div class="sm_box1">-->
<!--            <span class="sm_box_text">优惠合计</span>-->
<!--            <span class="sm_box_text2">-￥2.20</span>-->
<!--          </div>-->
<!--          <div class="sm_line"></div>-->
<!--          <div class="sm_info">-->
<!--            <span class="sm_info_text">1.直降优惠：本订单易加油专属直降优惠</span>-->
<!--          </div>-->
<!--          <div class="sm_info">-->
<!--            <span class="sm_info_text">2.直降优惠：本订单易加油专属直降优惠</span>-->
<!--          </div>-->
<!--          <div class="sm_info">-->
<!--            <span class="sm_info_text">3.直降优惠：本订单易加油专属直降优惠</span>-->
<!--          </div>-->

<!--          <img src="../assets/zu7.png" alt="" class="close_show" @click="show = false">-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->


  </div>
</template>

<script>
    export default {
        name: "JiaYouOrder",
      components: {
      },
      data(){
        return{
          title:'优惠加油',
          percent: 80,
          test:[],
          CateData:"",
          loading: false,
          finished:true,
          value1: 0,
          value2: 'a',
          option1: [
            { text: '全部商品', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '活动商品', value: 2 }
          ],
          currentIndex:0,
          currentType:0,
          nopj:false,
          yqNum:"",
          money:"",
          selectJine:false,
          paybg:"#DEDEDE",
          paytextcolor:"#9A9A9A",
          showInput:false,
          show: false,
          query:"",
          oilType:"",
          oilPrice:"",
          tipText:""




        }
      },
      created(){

        // this.getGoods()
      },
      mounted(){
          console.log(this.$route.query)
        this.getRouterData()

      },
      watch:{
        // selectJine(newName, oldName){
        //     if(newName==true){
        //       this.paybg="#349DFF"
        //       this.paytextcolor="#FFFFFF"
        //     }
        // },
        yqNum(newName, oldName){

            if(newName==""){
              this.oilType=""
              this.oilPrice=""
            }
            for (let i=0;i<JSON.parse(this.query.oil_price_list).length;i++){
                for (let j =0;j<JSON.parse(this.query.oil_price_list)[i].gunNos.length;j++){
                  if (newName==JSON.parse(this.query.oil_price_list)[i].gunNos[j]){
                      this.oilType=JSON.parse(this.query.oil_price_list)[i].oilName
                      this.oilPrice=JSON.parse(this.query.oil_price_list)[i].priceYfq
                    this.tipText=""
                    return

                  }else {
                    this.tipText="油枪号错误";
                    this.oilType=""
                    this.oilPrice=""

                  }
                }

            }
        },
        // money(newName, oldName){
        //
        // }

      },
      methods: {
        getTitle() {
          this.GET('?mod=appapi&act=oil_station&ctrl=join_order_queue',{

          },(res)=>{
            console.log(res.data)
            this.topData = res.data.data

          })
        },


        getRouterData(){
          const query1 = this.$route.query
          console.log(query1)//{que: "我是通过query传到组件B的参数"}
          this.query=query1
          // this.getIndex()
        },
        toPay(){
          if (this.yqNum&&this.tipText==""){
            console.log(this.yqNum)
            // this.selectJine=true
            this.GET('?mod=appapi&act=oil_station&ctrl=join_order_queue',{

            },(res)=>{
              console.log(res.data)
              let jumpUrl = window.location.protocol +'//'+ window.location.host +"?mod=appapi&act=oil_station&ctrl=czb_topay&gun_no="+this.yqNum+"&station_id="+this.query.station_id
              window.location.href=jumpUrl



            })
          }else {
            this.$alert({
              title: '提示',
              content: "请输入正确的油枪号"
            })
          }


        },
        showMoneyInput(){
            this.showInput=true
        }

      },
    }
</script>

<style scoped>
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

  .block {
    width:628px;
    height:542px;
    background:rgba(255,255,255,1);
    border-radius:16px;
    position: relative;
  }
  .close_show{
    width: 64px;
    height: 64px;
    position: absolute;
    left: 282px;
    bottom: -111px;
  }
  .sm_title{
    text-align: center;
    margin-top: 54px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .sm_line{
    width:100%;
    height:1.5px;
    background:rgba(221,221,221,1);
  }
  .sm_box{
    height: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 15px;
  }
  .sm_box1{
    height: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 25px;
    margin-bottom: 12px;
  }
  .sm_box_text{
    margin-left: 46px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .sm_box_text1{
   position: absolute;
    right: 46px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(153,153,153,1);
  }
  .sm_box_text2{
    position: absolute;
    right: 46px;

    font-size:36px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,29,76,1);
  }
  .sm_info{
    display: flex;
    align-items: center;
    /*height: 44px;*/
    width: 100%;
    margin-top: 10px;

  }
  .sm_info_text{
    margin-left: 48px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
.JiaYouOrder{
  width:100%;
  min-height:1344px;
  background:rgba(247,247,247,1);
}
  .order_info{
    margin-top: 8px;
    margin-left: auto;
    margin-right: auto;
    width:710px;
    /*height:652px;*/
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 16px 0px rgba(235,219,223,0.49);
    border-radius:12px;
    position: relative;
  }
  .order_yhq{
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    position: relative;
    width:710px;
    height:202px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 16px 0px rgba(235,219,223,0.49);
    border-radius:12px;
  }
.topay{
  position: fixed;
  bottom: 0;
  width:100%;
  height:118px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 18px 0px rgba(38,108,251,0.12);
  display: flex;
  align-items: center;
}
  .topay1{
    position: fixed;
    bottom: 0;
    width:100%;
    height:118px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 18px 0px rgba(38,108,251,0.12);
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .jiayou_button{
    width:710px;
    height:88px;
    background:linear-gradient(101deg,rgba(0,157,252,1),rgba(0,124,250,1));
    box-shadow:0px 2px 20px 0px rgba(0,127,250,0.4);
    border-radius:12px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .jyz_name{
    margin-top: 40px;
    margin-left: 33px;
    margin-right: 33px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(0,0,0,1);
  }
  .jyz_address{
    margin-top: 10px;
    margin-left: 33px;
    margin-right: 33px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .yh_info{
    margin-left: 33px;
    margin-right: 8px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .yh_jine{

    font-size:38px;
    font-family:PingFang SC;
    font-weight:400;
    color:#FC3F41;
  }
  .yqh_icon{
width: 32px;
    height: 30px;
    margin-left: 46px;
    margin-right: 12px;

  }
  .yqh_text{
    /*margin-top: 59px;*/
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  .yq_input{
    margin-left: 34px;

    width:642px;
    height:96px;
    background:rgba(227,236,255,0.2);
    border:2px solid rgba(55,155,255,1);
    border-radius:8px;
    text-align: center;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(55,156,255,1);
  }
.yq_input::placeholder {

  font-size:32px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(55,156,255,1);
}
.yqh{
  margin-top: 40px;
  display: flex;
  align-items: center;
}
.yqh_tip{
 position: absolute;
  right: 26px;
  font-size:28px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(252,63,65,1);
}
.input_wrap{
  margin-bottom: 40px;
  margin-top: 20px;
  position: relative;
  display: flex;
  align-items: center;
}
  .yqh_info{
    position: absolute;
    right: 50px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(55,155,255,1);
  }
  .jine_icon{
    width: 24px;
    height: 30px;
    margin-left: 51px;
    margin-right: 8px;
  }
  .jine_text{

    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  .jy_jine{
    margin-top: 41px;
    display: flex;
    align-items: center;

  }
.jine_box{
  margin-top: 14px;
  height: 114px;
  width: 100%;
  display: flex;
  align-items: center;
}
  .jine_item{
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(60,99,255,0.14);
    border-radius:8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 211px;
    height: 113px;
    margin-left: 17px;

  }
  .cz_jine{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  .pay_wrap{
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width:710px;
    height:230px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 16px 0px rgba(235,219,223,0.49);
    border-radius:12px;
  }
  .pay_box{
    height: 112px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .wechat_icon{
    width: 42px;
    height: 38px;
    margin-left: 34px;

  }
  .pay_text{
  margin-left: 13px;

    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .select_bg{
    width:45px;
    height:45px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(221,221,221,1);
    border-radius:50%;
    position: absolute;
    right: 53px;
  }
  .pay_line{
    margin-left: 45px;
    width:620px;
    height:1.5px;
    background:rgba(221,221,221,1);
  }
  .pay_price{
    margin-left: 55px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:#333333;
  }
.pay_price1{
  font-size:36px;
  font-family:PingFang SC;
  font-weight:500;
  color:#FC3F41;
}
  .pay_yh_price{
    margin-left: 10px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .pay_button{
    position: absolute;
    right: 30px;
    display: flex;
    align-items: center;
    width:228px;
    height:78px;
    /*background:#DEDEDE;*/
    border-radius:39px;
    justify-content: center;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:400;
    color:#9A9A9A;
  }
  .yhq_item{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;

  }
  .left_text{
    margin-right: 10px;
    margin-left: 35px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
.left_text1{
  position: absolute;
  font-size:28px;
  font-family:PingFang SC;
  font-weight:400;
  right: 61px;
  color:rgba(153,153,153,1);
}

.right_back {
width: 18px;
  height: 28px;
  position: absolute;
  right: 34px;
}
  .detail_icon{
    width: 24px;
    height: 24px;

  }
  .yh_money{
    position: absolute;
    right: 38px;
    font-size:34px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(252,63,65,1);
  }
  .liang{
    position: absolute;
    right:36px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(55,156,255,1);
  }
  .liang_tip{

    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(252,63,65,1);
  }
</style>
