<template>
    <div class="box">
        <div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item class="pic">
                    <!--v-for="item in items"-->
                    <div>
                        <img :src="require('../../../../src/assets/imgs/list/kangyangSwipe1.jpg')" alt />
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
<!--        <div class="top">-->
<!--            <div class="menu">综合</div>-->
<!--            <div class="menu">价格</div>-->
<!--            <div class="menu">面积</div>-->
<!--            <div class="right" @click="toPopup">筛选</div>-->
<!--        </div>-->
        <div class="productList">
            <div class="productList">
                <ul>
                    <li v-for="item in contentList" @click="goToKangYangDetail(item)">
<!--                        <div>-->
<!--                               <span v-if="item.url && item.url != ''">-->
<!--                                    <img width="160" height="160" :src="item.url" alt />-->
<!--                                </span>-->
<!--                                <span v-else>-->
<!--                                    <img width="160" height="160" :src="require('../../../assets/imgs/kangyangList80.png')" alt />-->
<!--                                </span>-->
<!--                        </div>-->
                        <div v-show="item.id === 3">
                            <span>
                                <img width="160" height="160" :src="require('../../../assets/imgs/kangyangList80.png')" alt />
                            </span>
                        </div>
                        <div v-show="item.id === 4">
                            <span>
                                <img width="160" height="160" :src="require('../../../assets/imgs/kangyangList70.png')" alt />
                            </span>
                        </div>
                        <p class="p1">{{item.projectName | projectNameLength}}</p>
                        <p class="p2">{{item.projectAddress}}</p>
                        <p class="p2">{{item.structureArea}}㎡</p>
                        <!-- <p class="p3">￥{{item.price?item.price:'&#45;&#45;'}}</p>-->
                    </li>
                </ul>
            </div>
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
                showEmpty: false,
                items: [{}],
                kangyangFilterPriceListMin: null,
                kangyangFilterPriceListMax: null,
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
                kangyangCompanyArr:[],
                kangyangAreaArr:[],
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
                this.showKangYang = true;
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

                        if(contentArr && contentArr.length == 0){
                            this.showEmpty = true
                        }else{
                            this.showEmpty = false
                        }
                    }
                });
            },
            //筛选
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
            //跳转详情页
            goToKangYangDetail (item) {
                this.$router.push(`/kangyangProjectDetail?proType=APARTMENT&projectId=${item.projectId}&spuType=BUILDING&id=${item.id}`)
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
