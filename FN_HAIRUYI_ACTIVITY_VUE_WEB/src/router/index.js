import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/View/Home'
// import Home from '@/View/Home1'
import Demo from '@/View/Demo'
import SpecialShop from '@/View/SpecialShop'
import SpecialShopMore from '@/View/SpecialShopMore'
import SpecialShopOrder from '@/View/SpecialShopOrder'
import SpecialShopOrderDetail from '@/View/SpecialShopOrderDetail'
import RedPacketActivity618 from '@/View/RedPacketActivity618'
import LaXin from '@/View/LaXin'
import LaXinMyTeam from '@/View/LaXinMyTeam'
import SpecialShop618 from '@/View/SpecialShop618'
import SpecialShop618Search from '@/View/SpecialShop618Search'
import SpecialShop618HistorySearch from '@/View/SpecialShop618HistorySearch'
import BankGetACard from '@/View/BankGetACard'
import CommercialCollegeArticleDetail from '@/View/CommercialCollegeArticleDetail'
import HuiLife from "@/View/HuiLife";
import ShareUpdate from "../View/ShareUpdate";
import ShareCenter from "../View/ShareCenter";
import Renew from "../View/Renew";
import LaxinRule from "../View/LaxinRule";
import LaxinRuleIndex from "../View/LaxinRuleIndex";
import MyInvite from "../View/MyInvite";
import Waimai from "../View/Waimai";
import PreSellActivity from "../View/PreSellActivity";
import PreSellShare from "../View/PreSellShare";
import PreSellWay from "../View/PreSellWay";
import DoubleActivity from "../View/DoubleActivity";
import TaobaoAndJd from "../View/TaobaoAndJd";
// import DoubleTwelve from "../View/DoubleTwelve";
// import AITestRecord from "../View/AITestRecord";
// import AITest from "../View/AITest";
// import AITestCourse from "../View/AITestCourse";
// import AITestAnswer from "../View/AITestAnswer";
// import AITestReport from "../View/AITestReport";
// import JiaYouIndex from "../View/JiaYouIndex";
// import JiaYouDetail from "../View/JiaYouDetail";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/SpecialShop/:token/:show_type_str',
      name: 'SpecialShop',
      component: SpecialShop
    },
    {
      path: '/SpecialShopMore/:token/:show_type_str',
      name: 'SpecialShopMore',
      component: SpecialShopMore
    },
    {
      path: '/SpecialShopOrder',
      name: 'SpecialShopOrder',
      component: SpecialShopOrder
    },
    {
      path: '/SpecialShopOrderDetail/:id',
      name: 'SpecialShopOrderDetail',
      component: SpecialShopOrderDetail
    },
    {
      path: '/RedPacketActivity618',
      name: 'RedPacketActivity618',
      component: RedPacketActivity618
    },
    {
      path: '/LaXin',
      name: 'LaXin',
      component: LaXin
    },
    {
      path: '/LaXinMyTeam',
      name: 'LaXinMyTeam',
      component: LaXinMyTeam
    },
    {
      path: '/SpecialShop618/:show_type_str',
      name: 'SpecialShop618',
      component: SpecialShop618
    },
    {
      path: '/SpecialShop618Search/:show_type_str',
      name: 'SpecialShop618Search',
      component: SpecialShop618Search
    },
    {
      path: '/SpecialShop618HistorySearch/:show_type_str',
      name: 'SpecialShop618HistorySearch',
      component: SpecialShop618HistorySearch
    },
    {
      path: '/BankGetACard/:id/:shareid',
      name: 'BankGetACard',
      component: BankGetACard
    },
    {
      path: '/CommercialCollegeArticleDetail/:id',
      name: 'CommercialCollegeArticleDetail',
      component: CommercialCollegeArticleDetail
    },
    {
      path: '/HuiLife',
      name: 'Huilife',
      component: HuiLife
    },
    {
      path: '/ShareUpdate/:version/:platform/:is_toweixin',
      name: 'ShareUpdate',
      component: ShareUpdate
    },
    {
      path: '/ShareCenter/:version/:platform/:is_toweixin',
      name: 'ShareCenter',
      component: ShareCenter
    },
    {
      path: '/Renew/:version/:platform/:is_toweixin',
      name: 'Renew',
      component: Renew
    },
    {
      path: '/LaxinRuleIndex',
      name: 'LaxinRuleIndex',
      component: LaxinRuleIndex
    },
    {
      path: '/LaxinRule',
      name: 'LaxinRule',
      component: LaxinRule
    },
    {
      path: '/MyInvite',
      name: 'MyInvite',
      component: MyInvite
    },
    {
      path: '/Waimai/:platform',
      name: 'Waimai',
      component: Waimai
    },
    {
      path: '/DoubleActivity/:SkipUIIdentifier/:show_type_str/:platform',
      name: 'DoubleActivity',
      component: DoubleActivity
    },
    {
      path: '/PreSellWay/:SkipUIIdentifier/:show_type_str/:platform',
      name: 'PreSellWay',
      component: PreSellWay
    },
    {
      path: '/PreSellActivity/:SkipUIIdentifier/:show_type_str/:platform',
      name: 'PreSellActivity',
      component: PreSellActivity
    },
    {
      path: '/PreSellShare/:SkipUIIdentifier/:show_type_str/:platform',
      name: 'PreSellShare',
      component: PreSellShare
    },
    {
      path: '/TaobaoAndJd/:platform/:show_type_str/:version',
      name: 'TaobaoAndJd',
      component: TaobaoAndJd
    },
    {
      path: '/DoubleTwelve/:SkipUIIdentifier/:show_type_str/:platform',
      name: 'DoubleTwelve',
      component: resolve => require(['@/View/DoubleTwelve'],resolve)
    },

    {
      path: '/JiaYouIndex/:lat/:lng',
      name: 'JiaYouIndex',
      component: resolve => require(['@/View/JiaYouIndex'],resolve),
      meta: {
        keepAlive: true, // 此组件需要被缓存
      }
    },
    {
      path: '/JiaYouDetail',
      name: 'JiaYouDetail',
      component: resolve => require(['@/View/JiaYouDetail'],resolve)
    },
    {
      path: '/JiaYouOrder',
      name: 'JiaYouOrder',
      component: resolve => require(['@/View/JiaYouOrder'],resolve)
    },
    {
      path: '/JiaYouMyOrder',
      name: 'JiaYouMyOrder',
      component: resolve => require(['@/View/JiaYouMyOrder'],resolve)
    },
    {
      path: '/JiaYouHelp',
      name: 'JiaYouHelp',
      component: resolve => require(['@/View/JiaYouHelp'],resolve)
    },
    {
      path: '/KouBei/:platform',
      name: 'KouBei',
      component: resolve => require(['@/View/KouBei'],resolve)
    },

    {
      path: '/AddWechat',
      name: 'AddWechat',
      component: resolve => require(['@/View/AddWechat'],resolve)
    },
    {
      path: '/AITestRecord',
      name: 'AITestRecord',
      component: resolve => require(['@/View/AITestRecord'],resolve)
    },
    {
      path: '/AITest',
      name: 'AITest',
      component: resolve => require(['@/View/AITest'],resolve)
    },
    {
      path: '/AITestCourse',
      name: 'AITestCourse',
      component: resolve => require(['@/View/AITestCourse'],resolve)
    },
    {
      path: '/AITestAnswer',
      name: 'AITestAnswer',
      component: resolve => require(['@/View/AITestAnswer'],resolve)
    },
    {
      path: '/AITestReport',
      name: 'AITestReport',
      component: resolve => require(['@/View/AITestReport'],resolve)
    },
  ]
})
