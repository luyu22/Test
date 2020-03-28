<template>
    <div
    :style="{backgroundColor:'#EB3B45'}"
    v-wechat-title="title">
        <div class="col animated fadeIn"
        v-if="showPage"
        >
            <img class="top-background"
            :src="redpacket_top_01.list.img" 
            alt=""
            ref="top">
            <div class="nav-box col">
                <img :src="redpacket_assemblyroom_01.list.bg_img" alt=""
                class="nav-box-background">
                <div class="nav-item-box row">
                    <img class="nav-icon" 
                    :src="item"
                    @click="scrollTo(index)"
                    v-for="(item, index) in redpacket_assemblyroom_01.list.ico_arr" 
                    :key="index">
                </div>
                <img class="nav-intro-title"
                :src="redpacket_assemblyroom_01.list.font_ico" alt="">
            </div>
            <div class="item-container col"
            :ref="`mask${index}`"
            v-for="(item, index) in listArr" 
            :key="index">
                <img class="item-container-background"
                :src="item.show_img" alt="">
                <div class="item-content-box col">
                    <img class="item-title-icon" 
                    :src="item.font_ico1" alt="">
                    <span class="rule-text"
                    v-for="(str, i) in item.str_list" :key="i">{{str}}</span>
                    
                    <div class="button-container col">
                        <img class="button-container-bg-top"
                        :src="item.frame_top_ico" alt="">
                        <div class="button-container-content-box col"
                        :style="{backgroundImage:'url('+item.frame_mid_ico+')'}" >
                            <div class="button-item-box row"
                            v-for="(button, i) in item.list" :key="i">
                                <img class="button-item-box-background"
                                :src="button.img" alt="">
                                <span class="button-text-1"
                                :style="{color:'#'+button.font_color}">{{button.name}}</span>
                                <span class="button-text-2"
                                :style="{color:'#'+button.content_font_color}">{{button.content | contentLimit}}</span>
                                <img class="button-click-icon"
                                :src="button.btn_img" alt=""
                                @click="handleButtonClick(button)">
                            </div>
                        </div>
                        <img class="button-container-bg-buttom"
                        :src="item.frame_btm_ico" alt="">
                    </div>
                </div>
            </div>
            <img class="scrollToTop-icon"
            src="../assets/返回顶部@2x.png" 
            @click="scrollToTop()"
            :style="{opacity:showScrollTopTopIcon?1:0}">
        </div>
    </div>
</template>

