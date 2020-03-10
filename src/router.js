import Vue from 'vue'
import Router from 'vue-router'
import "../src/assets/css/_main.less";

const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')
const Login = () => import(/* webpackChunkName: "login" */ './views/pages/auth/login.vue')
const Register = () => import(/* webpackChunkName: "register" */ './views/pages/auth/register.vue')
// const CompanyRegister = () => import(/* webpackChunkName: "companyRegister" */ './views/auth/companyRegister.vue')
const ForgetPassword = () => import(/* webpackChunkName: "forgetPassword" */ './views/pages/auth/forgetPassword.vue')
const ResetPassword = () => import(/* webpackChunkName: "resetPassword" */ './views/pages/auth/resetPassword.vue')
// const SetConfirmPassword = () => import(/* webpackChunkName: "setConfirmPassword" */ './views/auth/setConfirmPassword.vue')

//底部tab bottom tab
//我的
const Mime = () => import(/* webpackChunkName: "mime" */ './views/pages/mime/mime.vue')
//首页
const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue')
//荟萃模块
const Huicui = () => import(/* webpackChunkName: "huicui" */ './views/pages/huicui/huicuiList.vue')
const HuicuiDetail = () => import(/* webpackChunkName: "huicui" */ './views/pages/huicui/huicuiDetail.vue')
//介绍权易宝
const Introduce = () => import(/* webpackChunkName: "introduce" */ './views/pages/mime/introduce.vue')
//广告
const Ad = () => import(/* webpackChunkName: "ad" */ './views/pages/mime/ad.vue')
//联系我们
const Contact = () => import(/* webpackChunkName: "contact" */ './views/pages/mime/contact.vue')

//我的设置模块
const AppSetting = () => import(/* webpackChunkName: "appSetting" */ './views/pages/mime/appSetting.vue')
const AboutUs = () => import(/* webpackChunkName: "aboutUs" */ './views/pages/mime/aboutUs.vue')
const AboutQYB = () => import(/* webpackChunkName: "aboutQYB" */ './views/pages/mime/aboutQYB.vue')
const UserInfo = () => import(/* webpackChunkName: "aboutQYB" */ './views/pages/mime/userInfo.vue')

//订单列表和订单详情
const PurchaseList = () => import(/* webpackChunkName: "purchaseList" */ './views/pages/mime/purchaseList.vue')
const PurchaseDetail = () => import(/* webpackChunkName: "purchaseList" */ './views/pages/mime/purchaseDetail.vue')
const HousePurchaseList = () => import(/* webpackChunkName: "housePurchaseList" */ './views/pages/mime/housePurchaseList.vue')
const HousePurchaseDetail = () => import(/* webpackChunkName: "housePurchaseList" */ './views/pages/mime/housePurchaseDetail.vue')
const TransHousePurchaseList = () => import(/* webpackChunkName: "transHousePurchaseList" */ './views/pages/mime/transHousePurchaseList.vue')

//企业/个人资料与认证 auth of person/company
const PersonalAuthentication = () => import(/* webpackChunkName: "personalAuthentication" */ './views/pages/auth/personalAuthentication.vue')
const CompanyAuthentication = () => import(/* webpackChunkName: "companyAuthentication" */ './views/pages/auth/companyAuthentication.vue')
const VerifiedUseWarrantSuccess = () => import(/* webpackChunkName: "verifiedUseWarrantSuccess" */ './views/pages/auth/verifiedUseWarrantSuccess.vue')
const VerifiedUseWarrantFail = () => import(/* webpackChunkName: "verifiedUseWarrantFail" */ './views/pages/auth/verifiedUseWarrantFail.vue')
const VerifiedUseWarrantOutOfDate = () => import(/* webpackChunkName: "verifiedUseWarrantOutOfDate" */ './views/pages/auth/verifiedUseWarrantOutOfDate.vue')
// const authentication = () => import(/* webpackChunkName: "authentication" */ './views/mime/personalAuthentication.vue')

//具体项目列表 project list
const KangyangProjectList = () => import(/* webpackChunkName: "kangyangProjectList" */ './views/pages/project/kangyangProjectList.vue')
const ParkingProjectList = () => import(/* webpackChunkName: "parkingProjectList" */ './views/pages/project/parkingProjectList.vue')
const BuildingProjectList = () => import(/* webpackChunkName: "buildingProjectList" */ './views/pages/project/buildingProjectList.vue')
const ShopProjectList = () => import(/* webpackChunkName: "shopProjectList" */ './views/pages/project/shopProjectList.vue')
const HouseProjectList = () => import(/* webpackChunkName: "houseProjectList" */ './views/pages/project/houseProjectList.vue')
const AnjiabaoProjectList = () => import(/* webpackChunkName: "anjiabaoProjectList" */ './views/pages/project/anjiabaoProjectList.vue')

