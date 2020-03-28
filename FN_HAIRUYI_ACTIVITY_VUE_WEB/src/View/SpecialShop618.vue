<!--
 * @Description: In User Settings Edit
 * @Author: JKate
 * @Date: 2019-06-11 09:47:45
 * @LastEditTime: 2019-07-18 13:52:53
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="SpecialShop618"
    v-wechat-title="indexData.top_str">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
                <div class="scroller-box">
                    <div class="top-container col"
                    v-if="showScroller"
                    ref="top">
                        <img :src="indexData.guanggao[0].img" alt=""
                        class="top-image"
                        @click="advClick">
                        <div class="fixedBox"
                        :style="{height:fixedBoxHeight+'px'}">
                           <div
                           :class="isFixed===true?'topFixed':''"
                           class="topFixedHeight">
                                <div
                                class="tab-bar"
                                v-if="cateData.length!=0">
                                    <tab
                                    :tabBarStyles="tabBarStyles"
                                    :bar-active-color="tabBarStyles.checkColor"
                                    :default-color="tabBarStyles.color"
                                    :active-color="tabBarStyles.checkColor"
                                    v-show="cateData.length!=0">
                                        <tab-item
                                        v-for="(item, index) in cateData" 
                                        :key="index"
                                        @on-item-click="toggleCate(item,index)"
                                        :selected="index==currentIndex">{{item.name}}</tab-item>
                                    </tab>
                                </div>
                                <div class="sort-box row"
                                v-if="sortData.length!=0&&cateIndexData.hide_sort==0">
                                    <div class="sort-item row"
                                        v-for="(item, index) in sortData" 
                                        :key="index"
                                        @click="toggleSort(index,item)">
                                        <span
                                        class="sort-item-text"
                                        :style="{color:currentSortIndex==index?'#'+item.checkcolor:'#'+item.color}"
                                        >{{item.name}}</span>
                                        <img class="sort-item-icon"
                                        v-if="item.list_cate=='up_down'"
                                        :src="currentSortIndex==index?
                                        (isUp?require('../assets/sort_up.png'):require('../assets/sort_down.png'))
                                        :require('../assets/sort_normal.png')"
                                        alt="">
                                        <img class="sort-item-icon"
                                        v-if="item.list_cate=='second_list'"
                                        :src="isShowBottom?require('../assets/shaixuan_on.png'):require('../assets/shaixuan_off.png')"
                                        alt="">
                                    </div>
                                    <div class="sort-item row">
                                        <img class="toggle-list-icon" 
                                        :src="isRow==true?require('../assets/icon_col.png'):require('../assets/icon_row.png')" 
                                        alt=""
                                        @click="switchList">
                                    </div>
                                    <div class="sort-item-line"></div>
                                </div>
                                <div class="yhq-select-box row"
                                v-if="sortData.length!=0&&cateIndexData.hide_search==0">
                                    <img class="yhq-select-icon-1"
                                    src="../assets/券icon@2x.png" alt="">
                                    <span class="yhq-select-title">仅显示优惠券商品</span>
                                    <img class="yhq-select-icon-2" 
                                    :src="!is_yhq?require('../assets/select_off.png'):require('../assets/select_on.png')" alt=""
                                    @click="toggleYHQ">
                                    <div class="yhq-select-line"></div>
                                    <div class="search-box row"
                                    @click="search">
                                        <img class="search-icon"
                                        src="../assets/search_icon.png" alt="">
                                        <span>搜索</span>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                    <div ref="productContent"
                    style="background:#f6f5f5">
                        <div class="product-content-box"
                        v-if="isRow==false">
                            <FNMainColProduct
                            v-for="(item, index) in listData" 
                            :key="index"
                            :itemData="item"
                            class="product-item animated fadeIn"/>
                        </div>
                        <div class="product-row-content-box row"
                        v-if="isRow==true">
                            <FNMainRowProduct
                            v-for="(item, index) in listData" 
                            :key="index"
                            :itemData="item"
                            class="product-item animated fadeIn"/>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>


        <FNSpecialShopAdvAlert
        :itemData="advData"
        @close="showAdvAlert=false"
        v-if="showAdvAlert"/>
        <FNSpecialShopGoodsAlert
        :itemData="alertGoodsData"
        @close="showGoodsAlert=false"
        v-if="showGoodsAlert"/>

        <popup
        v-model="isShowBottom">
            <div class="popup-container col">
                <span class="shaixuan-title">价格区间</span>
                <div class="price-select-box row">
                    <input type="number"
                    class="input"
                    placeholder="最低价格"
                    v-model="select.start_price">
                    <span>元</span>
                    <span class="price-line">-</span>
                    <input type="number"
                    class="input"
                    placeholder="最高价格"
                    v-model="select.end_price">
                    <span>元</span>
                </div>
                <span class="shaixuan-title">商家类型</span>
                <button class="shaixuan-type-box"
                :style="{borderColor:select.is_tm==1?'#FF5441':'#CCCCCC',
                color:select.is_tm==1?'#FF5441':'#CCCCCC'}"
                @click="toggleTM">仅看天猫</button>
                <div class="shaixuan-submit col"
                @click="shaixuanSubmit"><span>确定</span></div>
            </div>
        </popup>
    </div>
