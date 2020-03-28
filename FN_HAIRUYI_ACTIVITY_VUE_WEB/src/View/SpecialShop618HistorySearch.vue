<!--
 * @Description: In User Settings Edit
 * @Author: JKate
 * @Date: 2019-06-11 15:24:14
 * @LastEditTime: 2019-06-14 16:11:13
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="SpecialShop618HistorySearch"
    v-wechat-title="'搜索'">
        <scroller
        :style="{backgroundColor:'#FAFAFA'}"
        class="scroller"></scroller>
        <div class="search-box row">
            <form action="submit"
            @submit.prevent="search">
                <div class="search row">
                    <img src="../assets/search_icon_red.png" 
                    alt=""
                    class="search-icon">
                    <input type="text"
                    class="input"
                    :placeholder="indexData.search_str"
                    v-model="select.keyword">
                </div>
            </form>
            <img :src="indexData.btn_img" alt=""
            class="search_button"
            @click="search"
            v-if="indexData.btn_img!=''">
        </div>
        <div class="hot-search-box">
            <span class="hot-search-title">{{indexData.hot_str}}</span>
            <div class="hot-search-item-box row">
                <div class="hot-search-item col"
                v-for="(item,index) in indexData.cate"
                :key="index"
                @click="goSearch(item.name)">
                    <span class="hot-search-item-text"
                    :style="{color:item.highlight=='1'?'#'+item.high_color:'#'+item.color}"
                    >{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="history-search-box">
            <div class="history-search-text-box-1 row">
                <span class="hot-search-title">{{indexData.history_str}}</span>
                <div class="row"
                @click="clearHistory">
                    <img src="../assets/trash_icon.png" alt=""
                    class="trash_icon">
                    <span class="hot-search-clear"
                    >清除</span>
                </div>
            </div>
            <div class="hot-search-item-box row">
                <div class="hot-search-item col"
                v-for="(item,index) in historyItems"
                :key="index"
                @click="goSearch(item)">
                    <span class="hot-search-item-text"
                    :style="{color:'#666666'}"
                    >{{item}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                indexData:{
                    btn_img:''
                },
                historyItems:[],
                select:{
                    keyword:''
                }
            }
        },
        created(){
            if(localStorage.historyItems!==undefined){
                this.historyItems = localStorage.historyItems.split('|')
            }
            this.getIndex()
        },
        methods: {
            clearHistory(){
                let text = '是否要清空历史数据'
                this.$confirm(text, {
                    title: '', // 默认无标题
                    yes: {
                        text: '确定',
                        style: {}
                    },
                    no: {
                        text: '取消',
                        style: {}
                    }
                }).then(()=>{
                    localStorage.removeItem('historyItems'); 
                    this.historyItems = ''
                    this.$vux.toast.text('清除成功', 'middle')
                }).catch(()=>{
                })
            },
            search () {
                if(this.select.keyword==""){
                    this.$vux.toast.text('请输入关键字', 'middle')
                }else{
                    let keyword = this.select.keyword
                    keyword = keyword.trim();  
                    let { historyItems } = localStorage;  
                    if (historyItems === undefined) {  
                    localStorage.historyItems = keyword;  
                    } else {  
                    var onlyItem = historyItems.split('|').filter(e => e != keyword);  
                    if (onlyItem.length > 0) historyItems = keyword + '|' + onlyItem.join('|');  
                    localStorage.historyItems = historyItems;  
                    }  
                    let newarr = localStorage.historyItems.split('|')
                    this.historyItems = newarr
                    localStorage.searchKeyword = keyword
                    this.appOpenWeb({
                        is_need_login:"1",
                        SkipUIIdentifier: "pub_wailian",
                        show_type_str:"",
                        url: this.indexData.url,
                        jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                    },'jump_SkipUIIdentifier')
                }
            },
            goSearch(keyword){
                keyword = keyword.trim();  
                let { historyItems } = localStorage;  
                if (historyItems === undefined) {  
                    localStorage.historyItems = keyword;  
                } else {  
                    var onlyItem = historyItems.split('|').filter(e => e != keyword);  
                    if (onlyItem.length > 0) historyItems = keyword + '|' + onlyItem.join('|');  
                    localStorage.historyItems = historyItems;  
                }  
                let newarr = localStorage.historyItems.split('|')
                this.historyItems = newarr
                localStorage.searchKeyword = keyword
                this.appOpenWeb({
                    is_need_login:"1",
                    SkipUIIdentifier: "pub_wailian",
                    show_type_str:"",
                    url: this.indexData.url,
                    jsonInfo: `{"outlink_style":"0","outlink_check_fontcolor":"000000","outlink_check_bgcolor":"FFFFFF","outlink_pull_onoff":"0","outlink_navhide_onoff":"0","wl_type":"0","outlink_returnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_checkreturnimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkreturnimg.png","outlink_closeimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png","outlink_checkcloseimg":"http://www.hairuyi.com/View/index/img/appapi/comm/outlink_checkcloseimg.png"}`
                },'jump_SkipUIIdentifier')
            },
            getIndex(){
                this.GET('?mod=appapi&act=promotion_goods&ctrl=hot_search',{},(res)=>{
                    if(res.data.success==1){
                        // console.log(res.data)
                        this.indexData = res.data.data
                    }
                })
            }
        }
    }
</script>

<style scoped>
.scroller{
    z-index: -1;
}
.SpecialShop618HistorySearch{
    width: 100%;
    height: 100%;
    background-color: #FAFAFA;
}
.search-box{
    width: 100%;
    height: 108px;
    padding-left: 3.5%;
    padding-right: 3.5%;
    justify-content: space-between;
    padding-top: 25px;
    background-color: #fff;
}
.search{
    width:567px;
    height:58px;
    background:rgba(248,248,248,1);
    border-radius:29px;
}
.search-icon{
    width: 28px;
    height: 28px;
    margin-top: 15px;
    margin-left: 22px;
}
.input{
    width: 400px;
    height: 58px;
    font-size:28px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:#3c3c3c;
    line-height: 58px;
    background-color: inherit;
    border: none;
    outline: none;
    margin-left: 24px;
    caret-color: #CCCCCC;
}
.input::-webkit-input-placeholder{
    color: #CCCCCC;
}
.input:-moz-placeholder{
    color: #CCCCCC;
}
.input::-moz-placeholde{
    color: #CCCCCC;
}
.input:-ms-input-placeholder{
    color: #CCCCCC;
}
.search_button{
    width: 100px;
    height: 58px;
}
.hot-search-box{
    margin-top: 55px;
    padding-left: 25px;
    padding-right: 25px;
    width: 100%;
}
.hot-search-title{
    font-size:30px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:30px;
}
.hot-search-clear{
    font-size:24px;
    font-weight:400;
    color:#999999;
    line-height:30px;
}
.hot-search-item-box{
    width: 93.3%;
    flex-wrap: wrap
}
.hot-search-item{
    height:58px;
    background-color:#FFFFFF;
    border-radius:29px;
    margin-top: 30px;
    margin-right: 20px;
    padding-left: 35px;
    padding-right: 35px;
    align-items: center;
    justify-content: center
}
.hot-search-item-text{
    font-size:28px;
    font-weight:400;
    line-height:28px;
}

.history-search-box{
    margin-top: 70px;
    padding-left: 25px;
    padding-right: 25px;
    width: 100%;
}
.history-search-text-box-1{
    width: 100%;
    justify-content: space-between
}
.trash_icon{
    width: 24px;
    height: 24px;
    margin-right: 12px;
}
</style>