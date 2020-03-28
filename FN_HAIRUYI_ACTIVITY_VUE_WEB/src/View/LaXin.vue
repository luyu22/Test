<template>
    <scroller>
        <div
        :style="{backgroundColor:'#'+indexData.bj_color}"
        class="laxin col animated fadeIn"
        v-wechat-title="indexData.top_title">
            <div class="intro-container col"
            :style="{backgroundImage:'url('+indexData.top_bjimg+')'}">
                <img :src="indexData.top_logo" alt=""
                class="intro-top-image">
                <div class="container-outsize"
                v-if="indexData.actvity_enddata.is_show==1">
                    <div class="container-middle">
                        <div class="container-inside pt-30 col">
                            <div class="row container-title-box">
                                <div class="cicle-18"></div>
                                <div class="cicle-24"></div>
                                <span>{{indexData.actvity_enddata.title}}</span>
                                <div class="cicle-24"></div>
                                <div class="cicle-18"></div>
                            </div>
                            <span class="time-text">{{indexData.actvity_enddata.info}}</span>
                            <div
                            class="activity-text-box"
                            v-for="(item,index) in indexData.actvity_enddata.list"
                            :key="index">
                                <span class="activity-text-title"
                                :style="{color:'#'+item.color}"
                                v-if="item.title!=''">{{item.title}}</span>
                                <span class="activity-text-info"
                                :style="{color:'#'+item.info_color}">{{item.info}}</span>
                                <div>
                                    <span class="activity-text-info1"
                                    :style="{color:'#'+item.info_color1}">{{item.info1}}</span>
                                </div>
                            </div>
                            <span
                            class="rule-text"
                            v-for="(item, index) in indexData.actvity_enddata.rule"
                            :key="index"
                            :style="{color:'#'+item.info_color}"><span :style="{color:'#'+item.color}">{{item.title}}</span>{{item.info}}</span>
                        </div>
                    </div>
                </div>
                <div class="container-outsize mt-30"
                v-if="indexData.actvity_data.is_show==1">
                    <div class="container-middle">
                        <div class="container-inside pt-30 col">
                            <div class="row container-title-box">
                                <div class="cicle-18"></div>
                                <div class="cicle-24"></div>
                                <span>{{indexData.actvity_data.title}}</span>
                                <div class="cicle-24"></div>
                                <div class="cicle-18"></div>
                            </div>
                            <span class="time-text">{{indexData.actvity_data.info}}</span>
                            <div
                            class="activity-text-box"
                            v-for="(item,index) in indexData.actvity_data.list"
                            :key="index">
                                <span class="activity-text-title"
                                :style="{color:'#'+item.color}"
                                v-if="item.title!=''">{{item.title}}</span>
                                <span class="activity-text-info"
                                :style="{color:'#'+item.info_color}">{{item.info}}</span>
                                <div><span class="activity-text-info1"
                                :style="{color:'#'+item.info_color1}">{{item.info1}}</span></div>
                            </div>

                            <span
                            class="rule-text"
                            v-for="(item, index) in indexData.actvity_data.rule"
                            :key="index"
                            :style="{color:'#'+item.info_color}"><span :style="{color:'#'+item.color}">{{item.title}}</span>{{item.info}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <img class="share-button"
            :src="indexData.btn_img" alt=""
            @click="share">

            <div class="container-outsize mt-30"
            @click="navigate(indexData.own_data)">
                <div class="container-middle">
                    <div class="container-inside my-laxin-box row">
                        <img class="my-laxin-icon"
                        :src="indexData.own_data.head_img" alt="">
                        <span class="my-laxin-text-1">{{indexData.own_data.nickname}}</span>
                        <span class="my-laxin-text-2">{{indexData.own_data.phone}}</span>
                        <span class="my-laxin-text-3">{{indexData.own_data.str}}</span>
                        <span class="my-laxin-text-4">{{indexData.own_data.count}}</span>
                        <div class="my-laxin-line"></div>
                        <img class="my-laxin-more"
                        :src="indexData.more_img" alt="">
                    </div>
                </div>
            </div>

            <div class="container-outsize mt-30">
                <div class="container-middle">
                    <div class="container-inside pt-30 col">
                        <div class="row container-title-box">
                            <div class="cicle-18"></div>
                            <div class="cicle-24"></div>
                            <span>{{indexData.ranklist_data.str}}</span>
                            <div class="cicle-24"></div>
                            <div class="cicle-18"></div>
                        </div>
                        <span class="time-text">{{indexData.ranklist_data.info}}</span>
                        <div class="rank-nav">
                            <span :class="'rank-text-'+(index+1)"
                            v-for="(item, index) in indexData.ranklist_data.field_data"
                            :key="index">{{item}}</span>
                            <!-- <span class="rank-text-2">用户ID</span>
                            <span class="rank-text-3">拉新人数(人)</span> -->
                        </div>
                        <div class="list-item-box"
                        v-for="(item, index) in listData"
                        :key="index">
                            <img class="rank-icon"
                            :src="item.rank_img" alt=""
                            v-if="item.rank_img!=''">
                            <span class="rank-num-text"
                            v-if="item.rank_img==''">{{item.rank_id}}</span>
                            <img class="list-icon"
                            :src="item.head_img" alt="">
                            <span class="list-text-1">{{item.nickname}}</span>
                            <span class="list-text-2">{{item.phone}}</span>
                            <span class="list-text-3">{{item.extend_count}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </scroller>
</template>

<script>
    export default {
        data(){
            return{
                title:'拉新排行榜',
                content:'ps：Top排行榜必须达到对应有效拉新人数才能获得对应奖励。如TOP1有效拉新人数是2999，未达到Top1的最低拉新要求，则只能获得华为P30手机+精英奖杯奖励，以此类推。其次请勿恶意刷量，如若发现则取消该参与人的竞选资格！活动最终解释权归嗨如意所有。',
                indexData:{
                    btn_img:'',
                    bj_color:'FFC000',
                    top_title:'拉新排行榜',
                    own_data:{
                        count:'',
                        head_img:'',
                        nickname:'',
                        phone:'',
                        str:''
                    },
                    ranklist_data:{
                        field_data:[],
                        info:'',
                        str:''
                    },
                    actvity_data:{
                        list:[],
                        rule:[],
                        title:'',
                        info:''
                    },
                    actvity_enddata:{
                        list:[],
                        rule:[],
                        title:'',
                        info:''
                    },
                    more_img:''
                },
                listData:[]
            }
        },
        created(){
            this.getIndex()
            this.getList()
        },
        mounted(){
            // this.content =  this.brightenKeyword(this.content,'ps','FBBE10')
            // this.content =  this.brightenKeyword(this.content,'请勿','FF3434')
        },
        methods: {
            getIndex(){
                this.GET('/?mod=appapi&act=invite_ranklist&ctrl=index',{},(res)=>{
                    if(res.data.success==1){
                        this.indexData = res.data.data
                    }
                })
            },
            getList(){
                this.GET('/?mod=appapi&act=invite_ranklist&ctrl=rank_list',{},(res)=>{
                    if(res.data.success==1){
                        for(let key in res.data.data){
                            this.listData.push(res.data.data[key])
                        }
                    }
                })
            },
            navigate(item){
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: item.SkipUIIdentifier,
                    show_type_str:"",
                    url: item.url,
                    jsonInfo: item.jsonInfo
                },'jump_SkipUIIdentifier')
            },
            share(){
                this.appOpenWeb({
                    is_need_login:"0",
                    SkipUIIdentifier: this.indexData.SkipUIIdentifier,
                    show_type_str:"",
                    url: "",
                    jsonInfo: ""
                },'jump_SkipUIIdentifier')
            }
        }
    }
