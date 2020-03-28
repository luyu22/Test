<template>
    <dir class="remain-list-item row"
    @click="navigateToDetail()">
        <img class="product-image"
        :src="itemData.goods_img" alt="">
        <div class="item-right-box col">
            <div class="shop-title clearf">
                <img class="shop-icon fl"
                :src="itemData.shop_img">
                <p class="product-title-text">{{itemData.goods_title}}</p>
            </div>
            <span class="intro-text">{{itemData.goods_description}}</span>
            <span class="price">￥{{itemData.goods_price}}<span class="cost-price">￥{{itemData.goods_cost_price}}</span></span>
            <span class="sales-num">{{itemData.goods_sales}}</span>
            <div class="quan-fan-box row">
                <div class="quan row"
                :style="{backgroundImage:'url('+itemData.goods_quanbj_bjimg+')'}">
                    <span>{{itemData.yhq_span}}</span>
                </div>
                <div class="fan row"
                :style="{backgroundImage:'url('+itemData.goods_fanli_bjimg+')'}">
                    <span>{{itemData.fcommission_str}}</span>
                </div>
            </div>
            <div class="canel-remain-button col"
            :style="{borderColor:'#'+itemData.list_remind_color}"
            @click="cancelRemain(itemData)"
            @click.stop>
                <span :style="{color:'#'+itemData.list_remind_color}">{{itemData.remind_str}}</span>
            </div>
            <span class="remain-num">{{itemData.str}}</span>
        </div>
    </dir>
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
                if(value.length>10){
                    let newValue = value.slice(0,9)+'…'
                    return newValue
                }else{
                    return value;
                }
            }
        },
        methods: {
            cancelRemain(item) {
                this.isLogin(()=>{
                    this.GET('/?mod=appapi&act=jdgoods_special_performance&ctrl=cancel_remind',{
                        fnuo_id:item.fnuo_id
                    },(res)=>{
                        // console.log(res.data)
                        if(res.data.success==1){
                            this.$vux.toast.text(res.data.msg, 'middle')
                            this.$emit('refreshRemainList',{
                                isCancelRemain:true,
                                fnuo_id:item.fnuo_id
                            })
                        }
                    })
                })
            },
            navigateToDetail(){
                if(this.itemData.is_gotobuy==1){
                    this.appOpenWeb(this.itemData,'jump_goodsdetail')
                }else{
                    // console.log(this.itemData)
                    this.$vux.toast.text(this.itemData.gotobuy_str, 'middle')
                }
            }
        },
    }
</script>

<style scoped>
.remain-list-item{
    width: 94%;
    height: 220px;
    margin-bottom: 25px;
    justify-content: space-between
}
.product-image{
    width: 220px;
    height: 220px;
}
.item-right-box{
   width: 62%;
   height: 220px;
   justify-content: space-between;
   position: relative;
}
.shop-icon{
    height: 28px;
    width: auto;
    margin-right: 6px;
    margin-top: 6px;
}
.product-title-text{
    font-size:28px;
    font-weight:500;
    color:rgba(51,51,51,1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.intro-text{
    font-size:24px;
    line-height: 24px;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.item-right-box .price{
    font-size:30px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(254,67,62,1);
    line-height: 30px
}
.item-right-box .cost-price{
    font-size:18px;
    line-height: 30px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(203,203,203,1);
    text-decoration: line-through
}
.item-right-box .sales-num{
    font-size:18px;
    font-weight:400;
    color:rgba(203,203,203,1);
    line-height: 18px;
}
.quan,.fan{
    height: 30px;
    padding-left: 8px;
    padding-right: 8px;
    position: relative;
    align-items: center;
    justify-content: center;
    background: no-repeat center center;
    background-size: 100% 100%;
}
.quan span,.fan span{
    font-size:22px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 30px;
    margin-top: 4px;
}
.fan{
    margin-left: 12px;
}
.canel-remain-button{
    width:178px;
    height:63px;
    border:2px solid rgba(200,217,202,1);
    border-radius:10px;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0px;
    top: 110px;
}
.canel-remain-button span{
    font-size:30px;
    font-weight:400;
    color:rgba(75,204,63,1);
}
.remain-num{
    font-size:24px;
    line-height: 24px;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: absolute;
    right: 0px;
    bottom: 0px;
}
</style>