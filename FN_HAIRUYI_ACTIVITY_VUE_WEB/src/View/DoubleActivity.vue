<template>
  <div class="DoubleActivity col" v-wechat-title="title">
    <div id="wrap_img" >
      <div id="wrap_pic" style="overflow: hidden">
        <img :src="indexData.act_bj_img" alt="" style="width: 110%;height: 100%;display: block;margin-left: -5%;">
      </div>

      <div id="share_icon" @click="goShare">
        <img src="../assets/share_img.jpg" alt="" style="width: 100%;height: 100%;border-radius: 50%;">
      </div>
      <div class="lingqu" @click="goLingQu">
        <img :src="indexData.act_receive_img" alt="" style="width: 100%;height: 100%;">
      </div>
      <div class="copy" @click="goCopy">
        <img :src="indexData.act_copy_btn_img" alt="" style="width: 100%;height: 100%;">
      </div>
      <div class="share_code" @click="goShare">
        <img :src="indexData.act_share_btn_img" alt="" style="width: 100%;height: 100%;">
      </div>
    </div>


  </div>
</template>

<script>
    export default {
        name: "DoubleActivity",
        data(){

            return{
                title:'加载中',
                indexData:"",
                copyText:"",





            }
        },
        created(){
            this.getIndexdata()

        },
        mounted(){
            //操作数据
            console.log(window.screen.height)
            // document.getElementById("wrap_pic").style.height=window.screen.height+'px'


        },
        methods: {
            getIndexdata(){
                this.GET('?mod=appapi&act=tb_activity&ctrl=index',{
                    SkipUIIdentifier:this.$route.params.SkipUIIdentifier,
                    show_type_str:this.$route.params.show_type_str,
                    platform:this.$route.params.platform,

                },(res)=>{
                    if (res.data.success==0){
                        //弹出淘宝授权的时候隐藏掉内容
                        document.getElementById("wrap_img").style.visibility="hidden"
                        this.$alert({
                            title: '提示',
                            content: res.data.msg
                        })

                    }

                    console.log(res.data)
                    this.indexData = res.data.data
                    this.title=res.data.data.title
                    this.copyText=res.data.data.tkl_content



                })

            },
            goLingQu(){

                this.appOpenWeb({
                    is_need_login: "1",
                    SkipUIIdentifier: "pub_taobao_wailian",
                    show_type_str: "",
                    url: this.indexData.url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                }, 'jump_SkipUIIdentifier')
            },
            goCopy(){
                var text = this.copyText
                var eleInput = document.createElement('input');
                eleInput.value = text;
                document.body.appendChild(eleInput);
                // eleInput.style.position = 'absolute';
                // eleInput.style.top = '-999999px';
                eleInput.select();
                eleInput.setSelectionRange(0, eleInput.value.length);//兼容IOS
                document.execCommand("Copy")
                document.body.removeChild(eleInput);
                // Toast.success('复制成功');
                this.$alert({
                    title: '口令已复制',
                    content: this.copyText
                })
            },
            goShare(){
                this.appOpenWeb({
                    share_content:this.indexData.act_share_content,
                    share_img: this.indexData.act_share_qrcode_img,
                    share_title: this.indexData.act_share_title,
                    share_type: "share_img",
                    share_url: this.indexData.act_share_url,
                },'app_share')
            },
        }
    }
</script>

<style scoped>
#wrap_img{
  width: 100%;
  height: 100%;
  position: relative;
}

  .lingqu{
    width: 300px;
    height: 127px;
    border-radius: 50%;
    position: absolute;
    bottom: 229px;
    left: 31%;

  }
  .copy{
    height: 80px;
    width: 200px;
    border-radius: 50%;
    position: absolute;
    bottom: 130px;
    left: 16%;

  }
.share_code{
  height: 80px;
  width: 200px;
  border-radius: 50%;
  position: absolute;
  bottom: 130px;
  right: 16%;

}
  #share_icon{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 50px;
    right: 50px;
  }
</style>