<script>
// import VueScrollTo from 'vue-scrollto'
// import {scroller} from 'vue-scrollto/src/scrollTo'
    export default {
        data(){
            return{
                showScrollTopTopIcon:false,
                redpacket_top_01:{
                    list:{
                        img:''
                    }
                },
                redpacket_assemblyroom_01:{
                    list:{
                        bg_img:'',
                        icon_arr:[],
                        font_icon:''
                    }
                },
                listArr:[],
                showPage:false,
                title:'618红包专场'
            }
        },
        created(){
            this.getIndex()
            this.getTopTitle()
        },
        mounted(){
            let self = this
            window.onscroll= function(){
                var top = document.documentElement.scrollTop||document.body.scrollTop;
                if(top>300){
                    self.showScrollTopTopIcon = true
                }else{
                    self.showScrollTopTopIcon = false
                }
            }
        },
        methods: {
            scrollTo(index) {
                let element = this.$refs[`mask${index}`][0]
                let offsetTop = element.offsetTop
                $('html,body').animate({scrollTop:offsetTop},500)
                // let scrollToElement = scroller()
                // scrollToElement(element)
                // document.querySelector("ID").scrollIntoView();
            },
            scrollToTop(){
                let element = this.$refs.top
                let offsetTop = element.offsetTop
                $('html,body').animate({scrollTop:offsetTop},500)
                // let scrollToElement = scroller()
                // scrollToElement(element)
                // document.querySelector(".top-background").scrollIntoView();
            },
            getIndex(){
                this.GET('?mod=appapi&act=redpacket_activity&ctrl=index',{},(res)=>{
                    // console.log(res)
                    if(res.data.success==1){
                        // console.log(res.data.data)
                        this.listArr = []
                        for(let key in res.data.data){
                            if(res.data.data[key].type == 'redpacket_top_01'){
                                this.redpacket_top_01 = res.data.data[key]
                            }else if(res.data.data[key].type=='redpacket_assemblyroom_01'){
                                this.redpacket_assemblyroom_01 = res.data.data[key]
                            }else if(res.data.data[key].type=='redpacket_list_01'){
                                this.listArr.push(res.data.data[key])
                            }
                        }
                        this.showPage = true
                    }
                })
            },
            handleButtonClick(item){
                let self = this
                if(item.is_need_login==1){
                    this.isLogin(()=>{
                        if(item.SkipUIIdentifier=='pub_copy_kl'){
                            this.copyStr(item.copy_str)
                        }else if(item.SkipUIIdentifier=='pub_wailian'){
                            this.appOpenWeb(item,'jump_SkipUIIdentifier')
                        }else if(item.SkipUIIdentifier=='pub_getremind'){
                            this.remain(item.show_type_str)
                        }else if(item.SkipUIIdentifier=='pub_cancelremind'){
                            this.cancelRemain(item.show_type_str)
                        }else{
                            this.appOpenWeb(item,'jump_SkipUIIdentifier')
                        }
                    })
                }else{
                    if(item.SkipUIIdentifier=='pub_copy_kl'){
                        this.copyStr(item.copy_str)
                    }else if(item.SkipUIIdentifier=='pub_wailian'){
                        this.appOpenWeb(item,'jump_SkipUIIdentifier')
                    }else if(item.SkipUIIdentifier=='pub_getremind'){
                        this.remain(item.show_type_str)
                    }else if(item.SkipUIIdentifier=='pub_cancelremind'){
                        this.cancelRemain(item.show_type_str)
                    }else{
                        this.appOpenWeb(item,'jump_SkipUIIdentifier')
                    }
                }
            },
            remain(show_type_str){
                this.GET('/?mod=appapi&act=redpacket_activity&ctrl=add_remind',{
                    show_type_str:show_type_str
                },(res)=>{
                    if(res.data.success==1){
                        this.$vux.toast.text(res.data.msg, 'middle')
                        this.getIndex()
                    }else{
                        this.$vux.toast.text(res.data.msg, 'middle')
                    }
                })
            },
            cancelRemain(show_type_str){
                this.GET('/?mod=appapi&act=redpacket_activity&ctrl=cancel_remind',{
                    show_type_str:show_type_str
                },(res)=>{
                    if(res.data.success==1){
                        this.$vux.toast.text(res.data.msg, 'middle')
                        this.getIndex()
                    }else{
                        this.$vux.toast.text(res.data.msg, 'middle')
                    }
                })
            },
            getTopTitle(){
                this.GET('/?mod=appapi&act=redpacket_activity&ctrl=topmsg',{},(res)=>{
                    this.title = res.data.data.title
                })
            }
        },
        filters: {
            contentLimit: function(value) {
                if(value.length>10){
                    let newValue = value.slice(0,10)+'…'
                    return newValue
                }else{
                    return value;
                }
            }
        }
    }
</script>

<style scoped>
.top-background{
    width: 100%;
    height: auto;
}
.nav-box-background{
    width: 100%;
    height: auto;
    margin-top: -2px;
}
.nav-box{
    position: relative;
}
.nav-item-box{
    width: 100%;
    justify-content: center;
    /* padding-left: 10%;
    padding-right: 10%; */
    position: absolute;
    left: 0;
    top: 0;
    flex-wrap: wrap
}
.nav-icon{
    width: auto;
    height: 179px;
    margin-left: 20px;
    margin-right: 20px;
}
.nav-intro-title{
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 40px;
}
.item-container{
    margin-top: -2px;
    position: relative;
}
.item-container-background{
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
}
.item-content-box{
    /* position: absolute;
    left: 0;
    top: 0; */
    align-items: center;
    width: 100%;
    z-index: 10;
    margin-bottom: 50px;
}
.item-content-box .rule-text{
    font-size:24px;
    line-height: 38px;
    font-weight:500;
    color:rgba(255,236,170,1);
}
.item-title-icon{
    width: 100%;
    height: auto;
    margin-bottom: 25px;
}
.button-container{
    width: 560px;
}
.button-container-bg-top,.button-container-bg-buttom{
    width: 560px;
    height: auto;
}
.button-container-bg-buttom{
    margin-top: -2px;
}
.button-container-content-box{
    width: 560px;
    background: no-repeat center center;
    background-size: 100% 100%;
    align-items: center;
    margin-top: -2px;
}

.button-item-box{
    width: 471px;
    height: 130px;
    position: relative;
    align-items: center;
    margin-bottom: 25px;
}
.button-item-box-background{
    width: 471px;
    height: 130px;
    position: absolute;
    left: 0;
    top: 0;
}
.button-text-1{
    font-size:36px;
    line-height: 36px;
    font-weight:500;
    position: absolute;
    left: 90px;
    top: 37px;
}
.button-text-2{
    font-size:20px;
    line-height: 20px;
    font-weight:400;
    position: absolute;
    left: 90px;
    bottom: 30px;
}
.button-click-icon{
    width: 103px;
    height: 103px;
    position: absolute;
    right: 24px;
    top: 13.5px;
}
.scrollToTop-icon{
    width: 77px;
    height: 77px;
    position: fixed;
    top: 1000px;
    right: 30px;
    z-index: 100;
}
.copy-text{
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: -100;
}
</style>