<template>
  <div class="MyInvite col" v-wechat-title="indexData.title">
    <div class="invite_top" :style="{backgroundImage: 'url(' + indexData.bj_img + ')', backgroundSize:'100% 100%'}">
      <div class="toRule" :style="{backgroundImage: 'url(' + indexData.rule_img + ')', backgroundSize:'100% 100%'}" @click="toRule"></div>
      <div class="head_img" :style="{backgroundImage: 'url(' + indexData.head_img + ')', backgroundSize:'100% 100%'}"></div>
      <div class="name">{{indexData.nickname}}</div>
      <div class="invite_code">{{indexData.tgid_str}}</div>
    </div>

    <div class="invite_mid" :style="{backgroundImage: 'url(' + indexData.new_data.bj_img + ')', backgroundSize:'100% 100%'}">
      <div class="laxin_process" :style="{backgroundImage: 'url(' + indexData.new_data.img + ')', backgroundSize:'100% 100%'}"></div>
      <div class="process_box" v-for="item in indexData.new_data.list">
          <div class="yj_jiangli">{{item.title}}</div>
          <div class="goal_money">{{item.info}}</div>
          <div class="jiangli_process">
            <div class="have_process" :style="{width:item.jindu+'%',backgroundColor:'#'+ item.jindu_color}"></div>
            <div class="process_text">{{item.info1}}</div>
          </div>
      </div>


      <div class="djs">
        <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="item1">{{ timeData.days }}</span>
            <span class="item2">{{ timeData.hours }}</span>
            <span class="item3">{{ timeData.minutes }}</span>
            <span class="item4">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
    </div>


    <div class="invite_bottom" >
      <div class="yellow_buttom">
        <div @click="showButtom" v-bind:class="[yellow? payClass : paynoClass]">{{indexData.total_data.list[0].str}}</div>
        <div @click="showButtom1" v-bind:class="[yellow? paynoClass : payClass]">{{indexData.total_data.list[1].str}}</div>
      </div>
      <div class="invite_content" v-if="select">
        <div>
          <span class="content_text" v-for="item in rankData">{{item.name}}</span>

        </div>
        <div v-if="rankList.length>0">
          <div class="member" v-for="item in rankList">
            <div class="rank_img" v-if="!item.phb_img== '' " :style="{backgroundImage: 'url(' + item.phb_img + ')', backgroundSize:'100% 100%'}"></div>
            <div class="member_rank" v-else>{{item.id}}</div>
            <div class="member_name">{{item.nickname}}</div>
            <div class="member_invited">{{item.invite_num}}</div>
            <div class="member_sell">{{item.buy_sum}}</div>
          </div>
        </div>
        <div v-else class="nodata">暂无数据，快去邀请好友吧~</div>


      </div>
      <div class="invite_content1" v-if="!select">
        <div class="top_box" v-for="item in showData.total">
          <div class="top_box_title">{{item.str}}</div>
          <div class="big_text_box">
            <div >{{item.val}}</div>
          </div>
<!--          <div class="top_box_smalltext">元</div>-->
          <div class="shu_line"></div>
        </div>


        <div class="finish">
          <div  @click="showFinish" v-bind:class="[red? redClass : rednoClass]">{{showData.cate[0].str}}</div>
          <div  @click="showFinish1" v-bind:class="[red? rednoClass : redClass]">{{showData.cate[1].str}}</div>
        </div>
        <div class="finish_box1" v-if="finish">
          <div class="finish_title" v-for="item in showData.cate[0].list">{{item.name}}</div>


          <div class="finish_box_box">
            <div v-if="rankList1.length>0">
              <div class="finish_box_contentbox" v-for="item in rankList1">
                <span class="finish_box_left">{{item.reg_time}}</span>
                <span class="finish_box_mid">{{item.nickname}}</span>
                <span class="finish_box_right">{{item.buy_sum}}</span>
              </div>
            </div>
            <div v-else class="nodata">暂无数据，快去邀请好友吧~</div>


          </div>
        </div>
        <div class="finish_box2" v-if="!finish">
          <div class="finish_title" v-for="item in showData.cate[1].list">{{item.name}}</div>


          <div class="finish_box_box">
            <div v-if="rankList2.length>0">
              <div class="finish_box_contentbox" v-for="item in rankList2">
                <span class="finish_box_left">{{item.nickname}}</span>
                <span class="finish_box_mid1">{{item.status_str}}</span>
                <span class="finish_box_right1">{{item.buy_sum}}</span>
              </div>
            </div>
            <div v-else class="nodata">暂无数据，快去邀请好友吧~</div>

          </div>
        </div>


      </div>
      <div class="member_shuoming" v-if="!select">
        {{indexData.total_data.rule_str}}
      </div>
      <div class="my_invite" :style="{backgroundImage: 'url(' + indexData.btn_data[0].img + ')', backgroundSize:'100% 100%'}" @click="toInvite">

      </div>
    </div>

    <div class="toShare" v-if="!invite">
      <div class="share_text">分享至</div>
      <div class="share_box">
        <div class="share_img"></div>
        <div class="share_imgtext">微信</div>
      </div>
      <div class="share_box">
        <div class="share_img"></div>
        <div class="share_imgtext">微信</div>
      </div>
      <div class="share_box">
        <div class="share_img"></div>
        <div class="share_imgtext">微信</div>
      </div>
      <div class="share_box">
        <div class="share_img"></div>
        <div class="share_imgtext">微信</div>
      </div>
      <div class="share_box">
        <div class="share_img"></div>
        <div class="share_imgtext">微信</div>
      </div>
    </div>


  </div>
