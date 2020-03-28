<template>
  <div class="HuiLife col" v-wechat-title="topData.top_title">
<!--    <FNHeader-->
<!--      :needShadow="false"-->
<!--      :headerStyles="headerStyles"-->
<!--      class="fn-header"-->
<!--      :title="headerTitle"/>-->
<!--    <div style="height:46px;width:100%;text-align: center;position:relative">-->
<!--      <img src="../assets/back.png" alt="" class="back_icon" @click="gobackto">-->
<!--        <div class="webTitle">{{topData.top_title}}</div>-->
<!--    </div>-->
    <FNImageBanner
      :imageList="imgData"
      :FNSpecialShopItemData="imgData"/>


    <van-tabs   @click="onClick" v-on:change="onChangeEvent" swipeable>
      <van-tab v-for="(item,index) in CateData"  :title="item.name" :name="item.type" >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <div class="goods van-clearfix" v-for="item in goodsData" @click="goGoods(item)">
            <div class="yhq" v-if="item.yhq == 1" >
              <img :src="item.goods_img" alt="" class="left_img">
              <div class="yhj_title">
                <img :src="item.shop_img" alt="" class="icon_img">
                {{item.goods_title}}
              </div>
              <div class="money">¥{{item.goods_price}}</div>
              <div class="fan_bili">{{item.fbili_str}}</div>
              <div class="fan_text">{{item.f_str}}</div>
              <div class="fan" v-if="item.fcommission">{{item.fcommission}}</div>
              <div class="yhj_money">{{item.yhq_price}}元</div>
              <div class="yhj_have">优惠券</div>
              <img :src="item.btn_img" alt="" class="bg_yhj">
            </div>
            <div v-else>
              <div class="yhq_not">
                <img :src="item.goods_img" alt="" class="left_img_not">
                <div class="yhj_title_not">
                  <img :src="item.shop_img" alt="" class="icon_img">
                  {{item.goods_title}}
                </div>
                <div class="money_not">¥{{item.goods_price}}</div>
                <div class="fan_bili_not">返{{item.fbili}}%</div>
                <div class="fan_text_not">{{item.f_str}}</div>
                <div class="fan_not" v-if="item.fcommission">{{item.fcommission}}</div>
                <img :src="item.btn_img" alt="" class="bg_yhj_not">
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>

  </div>



</template>


<script>
    import FNHeader from '../components/common/FNHeader'
    import FNImageBanner from "../components/common/FNImageBanner"

    export default {
        name: "HuiLife",
        components:{
            FNImageBanner,
            FNHeader,

        },
        data(){
            return{
                title:'惠生活',
                headerStyles:{
                    bgColor:'rgba(255,255,255,0)',
                    color:'#181818',
                    isTitleBold:true,
                    backImg:'../../assets/back.png'
                },
                headerTitle:'惠生活',
                imgData:[],
                CateData:"",
                goodsData:"",
                curIndex:0,
                isActive:"1",
                topData:"",
                type:"",
                p:"",
                isLoading: false,
                loading: false,
                finished: false,




            }
        },
        created(){
            this.getTitle()
            this.getBanner()
            this.getCate()
            // this.getGoods()
        },
        mounted(){


        },
        methods: {
            getTitle() {
                this.GET('?mod=appapi&act=life_goods&ctrl=top',{

                },(res)=>{
                    console.log(res.data)
                    this.topData = res.data.data

                })
            },
            getBanner() {
                this.GET('?mod=appapi&act=life_goods&ctrl=banner',{

                },(res)=>{
                    console.log(res.data)
                    this.imgData = res.data.data

                })
            },
            getCate() {
                this.GET('?mod=appapi&act=life_goods&ctrl=cate',{
                    type:"life"
                },(res)=>{
                    console.log(res.data)
                    this.CateData = res.data.data
                    this.type = res.data.data[0].type
                    this.GET('?mod=appapi&act=life_goods&ctrl=goods',{
                        p:"1",
                        type:this.type
                    },(res)=>{
                        console.log(res.data)
                        this.goodsData = res.data.data
                        this.p = 1
                    })

                })
            },
            getGoods(p,type) {
                this.GET('?mod=appapi&act=life_goods&ctrl=goods',{
                    p:p,
                    type:type
                },(res)=>{
                    console.log(res.data)
                    this.goodsData = res.data.data
                    this.p = 1

                })

            },
            select(e){
                this.isActive=e.target.getAttribute("p");
                this.type = e.target.getAttribute("type");
                console.log(this.type)
                this.GET('?mod=appapi&act=life_goods&ctrl=goods',{
                    p:1,
                    type:e.target.getAttribute("type")

                },(res)=>{
                    console.log(res.data)
                    this.goodsData = res.data.data

                })


            },
            onChangeEvent(name,title){
                console.log(title,name,111)
                this.type = name
                this.finished = false;
                this.GET('?mod=appapi&act=life_goods&ctrl=goods',{
                    p:"1",
                    type:name
                },(res)=>{
                    console.log(res.data)
                    this.goodsData = res.data.data
                    this.p = 1

                })
            },
            onClick(name, title){
                // console.log(title,name)
                // this.type = name
                // this.finished = false;
                // this.GET('?mod=appapi&act=life_goods&ctrl=goods',{
                //     p:"1",
                //     type:name
                // },(res)=>{
                //     console.log(res.data)
                //     this.goodsData = res.data.data
                //     this.p = 1
                //
                // })

            },
            onLoad() {
                // if(this.p == 1){ this.p++}else {this.p++}
                console.log(this.type)
                // 异步更新数据
                setTimeout(() => {
                    this.p++

                    this.GET('?mod=appapi&act=life_goods&ctrl=goods',{
                        p:this.p,
                        type:this.type
                    },(res)=>{
                        if (res.data.data.length > 0) {


                            console.log(res.data.data)
                              this.goodsData = this.goodsData.concat(res.data.data)
                            this.loading = false;
                        }else {
                            this.loading = false;
                            this.finished = true;
                            console.log(this.goodsData)
                        }

                    })


                }, 500);
            },



            goGoods(item){
                this.appOpenWeb(item,'jump_goodsdetail')

            },
            gobackto(){
                    this.appOpenWeb({
                        is_need_login:"0",
                        SkipUIIdentifier: "pub_returnlastview",
                        view_type:"",
                        show_type_str:"",
                        url: "",
                        UIIdentifier:"",
                        name:"",
                        jsonInfo: "{\"outlink_style\":\"1\",\"outlink_check_fontcolor\":\"000000\",\"outlink_check_bgcolor\":\"FFFFFF\"}"
                    },'jump_SkipUIIdentifier')

            }
        },

    }
