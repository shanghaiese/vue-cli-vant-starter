<template>
    <div class="box">
        <div class="top">
            <div class="tab-bar">
                <mt-tabbar v-model="selectedType">
                    <!--                        <mt-tab-item id="all">-->
                    <!--                            全部-->
                    <!--                        </mt-tab-item>-->
                    <mt-tab-item id="kangyang" >
                        <div @click="changeTabSearch(0)">
                            康养
                        </div>
                    </mt-tab-item>
                    <mt-tab-item id="parking" >
                        <div @click="changeTabSearch(1)">
                            车位
                        </div>
                    </mt-tab-item>
                    <mt-tab-item id="building" >
                        <div @click="changeTabSearch(2)">
                            公寓
                        </div>
                    </mt-tab-item>
                    <mt-tab-item id="shop" >
                        <div @click="changeTabSearch(3)">
                            商业
                        </div>
                    </mt-tab-item>
                </mt-tabbar>
            </div>
<!--            <div class="right" @click="toPopup">筛选</div>-->
        </div>
        <mt-tab-container v-model="selectedType" value="selectedType">
            <mt-tab-container-item id="kangyang">
                <div class="banner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="(item, index) in items" :key="index" class="pic">
                            <div>
                                <img :src="require('../../../../src/assets/imgs/banner.png')" alt />
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div class="productList">
                    <ul>
                        <li v-for="(item, index) in contentList" :key="index" @click="goToKangYangDetail(item)">
                            <div>
                               <span v-if="item.url && item.url != ''">
                                    <img width="160" height="160" :src="item.url" alt />
                                </span>
                                <span v-else>
                                    <img width="160" height="160" :src="require('../../../assets/imgs/kangyangList80.png')" alt />
                                </span>
                            </div>
                            <p class="p1">{{item.projectName | projectNameLength}}</p>
                            <p class="p2">{{item.projectAddress}}</p>
                            <p class="p2">{{item.structureArea}}㎡</p>
                            <!-- <p class="p3">￥{{item.price?item.price:'&#45;&#45;'}}</p>-->
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="parking">
                <div class="banner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="(item, index) in items" :key="index" class="pic">
                            <div>
                                <img :src="require('../../../../src/assets/imgs/parkingSwipe.jpg')" alt />
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div class="productList">
                    <ul>
                        <li v-for="(item, index) in contentList" :key="index" @click="goToParkingDetail(item)">
                            <div>
                                <span v-if="item.url && item.url != ''">
                                    <img width="160" height="160" :src="item.url" alt />
                                </span>
                                <span v-else>
                                    <img width="160" height="160" :src="require('../../../assets/imgs/parkingList.png')" alt />
                                </span>
                            </div>
                            <p class="p1">{{item.projectName | projectNameLength}}</p>
                            <p class="p2">{{item.projectAddress}}</p>
                            <!-- <p class="p3">￥{{item.price?item.price:'&#45;&#45;'}}  {{item.structureArea}}㎡</p>-->
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="building">
                <div class="banner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="(item, index) in items" :key="index" class="pic">
                            <div>
                                <img :src="require('../../../../src/assets/imgs/buildingSwipe.jpg')" alt />
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div class="productList">
                    <ul>
                        <li v-for="(item, index) in contentList" :key="index" @click="goToBuildingDetail(item)">
                            <div>
                                <span v-if="item.url && item.url != ''">
                                    <img width="160" height="160" :src="item.url" alt />
                                </span>
                                <span v-else>
                                    <img width="160" height="160" :src="require('../../../assets/imgs/apartmentList.png')" alt />
                                </span>
                            </div>
                            <p class="p1">{{item.projectName | projectNameLength}}</p>
                            <p class="p2">{{item.projectAddress}}</p>
                            <p class="p2">{{item.structureArea}}㎡</p>
                            <!-- <p class="p3">￥{{item.price?item.price:'&#45;&#45;'}}</p>-->
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="shop">
                <div class="banner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="(item, index) in items" :key="index" class="pic">
                            <div>
                                <img :src="require('../../../../src/assets/imgs/shopSwipe.jpg')" alt />
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div class="productList">
                    <ul>
                        <li v-for="item in contentList" @click="goToShopDetail(item)">
                            <div>
                               <span v-if="item.url && item.url != ''">
                                    <img width="160" height="160" :src="item.url" alt />
                                </span>
                                <span v-else>
                                    <img width="160" height="160" :src="require('../../../assets/imgs/shopList.png')" alt />
                                </span>
                            </div>
                            <p class="p1">{{item.projectName | projectNameLength}}</p>
                            <p class="p2">{{item.projectAddress}}</p>
