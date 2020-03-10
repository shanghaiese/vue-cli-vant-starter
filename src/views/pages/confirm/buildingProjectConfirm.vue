<template>
    <div class="container">
        <div v-if="orderShow">
            <div class="list-content">
                <div class="list-content-title">
                    <span class="list-content-title-dev">{{projectData.devName}}</span>
                </div>
                <div class="list-content-title-detail">
                    <div class="list-content-title-detail">
                        <div class="list-content-title-pic">
                            <img width="80" height="80" :src="`https://139.9.70.191/api/files/file/download/${projectInfo.attachments[0].fileId}`" alt />
                        </div>
                        <div class="list-content-title-project">
                            <div class="list-content-title-project-info">
                                <div class="list-content-title-project-name">
                                    {{projectInfo.projectName}}
                                </div>
                                <div class="list-content-title-project-price">
                                    <div class="list-content-title-project-price-now">
                                        ￥ {{bigdecimalPrice}}万
                                    </div>
                                    <div class="list-content-title-project-price-count">
                                        * 1
                                    </div>
                                </div>
                            </div>
                            <div class="list-content-title-project-sub-info">
                                <div class="list-content-title-project-sub-info-detail">
                                    {{currSkuInfo.buildingNum}}号楼 {{currSkuInfo.roomNumber}}室 {{currSkuInfo.structureArea?currSkuInfo.structureArea:currSkuInfo.netArea}}平米
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div>
                    <div>
                        同意并遵守：<span class="agreement" @click="goRisk('RISK')">《风险揭示书》</span> <span class="agreement" @click="goRisk('TRADE')">《转让协议》</span>
                        <span v-show="showAgree" class="agreement-switch" @click="agree()">
                            <img width="30" :src="require('../../../../src/assets/imgs/switchoff.png')" alt/>
                        </span>
                        <span v-show="!showAgree" class="agreement-switch" @click="agree()">
                            <img width="30" :src="require('../../../../src/assets/imgs/switchon.png')" alt/>
                        </span>
                    </div>
                </div>

            </div>
            <div class="submit-order">
                <span style="padding: 10px">应付：<span class="amount">￥{{bigdecimalPrice}}万</span></span>
                <button class="submit-button" :class="[orderBtnStatus?'':'noneActive']" @click="submitOrder">立即下单
                </button>
            </div>
        </div>

        <div v-else class="order-finish">
            <div class="container">
                <div class="login-wrap">
                    <div>
                        <span>
                            <img class="logo-img" width="35" height="35"
                                 :src="require('../../../assets/imgs/valid.png')">
                        </span>
                    </div>
                    <div>
                        <span class="pop-text">
                            订单提交成功
                        </span>
                    </div>
                    <div>
                        <span class="pop-text-reason">
                            如有疑问或需求，请联系客服
                        </span>
                    </div>
                    <!--                    <div class="login-btn">-->
                    <!--                        <button class="button-login" @click="goToLogin">完成</button>-->
                    <!--                    </div>-->
                </div>
            </div>
            <span class="go-back" @click="goBackIndex">返回首页</span>
        </div>
        <div class="order-finish" v-show="false">
            <span>下单成功！</span>
            <span class="go-back" @click="goBackIndex">返回首页</span>
        </div>

    </div>
</template>

