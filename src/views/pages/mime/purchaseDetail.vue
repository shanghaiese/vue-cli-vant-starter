<template>
    <div></div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {appConst} from "../../../global/appConst";

    export default {
        name: 'orderDetail',
        props: [],
        data () {
            return {
                contentInfo:{
                    project:{

                    },
                    payment:{

                    }
                },
                assetsInfo: {
                    assetName: '资产3',
                    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
                    projectName: '项目名称 户型 房型',
                    structureArea: '建筑面积',
                    devName: '开发商',
                    address: '项目地址',
                    money: '9500'
                },
                commonList: ['China', 'Japan', 'America'],
                checklist001: [],
                orderShow: true,
                allInfo: {
                    payment:{},
                    properties:{}
                },
                attachments:[],
                projectInfo: {},
                payment: {},
                properties: {},
                userData: {},
                proType: '',
                projectId: '',
                id:''
            }
        },
        computed: {
            createTime: function () {
                return  appConst.handleSetTime(this.projectInfo.createTime)
            },
            ...mapGetters([
                'myOrgInfo'
            ])
        },
        methods: {
            handleConfirm () {
                this.$router.push("/confirmTransaction")
            },
            submitOrder () {
                this.orderShow = false
            },
            goBackIndex () {
                this.$router.push("/purchaseList")
            },
            handleCheckCertifiAgreement () {

                let url = `/ld/authentic_right/get/up_to_data/${this.id}`
                this.$apiPost(url).then((res) => {
                    if (res.data.status === this.$appConst.status) {
                        if (res.data.data.attachments && res.data.data.attachments[0]) {
                            // this.confirmationUrl = `${this.$apiUrl.prevUrl}${res.data.data.attachments[0].fileId}`;
                            window.open(`${this.$appConst.uploadUrl}/query/${res.data.data.attachments[0].fileId}`)
                        }
                    }
                }).catch(() => {
                })

            },
            handleGetProDetail () {

                let url = `/ld/order/list`
                let params = {
                    id: this.id,
                    owner: sessionStorage.getItem('yjgf_userId')
                }
                this.$apiPost(url,params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        let content = response.data.data.content[0]
                        this.allInfo = content
                        this.allInfo.orderStatus = appConst.orderStatus[this.allInfo['orderStatus']]
                        this.projectInfo = content.project
                        this.attachments = content.attachments
                        this.payment = content.payment
                        // this.payment.amount = appConst.processingMoneyFormatValue(this.payment.amount)
                        this.properties = content.properties
                        let attachments = this.projectInfo.attachments
                        if (attachments && attachments.length > 0) {
                            let attachmentsthis = this.$appConst.handleGetImgUrl(attachments, 'pageMap')
                            if(attachmentsthis && attachmentsthis !== '' && attachmentsthis.length > 0){
                                this.projectInfo.url = attachmentsthis[0].url
                            }else{
                                if(this.allInfo.project.type === 'STOR'){
                                    this.projectInfo.url = require('../../../../src/assets/imgs/shopList.png')
                                }else if(this.allInfo.project.type === 'LONG_TERM_APARTMENT') {
                                    this.projectInfo.url = require('../../../../src/assets/imgs/apartmentList.png')
                                }else if(this.allInfo.project.type === 'CARPORT') {
                                    this.projectInfo.url = require('../../../../src/assets/imgs/parkingList.png')
                                }else if(this.allInfo.project.type === 'APARTMENT') {
                                    this.projectInfo.url = require('../../../../src/assets/imgs/kangyangList80.png')
                                }
                            }

                        }else{
                            if(this.allInfo.project.type === 'STOR'){
                                this.projectInfo.url = require('../../../../src/assets/imgs/shopList.png')
                            }else if(this.allInfo.project.type === 'LONG_TERM_APARTMENT') {
                                this.projectInfo.url = require('../../../../src/assets/imgs/apartmentList.png')
                            }else if(this.allInfo.project.type === 'CARPORT') {
                                this.projectInfo.url = require('../../../../src/assets/imgs/parkingList.png')
                            }else if(this.allInfo.project.type === 'APARTMENT') {
                                this.projectInfo.url = require('../../../../src/assets/imgs/kangyangList80.png')
                            }
                        }
                    }
                }).catch(() => {
                })

            },
            handleGetUserInfo () {
                let userUrl = this.$appConst.userUrl
                let id = sessionStorage.getItem('yjgf_userId')
                let url = `/api/v1.0/user/${id}`
                this.$axios.get(userUrl + url).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        let content = response.data.data
                        this.userData = content
                    }
                }).catch(() => {
                })
            },
            //跳转查看转让协议
            handleTransAgreement () {
                if(this.allInfo.orderStatus == '交易完成' || this.allInfo.orderStatus == '交易成功'){
                    let url = this.$appConst.apiUrl
                    // console.log(this.currOrderInfo)
                    // let postUrl = `/ld/agreement/TRADE/get/template/upload/file?projectId=${this.allInfo.project.id}`
                    let postUrl = `/ld/agreement/TRADE/get/${this.allInfo.project.id}/attachments?skuId=${this.allInfo.skuId}`

                    this.$axios.post((url + postUrl)).then((response) => {
                        if (response.data.status === this.$appConst.status) {
                            let fileUrl = this.$appConst.uploadUrl
                            let fileId = response.data.data[0].fileId
                            let api = `/query/${fileId}`

                            window.setTimeout(() => {
                                const newTab = window.open('')
                                newTab.location.href = fileUrl + api
                            }, 300)
                            // let a = window.document.createElement("a");
                            // a.target = '_blank';
                            // a.href = fileUrl + api;
                            // setTimeout(() => {
                            //     newTab.location.href = fileUrl + api
                            // }, 3000)
                        }else{
                            this.$global.errMsg('获取转让协议失败!')
                        }
                    }).catch(() => {
                    })
                }else{
                    let url = this.$appConst.apiUrl
                    let skuId = this.completeSkuId
                    let api = `/ld/agreement/TRADE/get/template/upload/file?projectId=${this.allInfo.project.id}`
                    let params = {
                        projectId: this.allInfo.project.id
                    }
                    this.$axios.post((url + api), params).then((response) => {
                        if (response.data.status === this.$appConst.status) {
                            let fileUrl = this.$appConst.uploadUrl
                            let fileId = response.data.data.fileId
                            let api = `/query/${fileId}`

                            window.setTimeout(() => {
                                const newTab = window.open('')
                                newTab.location.href = fileUrl + api
                            }, 300)
                            // let a = window.document.createElement("a");
                            // a.target = '_blank';
                            // a.href = fileUrl + api;
                            // setTimeout(() => {
                            //     newTab.location.href = fileUrl + api
                            // }, 3000)
                        }else{
                            this.$global.errMsg('获取转让协议失败!')
                        }
                    }).catch(() => {
                    })
                }

            },
            //跳转查看确权证书
            handleCheckAgreement () {
                if(this.allInfo.project.type === 'CARPORT'){
                    this.$global.errMsg('请去电脑网页端下载确权证书!');
                    return false
                }else{
                    let url = this.$appConst.apiUrl
                    // console.log(this.currOrderInfo)
                    let postUrl = `/ld/authentic_right/get/up_to_data/${this.allInfo.skuId}`

                    this.$axios.post((url + postUrl)).then((response) => {
                        if (response.data.status === this.$appConst.status) {
                            let fileUrl = this.$appConst.uploadUrl
                            let fileId = response.data.data.content[0].attachments[0].fileId
                            let api = `/query/${fileId}`

                            window.setTimeout(() => {
                                const newTab = window.open('')
                                newTab.location.href = fileUrl + api
                            }, 300)
                            // const newTab = window.open('')
                            // setTimeout(() => {
                            //     newTab.location.href = fileUrl + api
                            // }, 3000)
                        }else{
                            this.$global.errMsg('获取确权证失败!')
                        }
                    }).catch(() => {
                    })
                }

            },
        },
        mounted () {
            let query = this.$route.query
            this.proType = query.proType
            this.id = query.id

            this.handleGetProDetail()
            this.handleGetUserInfo()
            // this.$store.dispatch("GET_PROJECT_INFO", {id:this.id,type:this.proType})
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
