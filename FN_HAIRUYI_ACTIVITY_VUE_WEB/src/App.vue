<template>
  <div id="app">
    <span id="span-notshow">aa</span>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
      </router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
          // 禁用右键
      // document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body{
  width: 100%;
}
html,body,p{
  margin: 0;
  padding: 0;
}
.row{
  display: flex;
  flex-direction: row
}
.col{
  display: flex;
  flex-direction: column
}
div{
  box-sizing: border-box;
}
.clearf:before,
.clearf:after {
  content: "";
  clear: both;
  display: block;
}
a {
  text-decoration: none;
}
ul,
ol,
li {
  list-style: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
*{
  // -webkit-touch-callout:none;
	// -webkit-user-select:none;
	// -khtml-user-select:none;
	// -moz-user-select:none;
	// -ms-user-select:none;
  // user-select:none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  margin: 0;
  padding: 0;
}
body> :not(#app,.vux-toast,.vux-popup-mask,input,#nprogress,.spinner,.wc-mask,.wc-messagebox__mask---,.wc-messagebox__mask-transition---)
{
  display:none;
}
iframe{
  display:none;
}
#span-notshow{
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
