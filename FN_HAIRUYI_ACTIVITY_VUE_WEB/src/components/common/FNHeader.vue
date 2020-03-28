<template>
    <div >
        <div
        :style="{ backgroundColor:headerStyles.bgColor}"
        :class="isIPhoneX()?'StatusBarHeightIPhoneX':'StatusBarHeight'"></div>
        <div class="header"
        :style="{ backgroundColor:headerStyles.bgColor,borderBottomWidth:needShadow?'1px':'0px'}">

            <!-- 文字标题 -->
            <span
            v-if="!useImageTitle"
            :style="{ color:headerStyles.color,fontWeight:(headerStyles.isTitleBold)?'bold':'normal'}"
            class="title">{{title}}</span>


            <!-- 返回键 -->
<!--            <div class="back-box"-->
<!--            :style="{width:100+'px',height:headerStyles.height}"-->
<!--            v-if="needBackIcon"-->
<!--            @click="goBack">-->
<!--                <img :src="headerStyles.backImg" class="back"></img>-->
<!--            </div>-->

            <!-- 右文字标题 -->
            <span @click="RightTitleClick" v-if="needRightTitle" class="right-title" :style="{lineHegiht:headerStyles.fontSize+'px'}">{{rightTitle}}</span>

            <!-- 右图片标题 -->
            <div class="right-icon-box"
            :style="{width:100+'px',height:headerStyles.height}"
            v-if="needRightIcon"
            @click="rightIconClick">
                <image :src="rightIcon" class="right-icon"></image>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                StatusBarHeight:55
            }
        },
        props:{
            headerStyles:{
                type: Object,
                default:()=>({
                    height:92,
                    width:750,
                    bgColor:'#FFFFFF',
                    fontSize:36,
                    color:'#181818',
                    isTitleBold:true,
                    backImg:'../../assets/back.png'
                })
            },
            title:{
                type: String,
                default:''
            },
            rightTitle:{
                type: String,
                default:''
            },
            rightIcon:{
                type: String,
                default:''
            },
            needBackIcon:{
                type: Boolean,
                default: true
            },
            needRightTitle:{
                type: Boolean,
                default: false
            },
            needRightIcon:{
                type: Boolean,
                default: false
            },
            needShadow:{
                type: Boolean,
                default: true
            },
            titleImageSrc:{
                type: String,
                default:''
            },
            useImageTitle:{
                type: Boolean,
                default: false
            }
        },
        methods: {
            RightTitleClick() {
                this.$emit('rightTitleClick','click')
            },
            rightIconClick(){
                this.$emit('rightIconClick','click')
            }
        },
    }
</script>

<style scoped>
.header{
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom-style: solid;
    border-bottom-color: #f6f5f5;
    border-bottom-width: 1px;
    width: 100%;
    height: 92px;
    display: flex;
}
.back-box{
    position: absolute;
    left: 0;
    top: 0;
    justify-content: center
}
.StatusBarHeight{
    width: 100%;
    height: 55px;
    background-color: inherit
}
.StatusBarHeightIPhoneX{
    width: 100%;
    height: 88px;
    background-color: inherit
}
.title{
    font-size: 36px
}
.back{
    width: 18px;
    height: 32px;
    margin-left: 30px;
}
.right-title{
    position: absolute;
    right: 30px;
    font-size:26px;
    font-weight:500;
    color:#3C3C3C
}
.right-icon-box{
    position: absolute;
    right: 0;
    top: 0;
    justify-content: center
}
.right-icon{
    width: 35px;
    height: 35px;
    margin-right: 30px;
}
</style>
