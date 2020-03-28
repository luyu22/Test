<template>
    <div class="popup-mask animated fadeIn">
        <div class="content-box col">
            <div class="card-box col">
                <img :src="itemData.goods_img" alt=""
                class="goods_img">
                <div class="title-box row">
                    <img class="shop_img"
                    :src="itemData.shop_img" alt="">
                    <span>{{itemData.goods_title}}</span>
                </div>
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
                    <span class="goods_sales">{{itemData.sales_str}}</span>
                </div>
                <img src="../../assets/button_golook.png" alt=""
                class="button"
                @click="navigateToDetail">
            </div>
            <img class="close" src="../../assets/close_white.png" alt=""
            @click="close">

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
        methods: {
            close() {
                this.$emit('close',true)
            },
            navigateToDetail(){
                this.appOpenWeb(this.itemData,'jump_goodsdetail')
            }
        },
    }
</script>

<style scoped>
.popup-mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.content-box{
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center
}
.card-box{
    width: 514px;
    height: 763px;
    background-color: #fff;
    border-radius: 25px;
    align-items: center
}
.goods_img{
    width: 449px;
    height: 449px;
    border-radius: 15px;
    margin-top: 23px;
}
.close{
    position: absolute;
    right: 76px;
    top: 214px;
    width: 50px;
    height: 50px;
}
.shop_img{
    height: 32px;
    width: auto;
}
.title-box{
    width: 449px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.title-box span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:32px;
    font-family:SourceHanSansCN-Regular;
    font-weight:500;
    color:#333333;
    line-height:32px;
    margin-left: 10px;
}

.quan-fan-box{
    margin-bottom: 20px;
    width: 449px;
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
}
.quan{
    margin-right: 12px;
}
.price-box{
    align-items: flex-end;
    width: 449px;
    justify-content: space-between
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
.goods_sales{
    font-size:20px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height: 20px
}
.button{
    width: 313px;
    height: auto;
    margin-top: 20px;
}
</style>