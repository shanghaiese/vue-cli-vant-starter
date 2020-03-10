<template>
    <div class="container">
        <div>
            <div class="top">
                <mt-tabbar v-model="selectedType">
                    <mt-tab-item id="all" @click="searchList('all')">
                        意向确认
                    </mt-tab-item>
                    <!--                <mt-tab-item id="toConfirmed" @click="searchList('toConfirmed')">-->
                    <!--                    待确认订单-->
                    <!--                </mt-tab-item>-->
                    <!--                <mt-tab-item id="confirmed" @click="searchList('confirmed')">-->
                    <!--                    确定交易-->
                    <!--                </mt-tab-item>-->
                    <!--                <mt-tab-item id="sold" @click="searchList('sold')">-->
                    <!--                    交易完成-->
                    <!--                </mt-tab-item>-->
                </mt-tabbar>
            </div>
            <div>
                <mt-tab-container v-model="selectedType" value="selectedType">
                    <mt-tab-container-item id="all">
                        <div v-show="showData">
                            <div v-for="(item, index) in contentList" :key="index" class="list-content">
                                <div>
                                    <div class="list-content-title">
                                        <span class="list-content-title-dev">{{item.projectName}}</span>
                                        <span class="list-content-title-status">{{$appConst.handleHouseStatus(item.status)}}</span>
                                    </div>
                                    <div class="list-content-title-detail">
                                        <div class="list-content-title-detail">
<!--                                            <div class="list-content-title-pic">-->
<!--                                                <img width="90" height="90" :src="require('../../../../src/assets/imgs/house/houseList.png')">-->
<!--                                            </div>-->
                                            <div class="list-content-title-project">
                                                <div class="list-content-title-project-info">
                                                    <div class="list-content-title-project-name">
                                                        {{item.dev}}
                                                    </div>
