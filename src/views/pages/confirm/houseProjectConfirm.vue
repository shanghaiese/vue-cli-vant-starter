<template>
    <div class="container">
        <div v-if="orderShow">
            <div class="list-content">
                <div class="list-content-title">
                    <span class="list-content-title-dev">项目详情</span>
                </div>
                <div class="list-content-title-detail">
                    <div class="list-content-title-detail">
                        <div class="list-content-title-pic" v-if="picUrl !== ''">
                            <img width="90" height="60" :src="picUrl">
                        </div>
                        <div class="list-content-title-pic" v-else>
                            <img width="90" height="60"
                                 :src="require('../../../../src/assets/imgs/house/houseList.png')">
                        </div>
                        <div class="list-content-title-project">
                            <div class="list-content-title-project-info">
                                <div class="list-content-title-project-name">
                                    {{projectName}}
                                </div>
                                <div class="list-content-title-project-price">
                                    <div class="list-content-title-project-price-now">
                                        ￥ {{price}}
                                    </div>
                                    <!--                                    <div class="list-content-title-project-price-count">-->
                                    <!--                                        * 1-->
                                    <!--                                    </div>-->
                                </div>
                            </div>
                            <div class="list-content-title-project-sub-info">
                                <div class="list-content-title-project-sub-info-detail">
                                    <p class="p2">{{developers}}</p>
                                    <p class="p2">{{propertyCompany}}</p>
                                    <p class="p2">{{address}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div>
                    <div>
                        <span class="select-tag-input pop-up-agree-checkbox" @click="agree()" v-show="showAgree">
                            <img style="margin-bottom: -3px;" width="15"
                                 :src="require('../../../../src/assets/imgs/checkbox.png')" alt/>
                        </span>
                        <span class="select-tag-input pop-up-agree-checkbox" @click="agree()" v-show="!showAgree">
                            <img style="margin-bottom: -3px;" width="15"
                                 :src="require('../../../../src/assets/imgs/checkbox01.png')" alt/>
                        </span>
                        同意并遵守：<span class="agreement" @click="goRisk('INTENT')">《权益期保障方案》</span><span class="agreement"
                                                                                                      @click="goRisk('RISKAJ')">《风险揭示书》</span>
                        <!--                        <span v-show="showAgree" class="agreement-switch" @click="agree()">-->
                        <!--                            <img width="30" :src="require('../../../../src/assets/imgs/switchoff.png')" alt/>-->
                        <!--                        </span>-->
                        <!--                        <span v-show="!showAgree" class="agreement-switch" @click="agree()">-->
                        <!--                            <img width="30" :src="require('../../../../src/assets/imgs/switchon.png')" alt/>-->
                        <!--                        </span>-->
                    </div>
                </div>
            </div>
            <div class="submit-order">
                <span style="padding: 10px">销售联系电话：<a href="tel:18964612029"><span
                        class="amount">{{phone}}</span></a></span>
                <button class="submit-button" :class="[orderBtnStatus?'':'noneActive']" @click="openPopup()">确认并下单
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
                    <div class="show-success-text">
                        <span class="pop-text">
                            意向购买成功
                        </span>
                    </div>
                    <div class="show-success-text">
                        <span class="pop-text-reason">
                            如有疑问或需求，请联系客服 18964612029
                        </span>
                    </div>
                    <!--                    <div class="login-btn">-->
                    <!--                        <button class="button-login" @click="goToLogin">完成</button>-->
                    <!--                    </div>-->
                </div>
            </div>
            <span class="go-back show-success-text" @click="goBackIndex">返回首页</span>
        </div>
        <div class="order-finish" v-show="false">
            <span>下单成功！</span>
            <span class="go-back" @click="goBackIndex">返回首页</span>
        </div>
        <!--弹窗-->
        <div>
            <div>
                <mt-popup
                        v-model="showDoubleConfirmOrder"
                        position="middle">
                    <div class="pop-up">
                        <div class="confirm-info">
                            <div class="confirm-title">意向确认</div>
                            <div>
                                <p>
                                    尊敬的{{userName}}客户，
                                </p>
                                <p>
                                    1.如您需要了解项目详情，可以联系项目销售人员：{{seller?seller:''}}，电话号码 {{phone}}；
                                </p>
                                <p>
                                    2.如您已线下签署意向购房协议并已支付意向金，请到我的-->意向确认中进行已支付意向金确认;
                                </p>
                            </div>
                        </div>
                        <div class="pop-up-agree">

                        </div>
                        <div class="pop-up-action">
                            <button class="cancel-btn" @click="showDoubleConfirmOrder=false">取消</button>
                            <button class="ok-btn" @click="submitOrder()">确认</button>
                            <!-- :disabled="!showConfirmCheckBox"-->
                        </div>
                    </div>
                </mt-popup>
            </div>
        </div>
        <!--协议-->
        <div class="showStatus" v-show="showQuanyi">
            <div>
                <div class="box" style=" margin:0 auto;">
                    <div style="tab-interval:21pt;text-justify-trim:punctuation;"><!--StartFragment-->
                    <div class="Section0" style="layout-grid:15.6000pt;">
                        <p class="MsoNormal"><span
                                style="mso-spacerun:'yes';font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:10.5000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-bottom:7.8000pt;margin-left:80.1000pt;mso-para-margin-bottom:0.5000gd;text-indent:28.2000pt;mso-char-indent-count:1.7600;line-height:150%;">
                            <b><span
                                    style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-weight:bold;font-size:16.0000pt;mso-font-kerning:1.0000pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font
                                    face="宋体">保障方案</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-weight:bold;font-size:16.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="MsoNormal"
                           style="margin-bottom:7.8000pt;margin-left:4.9500pt;mso-para-margin-bottom:0.5000gd;text-indent:18.4500pt;mso-char-indent-count:1.7600;text-align:left;line-height:150%;">
                            <span style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                    face="宋体">自购买人与项目公司签署相关认购协议并支付认购</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">金</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">之日起，至</font>2020年5月31日期间为</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">认购有效期</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">。</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-bottom:7.8000pt;margin-left:4.9500pt;mso-para-margin-bottom:0.5000gd;text-indent:18.4500pt;mso-char-indent-count:1.7600;text-align:left;line-height:150%;">
                            <span style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">1、购买人与项目公司签署相关认购协议并支付认购金之后，</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">可在</font>10天内与</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">项目</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">公司签订《商品房买卖合同》并支付首付款。逾期未签署的，若有第三方愿意购买的，</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">项目</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">公司将通知购买人，购买人在接到通知</font>3天内，仍可以约定的价格及优惠与</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">项目</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">公司签署《商品房买卖合同》，如</font>3天内</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">购买人</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">未与</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">项目公司</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">签署《商品房买卖合同》，则</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">购买人</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">应在</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">项目公司</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">通知后</font>3天内签署《放弃购买确认书》，确认书签署后，</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">项目公司</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">有权向第三方出售该房源，如</font>3天内</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">购买人</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">未签署该确认书，则视同放弃认购权益，</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">项目公司</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">有权另售。</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-bottom:7.8000pt;margin-left:4.9500pt;mso-para-margin-bottom:0.5000gd;text-indent:18.4500pt;mso-char-indent-count:1.7600;text-align:left;line-height:150%;">
                            <span style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">2、2020年5月31日前，如</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">购买人</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">与项目公司已经签署正式《商品房买卖合同》的，</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">认购有效期满后</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">，项目公司应按</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">购买人</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">所支付的认购</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">金</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">为基数，支付三个月（</font>2020年3月1日至2020年5月31日）年化8%的购房奖励金并退回认购金，或</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">购买人</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">与项目公司协商转为购房款。</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-bottom:7.8000pt;margin-left:4.9500pt;mso-para-margin-bottom:0.5000gd;text-indent:18.4500pt;mso-char-indent-count:1.7600;text-align:left;line-height:150%;">
                            <span style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">3、如截止2020年5月31日，</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">购买人</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">与项目公司未签署正式《商品房买卖合同》的，</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">认购有效期满后</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">，项目公司应按</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">购买人</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">所支付的认购金为基数，支付三个月（</font>2020年3月1日至2020年5月31日）年化8%的购房补偿金并退回认购金。</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-bottom:7.8000pt;margin-left:4.9500pt;mso-para-margin-bottom:0.5000gd;text-indent:18.4500pt;mso-char-indent-count:1.7600;text-align:left;line-height:150%;">
                            <span style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">4、上述购房奖励金或补偿金，计算时间均从2020年3月1日起，提前支付款项的均不计算奖励金或补偿金。</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-bottom:7.8000pt;margin-left:4.9500pt;mso-para-margin-bottom:0.5000gd;text-indent:18.4500pt;mso-char-indent-count:1.7600;text-align:left;line-height:150%;">
                            <span style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">5、以上信息不为信息发布人或发布平台的要约或保证，具体以认购人和项目公司签署的相关认购协议为准。</span><span
                                style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"><span
                                style="mso-spacerun:'yes';font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"><span
                                style="mso-spacerun:'yes';font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                    </div><!--EndFragment--></div>
                </div>
            </div>
            <div class="close-btn">
                <button @click="showQuanyi = false">关闭</button>
            </div>
        </div>
        <div class="showStatus" v-show="showXieyi">
            <div>
                <div class="box" style=" margin:0 auto;">
                    <div style="tab-interval:21pt;text-justify-trim:punctuation;"><!--StartFragment-->
                        <div class="Section0" style="layout-grid:15.6000pt;margin-bottom: 100px;">
                            <p class="MsoNormal" align="center"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;mso-layout-grid-align:none;layout-grid-mode:char;text-align:center;line-height:150%;">
                                <b><span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-weight:bold;font-size:15.0000pt;mso-font-kerning:0.0000pt;"><font
                                        face="宋体">风险揭示书</font></span></b><b><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-weight:bold;font-size:15.0000pt;mso-font-kerning:0.0000pt;"></span></b>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:21.2000pt;mso-char-indent-count:1.7700;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;">
                            <span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">项目公司</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">和</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">认购人</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">（以下</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">统称</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;">&nbsp;“</span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">用户</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;">”）知晓</span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">并</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">完全同意，</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">上海易涟信息技术有限公司运营管理的</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">【</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">安家宝服务平台</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">】（网址：</font>www.e-pex.com，</span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">以下简称</font>“平台”</span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">）</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">提供用户的商品房认购信息发布与展示服务</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">。用户承诺，用户已经详细阅读并完全理解本风险揭示书的全部含义，用户有能力并愿意承担全部风险。具体可能产生的风险包括但不限于以下几项：</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;">&nbsp;</span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;mso-list:l0 level1 lfo1;">
                                <!--[if !supportLists]--><span
                                    style="font-family:宋体;mso-bidi-font-family:仿宋;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><span
                                    style="mso-list:Ignore;">1、</span></span><!--[endif]--><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">平台风险：平台作为</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">项目公司商品房信息发布和展示</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">服务方，</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">仅提供技术服务，</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">并非</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">项目公司</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">的</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">销售</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">代理人，</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">不就商品房信息、认购、交易进行任何审核或保证，不承担任何责任。</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;mso-list:l0 level1 lfo1;">
                                <!--[if !supportLists]--><span
                                    style="font-family:宋体;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><span
                                    style="mso-list:Ignore;">2、</span></span><!--[endif]--><span
                                    style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">信息真实性风险：</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">平台不对</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">展示信息的真实性、</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">用户之间进行的</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">认购和</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">交易</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">行为</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">承担任何责任。</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;mso-list:l0 level1 lfo1;">
                                <!--[if !supportLists]--><span
                                    style="font-family:宋体;mso-bidi-font-family:仿宋;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><span
                                    style="mso-list:Ignore;">3、</span></span><!--[endif]--><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">提前终止风险：</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">平台面临的</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">监管政策环境变化、</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">平台本身</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">的</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">运营风险</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">等</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">均可能</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">导致展示的信息</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">被限制</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">、</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">终止</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">等，</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">平台不承担任何责任</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">。</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;">
                                <span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;">4</span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">、</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">法律风险：</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">因商品房认购、交易事项产生的任何纠纷由用户双方之间解决，与平台无关，平台不承担任何责任。</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;">
                                <span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;">5</span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">、</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">政策</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">风险：</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">如因</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">房地产政策、</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">货币政策、产业政策、区域</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">发展</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">政策</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">、</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">税收政策</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">等国家宏观政策</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">会</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">发生变化，</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">可能会对</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">商品房认购</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">产生影响乃至终止该交易。</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;">
                                <span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;">6、不可抗力风险：指由于自然灾害、战争等不可抗力因素的出现，将严重影响</span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">认购协议</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">的签署、款项支付、</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">资料保存</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">等的正常进行，对于由不可抗力风险所导致的任何损失，由用户自行承担。</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;">
                                <span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:192.0000pt;mso-char-indent-count:16.0000;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;">
                            <span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">风险揭示方：上海易涟信息技术有限公司</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:192.0000pt;mso-char-indent-count:16.0000;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;">
                                <span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:192.0000pt;mso-char-indent-count:16.0000;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;">
                                <span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal" align="justify"
                               style="margin-top:7.8000pt;margin-bottom:7.8000pt;mso-para-margin-top:0.5000gd;mso-para-margin-bottom:0.5000gd;text-indent:21.2000pt;mso-char-indent-count:1.7700;mso-layout-grid-align:none;layout-grid-mode:char;text-align:justify;text-justify:inter-ideograph;line-height:150%;">
                            <span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">用户确认</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">，</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">已经阅读</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">并知晓前述全部</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">风险</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">，并自愿</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">承担通过安家宝平台网上认购商品房</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">所产生的全部后果</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">。本确认一经作出</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">，不可撤销，对</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">用户</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                    face="宋体">产生约束力。</font></span><span
                                    style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:仿宋;line-height:150%;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                            <p class="MsoNormal"><span
                                    style="mso-spacerun:'yes';font-family:仿宋;font-size:11.0000pt;mso-font-kerning:0.0000pt;"></span>
                            </p>
                        </div><!--EndFragment--></div>
                </div>
            </div>
            <div class="close-btn">
                <button @click="showXieyi = false">关闭</button>
            </div>
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
                showQuanyi: false,
                showXieyi: false,
                picUrl: null,
                userName: '',
                seller: '',
                showDoubleConfirmOrder: false,
                showAgree: true,
                orderBtnStatus: false,
                projectInfo: {},
                projectData: {},
                commonList: ['China', 'Japan', 'America'],
                checklist001: [],
                orderShow: true,
                projectId: '',
                id: '',
                projectName: '',
                developers: '',
                propertyCompany: '',
                price: '',
                address: '',
                phone: '',
                userData: {},
                type: '',
                currSkuInfo: {},
                spuType: '',
                id: ''
            }
        },
        computed: {
            bigdecimalPrice() {
                // return appConst.processingMoneyFormatValue(this.currSkuInfo.price)

            }
        },
        methods: {
            init() {
                this.handleInitData()
                this.handleGetUserInfo()
                this.userName = sessionStorage.getItem('yjgf_userName');
            },
            handleInitData() {
                let query = this.$route.query
                this.currSkuInfo = query.currSkuInfo
                this.projectId = query.projectId
                this.projectName = query.projectName
                this.developers = query.developers
                this.propertyCompany = query.propertyCompany
                this.price = query.price
                this.phone = query.phone
                this.seller = query.seller
                this.address = query.address
                this.picUrl = query.picUrl
                this.id = query.id

                this.type = query.type
                this.projectData = query.projectData
                if (query.type === 'APARTMENT' || query.type === 'LONG_TERM_APARTMENT') {
                    this.spuType = 'BUILDING'
                } else this.spuType = this.type
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
                this.showDoubleConfirmOrder = false
                let url = '/ld/lh/order/create'
                let params = {
                    projectId: parseInt(this.id),
                }
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
            agree() {
                this.showAgree = !this.showAgree
                this.orderBtnStatus = !this.orderBtnStatus
            },
            //查看2个协议
            goRisk(type) {
                // let url = `/ld/agreement/${type}/get/template/upload/file?projectId=${this.$route.query.projectId}`;
                // let url = `/ld/agreement/${type}/get/template/upload/file`;
                // this.$apiPost(url, {})
                //     .then(response => {
                //         if (response.data.status === 200 && response.data.data) {
                //             let fileUrl = this.$appConst.uploadUrl
                //             let api = `/query/${response.data.data.fileId}`
                //             window.setTimeout(() => {
                //                 const newTab = window.open('')
                //                 newTab.location.href = fileUrl + api
                //             }, 300)
                //             // window.open(`https://139.9.70.191/api/files/file/query/${response.data.data.fileId}`);
                //         }
                //     });
                if (type === 'INTENT') {
                    this.showQuanyi = true
                } else if (type === 'RISKAJ') {
                    this.showXieyi = true
                }
            },
            openPopup() {
                if (this.showAgree) {
                    Toast('请先同意协议!')
                    return false
                }
                this.showDoubleConfirmOrder = true
            }
        },
        mounted() {
            this.init()
        },
        beforeRouteLeave(to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            sessionStorage.setItem('currSkuInfo', '');
            next();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
