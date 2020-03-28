<template>
  <div class="JiaYouDetail col" v-wechat-title="indexData.title">
    <div class="top_img" :style="{backgroundImage: 'url(' + indexData.top_bj + ')', backgroundSize:'100% 100%'}">

    </div>
    <div class="jyz_wrap">
      <img :src="indexData.logo" alt="" class="jiayou1">
      <div class="jyz_title">{{indexData.name}}</div>
<!--      <div class="jyz_rate">评价4.9</div>-->
      <div class="jyz_help" @click="goHelp">
        <img :src="indexData.help_icon" alt="" class="hxjs">
        <span class="help_text">{{indexData.help_str}}</span>
      </div>
    </div>

    <div class="dh_wrap">
      <div class="dh_title">{{indexData.address_title}}</div>
      <div class="dh_address">
        <img :src="indexData.address_icon" alt="" class="weizhi">
        <span class="weizhi_text">{{indexData.address}}</span>
      </div>
      <div class="pxline"></div>
      <div class="dh_juli" @click="goDaohang">
        <img :src="indexData.distance_icon" alt="" class="dh_icon">
        <span class="julitext">{{indexData.distance_str}}</span>
      </div>
    </div>

    <div class="yj_wrap">
      <div class="yj_title">{{indexData.oil_title}}</div>
      <div class="yj_fenlei" >
        <div class="fenlei_item" v-for="(item,index) in indexData.oil_price_list" :key="index" @click="oilClick(item)">
          <span class="fenlei_text" :style="{color:item.oilName==oilName?'#'+indexData.oil_code_color1:'#'+indexData.oil_code_color}">{{item.oilName}}</span>
        </div>
      </div>
      <div class="yj_price">
        <div class="price_item">
            <span class="yj_price1" :style="{color:'#'+indexData.oil_app_price_color}">¥<span >{{oilItem.priceYfq}}</span>/升</span>
            <span class="yj_price2">{{indexData.discount_str}}</span>
        </div>
        <div class="price_item">
          <span class="yj_price1">¥<span>{{oilItem.priceGun}}</span>/升</span>
          <span class="yj_price2">{{indexData.station_str}}</span>
        </div>
        <div class="price_item">
          <span class="yj_price1">¥<span>{{oilItem.priceOfficial}}</span>/升</span>
          <span class="yj_price2">{{indexData.country_str}}</span>
        </div>

      </div>
    </div>

<!--    <div class="pj_wrap">-->
<!--        <div class="pj_title">累计评价 (24)</div>-->
<!--        <div class="pj_box">-->
<!--          <div class="pj_box_top">-->
<!--            <img src="../assets/specialshopmore_headerbg.png" alt="" class="pj_headimg">-->
<!--            <div class="namestar">-->
<!--              <div class="pj_name">咕咕</div>-->
<!--              <div class="pj_star">-->
<!--                <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--                <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--                <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--                <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--                <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="pj_time">2019-12-17</div>-->
<!--          </div>-->
<!--          <div class="pj_content1">方便快捷，价格优惠。</div>-->
<!--          <div class="pj_content2">-->
<!--            <div class="pj_content2_text">小易回复： 感谢肯定，欢迎下次再来。</div>-->
<!--          </div>-->
<!--          <div class="pj_line"></div>-->
<!--        </div>-->

<!--      <div class="pj_box">-->
<!--        <div class="pj_box_top">-->
<!--          <img src="../assets/specialshopmore_headerbg.png" alt="" class="pj_headimg">-->
<!--          <div class="namestar">-->
<!--            <div class="pj_name">咕咕</div>-->
<!--            <div class="pj_star">-->
<!--              <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--              <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--              <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--              <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--              <img src="../assets/Shape.png" alt="" class="star_icon">-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="pj_time">2019-12-17</div>-->
<!--        </div>-->
<!--        <div class="pj_content1">方便快捷，价格优惠。</div>-->
<!--        <div class="pj_content2">-->
<!--          <div class="pj_content2_text">小易回复： 感谢肯定，欢迎下次再来。</div>-->
<!--        </div>-->
<!--        <div class="pj_line"></div>-->
<!--      </div>-->



<!--      <div class="look_more">查看更多</div>-->