</template>

<script>
import { Tab, TabItem ,Popup } from 'vux'
import FNMainColProduct from '../components/common/FNMainColProduct'
import FNMainRowProduct from '../components/common/FNMainRowProduct'
import FNSpecialShopAdvAlert from '../components/common/FNSpecialShopAdvAlert'
import FNSpecialShopGoodsAlert from '../components/common/FNSpecialShopGoodsAlert'

    export default {
        components:{
            Tab,
            TabItem,
            FNMainColProduct,
            FNMainRowProduct,
            FNSpecialShopAdvAlert,
            FNSpecialShopGoodsAlert,
            Popup
        },
        data(){
            return{
                tabBarStyles:{
                    backgroundColor:'rgba(255,255,255,0)',
                    checkColor:'#FF5441',
                    color:'#333333'
                },
                cateData:[
                ],
                sortData:[
                ],
                isUp:true,
                currentSortIndex:0,
                select:{
                    sort:'',
                    p:1,
                    cid:'',
                    yhq:0,
                    is_tm:0,
                    end_price:"",
                    start_price:''
                },
                is_yhq:false,
                noData:true,
                listData:[],
                isRow:true,
                advData:{},
                alertGoodsData:{},
                showAdvAlert:false,
                showGoodsAlert:false,
                indexData:{
                    guanggao:[{
                        img:''
                    }],
                    top_str:'loading'
                },
                showScroller:false,
                showCate:false,
                historyUrl:'',
                isShowBottom:false,
                PageHeight:834,
                scrollY:false,
                listScroll:{},
                cateIndexData:{},
                currentIndex:0,
                loading:true,
                finished:false,
                isLoading:false,
                isFixed:false,
                fixedBoxHeight:0
            }
        },
        created(){
            this.PageHeight = window.innerHeight
            this.getAdv()
            this.getAlertGoods()
            this.getIndex()
            this.getCate()
        },
        mounted () {
            // setTimeout(() => {
            //         this.initScroll()
            // }, 100);
            let self = this
            
            window.onscroll = function() {
            //为了保证兼容性，这里取两个值，哪个有值取哪一个
            //scrollTop就是触发滚轮事件时滚轮的高度
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let offsetTop = document.querySelector('.fixedBox').offsetTop  
                self.isFixed = scrollTop > offsetTop
            }
        },
        methods: {
            toggleCate(item,index) {
                this.currentIndex = index
                this.select.cid = item.id
                this.select.p = 1
                let offsetTop = document.querySelector('.fixedBox').offsetTop  
                $('html,body').animate({scrollTop:offsetTop},500)
                this.getList(1)
            },
            toggleSort(index,item){
                this.currentSortIndex = index
                if(item.list_cate=='down'){
                    this.select.p = 1
                    this.select.sort = item.type
                    let offsetTop = document.querySelector('.fixedBox').offsetTop  
                    $('html,body').animate({scrollTop:offsetTop},500)
                    this.getList(1)
                }else if(item.list_cate=='second_list'){
                    this.isShowBottom = true
                }else if(item.list_cate=='up_down'){
                    this.select.p = 1
                    if(this.currentSortIndex == index){
                        this.isUp = !this.isUp
                    }else{
                        this.isUp = true
                    }
                    if(this.isUp){
                        this.select.sort = item.up_type
                    }else{
                        this.select.sort = item.type
                    }
                    let offsetTop = document.querySelector('.fixedBox').offsetTop  
                    $('html,body').animate({scrollTop:offsetTop},500)
                    this.getList(1)
                }
            },
            toggleYHQ(){
                this.is_yhq = !this.is_yhq
                if(this.select.yhq==0){
                    this.select.yhq = 1
                }else{
                    this.select.yhq = 0
                }
                this.select.p = 1
                this.getList(1)
            },
            getList(p,callback){
                this.GET('?mod=appapi&act=promotion_goods&ctrl=goods',{
                    sort:this.select.sort,
                    p:p,
                    cid:0,
                    is_index:1,
                    yhq:this.select.yhq,
                    end_price:this.select.end_price,
                    start_price:this.select.start_price,
                    cid:this.select.cid,
                    keyword:'',
                    is_tm:0,
                    show_type_str:this.$route.params.show_type_str
                },(res)=>{
                    // console.log(p)
                    if(res.data.success==1){
                        if(res.data.data.length==0){
                            this.finished = true
                        }else{
                            this.finished = false
                        }
                        if(this.select.p == 1 ){
                            this.listData = res.data.data
                        }else{
                            for(let key in res.data.data){
                                this.listData.push(res.data.data[key])
                            }
                        }
                        this.loading = false
                        this.isLoading = false;
                    }
                    if(typeof(callback)=="function"){
                        callback(res.data.data);
                    }
                    if(!this.fixedBoxHeight){
                        this.fixedBoxHeight = document.querySelector('.topFixedHeight').offsetHeight
                    }
                })
            },
            switchList(){
                let offsetTop = document.querySelector('.fixedBox').offsetTop  
                $('html,body').animate({scrollTop:offsetTop},500)
                this.isRow = !this.isRow
            },
            getAdv(){
                this.GET('?mod=appapi&act=promotion_goods&ctrl=advertising',{},(res)=>{
                    if(res.data.success==1){
                        // console.log(res.data)
                        if(res.data.data.length>0){
                            this.advData = res.data.data[0]
                            this.showAdvAlert = true
                        }
                    }
                })
            },
            getAlertGoods(){
                this.GET('?mod=appapi&act=promotion_goods&ctrl=goods_show',{},(res)=>{
                    if(res.data.success==1){
                        // console.log(res.data)
                        if(res.data.data.length>0){
                            this.alertGoodsData = res.data.data[0]
                            this.showGoodsAlert = true
                        }
                    }
                })
            },
            getIndex(){
                this.GET('?mod=appapi&act=promotion_goods&ctrl=index',{},(res)=>{
                    if(res.data.success==1){
                        // console.log(res.data)
                        this.indexData = res.data.data
                        this.showScroller = true
                    }
                })
            },
            getCate(){
                this.GET('?mod=appapi&act=promotion_goods&ctrl=cate',{
                    show_type_str:this.$route.params.show_type_str
                },(res)=>{
                    if(res.data.success==1){
                        this.cateIndexData = res.data.data
                        for(let key in res.data.data.cate){
                            this.cateData.push({
                                name:res.data.data.cate[key].catename,
                                id:res.data.data.cate[key].id
                            })
                        }
                        for(let key in res.data.data.sort){
                            this.sortData.push({
                                name:res.data.data.sort[key].name,
                                type:res.data.data.sort[key].type,
                                checkcolor:'FE594A',
                                color:'666666',
                                list_cate:res.data.data.sort[key].list_cate,
                                up_type:res.data.data.sort[key].up_type
                            })
                        }
                        if(res.data.data.hide_sort==0){
                            this.select.sort = this.sortData[0].type
                        }
                        if(this.cateData.length>0){
                            this.select.cid = this.cateData[0].id
                            this.showCate = true
                        }
                        this.historyUrl = res.data.data.url
                    }
                    this.getList(1)
                    // console.log(res.data)
                })
            },
            search(){
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: "pub_wailian",
                    show_type_str:"",
                    url: this.historyUrl,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                },'jump_SkipUIIdentifier')
            },
            toggleTM(){
                if(this.select.is_tm==1){
                    this.select.is_tm=0
                }else{
                    this.select.is_tm=1
                }
            },
            shaixuanSubmit(){
                this.select.p=1
                let offsetTop = document.querySelector('.fixedBox').offsetTop  
                $('html,body').animate({scrollTop:offsetTop},500)
                this.getList(1)
                this.isShowBottom = false
            },
            advClick(){
                this.appOpenWeb(this.indexData.guanggao[0],'jump_SkipUIIdentifier')
            },
            onLoad() {
                this.select.p++ 
                this.getList(this.select.p)
            },
            onRefresh(){
                this.select.p = 1
                this.getList(this.select.p)
            }
        },
    }
