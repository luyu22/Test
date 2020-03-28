<template>
    <div v-wechat-title="indexData.top_title">
        <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="myscroller">
            <div class="col">
                <div v-if="indexData.type==1">
                    <div class="top-box row">
                        <!-- <img src="../assets/specialshop_image3.png" alt=""
                        class="title-icon"> -->
                        <span class="top-title">{{indexData.title}}</span>
                    </div>
                    <div class="time-num-box row">
                        <div class="row">
                            <span class="text-1">{{indexData.author}}</span>
                            <span class="text-2">{{indexData.create_time}}</span>
                        </div>
                        <div class="row">
                            <img :src="indexData.browse_icon" alt=""
                            class="num-icon">
                            <span class="text-3">{{indexData.browse}}</span>
                        </div>
                    </div>
                    <div v-html="indexData.content"
                    class="html-content"></div>
                    <div class="button-box row">
                        <div class="button-item row"
                        v-for="(item, index) in indexData.bottom_btn"
                        :key="index"
                        :style="{background:'#'+item.bg_color}"
                        @click="handleButtonClick(item,index)">
                            <img :src="item.icon" alt=""
                            class="button-item-icon">
                            <span :style="{color:'#'+item.font_color}"
                            class="button-item-text">{{item.counts}}</span>
                        </div>
                    </div>
                </div>
                <div v-if="indexData.type==2"
                class="type-2-container col">
                    <!-- <a class="video-box col"
                    type="video/mp4"
                    :href="indexData.video">
                        <img :src="indexData.thumbnail" alt=""
                        class="video-box-thumbnail">
                        <img :src="indexData.play_icon" alt=""
                        class="video-box-play_icon">
                    </a> -->
                    <video-player  class="video-js vjs-big-play-centered"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"
                    ></video-player>
                    <div class="row type-2-title-box"
                    >
                        <span class="type-2-title-text">{{indexData.title}}</span>
                        <div class="row">
                            <img :src="indexData.browse_icon" alt=""
                            class="num-icon">
                            <span class="text-3">{{indexData.browse}}</span>
                        </div>
                    </div>
                    <div class="type-2-author-text-box">
                        <span class="type-2-author-text">{{indexData.author}}</span>
                    </div>
                    <div class="type-2-time-box">
                        <span class="type-2-time-text">{{indexData.create_time}}</span>
                    </div>
                    <div class="type-2-share-box row">
                        <div class="type-2-share-item row"
                        v-for="(item, index) in indexData.bottom_btn"
                        :key="index"
                        @click="handleButtonClick(item,index)">
                            <img :src="item.icon" alt=""
                            class="type-2-share-item-icon">
                            <span :style="{color:'#'+item.font_color}"
                            class="type-2-share-item-text">{{item.counts}}</span>
                        </div>
                    </div>
                </div>

                <div class="list-container">
                    <img :src="listTitleImage" alt=""
                    class="list-title-img">
                    <div class="list-item row"
                    v-for="(item, index) in listData" :key="index"
                    @click="navigateToNewView(item)">
                        <div class="item-image-box col">
                            <img :src="item.thumbnail" alt=""
                            class="item-image">
                            <img :src="item.play_icon" alt=""
                            class="play_icon"
                            v-if="item.type==2">
                        </div>

                        <div class="item-right-box col">
                            <span class="item-title">{{item.title}}</span>
                            <span class="item-name">{{item.author}}</span>
                            <div class="item-right-bottom-box row">
                                <div class="row">
                                    <img src="../assets/time_icon.png" alt=""
                                    class="time_icon">
                                    <span class="time-text">{{item.create_time}}</span>
                                </div>
                                <div class="row">
                                    <img :src="item.browse_icon" alt=""
                                    class="num-icon">
                                    <span class="text-3">{{item.browse}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import scroll from '../components/scroll/scroll'

    export default {
        components:{
            scroll
        },
        data(){
            return{
                indexData:{
                    top_title:'loading'
                },
                PageHeight:834,
                listData:[],
                listTitleImage:'',
                select:{
                    p:1
                },
                noData:true,
                playerOptions : {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        src: '',  // 路径
                        type: ''  // 类型
                    }],
                    poster: "", //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
                imgHtml:"<img src='http://www.hairuyi.com/Upload/slide/index_slide3.png'></img>"
            }
        },
        created(){
            this.PageHeight = window.innerHeight
            this.getIndex()
            this.getList(1)
        },
        methods: {
            getIndex() {
                this.GET('?mod=appapi&act=college&ctrl=get_detail',{
                    id:this.$route.params.id
                },(res)=>{
                    if(res.data.success==1){
                        this.indexData = res.data.data
                        if(this.indexData.type==1){
                          // console.log(window.atob(this.indexData.content))
                            // let Base64 = require('js-base64').Base64;
                            // this.indexData.content = this.htmldecode(Base64.decode(this.indexData.content));



                          // this.indexData.content=window.atob(this.indexData.content)

                        }else{
                            this.playerOptions.sources[0].src=this.indexData.video
                            this.playerOptions.poster = this.indexData.thumbnail
                        }
                    }
                    // console.log(res)
                })
            },
            getShare(){
                this.GET('?mod=appapi&act=college&ctrl=get_detail',{
                    id:this.$route.params.id
                },(res)=>{
                    if(res.data.success==1){
                        this.indexData = res.data.data
                    }
                    // console.log(res)
                })
            },
            handleButtonClick(item,index){
                if(item.type=='like'){
                    this.GET('?mod=appapi&act=college&ctrl=like',{
                        id:this.$route.params.id
                    },(res)=>{
                        this.$vux.toast.text(res.data.msg, 'middle')
                        if(res.data.success==1){
                            let num = parseInt(this.indexData.bottom_btn[index].counts)
                            num += 1
                            this.indexData.bottom_btn[index].counts = num
                        }
                    },false)
                }else if(item.type=='forwarded'){
                    console.log(this.indexData.share)
                    if(document.cookie.indexOf("lighteshop_appkey")==-1){
                        this.copyStrFree(this.indexData.share.url,'分享链接已复制')
                    }else{
                        this.GET('?mod=appapi&act=college&ctrl=share',{
                            id:this.$route.params.id
                        },(res)=>{
                            if(res.data.success==1){
                                this.appOpenWeb(this.indexData.share,'app_share')
                            }
                        })
                    }
                }
            },
            getList(p,callback){
                this.GET('?mod=appapi&act=college&ctrl=other_recommend',{
                    id:this.$route.params.id,
                    p:p
                },(res)=>{
                    if(res.data.success==1){
                        // console.log(res)
                        this.listTitleImage = res.data.data.icon
                        if(res.data.data.list.length==0){
                            this.noData = true
                        }else{
                            this.noData = false
                            this.$refs.myscroller.finishInfinite(false)
                        }
                        if(this.select.p == 1 ){
                            this.listData = res.data.data.list
                        }else{
                            for(let key in res.data.data.list){
                                this.listData.push(res.data.data.list[key])
                            }
                        }
                        if(typeof(callback)=="function"){
                            callback();
                        }
                    }
                })
            },
            infinite(done){
                // this.select.p++
                // this.getList(this.select.p)
                if(this.noData){
                    this.$refs.myscroller.finishInfinite(true)
                }else{
                    this.select.p++
                    this.getList(this.select.p,()=>{
                        done()
                    })
                }
            },
            refresh(done) {
                // this.select.p = 1
                // this.getList(1)
                this.select.p = 1
                this.getList(this.select.p,()=>{
                    done()
                })
            },
            navigateToNewView(item){
                let self = this
                window.location.href = item.atricle_url
                // this.appOpenWeb({
                //     is_need_login:"1",
                //     SkipUIIdentifier: "pub_wailian",
                //     show_type_str:"",
                //     url: item.atricle_url,
                //     jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                // },'jump_SkipUIIdentifier')
            },
            hanleListItemImageClick(){
                if(item.type==1){
                    window.location.href = item.atricle_url
                }
            },
            htmldecode(str) {
                str = str.replace(/&amp;/gi, '&');
                str = str.replace(/&nbsp;/gi, ' ');
                str = str.replace(/&quot;/gi, '"');
                str = str.replace(/&#39;/g, "'");
                str = str.replace(/&lt;/gi, '<');
                str = str.replace(/&gt;/gi, '>');
                str = str.replace(/<br[^>]*>(?:(rn)|r|n)?/gi, '\n');
                return str;
            }
        },
    }
</script>

<style scoped>
.mt-20{
    width: 100%;
    height: 20px;
}
.top-box{
    width: 100%;
    padding-left: 25px;
    padding-right: 25px;
    margin-top: 20px;
}
.title-icon{
    width: 35px;
    height: 35px;
}
.top-title{
    width:100%;
    /* height:77px; */
    font-size:30px;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:rgba(27,28,36,1);
    line-height:42px;
    /* margin-left: 10px; */
    position: relative;
    /* top: -3.5px; */
}
.time-num-box{
    width: 100%;
    padding-left: 25px;
    padding-right: 25px;
    justify-content: space-between;
    margin-top: 42px;
    margin-bottom: 42px;
    /* align-items: center */
}
.text-1,.text-2{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(182,183,184,1);
    line-height:24px;
}
.text-2{
    margin-left: 23px;
}
.num-icon{
    width: auto;
    height: 24px;
}
.text-3{
    font-size:18px;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:rgba(27,28,36,1);
    margin-left: 10px;
    line-height: 24px;
    margin-top: 3px;
}
.list-container{
    width: 100%;
    padding-left: 25px;
    padding-right: 25px;
    border-top-width: 16px;
    border-style: solid;
    border-color: #EEEEEE;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    padding-top: 25px;
    margin-top: 100px;
}
.list-title-img{
    height: 38px;
    width: auto;
}
.list-item{
    justify-content: space-between;
    width: 100%;
    padding-top: 25px;
    padding-bottom: 25px;
    border-top-width: 0px;
    border-style: solid;
    border-color: #D2D2D2;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 2px;
}
.item-image-box{
    width: 260px;
    height: 180px;
    position: relative;
    align-items: center;
    justify-content: center
}
.item-image{
    width: 260px;
    height: 180px;
    position: absolute;
    left: 0;
    top: 0;
}
.play_icon{
    width: 90px;
    height: 90px;
    z-index: 99;
}
.item-right-box{
    width: 410px;
    height: 180px;
    justify-content: space-between
}
.item-title{
    font-size:30px;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:rgba(27,28,36,1);
    line-height:36px;
    width:410px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.item-name{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(23,22,26,1);
    line-height: 24px;
}
.item-right-bottom-box{
    width: 100%;
    justify-content: space-between
}
.time_icon{
    width: 20px;
    height: 20px;
}
.time-text{
    font-size:18px;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:rgba(27,28,36,1);
    line-height:20px;
    margin-left: 8px;
}
.html-content{
    width: 100%;
    padding-left: 25px;
    padding-right: 25px;
}
.html-content >>> img{
    width: 100%;
    height: auto
}
.button-box{
    width: 100%;
    padding-left: 73px;
    padding-right: 73px;
    justify-content: space-between
}
.button-item{
    width: 222px;
    height: 68px;
    border-radius: 34px;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
}
.button-item-icon{
    width: 50px;
    height: auto;
}
.button-item-text{
    font-size: 32px;
    font-weight: 500;
    line-height: 28px;
    margin-left: 30px;
}
.type-2-container{
    width: 100%;
    align-items: center
}
.video-box{
    width: 652px;
    height: 339px;
    margin-top: 30px;
    position: relative;
    align-items: center;
    justify-content: center
}
.video-box-thumbnail{
    width: 652px;
    height: 339px;
    position: absolute;
    left: 0;
    top: 0;
}
.video-box-play_icon{
    width: 90px;
    height: 90px;
    z-index: 99;
}

.type-2-title-box{
    width: 100%;
    justify-content: space-between;
    padding-left: 48px;
    padding-right: 23px;
    margin-top: 38px;
    margin-bottom: 37px;
    align-items: flex-end
}
.type-2-title-text{
    font-size:30px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(28,28,32,1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 60%;
}
.type-2-author-text-box{
    width: 100%;
    padding-left: 48px;
    margin-bottom: 13px;
}
.type-2-author-text{
    font-size:24px;
    list-style: 24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(23,22,26,1);
}
.type-2-time-box{
    width: 100%;
    padding-left: 48px;
}
.type-2-time-text{
    font-size:18px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(172,172,176,1);
}
.type-2-share-box{
    justify-content: flex-end;
    width: 100%;
    padding-right: 23px;
}
.type-2-share-item{
    margin-left: 33px;
}
.type-2-share-item-icon{
    height: 31px;
    width: auto;
}
.type-2-share-item-text{
    font-size:24px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(45,45,52,1);
    line-height: 31px;
    margin-left: 11px;
}
.video-js{
    width: 652px;
    height: 367px;
    margin-top: 30px;
}
</style>
