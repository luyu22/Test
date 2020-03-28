<template>
  <div class="AITestReport " v-wechat-title="title">
    <div style="width:100%;background:rgba(255,249,252,1);z-index: -2;">

      <div class="rp_top">
        <img :src="testData.head_img" alt="" class="rp_headimg">
        <div class="rp_name">{{testData.nickname}}</div>
        <div class="rp_time">{{testData.time}}</div>
        <div class="rp_jilu" @click="goRecord">测肤记录</div>
      </div>
      <div class="rp_point">
        <div class="process_wrap">
          <div class="vux-circle-demo">
            <div  class="cicle_wrap">
              <x-circle
                :percent="percent"
                :stroke-width="6"
                :trail-width="6"
                :stroke-color="['#9558D8', '#88EBE7']"
                trail-color="#ececec">
                <!--              <span style="color:#36D1DC">{{ percent }}%</span>-->
              </x-circle>
              <div class="cicle_num">{{testData.score}}</div>
              <div class="cicle_num1">分</div>
              <div class="cicle_text">{{testData.score_str}}</div>
            </div>
          </div>
        </div>

        <div class="point_info">
          <span class="point_des">{{testData.status}}</span>
          <!--<img src="../assets/juxing881.png" alt="" class="point_icon">-->
        </div>

        <div class="age_wrap">
          <div v-for="(item,index) in testData.right" :key="index">
            <div class="age_item" v-if="item.str" >
              <span class="fulin" >{{item.name}}：</span> <span class="fulin1">{{item.str}}</span>
            </div>
          </div>


        </div>

      </div>

      <div class="face_wrap">
          <div class="face_img">
            <img src="../assets/tuceng6.png" alt="" style="width: 100%;height: 100%;">
          </div>
          <div class="koufen1" v-if="testData.koufen[0]">
            <span class="koufen_text1">{{testData.koufen[0].name}}</span>
            <span class="koufen_text2">{{testData.koufen[0].str}}</span>
          </div>
        <div class="koufen2" v-if="testData.koufen[1]">
          <span class="koufen_text1">{{testData.koufen[1].name}}</span>
          <span class="koufen_text2">{{testData.koufen[1].str}}</span>
        </div>
        <div class="koufen3" v-if="testData.koufen[2]">
          <span class="koufen_text1">{{testData.koufen[2].name}}</span>
          <span class="koufen_text2">{{testData.koufen[2].str}}</span>
        </div>
        <div class="koufen3 koufen4" v-if="testData.koufen[3]">
          <span class="koufen_text1">{{testData.koufen[3].name}}</span>
          <span class="koufen_text2">{{testData.koufen[3].str}}</span>
        </div>
        <div class="koufen3 koufen5" v-if="testData.koufen[4]">
          <span class="koufen_text1">{{testData.koufen[4].name}}</span>
          <span class="koufen_text2">{{testData.koufen[4].str}}</span>
        </div>
        <div class="koufen3 koufen6" v-if="testData.koufen[5]">
          <span class="koufen_text1">{{testData.koufen[5].name}}</span>
          <span class="koufen_text2">{{testData.koufen[5].str}}</span>
        </div>
        <div class="koufen3 koufen7" v-if="testData.koufen[6]">
          <span class="koufen_text1">{{testData.koufen[6].name}}</span>
          <span class="koufen_text2">{{testData.koufen[6].str}}</span>
        </div>

          <div class="face_bottom">
            温馨小贴士:分数扣除，代表严重指数
          </div>

      </div>

      <div class="jieguo_wrap">
        <div class="jieguo_tite">
          综合分析结果
        </div>
<!--        <div class="jieguo_content">-->

