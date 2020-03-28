<template>
  <div class="LaxinRule col" v-wechat-title="title">
    <div class="rulebg">
<!--      <img src="../assets/Rulebg.png" alt="" style="width: 100%;height: 100%">-->
      <div class="text_wrap">
        <div v-html="ruleData" class="font_html" style="color: #424044">{{ruleData}}</div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "LaxinRule",
        data() {
            return {
                copyText:"http://hairuyi.com/admin/?mod=&actlogin&ctrl=index",
                title:"活动规则",
                ruleData:""


            };
        },
        created(){
          this.getIndex()


        },
        methods: {
            getIndex(){
                this.GET('?mod=appapi&act=wph_new&ctrl=index', {

                }, (res) => {
                    console.log(res.data)
                    this.ruleData=res.data.data.act_rule.html_data
                })
            },


        }
    }
</script>

<style scoped>
.rulebg{
  width: 100%;
  height: 2107px;
  background-image: url("../assets/Rulebg.png");
  background-size: 100% 100%;
}
  .text_wrap{
    position: absolute;
    left: 87px;
    top: 415px;
width: 582px;
    height: 1000px;
  }
  .font_html{
    color: #424044
  }
</style>