<!--      <div class="nopj" v-if="nopj">-->
<!--        <img src="../assets/zwpj1.png" alt="" class="zwpj">-->
<!--        <span class="zwpj_text">暂无评价</span>-->
<!--      </div>-->
<!--    </div>-->

    <div class="go_jiayou" :style="{backgroundImage: 'url(' + indexData.btn_bj + ')', backgroundSize:'100% 100%',color:'#'+indexData.btn_color}" @click="goJiayou">
      {{indexData.btn_font}}

    </div>

  </div>
</template>

<script>
    export default {
        name: "JiaYouDetail",
      components: {
      },
      data(){
        return{
          title:'加油',
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
          url:"",
          indexData:"",
          oilName:"",
          oilItem:""





        }
      },
      created(){
        this.getRouterData()



        // this.getGoods()
      },
      mounted(){
        // var vConsole = new VConsole();
        // console.log('Hello world');


      },
      methods: {

        getIndex() {
          if(this.query.company=="ejy"){
            let jumpUrl = window.location.protocol +'//'+ window.location.host +"?mod=appapi&act=oil_station&ctrl=ejy_detail&station_id="+this.query.station_id+"&lat="+this.query.lat+"&lng="+this.query.lng
            window.location.href=jumpUrl


          }else
            {
              this.url ="?mod=appapi&act=oil_station&ctrl=czb_detail"
            }
          this.GET(this.url,{
            station_id:this.query.station_id,
            lat:this.query.lat,
            lng:this.query.lng,
            oil_code:this.query.oil_code
          },(res)=>{
            if (res.data.success==0){
              this.$alert({
                title: '提示',
                content: res.data.msg
              })

            }
            console.log(res.data)
            this.indexData = res.data.data
            for (let i=0;i<res.data.data.oil_price_list.length;i++){
                if(res.data.data.oil_price_list[i].is_check==1){

                  this.oilName=res.data.data.oil_price_list[i].oilName
                  this.oilItem=res.data.data.oil_price_list[i]
                }

            }
            // this.oilName=res.data.data.oil_price_list[0].oilName
            // this.oilItem=res.data.data.oil_price_list[0]

          })
        },


        goReport(){
          console .log("goreport")
        },
        oilClick(item){
          console.log(item)
          this.oilName=item.oilName
          this.oilItem=item


        },
        goDaohang(){
          // window.location.href="https://uri.amap.com/marker?position="+ this.query.lat + "," + this.query.lng + "&name="
        // <a href="https://uri.amap.com/marker?position=经度,纬度&name=所在的位置名称">高德地图</a>
        //   window.location.href="http://api.map.baidu.com/geocoder?location="+ this.indexData.lat + "," + this.indexData.lng + "&coord_type=gcj02&output=html&src=webapp.baidu.openAPIdemo"
          this.appOpenWeb({
            is_need_login: "1",
            SkipUIIdentifier: "pub_guide",
            show_type_str: "",
            destination_name:this.indexData.name,
            destination_lat:this.indexData.lat,
            destination_lng:this.indexData.lng,
            coord_type:"gcj02",
            url: "",
            jsonInfo: "{\"outlink_style\":\"1\",\"outlink_check_fontcolor\":\"000000\",\"outlink_check_bgcolor\":\"FFFFFF\"}"
          }, 'jump_SkipUIIdentifier')


        },
        getRouterData(){
          const query = this.$route.query
          console.log(query)//{que: "我是通过query传到组件B的参数"}
          this.query=query
          this.getIndex()
        },
        goHelp(){
          this.$router.push({
            path:'/JiaYouHelp',

          })
        },
        goJiayou(){
          this.$router.push({
            path:'/JiaYouOrder',
            query:{
              station_id:this.query.station_id,
              name:this.indexData.name,
              address:this.indexData.address,
              oil_price_list:JSON.stringify(this.indexData.oil_price_list)

            }
          })
        },

      },

    }
</script>

