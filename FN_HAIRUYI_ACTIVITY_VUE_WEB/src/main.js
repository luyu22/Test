// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mixin from './mixin'
import VueScroller from 'vue-scroller'
import VueWechatTitle from 'vue-wechat-title'
import  { ToastPlugin } from 'vux'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import store from "./store";
import $ from 'jquery'
import 'nprogress/nprogress.css'
import 'animate.css'

import Es6Promise from 'es6-promise'

Es6Promise.polyfill()


import 'lib-flexible/flexible'
import "swiper/dist/css/swiper.min.css";
import {Alert, Confirm} from 'wc-messagebox'
import 'wc-messagebox/style.css'

import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
import { List,PullRefresh,Tab, Tabs,Switch,Stepper,Toast,Dialog,NoticeBar,CountDown,DropdownMenu, DropdownItem,Collapse, CollapseItem,Uploader} from 'vant';
import 'vant/lib/index.css';
import lrz from 'lrz'

Vue.use(CountDown);

Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Switch)
Vue.use(Stepper)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(NoticeBar)
Vue.use(DropdownMenu).use(DropdownItem).use(Collapse).use(CollapseItem).use(Uploader);


Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)



Vue.config.productionTip = false
Vue.mixin(mixin)

Vue.use(VueScroller)
Vue.use(VueWechatTitle)
Vue.use(ToastPlugin)
Vue.use(VueCookies)
Vue.use(Alert)
Vue.use(Confirm)

axios.defaults.retry = 4; //重试次数
axios.defaults.retryDelay = 1000;//重试延时



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
