<template>
    <div class="SpecialShop col" v-wechat-title="title">
        <FNHeader
        :needShadow="false"
        :headerStyles="headerStyles"
        class="fn-header"
        :title="headerTitle"/>
        <img class="top-background"
        :src="topData.bj_img"/>

        <span class="text-1"
        :style="{color:'#'+topData.top_fontcolor}">{{topData.info}}</span>
        <div v-for="(item,index) in arrComponents" :key="index"
        class="component">
            <component v-bind:is="item.component"
            :imageList="item.Data"
            :FNSpecialShopItemData="item.Data"
            @refreshRemainList="refreshRemainList"></component>
        </div>
        <img class="remain_clock_icon"
        :src="topData.remind_img" alt=""
        @click="showRemainList"
        v-if="topData.remind_img!=''">
        <img class="order_icon"
        :src="topData.order_img" alt=""
        @click="navigateToOrder"
        v-if="topData.order_img!=''">
        <img class="rule_icon"
        :src="topData.rule_img" alt=""
        @click="navigateToRule"
        v-if="topData.rule_img!=''">
        <!-- <div class="back-test"
        @click="goBack">返回</div>
        <div class="login-test"
        @click="goLogin">登陆</div> -->
        <popup v-model="isShowBottom">
            <div class="popup-container">
                <div class="popup-header col">
                    <span>我的提醒</span>
                </div>
                <div class="popup-list-box">
                    <scroller
                    :on-infinite="infinite"
                    class="popup-list"
                    ref="remainListScroller">
                            <div class="popup-nodata-box col"
                            v-if="remainListData.length==0">
                                <span>暂未设置提醒</span>
                                <span>赶紧去挑选商品吧</span>
                                <div class="button col"
                                @click="isShowBottom=false">
                                    <span>去逛逛</span>
                                </div>
                            </div>
                            <div class="popup-list-container col">
                                <FNRemainProduct
                                v-for="(item, index) in remainListData"
                                :key="index"
                                :itemData="item"
                                @refreshRemainList="refreshRemainList"
                                class="animated fadeIn"/>
                                <div class="mb-100"></div>
                            </div>
                    </scroller>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
import FNHeader from '../components/common/FNHeader'
import FNImageBanner from '../components/common/FNImageBanner'
import FNRowProduct from '../components/common/FNRowProduct'
import FNSpecialShopItem from '../components/common/FNSpecialShopItem'
import FNRemainProduct from '../components/common/FNRemainProduct'
import {Popup} from 'vux'

    export default {
        components:{
            FNHeader,
            FNImageBanner,
            FNRowProduct,
            FNSpecialShopItem,
            Popup,
            FNRemainProduct
        },
        data(){
            return{
                title:'loading',
                headerStyles:{
                    bgColor:'rgba(255,255,255,0)',
                    color:'#fff',
                    isTitleBold:true
                },
                indexData:'',
                topData:{
                    bj_img:'',
                    remind_img:'',
                    order_img:'',
                    rule_img:''
                },
                items:[],
                arrComponents:[],
                imageList:[],
                FNSpecialShopItemData:{},
                isShowBottom:false,
                select:{
                    remainP:1
                },
                remainListData:[],
                headerTitle:'',
                RemainListNoData:true,
            }
        },
        created(){
            this.getTop()
            this.getIndex()
        },
        mounted(){

        },
        methods: {
            getTop() {
                this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=top_list',{
                    show_type_str:this.$route.params.show_type_str
                },(res)=>{
                    if(res.data.success==1){
                        console.log(res.data)
                        this.topData = res.data.data
                        this.headerStyles.color = '#'+res.data.data.top_fontcolor
                        this.title = res.data.data.index_title
                        let self = this
                        var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                        if(isiOS){
                            window.onscroll= function(){
                                var t = document.documentElement.scrollTop||document.body.scrollTop;
                                self.headerTitle = res.data.data.index_title
                            }
                        }else{
                            this.headerTitle = this.title
                        }
                    }
                })
            },
            getIndex() {
                this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=getIndex',{
                },(res)=>{
                    console.log(res.data)
                    this.indexData = res.data.data
                    for(let key in res.data.data){
                        if(res.data.data[key].type=='jdgoodsspecial_huandengpian_01'){
                            for(let k in res.data.data[key].list){
                                this.imageList.push(res.data.data[key].list[k])
                            }
                            this.arrComponents.push({
                                component:FNImageBanner,
                                Data:this.imageList
                            })
                        }else if(res.data.data[key].type=='jdgoodsspecial_rowgoods_01'){
                            this.arrComponents.push({
                                component:FNSpecialShopItem,
                                Data:res.data.data[key]
                            })
                        }
                    }
                })
            },
            refresh (done) {
                this.select.remainP = 1
                this.getRemainList(1,()=>{
                    done()
                })
            },
            infinite (done) {
                if(this.RemainListNoData){
                    this.$refs.remainListScroller.finishInfinite(true)
                }else{
                    this.select.remainP += 1
                    this.getRemainList(this.select.remainP,(ret)=>{
                        done()
                    })
                }
            },
            getRemainList(p,callback){
                this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=remind_list',{
                    p:p
                },(res)=>{
                    if(res.data.success==1){
                        if(res.data.data.length==0){
                            this.RemainListNoData = true
                        }else{
                            this.RemainListNoData = false
                        }
                        if(p == 1 ){
                            this.remainListData = res.data.data
                        }else{
                            for(let key in res.data.data){
                                this.remainListData.push(res.data.data[key])
                            }
                        }
                    }
                    callback(res.data.data)
                },false)
            },
            refreshRemainList(item){
                if(item.isCancelRemain){
                    // console.log('isCancelRemain')
                    for(let key in this.indexData){
                        if(this.indexData[key].type=='jdgoodsspecial_rowgoods_01'){
                            for(let k in this.indexData[key].list){
                                console.log(this.indexData[key].list[k].fnuo_id,item.fnuo_id)
                                if(this.indexData[key].list[k].fnuo_id == item.fnuo_id){
                                    this.indexData[key].list[k].remind_str = '提醒我'
                                    this.indexData[key].list[k].is_addremind = "0"
                                }
                            }
                        }
                    }
                }
                this.select.remainP = 1
                this.getRemainList(1,()=>{})
            },
            showRemainList(){
                this.isLogin(()=>{
                    this.getRemainList(1,()=>{})
                    this.isShowBottom = true
                })
            },
            navigateToOrder(){
                this.isLogin(()=>{
                    this.appOpenWeb({
                        is_need_login:"1",
                        SkipUIIdentifier: "pub_wailian",
                        show_type_str:"",
                        url: this.topData.order_url,
                        jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                    },'jump_SkipUIIdentifier')
                })
            },
            navigateToRule(){
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: "pub_wailian",
                    show_type_str:"",
                    url: this.topData.rule_url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                },'jump_SkipUIIdentifier')
            }
        },
    }
