<template>
    <div></div>
</template>

<script>
    import {appConst} from "../../../global/appConst"

    export default {
        name: 'projectDetail',
        props: [],
        data () {
            return {
                ifChosen: false,
                showOrderBuy: null,
                kangyanglist:
                    [
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe1.jpg'),
                            id: 0
                        },
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe2.jpg'),
                            id: 1
                        },
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe3.jpg'),
                            id: 2
                        },
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe4.jpg'),
                            id: 3
                        },
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe5.jpg'),
                            id: 4
                        },
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe11.jpg'),
                            id: 5
                        },
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe12.jpg'),
                            id: 6
                        },
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe13.jpg'),
                            id: 7
                        },
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe14.jpg'),
                            id: 8
                        },
                        {
                            url:require('../../../../src/assets/imgs/detailKangyangSwipe15.jpg'),
                            id: 9
                        },
                    ],
                specialBuildingDetailImgList: [
                    {
                        url: require('../../../../src/assets/imgs/detail/apartment/apartmentDetailSwipe1.jpg'),
                        title: '1'
                    }, {
                        url: require('../../../../src/assets/imgs/detail/apartment/apartmentDetailSwipe2.jpg'),
                        title: '2'
                    }, {
                        url: require('../../../../src/assets/imgs/detail/apartment/apartmentDetailSwipe3.jpg'),
                        title: '3'
                    }, {
                        url: require('../../../../src/assets/imgs/detail/apartment/apartmentDetailSwipe4.jpg'),
                        title: '4'
                    }, {
                        url: require('../../../../src/assets/imgs/detail/apartment/apartmentDetailSwipe5.jpg'),
                        title: '5'
                    }, {
                        url: require('../../../../src/assets/imgs/detail/apartment/apartmentDetailSwipe6.jpg'),
                        title: '6'
                    }
                ],
                orderBtnStatus: true,
                optionData: {},
                initSelectId: '',// 默认选中sku的id
                spuType: '',
                projectInfo: {},
                buildingInfoArr: [],
                showStatus: [false, false, false],
                currBuildingType: '',
                buildingInfo: '',
                currentBuildingInfo: '',
                projectDetail: {},
                proDetailHead: {
                    projectAddress: '项目地址',
                    completionDate: '项目建成日期',
                    rightStartDate: '项目交付日期',
                    assetStartDate: '资产使用权开始日期',
                    assetEndDate: '资产使用权结束日期'
                },
                buildingHead: {
                    buildingNum: '楼号',
                    roomNumber: '房号',
                    houseNum: '户型',
                    roomType: '房型',
                    structureArea: '建筑面积(㎡)'
                },
                carportHead: {
                    floorNum: '楼层',
                    area: '区域',
                    assetNumber: '车位编号',
                    carportType: '车位类型',
                    year: '年限',
                    structureArea: '建筑面积(㎡)'
                },
                storeHead: {
                    floorNum: '楼层',
                    area: '区域',
                    assetNumber: '商业不动产编号',
                    structureArea: '建筑面积(㎡)'
                },
                areaHead: {
                    // decoration: '朝向',
                    structureArea: '建筑面积(㎡)',
                    netArea: '使用面积(㎡)',
                    decorationLevel: '装修程度',
                    // stairRoomRate: '梯户比例'
                },
                floorHeightOrLowList: [
                    {
                        text: '低楼层',
                        value: '1'
                    },
                    {
                        text: '高楼层',
                        value: '2'
                    }
                ],
                porjectData: [],
                buildingPorjectData: [
                    {
                        text: '项目信息',
                        isOption: true
                    },
                    {
                        text: '请选择规格',
                        isOption: true
                    },
                    {
                        text: '房型信息',
                        isOption: true
                    },
                    {
                        text: '开发商',
                        isOption: false,
                        itemName: 'devName'
                    },
                    {
                        text: '运营商',
                        isOption: false,
                        itemName: 'participant'
                    }
                ],
                // storePorjectData: [
                //     {
                //         text: '项目信息',
                //         isOption: true
                //     },
                //     {
                //         text: '请选择规格',
                //         isOption: true
                //     },
                //     {
                //         text: '开发商',
                //         isOption: false,
                //         itemName: 'devName'
                //     },
                //     {
                //         text: '运营商',
                //         isOption: false,
                //         itemName: 'participant'
                //     }
                // ],
                dialogOption: {
                    tit: '',
                    complete: true
                },
                isActionSheetShow: false,
                buildingSpecifications: [
                    // {
                    //   'name': '区域',
                    //   'item': [],
                    //   type: 'area'
                    // },
                    {
                        'name': '楼层',
                        'item': [],
                        type: 'floorNum'
                    },
                    {
                        'name': '楼号',
                        'item': [],
                        type: 'buildingNum'
                    },
                    {
                        'name': '房号',
                        'item': [],
                        type: 'roomNumber'
                    }
                ],
                carpotSpecifications: [
                    {
                        'name': '区域',
                        'item': [],
                        type: 'area'
                    },
                    {
                        'name': '车位编号',
                        'item': [],
                        type: 'assetNumber'
                    },
                    {
                        'name': '年限',
                        'item': [],
                        type: 'year'
                    }
                    // {
                    //   'name': '车位类型',
                    //   'item': [],
                    //   type: 'carportType'
                    // },
                    // {
                    //   'name': '建筑面积（㎡）',
                    //   'item': [],
                    //   type: 'structureArea'
                    // }
                ],
                storeSpecifications: [
                    {
                        'name': '区域',
                        'item': [],
                        type: 'area'
                    },
                    {
                        'name': '商业不动产编号',
                        'item': [],
                        type: 'assetNumber'
                    }
                    // {
                    //   'name': '建筑面积（㎡）',
                    //   'item': [],
                    //   type: 'structureArea'
                    // }
                ],
                currenIndex: null,
                choiceSkuArr: [],
                proType: '',
                id: '',
                projectId: '',
                price: 0,
                bigdecimalPrice: 0, // 转为万元
                carportType: '',
                structureArea: '',
                currSkuInfo: {},// 选中sku的信息
                currSpecifications: [],
                detailsMap: [],// 资产详情图片
                serviceMap: [],// 配套服务图片
                certificationMap: [],// 确权证图片
                bannerlist: [],
                assetsHead: {}, // 资产详情

                /*添加*/
                items: [{}, {}, {}, {}, {}, {}],
                selectedType:'detail' //service certificate
            }
        },
        methods: {
            showWarning () {
                Toast('请先登录或注册！');
                this.$router.push('login')
            },
            init () {
                // eslint-disable-next-line no-console
                this.handleInitData()
                this.handleGetProDetail()
                this.handleSkuInfo()
                // console.log(this.currSkuInfo)
                let currSkuInfo = sessionStorage.getItem('currSkuInfo')?sessionStorage.getItem('currSkuInfo'):''
                if (currSkuInfo && currSkuInfo !== '') {
                    this.handleRecoveryStatus()
                }
                if(sessionStorage.getItem('yjgf_access_token') && sessionStorage.getItem('yjgf_access_token') !== ''){
                    this.showOrderBuy = true
                }else{
                    this.showOrderBuy = false
                }
            },
            handleInitData () {
                let query = this.$route.query
                this.proType = query.proType
                this.spuType = query.spuType
                this.projectId = query.projectId
                this.id = query.id
                let porjectData = {}
                let currSpecifications = []
                let assetsHead = {}

                porjectData = this.buildingPorjectData
                currSpecifications = this.buildingSpecifications
                assetsHead = this.buildingHead

                this.porjectData = porjectData
                this.currSpecifications = currSpecifications
                this.assetsHead = assetsHead
            },
            handleRecoveryStatus () {
                let currSkuInfo = JSON.parse(sessionStorage.getItem('currSkuInfo'))
                this.initSelectId = currSkuInfo.id
            },
            handleGetProDetail () {
                let url = `/ld/spu/front/${this.proType}/${this.spuType}/list`
                let params = {
                    id: this.id
                }
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        //获取初始展示的数据并展示
                        let content = response.data.data[0]
                        this.projectDetail = content
                        this.projectInfo = content
                        if (content.attachments && content.attachments.length && this.proType !== 'CARPORT') {
                            this.detailsMap = appConst.handleGetImgUrl(content.attachments, 'detailsMap')
                            this.serviceMap = appConst.handleGetImgUrl(content.attachments, 'serviceMap')
                            this.bannerlist = appConst.handleGetImgUrl(content.attachments, 'detailHeaderMap')
                        }
                        // console.log(this.bannerlist)
                    }
                }).catch(() => {
                })
            },
            handleGetCertificationMap (Object) {
                let url = `/ld/authentic_right/list/${Object.id}/1`;
                let params = {
                    authId:Object.authId
                };
                this.$apiPost(url, params).then((res) => {
                    if (res.data.status === 200) {
                        if (res.data.data.attachments && res.data.data.attachments[0]) {
                            let url = `${this.$appConst.uploadUrl}/query/${res.data.data.attachments[0].fileId}`
                            this.certificationMap = [url]
                        }
                    }
                }).catch(() => {
                })

            },
            submitOrder () {
                if (sessionStorage.getItem('type') === 'INDIVIDUAL' && sessionStorage.getItem('verified') == 'null') return this.$global.errMsg('该用户未通过实名认证，仅通过实名认证的用户可以下单!')
                // eslint-disable-next-line no-console
                if(this.currSkuInfo && this.currSkuInfo !== {} && this.ifChosen){
                    if (sessionStorage.getItem('yjgf_userId')) {
                        this.$router.push({
                            name: 'parkingConfirmTransaction',
                            query: {
                                currSkuInfo: this.currSkuInfo,
                                projectId: this.projectId,
                                type: this.proType,
                                id: this.id,
                                projectData: this.projectInfo,
                                fileId: this.fileId
                            }
                        })
                    } else {
                        Toast('请先登录 / 注册!');
                        // this.$router.push('/login')
                    }
                }else{
                    Toast('请先选择规格！')
                }
            },
            proSelected (isClose, isConfirm) {
                if (isConfirm === 'confirm') {
                    if (this.currenIndex === 1) {
                        this.$bus.$emit("handleValidateAll")
                    } else this.isActionSheetShow = false
                } else this.isActionSheetShow = false
                document.documentElement.style.overflowY = 'auto';
            },
            handlePriceReture (arr) {
                this.handleGetPrice(arr)
            },
            handleValidateReturn (arr) {
                let num = 0
                arr.forEach(item => {
                    if (item.length) {
                        num++
                    }
                })
                // eslint-disable-next-line no-console
                if (num === arr.length) {
                    this.isActionSheetShow = false
                    this.orderBtnStatus = true
                    this.handleGetPrice(arr)
                    this.handleGetCertificationMap(this.currSkuInfo)  //id-skuId authId
                    let len = this.optionData.specifications.length
                    for (let i = 0; i < len; i++) {
                        let objItem = {}

                        if (this.optionData.specifications[i].type === 'year') {
                            objItem = {
                                ['yearPrice']: [{year: arr[i], price: this.price}]
                            }
                        } else {
                            objItem = {
                                [this.optionData.specifications[i].type]: arr[i]
                            }
                        }
                        this.choiceSkuArr.push(objItem)
                    }
                    // sessionStorage.setItem('currSkuInfo', JSON.stringify(this.currSkuInfo))
                    this.ifChosen = true
                    this.currentBuildingInfo = `${this.currSkuInfo.buildingNum}号楼${this.currSkuInfo.floorNum}层${this.currSkuInfo.roomNumber}室`
                    document.documentElement.style.overflowY = 'auto';
                } else {
                    this.$global.errMsg('请选择完所有规格!')
                    this.orderBtnStatus = false
                    this.isActionSheetShow = true
                }
            },
            handleGetPrice (arr) {
                let difference = this.optionData.difference
                let len = difference.length
                let newArr = this.currSpecifications

                for (let i = 0; i < len; i++) {
                    let num = 0
                    for (let j = 0; j < newArr.length; j++) {
                        if (difference[i][newArr[j].type] == arr[j]) {
                            num++
                        }
                    }
                    if (num === arr.length) {
                        this.price = difference[i].price
                        this.bigdecimalPrice = appConst.processingMoneyFormatValue(difference[i].price)
                        // eslint-disable-next-line no-console
                        // console.log(this.bigdecimalPrice)
                        this.carportType = difference[i].carportType
                        this.structureArea = difference[i].structureArea
                        this.currSkuInfo = difference[i]
                        if (difference[i].attachments && difference[i].attachments.length) {
                            this.detailsMap = appConst.handleGetImgUrl(difference[i].attachments, 'detailsMap')
                            this.serviceMap = appConst.handleGetImgUrl(difference[i].attachments, 'serviceMap')
                            this.bannerlist = appConst.handleGetImgUrl(difference[i].attachments, 'detailHeaderMap')
                        }
                    }
                }
                // eslint-disable-next-line no-console
            },
            handleChoiceInfo (val, index) {
                if (!val.isOption) {
                    return
                }
                this.currenIndex = index
                // if (index === 1) {
                //   this.handleSkuInfo()
                // } else this.isActionSheetShow = true
                this.isActionSheetShow = true
                this.dialogOption.tit = val.text
                this.hideAll()
                this.showStatus[index] = true
                document.documentElement.style.overflowY = 'hidden';
            },
            hideAll () {
                for (let i = 0; i < this.showStatus.length; i++) {
                    this.showStatus[i] = false
                }
            },
            handleSetOptionData (content) {
                let newArr = []
                this.optionData.specifications = this.currSpecifications
                if (this.proType === 'CARPORT') {
                    if (content.length) {
                        content.forEach(item => {
                            item.yearPrice.forEach(yearPriceItem => {
                                newArr.push(Object.assign({}, item, {year: yearPriceItem.year, price: yearPriceItem.price}))
                            })
                        })
                    }

                    this.optionData.difference = newArr
                    let difference = this.optionData.difference[0]
                    if (difference.attachments && difference.attachments.length) {
                        this.detailsMap = appConst.handleGetImgUrl(difference.attachments, 'detailsMap')
                        this.serviceMap = appConst.handleGetImgUrl(difference.attachments, 'serviceMap')
                        this.bannerlist = appConst.handleGetImgUrl(difference.attachments, 'detailHeaderMap')
                    }
                    this.handleGetCertificationMap(difference) //id-skuId authId
                    this.currSkuInfo = difference
                    this.ifChosen = true
                } else {
                    this.handleGetCertificationMap(content[0]) //id-skuId authId
                    this.optionData.difference = content
                    this.currSkuInfo = content[0]
                }

                // this.bigdecimalPrice = appConst.processingMoneyFormatValue(this.optionData.difference[0].price)
                this.optionData.type = this.proType

                // eslint-disable-next-line no-console
                console.log(this.optionData.difference)
            },
            handleSkuInfo () {
                let projectId = this.projectId
                let id = this.id
                let url = `/ld/sku/${projectId}/list?id=${id}`
                let params = {
                    putaway: true
                }
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        let content = response.data.data
                        this.handleSetOptionData(content)
                        // this.isActionSheetShow = true
                        //设置初始价格
                        this.bigdecimalPrice = appConst.processingMoneyFormatValue(content[0].price)
                    } else {
                        this.$global.errMsg(response.data.message)
                    }
                }).catch(() => {
                })
            },
            //跳转login
            goToLogin () {
                this.$router.push('/home')
            },
            showContact () {
            }
        },
        mounted () {
            this.init()
        },
        beforeRouteLeave (to, from, next) {
            // eslint-disable-next-line no-console
            to.meta.keepAlive = true
            next()
        },
        components: {
            actionSheetComponent,
            detailEntryComponent
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