<!--                                                    <div class="list-content-title-project-price">-->
<!--                                                        <div v-show="item.orderStatusFlag == '交易成功'">-->
<!--                                                            <div class="list-content-title-project-price-now">-->
<!--                                                                ￥{{$appConst.processingMoneyFormatValue(item.payment.amount)}}万-->
<!--                                                            </div>-->
<!--                                                        </div>-->
<!--                                                        <div v-show="item.orderStatusFlag !== '交易成功'">-->
<!--                                                            <div class="list-content-title-project-price-now">-->
<!--                                                                ￥{{$appConst.processingMoneyFormatValue(item.payment.amount)}}万-->
<!--                                                            </div>-->
<!--                                                        </div>-->
<!--                                                    </div>-->
                                                </div>
                                                <div class="list-content-title-project-sub-info">
                                                    <div class="list-content-title-project-sub-info-detail">
                                                        买家:   {{item.buyer}}
                                                    </div>
                                                    <div class="list-content-title-project-sub-info-detail">
                                                        卖家:   {{item.seller}}
                                                    </div>
                                                    <div class="list-content-title-project-sub-info-detail">
                                                        银行账号:   {{item.bankAccount}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-content-action" v-if="item.status === 'TO_BE_CONFIRMED'">
                                    <button class="list-content-action-button" @click="handleOrderInfo(item)">已支付意向金</button>
                                </div>
<!--                                <div class="list-content-action" v-if="item.orderStatus === 'TO_BE_COMPLETE_BY_BUYER'">-->
<!--                                    <button class="list-content-action-button" @click="doubleConfirmOrder(item)">完成交易</button>-->
<!--                                </div>-->
                            </div>
                        </div>
                        <div v-show="showEmpty" class="empty-data">
                            <div>
                            <span>
                                <img class="logo-img" width="42" height="42" :src="require('../../../../src/assets/imgs/nodata.png')">
                            </span>
                            </div>
                            <div class="empty-text">
                                <span>没有找到符合条件的数据</span>
                            </div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <!--弹窗-->
        <div>
            <div>
                <mt-popup
                        v-model="showConfirmOrder"
                        position="middle">
                    <div class="pop-up">
                        <div class="confirm-info">
                            <div>
                                <span class="pop-up-label">付款日期：</span>
                                <span>签约后{{allowDayCount}}个工作日以内</span>
                            </div>
                            <div>
                                <span class="pop-up-label">付款金额（万元）：</span>
                                <span>{{allAmount}} 其中服务费（万元）：{{serviceAmount}}</span>
                            </div>
                            <div>
                                <span class="pop-up-label">交付日期：</span>
                                <span>{{completeDate}}</span>
                            </div>
                        </div>
                        <div class="pop-up-agree">
                            <!--                            <input class="select-tag-input" type="checkbox" id="tag-id"-->
                            <!--                                   @click="handleSelectChange">-->
                            <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox" v-show="!showConfirmCheckBox">
                                <img width="15" :src="require('../../../../src/assets/imgs/checkbox.png')" alt />
                            </span>
                            <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox" v-show="showConfirmCheckBox">
                                <img width="15" :src="require('../../../../src/assets/imgs/checkbox01.png')" alt />
                            </span>
                            <span class="pop-up-agree-text">我已阅读并同意，</span>
                            <span class="agreement"
                                  @click="handleTransAgreement('TRADE')">《转让协议》
                            </span>
                        </div>
                        <div class="pop-up-action">
                            <button class="cancel-btn" @click="showConfirmOrder=false">取消</button>
                            <button class="ok-btn" @click="submitConfirm()">确认</button>
                            <!-- :disabled="!showConfirmCheckBox"-->
                        </div>
                    </div>
                </mt-popup>
            </div>
            <div>
                <mt-popup
                        v-model="showDoubleConfirmOrder"
                        position="middle">
                    <div class="pop-up">
                        <div class="confirm-info">
                            <div>
                                <span class="pop-up-label">付款日期：</span>
                                <span>签约后{{allowDayCount}}个工作日以内</span>
                            </div>
                            <div>
                                <span class="pop-up-label">付款金额（万元）：</span>
                                <span>{{allAmount}} 其中服务费（万元）：{{serviceAmount}}</span>
                            </div>
                            <div>
                                <span class="pop-up-label">交付日期：</span>
                                <span>{{completeDate}}</span>
                            </div>
                        </div>
                        <div class="pop-up-agree">
                            <!--                            <input class="select-tag-input" type="checkbox" id="tag-id"-->
                            <!--                                   @click="handleSelectChange">-->
                            <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox" v-show="!showConfirmCheckBox">
                                <img width="15" :src="require('../../../../src/assets/imgs/checkbox.png')" alt />
                            </span>
                            <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox" v-show="showConfirmCheckBox">
                                <img width="15" :src="require('../../../../src/assets/imgs/checkbox01.png')" alt />
                            </span>
                            <span class="pop-up-agree-text">您已了解和确认此订单，勾选本项后可点击和阅读，</span>
                            <span class="agreement"
                                  @click="handleTransAgreement('TRADE')">《转让协议》
                            </span>
                        </div>
                        <div class="pop-up-action">
                            <button class="cancel-btn" @click="showDoubleConfirmOrder=false">取消</button>
                            <button class="ok-btn" @click="submitDoubleConfirm()">确认</button>
                            <!-- :disabled="!showConfirmCheckBox"-->
                        </div>
                    </div>
                </mt-popup>
            </div>
            <div>
                <mt-popup
                        v-model="showFinishOrder"
                        position="middle">
                    <div class="pop-up">
                        <div class="confirm-info">
                            <div>
                                <span class="">付款日期 签约后{{allowDayCount}}个工作日以内</span>
                            </div>
                            <div>
                                <input />
                            </div>
                            <div>
                                <span class="">付款金额（万元）：</span>
                            </div>
                            <div>
                                <input />
                            </div>
                            <div>
                                <span class="">交付日期：</span>
                            </div>
                            <div>
                                <button @click="openPicker">选择日期</button> <span>2019-10-02</span>
                            </div>
                            <div>
                                <span class="">上传付款凭证：</span>
                            </div>
                            <div>
                                <button>选择付款凭证</button> <span>2019-10-02</span>
                            </div>
                        </div>
                        <div class="pop-up-agree">
                            <!--                            <input class="select-tag-input" type="checkbox" id="tag-id"-->
                            <!--                                   @click="handleSelectChange">-->
                            <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox" v-show="!showConfirmCheckBox">
                                <img width="15" :src="require('../../../../src/assets/imgs/checkbox.png')" alt />
                            </span>
                            <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox" v-show="showConfirmCheckBox">
                                <img width="15" :src="require('../../../../src/assets/imgs/checkbox01.png')" alt />
                            </span>
                            <span class="pop-up-agree-text">您已了解和确认此订单，勾选本项后可点击和阅读，</span>
                            <span class="agreement"
                                  @click="handleTransAgreement('TRADE')">《转让协议》
                            </span>
                        </div>
                        <div class="pop-up-action">
                            <button class="cancel-btn" @click="showDoubleConfirmOrder=false">取消</button>
                            <button class="ok-btn" @click="submitDoubleConfirm()">确认</button>
                            <!-- :disabled="!showConfirmCheckBox"-->
                        </div>
                    </div>
                </mt-popup>
            </div>

            <mt-datetime-picker
                    v-model="showFinishOrderPickerValue"
                    type="date"
                    @confirm="handlePicker"
                    ref="picker"
            >
            </mt-datetime-picker>
        </div>
    </div>
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
                showData: false,
                showEmpty: false,
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
                // let url = `/ld/order/list`;
                let url = `/ld/lh/orders?page=0&size=300&type=BUYER`;
                this.$apiGet(url).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        // eslint-disable-next-line no-console
                        this.contentShow = true
                        this.contentList = response.data.data.content
                        if(response.data.data.content && response.data.data.content.length > 0){
                            this.showData = true
                            this.showEmpty = false
                        }else{
                            this.showData = false
                            this.showEmpty = true
                        }
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
                this.$router.push(`/housePurchaseDetail?orderId=${item.id}&status=${item.status}`)
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