</script>

<style scoped>
.SpecialShop{
    width: 100%;
    background-color: #FAFAFA;
}
.top-background{
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
}
.fn-header{
    /* position: absolute;
    left: 0;
    top: 0; */
    z-index: 3;
}
.component{
    z-index: 3;
}
.text-1{
    font-size:36px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height: 36px;
    /* margin-top: 147px; */
    margin-left: 25px;
    margin-bottom: 25px;
    z-index: 3;
}
.product-container{
    flex-wrap: wrap;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    justify-content: space-between
}

.popup-container{
    width: 100%;
    height: 700px;
    background-color: #fff;
}
.remain_clock_icon{
    position: fixed;
    top: 800px;
    width: 84px;
    height: 84px;
    right: 25px;
    z-index: 101;
}
.order_icon{
    position: fixed;
    top: 900px;
    width: 84px;
    height: 84px;
    right: 25px;
    z-index: 101;
}
.rule_icon{
    position: fixed;
    top: 1000px;
    width: 84px;
    height: 84px;
    right: 25px;
    z-index: 101;
}
.rule-box{
    position: fixed;
    top: 850px;
    width: 150px;
    height: 60px;
    left: 0;
    z-index: 101;
    background-color: rgb(112, 11, 129);
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    align-items: center;
    justify-content: center;
    color: #fff ;
    box-shadow: 0 2px 10px 0 rgba(155, 155, 155, 0.1);
    font-size: 24px;
    font-weight: 500
}
.back-test{
    position: fixed;
    top: 1000px;
    width: 84px;
    height: 84px;
    right: 25px;
    z-index: 101;
    background-color: #fff;
}
.login-test{
    position: fixed;
    top: 1100px;
    width: 84px;
    height: 84px;
    right: 25px;
    z-index: 101;
    background-color: #fff;
}
.popup-header{
    width: 100%;
    height: 98px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
    align-items: center;
    justify-content: center;
    z-index: 1000;
    position: relative;
    background-color: #fff;
}
.popup-header span{
    font-size:36px;
    font-family:SourceHanSansCN-Regular;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.popup-list-box{
    width: 100%;
}
.popup-list{
    padding-top: 98px;
}
.popup-list-container{
    width: 100%;
    padding-top: 20px;
    align-items: center;
}
.mb-100{
    height: 100px;
    width: 100%;
}
.popup-nodata-box{
    width: 100%;
    height: 550px;
    align-items: center;
    justify-content: center;
}
.popup-nodata-box span{
    font-size: 28px;
    color: #3c3c3c;
    font-weight: 500;
    line-height: 46px
}
.popup-nodata-box .button{
    height: 60px;
    border-radius: 15px;
    background-color: rgb(255, 83, 118);
    padding-left: 40px;
    padding-right: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
.popup-nodata-box .button span{
    color: #fff;
    font-size: 28px;
    font-weight: 500;
}
</style>
