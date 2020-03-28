<template>
    <div class="SpecialShopOrder"
    v-wechat-title="title">
        <div class="top">
            <!-- <div class="fn-header">
                <FNHeader
                :needShadow="false"
                :headerStyles="headerStyles"
                :title="title"
                />
            </div> -->
            <div class="cate-nav-2 row">
                <div class="cate-nav-2-item"
                v-for="(item, index) in cateNav2" :key="index"
                @click="toggleNav2(index,item)">
                    <span
                    :style="{color:currentNav2Index==index?'#F23A4D':'#666666'}">{{item.name}}</span>
                </div>
            </div>
            <div class="cate-nav">
                <tab
                :tabBarStyles="tabBarStyles"
                :bar-active-color="tabBarStyles.checkColor"
                :default-color="tabBarStyles.color"
                :active-color="tabBarStyles.checkColor"
                v-if="cateNav1.length!=0">
                    <tab-item 
                    v-for="(item, index) in cateNav1" 
                    :key="index"
                    @on-item-click="toggleCate(item)"
                    :selected="index==0">{{item.name}}</tab-item>
                </tab>
            </div>
            <div class="row rule-box"
            :style="{backgroundColor:'#'+indexData.rule.bg_color}"
            v-if="indexData.rule.is_show==1">
                <marquee
                :style="{color:'#'+indexData.rule.font_color}"
                scrolldelay="150">{{indexData.rule.str}}</marquee>

                <img :src="indexData.rule.btn_img" 
                alt=""
                @click="navigateToHaiBao()">
            </div>
        </div>
        <scroller 
            :on-refresh="refresh"
            :on-infinite="infinite"
            :noDataText="noDataText"
            class="scroller"
            ref="myscroller"
            :class="indexData.rule.is_show==1?'scroller1':'scroller2'">
            <div class="product-container col">
                <div class="no-data-box col"
                v-if="listData.length==0">
                    <img :src="indexData.img" alt=""
                    class="no-data-img">
                    <span>{{indexData.str}}</span>
                </div>
                <div class="product-item-box"
                v-for="(item, index) in listData" 
                :key="index">
                    <div class="order-detail-box row">
                        <div class="row order-detail-box2">
                            <span class="type-title">订单编号:{{item.orderId}}</span>
                            <!-- <button
                            :style="{borderColor:'#'+item.extend_color,
                            color:'#'+item.extend_color}">{{item.extend_str}}</button> -->
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
                                <p class="product-title-text">{{item.goods_title | titleLimit}}</p>
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
        </scroller>
    </div>
</template>

