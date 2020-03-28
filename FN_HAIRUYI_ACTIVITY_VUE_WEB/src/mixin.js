/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 14:46:13
 * @LastEditTime: 2019-08-17 15:03:16
 * @LastEditors: Please set LastEditors
 */
import md5 from "js-md5";
import qs from "qs"
import instance from './services/Api'
// import axios from 'axios'

let mixins = {
    methods: {
        GET(url,params,callback,needAnimate){
            params['time'] = Math.round(new Date().getTime()/1000)
            if(document.cookie.indexOf("lighteshop_appkey")==-1){
                params['token'] = "1071"
            }else{
                params['token'] = this.$cookies.get('lighteshop_appkey')
            }
            let sign = this.sign(params)
            params['sign'] = sign
            let PostUrl = '/api/'+url
            // let PostUrl = window.location.protocol +'//'+ window.location.host +url
            if(typeof needAnimate == "boolean"){
                this.$store.dispatch('needAnimate',needAnimate)
            }
            instance.post(PostUrl,qs.stringify(params)).then((res)=>{
                if(res.data==""){
                    // console.log(fals
                    this.GET(url,params,callback)
                }else{
                    callback(res)
                    // console.log(true)
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        sign(obj) {//排序的函数
            var newkey = Object.keys(obj).sort();
            　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
            var newObj = {};//创建一个新的对象，用于存放排好序的键值对
            for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
                newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
            }
            let str = ''
            for(let key in newObj){
                str+=key;
                str+=obj[key];
            }
            let sign = md5(`123${str}123`)
            return sign;//返回排好序的新对象
        },
        appOpenWeb(item,type){
            // console.log('appOpenWeb')
            if(type == 'jump_goodsdetail'){
                item["url"] = item.get_goods_url
            }
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            // console.log(item)
            if(isAndroid){
                window.AndroidWebView.OnClickMethod(type,JSON.stringify(item),'')
            }else if(isiOS){
                this.setupWebViewJavascriptBridge((bridge)=> {
                    var params =  {"className": type,"comFrom":JSON.stringify(item),"identifier":type}
                    bridge.callHandler('WebViewJavascriptBridge',params,()=>{})
                    // setTimeout(()=>{
                    //     if(this.$cookies.isKey('SpecialShopMoreOpen')){
                    //         this.$cookies.remove('SpecialShopMoreOpen')
                    //     }else{
                    //         if(typeof(callback)=="function"){
                    //             callback()
                    //         }
                    //     }
                    // },3000)
                })

            }
        },
        setupWebViewJavascriptBridge(callback) {
            // ios处理
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
        },
        isLogin(callback){
            if(document.cookie.indexOf("lighteshop_appkey")==-1){
                this.$vux.toast.text('请先登陆', 'middle')
                this.appOpenWeb({
                    is_need_login:"0",
                    SkipUIIdentifier: "pub_tologin",
                    view_type:"",
                    show_type_str:"",
                    url: "",
                    UIIdentifier:"",
                    name:"",
                    jsonInfo: "{\"outlink_style\":\"1\",\"outlink_check_fontcolor\":\"000000\",\"outlink_check_bgcolor\":\"FFFFFF\"}"
                },'jump_SkipUIIdentifier')
                // console.log('请先登陆')
            }else{
                callback()
            }
        },
        isAndroid(){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
            if(isAndroid){
                return true
            }else{
                return false
            }
        },
        isIOS(){
            var u = navigator.userAgent;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isIOS) {
                return true
            }else{
                return false
            }
        },
        isIPhoneX(){
            var u = navigator.userAgent;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isIOS) {
                if (screen.height == 812 && screen.width == 375){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        },
        goBack(){
            this.appOpenWeb({
                is_need_login:"0",
                SkipUIIdentifier: "pub_returnlastview",
                view_type:"",
                show_type_str:"",
                url: "",
                UIIdentifier:"",
                name:"",
                jsonInfo: "{\"outlink_style\":\"1\",\"outlink_check_fontcolor\":\"000000\",\"outlink_check_bgcolor\":\"FFFFFF\"}"
            },'jump_SkipUIIdentifier')
        },
        goLogin(){
            this.appOpenWeb({
                is_need_login:"0",
                SkipUIIdentifier: "pub_tologin",
                view_type:"",
                show_type_str:"",
                url: "",
                UIIdentifier:"",
                name:"",
                jsonInfo: "{\"outlink_style\":\"1\",\"outlink_check_fontcolor\":\"000000\",\"outlink_check_bgcolor\":\"FFFFFF\"}"
            },'jump_SkipUIIdentifier')
        },
        copyStr(str){
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
            this.$vux.toast.text('口令已复制', 'middle')
        },
        brightenKeyword(val, keyword,color) {
            val = val + '';
            if (val.indexOf(keyword) !== -1 && keyword !== '') {
                return val.replace(keyword, `<font color="#${color}">` + keyword + '</font>')
            } else {
                return val
            }
        },
        copyStrFree(str,toastStr){
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
            this.$vux.toast.text(toastStr, 'middle')
        },


    }
}
export default mixins;