<!--        </div>-->

      </div>

      <!--<div class="wenti_wrap" style="display: flex">-->
         <!--<div class="wenti_item" @click="tabClick">-->
           <!--<div class="wenti_item_top">-->
             <!--<img src="../assets/yzwf.png" alt="" class="wenti_item_topicon">-->
             <!--<span class="wenti_item_topt">风险问题</span>-->
           <!--</div>-->
           <!--<div class="wenti_item_topt">6项</div>-->
         <!--</div>-->
        <!--<div class="wenti_item1"  >-->

        <!--</div>-->
        <!--<div class="wenti_item1">-->

        <!--</div>-->

      <!--</div>-->


      <!--<van-tabs    v-on:change="onChangeEvent" swipeable>-->
      <!--<van-tab v-for="(item,index) in CateData"  :title="item.name" :name="item.type" >-->
      <!--<van-list-->
      <!--v-model="loading"-->
      <!--finished-text=""-->
      <!--:immediate-check="false"-->
      <!--:finished="finished"-->
      <!--&gt;-->

      <!--</van-list>-->
      <!--</van-tab>-->
      <!--</van-tabs>

-->   <div v-for="(item,index) in testData.list" :key="index">
      <div class="fz_wrap" style="background: #FFF">
        <div class="fz_title">
          <span class="fz_text">{{index+1}}.{{item.name}}</span>
          <div class="gx_wrap">
            <span class="gx_text">{{item.str1}}</span>
          </div>
        </div>
        <!--<div class="img_wrap1"></div>-->
        <!--<div class="img_wrap2" style="display: none">-->

        <!--</div>-->
        <!--<div class="img_wrap3" style="display: none;">-->

        <!--</div>-->
        <div class="text_wrap">
          {{item.jianyi}}
        </div>
        <div class="go_tuijian" @click="goTuijian(item)"  v-if="item.jianyi!=''">
          <span>立即查看详情</span>
          <img src="../assets/zhankai.png" alt="" class="zhankai">
          <!--<img src="../assets/back.png" alt="" class="right_arrow">-->
        </div>

      </div>
      <div class="pifu_info" v-if="item.goods_list!=''">
        <img src="../assets/dbx.png" alt="" class="right_arrow">
        <span style="margin-left:32px;margin-right: 32px;">适合我的护肤品</span>
        <img src="../assets/dbx2.png" alt="" class="right_arrow">
      </div>
      <div class="pifu_info1" v-if="item.goods_list!=''">以下【适合我的护肤品】均来自平台好物排行榜</div>
      <div class="tuijian_goods_wrap"  @touchmove.stop >
        <div class="tuijian_goods" v-for="(item,index) in item.goods_list" >

          <div class="tuijian_goods_img">
            <img :src="item.goods_img" alt="" style="width:100%;height: 100%">
          </div>
          <div class="tuijian_goods_title">
           {{item.goods_title}}
          </div>
          <div class="price_wrap">
            <span class="price_wrap1">{{item.qhj_str}}</span>
            <span class="price_wrap2" >{{item.yhq_price}}</span>
          </div>
          <div class="gobuy" @click="jumpGoods(item)">
            <div class="buy_text">{{item.buy_str}}</div>
          </div>
        </div>

        <!--<div class="tuijian_goods">-->
          <!--<div class="top_icon">-->
            <!--<span class="top_icon_text">top</span> <span class="top_icon_text">1</span>-->
          <!--</div>-->
          <!--<div class="tuijian_goods_img">-->
            <!--<img src="../assets/5155.png" alt="" style="width:100%;height: 100%">-->
          <!--</div>-->
          <!--<div class="tuijian_goods_title">-->
            <!--【贝德玛卸妆水】蓝色洁-->
            <!--面卸妆水，低敏不刺激...-->
          <!--</div>-->
          <!--<div class="price_wrap">-->
            <!--<span class="price_wrap1">券后价</span>-->
            <!--<span class="price_wrap2" >¥888.00</span>-->
          <!--</div>-->
          <!--<div class="gobuy">-->
            <!--<div class="buy_text">立即领券购买</div>-->
          <!--</div>-->
        <!--</div>-->

        <!--<div class="tuijian_goods">-->
          <!--<div class="top_icon">-->
            <!--<span class="top_icon_text">top</span> <span class="top_icon_text">1</span>-->
          <!--</div>-->
          <!--<div class="tuijian_goods_img">-->
            <!--<img src="../assets/5155.png" alt="" style="width:100%;height: 100%">-->
          <!--</div>-->
          <!--<div class="tuijian_goods_title">-->
            <!--【贝德玛卸妆水】蓝色洁-->
            <!--面卸妆水，低敏不刺激...-->
          <!--</div>-->
          <!--<div class="price_wrap">-->
            <!--<span class="price_wrap1">券后价</span>-->
            <!--<span class="price_wrap2" >¥888.00</span>-->
          <!--</div>-->
          <!--<div class="gobuy">-->
            <!--<div class="buy_text">立即领券购买</div>-->
          <!--</div>-->
        <!--</div>-->

      </div>
      </div>


    </div>


  </div>