</script>

<style scoped>
.laxin{
    align-items: center;
    padding-bottom: 50px;
}
.intro-container{
    width:702px;
    /* height:1407px; */
    /* background:linear-gradient(0deg,rgba(255,192,0,1),rgba(255,217,62,1)); */
    border-radius:10px;
    margin-top: 20px;
    align-items: center;
    background: no-repeat center center;
    background-size: 100% 100%;
}
.intro-top-image{
    width: 100%;
    height: auto;
    margin-top: 5px;
    margin-bottom: 10px;
}
.container-outsize{
    border-radius: 22px;
    padding: 2px;
    background:rgba(254,218,62,0.3);
}
.container-middle{
    border-radius: 22px;
    padding: 1px;
    background:rgba(254,218,62,0.5);
}
.container-inside{
    border-radius: 22px;
    width: 679px;
    /* height: 800px; */
    background-color: #fff;
    align-items: center
}
.container-title-box{
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 40px;
}
.cicle-18{
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #FEDA3E
}
.cicle-24{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #FBBE10;
    margin-left: 8px;
    margin-right: 8px;
}
.container-title-box span{
    font-size:34px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height: 40px;
    margin-left: 2px;
    margin-right: 2px;
    margin-top: 3px;
}
.time-text{
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    margin-top: 20px;
    margin-bottom: 10px;
}
.rule-text{
    width: 590px;
    font-size:22px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#9C6714;
    line-height:30px;
    margin-bottom: 40px;
    margin-top: 20px;
}

