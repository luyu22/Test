<template>
    <div class="popup-mask animated fadeIn">
        <div class="content-box col">
            <img :src="itemData.img" alt=""
            class="goods_img"
            @click="navigate(itemData)">
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
            navigate(item) {
                this.appOpenWeb(item,'jump_SkipUIIdentifier')
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
.goods_img{
    width: 100%;
    height: auto;
}



.close{
    position: absolute;
    right: 76px;
    top: 214px;
    width: 50px;
    height: 50px;
}
</style>