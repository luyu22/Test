<template>
    <div v-wechat-title="'我要办卡'">
        <scroller
        :style="{backgroundColor:'#FAFAFA'}">
            <div class="scroller-container col">

                <div class="card-box row">
                    <img class="card-image"
                    :src="indexData.img" alt="">
                    <div class="card-right-box col">
                        <span
                        class="text-1">{{indexData.name}}</span>
                        <!-- <span
                        class="text-2">申请人数：9061</span> -->
                        <div class="mark row">
                            <div class="mark-item"
                            v-for="(item, index) in indexData.rights" :key="index"
                            :style="{color:'#'+indexData.rights_color,backgroundImage:'url('+indexData.rights_bg+')'}">{{item}}</div>
                        </div>
                        <!-- <div class="yh-box row">
                            <div class="yh-item">自购赚￥60</div>
                        </div> -->
                    </div>
                </div>

                <div class="rule-box col">
                    <div class="card-line"></div>
                    <span class="text-3">规则</span>
                    <div
                    v-for="(item, index) in indexData.rule" :key="index">
                        <!-- <div class="rule-item row"
                        >
                            <span class="text-4">年费</span>
                            <span class="text-5">免年费</span>
                        </div> -->
                        <span class="text-4" v-html="item"></span>
                        <div class="rule-line"
                        v-if="index!=indexData.rule.length-1">
                        </div>
                    </div>
                    <!-- <div class="rule-item row">
                        <span class="text-4">积分</span>
                        <span class="text-5">1元=1积分</span>
                    </div>
                    <div class="rule-item row">
                        <span class="text-4">里程</span>
                        <span class="text-5">60积分=1航空里程</span>
                    </div> -->
                </div>

                <img class="image-button" src="../assets/bank_button.png" alt=""
                @click="showPopup=true">
            
            </div>
        </scroller>

        <div class="pop-up col animated"
        :style="{height:PageHeight+'px'}"
        v-if="showPopup"
        @click="hidePopup"
        :class="toastClass">
            <div class="pop-up-container col"
            @click="handleContainerClick"
            @click.stop>
                <span class="pop-up-title">完善用户信息</span>
                <div class="input-form">
                    <input type="text"
                    placeholder="请输入您的姓名"
                    v-model="name">
                </div>
                <div class="input-form">
                    <input type="number"
                    placeholder="请输入手机号"
                    v-model="phone">
                </div>
                <div class="input-form">
                    <input type="text"
                    placeholder="请输入您的身份证号"
                    v-model="id">
                </div>
                <img class="confirm-buttom"
                src="../assets/bank_confirm.png" alt=""
                @click="submit">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                PageHeight:834,
                name:'',
                phone:'',
                id:'',
                showPopup:false,
                toastClass:'fadeIn',
                indexData:{
                    img:''
                }
            }
        },
        created(){
            this.PageHeight = window.innerHeight
            this.getIndex()
        },
        methods: {
            handleContainerClick() {
                
            },
            hidePopup(){
                this.toastClass = 'fadeOut'
                setTimeout(() => {
                    this.showPopup = false
                    this.toastClass = 'fadeIn'
                }, 1000);
            },
            getIndex(){
                this.GET('?mod=appapi&act=credit_card&ctrl=apply',{
                    id:this.$route.params.id
                },(res)=>{
                    if(res.data.success==1){
                        this.indexData = res.data.data
                        console.log(this.indexData)
                    }
                })
            },
            submit(){
                if(this.phone!=''&&this.id!=''&&this.name!=''){
                    if(this.testID()){
                        if(this.testPhone()){
                            this.GET('?mod=appapi&act=credit_card&ctrl=submit_apply',{
                                uid:this.$route.params.shareid,
                                name:this.name,
                                phone:this.phone,
                                id_card:this.id,
                                bank_id:this.indexData.id
                            },(res)=>{
                                if(res.data.success==1){
                                    window.location.href = res.data.data
                                }else{
                                    this.$vux.toast.text(res.data.msg, 'middle')
                                }
                            })
                        }else{
                            this.$vux.toast.text('请填写正确的手机号', 'middle')
                        }
                    }else{
                        this.$vux.toast.text('请填写正确的身份证号码', 'middle')
                    }
                }else{
                    this.$vux.toast.text('请补充好内容', 'middle')
                }
            },
            testID(){
                let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
                if(idcardReg.test(this.id)){
                    return true
                }else{
                    return false
                }
            },
            testPhone(){
                let reg=/^1[3|4|5|7|8]\d{9}$/
                if(reg.test(this.phone)){
                    return true
                }else{
                    return false
                }
            }
        },
    }
