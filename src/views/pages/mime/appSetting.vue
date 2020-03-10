<template>
    <div class="container">
        <div @click="goToForgetPwd()" style="border-bottom: 1px solid #E3E3E3;padding-top: 5px;padding-bottom: 5px">
            <mt-cell title="修改登录密码" value="" is-link >
            </mt-cell>
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
                downUrl: this.$appConst.uploadUrl + '/query/'
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
                    }
                }).catch(() => {
                })
            },
            showToast () {
                this.$global.errMsg('请前去网页端做实名认证！')
            },
            goToForgetPwd () {
                this.$router.push('/forgetPassWord')
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