</template>

<script>
    export default {
        name: "MyInvite",
        data() {
            return {
                copyText:"http://hairuyi.com/admin/?mod=&actlogin&ctrl=index",
                indexData:"",
                time:944847184,
                now:"542",
                goal:"1000",
                now1:"20",
                goal1:"100",
                select:true,
                finish:true,
                invite:true,
                yellow:true,
                payClass:"buttom_left",
                paynoClass:"buttom_right",
                redClass:"finish_left",
                rednoClass:"finish_right",
                red:true,
                rankList:"",
                rankList1:"",
                rankList2:"",
                rankData:""


            };
        },
        created(){
            this.getIndex()
            this.getRankRate()
            this.getRanklist()
            this.geInviteshow()


        },
        methods: {
            getIndex(){
                this.GET('?mod=appapi&act=wph_new&ctrl=invite_total', {

                }, (res) => {
                    console.log(res.data)
                    this.indexData=res.data.data
                    this.time = res.data.data.new_data.djs * 1000


                })
            },
            getRankRate(){
                this.GET('?mod=appapi&act=wph_new&ctrl=rank_cate', {

                }, (res) => {
                    console.log(res.data)
                    this.rankData=res.data.data
                })
            },
            getRanklist(){
                this.GET('?mod=appapi&act=wph_new&ctrl=rank_list', {
                      p:"1",
                      type:"rank",
                    second_type:"success"
                }, (res) => {
                    console.log(res.data)
                    this.rankList=res.data.data
                })
            },
            geInviteshow(){
                this.GET('?mod=appapi&act=wph_new&ctrl=invite_show', {
                }, (res) => {
                    console.log(res.data)
                    this.showData=res.data.data
                })
            },
            toAdv(item){
                console.log(item)
            },
            showFinish(){
                this.finish=true
                this.red = true
                this.GET('?mod=appapi&act=wph_new&ctrl=rank_list', {
                    p:"1",
                    type:"invite",
                    second_type:"success"
                }, (res) => {
                    console.log(res.data)
                    this.rankList1=res.data.data
                })
            },
            showFinish1(){
                this.finish=false
                this.red = false
                this.GET('?mod=appapi&act=wph_new&ctrl=rank_list', {
                    p:"1",
                    type:"invite",
                    second_type:"wait"
                }, (res) => {
                    console.log(res.data)
                    this.rankList2=res.data.data
                })
            },
            showButtom(){
                this.select=true
                this.yellow=true
            },
            showButtom1(){
                this.select=false
                this.yellow=false
                this.GET('?mod=appapi&act=wph_new&ctrl=rank_list', {
                    p:"1",
                    type:"invite",
                    second_type:"success"
                }, (res) => {
                    console.log(res.data)
                    this.rankList1=res.data.data
                })

            },
            toRule(){
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: "pub_wailian",
                    show_type_str:"",
                    url: this.indexData.rule_url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                },'jump_SkipUIIdentifier')
            },

            toInvite(){
                this.isLogin(()=>{
                    this.appOpenWeb(this.indexData.btn_data[0],'jump_SkipUIIdentifier')
                })

            },


        }
    }
</script>

<style scoped>
  .nodata{
    text-align: center;
    font-size:20px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,0,0,1);
    line-height:100px;
    opacity:0.6;
  }
  .share_img{
width: 100px;
    height: 100px;

  }
  .share_imgtext{
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(49,50,53,1);
    /*line-height:48px;*/
    text-align: center;
  }
  .share_box{
    position: relative;
    width: 105px;
    height: 125px;
    margin-top: 69px;
    margin-left: 24px;
    margin-right: 20px;
    float: left;
  }
  .toShare{
    /*position: fixed;*/
    bottom: 0;
    width:750px;
    height:331px;
    background:rgba(255,255,255,1);
    border-radius:29px 29px 0px 0px;
  }
  .share_text{
    width:120px;
    /*height:34px;*/
margin-top: 23px;
    margin-left: auto;
    margin-right: auto;
    font-size:36px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(35,32,32,1);

  }