<script>
    import {appConst} from "../../../global/appConst";

    export default {
        name: 'confirmTransaction',
        props: [],
        data() {
            return {
                showAgree: true,
                orderBtnStatus: false,
                projectInfo: {},
                projectData: {},
                commonList: ['China', 'Japan', 'America'],
                checklist001: [],
                orderShow: true,
                projectId: '',
                userData: {},
                type: '',
                currSkuInfo: {},
                spuType: '',
                id: ''
            }
        },
        computed: {
            bigdecimalPrice() {
                return appConst.processingMoneyFormatValue(this.currSkuInfo.price)

            }
        },
        methods: {
            init() {
                this.handleInitData()
                this.handleGetUserInfo()
                this.handleGetProDetail()
            },
            handleInitData() {
                // eslint-disable-next-line no-console
                console.log(this.$route.query)
                let query = this.$route.query
                this.currSkuInfo = query.currSkuInfo
                this.projectId = query.projectId
                this.id = query.id
                this.type = query.type
                this.projectData = query.projectData
                if (query.type === 'APARTMENT' || query.type === 'LONG_TERM_APARTMENT') {
                    this.spuType = 'BUILDING'
                } else this.spuType = this.type
            },
            handleCheckAgreement() {
                // let url = this.$appConst.apiUrl
                // let projectId = this.projectId
                // let api = `/project/${projectId}/type/${type}/preview`
                // window.open(url + api)
            },
            handleSelectChange() {
                let tagId = document.getElementById("tag-id");
                // let tagId1 = document.getElementById("tag1-id");

                if (tagId.checked) {
                    this.orderBtnStatus = true
                } else this.orderBtnStatus = false
            },
            handleConfirm() {
                this.$router.push("/confirmTransaction")
            },
            handleGetProDetail() {
                let url = `/ld/spu/front/${this.type}/${this.spuType}/list`
                let params = {
                    id: this.id
                }
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        let content = response.data.data[0]
                        this.projectInfo = content
                        if (content.attachments.length) {
                            let attachments = appConst.handleGetImgUrl(content.attachments, 'pageMap')
                            if (attachments.length) {
                                this.projectInfo.url = attachments[0].url
                            } else this.projectInfo.url = ''
                        } else this.projectInfo.url = ''
                    }
                }).catch(() => {
                })
            },
            handleGetUserInfo() {
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
            submitOrder() {
                if(this.showAgree){
                    Toast('请先同意协议!')
                }

                let projectId = this.projectId
                let id = this.currSkuInfo.id
                // eslint-disable-next-line no-console
                console.log(this.currSkuInfo)

                let projectInfo = {
                    devName: this.projectInfo.devName,
                    projectName: this.projectInfo.projectName,
                    detailsAddress: this.projectInfo.detailsAddress,
                    price: this.currSkuInfo.price
                }
                let assetsDetails = ''
                if (this.type === 'CARPORT') {
                    assetsDetails = `${this.currSkuInfo.floorNum}层 ${this.currSkuInfo.area} ${this.currSkuInfo.assetNumber} ${this.currSkuInfo.structureArea}`
                } else if (this.type === 'STOR') {
                    assetsDetails = `${this.currSkuInfo.floorNum}层 ${this.currSkuInfo.area} ${this.currSkuInfo.assetNumber} ${this.currSkuInfo.year}年 ${this.currSkuInfo.structureArea || ''}平米`
                } else {
                    assetsDetails = `${this.currSkuInfo.buildingNum}号楼 ${this.currSkuInfo.roomNumber || ''} ${this.currSkuInfo.houseNum || ''} ${this.currSkuInfo.roomType || ''} ${this.currSkuInfo.structureArea || ''}㎡`
                }

                projectInfo.assetsDetails = assetsDetails
                // projectInfo = Object.assign(projectInfo,this.currSkuInfo)
                let params = {
                    properties: projectInfo,
                    buyer: this.userData.realName,
                    mobile: this.userData.phone
                }
                if (this.type === 'CARPORT' || this.type === 'STOR') {
                    params.year = this.currSkuInfo.year
                }
                let url = `/ld/order/${projectId}/${id}/create`
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        // eslint-disable-next-line no-console
                        console.log(response)
                        this.orderShow = false
                    } else {
                        this.$global.errMsg(response.data.message)
                    }
                }).catch(() => {
                })

            },
            goBackIndex() {
                this.$router.push("/home")
            },
            agree () {
                this.showAgree = ! this.showAgree
                this.orderBtnStatus = !this.orderBtnStatus
            },
            //查看2个协议
            goRisk(type) {
                let url = `/ld/agreement/${type}/get/template/upload/file?projectId=${this.$route.query.projectId}`;
                this.$apiPost(url, {})
                    .then(response => {
                        if (response.data.status === 200 && response.data.data) {
                            let fileUrl = this.$appConst.uploadUrl
                            let api = `/query/${response.data.data.fileId}`
                            window.setTimeout(() => {
                                const newTab = window.open('')
                                newTab.location.href = fileUrl + api
                            }, 300)
                            // window.open(`https://139.9.70.191/api/files/file/query/${response.data.data.fileId}`);
                        }
                    });
            },
        },
        mounted() {
            this.init()
        },
        beforeRouteLeave(to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            sessionStorage.setItem('currSkuInfo','');
            next();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