</template>

<script>
    import {XCircle} from "vux";

    export default {
        name: "AITestReport",
      components: {
        XCircle
      },
      data(){
        return{
          title:'AI测肤方案',
          percent: 80,
          test:[],
          CateData:"",
          loading: false,
          finished:true,
          testData:""




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
          console.log(query)//{que: "我是通过query传到组件B的参数"}
          this.query=query
          this.GET('?mod=appapi&act=cefu_api&ctrl=detail',{
            id:this.query.id,

          },(res)=>{
            console.log(res.data)

            this.testData=res.data.data
            this.percent=Number(res.data.data.score)
            this.title=res.data.data.title



          })
        },

        onChangeEvent(name,title){
          console.log(title,name,111)
          this.type = name
          // this.finished = false;
          this.GET('?mod=appapi&act=life_goods&ctrl=goods',{
            p:"1",
            type:name
          },(res)=>{
            console.log(res.data)
            this.goodsData = res.data.data
            this.p = 1

          })
        },
        goReport(){

        },
        goRecord(){
          this.$router.push({
            path:'/AITestRecord',
            query:{



            }
          })

        },
        jumpGoods(item){
          console.log(item)
          this.appOpenWeb(item,'jump_goodsdetail')
        },
        goTuijian(item){
          //风险问题tab切换
          this.$router.push({
            path:'/AITestAnswer',
            query:{
              name:item.name,
              jianyi:item.jianyi,


            }
          })

        }

      },
    }
</script>

<style scoped>
  .koufen_text1{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(86,85,86,1);
  }
  .koufen_text2{
    margin-left: 10px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:#FF519A;
  }
  .koufen1{
    display: flex;
    align-items: center;
    justify-content: center;
    width:196px;
    height:71px;
    background:rgba(255,254,255,1);
    box-shadow:0px 0px 8px 0px rgba(251,150,207,0.31);
    border-radius:15px;
    position: absolute;
    left: 23px;
    top: 54px;
  }
  .zhankai{
    width: 13px;
    height: 19px;
    margin-left: 6px;

  }
  .zhankai1{
    width: 14px;
    height: 21px;
  }

  .koufen2{
    display: flex;
    align-items: center;
    justify-content: center;
    width:196px;
    height:71px;
    background:rgba(255,254,255,1);
    box-shadow:0px 0px 8px 0px rgba(251,150,207,0.31);
    border-radius:15px;
    position: absolute;
    right: 23px;
    top: 54px;
  }
  .koufen3{
    display: flex;
    align-items: center;
    justify-content: center;
    width:196px;
    height:71px;
    background:rgba(255,254,255,1);
    box-shadow:0px 0px 8px 0px rgba(251,150,207,0.31);
    border-radius:15px;
    position: absolute;
    left: 23px;
    top: 183px;
  }
  .koufen4{
    right: 23px;
  }
  .koufen5{
    top: 312px;
  }
  .koufen6{
    top: 312px;
    right: 23px;
  }
  .koufen7{
    top: 442px;
  }
