<template>
    <div class="login-wrap">
        <div class="logo_img">
            <img class="login-logo-pic" :src="require('../../../src/assets/imgs/logo.png')" alt/>
        </div>
        <div>
            <span class="success-info">
                <img width="25" height="25" :src="require('../../assets/imgs/valid.png')">
            </span>
            <span class="success-info">您已成功设置密码，请试用新密码登录</span>
        </div>

        <div class="login-btn">
            <button @click="goToLogin">马上登录</button>
        </div>
    </div>
</template>

<script>
    import {global} from "../../global/global";

    export default {
        name: 'login',
        watch: {
            loginVerifi: {
                handler () {
                    if (this.loginForm.username && this.loginForm.password) {
                        this.loginVerifi = true
                    }
                },
                immediate: true,
                deep: true
            }
        },
        data () {
            return {
                loginVerifi: false,
                loginForm: {
                    username: '',
                    password: '',
                    smsToken: '"Bearer eyJhbGciOiJIUzI1NiJ9.eyJVSUQiOiJmZjgwODA4MTY3ODc2MDUxMDE2Nzg3NjBjYjYxMDAyMyIsIk9OQSI6IuaYk-ingeiCoeS7vSIsIk9SIjoiUExBVEZPUk0iLCJVQVMiOiJSUixSLFBMQVRGT1JNIiwiVU4iOiJyb290IiwiT0lEIjoiYWMxZDkxMWYtYzFiOS00ZGRkLTg0YzUtODhmNjQ2MDcwMjhoIiwiZXhwIjoxNTQ0NTk4NzEwfQ.GcSpGsI5ywamxOwYXtErIJmhZKfF06qBsl7a16rs7VU"'
                },
                loginFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                loading: false,
                fullPath:''
            }
        },
        created () {
        },
        mounted () {
        },
        methods: {
            goToLogin () {
                this.$router.push("/login")
            }
        }

    }
</script>

<style scoped lang="less">

</style>
