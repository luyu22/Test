<template>
    <div class="SpecialShopMore"
    v-wechat-title="'商品列表'">
        <div class="top">
            <img :class="isIOS()?(isIPhoneX()?'top-bg-iphonex':'top-bg-ios'):'top-bg'"
            :src="indexData.detail_bj_img" alt="">
            <div
            class="top-bar row"
            :class="isIOS()?(isIPhoneX()?'StatusBarHeightIPhoneX':'StatusBarHeightIOS'):'StatusBarHeight'">
                <span class="page-title"
                :class="isIPhoneX()?'mt-88':'mt-44'"
                v-if="isIOS()">{{pageTitle}}</span>
            </div>
            <div class="fn-header">
                <!-- <FNHeader
                :needShadow="false"
                :headerStyles="headerStyles"
                :title="title"
                /> -->
                <img class="fn-header-bg"
                :src="indexData.detail_topcheck_img" alt=""
                :style="{opacity:currentMainNavIndex==0?1:0}">
                <img class="fn-header-bg"
                :src="indexData.detail_topcheck_img2" alt=""
                :style="{opacity:currentMainNavIndex==0?0:1}">
                <div class="cate-nav-main row">
                    <div class="cate-nav-main-item col"
                    v-for="(item, index) in indexData.top_cate" 
                    :key="index"
                    @click="toggleMainNav(index,item)">
                        <span
                        :style="{color:currentMainNavIndex==index?'#'+item.check_color:'#'+item.color}"
                        >{{item.name}}</span>
                    </div>
                </div>
                <div class="cate-nav-sub">
                    <tab
                    :tabBarStyles="tabBarStyles"
                    :bar-active-color="tabBarStyles.checkColor"
                    :default-color="tabBarStyles.color"
                    :active-color="tabBarStyles.checkColor"
                    v-if="cateData.length!=0">
                        <tab-item
                        v-for="(item, index) in cateData" 
                        :key="index"
                        @on-item-click="toggleCate(item)"
                        :selected="index==0">{{item.name}}</tab-item>
                    </tab>
                </div>

                <div class="sort-box row">
                    <div class="sort-item row"
                        v-for="(item, index) in sortData" 
                        :key="index"
                        @click="toggleSort(index,item)">
                        <span
                        class="sort-item-text"
                        :style="{color:currentIndex==index?'#'+item.checkcolor:'#'+item.color}"
                        >{{item.name}}</span>
                        <!-- <img class="sort-item-icon"
                        v-if="item.is_has_up=='1'"
                        :src="currentIndex==index?(isUp?require('../assets/sort_up.png'):require('../assets/sort_down.png')):require('../assets/sort_normal.png')"
                        alt=""> -->
                    </div>
                </div>
            </div>

        </div>
        <scroller 
            :on-refresh="refresh"
            :on-infinite="infinite"
            :class="isIOS()?(isIPhoneX()?'scrollerIPhoneX':'scrollerIOS'):'scroller'"
            ref="myscroller"
            :style="{opacity:opacity}">
                <div class="product-container row"
                ref="top">
                    <FNRowProduct 
                    v-for="(item, index) in listData" 
                    :key="index"
                    :itemData="item"
                    @refreshRemainList="refreshRemainList"
                    class="animated fadeIn"/>
                </div>
        </scroller>
        <img class="remain_clock_icon"
        :src="indexData.remind_img" alt=""
        @click="showRemainList"
        v-if="indexData.remind_img!==''">
        <img class="order_icon"
        :src="indexData.order_img" alt=""
        @click="navigateToOrder"
        v-if="indexData.order_img!==''">
        <img class="rule_icon"
        :src="indexData.rule_img" alt=""
        @click="navigateToRule"
        v-if="indexData.rule_img!=''">
        <popup v-model="isShowBottom"
        class="popup">
            <div class="popup-container">
                <div class="popup-header col">
                    <span>我的提醒</span>
                </div>
                <div class="popup-list-box">
                    <scroller 
                    :on-infinite="infiniteRemainList"
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
                                class="FNRemainProduct"/>
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
import FNRowProduct from '../components/common/FNRowProduct'
import FNRemainProduct from '../components/common/FNRemainProduct'
import { Tab, TabItem ,Popup} from 'vux'
// import {scroller} from 'vue-scrollto/src/scrollTo.js'

    export default {
        components:{
            FNHeader,
            FNRowProduct,
            FNRemainProduct,
            Tab,
            TabItem,
            Popup
        },
        data(){
            return{
                title:'',
                headerStyles:{
                    bgColor:'rgba(255,255,255,0)',
                    color:'#fff',
                    isTitleBold:true
                },
                indexData:{
                    detail_bj_img:'',
                    detail_topcheck_img:'',
                    detail_topcheck_img2:'',  
                    remind_img:'',
                    order_img:'',
                    rule_img:''
                },
                topData:{
                    bj_img:'',
                    remind_img:'',
                    order_img:'',
                    rule_img:''
                },
                tabBarStyles:{
                    backgroundColor:'rgba(255,255,255,0)',
                    checkColor:'#FFFFFF',
                    color:'#FFFFFF'
                },
                isUp:true,
                currentIndex:0,
                select:{
                    cid:'',
                    p:1,
                    sort:'zonghe',
                    keyword:'',
                    remainP:1,
                    show_type_str:''
                },
                sorts:[
                    {
                        name:'综合',
                        type:'zonghe',
                        is_has_up:'0'
                    },
                    {
                        name:'销量',
                        type:'zonghe',
                        is_has_up:'1'
                    },
                    {
                        name:'积分',
                        type:'zonghe',
                        is_has_up:'1'
                    },
                    {
                        name:'金额',
                        type:'zonghe',
                        is_has_up:'1'
                    },
                ],
                isShowBottom:false,
                listData:[],
                cateData:[
                ],
                sortData:[],
                remainListData:[],
                isInfinite:false,
                noData:true,
                RemainListNoData:true,
                opacity:0,
                cate1Data:{},
                currentMainNavIndex:0,
                pageTitle:''
            }
        },
        created(){
            this.$cookies.set('SpecialShopMoreOpen', 'now')
        },
        mounted(){
            this.getIndex()
        },
        methods: {
            getIndex() {
                this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=goods_cate',{
                    show_type_str:this.$route.params.show_type_str
                },(res)=>{
                    if(res.data.success==1){
                        this.indexData = res.data.data
                        // console.log(this.indexData)
                        this.select.show_type_str = this.indexData.top_cate[0].show_type_str
                        this.pageTitle = this.indexData.top_cate[0].name
                        this.getCate1()
                        this.title = res.data.data.detail_title
                    }
                })
            },
            getCate1(){
                this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=goods_cate1',{
                     show_type_str:this.select.show_type_str
                },(res)=>{
                    if(res.data.success==1){
                        console.log(res.data)
                        this.cateData  = res.data.data.cate
                        this.sortData = res.data.data.sort
                        if(res.data.data.cate.length!=0){
                            this.tabBarStyles.checkColor = '#'+res.data.data.cate[0].check_color
                            this.tabBarStyles.color = '#' + res.data.data.cate[0].color
                            this.select.cid = res.data.data.cate[0].id
                        }
                        this.getList(1)
                    }
                })
            },
            getList(p,callback) {
                this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=goods',{
                    cid:this.select.cid,
                    p:p,
                    sort:this.select.sort,
                    show_type_str:this.select.show_type_str
                },(res)=>{
                    this.opacity = 1
                    if(res.data.success==1){
                        if(res.data.data.length==0){
                            this.noData = true
                        }else{
                            this.noData = false
                            this.$refs.myscroller.finishInfinite(false)
                        }
                        if(this.select.p == 1 ){
                            this.listData = res.data.data
                        }else{
                            for(let key in res.data.data){
                                this.listData.push(res.data.data[key])
                            }
                        }
                    }
                    if(typeof(callback)=="function"){
                        callback(res.data.data);
                    }
                })
            },
            refresh (done) {
                this.select.p = 1
                this.getList(this.select.p,()=>{
                    done()
                })
            },
            infinite (done) {
                if(this.noData){
                    this.$refs.myscroller.finishInfinite(true)
                }else{
                    this.select.p++
                    this.getList(this.select.p,()=>{
                        done()
                    })
                }
            },
            toggleMainNav(index,item){
                if(this.select.show_type_str!=item.show_type_str){
                    this.cateData = []
                    this.currentMainNavIndex = index
                    this.select.show_type_str = item.show_type_str
                    this.select.p = 1
                    this.pageTitle = item.name
                    this.$refs.myscroller.scrollTo(0, 0, false)
                    this.getCate1()
                    // console.log(item)
                }
            },
            toggleSort(index,item){
                // if(this.currentIndex == index){
                //     this.isUp = !this.isUp
                // }else{
                //     this.isUp = true
                // }
                // if(this.isUp){
                //     this.select.sort = item.up_sort
                // }else{
                //     this.select.sort = item.down_sort
                // }
                this.currentIndex = index
                this.select.p = 1
                this.select.sort = item.type
                this.$refs.myscroller.scrollTo(0, 0, false)
                this.getList(1)
            },
            toggleCate(item){
                this.select.cid = item.id
                this.select.p = 1
                this.$refs.myscroller.scrollTo(0, 0, false)
                this.getList(1)
            },
            refreshRemainList(item){
                if(item.isCancelRemain){
                    // console.log('isCancelRemain')
                    for(let key in this.listData){
                        if(this.listData[key].fnuo_id == item.fnuo_id){
                            this.listData[key].remind_str = '提醒我'
                            this.listData[key].is_addremind = "0"
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
            getRemainList(p,callback){
                this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=remind_list',{
                    p:p
                },(res)=>{
                    if(res.data.success==1){
                        if(res.data.data.length==0){
                            this.RemainListNoData = true
                        }else{
                            this.RemainListNoData = false
                            this.$refs.remainListScroller.finishInfinite(false)
                        }
                        if(p ==1 ){
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
            infiniteRemainList (done) {
                if(this.RemainListNoData){
                    this.$refs.remainListScroller.finishInfinite(true)
                }else{
                    this.select.remainP += 1
                    this.getRemainList(this.select.remainP,(ret)=>{
                        done()
                    })
                }
            },
            navigateToOrder(){
                this.isLogin(()=>{
                    this.appOpenWeb({
                        is_need_login:"1",
                        SkipUIIdentifier: "pub_wailian",
                        show_type_str:"",
                        url: this.indexData.order_url,
                        jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                    },'jump_SkipUIIdentifier')
                })
            },
            navigateToRule(){
                this.appOpenWeb({
                    is_need_login:"0",
                    SkipUIIdentifier: "pub_wailian",
                    show_type_str:"",
                    url: this.indexData.rule_url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                },'jump_SkipUIIdentifier')
            }
        },
    }
</script>

<style scoped>
.SpecialShopMore{
    width: 100%;
}
.top-background{
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -2;
}
.fn-header{
    z-index: 100;
    position: relative;
    width: 100%;
    /* box-shadow: 0 2px 10px 0 rgba(0,0,0,.1); */
}
.cate-nav-main{
    width: 100%;
    height: 105px;
}
.cate-nav-main-item{
    width: 50%;
    height: 105px;
    align-items: center;
    justify-content: center;
    z-index: 101;
}
.cate-nav-main-item span{
    font-size:36px;
    font-family:SourceHanSansCN-Normal;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.fn-header-bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 147px;
}
.cate-nav-sub{
    width: 100%;
    height: 80px;
}
.fn-cate-bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
}

.text-1{
    font-size:36px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height: 36px;
    /* margin-top: 147px; */
    margin-left: 25px;
    margin-bottom: 25px;
}
.product-container{
    flex-wrap: wrap;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 100px;
}
.scroller{
    padding-top: 320px;
    background-color: #FAFAFA;
}
.scrollerIPhoneX{
    padding-top: 453px;
    background-color: #FAFAFA;
}
.scrollerIOS{
    padding-top: 420px;
    background-color: #FAFAFA;
}
.top{
    width: 100%;
    position: relative;
    z-index: 1000;
}
.top-bg{
    width: 100%;
    height: 240px;
    position: absolute;
    left: 0;
    top: 0;
}
.top-bg-iphonex{
    width: 100%;
    height: 373px;
    position: absolute;
    left: 0;
    top: 0;
}
.top-bg-ios{
    width: 100%;
    height: 340px;
    position: absolute;
    left: 0;
    top: 0;
}
.sort-box{
    width: 100%;
    height:80px;
    background-color:rgba(255,255,255,1);
    padding-left: 60px;
    padding-right: 60px;
    justify-content: space-between;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
}
.sort-item{
    align-items: center;
    height: 80px;
}
.sort-item-text{
    font-size:28px;
    font-weight:400;
    line-height: 28px;
}
.sort-item-icon{
    width: 10px;
    height: 18px;
    margin-left: 10px;
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
.popup-list-box{
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

.top-bar{
    position: relative;
    align-items: center;
    justify-content: center
}
.StatusBarHeight{
    width: 100%;
    height: 55px;
    background-color: inherit
}
.StatusBarHeightIOS{
    width: 100%;
    height: 155px;
    background-color: inherit
}
.StatusBarHeightIPhoneX{
    width: 100%;
    height: 188px;
    background-color: inherit;
    align-items: center;
    justify-content: center;
}
.page-title{
    font-size:38px;
    font-family:SourceHanSansCN-Normal;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.mt-88{
    margin-top: 88px;
}
.mt-44{
    margin-top: 44px;
}
.fn-header-bg{
    width: 100%;
    height: 185px;
    position: absolute;
    left: 0;
    top: 0;
}

</style>