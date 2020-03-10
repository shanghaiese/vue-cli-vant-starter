<template>
    <div class="box">
        <div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item class="pic">
                    <!--v-for="item in items"-->
                    <div>
                        <img :src="require('../../../../src/assets/imgs/house/houseBanner2.png')" alt />
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="top">
<!--                    <div class="menu">综合</div>-->
<!--                    <div class="menu">价格</div>-->
            <div class="menu">
                <div class="left">
                    安家宝
                </div>
            </div>
            <div class="right" @click="toPopup">
                <span class="filter">
                     <img width="18" style="margin-top: -3px;"  :src="require('../../../../src/assets/imgs/house/filter.png')" alt />
                </span>筛选</div>
        </div>
        <div class="productList" style="height:90vh;overflow-y: auto;">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false"
                         :bottom-all-loaded="allLoaded"
                         :bottom-pull-text="`上拉加载更多`"
                         ref="loadmore">
                <div>
                    <ul>
                        <li v-for="item in contentList" @click="goToHouseDetail(item)">
                            <div>
                                <div v-if="item.url && item.url.length>0">
                                    <div class="list-card">
                                        <mt-swipe :auto="4000">
                                            <mt-swipe-item class="list-pic" v-for="(objUrl,index) in item.url" :key="index">
                                                <div>
                                                    <img :src="objUrl.url" width="160" height="100" alt />
                                                </div>
                                            </mt-swipe-item>
                                        </mt-swipe>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="list-card">
                                        <div class="list-pic">
                                             <img height="180" :src="require('../../../../src/assets/imgs/house/houseDefault.png')" alt />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <p class="p1">{{item.projectName | projectNameLength}}</p>
                                <p class="p2">{{item.developers}}</p>
                                <p class="p2">{{item.propertyCompany}}</p>
                            </div>
    <!--                        <p class="p2">{{item.price?item.price:'0-3万元'}}</p>-->
    <!--                        <p class="p2">{{item.address}}</p>-->
                            <!-- <p class="p3">￥{{item.price?item.price:'&#45;&#45;'}}</p>-->
                        </li>
                    </ul>
                </div>
            </mt-loadmore>
        </div>

        <div v-show="showEmpty" class="empty-data">
            <div>
                <span>
                    <img class="logo-img" width="42" height="42" :src="require('../../../../src/assets/imgs/nodata.png')">
                </span>
            </div>
            <div class="empty-text">
                <span>页面暂无内容</span>
            </div>
        </div>
        <!-- 弹窗 -->
        <mt-popup
                v-model="showHouse"
                position="right"
                :style="{ width: '85%', height: '100%' }">
            <div class="popup">
                <div>
                    <div>
                        <p class="title">项目名称:</p>
                        <div class="btn">
                            <input type="text" class="input" v-model="projectName" placeholder="请输入项目名称">
                        </div>
                    </div>
                    <div>
                        <p class="title">业态:</p>
                        <div class="areaList" style="margin-bottom: 24px">
                            <div class="categoryTag" v-for="item in houseCategoryList" @click="chooseHouseCategory($event,item)">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="title">所在城市:</p>
                        <div>
                            <span class="check-item-city">{{activeCity}}</span>
                            <span>
                                <span class="check-item-text" @click="open">
                                  {{openActive?'收起':'切换城市'}}
                                </span>
                            </span>
                        </div>
                        <div class="areaList flow-search" style="margin-bottom: 24px">
                            <div class="all-item item-border " v-if="openActive">
                                 <li class="check-item"
                                       v-for="item in areaData"
                                       :class="{'active-item':province===item.label}"
                                       :key="item.value"
                                       @click="activeProvince(item)">
                                    {{item.label}}
                                 </li>
                            </div>
                            <div class="all-item item-border" v-if="openActive && province && cityList.length">
                                <li class="check-item"
                                      v-for="(city,key) in cityList"
                                      :key="key"
                                      @click="active(city)">
                                    {{city.label}}
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <div class="reset" @click="resetKanyangFilter()">重置</div>
                    <div class="enter" @click="searchHouseFilter()">确定</div>
                </div>
            </div>
        </mt-popup>