//项目详情 project detail 与项目下单
const KangyangProjectDetail = () => import(/* webpackChunkName: "kangyangProjectDetail" */ './views/pages/detail/kangyangProjectDetail.vue')
const ParkingProjectDetail = () => import(/* webpackChunkName: "parkingProjectDetail" */ './views/pages/detail/parkingProjectDetail.vue')
const BuildingProjectDetail = () => import(/* webpackChunkName: "buildingProjectDetail" */ './views/pages/detail/buildingProjectDetail.vue')
const ShopProjectDetail = () => import(/* webpackChunkName: "shopProjectDetail" */ './views/pages/detail/shopProjectDetail.vue')
const HouseProjectDetail = () => import(/* webpackChunkName: "houseProjectDetail" */ './views/pages/detail/houseProjectDetail.vue')
const AnjiabaoProjectDetail = () => import(/* webpackChunkName: "anjiabaoProjectDetail" */ './views/pages/detail/anjiabaoProjectDetail.vue')

const KangyangProjectConfirm = () => import(/* webpackChunkName: "kangyangProjectDetail" */ './views/pages/confirm/kangyangProjectConfirm.vue')
const ParkingProjectConfirm = () => import(/* webpackChunkName: "parkingProjectDetail" */ './views/pages/confirm/parkingProjectConfirm.vue')
const BuildingProjectConfirm = () => import(/* webpackChunkName: "buildingProjectDetail" */ './views/pages/confirm/buildingProjectConfirm.vue')
const ShopProjectConfirm = () => import(/* webpackChunkName: "shopProjectDetail" */ './views/pages/confirm/shopProjectConfirm.vue')
const HouseProjectConfirm = () => import(/* webpackChunkName: "houseProjectDetail" */ './views/pages/confirm/houseProjectConfirm.vue')
const AnjiabaoProjectConfirm = () => import(/* webpackChunkName: "anjiabaoProjectDetail" */ './views/pages/confirm/anjiabaoProjectConfirm.vue')