.share-button{
    width: 687px;
    height: 133px;
    margin-top: 20px;
}
.my-laxin-box{
    height: 135px;
    position: relative;
}
.my-laxin-icon{
    width: 78px;
    height: 78px;
    position: absolute;
    left: 29px;
    top: 29px;
}
.my-laxin-text-1{
    font-size:24px;
    line-height: 24px;
    font-weight:400;
    color:rgba(51,51,51,1);
    position: absolute;
    left: 133px;
    top: 36px;
}
.my-laxin-text-2{
    font-size:20px;
    line-height: 20px;
    font-weight:400;
    color:#666666;
    position: absolute;
    left: 133px;
    top: 85px;
}
.my-laxin-text-3{
    font-size:24px;
    line-height: 24px;
    font-weight:400;
    color:rgba(51,51,51,1);
    position: absolute;
    left: 398px;
    top: 36px;
}
.my-laxin-text-4{
    font-size:24px;
    line-height: 24px;
    font-weight:400;
    color:#FF3939;
    position: absolute;
    left: 398px;
    top: 82px;
}
.my-laxin-line{
    width:2px;
    height:48px;
    background:rgba(240,240,240,1);
    position: absolute;
    left: 339px;
    top: 44px;
}
.my-laxin-more{
    width: 72px;
    height: 72px;
    position: absolute;
    right: -24px;
    top: 31px;
}

.rank-nav{
    width: 100%;
    height: 78px;
    background: #F4F4F4;
    margin-top: 20px;
    padding-left: 56px;
}
.rank-nav span{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height: 78px
}
.rank-text-2{
    margin-left: 121px;
    margin-right: 155px;
}

.list-item-box{
    width: 100%;
    height: 148px;
    border-top-width: 1px;
    border-top-color: #F0F0F0;
    border-top-style: solid;
    position: relative;
}
.rank-icon{
    width: 58px;
    height: 58px;
    position: absolute;
    left: 50px;
    top: 41px;
}
.list-icon{
    width: 78px;
    height: 78px;
    position: absolute;
    left: 145px;
    top: 31px;
    border-radius: 50%
}
.list-text-1{
    font-size:24px;
    line-height: 24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    position: absolute;
    left: 252px;
    top: 38px;
}
.list-text-2{
    font-size:20px;
    line-height: 20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#666666;
    position: absolute;
    left: 252px;
    top: 86px;
}
.list-text-3{
    width: 135px;
    position: absolute;
    left: 463px;
    line-height: 148px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    text-align: center
}
.rank-num-text{
    position: absolute;
    left: 70px;
    top: 0px;
    line-height: 148px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:bold;
    color:rgba(51,51,51,1);
}


.mt-30{
    margin-top: 30px;
}
.mb-30{
    margin-bottom: 30px;
}
.pt-30{
    padding-top: 30px;
}
.pt-0{
    padding-top: 0px;
}
.activity-text-box{
    width: 520px;
    margin-top: 10px;
}
.activity-text-title{
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    line-height:36px;
    margin-right: 15px;
}
.activity-text-info,.activity-text-info1{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    line-height:36px;
}
/* .activity-text-info1{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    line-height:36px;
} */
</style>
