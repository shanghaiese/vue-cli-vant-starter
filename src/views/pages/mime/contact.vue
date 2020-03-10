<template>
    <div>
        <div class="container">
            <div class="logo_img">
                <img class="login-logo-pic" :src="require('../../../../src/assets/imgs/logo.png')" alt/>
            </div>
            <div class="item" @click="show1=true">
                <div class="left">电话<span style="font-size:12px;margin-left:5px;">(工作时间09:00-17:00)</span></div>
                <div class="right">18964612029 ></div>
            </div>
            <div class="item" @click="show2=true">
                <div class="left">邮箱</div>
                <div class="right">service@e-pex.com ></div>
            </div>
            <div class="item" @click="show3=true">
                <div class="left">微信公众号</div>
                <div class="right"> > </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <mt-popup v-model="show1" position="bottom" popup-transition="popup-fade">
            <div class="phone_wrapper">
                <div class="wechart_wrapper">
                    <div style="margin-botton:12px;width:355px;height:57px;line-height:57px;background:rgba(255,255,255,1);border-radius:15px; color:#007AFF;font-size:20px;text-align:center;margin:0 auto 10px;">
                        <a href="tel:18964612029" style="color:#007AFF;">
                            呼叫18964612029
                        </a>
                    </div>
                    <div @click="show1=false" style="width:355px;height:57px;line-height:57px;background:rgba(255,255,255,1);border-radius:13px; color:#007AFF;font-size:20px;text-align:center;margin:0 auto 10px;">取消</div>
                </div>
            </div>
        </mt-popup>
        <mt-popup v-model="show2" position="middle" popup-transition="popup-fade">
            <div class="wechart_wrapper" style="width:300px;box-sizing:border-box;padding:40px;border-radius:4px;">
                <div style="font-size:14px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);text-align:center;">service@e-pex.com</div>
            </div>
        </mt-popup>
        <mt-popup v-model="show3" position="middle" popup-transition="popup-fade">
            <div class="wechart_wrapper" style="width:300px;border-radius:4px;">
                <div style="width:146px;height:146px;margin:56px auto 0;overflow:hidden;">
                    <img :src="require('../../../../src/assets/imgs/code@2x.png')" alt="" style="width:100%;height:100%;float:left;">
                </div>
                <div style="font-size:14px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);text-align:center;margin:20px 0 40px;">扫一扫联系微信客服</div>
            </div>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                show1: false,
                show2: false,
                show3: false
            }
        },
        created() {
        },
        methods: {
        }
    };
</script>

<style lang="less" scoped>
</style>
