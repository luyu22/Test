<template>
  <div class="PreSellShare col" v-wechat-title="title">
    <div class="share_one" :style="{backgroundImage: 'url(' + indexData.top_img + ')', backgroundSize:'100% 100%'}">

    </div>
    <div class="share_two" :style="{backgroundImage: 'url(' + indexData.bjimg + ')', backgroundSize:'100% 100%'}">
      <div class="share_kl" >
        <div class="gohc" @click="goHuichang"></div>
        <div class="kl_text">{{copyText}}</div>
        <div class="kl_info">{{indexData.info}}</div>
        <div class="kl_icon" :style="{backgroundImage: 'url(' + indexData.btn_img + ')', backgroundSize:'100% 100%'}" @click="CopyKl"></div>
      </div>
      <div class="share_lc" :style="{backgroundImage: 'url(' + indexData.list_img + ')', backgroundSize:'100% 100%'}">

      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "PreSellShare",
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


        },
        methods: {
            getIndexdata(){
                this.GET('?mod=appapi&act=tmActivity&ctrl=share_index',{
                    SkipUIIdentifier:this.$route.params.SkipUIIdentifier,
                    show_type_str:this.$route.params.show_type_str,
                    platform:this.$route.params.platform,

                },(res)=>{
                    if (res.data.success==0){
                        // document.getElementById("wrap_img").style.visibility="hidden"
                        // document.getElementById("wrap_wrap").style.display="none"
                        // document.getElementById("share_icon").style.display=none
                        this.$alert({
                            title: '提示',
                            content: res.data.msg
                        })

                    }

                    console.log(res.data)
                    this.indexData = res.data.data
                    this.title=res.data.data.title
                    this.copyText=res.data.data.str



                })

            },
            CopyKl(){
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
            goHuichang(){
                console.log(77)
                this.appOpenWeb({
                    is_need_login: "1",
                    SkipUIIdentifier: "pub_taobao_wailian",
                    show_type_str: "",
                    url: this.indexData.url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                }, 'jump_SkipUIIdentifier')
            }
        }
    }
</script>

<style scoped>
.share_one{
  width: 100%;
  height: 397px;
  position: relative;
}
  .share_two{
    width: 100%;
    height: 1134px;
    position: relative;

  }
  .share_kl{
    display: flex;
     align-items: center;
    justify-content: center;
    flex-direction:column;
    width: 687px;
    height: 513px;
    position: relative;

    margin-left: auto;
    margin-right: auto;
      background-image: url("../assets/juxing20.png");
      background-size: 100% 100%;
  }
  .share_lc{
    margin-top: 20px;
    width: 687px;
    height: 320px;
    position: relative;

    margin-left: auto;
    margin-right: auto;
  }
  .kl_text{
    margin-top: 85px;
    width:598px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(30,30,30,1);
    /*line-height:48px;*/
  }
  .kl_info{
    margin-top: 65px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(32,32,32,1);
  }
  .kl_icon{
    margin-top: 58px;
    width: 321px;
    height: 90px;

  }
  .gohc{
    width: 300px;
    height: 90px;
    position: absolute;
    left: 187px;
    top: 0;
    /*background-image: url("../assets/tuceng2.png");*/
    /*background-size: 100% 100%;*/
    /*visibility: hidden;*/
  }

</style>