.invite_top{
  height: 464px;
  width: 100%;
  position: relative;
}
  .toRule{
    width: 142px;
    height: 44px;
    position: absolute;

    right: 0;
    top: 18px;
  }
  .head_img{
    width:110px;
    height:110px;
    background:rgba(237,237,237,1);
    border-radius:50%;
    position: absolute;
    left: 38px;
    bottom: 39px;

  }
  .name{
    /*width:128px;*/
    height:44px;
    font-size:48px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    position: absolute;
    left: 164px;
    bottom: 91px;
  }
  .invite_code{
    /*width:171px;*/
    height:23px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    position: absolute;
    left: 162px;
    bottom: 47px;
  }
  .invite_mid{
height: 416px;
    width: 100%;

  }
  .laxin_process{
    margin-top: 5px;
height: 36px;

  }
  .process_box{
    position: relative;
    height: 75px;
    width: 100%;
    margin-top: 28px;

  }
  .yj_jiangli{
    /*width:95px;*/
    position: absolute;
    left: 30px;
    height:23px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
  }
  .goal_money{
    position: absolute;
    right: 111px;
    height:17px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .jiangli_process{
    position: absolute;
    left: 69px;
    bottom: 0;
    width:540px;
    height:34px;
    background:rgba(74,19,107,1);
    border-radius:17px;
    text-align: center;
  }
  .process_text{
    position: absolute;
    left: 219px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .have_process{
    position: absolute;
    width:380px;
    height:34px;
    /*background:linear-gradient(87deg,rgba(249,189,7,1) 0%,rgba(251,68,81,1) 100%);*/
    border-radius:17px;
  }
.process_text1{
  position: absolute;
  left: 219px;
  font-size:18px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(177,70,241,1);
}
.have_process1{
  position: absolute;
  width:147px;
  height:34px;
  /*background:linear-gradient(-83deg,rgba(253,3,162,1) 0%,rgba(249,110,251,1) 99%);*/
  border-radius:17px;
}
  .djs{
    position: relative;
width: 463px;
    height: 82px;
    background-image: url("../assets/Miao.png");
    background-size: 100% 100%;
    margin-left: 136px;
    margin-top: 54px;
  }
  .item1{
    position: absolute;
    right: 382px;
    top: 25px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(255,255,255,1);
  }
.item2{
  position: absolute;
  right: 277px;
  top: 25px;
  font-size:30px;
  font-family:PingFang SC;
  font-weight:800;
  color:rgba(255,255,255,1);
}
.item3{
  position: absolute;
  right: 166px;
  top: 25px;
  font-size:30px;
  font-family:PingFang SC;
  font-weight:800;
  color:rgba(255,255,255,1);
}
.item4{
  position: absolute;
  right: 60px;
  top: 25px;
  font-size:30px;
  font-family:PingFang SC;
  font-weight:800;
  color:rgba(255,255,255,1);
}
  .invite_bottom{
    height: 1588px;
    width: 100%;
    background-image: url("../assets/zisebg.png");
    background-size: 100% 100%;
  }
  .yellow_buttom{
    width: 468px;
    height: 65px;
    background-size: 100% 100%;
    margin-left: 146px;
    margin-top: 37px;

  }
  .buttom_left{
    text-align: center;
    width: 50%;
    height: 65px;
    float: left;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(255,255,255,1);
    line-height:65px;
    background-color: #F9B706;
  }
  .buttom_right{
    text-align: center;
height: 65px;
    width: 50%;
    float: left;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(249,183,6,1);
    line-height:65px;
    background-color: #FFFFFF;
  }
  .invite_content{
    position: relative;
width: 659px;
    height: 899px ;
    margin-left: auto;
    margin-right: auto;
    margin-top: 78px;
    overflow: hidden;
    /*background-color: goldenrod;*/
  }
.invite_content1{
  position: relative;
  width: 659px;
  height: 899px ;
  margin-left: auto;
  margin-right: auto;
  margin-top: 78px;
  /*background-color: goldenrod;*/
}
  .my_invite{
width: 628px;
    height: 106px;

    margin-top: 40px;
    margin-left: 69px;
  }
  .content_text{
    margin-left: 45px;
    margin-right: 42px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,0,0,1);
    /*line-height:100px;*/
    opacity:0.6;
  }
  .member{
    position: relative;
    margin-top: 20px;
    height: 72px;
    width: 100%;
  }
  .rank_img{
    position: absolute;
    left: 53px;
    top: 20px;
    width: 32px;
    height: 40px;

  }
  .member_rank{
    position: absolute;
    left: 54px;
    top: 20px;

    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,0,0,1);
    opacity:0.75;

  }
