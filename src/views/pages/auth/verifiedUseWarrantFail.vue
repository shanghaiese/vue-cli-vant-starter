<template>
    <div class="container">
        <div class="login-wrap">
            <div>
                <span>
                    <img class="logo-img" width="35" height="35" :src="require('../../../../src/assets/imgs/fail.png')">
                </span>
            </div>
            <div>
                <span class="pop-text">
                    认证失败
                </span>
            </div>
            <div>
                <span class="pop-text-reason">
                    有疑问，
                    <span >
                       <a href="tel:18964612029" class="pop-text-contact-tel">
                           请联系客服
                       </a>
                    </span>
                </span>
            </div>
<!--            <div>-->
<!--                <span class="pop-text-reason">-->
<!--                    失败原因：{{message}}-->
<!--                </span>-->
<!--            </div>-->
            <div class="login-btn">
                <button class="button-login" @click="goToLogin">首页</button>
                <button class="button-back" @click="goBack">立即修改</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                showSuccess: false,
                showFail: false,
                message:'因为证件不清晰,请重新上传证件'
            }
        },
        methods: {
            goToLogin () {
                this.$router.push("/home")
            },
            goBack () {
                this.$router.push("/authentication")
            },
        },
        created () {
        },
        mounted () {

        }
    }
</script>

<style scoped lang="less">

</style>
