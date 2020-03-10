<template>
    <div class="container">
        <div class="status-card">
            <span class="status-label">订单状态：</span>
            <span class="status-value">{{$appConst.handleHouseStatus(orderStatus)}}</span>
        </div>
<!--        <div class="list-content">-->
<!--            <div class="list-content-title">-->
<!--                <span class="list-content-title-dev">{{projectInfo.devName}}</span>-->
<!--            </div>-->
<!--            <div class="list-content-title-detail">-->
<!--                <div class="list-content-title-detail">-->
<!--                    <div class="list-content-title-pic">-->
<!--                        <img width="90" height="90" :src="projectInfo.url">-->
<!--                    </div>-->
<!--                    <div class="list-content-title-project">-->
<!--                        <div class="list-content-title-project-info">-->
<!--                            <div class="list-content-title-project-name">-->
<!--                                {{allInfo.projectName}}-->
<!--                            </div>-->
<!--                            <div class="list-content-title-project-price">-->
<!--                                <div class="list-content-title-project-price-now">-->
<!--                                    ￥{{$appConst.processingMoneyFormatValue(allInfo.payment.amount)}}万-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="list-content-title-project-sub-info">-->
<!--                            <div class="list-content-title-project-sub-info-detail">-->
<!--                                {{properties.assetsDetails}}-->
<!--                            </div>-->
<!--                            <div class="list-content-title-project-sub-info-detail">-->
<!--                                {{properties.detailsAddress}}-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
       <div class="list-content">
           <div class="list-content-title">
               <span class="list-content-title-dev">请填写账户信息并选择用户类型</span>
           </div>
           <div>
               <div @click="sheetVisible = true">
                   <mt-cell placeholder="请选择用户角色" title="我是：" class="label-text" :value="type" is-link >
                       <img slot="icon" width="12" :src="require('../../../../src/assets/imgs/form/required.png')" alt />
                   </mt-cell>
               </div>
               <div class="idcard">
                   <mt-cell title="付款金额：" placeholder="请输入金额" :value="payAmount" v-model="payAmount">
                       <img slot="icon" width="12" :src="require('../../../../src/assets/imgs/form/required.png')" alt />
                       <input class="card-input" placeholder="请输入金额" v-model="payAmount"/>
                   </mt-cell>
               </div>
               <div class="idcard">
                   <mt-cell title="付款人姓名：" placeholder="请输入姓名" :value="paymentName" v-model="paymentName">
                       <img slot="icon" width="12" :src="require('../../../../src/assets/imgs/form/required.png')" alt />
                       <input class="card-input" placeholder="请输入姓名" v-model="paymentName"/>
                   </mt-cell>
               </div>
               <div class="idcard">
                   <mt-cell title="付款人身份证号：" placeholder="请输入身份证号" :value="idCard" v-model="idCard">
                       <img slot="icon" width="12" :src="require('../../../../src/assets/imgs/form/required.png')" alt />
                       <input class="card-input" placeholder="请输入身份证号" v-model="idCard"/>
                   </mt-cell>
               </div>
               <div class="idcard">
<!--                   <mt-field label="买家银行账号：" placeholder="请输入银行账号" :value="bankAccount" v-model="bankAccount">-->
<!--                   </mt-field>-->
                   <mt-cell title="买家银行账号：" placeholder="请输入银行账号" :value="bankAccount" v-model="bankAccount">
                       <input class="card-input" placeholder="请输入银行账号" v-model="bankAccount"/>
                   </mt-cell>
               </div>
               <div>
                   <mt-field label="备注：" placeholder="请输入备注" :value="buyerRemarks" v-model="buyerRemarks">
                   </mt-field>
               </div>
               <div>
                   <span class="alert-text">* 付款人信息将用于核对付款，请正确填写！</span>
               </div>
           </div>
       </div>
        <div>
            <div class="content">
                <div>
                    <div>
                        <span class="select-tag-input pop-up-agree-checkbox" @click="showAgree = !showAgree" v-show="!showAgree">
                        </span>
                        <span class="select-tag-input pop-up-agree-checkbox" @click="showAgree = !showAgree" v-show="showAgree">
                        </span>
                        同意并遵守：<span class="agreement" @click="goRisk('INTENT')">《权益期保障方案》</span><span class="agreement" @click="goRisk('RISKAJ')">《风险揭示书》</span>