//定位搜索
const SearchList = () => import(/* webpackChunkName: "anjiabaoProjectConfirm" */ './views/pages/search/searchList.vue')
const SearchDetail = () => import(/* webpackChunkName: "anjiabaoProjectConfirm" */ './views/pages/search/searchDetail.vue')



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首页',
        icon: 'el-icon-setting',
        keepAlive: true
      },
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '首页',
        icon: 'el-icon-setting',
        keepAlive: true
      },
      component: About
    },
    {
      path: '/mine',
      name: 'mine',
      meta: {
        title: '我的',
        icon: 'el-icon-office-building',
        keepAlive: true
      },
      component: Mime
    },
    {
      path: '/appSetting',
      name: 'appSetting',
      meta: {
        title: '我的设置',
        icon: 'el-icon-office-building',
        keepAlive: true
      },
      component: () => AppSetting
    },
    {
      path: '/introduce',
      name: 'introduce',
      meta: {
        title: '介绍',
        icon: 'el-icon-office-building',
        keepAlive: true
      },
      component: () => Introduce
    },
    {
      path: '/ad',
      name: 'ad',
      meta: {
        title: '广告',
        icon: 'el-icon-office-building',
        keepAlive: true
      },
      component: () => Ad
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        keepAlive:false
      },
      component: () => Login
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册',
        keepAlive:false
      },
      component: () => Register
    },
    {
      path: '/forgetPassWord',
      name: 'forgetPassWord',
      meta: {
        title: '重置密码',
        keepAlive:false
      },
      component: () => ForgetPassword
    },
    {
      path: '/resetPasswordSuccess',
      name: 'resetPasswordSuccess',
      meta: {
        title: '找回密码',
        keepAlive:false
      },
      component: () => ResetPassword
    },
    {
      path: '/purchaseList',
      name: 'purchaseList',
      meta: {
        title: '订单',
        keepAlive: true
      },
      component: () => PurchaseList
    },
    {
      path: '/housePurchaseList',
      name: 'housePurchaseList',
      meta: {
        title: '预售订单',
        keepAlive: true
      },
      component: () => HousePurchaseList
    },
    {
      path: '/transHousePurchaseList',
      name: 'transHousePurchaseList',
      meta: {
        title: '预售订单',
        keepAlive: true
      },
      component: () => TransHousePurchaseList
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      meta: {
        title: '关于我们',
        keepAlive: true
      },
      component: () => AboutUs
   },
    {
      path: '/aboutQYB',
      name: 'aboutQYB',
      meta: {
        title: '关于权易宝',
        keepAlive: true
      },
      component: () => AboutQYB
    },
    {
      path: '/housePurchaseDetail',
      name: 'housePurchaseDetail',
      meta: {
        title: '订单详情',
        keepAlive: true
      },
      component: () => HousePurchaseDetail
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      meta: {
        title: '账号资料',
        keepAlive:false
      },
      component: () => UserInfo
    },
    {
      path: '/personalAuthentication',
      name: 'personalAuthentication',
      meta: {
        title: '个人认证',
        keepAlive:false
      },
      component: () => PersonalAuthentication
    },
    {
      path: '/companyAuthentication',
      name: 'companyAuthentication',
      meta: {
        title: '企业认证',
        keepAlive:false
      },
      component: () => CompanyAuthentication
    },
    {
      path: '/authSuccess',
      name: 'authSuccess',
      meta: {
        title: '个人认证',
        keepAlive:false
      },
      component: () => VerifiedUseWarrantSuccess
    },
    {
      path: '/authFail',
      name: 'authFail',
      meta: {
        title: '个人认证',
        keepAlive:false
      },
      component: () => VerifiedUseWarrantFail
    },
    {
      path: '/authOut',
      name: 'authOut',
      meta: {
        title: '个人认证',
        keepAlive:false
      },
      component: () => VerifiedUseWarrantOutOfDate
    },
    {
      path: '/shopConfirmTransaction',
      name: 'shopConfirmTransaction',
      meta: {
        title: '确定订单',
        keepAlive: true
      },
      component: () => ShopProjectConfirm
    },
    {
      path: '/kangyangConfirmTransaction',
      name: 'kangyangConfirmTransaction',
      meta: {
        title: '确定订单',
        keepAlive: true
      },
      component: () => KangyangProjectConfirm
    },
    {
      path: '/houseConfirmTransaction',
      name: 'houseConfirmTransaction',
      meta: {
        title: '确定订单',
        keepAlive: true
      },
      component: () => HouseProjectConfirm
    },
    {
      path: '/parkingConfirmTransaction',
      name: 'parkingConfirmTransaction',
      meta: {
        title: '确定订单',
        keepAlive: true
      },
      component: () => ParkingProjectConfirm
    },
    {
      path: '/buildingConfirmTransaction',
      name: 'buildingConfirmTransaction',
      meta: {
        title: '确定订单',
        keepAlive: true
      },
      component: () => BuildingProjectConfirm
    },
    {
      path: '/anjiabaoConfirmTransaction',
      name: 'anjiabaoConfirmTransaction',
      meta: {
        title: '确定订单',
        keepAlive: true
      },
      component: () => AnjiabaoProjectConfirm
    },
    {
      path: '/searchDetail',
      name: 'searchDetail',
      meta: {
        title: '搜索',
        keepAlive:false
      },
      component: () => SearchDetail
    },
    {
      path: '/searchList',
      name: 'searchList',
      meta: {
        title: '搜索',
        keepAlive:false
      },
      component: () => SearchList
    },
    {
      path: '/huicuiList',
      name: 'huicuiList',
      meta: {
        title: '慧萃',
        keepAlive:false
      },
      component: () => Huicui
    },
    {
      path: '/huicuiDetail',
      name: 'huicuiDetail',
      meta: {
        title: '慧萃',
        keepAlive:false
      },
      component: () => HuicuiDetail
    },
    {
      path: '/contact',
      name: 'contact',
      meta: {
        title: '联系客服',
        keepAlive:false
      },
      component: () => Contact
    },
    {
      path: '/kangyangProjectList',
      name: 'kangyangProjectList',
      meta: {
        title: '康养',
        keepAlive:false
      },
      component: () => KangyangProjectList
    },
    {
      path: '/parkingProjectList',
      name: 'parkingProjectList',
      meta: {
        title: '车位',
        keepAlive:false
      },
      component: () => ParkingProjectList
    },
    {
      path: '/buildingProjectList',
      name: 'buildingProjectList',
      meta: {
        title: '公寓',
        keepAlive:false
      },
      component: () => BuildingProjectList
    },
    {
      path: '/shopProjectList',
      name: 'shopProjectList',
      meta: {
        title: '商业不动产',
        keepAlive:false
      },
      component: () => ShopProjectList
    },
    {
      path: '/houseProjectList',
      name: 'houseProjectList',
      meta: {
        title: '住宅',
        keepAlive:false
      },
      component: () => HouseProjectList
    },
    {
      path: '/anjiabaoProjectList',
      name: 'anjiabaoProjectList',
      meta: {
        title: '安家宝',
        keepAlive:false
      },
      component: () => AnjiabaoProjectList
    },
    {
      path: '/kangyangProjectDetail',
      name: 'kangyangProjectDetail',
      meta: {
        title: '康养详情',
        keepAlive:false
      },
      component: () => KangyangProjectDetail
    },
    {
      path: '/parkingProjectDetail',
      name: 'parkingProjectDetail',
      meta: {
        title: '车位详情',
        keepAlive:false
      },
      component: () => ParkingProjectDetail
    },
    {
      path: '/buildingProjectDetail',
      name: 'buildingProjectDetail',
      meta: {
        title: '公寓详情',
        keepAlive:false
      },
      component: () => BuildingProjectDetail
    },
    {
      path: '/shopProjectDetail',
      name: 'shopProjectDetail',
      meta: {
        title: '商业不动产详情',
        keepAlive:false
      },
      component: () => ShopProjectDetail
    },
    {
      path: '/houseProjectDetail',
      name: 'houseProjectDetail',
      meta: {
        title: '住宅详情',
        keepAlive:false
      },
      component: () => HouseProjectDetail
    },
    {
      path: '/anjiabaoProjectDetail',
      name: 'anjiabaoProjectDetail',
      meta: {
        title: '安家宝',
        keepAlive:false
      },
      component: () => AnjiabaoProjectDetail
    }
  ]
})