<!--        <div class="scrollTop" @click="backtop" v-show="isTop">-->
<!--            <img width="15" style="margin-bottom: -1px" :src="require('../../../../src/assets/imgs/house/toTop.png')" alt/>-->
<!--        </div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {appConst} from "../../../global/appConst";
    import json from '../../../global/area.json';

    export default {
        data() {
            return {
                showQuanyi: false,
                showXieyi: false,
                isTop: false,
                province:'',
                areaData: json,
                activeName: 'first',
                activeCity: '全部',
                openActive: false,
                cityList: [],
                scrollMode: 'auto',
                allLoaded: false,
                pageParam : {
                    page: 0,     //当前页
                    rows: 10,    //每页数据条数
                    totalPage: 1,    //总页数
                    records: 0      //总条数
                },
                projectName: '',
                city:'',
                propertyType:'',
                showHouse: false,
                showParking: false,
                showShop: false,
                showBuilding: false,
                showEmpty: false,
                items: [{}],
                houseFilterPriceListMin: null,
                houseFilterPriceListMax: null,
                houseFilterCompanyList:
                    [
                        {
                            companyName:'绿地',
                            value: 'ldky'
                        },
                        {
                            companyName:'万怡',
                            value: 'wy'
                        }
                    ],
                houseFilterAreaList:
                    [],
                houseCategoryList: [
                    {
                        name:'住宅',
                        value:'住宅',
                        key: 0
                    },
                    {
                        name:'商业',
                        value:'商业',
                        key: 1
                    },
                    {
                        name:'办公',
                        value:'办公',
                        key: 2
                    },
                ],
                houseCompanyArr:[],
                houseAreaArr:[],
                proType: 'APARTMENT',
                spuType: 'BUILDING',
                nowIndex: 0,
                selectedType:'house', //all kangyang parking building shop
                tabList: [
                    {
                        title: '康养公寓',
                        isSelected: true,
                        proType: 'APARTMENT',
                        spuType: 'BUILDING'
                    }],
                bannerArr: [],
                contentList: [],
                bannerlist:[],
            };
        },
        mounted() {
            this.searchProject()
            this.getCityList()
            window.addEventListener("scroll",this.showbtn,true);
        },

        destroyed () {
            window.removeEventListener('scroll', this.showbtn)
        },
        computed: {},
        created() {},
        methods: {
            // 显示回到顶部按钮
            showbtn(){
                let that = this;
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                that.scrollTop = scrollTop
                if(that.scrollTop > 10){
                    this.isTop = true
                }else{
                    this.isTop = false
                }
            },
            backtop(){
                var timer = setInterval(function(){
                    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                    let ispeed = Math.floor(-osTop / 5);
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                    this.isTop = true;
                    if(osTop === 0){
                        clearInterval(timer);
                    }
                },30)
            },
            loadTop() {
                // this.erpCustomerListFn('top')
                this.pageParam.page = 0
                this.contentList = []
                this.queryList('top');
            },
            loadBottom() {
                // this.allLoaded = false;// if all data are loaded
                this.pageParam.page++
                this.queryList('bottom');
            },
            queryList(type){
                if (this.$refs.loadmore) {
                    if (type == 'top') {
                        this.getFirstData()
                        this.$refs.loadmore.onTopLoaded();
                    } else if (type == 'bottom') {
                        this.getBottomData()
                        this.$refs.loadmore.onBottomLoaded();
                    }
                }
            },
            toPopup () {
                this.showHouse = true;
            },
            open() {
                this.openActive = !this.openActive;
            },
            activeProvince(item) {
                this.province = item.label;
                this.cityList = item.children;
            },
            active(item) {
                this.activeCity = item.label;
                this.city = item.label;
                this.openActive = '';
                this.province = '';
                this.cityList = [];
            },
            getCityList () {
                // this.houseFilterAreaList = []
                // let url = `/ld/lh/cities`
                // let params = {
                // }
                // this.$apiGet(url).then((response) => {
                //     if (response.data.status === this.$appConst.status) {
                //         response.data.data.forEach((item,index) =>{
                //             let obj = {
                //                 name:'',
                //                 value: '',
                //                 key: 0
                //             }
                //             obj.name = item
                //             obj.value = item
                //             obj.key = index
                //             this.houseFilterAreaList.push(obj)
                //         })
                //     }
                // }).catch(() => {
                // })
                // this.$Http.get('./area.json').then(res => {
                //     this.areaData = res.data;
                // });
            },
            searchProject () {
                // let url = `/ld/spu/front/${proType}/${spuType}/list`
                let url = `/ld/lh/projects?page=0&size=10&sort=lastUpdateTime&city=`
                let params = {
                }
                this.contentList = []
                this.$apiGet(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        for(let i of response.data.data.content){
                            this.contentList.push(i)
                        }
                        this.contentList.map(item => {
                            if (item.attachments && item.attachments.length) {
                                let itemAttachmentsthis = appConst.handleGetHouseListImgUrl(item.attachments)
                                item.url = itemAttachmentsthis
                            }else{
                                item.url = []
                            }
                        })

                        this.pageParam.totalPage = response.data.data.totalPages
                        this.pageParam.page = response.data.data.number     //当前页
                        this.pageParam.records = response.data.data.totalElements

                        this.allLoaded = false
                    }
                }).catch(() => {
                })
            },
            getFirstData () {
                // let url = `/ld/spu/front/${proType}/${spuType}/list`
                let url = `/ld/lh/projects?page=0&size=10&sort=lastUpdateTime&city=${this.city}&propertyType=${this.propertyType}&projectName=${this.projectName}`
                let params = {
                }

                this.$apiGet(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        this.contentList = response.data.data.content
                        this.contentList.map(item => {
                            if (item.attachments && item.attachments.length) {
                                let itemAttachmentsthis = appConst.handleGetHouseListImgUrl(item.attachments)
                                item.url = itemAttachmentsthis
                            }else{
                                item.url = []
                            }
                            this.pageParam.totalPage = response.data.data.totalPages
                            this.pageParam.page = response.data.data.number     //当前页
                            this.pageParam.records = response.data.data.totalElements

                            this.allLoaded = false

                        })
                    }
                }).catch(() => {
                })
            },
            getBottomData () {
                // let url = `/ld/spu/front/${proType}/${spuType}/list`
                let url = `/ld/lh/projects?page=${this.pageParam.page}&size=10&sort=lastUpdateTime&city=${this.city}&propertyType=${this.propertyType}&projectName=${this.projectName}`
                let params = {
                }

                this.$apiGet(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        for (var i = 0; i < response.data.data.content.length; i++) {
                            this.contentList.push(response.data.data.content[i])
                        }
                        this.contentList.map(item => {
                            if (item.attachments && item.attachments.length) {
                                let itemAttachmentsthis = appConst.handleGetHouseListImgUrl(item.attachments)
                                item.url = itemAttachmentsthis
                            }else{
                                item.url = []
                            }
                            this.pageParam.totalPage = response.data.data.totalPages
                            this.pageParam.page = response.data.data.number     //当前页
                            this.pageParam.rows = response.data.data.size
                        })

                        if (this.pageParam.page == response.data.data.totalElements) {
                            this.allLoaded = true
                        } else {
                            this.scrollMode = 'touch'
                            if (this.allLoaded) {
                                this.allLoaded = false
                            }
                        }
                    }
                }).catch(() => {
                })
            },
            searchFilter () {
                // let url = `/ld/spu/front/${proType}/${spuType}/list`
                let url = `/ld/lh/projects?page=0&size=10&sort=lastUpdateTime&city=${this.city}&propertyType=${this.propertyType}&projectName=${this.projectName}`
                let params = {
                }

                this.$apiGet(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        this.contentList = response.data.data.content
                        this.contentList.map(item => {
                            if (item.attachments && item.attachments.length) {
                                let itemAttachmentsthis = appConst.handleGetHouseListImgUrl(item.attachments)
                                item.url = itemAttachmentsthis
                            }else{
                                item.url = []
                            }
                            this.pageParam.totalPage = response.data.data.totalPages
                            this.pageParam.page = response.data.data.number     //当前页
                            this.pageParam.records = response.data.data.totalElements

                            if (this.pageParam.page == response.data.data.totalElements) {
                                this.allLoaded = true
                            } else {
                                this.scrollMode = 'touch'
                                if (this.allLoaded) {
                                    this.allLoaded = false
                                }
                            }

                        })
                    }
                }).catch(() => {
                })
            },
            //筛选
            chooseHouseCompany (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.houseCompanyArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.houseCompanyArr.length; i++) {
                        if (this.houseCompanyArr[i] === item.value) {
                            this.houseCompanyArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseHouseArea (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    var allSelectedElements = document.getElementsByClassName("area selected");
                    for(var i = 0; i < allSelectedElements.length;i++){
                        allSelectedElements[i].className = 'area'
                        i--
                    }
                    e.target.className = 'area selected'; // 选中
                    this.houseAreaArr.push(item.value)
                    this.city = item.value
                } else {
                    e.target.className = 'area'// 反选
                    // for (var i = 0; i < this.houseAreaArr.length; i++) {
                    //     if (this.houseAreaArr[i] === item.value) {
                    //         this.houseAreaArr.splice(i, 1);
                    //         break
                    //     }
                    // }
                    this.houseAreaArr = []
                    this.city = ''
                }
            },
            chooseHouseCategory (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    var allSelectedcategoryTagElements = document.getElementsByClassName("categoryTag selected");
                    for(var i = 0; i < allSelectedcategoryTagElements.length;i++){
                        allSelectedcategoryTagElements[i].className = 'categoryTag'
                        i--
                    }
                    e.target.className = 'categoryTag selected'; // 选中
                    this.houseCompanyArr.push(item.value)
                    this.propertyType = item.value
                } else {
                    e.target.className = 'categoryTag'// 反选
                    // for (var i = 0; i < this.houseAreaArr.length; i++) {
                    //     if (this.houseAreaArr[i] === item.value) {
                    //         this.houseAreaArr.splice(i, 1);
                    //         break
                    //     }
                    // }
                    this.houseCompanyArr = []
                    this.propertyType = ''
                }
            },
            //重置
            resetKanyangFilter () {
                var allSelectedElements = document.getElementsByClassName("area selected");
                var allSelectedcategoryTagElements = document.getElementsByClassName("categoryTag selected");
                for(var i = 0; i < allSelectedElements.length;i++){
                    allSelectedElements[i].className = 'area'
                    i--
                }
                for(var l = 0; l < allSelectedcategoryTagElements.length;l++){
                    allSelectedcategoryTagElements[i].className = 'categoryTag'
                    l--
                }
                this.houseCompanyArr = [];
                this.houseAreaArr = [];
                this.city = ''
                this.propertyType = ''
                this.projectName = ''
                this.openActive = false;
                this.province = '';
                this.activeCity = '全部';
                this.cityList = [];
            },
            searchHouseFilter () {
                this.showHouse = false;
                this.searchFilter()
            },
            //跳转详情页
            goToHouseDetail (item) {
                if (sessionStorage.getItem('yjgf_access_token') === '' || !sessionStorage.getItem('yjgf_access_token')) return this.$global.errMsg('您还未登录，请先登录!')
                this.$router.push(`/houseConfirmTransaction?projectId=${item.projectId}&id=${item.id}&projectName=${item.projectName}&developers=${item.developers}&propertyCompany=${item.propertyCompany}&price=${item.priceRange}&address=${item.address}&phone=${item.saleContact}&seller=${item.seller}&picUrl=${item.url[0]?item.url[0].url:''}`)
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