<!--                            <p class="p2">{{item.structureArea}}㎡</p>-->
                            <!-- <p class="p3">￥{{item.price?item.price:'&#45;&#45;'}}</p>-->
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>

        <!-- 弹窗 -->
        <mt-popup
                v-model="showKangYang"
                position="right"
                :style="{ width: '85%', height: '100%' }">
            <div class="popup">
                <div>
                    <p class="title">康养价格区间</p>
                    <div class="btn">
                        <input type="number" class="input" v-model="kangyangFilterPriceListMin" placeholder="最低价（万元）">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <input type="number" class="input" v-model="kangyangFilterPriceListMax" placeholder="最高价（万元）">
                    </div>
                </div>
                <div>
                    <p class="title">企业名称</p>
                    <div style="margin-bottom: 24px">
                        <span class="area" v-for="item in kangyangFilterCompanyList" @click="chooseKangyangCompany($event,item)">
                            {{item.companyName}}
                        </span>
                    </div>
                </div>
                <div>
                    <p class="title">使用面积</p>
                    <div class="areaList" style="margin-bottom: 24px">
                        <div class="area" v-for="item in kangyangFilterAreaList" @click="chooseKangyangArea($event,item)">
                            {{item.name}}
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <div class="reset" @click="resetKanyangFilter()">重置</div>
                    <div class="enter" @click="searchKangyangFilter()">确定</div>
                </div>
            </div>
        </mt-popup>
        <mt-popup
                v-model="showParking"
                position="right"
                :style="{ width: '85%', height: '100%' }">
            <div class="popup">
                <div>
                    <p class="title">车位价格区间</p>
                    <div class="btn">
                        <input type="number" class="input" v-model="parkingFilterPriceListMin" placeholder="最低价（万元）">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <input type="number" class="input" v-model="parkingFilterPriceListMax" placeholder="最高价（万元）">
                    </div>
                </div>
                <div>
                    <p class="title">企业名称</p>
                    <div style="margin-bottom: 24px">
                        <span class="area" v-for="item in parkingFilterCompanyList" @click="chooseParkingCompany($event,item)">
                            {{item.companyName}}
                        </span>
                    </div>
                </div>
<!--                <div>-->
<!--                    <p class="title">使用面积</p>-->
<!--                    <div class="areaList" style="margin-bottom: 24px">-->
<!--                        <div class="area" v-for="item in parkingFilterAreaList" @click="chooseParkingArea($event,item)">-->
<!--                            {{item.name}}-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
                <div>
                    <p class="title">类型</p>
                    <div class="areaList" style="margin-bottom: 24px">
                        <div class="area" v-for="item in parkingFilterTypeList" @click="chooseParkingArea($event,item)">
                            {{item.name}}
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <div class="reset" @click="resetParkingFilter()">重置</div>
                    <div class="enter" @click="searchParkingFilter()">确定</div>
                </div>
            </div>
        </mt-popup>
        <mt-popup
                v-model="showBuilding"
                position="right"
                :style="{ width: '85%', height: '100%' }">
            <div class="popup">
                <div>
                    <p class="title">公寓价格区间</p>
                    <div class="btn">
                        <input type="number" class="input" v-model="buildingFilterPriceListMin" placeholder="最低价（万元）">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <input type="number" class="input" v-model="buildingFilterPriceListMax" placeholder="最高价（万元）">
                    </div>
                </div>
                <div>
                    <p class="title">企业名称</p>
                    <div style="margin-bottom: 24px">
                        <span class="area" v-for="item in buildingFilterCompanyList" @click="chooseBuildingCompany($event,item)">
                            {{item.companyName}}
                        </span>
                    </div>
                </div>
