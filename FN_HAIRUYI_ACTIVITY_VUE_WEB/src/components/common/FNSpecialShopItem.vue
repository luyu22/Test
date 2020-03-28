<template>
    <div>
        <div class="title-box row"
        @click="more(FNSpecialShopItemData)">
            <img :src="FNSpecialShopItemData.goods_top_img" 
            alt=""
            class="title-img">
            <img class="more-image-1" :src="FNSpecialShopItemData.more_img" alt="">
        </div>
        <div class="product-container row">
            <FNRowProduct v-for="(item, index) in FNSpecialShopItemData.list" 
            :key="index"
            :itemData="item"
            @refreshRemainList="refreshRemainList"/>
        </div>
        <img class="more-image-2" 
        @click="more(FNSpecialShopItemData)"
        :src="FNSpecialShopItemData.more_img1" alt="">
    </div>
</template>

<script>
import FNRowProduct from './FNRowProduct'
    export default {
        components:{
            FNRowProduct
        },
        props:{
            FNSpecialShopItemData:{
                type:Object,
                default:()=>({
                    list:[],
                    goods_top_img:''
                })
            }
        },
        methods: {
            more(item) {
                let self = this
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: "pub_wailian",
                    show_type_str:"",
                    url: item.url,
                    jsonInfo: `{"outlink_style":"1","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                },'jump_SkipUIIdentifier')
            },
            refreshRemainList(){
                this.$emit('refreshRemainList',true)
            }
        },
    }
</script>

<style scoped>
.title-box{
    width: 100%;
    margin-bottom: 40px;
    margin-top: 20px;
    align-items: center;
    justify-content: center
}
.title-img{
    width: 100%;
    height: auto;
}
.product-container{
    flex-wrap: wrap;
    width: 100%;
    padding-left: 4%;
    padding-right: 4%;
    justify-content: space-between
}
.more-image-1{
    position: absolute;
    right: 30px;
    height: 40px;
    width: auto;
}
.more-image-2{
    width: 100%;
    height: auto;
}
</style>