<script>
import FNHeader from '../components/common/FNHeader'
import FNRowProduct from '../components/common/FNRowProduct'
import FNRemainProduct from '../components/common/FNRemainProduct'
import { Tab, TabItem ,Popup} from 'vux'

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
                title:'我的订单',
                headerStyles:{
                    bgColor:'rgba(255,255,255,1)',
                    color:'#333333',
                    isTitleBold:true
                },
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
                topData:{
                    bj_img:''
                },
                tabBarStyles:{
                    backgroundColor:'rgba(255,255,255,1)',
                    checkColor:'#F23A4D',
                    color:'#666666'
                },
                isUp:true,
                currentIndex:0,
                select:{
                    type:'',
                    status,
                    p:1,
                },
                isShowBottom:false,
                listData:[],
                itemData:{
                    goods_title:'谜草集黑酵素精华肌底液(提拉紧致 补水保湿 改善细纹 水润透亮)修复受损肌肤 男女适用 酵素精华液',
                    shop_img:'http://www.hairuyi.com/View/index/img/appapi/comm/jd_special_ico.png',
                    yhq_span:'0元券',
                    yhq_price:'1',
                    goods_quanbj_bjimg:'http://www.hairuyi.com/View/index/img/appapi/comm/jd_special_flimg.png',		"share_img": "http://www.hairuyi.com/View/index/img/appapi/comm/jd_special_shareimg.png",
                    goods_store_img: "http://www.hairuyi.com/View/index/img/appapi/comm/goods_store_img.png?time=",
                    goods_fanli_bjimg: "http://www.hairuyi.com/View/index/img/appapi/comm/jd_special_flimg.png",
                    goods_quanfont_bjimg: "http://www.hairuyi.com/View/index/img/appapi/comm/goods_quanfont_bjimg.png?time=",
                    goods_quanbj_bjimg: "http://www.hairuyi.com/View/index/img/appapi/comm/jd_special_quanimg.png",
                    goodsyhqstr_color: "FFFFFF",
                    goodsfcommissionstr_color: "FFFFFF",
                    fcommission: "0.01",
                    fcommission_str: "返0.01",
                },
                cateNav1:[],
                cateNav2:[],
                currentNav2Index:0,
                noData:true,
                showList:false,
                noDataText:''
            }
        },
        created(){
            this.getIndex()
        },
        mounted(){
            this.top = 1
            this.bottom = 20
        },
        methods: {
            getIndex() {
                this.GET('/?mod=appapi&act=jdgoods_special_order&ctrl=cate',{
                },(res)=>{
                    // console.log(res)
                    if(res.data.success==1){
                        this.indexData = res.data.data
                        this.cateNav1 = res.data.data.cate_2
                        this.cateNav2 = res.data.data.cate
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
                },(res)=>{
                    if(res.data.success==1){
                        if(res.data.data.length==0){
                            this.noData = true
                        }else{
                            this.noData = false
                            this.$refs.myscroller.finishInfinite(false)
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
            refresh (done) {
                this.select.p = 1
                this.getList(1,(ret)=>{
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
            toggleCate(item){
                this.$refs.myscroller.finishInfinite(false)
                this.noData = false
                this.select.status = item.type
                this.select.p = 1
                this.getList(1,()=>{})
            },
            toggleNav2(index,item){
                this.$refs.myscroller.finishInfinite(false)
                this.noData = false
                this.select.type = item.type
                this.currentNav2Index = index
                this.select.p = 1
                this.getList(1,()=>{})
            },
            navigateToOrderDetail(item){
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: "pub_wailian",
                    show_type_str:"",
                    url: item.orderdetail_url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                },'jump_SkipUIIdentifier')
            },
            navigateToHaiBao(){
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: this.indexData.rule.SkipUIIdentifier,
                    view_type:"",
                    show_type_str:"",
                    url: "",
                    UIIdentifier:"",
                    name:"",
                    jsonInfo: "{\"outlink_style\":\"0\",\"outlink_check_fontcolor\":\"000000\",\"outlink_check_bgcolor\":\"FFFFFF\"}"
                },'jump_SkipUIIdentifier')
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
                    this.noDataText = ''
                }else{
                    this.noDataText = '没有更多数据'
                }
            }
        }
    }
</script>

<style scoped>
.cate-nav{
    height: 80px;
    z-index: 100;
    position: relative;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.1);
}
.cate-nav-2{
    width: 100%;
    height: 70px;
    z-index: 100;
    position: relative;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    padding-left: 170px;
    padding-right: 170px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #FAFAFA;
}
.cate-nav-2-item{
    height: 70px;
}
.cate-nav-2-item span{
    font-size:28px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 70px
}
.SpecialShopOrder{
    width: 100%;
}
.scroller{
    /* padding-top: 353px; */
    background-color: #FAFAFA;
}
.scroller1{
    padding-top: 205px
}
/* .scroller1-iphonex{
    padding-top: 386px
} */
.scroller2{
    padding-top: 150px
}
/* .scroller2-iphonex{
    padding-top: 330px
} */
.fn-header{
    z-index: 100;
    position: relative;
    /* box-shadow: 0 2px 10px 0 rgba(0,0,0,.1); */
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
    height: 53px;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #F0F0F0;
    border-bottom-style: solid;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
}
.order-detail-box2{
    align-items: center
}
.type-title{
    font-size:18px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 18px
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
    box-sizing: border-box;
    align-items: center;
    justify-content: center
}
.order-status-box span{
    font-size:20px;
    font-family:SourceHanSansCN-Regular;
    font-weight: 500;
    color:rgba(255,255,255,1);
    /* margin-top: 5px; */
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

.rule-box{
    width: 100%;
    height: 56px;
    padding-left: 2%;
    padding-right: 2%;
    z-index: 100;
    position: relative;
    align-items: center;
    justify-content: space-between
}
.rule-box marquee{
    font-size: 20px;
    font-weight: 400;
}
.rule-box img{
    height:auto;
    width: 140px
}
.scroller-bottom-box1{
    width: 100%;
    height: 205px;
}
.scroller-bottom-box2{
    width: 100%;
    height: 150px;
}
</style>