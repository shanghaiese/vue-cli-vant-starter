<template>
    <div class="box">
        <div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item class="pic">
                    <!--v-for="item in items"-->
                    <div>
<!--                        <img :src="require('../../../../src/assets/imgs/shopSwipe2.jpg')" alt />-->
                        <img :src="require('../../../../src/assets/imgs/list/shopSwipe1.jpg')" alt />
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
                    <li v-for="item in contentList" @click="goToShopDetail(item)">
                        <div>
                            <span v-if="item.url && item.url != ''">
                                <img width="160" height="160" :src="item.url" alt />
                            </span>
                            <span v-else>
                                <img width="160" height="160" :src="require('../../../assets/imgs/shopList2.png')" alt />
                            </span>
                        </div>
                        <p class="p1">{{item.projectName | projectNameLength}}</p>
                        <p class="p2">{{item.projectAddress}}</p>
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
                        <div class="area" v-for="item in shopFilterAreaList" @click="chooseShopArea($event,item)">
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
                showShop: false,
                showEmpty: false,
                items: [{}],
                shopFilterPriceListMin: null,
                shopFilterPriceListMax: null,
                shopFilterCompanyList:
                    [
                        {
                            companyName:'绿地集团成都蜀峰',
                            value: 'ldky'
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
                shopCompanyArr:[],
                shopAreaArr:[],
                proType: 'STOR',
                spuType: 'STOR',
                nowIndex: 0,
                selectedType:'shop', //all kangyang parking building shop
                tabList: [
                    {
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
                this.showShop = true;
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
                            this.bannerlist = appConst.handleGetImgUrl(response[1].data.data.content[0].attachments, 'businessLicense')
                            // eslint-disable-next-line no-console
                            console.log(this.bannerlist)
                        }

                        if (contentArr.length) {
                            contentArr.map(item => {
                                // if (item.attachments && item.attachments.length) {
                                //     let itemAttachmentsthis = appConst.handleGetImgUrl(item.attachments, 'pageMap')
                                //     item.url = itemAttachmentsthis[0].url
                                // }
                                // if(this.proType === 'CARPORT'||this.proType === 'STOR'){
                                //     item.url = this.bannerlist[0].url
                                // }
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
            chooseShopCompany (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.shopCompanyArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.shopCompanyArr.length; i++) {
                        if (this.shopCompanyArr[i] === item.value) {
                            this.shopCompanyArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            chooseShopArea (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    e.target.className = 'area selected'; // 选中
                    this.shopAreaArr.push(item.value)
                } else {
                    e.target.className = 'area'// 反选
                    for (var i = 0; i < this.shopAreaArr.length; i++) {
                        if (this.shopAreaArr[i] === item.value) {
                            this.shopAreaArr.splice(i, 1);
                            break
                        }
                    }
                }
            },
            resetShopFilter () {
                var allSelectedElements = document.getElementsByClassName("area selected");
                for(var i = 0; i < allSelectedElements.length;i++){
                    allSelectedElements[i].className = 'area'
                    i--
                }
                this.shopCompanyArr = [];
                this.shopAreaArr = [];
            },
            searchShopFilter () {
                this.showShop = false;
                this.searchProject()
            },
            //跳转详情页
            goToShopDetail (item) {
                this.$router.push(`/shopProjectDetail?proType=STOR&projectId=${item.projectId}&spuType=STOR&id=${item.id}`)
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