<style scoped>
.JiaYouDetail{
  width:100%;
  min-height:1364px;
  background:rgba(247,250,255,1);
}
  .top_img{
    width: 100%;
    height: 300px;


  }
  .jyz_wrap{
    width:710px;
    height:206px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 16px 0px rgba(225,231,255,0.49);
    border-radius:12px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -110px;
    position: relative;
    display: flex;
    /*align-items: center;*/
    justify-content: center;
  }
  .jiayou1{
    width: 148px;
    height: 148px;
    position: absolute;
    /*left: 281px;*/
    top: -76px;
  }
  .jyz_title{
    font-size:32px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(0,0,0,1);
    position: absolute;
    top: 98px ;
  }
  .jyz_rate{
    position: absolute;
    top: 158px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .jyz_help{
    position: absolute;
    top: 156px;
    right: 24px;
    display: flex;
    align-items: center;
  }
  .hxjs{
    width: 24px;
    height: 24px;
    margin-right: 7px;

  }
  .help_text{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .dh_wrap{
    width:710px;
    height:178px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 16px 0px rgba(235,219,223,0.49);
    border-radius:12px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    position: relative;

  }
  .dh_title{
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
    position: absolute;
    left: 33px;
    top: 40px;
  }
  .dh_address{
    position: absolute;
    left: 34px;
    top: 94px;
    display: flex;
    /*align-items: center;*/
  }
  .weizhi{
    width: 22px;
    height: 26px;
    margin-right: 10px;
    margin-top: 4px;
  }
  .weizhi_text{
    width:399px;
    /*height:52px;*/
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
  .pxline{
    width:1.5px;
    height:64px;
    background:rgba(221,221,221,1);
    position: absolute;
    left: 514px;
    top: 68px;
  }
  .dh_juli{
    /*width: 112px;*/
    /*height: 112px;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 38px;
    right: 30px;
  }
  .dh_icon{
    width: 74px;
    height: 74px;

  }
  .julitext{

    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(65,67,79,1);
  }
  .yj_wrap{
    width:710px;
    height:244px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 16px 0px rgba(225,231,255,0.49);
    border-radius:12px;
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
    position: relative;
  }
  .yj_title{
    position: absolute;
    left: 34px;
    top: 39px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
.yj_fenlei{
  position: absolute;
  top: 36px;
  left: 224px;
  display: flex;
  align-items: center;
  width: 467px;
  height: 54px;
}
  .fenlei_item{
    background-image: url("../assets/juxing1430.png");
    background-size: 100% 100%;
    width: 96px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 19px;
  }
  .fenlei_text{

    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    /*color:rgba(0,124,250,1);*/
  }
  .yj_price{
    height: 80px;
    width: 100%;
    position: absolute;
    bottom: 29px;
    display: flex;
    align-items: center;

  }
.price_item{
  /*font-size:32px;*/
  /*font-family:PingFang SC;*/
  /*font-weight:500;*/
  /*color:rgba(51,51,51,1);*/
  flex: 1;
  text-align: center;
  flex-direction: column;
  /*height: 88px;*/
  display: flex;
  height: 100%;
  align-items: center;
  /*justify-content: center;*/
}
  .yj_price1{

    font-size:34px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .yj_price2{

    font-size:26px;
    font-family:Arial;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .pj_wrap{
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    position: relative;
    width:710px;
    /*height:694px;*/
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 16px 0px rgba(225,231,255,0.49);
    border-radius:12px;
  }
  .go_jiayou{
    width: 100%;
    height: 123px;
    position: fixed;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .pj_title{
    margin-left: 35px;
    margin-top: 40px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .pj_box{
    /*height: 256px;*/
    width: 100%;
    position: relative;
  }
  .pj_headimg{
    width: 64px;
    height: 64px;
    margin-left: 34px;

  }
  .pj_name{
    padding-left: 8px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .pj_star{

    display: flex;
    align-items: center;
  }
  .star_icon{
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }
  .pj_time{
    position: absolute;

    right: 30px;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .pj_content{
    margin-top: 14px;
    margin-left: 114px;
    width: 567px;

  }
  .pj_content1{
    margin-top: 14px;
    margin-left: 114px;
    margin-bottom: 19px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .pj_content2{
    margin-left: 114px;
    /*background:rgba(243,241,241,1);*/
    /*border-radius:0px 20px 20px 20px;*/
    margin-bottom: 30px;
    display: flex;

  }
  .pj_content2_text{

    background:rgba(243,241,241,1);
    border-radius:0px 20px 20px 20px;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
    padding-left: 17px;
    padding-right: 17px;
  }
  .pj_line{
    width:568px;
    height:1px;
    background:rgba(221,221,221,1);

    margin-left: 114px;
  }
  .look_more{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    margin-top: 39px;
    margin-bottom: 40px;
  }
  .pj_box_top{
    margin-top: 42px;
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;

  }
  .namestar{
    height: 64px;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
  }
  .nopj{
    height: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .zwpj{
    width: 140px;
    height: 168px;

  }
  .zwpj_text{
    margin-top: 33px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
  }

</style>
