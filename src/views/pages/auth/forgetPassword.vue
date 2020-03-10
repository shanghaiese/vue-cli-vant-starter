<template>
    <div class="container">
        <div class="logo_img">
            <img class="login-logo-pic" :src="require('../../../../src/assets/imgs/logo.png')" alt  @click="goToLogin()"/>
        </div>
        <div>
            <label class="label">手机号</label>
        </div>
        <div class="phone-input">
            <input v-model="loginForm.phone" autocomplete="off"/><!--placeholder="请输入手机号"-->
            <span v-show="countDownShow">{{count}}秒后重新发送</span>
            <span v-show="!countDownShow" @click="handleGetVeriCode">获取验证码</span>
        </div>
        <div>
            <label class="label">验证码</label>
        </div>
        <div class="pw-input">
            <input v-model="loginForm.smsCode" type="hidden" autocomplete="off"/>
            <input v-model="loginForm.smsCode"  autocomplete="off" placeholder=""/><!--placeholder="请输入验证码"-->
        </div>
        <div>
            <label class="label">新密码</label>
        </div>
        <div class="pw-input">
            <input type="password" v-model="loginForm.password"  autocomplete="new-password"/><!--placeholder="请输入登录密码"-->
        </div>
        <div>
            <label class="label">确认密码</label>
        </div>
        <div class="pw-input">
            <input type="password" v-model="loginForm.againPassword"  autocomplete="new-password"/><!--placeholder="请输入登录密码"-->
        </div>
        <div class="login-btn">
            <button @click="submitForm">确认并重置密码</button>
        </div>
        <div class="login-btn float-left" v-show="showIfLogin">
            <span @click="handleLogin">
                <span class="color-link">去登陆</span>
                <span class="color-basic">已有账号,</span>
            </span>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'login',
        data() {
            return {
                loginForm: {
                    phone: '',
                    password: '',
                    smsCode: '',
                    againPassword: '',
                    smsToken: '"Bearer eyJhbGciOiJIUzI1NiJ9.eyJVSUQiOiJmZjgwODA4MTY3ODc2MDUxMDE2Nzg3NjBjYjYxMDAyMyIsIk9OQSI6IuaYk-ingeiCoeS7vSIsIk9SIjoiUExBVEZPUk0iLCJVQVMiOiJSUixSLFBMQVRGT1JNIiwiVU4iOiJyb290IiwiT0lEIjoiYWMxZDkxMWYtYzFiOS00ZGRkLTg0YzUtODhmNjQ2MDcwMjhoIiwiZXhwIjoxNTQ0NTk4NzEwfQ.GcSpGsI5ywamxOwYXtErIJmhZKfF06qBsl7a16rs7VU"'
                },
                loginFormRules: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入新密码', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'}
                    ]
                },
                loading: false,
                countDownShow: false,
                uid: '',
                count: '',
                verificationCode: '',
                timer: null,
                showIfLogin: false
            }
        },
        created() {
        },
        mounted() {
            this.loginForm.phone = ''
            this.loginForm.password = ''
            this.loginForm.smsToken = ''
            this.loginForm.smsCode = ''
            this.loginForm.password = ''
            this.loginForm.againPassword = ''
            if(sessionStorage.getItem('yjgf_userId') && sessionStorage.getItem('yjgf_access_token')) {
                this.showIfLogin = false
            } else {
                this.showIfLogin = true
            }
        },
        methods: {
            goToLogin () {
                this.$router.push('/home')
                // if(sessionStorage.getItem('yjgf_userId') && sessionStorage.getItem('yjgf_access_token')) {
                //     return false
                // }else{
                //     this.$router.push('/home')
                // }
            },
            handleRegister() {
                this.$router.push("/register")
            },
            handleGetVeriCode() {
                let self = this
                let url = this.$appConst.registerUrl + '/sms/v1.0/sendSms';

                let phoneCodeVerification = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
                if (!this.loginForm.phone.length) return this.$global.errMsg('请输入手机号!')
                if (!phoneCodeVerification.test(this.loginForm.phone)) return this.$global.errMsg('手机号格式错误!')
                self.$axios.post(url, {
                    'mobile': this.loginForm.phone,
                    'smsType': "CAPTCHA_SMS"
                }).then(response => {
                    // eslint-disable-next-line no-console
                    if (response.status !== 200) return this.$global.errMsg('获取验证码失败!')
                    this.$global.errMsg('获取验证码发送成功!')
                    this.uid = response.data.data.uid
                    this.getCode()
                }).catch(err => {
                    this.$global.errMsg(err.data.message)
                })
            },
            getCode() {
                const TIME_COUNT = 60
                if (!this.timer) {
                    this.count = TIME_COUNT
                    this.countDownShow = true
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--
                        } else {
                            this.countDownShow = false
                            clearInterval(this.timer)
                            this.timer = null
                        }
                    }, 1000)
                }
            },
            handleCheckSmsMsg() {
                if (this.loginForm.phone == '') return this.$global.errMsg('请填写手机号!')
                if (this.loginForm.smsCode == '') return this.$global.errMsg('请填写验证码!')
                if (this.loginForm.password == '' || this.loginForm.againPassword == '') return this.$global.errMsg('请填写新密码或确认密码!')
                if (this.loginForm.password !== this.loginForm.againPassword) return this.$global.errMsg('登录密码和确认密码不一致，请重新填写!')
                let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,12}$/;
                if (!reg.test(this.loginForm.password)) return this.$global.errMsg('请输入包含大小写字母，数字的6~16位密码!')
                if (!reg.test(this.loginForm.againPassword)) return this.$global.errMsg('请输入包含大小写字母，数字6~16位确认密码!')
                let self = this
                let url = this.$appConst.userUrl + '/api/v1.0/user/reset-password';
                self.$axios.post(url, {
                    // 'content': this.verificationCode,
                    // 'uid': this.uid,
                    'newPassword': this.loginForm.password,
                    'phone': this.loginForm.phone,
                    'smsCode': this.loginForm.smsCode,
                    // 'smsToken': this.loginForm.smsToken
                    'smsToken': this.uid
                }).then(response => {
                    // eslint-disable-next-line no-console
                    // console.log(response.data.data, 'data')
                    if (response.status === 200) {
                        let result = response.data.data
                        if (result) {
                            this.$global.errMsg('修改密码成功！请重新登录')
                            this.$router.push('/login')
                        } else {
                            this.$global.errMsg('验证码校验失败！')
                        }
                    }
                }).catch(err => {
                    this.$global.errMsg(err.data.message)
                })
            },
            submitForm() {
                this.handleCheckSmsMsg()
            },
            handleLogin() {
                this.$router.push("/login")
            },
        }
    }
</script>

<style scoped lang="less">

</style>
