<template>
    <div class="container">
        <div class="content-item">
            <span>注册手机号</span>
            <span class="detail-right">{{userData.phone}}</span>
        </div>
        <div class="content-item">
            <span>姓名</span>
            <span class="detail-right">{{userData.realName}}</span>
        </div>
        <div class="content-item">
            <span>身份证</span>
            <span class="detail-right">{{userData.idCardNo}}</span>
        </div>
        <!--        <div class="content-item">-->
        <!--            <span>银行卡号</span>-->
        <!--            <span class="detail-right">622484*******3336</span>-->
        <!--        </div>-->
        <!--        <div class="content-item">-->
        <!--            <span>银行预留手机号</span>-->
        <!--            <span class="detail-right">150****0000</span>-->
        <!--        </div>-->
        <div class="content-item id">
            <span>身份证信息</span>
        </div>
        <div class="id-info" v-show="userData.verified">
            <div v-if="userData.attachments && userData.attachments.length !== 0 && userData.attachments[0].fileId && userData.attachments[1].fileId">
                <img class="car-img m-r-10"
                     v-for="item in userData.attachments"
                     :key="item.uid"
                     :src="downUrl+item.fileId" alt="" />
            </div>
            <div v-else>
                <img class="car-img m-r-10"
                     v-for="item in imgList"
                     :key="item.id"
                     :src="item.url" alt="" />
            </div>
        </div>
        <div class="id-info" v-show="showUnVerified">
            <!--            <img src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg">-->
            <!--            <img src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg">-->
            <span class="tag-unverified">未实名认证</span>
        </div>
        <div v-show="showValid" class="auth-button">
            <button type="default" @click="goToAuth()">去实名认证</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'userInfo',
        props: [],
        data() {
            return {
                userData: {},
                downUrl: this.$appConst.uploadUrl + '/query/',
                showValid: false,
                showUnVerified: false,
                imgList: [
                    {
                        id: 1,
                        url:require('../../../../src/assets/imgs/huicui/icDentifiedBottom.png')
                    },
                    {
                        id: 2,
                        url:require('../../../../src/assets/imgs/huicui/icDentifiedUpper.png')
                    }
                ]
            }
        },
        computed: {
            ...mapGetters([
                'myOrgInfo'
            ])
        },
        methods: {
            init() {
                this.handleGetUserInfo()
            },
            handleGetUserInfo() {
                let userUrl = this.$appConst.userUrl
                let id = sessionStorage.getItem('yjgf_userId')

                let url = `/api/v1.0/user/${id}`
                this.$axios.get(userUrl + url).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        let content = response.data.data
                        this.userData = content
                        if(content.verified){
                            this.showValid = false
                            this.showUnVerified = false
                        }else{
                            this.showValid = true
                            this.showUnVerified = true
                        }
                    }
                }).catch(() => {
                })
            },
            showToast () {
                this.$global.errMsg('请前去网页端做实名认证！')
            },
            goToAuth () {
                this.$router.push('/authentication')
            }

        },
        mounted() {
            this.init()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