</script>






<style scoped>
  .HuiLife{
    width: 100%;
    background-color: #FAFAFA;
  }
.webTitle{

  font-size:36px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(38,36,41,1);
  line-height:42px;
  padding-top: 27px;
}
.back_icon{
  width: 20px;
  height: 34px;
  position: absolute;
  left: 24px;
  top: 30px;

}
  .tab{
    height: 80px;
    width: 100%;
    display: flex;
  }
  .tab_item{
    margin-left: 71px;
   display: flex;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(182,183,187,1);
    line-height:42px;
    align-items: center;
    justify-content: center;

  }
  .active{

    font-size:28px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(42,43,49,1);
    line-height:42px;
  }
  .yhq{
    width:717px;
    height: 270px;
    /*margin-top: 5px;*/
    background-image:url("../assets/bg-yhj.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;

  }
  .yhq_not{
    width:717px;
    height: 274px;
    /*margin-top: 5px;*/
    background-image:url("../assets/bg-2.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;

  }
  .left_img{
      width: 180px;
      height: 180px;
    position: absolute;
    left: 41px;
    top: 41px;
  }
  .left_img_not{
    width: 180px;
    height: 180px;
    position: absolute;
    left: 40px;
    top: 46px;
  }
  .yhj_title{
    width: 250px;
    height: 59px;
    position: absolute;
    left: 246px;
    top: 45px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(48,48,52,1);
    line-height:30px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;

  }
  .yhj_title_not{
    width: 400px;
    height: 65px;
    position: absolute;
    left: 250px;
    top: 52px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(48,48,52,1);
    line-height:32px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;

  }
  .icon_img{
    /*width: 26px;*/
    height: 26px;
    /*position: absolute;*/
    position: relative;
    display: inline-block;
    top: 2px;


  }

  .yhj_text{


  }
  .money{

    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(48,48,55,1);
    line-height:42px;
    position: absolute;
    left: 251px;
    top: 130px;
  }
  .money_not{

    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(48,48,55,1);
    line-height:42px;
    position: absolute;
    left: 255px;
    top: 130px;
  }
  .fan_bili{

    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(188,188,188,1);
    line-height:42px;
    position: absolute;
    left: 345px;
    top: 130.5px;
  }
  .fan_bili_not{

    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(188,188,188,1);
    line-height:42px;
    position: absolute;
    left: 355px;
    top: 130px;
  }
  .fan_text{

    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(254,59,33,1);
    line-height:42px;
    position: absolute;
    left: 248px;
    top: 186px;

  }
  .fan_text_not{

    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(254,59,33,1);
    line-height:42px;
    position: absolute;
    left: 255px;
    top: 180px;

  }
  .fan{

    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(254,59,33,1);
    line-height:42px;
    position: absolute;
    left: 360px;
    top: 186px;

  }
  .fan_not{

    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(254,59,33,1);
    line-height:42px;
    position: absolute;
    left: 368px;
    top: 180px;

  }
  .yhj_money{
    font-size:36px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(239,80,70,1);
    line-height:42px;
    position: absolute;
    right: 75px;
    top: 67px;



  }
.yhj_have{

  font-size:20px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(188,188,188,1);
  line-height:42px;
  position: absolute;
  right: 82px;
  top: 117px;

}
.bg_yhj{
  width: 140px;
  height: 44px;
  position: absolute;
  right: 43px;
  top: 173px;
}
  .bg_yhj_not{
    width: 140px;
    height: 44px;
    position: absolute;
    right: 49px;
    top: 174px;
  }
</style>
