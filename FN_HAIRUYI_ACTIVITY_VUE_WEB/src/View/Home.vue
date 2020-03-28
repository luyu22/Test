<!--
 * @Description: In User Settings Edit
 * @Author: JKate
 * @Date: 2019-06-11 09:47:45
 * @LastEditTime: 2019-07-24 10:34:08
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="SpecialShop618"
    v-wechat-title="'加载错误'">
        <h1>请检查路由地址和文件是否正确</h1>
    </div>
</template>

<script>

    export default {
        data(){
            return{
            }
        },
        mounted(){
        },
        methods: {
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