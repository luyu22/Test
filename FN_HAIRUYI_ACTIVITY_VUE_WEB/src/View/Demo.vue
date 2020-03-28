<template>
    <div class="container col">
        <div class="button col"
        @click="test('share_img')">
            <span class="button-text">分享图片</span>
        </div>
        <div class="button col"
        @click="test('one_share')">
            <span class="button-text">分享链接</span>
        </div>
        <div class="button col"
        @click="test('share_copy')">
            <span class="button-text">分享带复制链接</span>
        </div>
        <div class="button col"
        @click="test('share_save')">
            <span class="button-text">分享带保存图片</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            test(type){
                console.log(type)
                this.appOpenWeb({
                    share_content: "",
                    share_img: "http://www.hairuyi.com/Upload/college/1561686483_1_0.png",
                    share_title: "文章1",
                    share_type: type,
                    share_url: "http://t.cn/Ai075iVY"
                },'app_share')
            }
        }
    }
</script>

<style scoped>
.container{
    width:100%;
    align-items: center
}
.button{
    width: 600px;
    height: 60px;
    border-radius: 30px;
    background-color: rgb(157, 190, 252);
    align-items: center;
    justify-content: center;
    margin-top: 30px;
}
.button-text{
    font-size: 30px;
    font-weight: 500;
    line-height: 60px;
    color: #fff;
}
</style>