</script>

<style scoped>
.scroller-container{
    width: 100%;
    align-items: center;
}
.card-box{
    width: 93.6%;
    height:214px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(39,105,255,0.1);
    border-radius:10px;
    margin-top: 24px;
    margin-bottom: 24px;
    padding-top: 22px;
    padding-left: 25px;
}
.card-image{
    width:263px;
    height:166px;
    margin-right: 24px;
}
.card-right-box{
    /* justify-content: space-between; */
    height: 130px;
    margin-top: 18px;
}

.text-1{
    font-size:28px;
    line-height: 28px;
    font-family:SourceHanSansCN-Regular;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-bottom: 25px;
}
.text-2{
    font-size:20px;
    line-height: 20px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.mark{
    flex-wrap: wrap
}
.mark-item{
    height:36px;
    /* border:2px solid rgba(255,58,58,1); */
    background:#fff;
    border-radius:6px;
    padding-left: 7px;
    padding-right: 7px;
    font-size:20px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(253,37,15,1);
    line-height:36px;
    margin-right: 17px;
    text-align:center;
    margin-bottom: 10px;
    background: no-repeat center center;
    background-size: 100% 100%;
}
.yh-item{
    height:34px;
    background:linear-gradient(45deg,rgba(253,37,15,1),rgba(255,108,43,1));
    border-radius:8px;
    padding-left: 9px;
    padding-right: 9px;
    font-size:20px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:34px;
    text-align:center;
}
.rule-box{
    width: 93.6%;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(39,105,255,0.1);
    border-radius:10px;
    padding-top: 34px;
    padding-left: 47px;
    padding-bottom:31px;
    position: relative;
}
.text-3{
    font-size:36px;
    font-family:SourceHanSansCN-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height: 36px;
    margin-bottom: 24px;
}
.card-line{
    width:7px;
    height:42px;
    background:rgba(50,50,50,1);
    border-radius:4px;
    position: absolute;
    left: 25px;
    top: 30px;
}
.text-4{
    font-size:28px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height: 28px;
    margin-right: 35px;
}
.text-5{
    font-size:28px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height: 28px
}
.rule-line{
    width:628px;
    height:2px;
    background:rgba(250,250,250,1);
    margin-top: 16px;
    margin-bottom: 30px;
    margin-left: 28px;
}
.image-button{
    width: 685px;
    height: auto;
    margin-top: 50px;
}
.pop-up{
    width: 100%;
    background:rgba(0,0,0,0.6);
    z-index: 99;
    position: absolute;
    left: 0;
    top: 0;
    align-items: center;
    justify-content: center
}
.pop-up-container{
    width:675px;
    height:660px;
    background:rgba(255,255,255,1);
    border-radius:12px;
    align-items: center
}
.pop-up-title{
    font-size:34px;
    font-family:SourceHanSansCN-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height: 34px;
    margin-top: 37px;
    margin-bottom: 38px;
}
.input-form{
    /* width:596px;
    height:100px;
    border:2px solid rgba(240,240,240,1);
    border-radius:8px; */
}
input{
    width:596px;
    height:100px;
    border:2px solid rgba(240,240,240,1);
    border-radius:8px; 
    outline: none;
    line-height: 100px;
    font-size: 28px;
    padding-left: 27px;
    margin-bottom: 22px;
}
.confirm-buttom{
    width: 615px;
    height: auto;
}

</style>