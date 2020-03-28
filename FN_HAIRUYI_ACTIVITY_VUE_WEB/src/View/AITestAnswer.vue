<template>
    <div class="AITestAnswer col" v-wechat-title="title">
      <div class="answer_wrap">

        <div class="answer_top">
          <div class="answer_top_title">方案</div>
          <div class="answer_top_content">
         {{query.jianyi}}
          </div>
          <div class="bottom_icon"></div>
        </div>

        <div class="tuijian_box" v-for="(item,index) in indexData.list" :key="index">
          <!--<div class="tuijian_top">-->
            <!--<div class="tuijian_top_img">-->
              <!--<img src="../assets/5155.png" alt="" style="width: 100%;height: 100%;">-->
            <!--</div>-->
            <!--<div class="tuijian_top_name">毛孔清洁器</div>-->
            <!--<div class="tuijian_top_name1">护理：</div>-->
            <!--<div class="tuijian_top_attr">-->
              <!--<div class="attr_item">大大</div>-->
              <!--<div class="attr_item">大大</div>-->
              <!--<div class="attr_item">大大</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="tuijian_text">油皮适用毛孔清洁推荐</div>-->
          <!--<div class="tuijian_text1">推荐商品来自毛孔清洁销量排行第一，李佳琪推荐脸部按摩仪，清洁面部导入仪。</div>-->
          <div class="tuijian_goods_wrap">
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
              <!--<div class="gobuy" @click="goodsClick">-->
                <!--<div class="buy_text">立即领券购买</div>-->
              <!--</div>-->
            <!--</div>-->


            <div class="tuijian_goods"  v-for="(item,index) in item.goods_list" >
              <!--<div class="top_icon">-->
                <!--<span class="top_icon_text">top</span> <span class="top_icon_text">1</span>-->
              <!--</div>-->
              <div class="tuijian_goods_img">
                <img :src="item.goods_img" alt="" style="width:100%;height: 100%">
              </div>
              <div class="tuijian_goods_title">
               {{item.goods_title}}
              </div>
              <div class="price_wrap">
                <span class="price_wrap1">{{item.qhj_str}}</span>
                <span class="price_wrap2" >¥{{item.yhq_price}}</span>
              </div>
              <div class="gobuy" @click="goodsClick(item)">
                <div class="buy_text">{{item.buy_str}}</div>
              </div>
            </div>


          </div>
        </div>

<!--        <div class="vux-circle-demo">-->
<!--          <div  class="cicle_wrap">-->
<!--            <x-circle-->
<!--              :percent="percent"-->
<!--              :stroke-width="6"-->
<!--              :trail-width="6"-->
<!--              :stroke-color="['#9558D8', '#88EBE7']"-->
<!--              trail-color="#ececec">-->
<!--&lt;!&ndash;              <span style="color:#36D1DC">{{ percent }}%</span>&ndash;&gt;-->
<!--            </x-circle>-->
<!--            <div class="cicle_num">86</div>-->
<!--            <div class="cicle_num1">分</div>-->
<!--            <div class="cicle_text">皮肤检测指数</div>-->
<!--          </div>-->
<!--        </div>-->

      </div>
    </div>
</template>

<script>
  import { XCircle } from 'vux'
    export default {
        name: "AITestAnswer",
      components: {
        XCircle
      },
      data(){
        return{
          title:'AI测肤方案',
          percent: 80






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

          this.GET('?mod=appapi&act=cefu_api&ctrl=cate_detail',{
          cate:this.query.name
          },(res)=>{
            console.log(res.data)
            this.indexData = res.data.data
            this.title=res.data.data.title

          })
        },
        goReport(){
          console .log("goreport")
        },
        goodsClick(item){
          this.appOpenWeb(item,'jump_goodsdetail')

        }

      },
    }
</script>

<style scoped>
  .vux-circle-demo {
    padding-top: 20px;
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

.answer_wrap{
  width:100%;
  min-height:1365px;
  background:rgba(255,249,252,1);
}
  .answer_top{
    width: 93.33%;
    margin: 32px auto;
    /*height: 308px;*/
    background: #FFE8F2;
    border-radius: 20px;
  }
  .answer_top_title{
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(243,91,134,1);
    padding-top: 24px;
    padding-left: 37px;
    padding-bottom: 24px;
  }
  .answer_top_content{
    width:626px;
    /*height:184px;*/
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,133,175,1);
    line-height:40px;
    margin-left: auto;
    margin-right: auto;
  }
  .bottom_icon{
    width:19px;
    height:13px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .tuijian_box{
    width:100%;
    /*height:727px;*/
    background:rgba(255,255,255,1);
    border-radius:41px;
  }
  .tuijian_top{
    box-sizing: content-box;
    position: relative;
    width: 100%;
    height: 110px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .tuijian_top_img{
    border:2px solid rgba(238,238,238,1);
    border-radius:12px;
    width: 98px;
    height: 98px;
    /*margin-left: 31px;*/
    position: absolute;
    left: 31px;
  }
  .tuijian_top_name{
    position: absolute;
    left: 166px;
    top: 40px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(35,32,33,1);
    /*line-height:40px;*/
  }
.tuijian_top_name1{
  position: absolute;
  left: 166px;
  top: 91px;
  font-size:26px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(104,99,100,1);
  /*line-height:40px;*/
}
  .tuijian_top_attr{
    position: absolute;
    top: 91px;
    left: 252px;
    height: 45px;
    display: flex;
  }
  .attr_item{
    display: flex;
    align-items: center;
    justify-content: center;
    width:99px;
    height:45px;
    background:rgba(238,238,238,1);
    border-radius:8px;
    margin-left: 13px;
  }
  .tuijian_text{

    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(252,98,124,1);
    line-height:40px;
    margin-left: 44px;
  }
  .tuijian_text1{
    margin-top: 10px;
    margin-left: 43px;
    margin-right: 29px;
    width:678px;
    /*height:66px;*/
    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(104,99,100,1);
    /*line-height:40px;*/
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
    bottom: 10px;
  }
  .buy_text{
    margin-left: 55px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(252,111,153,1);
  }
</style>
