<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"
            v-for="(item, index) in imageList"
            :key="index"   >
                <img :src="item.img" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.js';
    export default {
        props:{
            imageList:{
                type:Array,
                default:()=>([])
            }
        },
        mounted(){
            let self = this
            var mySwiper = new Swiper('.swiper-container', {
                speed:1000,
                autoplay : {
                    delay:3000,
                    // stopOnLastSlide: true,
                },
                loop : true,
                observer:true,
                observeParents:false,
                effect : 'coverflow',
                slidesPerView: 1,
                centeredSlides: true,
                coverflowEffect: {
                    rotate: 30,
                    stretch: 10,
                    depth: 60,
                    modifier: 2,
                    slideShadows : false
                },
                on:{
                    click: function(){
                        var realIndex = this.realIndex;
                        self.appOpenWeb(self.imageList[this.realIndex],'jump_SkipUIIdentifier')
                    },
                },
            })
        },
        methods: {
            navigate(item) {
                this.appOpenWeb(item,'jump_SkipUIIdentifier')
            }
        },
    }
</script>

<style scoped>
.swiper-container,.swiper-wrapper,.swiper-slide{
    width: 100%;
    /* height: 350px; */
}
img{
    width: 100%;
}
</style>