.rp_top{
  width: 100%;
  height: 253px;
  background-image: url("../assets/juxing1.png");
  background-size:100% 100% ;
  position: relative;
}
  .rp_headimg{
    position: absolute;
    width: 80px;
    height: 80px;
    left: 34px;
    top: 30px;
    border-radius: 50%;
  }
  .rp_name{
    position: absolute;
    top: 36px;
    left: 134px;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(66,53,71,1);
  }
  .img_wrap1{
    width: 702px;
    height: 332px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 34px;
  }
.rp_time{
  position: absolute;
  top: 78px;
  left: 134px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(66,53,71,1);
}
  .rp_jilu{
    width:158px;
    height:51px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 8px 0px rgba(252,160,210,0.3);
    border-radius:26px;
    position: absolute;
    top: 46px;
    right: 53px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(66,53,71,1);
  }
  .rp_point{
    width: 100%;
    height: 339px;
    background-image: url("../assets/juxing18.png");
    background-size:100% 100% ;
    margin-top: -140px;
    z-index: 2;
    position: relative;
  }
  .process_wrap{
    width:202px;
    height: 202px;
    position: absolute;;
    left: 66px;
    top:51px;
  }
.vux-circle-demo {
  /*padding-top: 20px;*/
  text-align: center;
}
.vux-circle-demo > div {
  margin: 0 auto;
}
.cicle_wrap{
  width: 202px;
  height: 202px;
  position: relative;
}
.cicle_num{
  position: absolute;
  width:79px;
  height:52px;
  left: 61px;
  top: 68px;
  font-size:69px;
  font-family:PingFang SC;
  font-weight:800;
  color:rgba(51,49,54,1);
  line-height:46px;
}
.cicle_num1{
  position: absolute;
  top: 71px;
  right: 34px;
  width:19px;
  height:18px;
  font-size:20px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(51,49,54,1);
  line-height:40px;
}
.cicle_text{
  position: absolute;
  left: 42px;
  top: 132px;
  /*width:120px;*/
  /*height:19px;*/
  font-size:20px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(51,49,54,1);
  line-height:40px;
}
  .point_info{
    position: absolute;;
    top: 270px;
    left: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 202px;
  }
  .point_des{
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,49,54,1);
    margin-right: 4px;
  }
  .point_icon{
width: 27px;
    height: 27px;

  }
  .age_wrap{
    height: 256px;
    width: 342px;
    position: absolute;
    right: 54px;
    top: 29px;
    display: flex;
    flex-direction: column;
  }
  .age_item{
    margin-top: 12px;
    width:342px;
    height:55px;
    background:rgba(244,239,252,1);
    opacity:0.51;
    border-radius:28px;
    display: flex;
    align-items: center;
  }
  .fulin{
    padding-left: 32px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,49,54,1);
  }
  .fulin1{
    position: absolute;
    right: 80px;
    padding-left: 32px;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,49,54,1);
  }
  .face_wrap{
    position: relative;
    width: 100%;
    height: 653px;
  }
  .face_img{
    position: absolute;
    width: 231px;
    top: 47px;
    left: 259px;
    height: 454px;

  }
  .face_bottom{
    position: absolute;
    left: 128px;
    bottom: 38px;
    width: 495px;
    height: 59px;
    border-radius: 50px;
    background: #FFE8F2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,134,175,1);

  }
  .jieguo_wrap{
    background-image: url("../assets/juxing18.png");
    background-size:100% 100% ;
    width: 100%;
    /*height: 362px;*/
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .jieguo_tite{
    /*margin-top: 50px;*/
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(38,37,37,1);
  }
  .jieguo_content{
    margin-top: 8px;
    width:626px;
    /*height:184px;*/
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(38,37,37,1);
    line-height:40px;
  }
  .wenti_item{
    margin-left: 29px;
    margin-top: 14px;
    width: 210px;
    height: 120px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-image: url("../assets/dbx1.png");
    background-size:100% 100% ;

  }
.wenti_item1{
  margin-left: 29px;
  margin-top: 14px;
  width: 210px;
  height: 120px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url("../assets/juxing183.png");
  background-size:100% 100% ;

}
.wenti_item_top{
  margin-top: 19px;
}
  .wenti_item_topicon{

    width: 29px;
    height: 29px;
    margin-right: 8px;

  }
  .wenti_item_topt{
    font-size:26px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(246,133,223,1);
  }
  .fz_wrap{
    margin-top: 15px;
    width: 100%;
    /*height: 721px;*/
    position: relative;
  }
  .fz_title{
    display: flex;
    align-items: center;
    margin-left: 19px;
    padding-top: 15px;
  }
  .fz_text{

    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(30,29,30,1);
  }
  .gx_wrap{
    margin-left: 24px;
    /*width: 94px;*/
    height: 36px;
    /*width:94px;*/
    border:2px solid rgba(255,95,157,1);
    border-radius:18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gx_text{
    padding-left: 24px;
    padding-right: 24px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,95,157,1);
  }
  .text_wrap{
    width: 684px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 34px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(87,87,87,1);
    line-height:40px;
  }
  .img_wrap2{
    width: 642px;
    height: 71px;
    margin-top: 34px;
    margin-left: auto;
    margin-right: auto;

  }
.img_wrap3{
  width: 622px;
  height: 65px;
  margin-top: 34px;
  margin-left: auto;
  margin-right: auto;

}
  .go_tuijian{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 34px;
    margin-bottom: 34px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(252,111,153,1);
    padding-bottom: 10px;
    /*line-height:40px;*/
  }
  .right_arrow{
    width: 13px;
    height: 19px;
    margin-left: 6px;
  }
  .pifu_info{
    margin-top: 34px;

    font-size:26px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(224,173,250,1);
    display: flex;
    align-items: center;
    justify-content: center;

  }
.pifu_info1{
  margin-top: 34px;

  font-size:20px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(104,99,100,1);
  display: flex;
  align-items: center;
  justify-content: center;

}
.tuijian_goods_wrap{
  /*height: 381px;*/
  width: 100%;
  margin-top: 20px;
  overflow-x: auto;
  overflow-y:hidden;
  white-space: nowrap;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}
.tuijian_goods_wrap ::-webkit-scrollbar{
  display: none;
}
.tuijian_goods{
  position: relative;
  display: inline-block;
  width:292px;
  height:379px;
  background:rgba(255,255,255,1);
  border:2px solid rgba(238,238,238,1);
  border-radius:21px;
  margin-left: 24px;
}
.top_icon{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 18px;
  width:49px;
  height:51px;
  background:rgba(240,146,162,1);
  border-radius:0px 0px 19px 19px;
}
.top_icon_text{

  font-size:18px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:24px;
}
.tuijian_goods_img{
  width: 134px;
  position: absolute;
  top: 35px;
  left: 82px;
  height: 129px;
}
.tuijian_goods_title{
  height: 80px;
  position: absolute;
  top: 194px;
  left: 14px;
  width:262px;
  /*height:53px;*/
  font-size:24px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(50,44,46,1);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}
.price_wrap{
  position: absolute;
  top: 267px;
  left: 15px;
}
.price_wrap1{

  font-size:24px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(252,111,153,1);
  /*line-height:40px;*/
}
.price_wrap2{

  font-size:30px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(252,111,153,1);
  /*line-height:40px;*/
}
.gobuy{
  background-image: url("../assets/plus.png");
  background-size:100% 100% ;
  width:216px;
  height:46px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 38px;
  bottom: 8px;
}
.buy_text{
  margin-left: 55px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(252,111,153,1);
}
</style>
