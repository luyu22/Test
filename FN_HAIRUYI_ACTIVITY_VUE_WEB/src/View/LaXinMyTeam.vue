<template>
    <scroller
    :on-refresh="refresh"
    :on-infinite="infinite"
    ref="myscroller"
    :noDataText="''"
    :style="{backgroundColor:'#FAFAFA'}">
        <div class="laxin-myteam col animated fadeIn"
        v-wechat-title="indexData.title">
            <!-- <img class="top-background" 
            src="../assets/矩形 1 拷贝@2x.png" alt=""> -->
            <div class="top-background"
            :style="{background:'#'+indexData.bj_color}"></div>
            <!-- <div class="fn-header">
                <FNHeader
                :needShadow="false"
                :headerStyles="headerStyles"
                :title="'我的团队'"
                />
            </div> -->
            <div class="card-box col">
                <div class="card-top-box row">
                    <div class="card-top-box-left col"
                    v-for="(item, index) in indexData.count_data" 
                    :key="index">
                        <div class="row card-box-text-1-box"
                        @click="handleTopClick(item)">
                            <span class="card-box-text-1">{{item.name}}</span>
                            <img class="question-icon" 
                            src="../assets/question_icon.png" 
                            alt=""
                            v-if="item.is_has_tip==1">
                        </div>
                        
                        <span class="card-box-text-2">{{item.val}}</span>
                        
                        <img class="card-box-top-line" src="../assets/圆角矩形 5@2x.png" alt="">
                    </div>
                    <!-- <div class="card-top-box-left col">
                        <span class="card-box-text-1">有效拉新人数</span>
                        <span class="card-box-text-2">10</span>
                        <img class="card-box-top-line" src="../assets/圆角矩形 5@2x.png" alt="">
                    </div> -->
                </div>
                <div class="card-bottom-box row">
                    <div class="card-bottom-item col"
                    v-for="(item, index) in indexData.daycount_data" 
                    :key="index"
                    :class="index==1?'card-bottom-item-border':''">
                        <span class="card-box-text-3">{{item.val}}</span>
                        <span class="card-box-text-4">{{item.name}}</span>
                    </div>
                    <!-- <div class="card-bottom-item card-bottom-item-border col">
                        <span class="card-box-text-3">10</span>
                        <span class="card-box-text-4">昨日新增</span>
                    </div>
                    <div class="card-bottom-item col">
                        <span class="card-box-text-3">10</span>
                        <span class="card-box-text-4">待有效数</span>
                    </div> -->
                </div>
            </div>
            <span class="time-text">{{indexData.update_str}}</span>
            <div class="list-container col">
                <div class="list-top"
                :style="{backgroundImage:currentIndex==0?'url('+indexData.font_data[0].checkimg+')':'url('+indexData.font_data[0].img+')'}">
                    <div class="list-nav row">
                        <div class="list-nav-item row"
                        v-for="(item, index) in indexData.font_data" :key="index"
                        @click="toggleNav(index,item)">
                            <img :src="currentIndex==index?item.check_ico:item.ico" 
                            class="nav-icon" alt="">
                            <span
                            :style="{color:currentIndex==index?'#'+item.check_color:'#'+item.color}">{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="list-content col"
                :style="{backgroundImage:'url('+indexData.font_data[0].mid_img+')'}">
                    <div class="sub-nav row"
                    v-if="cateArr[currentIndex].cate.length>0">
                        <div class="sub-nav-item col"
                        v-for="(item, index) in cateArr[currentIndex].cate" :key="index"
                        @click="toggleCate(index,item)">
                            <span
                            :style="{color:cateCurrentIndex==index?'#FF3434':'#999999'}">{{item.name}}</span>
                            <div class="sub-nav-item-line-box col"
                            v-if="cateCurrentIndex==index">
                                <img class="sub-nav-item-line" 
                                src="../assets/圆角矩形 5@2x.png" alt=""
                                >
                            </div>

                        </div>
                    </div>
                    <div class="list-item row animated fadeIn"
                    v-for="(item, index) in listData" :key="index">
                        <img :src="item.head_img" alt="">
                        <span class="list-item-text-1">{{item.nickname}}</span>
                        <span class="list-item-text-2">{{item.phone}}</span>
                        <div class="status-box"
                        :style="{background:'#'+item.status_color}">
                            <span :style="{color:'#'+item.status_fontcolor}"
                            >{{item.status}}</span>
                        </div>
                    </div>
                    <div class="empty-box col animated fadeIn"
                    v-if="listData.length==0">
                        <img src="../assets/laxin_empty.png" alt=""
                        class="empty-icon">
                        <span>空空如也，<span :style="{color:'#F71F1D'}">快点分享</span>让好友加入吧!</span>
                    </div>
                </div>
                <div class="list-bottom">
                    <img :src="indexData.font_data[0].btm_img" alt="">
                </div>
            </div>
            <div
            v-if="isShowToast"
            class="toastText-box col">
                <div class="toastText animated"
                :class="toastClass"
                >
                    <span>{{toastText}}</span>
                </div>
            </div>
        </div>
    </scroller>

</template>

<script>
import FNHeader from '../components/common/FNHeader'
    export default {
        components:{
            FNHeader
        },
        data(){
            return{
                headerStyles:{
                    bgColor:'rgba(255,255,255,0)',
                    color:'#9D6000',
                    isTitleBold:true
                },
                currentIndex:0,
                indexData:{
                    title:'我的团队',
                    update_str:'',
                    font_data:[
                        {checkimg:'',img:'',check_ico:'',ico:''},
                        {checkimg:'',img:'',check_ico:'',ico:''}
                    ],
                    count_data:[],
                    daycount_data:[]
                },
                select:{
                    type:'',
                    index:0,
                    cate_type:'',
                    p:1
                },
                cateArr:[
                   {
                       cate:[]
                   },
                   {
                       cate:[]
                   }
                ],
                cateCurrentIndex:0,
                listData:[],
                noData:true,
                toastText:'',
                isShowToast:false,
                toastClass:'fadeIn',
                isCanClick:true
            }
        },
        created(){
            this.getIndex()
        },
        methods: {
            toggleNav(index,item) {
                this.currentIndex = index
                this.select.type = item.type
                this.select.p = 1
                this.getCate()
            },
            getIndex(){
                this.GET('/?mod=appapi&act=invite_ranklist&ctrl=team_index',{},(res)=>{
                    if(res.data.success==1){
                        this.indexData = res.data.data
                        this.select.type = res.data.data.font_data[0].type
                        this.getCate()
                        console.log(res.data)
                    }
                })
            },
            getCate(){
                this.GET('/?mod=appapi&act=invite_ranklist&ctrl=teamcate',{
                    type:this.select.type
                },(res)=>{
                    if(res.data.success==1){
                        this.cateArr[this.currentIndex].cate = res.data.data
                        if(res.data.data.length>0){
                            this.select.cate_type = res.data.data[0].cate_type
                        }
                        this.getList(1)
                    }
                },false)
            },
            handleTopClick(item){
                if(item.is_has_tip==1){
                    if(this.isCanClick){
                        this.isCanClick= false
                        this.toastText = item.tip_str
                        this.toastClass = 'fadeIn'
                        this.isShowToast = true
                        setTimeout(()=>{
                            this.toastClass = 'fadeOut'
                            setTimeout(()=>{
                                this.isShowToast = false
                                this.isCanClick= true
                            },1000)
                        },1500)
                    }
                    // this.$vux.toast.text(item.tip_str)
                }
            },
            toggleCate(index,item){
                this.cateCurrentIndex = index
                this.select.cate_type = item.cate_type
                this.select.p = 1
                this.getList(1)
            },
            getList(p,callback){
                let params = {}
                if(this.cateArr[this.currentIndex].cate.length>0){
                    params = {
                        p:p,
                        cate_type:this.select.cate_type,
                        type:this.select.type
                    }
                }else{
                    params = {
                        p:p,
                        cate_type:'',
                        type:this.select.type
                    }
                }
                this.GET('/?mod=appapi&act=invite_ranklist&ctrl=team_user',params,(res)=>{
                    if(res.data.success==1){
                        if(res.data.data.length==0){
                            this.noData = true
                        }else{
                            this.noData = false
                            this.$refs.myscroller.finishInfinite(false)
                        }
                        console.log(this.noData)
                        if(p == 1 ){
                            this.listData = res.data.data
                        }else{
                            for(let key in res.data.data){
                                this.listData.push(res.data.data[key])
                            }
                        }
                        console.log(res.data)
                    }
                    if(typeof(callback)=="function"){
                        callback(res.data.data);
                    }
                },false)
            },
            refresh (done) {
                this.select.p = 1
                this.getList(1,()=>{
                    done()
                })
            },
            infinite (done) {
                if(this.noData){
                    this.$refs.myscroller.finishInfinite(true)
                }else{
                    this.select.p++
                    this.getList(this.select.p,()=>{
                        done()
                    })
                }
            }
        },
    }
</script>

<style scoped>
.laxin-myteam{
    width: 100%;
    align-items: center;
    position: relative;
}

.top-background{
    width: 100%;
    height: 280px;
    position: absolute;
    left: 0;
    top: 0;
}
.card-box{
    width:688px;
    height:364px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 6px 0px rgba(255,192,0,0.15);
    border-radius:20px;
    z-index: 2;
    align-items: center;
    margin-top: 30px;
}
.card-top-box{
    width: 100%;
    height: 218px;
}
.card-top-box-left{
    width: 50%;
    height: 218px;
    align-items: center;
    position: relative;
}
.card-box-text-1-box{
    margin-top: 35px;
    margin-bottom: 35px;
}
.card-box-text-1{
    font-size:26px;
    line-height: 26px;
    font-family:PingFangSC-Regular;
    font-weight:500;
    color:rgba(153,153,153,1);
}
.question-icon{
    width: 24px;
    height: 24px;
    margin-left: 10px;
}
.card-box-text-2{
    font-size:42px;
    line-height: 42px;
    font-family:PingFangSC-Regular;
    font-weight:bold;
    color:rgba(247,31,29,1);
}
.card-box-top-line{
    width: 50px;
    height: 4px;
    margin-top: 35px;
}
.card-bottom-box{
    width: 650px;
    border-top-color: #F0F0F0;
    border-top-width: 1px;
    border-top-style: solid;
}
.card-bottom-item{
    width: 33.3%;
    align-items: center;
    height: 80px;
    margin-top: 35px;
    justify-content: space-between
}
.card-box-text-3{
    font-size:24px;
    line-height: 24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(247,31,29,1);
}
.card-box-text-4{
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.card-bottom-item-border{
    border-left-width: 1px;
    border-right-width: 1px;
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-color: #F0F0F0;
    border-style: solid;
}





.time-text{
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    margin-top: 25px;
    margin-bottom: 25px;
}
.list-container{
    width: 680px;
    position: relative;
    margin-bottom: 50px;
}
.list-container-background{
    width: 689px;
    height: 1330px;
    position: absolute;
    left: 0;
    top: 0;
}
.list-top{
    width: 689px;
    height: 94px;
    position: relative;
    background: no-repeat center center;
    background-size: 100% 100%;
}
.list-nav{
    width: 100%;
    height: 80px;
}
.list-nav-item{
    width: 50%;
    height: 94px;
    align-items: center;
    justify-content: center;
    position: relative;
}
.nav-icon{
    width: 30px;
    height: 30px;
}
.list-nav-item span{
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    line-height: 95px;
    margin-left: 5px;
}

.list-content{
    width: 689px;
    background: no-repeat center center;
    background-size: 100% 100%;
    align-items: center;
    margin-top: -2px;
}
.sub-nav{
    width: 100%;
    height: 110px;
}
.sub-nav-item{
    width: 25%;
    height: 110px;
    align-items: center;
    justify-content: center;
    position: relative;
}
.sub-nav-item span{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:bold;
    color:rgba(255,52,52,1);
    width: 80px;
    text-align: center;
}
.sub-nav-item-line-box{
    width: 100%;
    align-items: center;
    position: absolute;
    bottom: 0;
}
.sub-nav-item-line{
    width: 65px;
    height: 4px;
}
.list-item{
    width: 680px;
    height: 110px;
    border-color: #FAFAFA;
    border-style: solid;
    border-top-width: 2px;
    position: relative;
    border-bottom-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
}
.list-item img{
    width: 68px;
    height: 68px;
    position: absolute;
    left: 40px;
    top: 21px;
}
.list-item-text-1{
    font-size:24px;
    line-height: 110px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    position: absolute;
    left: 190px;
}
.list-item-text-2{
    font-size:20px;
    line-height: 110px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: absolute;
    left: 355px;
}
.status-box{
    width:82px;
    height:30px;
    background:rgba(165,104,1,1);
    border-radius:10px;
    position: absolute;
    right: 47px;
    top: 40px;
    display: flex;
    align-items: center;
    justify-content: center
}
.status-box span{
    font-size:20px;
    line-height: 20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
}

.list-bottom{
    margin-top: -2px;
}
.list-bottom img{
    width: 689px;
    height: auto;
}
.empty-box{
    width: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
    align-items: center
}
.empty-icon{
    width: 300px;
    height: 300px;
}
.empty-box span{
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    margin-top: 48px;
}
.toastText{
    width: 700px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    color: #fff;
    font-size: 26px;
    line-height: 42px
}
.toastText-box{
    position: absolute;
    top: 260px;
    width: 100%;
    align-items: center;
    z-index: 9999;
}
</style>