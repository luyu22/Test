<template>
    <div class="SpecialShopOrder"
    v-wechat-title="'我的订单'">
        <div class="topFixed"
        v-if="scrollY"
        :style="{backgroundColor:'#FAFAFA'}">
            <div class="main-cate-box-fixed row">
                <div class="main-cate-box-item col"
                v-for="(item, index) in cateNav1" 
                :key="index"
                @click="toggleMainCate(item,index)">
                    <span
                    :style="{color:select.currentCateNav1Index==index?'#FE425D':'#333333'}"
                    >{{item.name}}</span>
                </div>
            </div>
            <div class="sub-cate-box row">
                <div v-for="(item, index) in cateNav2" 
                :key="index"
                class="sub-cate-box-item col"
                :style="{backgroundColor:select.currentCateNav2Index==index?'#FE425D':'#FFFFFF'}"
                @click="toggleSubCate(item,index)">
                    <span
                    :style="{color:select.currentCateNav2Index==index?'#FFFFFF':'#333333'}"
                    >{{item.name}}</span>
                </div>
            </div>
        </div>
        <scroll 
        :style="{height:PageHeight+'px',backgroundColor:'#FAFAFA'}"
        @scroll="onScroll"
        ref="scroll"
        :listenScroll="true"
        :pullUpLoad="pullUpLoadObj"
        :pullDownRefresh="pullDownRefreshObj"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp"
        :data="listData"
        :startY="parseInt(startY)"
        :noMoreTxt="noMoreTxt">
            <div class="FN-C1 col"
            ref="top">
                <div class="FN-C1-box col">
                    <span class="order-info-title">{{topData.title}}</span>
                    <span class="order-info"
                    v-html="topData.content"></span>
                    <div class="activity-time-box col">
                        <div class="row activity-time-box-title"
                        @click="isActive=!isActive">
                            <span
                            :style="{color:isActive?'#FE425D':'#333333'}"
                            >{{timeIndexStr}}</span>
                            <img class="dropdown-icon"
                            :src="isActive?require('../assets/dropdown_up_red.png'):require('../assets/dropdown_down_black.png')" alt="">
                        </div>
                        <!-- <collapse> -->
                            <div class="container col animated fadeIn" v-show="isActive">
                                <div class="dropdown-item col"
                                v-for="(item, index) in topData.cate" 
                                :key="index"
                                @click="toggleTime(item)">
                                    <span>{{item.name}}</span>
                                </div>
                            </div>
                        <!-- </collapse> -->
                    </div>
                </div>
                <div class="order-number-box">
                    <img class="order-number-box-bg" 
                    src="../assets/specialshoporder_bg1.png" alt="">
                    <div class="order-number-box-content row">
                        <div class="order-number-box-content-item col animated fadeIn"
                        v-for="(item, index) in orderDetailData" 
                        :key="index"
                        :style="{backgroundImage:'url('+item.img+')'}">
                            <span class="order-number-box-content-item-title"
                            >{{item.title}}</span>
                            <span class="order-number-box-content-item-value"
                            >{{item.val}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-cate-box row"
            ref="maincate">
                <div class="main-cate-box-item col"
                v-for="(item, index) in cateNav1" 
                :key="index"
                @click="toggleMainCate(item,index)">
                    <span
                    :style="{color:select.currentCateNav1Index==index?'#FE425D':'#333333'}"
                    >{{item.name}}</span>
                </div>
            </div>
            <div class="sub-cate-box row">
                <div v-for="(item, index) in cateNav2" 
                :key="index"
                class="sub-cate-box-item col"
                :style="{backgroundColor:select.currentCateNav2Index==index?'#FE425D':'#FFFFFF'}"
                @click="toggleSubCate(item,index)">
                    <span
                    :style="{color:select.currentCateNav2Index==index?'#FFFFFF':'#333333'}"
                    >{{item.name}}</span>
                </div>
            </div>

            <div class="product-container col">
                <div class="no-data-box animated fadeIn col"
                v-if="listData.length==0">
                    <img :src="indexData.img" alt=""
                    class="no-data-img">
                    <span>{{indexData.str}}</span>
                </div>
                <div class="product-item-box animated fadeIn"
                v-for="(item, index) in listData" 
                :key="index">
                    <div class="order-detail-box row">
                        <div class="row order-detail-box2">
                            <span class="type-title">订单编号:{{item.orderId}}</span>
                            <div class="type-box row"
                            :style="{borderColor:'#'+item.extend_color}">
                                <span
                                :style="{color:'#'+item.extend_color}"
                                :class="isAndroid()?'mt5':'mt0'">{{item.extend_str}}</span>
                            </div>
                        </div>
                        <div :style="{backgroundColor:'#'+item.status_bgcolor}"
                        class="order-status-box row">
                            <span
                            :style="{color:'#'+item.status_color}"
                            :class="isAndroid()?'mt5':'mt0'">{{item.status_str}}</span>
                        </div>
                    </div>
                    <div class="product-box row"
                    @click="navigateToOrderDetail(item)">
                        <img class="product-image"
                        :src="item.goods_img" alt="">
                        <div class="product-right-box col">

                            <div class="shop-title clearf">
                                <img class="shop-icon fl"
                                :src="item.shop_img">
                                <p class="product-title-text">{{item.goods_title | titleLimit }}</p>
                            </div>
                            <div class="row quan-fan-num-box">
                                <div class="quan-fan-box row">
                                    <div class="quan row"
                                    :style="{backgroundImage:'url('+item.f_bjimg+')'}"
                                    v-if="item.yhq_price!=='0'">
                                        <span
                                        :style="{color:'#'+item.f_color}">{{item.f_str}}</span>
                                    </div>
                                </div>
                                <span class="num-text">{{item.num_str}}</span>
                            </div>
                            <div class="price-text-box row">
                                <span></span>
                                <!-- <span class="num-text">{{item.num_str}}</span> -->
                                <span class="price-text">{{item.price_str}}</span>
                            </div>
                            <div class="time-status-box row">
                                <span class="time">{{item.pay_str}}</span>
                                <!-- <span class="price-text">{{item.price_str}}</span> -->
                                <!-- <span class="status"
                                :style="{color:'#'+item.status_color}">{{item.status_str}}</span> -->
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div
                :class="indexData.rule.is_show==1?'scroller-bottom-box1':'scroller-bottom-box2'"></div>
            </div>
        </scroll>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import collapse from '../components/collapse/collapse'
import scroll from '../components/scroll/scroll'
import Vue from 'vue'

    export default {
        components:{
            collapse,
            scroll
        },
        data(){
            return{
                isActive: false,
                PageHeight:834,
                cateNav1:[],
                cateNav2:[],
                select:{
                    type:'',
                    status,
                    p:1,
                    currentCateNav1Index:0,
                    currentCateNav2Index:0,
                    time_type:''
                },
                listData:[],
                indexData:{
                    detail_bj_img:'',
                    rule:{
                        bg_color:'',
                        font_color:'',
                        btn_img:'',
                        str:'',
                        is_show:0
                    }
                },
                scrollY:false,
                topData:{},
                timeIndexStr:'',
                orderDetailData:[],
                noData:true,
                scrollbar: true,
                scrollbarFade: true,
                pullDownRefresh: true,
                pullDownRefreshThreshold: 90,
                pullDownRefreshStop: 50,
                pullUpLoad: true,
                pullUpLoadThreshold: -50,
                startY:0,
                pullUpLoadMoreTxt: '上拉加载更多',
                pullUpLoadNoMoreTxt: '没有更多数据了',
                isLoading:false,
                noMoreTxt:"没有更多数据了"
            }
        },
        created(){
            this.PageHeight = window.innerHeight
            this.getTop()
        },
        mounted () {
        },
        methods: {
            getIndex() {
                this.GET('/?mod=appapi&act=jdgoods_special_order&ctrl=cate',{
                },(res)=>{
                    // console.log(res.data)
                    if(res.data.success==1){
                        this.indexData = res.data.data
                        this.cateNav2 = res.data.data.cate_2
                        this.cateNav1 = res.data.data.cate
                        this.select.type = res.data.data.cate[0].type
                        this.select.status = res.data.data.cate_2[0].type
                        this.getList(1)
                    }
                })
            },
            getList(p,callback) {
                this.GET('/?mod=appapi&act=jdgoods_special_order&ctrl=index',{
                    type:this.select.type,
                    status:this.select.status,
                    p:p,
                    time_type:this.select.time_type
                },(res)=>{
                    this.isLoading = false
                    // console.log(res.data)
                    if(res.data.success==1){
                        if(res.data.data.length==0){
                            // console.log('nodata')
                            this.noData = true
                            this.$refs.scroll.forceUpdate()
                        }else{
                            this.noData = false
                        }
                        if(p == 1 ){
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
            getTop(){
                this.GET('/?mod=appapi&act=jdgoods_special_order&ctrl=top_list',{},(res)=>{
                    if(res.data.success==1){
                        // console.log(res.data)
                        this.topData = res.data.data
                        this.timeIndexStr = this.topData.cate[0].name
                        this.select.time_type = this.topData.cate[0].type
                        this.getIndex()
                        this.getOrderDetail()
                    }
                })
            },
            getOrderDetail(){
                this.GET('/?mod=appapi&act=jdgoods_special_order&ctrl=total_list',{
                    time_type:this.select.time_type
                },(res)=>{
                    if(res.data.success==1){
                        this.orderDetailData = res.data.data
                    }
                })
            },
            onScroll(pos){
                var tops = this.$refs.maincate.offsetTop;
                this.scrollY = Math.abs(Math.round(pos.y));
                //判断滑动距离大于"分类"元素时, 吸顶title,否则隐藏
                if(this.scrollY >= tops&&tops!=0) {
                    this.scrollY = true
                }else {
                    this.scrollY = false
                }
            },
            toggleTime(item){
                this.timeIndexStr = item.name
                this.select.time_type = item.type
                this.select.p = 1
                this.getOrderDetail()
                this.getList(1)
                this.isActive = false
            },
            toggleMainCate(item,index){
                this.select.currentCateNav1Index = index
                this.select.type = item.type
                this.select.p = 1
                this.$refs.scroll.scroll.scrollToElement(this.$refs.top,500)
                this.getList(1)
            },
            toggleSubCate(item,index){
                this.select.currentCateNav2Index = index
                this.select.status = item.type
                this.select.p = 1
                this.$refs.scroll.scroll.scrollToElement(this.$refs.top,500)
                this.getList(1)
            },
            onPullingDown() {
                if(!this.isLoading){
                    this.isLoading = true
                    this.select.p = 1
                    this.getList(1)
                }
            },
            onPullingUp(){
                this.select.p++
                this.getList(this.select.p)
            },
            rebuildScroll() {
                Vue.nextTick(() => {
                    this.$refs.scroll.destroy()
                    this.$refs.scroll.initScroll()
                })
            },
            navigateToOrderDetail(item){
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: "pub_wailian",
                    show_type_str:"",
                    url: item.orderdetail_url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                },'jump_SkipUIIdentifier')
            }
        },
        computed:{
            scrollbarObj: function () {
                return this.scrollbar ? {fade: this.scrollbarFade} : false
            },
            pullDownRefreshObj: function () {
                return this.pullDownRefresh ? {
                threshold: parseInt(this.pullDownRefreshThreshold),
                stop: parseInt(this.pullDownRefreshStop)
                } : false
            },
            pullUpLoadObj: function () {
                return this.pullUpLoad ? {
                threshold: parseInt(this.pullUpLoadThreshold),
                txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
                } : false
            }
        },
        filters:{
            titleLimit(value){
                if(value.length>28){
                    let newValue = value.slice(0,27)+'…'
                    return newValue
                }else{
                    return value;
                }
            }
        },
        watch:{
            listData(){
                if(this.listData.length==0){
                    this.pullUpLoadNoMoreTxt = ''
                }else{
                    this.pullUpLoadNoMoreTxt = '没有更多数据了'
                }
            },
            scrollbarObj: {
                handler() {
                this.rebuildScroll()
                },
                deep: true
            },
            scrollbarObj: {
                handler() {
                    this.rebuildScroll()
                },
                deep: true
            },
            pullDownRefreshObj: {
                handler() {
                    this.rebuildScroll()
                },
                deep: true
            },
            pullUpLoadObj: {
                handler() {
                    this.rebuildScroll()
                },
                deep: true
            },
            startY() {
                this.rebuildScroll()
            }
        }
    }
</script>

<style scoped>
.SpecialShopOrder{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
}
.FN-C1{
    width: 100%;
    background:linear-gradient(rgba(255,255,255,1),rgb(255, 255, 255),rgba(226,238,250,1));
    background: -webkit-linear-gradient(rgba(255,255,255,1),rgb(255, 255, 255),rgba(226,238,250,1));
    background: -moz-linear-gradient(rgba(255,255,255,1),rgb(255, 255, 255),rgba(226,238,250,1));
    background: -o-linear-gradient(rgba(255,255,255,1),rgb(255, 255, 255),rgba(226,238,250,1));
    align-items: center
}
.FN-C1-box{
    width: 92%;
}
.container{
    /* background:linear-gradient(0deg,rgba(255,255,255,1),rgba(226,238,250,1));
    box-shadow:0px -3px 10px 0px rgba(226,238,250,0.3); */
    width: 100%;
}
.order-info-title{
    font-size:30px;
    font-family:SourceHanSansCN-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height: 30px;
    margin-top: 15px;
    margin-bottom: 20px;
}
.order-info{
    font-size:18px;
    font-family:SourceHanSansCN-Normal;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:34px;
}
.activity-time-box{
    width: 100%;
    background:linear-gradient(rgba(255,255,255,1),rgb(255, 255, 255),rgba(226,238,250,1));
    background: -webkit-linear-gradient(rgba(255,255,255,1),rgb(255, 255, 255),rgba(226,238,250,1));
    background: -moz-linear-gradient(rgba(255,255,255,1),rgb(255, 255, 255),rgba(226,238,250,1));
    background: -o-linear-gradient(rgba(255,255,255,1),rgb(255, 255, 255),rgba(226,238,250,1));
    /* background:linear-gradient(0deg,rgba(226,238,250,1),rgba(255,255,255,1)); */
    box-shadow:0px -3px 10px 0px rgba(226,238,250,0.3);
    align-items: center;
    margin-top: 25px;
}
.dropdown-icon{
    width: 20px;
    height: 20px;
}
.activity-time-box-title{
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: center
}
.activity-time-box-title span{
    font-size:36px;
    font-family:SourceHanSansCN-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height: 80px;
    margin-right: 13px;
}
.dropdown-item{
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: center
}
.dropdown-item span{
    font-size:36px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(204,204,204,1);
    line-height: 80px
}
.order-number-box{
    width: 100%;
    height: 214px;
    margin-top: -20px;
    position: relative;
}
.order-number-box-bg{
    width: 100%;
    height: 214px;
}
.order-number-box-content{
    width: 100%;
    height: 214px;
    justify-content: space-between;
    padding-left: 50px;
    padding-right: 50px;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
}
.order-number-box-content-item{
    width: 188px;
    height: 109px;
    background: no-repeat center center;
    background-size: 100% 100%;
    align-items: center;
    justify-content: center
}
.order-number-box-content-item-title{
    font-size:24px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 24px;
    margin-bottom: 13px;
}
.order-number-box-content-item-value{
    font-size:24px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 24px
}


.main-cate-box{
    width:100%;
    height:80px;
    background:rgba(255,255,255,1);
    margin-top: 25px;
    margin-bottom: 1px;
}
.main-cate-box-fixed{
    width:100%;
    height:80px;
    background:rgba(255,255,255,1);
    margin-bottom: 1px;
}
.main-cate-box-item{
    width: 50%;
    height: 80px;
    align-items: center;
    justify-content: center
}
.main-cate-box-item span{
    font-size:24px;
    font-family:SourceHanSansCN-Bold;
    font-weight:bold;
    line-height: 80px
}
.sub-cate-box{
    align-items: center;
    justify-content: space-between;
    padding-left: 80px;
    padding-right: 80px;
    width: 100%;
    height: 80px;
    background-color: #fff;
}
.sub-cate-box-item{
    height:40px;
    border-radius:19px;
    padding-left: 16px;
    padding-right: 16px;
    align-items: center;
    justify-content: center
}
.sub-cate-box-item span{
    font-size:24px;
    font-family:SourceHanSansCN-Bold;
    font-weight:bold;
    line-height: 40px;
}


.product-container{
    width: 100%;
    align-items: center;
    margin-bottom: 100px;
}
.product-item-box{
    width: 93%;
    background-color: #ffffff;
    margin-top: 20px;
    border-radius:20px;
}
.order-detail-box{
    width: 100%;
    height: 60px;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #F0F0F0;
    border-bottom-style: solid;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
}
.order-detail-box2{
    align-items: center;
    height: 60px;
}
.type-title{
    font-size:18px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 60px
}
.type-box{
    border-width: 2px;
    border-style: solid;
    border-radius:8px;
    padding-left: 10px;
    padding-right: 10px;
    height: 30px;
    align-items: center;  
    justify-content: center;
    margin-left: 10px;
}
.type-box span{
    font-size:18px;
    font-weight:500;
}
.order-status-box{
    height:30px;
    border-radius: 15px;
    padding-left: 15px;
    padding-right: 15px;
    align-items: center;
    justify-content: center
}
.order-status-box span{
    font-size:20px;
    font-family:SourceHanSansCN-Regular;
    font-weight: 500;
    color:rgba(255,255,255,1);
    /* margin-top: 5px; */
    line-height: 30px
}
.mt0{
    margin-top: 0px;
}
.mt5{
    margin-top: 5px;
}

.product-box{
    width: 100%;
    justify-content: space-between;
    /* padding-left: 2%;
    padding-right: 2%; */
    padding: 2%;
    
}
.product-image{
    width: 188px;
    height: 188px;
    border-radius: 14px
}
.product-right-box{
    width: 67%;
    height: 188px;
    justify-content: space-between
}
.shop-icon{
    height: 28px;
    width: auto;
    margin-right: 6px;
    margin-top: 4px;
}
.product-title-text{
    font-size:28px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:36px;
    /* text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    overflow: hidden; */
}

.quan-fan-box{
    /* margin-top: 15px;
    margin-bottom: 10px; */
}
.quan,.fan{
    padding-left: 8px;
    padding-right: 8px;
    position: relative;
    align-items: center;
    justify-content: center;
    background: no-repeat center center;
    background-size: 100% 100%;
    height: 30px;
}
.quan span,.fan span{
    font-size:22px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 30px;
    margin-top: 4px;
}
.quan{
    margin-right: 12px;
}
.price-text-box{
    width: 100%;
    justify-content: space-between; 
    align-items: center 
}
.price-text{
    font-size:24px;
    line-height: 24px;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.num-text{
    font-size:22px;
    line-height: 30px;
    font-weight:400;
    color:rgba(153,153,153,1);
    /* margin-top: 8px; */
}
.quan-fan-num-box{
    width: 100%;
    justify-content: space-between
}
.time{
    font-size:18px;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:24px;
}
.time-status-box{
    width: 100%;
    justify-content: space-between
}
.status{
    font-size:18px;
    font-weight:400;
    line-height:18px;
}
.no-data-box{
    width: 100%;
    height: 700px;
    align-items: center;
    justify-content: center
}
.no-data-img{
    width: 300px;
    height: auto;
    margin-bottom: 76px;
}
.no-data-box span{
    font-size:22px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:30px;
    width: 500px;
    text-align: center
}

.topFixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
}
</style>