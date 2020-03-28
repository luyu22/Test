<template>
    <div class="product-box col"
    @click="navigateToDetail()">
        <div class="product-image-box">
            <img class="product-image"
            :src="itemData.goods_img" alt="">
            <div class="remain-box row"
            :style="{backgroundImage:'url('+itemData.remind_img+')'}"
            @click="remain(itemData)"
            @click.stop>
                <img src="../../assets/clock_icon.png" alt=""
                class="clock-icon">
                <span :style="{color:'#'+itemData.remind_color}">{{itemData.remind_str}}</span>
            </div>
        </div>
        <div class="product-bottom-box col">
            <div class="shop-title clearf">
                <img class="shop-icon fl"
                :src="itemData.shop_img">
                <p class="product-title-text">{{itemData.goods_title}}</p>
            </div>
            <div class="quan-fan-box row">
                <div class="quan row"
                :style="{backgroundImage:'url('+itemData.goods_quanbj_bjimg+')'}"
                v-if="itemData.yhq_price!=0">
                    <span>{{itemData.yhq_span}}</span>
                </div>
                <div class="fan row"
                :style="{backgroundImage:'url('+itemData.goods_fanli_bjimg+')'}"
                v-if="itemData.fcommission_str!=''">
                    <span>{{itemData.fcommission_str}}</span>
                </div>
            </div>
            <div class="price-box row">
                <span class="quan-price">{{itemData.price_str}}¥<span>{{itemData.goods_price}}</span></span>
                <span class="cost-price">¥{{itemData.goods_cost_price}}</span>
            </div>
            <div class="sales-share-box row">
                <span class="sales">{{itemData.goods_sales}}</span>
                <img class="share-icon" :src="itemData.share_img">
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
                if(value.length>9){
                    let newValue = value.slice(0,7)+'…'
                    return newValue
                }else{
                    return value;
                }
            }
        },
        methods: {
            remain(item) {
                this.isLogin(()=>{
                    if(item.is_addremind=="0"){
                        this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=add_remind',{
                            fnuo_id:item.fnuo_id
                        },(res)=>{
                            if(res.data.success==1){
                                this.$vux.toast.text(res.data.msg, 'middle')
                                this.itemData.remind_str = '取消提醒'
                                this.itemData.is_addremind = "1"
                                this.$emit('refreshRemainList',{
                                    isCancelRemain:false,
                                    fnuo_id:item.fnuo_id
                                })
                            }
                        })
                    }else{
                        this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=cancel_remind',{
                            fnuo_id:item.fnuo_id
                        },(res)=>{
                            if(res.data.success==1){
                                this.$vux.toast.text(res.data.msg, 'middle')
                                this.itemData.remind_str = '提醒我'
                                this.itemData.is_addremind = "0"
                                this.$emit('refreshRemainList',{
                                    isCancelRemain:false,
                                    fnuo_id:item.fnuo_id
                                })
                            }
                        })
                    }
                })
            },
            navigateToDetail(){
                if(this.itemData.is_gotobuy==1){
                    this.appOpenWeb(this.itemData,'jump_goodsdetail')
                }else{
                    // console.log(this.itemData)
                    this.$vux.toast.text(this.itemData.gotobuy_str, 'middle')
                }
            },
            // share(item){
            //     this.appOpenWeb(this.itemData,'jump_goodsdetail')
            // }
        },
    }
</script>

<style scoped>
.product-box{
    width:48%;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(254,67,62,0.1);
    border-radius:14px;
    margin-bottom: 20px;
    overflow: hidden;
    padding-bottom: 20px;
}
.product-image-box{
    width: 100%;
    position: relative;
    min-height: 332px;
}
.product-image{
    width: 100%;
    height: auto;
}
.remain-box{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    background: no-repeat center center;
    background-size: 100%;
    align-items: center;
    justify-content: center;
    /* z-index: 100; */
}
.remain-box span{
    font-size:24px;
    font-weight:500;
    color:rgba(255,255,255,1);
    font-family:SourceHanSansCN-Medium;
}
.shop-icon{
    height: 28px;
    width: auto;
    margin-right: 6px;
}
.product-title-text{
    font-size:24px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.product-bottom-box{
    width: 100%;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 20px;
    position: relative;
}
.quan-fan-box{
    margin-top: 20px;
    margin-bottom: 25px;
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
.price-box{
    justify-content: space-between
}
.price-box .quan-price{
    font-size:20px;
    font-weight:400;
    color:rgba(254,67,62,1);
    line-height:20px;
}
.price-box .quan-price span{
    font-size: 36px;
    font-weight: bold
}
.cost-price{
    font-size:20px;
    font-weight:400;
    color:rgba(153,153,153,1);
    text-decoration: line-through
}
.sales-share-box{
    justify-content: space-between;
    margin-top: 20px;
}
.sales{
    font-size:20px;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.share-icon{
    height: 34px;
    width: auto;
}
.clock-icon{
    width: 24px;
    height: auto;
    margin-right: 10px;
}
</style>