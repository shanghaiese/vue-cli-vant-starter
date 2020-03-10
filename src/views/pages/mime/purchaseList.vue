<template>
    <div></div>
</template>

<script>
    // import {appConst} from "../../../global/appConst";
    // import {global} from "../../../global/global";

    export default {
        name: 'purchase',
        props: [],
        computed: {
            newContentList: function () {
                let newArr = []
                this.contentList.map(item => {
                    if (item['attachments'] && item['attachments'].length > 0) {
                        let itemAttachmentsthis = appConst.handleGetListImgUrl(item['attachments'], 'offlineProtocol')
                        item.url = itemAttachmentsthis[0] ? itemAttachmentsthis[0].url: ''
                    }
                    if (item['orderStatus']) {
                        item['orderStatusFlag'] = appConst.orderStatus[item['orderStatus']]
                        item['orderOptionText'] = appConst.orderOption[item['orderStatus']]
                    }
                    if(item['properties']){
                        item['amount'] = appConst.processingMoneyFormatValue(item['properties'].price)
                    }
                    newArr.push(item)
                })
                return newArr
            }
        },
        data () {
            return {
                selectedType: 'all', //all所有订单 toConfirmed 待订单确认 confirmed 确定订单 sold 交易完场
                showStatus: [false, false, false],
                contentList: [],
                contentShow: false,
                isActionSheetShow: false,
                dialogOption: {
                    tit: '',
                    confirm: true
                },
                currOrderInfo: {},
                orderBtnStatus: true,
                //确认订单弹窗
                userId: '',
                allowDayCount: 0,
                allAmount: 0,
                serviceAmount: 0,
                completeDate: '',
                completeFileId: '',
                showConfirmOrder: false,
                showDoubleConfirmOrder: false,
                showFinishOrder: false,
                showCompleteOrder: false,
                showConfirmCheckBox: false,
                showCompleteCheckBox: false,
                selectedId: '',
                selectedStatus: '',
                showFinishOrderPickerValue: null,
                completeSkuId: '',
                selectedOrderStatus: ''
            }
        },
        methods: {
            init () {
                this.handleGetData('all')
            },
            searchList(type) {
                this.handleGetData(type)
            },
            handleGetData (type) {
                this.userId = sessionStorage.getItem('yjgf_userId');
                let url = `/ld/order/list`;
                let params = {
                    owner: this.userId
                }
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        // eslint-disable-next-line no-console
                        this.contentShow = true
                        this.contentList = response.data.data.content
                    }
                }).catch(() => {
                })
            },
            handleOrderOption (isClose,isConfirm) {
                if(isConfirm === 'confirm'){
                    if(this.currOrderInfo.orderStatus==='TO_BE_CONFIRMED_BY_BUYER'){
                        let tagId = document.getElementById("tag-id");
                        if (!tagId.checked) {
                            this.$global.errMsg('请勾选《转让协议》！')
                        } else {
                            this.handleOrderConfirm ('CONFIRM')
                        }
                    }else if(this.currOrderInfo.orderStatus==='TO_BE_COMPLETE_BY_BUYER'){
                        this.handleOrderConfirm ('COMPLETE')
                    } else if(this.currOrderInfo.orderStatus==='TO_BE_CONFIRMED_BY_DEV'){
                        this.handleOrderConfirm ('CANCEL')
                    }
                } else this.isActionSheetShow = false

            },
            handleSelectChange () {
                let tagId = document.getElementById("tag-id");
                if (tagId.checked) {
                    this.orderBtnStatus = true
                } else this.orderBtnStatus = false
            },
            handleTransAgreement () {
                if(this.selectedOrderStatus == '交易完成' || this.selectedOrderStatus == '交易成功'){
                    let url = this.$appConst.apiUrl
                    let projectId = this.completeFileId
                    let skuId = this.completeSkuId
                    let api = `/ld/agreement/TRADE/get/${projectId}/attachments?skuId=${skuId}`
                    this.$axios.post((url + api)).then((response) => {
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
                    let projectId = this.completeFileId
                    let skuId = this.completeSkuId
                    let api = `/ld/agreement/TRADE/get/template/upload/file?projectId=${projectId}`
                    let params = {
                        projectId: projectId
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
            handleCheckAgreement (type) {
                let url = this.$appConst.apiUrl
                let projectId = this.currOrderInfo.project.id
                let api = `/project/${projectId}/type/${type}/preview`
                window.open(url + api)
            },
            handleConfirm (item) {
                this.currOrderInfo = item
                let tit = ''

                tit = appConst.orderOption[item.orderStatus]

                this.dialogOption.tit = tit
                this.isActionSheetShow = true

                // this.$vux.confirm.show({
                //   title: title,
                //   content: content,
                //   confirmText: '确定',
                //   cancelText: '取消',
                //   onCancel () {
                //     _this.$vux.confirm.hide()
                //   },
                //   onConfirm () {
                //     _this.handleOrderConfirm(item)
                //   }
                // })
            },
            handleOrderConfirm (status) {
                let url = `/ld/order/confirm/${this.currOrderInfo.id}?confirmStatus=${status}`
                let params = {
                    // confirmStatus: status
                }
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        this.$global.errMsg('操作成功!')
                        this.isActionSheetShow = false
                        this.handleGetData()
                    }
                }).catch(() => {
                })

            },
            handleOrderInfo (item) {
                // eslint-disable-next-line no-console
                this.$router.push({
                    name: "purchaseDetail",
                    query: {
                        proType: item.project.type,
                        id: item.id
                    }
                })
            },
            //打开确认订单弹窗
            confirmOrder (item) {
                this.selectedId = item.id;
                this.selectedStatus = item.orderStatus;
                this.showConfirmOrder = true
                this.allowDayCount = item.payment.payDate
                if(item.project.type === 'STOR' || item.project.type === 'CARPORT'){
                    if(item.payment.amount === '0' || item.payment.amount === 0){
                        this.allAmount = 0
                    }else{
                        this.allAmount = (!item.payment.amount || item.payment.amount == '') ? '待协商' : appConst.processingMoneyFormatValue(item.payment.amount) //非正常值均赋值待协商
                    }
                }else{
                    this.allAmount = appConst.processingMoneyFormatValue(item.payment.amount)
                }
                this.serviceAmount = appConst.processingMoneyFormatValue(item.payment.serviceFee)
                this.completeDate = item.payment.interactionDate
                this.completeFileId = item.project.id
                this.completeSkuId = item.skuId
                this.selectedOrderStatus = item.orderStatusFlag
            },
            doubleConfirmOrder (item) {
                this.selectedId = item.id;
                this.selectedStatus = item.orderStatus;
                this.showDoubleConfirmOrder = true
                this.allowDayCount = item.payment.payDate
                if(item.project.type === 'STOR' || item.project.type === 'CARPORT'){
                    if(item.payment.amount === '0' || item.payment.amount === 0){
                        this.allAmount = 0
                    }else{
                        this.allAmount = (!item.payment.amount || item.payment.amount == '') ? '待协商' : appConst.processingMoneyFormatValue(item.payment.amount) //非正常值均赋值待协商
                    }
                }else{
                    this.allAmount = appConst.processingMoneyFormatValue(item.payment.amount)
                }
                this.serviceAmount = appConst.processingMoneyFormatValue(item.payment.serviceFee)
                this.completeDate = item.payment.interactionDate
                this.completeFileId = item.project.id
                this.completeSkuId = item.skuId
                this.selectedOrderStatus = item.orderStatusFlag
            },
            submitConfirm() {
                if (!this.showConfirmCheckBox) {
                    this.$global.errMsg('请勾选《转让协议》！')
                    return false
                }else{
                    let url = `/ld/order/confirm/${this.selectedId}?confirmStatus=CONFIRM`
                    let params = {
                        // confirmStatus: status
                    }
                    this.$apiPost(url, params).then((response) => {
                        if (response.data.status === this.$appConst.status) {
                            this.$global.errMsg('操作成功!')
                            this.showConfirmOrder = false
                            this.handleGetData()
                        }
                    }).catch(() => {
                    })
                    this.showConfirmCheckBox = false
                }
            },
            submitDoubleConfirm() {
                if (!this.showConfirmCheckBox) {
                    this.$global.errMsg('请勾选《转让协议》！')
                    return false
                }else{
                    let url = `/ld/order/confirm/${this.selectedId}?confirmStatus=COMPLETE`
                    let params = {
                        // confirmStatus: status
                    }
                    this.$apiPost(url, params).then((response) => {
                        if (response.data.status === this.$appConst.status) {
                            this.$global.errMsg('操作成功!')
                            this.showDoubleConfirmOrder = false
                            this.handleGetData()
                        }
                    }).catch(() => {
                    })
                    this.showConfirmCheckBox = false
                }
            },
            handlePicker (value) {
                this.selectedDate = value
            },
            openPicker () {
                this.$refs.picker.open();
            }
        },
        mounted () {
            this.init()
        },
        components: {
            actionSheetComponent
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