.member_name{
  position: absolute;
  left: 162px;
  top: 20px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(0,0,0,1);
  /*line-height:100px;*/

}
.member_invited{
  position: absolute;
  left: 345px;
  top: 20px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(0,0,0,1);

}
.member_sell{
  position: absolute;
  left: 510px;
  top: 20px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(0,0,0,1);

}
  .member_shuoming{
    width: 656px;
    /*height: 110px;*/
    margin-top: 37px;
    margin-left: auto;
    margin-right: auto;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
  }
  .top_box{
    position: relative;
    float: left;
    margin-left: 38px;
height: 113px;
    width: 180px;
  }
  .big_text_box{
    width: 180px;
    position: absolute;
    bottom: 0;
    right: 20px;
    text-align: center;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(226,76,58,1);
  }
  .shu_line{
    float: right;
    width:2px;
    height:88px;
    background:rgba(229,229,229,1);
  }
  .top_box_title{
position: absolute;
    left: 11px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(42,41,41,1);
    /*line-height:100px;*/
  }
  .top_box_bigtext{
    right: 80px;
    position: absolute;
    bottom: 0;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(226,76,58,1);
    /*line-height:100px;*/
  }
  .top_box_smalltext{
    position: absolute;
    bottom: 10px;
    right: 36px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(226,76,58,1);
    /*line-height:100px;*/
  }
.top_box_bigtext1{
  right: 95px;
  position: absolute;
  bottom: 0;
  font-size:48px;
  font-family:PingFang SC;
  font-weight:800;
  color:rgba(226,76,58,1);
}
.top_box_smalltext1{
  position: absolute;
  bottom: 10px;
  right: 66px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(226,76,58,1);
  /*line-height:100px;*/
}
.top_box_bigtext2{
  right: 75px;
  position: absolute;
  bottom: 0;
  font-size:48px;
  font-family:PingFang SC;
  font-weight:800;
  color:rgba(226,76,58,1);
}
.top_box_smalltext2{
  position: absolute;
  bottom: 10px;
  right: 30px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(226,76,58,1);
  /*line-height:100px;*/
}
.top_box_smalltextYue{
  position: absolute;
  bottom: 10px;
  /*left: 6px;*/
  font-size:24px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(226,76,58,1);
  /*line-height:100px;*/
}
  .finish{
    position: absolute;
    width: 388px;
    height: 52px;
    left: 140px;
    top: 153px;


  }
  .finish_left{
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 50px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(255,255,255,1);
    background-color: #EB6666;
    border: 1px solid #EB6666;
  }
.finish_right{
  float: left;
  width: 50%;
  height: 100%;
  text-align: center;
  line-height: 50px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:800;
  color:rgba(235,102,102,1);
  background-color: #FFF;
  border: 1px solid #EB6666;
}
  .finish_box1{
    height: 660px;
    width: 100%;
    position: absolute;
    top: 238px;
  }
.finish_box2{
  height: 660px;
  width: 100%;
  position: absolute;
  top: 238px;
}
  .finish_title{
    float: left;
    margin-left: 55px;
    margin-right: 55px;
    width: 100px;
    height: 23px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,0,0,1);
    /*line-height:100px;*/
    opacity:0.6;
    text-align: center;

  }
  .finish_box_box{
    position: absolute;
    top: 50px;
    width: 100%;
    height: 610px;
    overflow: hidden;
  }
  .finish_box_contentbox{
margin-top: 35px;
    position: relative;
    height: 40px;
  }

  .finish_box_left{
    position: absolute;
    left: 40px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,0,0,1);
    /*line-height:100px;*/
  }
.finish_box_mid{
  position: absolute;
  left: 260px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(0,0,0,1);
  /*line-height:100px;*/
}
.finish_box_mid1{
  position: absolute;
  margin-left: 260px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(249,183,6,1);
  /*line-height:100px;*/

}
.finish_box_right{
  position: absolute;
  right: 102px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(0,0,0,1);
  /*line-height:100px;*/
}
.finish_box_right1{
  position: absolute;
  right: 102px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(0,0,0,1);
  /*line-height:100px;*/
}
</style>
