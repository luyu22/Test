<template>
    <div class="product-box"
    @click="navigateToDetail">
        <div class="image-box">
            <img :src="itemData.goods_img" 
            alt=""
            class="goods_img">
            <div class="share-box col">
                <span>{{itemData.fxz}}</span>
            </div>
        </div>
        <div class="bottom-box">
            <p class="goods_title">{{itemData.goods_title}}</p>
            <div class="quan-fan-box clearf">
                <div class="quan row fl"
                :style="{backgroundImage:'url('+itemData.goods_quanbj_bjimg+')'}"
                v-if="itemData.yhq_price!=0">
                    <span
                    :style="{color:'#'+itemData.goodsyhqstr_color}">{{itemData.yhq_span}}</span>
                </div>
                <div class="fan row fl"
                :style="{backgroundImage:'url('+itemData.goods_fanli_bjimg+')'}"
                v-if="itemData.fcommission_str!=''">
                    <span
                    :style="{color:'#'+itemData.goodsfcommissionstr_color}">{{itemData.fcommission_str}}</span>
                </div>
            </div>
            <div class="price-box row">
                <span class="goods_price">{{itemData.price_str}}¥<span>{{itemData.goods_price}}</span></span>
                <span class="goods_cost_price">¥{{itemData.goods_cost_price}}</span>
            </div>
            <div class="shop-sales-box row">
                <div class="shop-box row">
                    <img class="shop-image"
                    :src="itemData.shop_img" 
                    alt="">
                    <p>{{itemData.shop_title}}</p>
                </div>
                <span class="goods_sales">{{itemData.sales_str}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            itemData:{
                type:Object,
                default:()=>({})
            }
        },
        filters:{
            titleLimit(value){
                if(value.length>12){
                    let newValue = value.slice(0,11)+'…'
                    return newValue
                }else{
                    return value;
                }
            },
            shop_title_limit(value){
                if(value.length>5){
                    let newValue = value.slice(0,4)+'…'
                    return newValue
                }else{
                    return value;
                }
            }
        },
        methods: {
            navigateToDetail(){
                this.appOpenWeb(this.itemData,'jump_goodsdetail')
            }
        },
    }
</script>

<style scoped>
.product-box{
    width: 48%;
    /* height: 560px; */
    border-radius:14px;
    overflow: hidden;
    background-color: #fff;
}
.image-box{
    width: 100%;
    position: relative;
    min-height: 338px;
}
.goods_img{
    width: 100%;
    height: auto;
}
.share-box{
    width:100%;
    height:56px;
    background:rgba(51,51,51,0.3);
    position: absolute;
    bottom: 10px;
    left: 0;
    align-items: center;
    justify-content: center
}
.share-box span{
    font-size:22px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 56px;
}
.bottom-box{
    width: 100%;
    padding: 15px 25px 25px 25px;
}
.goods_title{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:24px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:24px;
}

.quan-fan-box{
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
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
    /* color:rgba(255,255,255,1); */
    line-height: 30px;
    margin-top: 4px;
}
.quan{
    margin-right: 12px;
}

.price-box{
    align-items: flex-end
}
.goods_price{
    font-size:20px;
    font-family:SourceHanSansCN-Regular;
    font-weight:bold;
    color:rgba(254,67,62,1);
    line-height: 20px
}
.goods_price span{
    font-size:30px;
    font-family:SourceHanSansCN-Regular;
    font-weight:bold;
    color:rgba(254,67,62,1);
    line-height: 30px
}
.goods_cost_price{
    font-size:20px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height: 20px;
    text-decoration: line-through;
    margin-left: 10px;
}
.shop-sales-box{
    margin-top: 20px;
    width: 100%;
    justify-content: space-between
}
.shop-image{
    width: auto;
    height: 24px;
}
.shop-box{
    width: 50%
}
.shop-box p{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:22px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:24px;
    margin-left: 4px;
}
.goods_sales{
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height: 24px;
}
</style>