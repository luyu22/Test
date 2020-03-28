<template>
    <div class="product-box row"
    @click="navigateToDetail">
        <img class="goods_img" :src="itemData.goods_img" alt="">
        <div class="product-right-box">
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
                <span class="goods_sales fr">{{itemData.sales_str}}</span>
            </div>
            <div class="price-box row">
                <span class="goods_price">{{itemData.price_str}}¥<span>{{itemData.goods_price}}</span></span>
                <span class="goods_cost_price">¥{{itemData.goods_cost_price}}</span>
            </div>
            <div class="shop-box row">
                <img class="shop-image"
                :src="itemData.shop_img" 
                alt="">
                <p>{{itemData.shop_title}}</p>
            </div>
            <div class="share-box row">
                <img class="share-icon" src="../../assets/product_share_icon.png" alt="">
                <span>{{itemData.fxz}}</span>
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
                if(value.length>15){
                    let newValue = value.slice(0,15)+'…'
                    return newValue
                }else{
                    return value;
                }
            },
            shop_title_limit(value){
                if(value.length>8){
                    let newValue = value.slice(0,7)+'…'
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
        }
    }
</script>

<style scoped>
.product-box{
    width: 100%;
    height: 204px;
    background-color: #fff;
    padding-left: 4.6%;
    padding-right: 3%;
    justify-content: space-between
}
.goods_img{
    width: 204px;
    height: 204px;
    border-radius:20px;
}
.product-right-box{
    width: 64.8%;
    height: 204px;
    /* background-color: #FAFAFA; */
    position: relative;
}
.goods_title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size:28px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:40px;
}
.quan-fan-box{
    margin-top: 20px;
    margin-bottom: 25px;
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
.goods_sales{
    font-size:20px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height: 30px;
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
    margin-left: 4px;
}
.shop-box{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50%;
}
.shop-image{
    width: auto;
    height: 24px;
}
.shop-box p{
    font-size:22px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:24px;
    margin-left: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}
.share-box{
    background:rgba(253,43,17,1);
    border:1px solid rgba(253, 43, 17, 0.5);
    box-shadow:0px 0px 7px 0px rgba(253, 17, 43, 0.35);
    border-radius:8px;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 55px;
    padding-left: 20px;
    padding-right: 20px;
}
.share-box span{
    font-size:24px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:55px;
}
.share-icon{
    width: 22px;
    height: 22px;
    margin-top: 16.5px;
    margin-right: 5px;
}
</style>