<!--                        <span v-show="!showAgree" class="agreement-switch" @click="agree()">-->
<!--                            <img width="30" :src="require('../../../../src/assets/imgs/switchoff.png')" alt/>-->
<!--                        </span>-->
<!--                        <span v-show="showAgree" class="agreement-switch" @click="agree()">-->
<!--                            <img width="30" :src="require('../../../../src/assets/imgs/switchon.png')" alt/>-->
<!--                        </span>-->
                    </div>
                </div>
            </div>
        </div>
<!--        <div class="contact">-->
<!--            <span class="contact-logo">-->
<!--                <img width="20" :src="require('../../../../src/assets/imgs/contact.png')"/>-->
<!--            </span>-->
<!--            <a href="tel:18964612029">-->
<!--                <span class="contact-text">-->
<!--                    联系客服-->
<!--                </span>-->
<!--            </a>-->
<!--        </div>-->
        <div class="action">
            <div>
                <button class="action-button" @click="goBackIndex()">确认</button>
            </div>
        </div>

        <!-- 选择角色 -->
        <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
        </mt-actionsheet>
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
    import {mapGetters} from 'vuex'
    import {appConst} from "../../../global/appConst";
    import {global} from "../../../global/global";

    export default {
        name: 'orderDetail',
        props: [],
        data () {

            return {
                payAmount: '',
                paymentName: '',
                bankAccount: '',
                showQuanyi: false,
                showXieyi: false,
                buyerRemarks:'',
                idCard:'',
                orderStatus: null,
                orderId: null,
                showAgree: false,
                memberLevel: '',
                actions: [
                    {
                        name: '绿地员工',
                        method: this.setFirstOption
                    },
                    {
                        name: '绿地G优会员',
                        method: this.setSecondOption
                    },
                    {
                        name: '其他会员',
                        method: this.setThirdOption
                    }
                ],
                type: '',
                account: '',
                sheetVisible: false,
                contentInfo:{
                    project:{

                    },
                    payment:{

                    }
                },
                assetsInfo: {
                    assetName: '资产3',
                    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
                    projectName: '项目名称 户型 房型',
                    structureArea: '建筑面积',
                    devName: '开发商',
                    address: '项目地址',
                    money: '9500'
                },
                commonList: ['China', 'Japan', 'America'],
                checklist001: [],
                orderShow: true,
                allInfo: {
                    payment:{},
                    properties:{}
                },
                attachments:[],
                projectInfo: {},
                payment: {},
                properties: {},
                userData: {},
                proType: '',
                projectId: '',
            }
        },
        computed: {
            createTime: function () {
                return  appConst.handleSetTime(this.projectInfo.createTime)
            },
            ...mapGetters([
                'myOrgInfo'
            ])
        },
        methods: {
            handleConfirm () {
                this.$router.push("/confirmTransaction")
            },
            submitOrder () {
                this.orderShow = false
            },
            goBackIndex () {
                if (!this.showAgree) {
                    return this.$global.errMsg('请先同意并阅读保障方案和揭示书!')
                }
                if (!this.payAmount || this.payAmount === '') {
                    return this.$global.errMsg('付款金额未填写!')
                }
                if (!this.paymentName || this.paymentName === '') {
                    return this.$global.errMsg('付款人姓名未填写!')
                }
                if (!this.bankAccount || this.bankAccount === '') {
                    return this.$global.errMsg('买家银行账号未填写!')
                }
                if (!this.type || this.type === '') {
                    return this.$global.errMsg('用户角色未选择!')
                }

                let url = `/ld/lh/order/confirm`
                let params = {
                    orderId: parseInt(this.orderId),
                    payAmount:this.payAmount,
                    paymentName:this.paymentName,
                    idCard: this.idCard,
                    buyerRemarks: this.buyerRemarks,
                    accountName:'',
                    memberLevel: this.memberLevel,
                    bankAccount: this.bankAccount,
                    status:"BUYER_CONFIRMED",
                }
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        // eslint-disable-next-line no-console
                        this.$global.errMsg('订单确认成功!')
                        this.$router.push("/housePurchaseList")
                    } else {
                        this.$global.errMsg(response.data.message)
                    }
                }).catch(() => {
                })
            },
            handleCheckCertifiAgreement () {

                let url = `/ld/authentic_right/get/up_to_data/${this.id}`
                this.$apiPost(url).then((res) => {
                    if (res.data.status === this.$appConst.status) {
                        if (res.data.data.attachments && res.data.data.attachments[0]) {
                            // this.confirmationUrl = `${this.$apiUrl.prevUrl}${res.data.data.attachments[0].fileId}`;
                            window.open(`${this.$appConst.uploadUrl}/query/${res.data.data.attachments[0].fileId}`)
                        }
                    }
                }).catch(() => {
                })

            },
            handleGetProDetail () {

                let url = `/ld/order/list`
                let params = {
                    id: this.id,
                    owner: sessionStorage.getItem('yjgf_userId')
                }
                this.$apiPost(url,params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        let content = response.data.data.content[0]
                        this.allInfo = content
                        this.allInfo.orderStatus = appConst.orderStatus[this.allInfo['orderStatus']]
                        this.projectInfo = content.project
                        this.attachments = content.attachments
                        this.payment = content.payment
                        // this.payment.amount = appConst.processingMoneyFormatValue(this.payment.amount)
                        this.properties = content.properties
                        let attachments = this.projectInfo.attachments
                        if (attachments && attachments.length > 0) {
                            let attachmentsthis = this.$appConst.handleGetImgUrl(attachments, 'pageMap')
                            if(attachmentsthis && attachmentsthis !== '' && attachmentsthis.length > 0){
                                this.projectInfo.url = attachmentsthis[0].url
                            }else{
                                if(this.allInfo.project.type === 'STOR'){
                                    this.projectInfo.url = require('../../../../src/assets/imgs/shopList.png')
                                }else if(this.allInfo.project.type === 'LONG_TERM_APARTMENT') {
                                    this.projectInfo.url = require('../../../../src/assets/imgs/apartmentList.png')
                                }else if(this.allInfo.project.type === 'CARPORT') {
                                    this.projectInfo.url = require('../../../../src/assets/imgs/parkingList.png')
                                }else if(this.allInfo.project.type === 'APARTMENT') {
                                    this.projectInfo.url = require('../../../../src/assets/imgs/kangyangList80.png')
                                }
                            }

                        }else{
                            if(this.allInfo.project.type === 'STOR'){
                                this.projectInfo.url = require('../../../../src/assets/imgs/shopList.png')
                            }else if(this.allInfo.project.type === 'LONG_TERM_APARTMENT') {
                                this.projectInfo.url = require('../../../../src/assets/imgs/apartmentList.png')
                            }else if(this.allInfo.project.type === 'CARPORT') {
                                this.projectInfo.url = require('../../../../src/assets/imgs/parkingList.png')
                            }else if(this.allInfo.project.type === 'APARTMENT') {
                                this.projectInfo.url = require('../../../../src/assets/imgs/kangyangList80.png')
                            }
                        }
                    }
                }).catch(() => {
                })

            },
            handleGetUserInfo () {
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
            //跳转查看转让协议
            handleTransAgreement () {
                if(this.allInfo.orderStatus == '交易完成' || this.allInfo.orderStatus == '交易成功'){
                    let url = this.$appConst.apiUrl
                    // console.log(this.currOrderInfo)
                    // let postUrl = `/ld/agreement/TRADE/get/template/upload/file?projectId=${this.allInfo.project.id}`
                    let postUrl = `/ld/agreement/TRADE/get/${this.allInfo.project.id}/attachments?skuId=${this.allInfo.skuId}`

                    this.$axios.post((url + postUrl)).then((response) => {
                        if (response.data.status === this.$appConst.status) {
                            let fileUrl = this.$appConst.uploadUrl
                            let fileId = response.data.data[0].fileId
                            let api = `/query/${fileId}`

                            window.setTimeout(() => {
                                const newTab = window.open('')
                                newTab.location.href = fileUrl + api
                            }, 300)
                            // let a = window.document.createElement("a");
                            // a.target = '_blank';
                            // a.href = fileUrl + api;
                            // setTimeout(() => {
                            //     newTab.location.href = fileUrl + api
                            // }, 3000)
                        }else{
                            this.$global.errMsg('获取转让协议失败!')
                        }
                    }).catch(() => {
                    })
                }else{
                    let url = this.$appConst.apiUrl
                    let skuId = this.completeSkuId
                    let api = `/ld/agreement/TRADE/get/template/upload/file?projectId=${this.allInfo.project.id}`
                    let params = {
                        projectId: this.allInfo.project.id
                    }
                    this.$axios.post((url + api), params).then((response) => {
                        if (response.data.status === this.$appConst.status) {
                            let fileUrl = this.$appConst.uploadUrl
                            let fileId = response.data.data.fileId
                            let api = `/query/${fileId}`

                            window.setTimeout(() => {
                                const newTab = window.open('')
                                newTab.location.href = fileUrl + api
                            }, 300)
                            // let a = window.document.createElement("a");
                            // a.target = '_blank';
                            // a.href = fileUrl + api;
                            // setTimeout(() => {
                            //     newTab.location.href = fileUrl + api
                            // }, 3000)
                        }else{
                            this.$global.errMsg('获取转让协议失败!')
                        }
                    }).catch(() => {
                    })
                }

            },
            //跳转查看确权证书
            handleCheckAgreement () {
                if(this.allInfo.project.type === 'CARPORT'){
                    this.$global.errMsg('请去电脑网页端下载确权证书!');
                    return false
                }else{
                    let url = this.$appConst.apiUrl
                    // console.log(this.currOrderInfo)
                    let postUrl = `/ld/authentic_right/get/up_to_data/${this.allInfo.skuId}`

                    this.$axios.post((url + postUrl)).then((response) => {
                        if (response.data.status === this.$appConst.status) {
                            let fileUrl = this.$appConst.uploadUrl
                            let fileId = response.data.data.content[0].attachments[0].fileId
                            let api = `/query/${fileId}`

                            window.setTimeout(() => {
                                const newTab = window.open('')
                                newTab.location.href = fileUrl + api
                            }, 300)
                            // const newTab = window.open('')
                            // setTimeout(() => {
                            //     newTab.location.href = fileUrl + api
                            // }, 3000)
                        }else{
                            this.$global.errMsg('获取确权证失败!')
                        }
                    }).catch(() => {
                    })
                }

            },

            setFirstOption () {
                this.memberLevel = '绿地员工'
                this.type = '绿地员工'
            },
            setSecondOption () {
                this.memberLevel = '绿地G优会员'
                this.type = '绿地G优会员'
            },
            setThirdOption () {
                this.memberLevel = '其他客户'
                this.type = '其他客户'
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
                if(type === 'INTENT'){
                    this.showQuanyi = true
                }else if(type === 'RISKAJ'){
                    this.showXieyi = true
                }
            },
            agree () {
                this.showAgree = !this.showAgree
            }
        },
        mounted () {
            let query = this.$route.query
            this.orderStatus = query.status
            this.orderId = query.orderId
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
