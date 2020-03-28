<template>
    <div class="col" v-wechat-title="title">
        <img class="SpecialShopIntro_1" src="../assets/SpecialShopIntro_1.png" alt="">
        <div
        class="intro-1-box"
        :style="{backgroundImage:'url('+require('../assets/SpecialShopIntro_2.png')+')'}">
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
        </div>
        <img class="SpecialShopIntro_3" src="../assets/SpecialShopIntro_3.png" alt="">
        <div
        class="intro-2-box"
        :style="{backgroundImage:'url('+require('../assets/SpecialShopIntro_5.png')+')'}">
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi distinctio eveniet pariatur ullam eius ipsum? Labore beatae illum numquam. Tenetur, dolorum doloremque ipsam magni ab soluta quaerat voluptates repellat officiis.</span>
        </div>
        <img class="SpecialShopIntro_4" src="../assets/SpecialShopIntro_4.png" alt="">
        <img class="SpecialShopIntro_6" src="../assets/SpecialShopIntro_6.png" alt="">
    </div>
</template>

<script>
    export default {
        data(){
            return{
                title:'活动说明'
            }
        },
    }
</script>

<style scoped>
.SpecialShopIntro_1,.SpecialShopIntro_3,.SpecialShopIntro_4{
    width: 100%;
    height: auto;
}
.intro-1-box{
    width: 100%;
    background: no-repeat center center;
    background-size: 100% 100%;
    padding-left: 65px;
    padding-right: 65px;
}
.intro-1-box span,.intro-2-box span{
    opacity: 1;
    font-size: 16px;
    line-height: 16px;
    color: #fff
}
.intro-2-box{
    width: 100%;
    background: no-repeat center center;
    background-size: 100% 100%;
    padding-left: 85px;
    padding-right: 85px;
}
.SpecialShopIntro_6{
    width: 100%;
    height: auto;
}
</style>