<!--                <div>-->
<!--                    <p class="title">使用面积</p>-->
<!--                    <div class="areaList" style="margin-bottom: 24px">-->
<!--                        <div class="area" v-for="item in buildingFilterAreaList" @click="chooseBuildingArea($event,item)">-->
<!--                            {{item.name}}-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="foot">
                    <div class="reset" @click="resetBuildingFilter()">重置</div>
                    <div class="enter" @click="searchBuildingFilter()">确定</div>
                </div>
            </div>
        </mt-popup>
        <mt-popup
                v-model="showShop"
                position="right"
                :style="{ width: '85%', height: '100%' }">
            <div class="popup">
<!--                <div>-->
<!--                    <p class="title">商业不动产价格区间</p>-->
<!--                    <div class="btn">-->
<!--                        <input type="number" class="input" v-model="shopFilterPriceListMin">-->
<!--                        <span>-</span>-->
<!--                        <input type="number" class="input" v-model="shopFilterPriceListMax">-->
<!--                    </div>-->
<!--                </div>-->
                <div>
                    <p class="title">企业名称</p>
                    <div style="margin-bottom: 24px">
                        <div style="margin-bottom: 24px">
                            <span class="area" v-for="item in shopFilterCompanyList" @click="chooseShopCompany($event,item)">
                                {{item.companyName}}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="title">使用面积</p>
                    <div class="areaList" style="margin-bottom: 24px">
                        <div class="area" v-for="(item, index) in shopFilterAreaList" :key="index" @click="chooseShopArea($event,item)">
                            {{item.name}}
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <div class="reset" @click="resetShopFilter()">重置</div>
                    <div class="enter" @click="searchShopFilter()">确定</div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import {appConst} from "../../../global/appConst";

    export default {
        data() {
            return {
                showKangYang: false,
                showParking: false,
                showShop: false,
                showBuilding: false,
                items: [{}],
                kangyangFilterPriceListMin: null,
                kangyangFilterPriceListMax: null,
                parkingFilterPriceListMin: null,
                parkingFilterPriceListMax: null,
                buildingFilterPriceListMin: null,
                buildingFilterPriceListMax: null,
                shopFilterPriceListMin: null,
                shopFilterPriceListMax: null,
                kangyangFilterCompanyList:
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
                parkingFilterCompanyList:
                    [
                        {
                            companyName:'绿地西南事业部',
                            value: 'ldky'
                        }
                    ],
                buildingFilterCompanyList:
                    [
                        {
                            companyName:'绿地西南事业部',
                            value: 'ldky'
                        }
                    ],
                shopFilterCompanyList:
                    [
                        {
                            companyName:'绿地集团成都蜀峰',
                            value: 'ldky'
                        }
                    ],
                kangyangFilterAreaList:
                    [
                        {
                            name:'50㎡以下',
                            value: 50
                        },
                        {
                            name:'50-70㎡',
                            value: 70
                        },
                        {
                            name:'70-90㎡',
                            value: 90
                        },
                        {
                            name:'90-110㎡',
                            value: 110
                        },
                        {
                            name:'110-130㎡',
                            value: 130
                        },
                        {
                            name:'130-150㎡',
                            value: 150
                        },
                        {
                            name:'150㎡以上',
                            value: 151
                        }
                    ],
                parkingFilterAreaList:
                    [
                        {
                            name:'50㎡以下',
                            value: 50
                        },
                        {
                            name:'50-70㎡',
                            value: 70
                        },
                        {
                            name:'70-90㎡',
                            value: 90
                        },
                        {
                            name:'90-110㎡',
                            value: 110
                        },
                        {
                            name:'110-130㎡',
                            value: 130
                        },
                        {
                            name:'130-150㎡',
                            value: 150
                        },
                        {
                            name:'150㎡以上',
                            value: 151
                        }
                    ],
                parkingFilterTypeList:
                    [
                        {
                            name:'标准',
                            value: 'normal'
                        },
                        {
                            name:'非标准',
                            value: 'unnormal'
                        }
                    ],
                buildingFilterAreaList:
                    [
                        {
                            name:'50㎡以下',
                            value: 50
                        },
                        {
                            name:'50-70㎡',
                            value: 70
                        },
                        {
                            name:'70-90㎡',
                            value: 90
                        },
                        {
                            name:'90-110㎡',
                            value: 110
                        },
                        {
                            name:'110-130㎡',
                            value: 130
                        },
                        {
                            name:'130-150㎡',
                            value: 150
                        },
                        {
                            name:'150㎡以上',
                            value: 151
                        }
                    ],
                shopFilterAreaList:
                    [
                        {
                            name:'50㎡以下',
                            value: 50
                        },
                        {
                            name:'50-70㎡',
                            value: 70
                        },
                        {
                            name:'70-90㎡',
                            value: 90
                        },
                        {
                            name:'90-110㎡',
                            value: 110
                        },
                        {
                            name:'110-130㎡',
                            value: 130
                        },
                        {
                            name:'130-150㎡',
                            value: 150
                        },
                        {
                            name:'150㎡以上',
                            value: 151
                        }
                    ],
                kangyangCompanyArr:[],
                kangyangAreaArr:[],
                parkingCompanyArr:[],
                parkingAreaArr:[],
                parkingTypeArr:[],
                buildingCompanyArr:[],
                buildingAreaArr:[],
                shopCompanyArr:[],
                shopAreaArr:[],
                proType: 'APARTMENT',
                spuType: 'BUILDING',
                nowIndex: 0,
                selectedType:'kangyang', //all kangyang parking building shop
                tabList: [
                    {
                        title: '康养公寓',
                        isSelected: true,
                        proType: 'APARTMENT',
                        spuType: 'BUILDING'
                    }, {
                        title: '车位',
                        isSelected: false,
                        proType: 'CARPORT',
                        spuType: 'CARPORT'
                    }, {
                        title: '长租公寓',
                        isSelected: false,
                        proType: 'LONG_TERM_APARTMENT',
                        spuType: 'BUILDING'
                    }, {
                        title: '商业',
                        isSelected: false,
                        proType: 'STOR',
                        spuType: 'STOR'
                    }],
                bannerArr: [],
                contentList: [],
                bannerlist:[],
            };
        },
        mounted() {
            this.searchProject()
        },
        computed: {},
        created() {},
        methods: {
            toPopup () {
                if(this.selectedType === 'kangyang'){
                    this.showKangYang = true
                }else if(this.selectedType === 'parking'){
                    this.showParking = true
                }else if(this.selectedType === 'building'){
                    this.showBuilding = true
                }else if(this.selectedType === 'shop'){
                    this.showShop = true
                }
            },
            changeTabSearch (index) {
                if(index === 0){
                    this.selectedType = 'kangyang'
                }else if(index === 1){
                    this.selectedType = 'parking'
                }else if(index === 2){
                    this.selectedType = 'building'
                }else if(index === 3){
                    this.selectedType = 'shop'
                }
                let proType = this.tabList[index].proType
                let spuType = this.tabList[index].spuType
                let apiUrl = this.$appConst.apiUrl
                let url = `/ld/spu/front/${proType}/${spuType}/list`
                let bannerUrl = '/ld/project/list'
                let params = {
                    type: this.tabList[index].proType
                }

                this.$axios.all([this.$axios.post(apiUrl + url,{}), this.$axios.post(apiUrl + bannerUrl, params)]).then(response => {
                    if (response.length) {
                        let contentArr = response[0].data.data
                        let bannerImgArr = response[1].data.data.content
                        this.contentList = contentArr
                        this.bannerArr = bannerImgArr

                        if(bannerImgArr.length){
                            this.bannerlist = appConst.handleGetListImgUrl(response[1].data.data.content[0].attachments, 'businessLicense')
                            // eslint-disable-next-line no-console
                            console.log(this.bannerlist)
                        }

                        if (contentArr.length) {
                            contentArr.map(item => {
                                if (item.attachments && item.attachments.length) {
                                    let itemAttachmentsthis = appConst.handleGetListImgUrl(item.attachments, 'pageMap')
                                    item.url = itemAttachmentsthis[0].url
                                }
                                if(this.proType === 'CARPORT'||this.proType === 'STOR'){
                                    item.url = this.bannerlist[0].url
                                }
                            })
                        }
                    }
                })
            },
            searchProject () {
                let proType = this.proType
                let spuType = this.spuType
                let apiUrl = this.$appConst.apiUrl
                let url = `/ld/spu/front/${proType}/${spuType}/list`
                let bannerUrl = '/ld/project/list'
                let params = {
                    type: this.proType
                }

                this.$axios.all([this.$axios.post(apiUrl + url,{}), this.$axios.post(apiUrl + bannerUrl, params)]).then(response => {
                    if (response.length) {
                        let contentArr = response[0].data.data
                        let bannerImgArr = response[1].data.data.content
                        this.contentList = contentArr
                        this.bannerArr = bannerImgArr

                        if(bannerImgArr.length){
                            this.bannerlist = appConst.handleGetListImgUrl(response[1].data.data.content[0].attachments, 'businessLicense')
                            // eslint-disable-next-line no-console
                            console.log(this.bannerlist)
                        }

                        if (contentArr.length) {
                            contentArr.map(item => {
                                if (item.attachments && item.attachments.length) {
                                    let itemAttachmentsthis = appConst.handleGetListImgUrl(item.attachments, 'pageMap')
                                    item.url = itemAttachmentsthis[0].url
                                }
                                if(this.proType === 'CARPORT'||this.proType === 'STOR'){
                                    item.url = this.bannerlist[0].url
                                }
                            })
                        }
                    }
                });
            },
            //选择康养筛选
            chooseKangyangCompany (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.kangyangCompanyArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.kangyangCompanyArr.length; i++) {
                        if (this.kangyangCompanyArr[i] === item.value) {
                            this.kangyangCompanyArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseKangyangArea (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.kangyangAreaArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.kangyangAreaArr.length; i++) {
                        if (this.kangyangAreaArr[i] === item.value) {
                            this.kangyangAreaArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseParkingCompany (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.parkingCompanyArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.parkingCompanyArr.length; i++) {
                        if (this.parkingCompanyArr[i] === item.value) {
                            this.parkingCompanyArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseParkingArea (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.parkingAreaArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.parkingAreaArr.length; i++) {
                        if (this.parkingAreaArr[i] === item.value) {
                            this.parkingAreaArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseParkingType (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.parkingTypeArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.parkingTypeArr.length; i++) {
                        if (this.parkingTypeArr[i] === item.value) {
                            this.parkingTypeArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseBuildingCompany (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.kangyangCompanyArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.kangyangCompanyArr.length; i++) {
                        if (this.kangyangCompanyArr[i] === item.value) {
                            this.kangyangCompanyArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseBuildingArea (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.kangyangAreaArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.kangyangAreaArr.length; i++) {
                        if (this.kangyangAreaArr[i] === item.value) {
                            this.kangyangAreaArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseShopCompany (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.kangyangCompanyArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.kangyangCompanyArr.length; i++) {
                        if (this.kangyangCompanyArr[i] === item.value) {
                            this.kangyangCompanyArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseShopArea (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.kangyangAreaArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.kangyangAreaArr.length; i++) {
                        if (this.kangyangAreaArr[i] === item.value) {
                            this.kangyangAreaArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            //重置
            resetKanyangFilter () {
                var allSelectedElements = document.getElementsByClassName("area selected");
                for(var i = 0; i < allSelectedElements.length;i++){
                    allSelectedElements[i].className = 'area'
                    i--
                }
                this.kangyangCompanyArr = [];
                this.kangyangAreaArr = [];
                this.parkingCompanyArr = [];
                this.parkingAreaArr = [];
                this.buildingCompanyArr = [];
                this.buildingAreaArr = [];
                this.shopCompanyArr = [];
                this.shopAreaArr = [];
            },
            searchKangyangFilter () {
                this.showKangYang = false;
                this.searchProject()
            },
            resetParkingFilter () {
                var allSelectedElements = document.getElementsByClassName("area selected");
                for(var i = 0; i < allSelectedElements.length;i++){
                    allSelectedElements[i].className = 'area'
                    i--
                }
                this.kangyangCompanyArr = [];
                this.kangyangAreaArr = [];
                this.parkingCompanyArr = [];
                this.parkingAreaArr = [];
                this.buildingCompanyArr = [];
                this.buildingAreaArr = [];
                this.shopCompanyArr = [];
                this.shopAreaArr = [];
            },
            searchParkingFilter () {
                this.showParking = false;
                this.searchProject()
            },
            resetBuildingFilter () {
                var allSelectedElements = document.getElementsByClassName("area selected");
                for(var i = 0; i < allSelectedElements.length;i++){
                    allSelectedElements[i].className = 'area'
                    i--
                }
                this.kangyangCompanyArr = [];
                this.kangyangAreaArr = [];
                this.parkingCompanyArr = [];
                this.parkingAreaArr = [];
                this.buildingCompanyArr = [];
                this.buildingAreaArr = [];
                this.shopCompanyArr = [];
                this.shopAreaArr = [];
            },
            searchBuildingFilter () {
                this.showBuilding = false;
                this.searchProject()
            },
            resetShopFilter () {
                var allSelectedElements = document.getElementsByClassName("area selected");
                for(var i = 0; i < allSelectedElements.length;i++){
                    allSelectedElements[i].className = 'area'
                    i--
                }
                this.kangyangCompanyArr = [];
                this.kangyangAreaArr = [];
                this.parkingCompanyArr = [];
                this.parkingAreaArr = [];
                this.buildingCompanyArr = [];
                this.buildingAreaArr = [];
                this.shopCompanyArr = [];
                this.shopAreaArr = [];
            },
            searchShopFilter () {
                this.showShop = false;
                this.searchProject()
            },
            //跳转详情页
            goToKangYangDetail (item) {
                this.$router.push(`/kangyangProjectDetail?proType=APARTMENT&projectId=${item.projectId}&spuType=BUILDING&id=${item.id}`)
            },
            goToBuildingDetail (item) {
                this.$router.push(`/buildingProjectDetail?proType=LONG_TERM_APARTMENT&projectId=${item.projectId}&spuType=BUILDING&id=${item.id}`)
            },
            goToParkingDetail (item) {
                this.$router.push(`/parkingProjectDetail?proType=CARPORT&projectId=${item.projectId}&spuType=CARPORT&id=${item.id}`)
            },
            goToShopDetail (item) {
                this.$router.push(`/shopProjectDetail?proType=STOR&projectId=${item.projectId}&spuType=STOR&id=${item.id}`)
            }

        }
    };
</script>

<style lang="less" scoped>

</style>