</script>

<style scoped>
.top-image{
    width: 100%;
    height: auto;
}
.tab-bar{
    width: 100%;
    height: 80px;
    background-color: #fff;
    overflow: hidden;
    z-index: 10;
    position: relative;
}
.tab-bar-noadv{
    width: 100%;
    height: 80px;
    /* border-radius:24px 24px 0px 0px; */
    background-color: #fff;
    overflow: hidden;
    z-index: 10;
    position: relative;
}
.sort-container{
    width: 100%;
    height:80px;
    background-color:rgba(255,255,255,1);
}
.sort-box{
    width: 100%;
    height:80px;
    background-color:rgba(255,255,255,1);
    padding-left: 60px;
    padding-right: 60px;
    justify-content: space-between;
    /* box-shadow: 0 2px 10px 0 rgba(0,0,0,.1); */
    position: relative;
    border-bottom-width: 1px;
    border-bottom-color: #fafafa;
    border-style: solid;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
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
.toggle-list-icon{
    width: 27px;
    height: 27px;
}
.sort-item-line{
    width:2px;
    height:28px;
    background:rgba(240,240,240,1);
    position: absolute;
    right: 120px;
    top: 26px;
}
.yhq-select-box{
    width: 100%;
    height: 80px;
    position: relative;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);
    background-color: #fff;
}
.yhq-select-icon-1{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 30px;
    top: 25px;
}
.yhq-select-title{
    font-size:24px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 80px;
    position: absolute;
    left: 70px;
    top: 0;
}
.yhq-select-icon-2{
    width: 68px;
    height: 43px;
    position: absolute;
    right: 204px;
    top: 18.5px;
}
.yhq-select-line{
    width:2px;
    height:28px;
    background:rgba(240,240,240,1);
    position: absolute;
    right: 171px;
    top: 26px;
}
.search-box{
    height: 80px;
    position: absolute;
    right: 46px;
}
.search-icon{
    width: 28px;
    height: 28px;
    margin-top: 26px;
    margin-right: 10px;
}
.search-box span{
    font-size:24px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 80px
}
.scroller-noadv{
    padding-top: 240px;
}
.scroller-bottom{
    height: 800px;
    width: 100%;
}
.scroller-bottom-noadv{
    height: 240px;
    width: 100%;
}
.product-content-box{
    width: 100%;
    flex-wrap: wrap;
    background-color: #fff;
    padding-top: 25px;
}
.product-item{
    margin-bottom: 35px;
}
.product-row-content-box{
    padding-left: 3.3%;
    padding-right: 3.3%;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    padding-top: 25px;
}
.popup-container{
    width: 100%;
    height: 500px;
    background-color: #fff;
}
.shaixuan-title{
    font-size:24px;
    font-family:SourceHanSansCN-Regular;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:24px;
    margin-left: 69px;
    margin-top: 50px;
}
.price-select-box{
    margin-left: 69px;
    margin-top: 30px;
}
.input{
    width: 256px;
    height: 70px;
    line-height: 70px;
    border: none;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #CCCCCC;
    outline: none;
    color: #3c3c3c;
    font-size: 32px
}
.price-select-box span{
    font-size:24px;
    font-family:SourceHanSansCN-Regular;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height: 70px
}
.price-line{
    margin-left: 25px;
    margin-right: 25px;
}
.shaixuan-type-box{
    width:210px;
    height:64px;
    border-radius:8px;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    margin-left: 69px;
    margin-top: 28px;
    margin-bottom: 42px;
    background-color: #fff;
    outline: none;
    font-size:24px;
    font-weight:400;
}
.shaixuan-submit{
    width:682px;
    height:70px;
    background:rgba(254,67,62,1);
    border-radius:35px;
    margin-left: 34px;
    align-items: center;
    justify-content: center
}
.shaixuan-submit span{
    font-size:28px;
    font-family:SourceHanSansCN-Regular;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:70px;
}
.top-container{
    z-index: 100;
    width: 100%;
    position: relative;
}
.fixedBox{
    position: relative;
}
.fixedBoxHeight{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.topFixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    background-color: #fff;
}
</style>