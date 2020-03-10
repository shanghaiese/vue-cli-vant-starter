<template>
    <div class="login-wrap">
        <div class="logo_img">
            <img class="login-logo-pic" :src="require('../../../../src/assets/imgs/logo.png')" alt @click="goToLogin()"/>
        </div>
        <div>
            <span>手机号</span>
        </div>
        <div class="phone-input">
            <input v-model="loginForm.username" autocomplete="off"/>
        </div>
        <div>
            <span>密码</span>
        </div>
        <div class="pw-input">
            <input type="password" v-model="loginForm.password" autocomplete="new-password"/>
        </div>
<!--        <div>-->
<!--            <span>验证码</span>-->
<!--        </div>-->
<!--        <div class="pw-input">-->
<!--            <div>-->

<!--            </div>-->
<!--        </div>-->

        <div class="login-btn">
            <button @click="submitForm">登录</button>
        </div>
        <div class="login-btn">
            <span @click="handleRegister">免费注册</span>
        </div>
        <div class="forget-pwd-btn">
            <span @click="handleResetPwd">忘记密码</span>
        </div>

        <!--协议-->
        <div class="showText" v-show="showText">
        </div>
    </div>
</template>

<script>
    // import {global} from "../../global/global";

    export default {
        name: 'login',
        watch: {
            loginVerifi: {
                handler() {
                    if (this.loginForm.username && this.loginForm.password) {
                        this.loginVerifi = true
                    }
                },
                immediate: true,
                deep: true
            }
        },
        data() {
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
                fullPath: '',
                showText: false
            }
        },
        created() {
        },
        mounted() {
            this.loginForm.username = ''
            this.loginForm.password = ''
            this.loginForm.smsToken = ''
        },
        methods: {
            goToLogin () {
              this.$router.push('/home')
            },
            handleRegister() {
                this.$router.push("/register")
            },
            handleResetPwd() {
                this.$router.push("/forgetPassWord")
            },
            submitForm() {
                let self = this
                if (!this.loginForm.username || !this.loginForm.password) {
                    return global.errMsg('手机号或密码未填!')
                }
                let url = this.$appConst.userUrl + '/api/v1.0/token/new'
                self.$axios.post(url, {
                    'userName': self.loginForm.username,
                    'pwd': self.loginForm.password,
                    'sys': 'ldqyb',
                    'subsystems': ['ldqyb'],
                    smsToken: '23',
                    smsCode: '233900'
                }).then(response => {
                    // eslint-disable-next-line no-console
                    console.log(response, 'data')
                    let {data} = response
                    if (response.status !== 200) return this.$global.errMsg('登录失败!')
                    // if (data.data.user.type.value !== 'INDIVIDUAL') {
                    //     return this.$global.errMsg('此用户无权限登录系统!')
                    // }
                    this.$global.errMsg('登录成功!')
                    sessionStorage.setItem('userName', data.data.user.username)
                    sessionStorage.setItem('yjgf_userId', data.data.user.id)
                    sessionStorage.setItem('yjgf_access_token', data.data.token)
                    sessionStorage.setItem('yjgf_orgId', data.data.user.orgId)
                    sessionStorage.setItem('yjgf_userName', data.data.user.username)
                    sessionStorage.setItem('orgName', data.data.user.orgName)
                    sessionStorage.setItem('authorities', data.data.authorities)
                    sessionStorage.setItem('type', data.data.user.type.value)
                    sessionStorage.setItem('verified', data.data.user.verified)
                    this.$store.commit('SET_LOGIN_STATUS', true)
                    this.$store.commit('SET_MY_ORGNAME', data.data)

                    // if (this.fullPath === '/register') {
                    //     this.$router.push("/home")
                    // } else {
                    //     this.$router.go(-1)
                    // }
                    this.$router.push("/home")
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err)
                })
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.fullPath = from.fullPath
            })
        },

    }
</script>

<style scoped lang="less">


</style>
