<template>
    <div class="SpecialShopOrder"
    v-wechat-title="title">
        <!-- <div class="fn-header">
            <FNHeader
            :needShadow="false"
            :headerStyles="headerStyles"
            :title="title"
            />
        </div> -->
        <scroller
            :on-refresh="refresh"
            class="scroller">
            <div class="process-box row">
                <div class="process-item col"
                v-for="(item, index) in indexData.status_data" :key="index">
                    <span class="process-item-text-1" v-html="item.name"></span>
                    <div class="process-item-middle-box row">
                        <img class="dot" :src="item.img" alt="">
                        <img class="line" 
                        :src="item.line" 
                        alt=""
                        v-if="item.line!==''">
                    </div>
                    <span class="process-item-text-2">{{item.time}}</span>
                </div>
            </div>
            <div class="remain-text-box row"
            :style="{backgroundImage:'url('+indexData.img+')'}">
                <span 
                :style="{color:'#'+indexData.status_info_color}">{{indexData.status_info}}</span>
            </div>
            <div class="fanli-box col">
                <span>{{indexData.f_info}}</span>
                <span>{{indexData.f_str}}</span>
            </div>
            <div class="order-detail-box col">
                <div class="row order-detail-box-item"
                v-for="(item, index) in indexData.order_msg" 
                :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.val}}</span>
                </div>
            </div>
            <div class="product-box row">
                    <img class="product-image"
                    :src="indexData.goods_img" alt="">
                    <div class="product-right-box col">
                        <div class="shop-title clearf">
                            <img class="shop-icon fl"
                            :src="indexData.goods.shop_img">
                            <p class="product-title-text">{{indexData.goods_title | titleLimit}}</p>
                        </div>
                        <div class="row quan-fan-num-box">
                            <div class="quan-fan-box row">
                                <div class="quan row"
                                :style="{backgroundImage:'url('+indexData.goods.f_bjimg+')'}"
                                >
                                <span
                                :style="{color:'#'+indexData.goods.f_color}">{{indexData.goods.str}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="time-status-box row">
                            <span class="time">{{indexData.goods.pay_str}}</span>
                            <span class="status"
                            :style="{color:'#'+indexData.status_color}">{{indexData.status_str}}</span>
                        </div>
                        
                    </div>
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
                title:'订单详情',
                headerStyles:{
                    bgColor:'rgba(255,255,255,1)',
                    color:'#333333',
                    isTitleBold:true
                },
                indexData:{
                    goods:{
                        shop_img:''
                    },
                    goods_title:''
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
                    cid:'',
                    p:1,
                    sort:'zonghe',
                    keyword:'',
                    remainP:1
                },
                isShowBottom:false,
                listData:[],
            }
        },
        created(){
            this.getIndex(()=>{})
        },
        mounted(){

        },
        methods: {
            getIndex(callback) {
                this.GET('/?mod=appapi&act=jdgoods_special_order&ctrl=detail',{
                    oid:this.$route.params.id
                },(res)=>{
                    if(res.data.success==1){
                        this.indexData = res.data.data
                    }
                    callback()
                })
            },
            refresh (done) {
                this.getIndex(()=>{
                    done()
                })
            },
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
        }
    }
</script>

<style scoped>
.SpecialShopOrder{
    width: 100%;
}
.scroller{
    /* padding-top: 147px; */
    background-color: #FAFAFA
}
.scrollerIPhoneX{
    padding-top: 180px;
    background-color: #FAFAFA
}
.fn-header{
    z-index: 100;
    position: relative;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.1);
}
.process-box{
    width: 100%;
    padding-left: 4%;
    padding-right: 4%;
    background-color: #fff;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
.process-item{
    background-color: #fff;
    align-items: center;
    width: 24%;
    text-align: center
}
.process-item .process-item-text-1{
    text-align: center;
    font-size:22px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:30px;
    font-family:SourceHanSansCN-Regular;
}
.process-item .process-item-text-2{
    font-size:22px;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:30px;
}
.process-item-middle-box{
    width: 30px;
    height: 30px;
    position: relative;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
.dot{
    width: 30px;
    height: 30px;
}
.line{
    width: 128px;
    height: 3px;
    position: absolute;
    left: 40px;
}
.remain-text-box{
    width: 100%;
    height: 144px;
    align-items: center;
    justify-content: center;
    background: no-repeat center center;
    background-size: 100% 100%;
}
.remain-text-box{
    font-size:28px;
    font-family:SimHei;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:28px;
}
.fanli-box{
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    justify-content: center;
    padding-left: 4%;
    margin-bottom: 20px;
    background-color: #fff;
}
.fanli-box span:nth-child(1){
    font-size:28px;
    font-family:SimHei;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:28px;
    margin-bottom: 30px;
}
.fanli-box span:nth-child(2){
    font-size:36px;
    font-family:SourceHanSansCN-Regular;
    font-weight:500;
    color:rgba(255,83,53,1);
    line-height:28px;
}

.order-detail-box{
    width: 100%;
    padding-left: 4%;
    background-color: #fff;
    height: 244px;
    padding-top: 4%;
    padding-bottom: 4%;
    justify-content: space-between
}
.order-detail-box-item span:nth-child(1){
    font-size:24px;
    font-family:SimHei;
    font-weight:500;
    color:rgba(102,102,102,1);
    line-height:24px;
    width: 110px;
}
.order-detail-box-item span:nth-child(2){
    font-size:24px;
    font-family:SimHei;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:24px;
}

.product-box{
    width: 100%;
    background-color: #ffffff;
    height: 222px;
    justify-content: space-between;
    margin-top: 20px;
    padding-left: 4%;
    padding-right: 4%;
    padding-top: 17px;
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
    line-height:18px;
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
</style>