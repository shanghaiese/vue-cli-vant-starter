<template>
    <div class="container">
        <div class="login-wrap">
            <div>
                <span>
                    <img class="logo-img" width="35" height="35" :src="require('../../../assets/imgs/valid.png')">
                </span>
            </div>
            <div>
                <span class="pop-text">
                    认证成功
                </span>
            </div>
            <div class="login-btn">
                <button @click="goToLogin">首页</button>
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
                showFail: false
            }
        },
        methods: {
            goToLogin () {
                this.$router.push("/home")
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
