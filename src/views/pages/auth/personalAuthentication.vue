<template>
    <div>
        <div class="container">
            <div class="logo_img">
                <img class="login-logo-pic" :src="require('../../../../src/assets/imgs/logo.png')" alt/>
            </div>
            <div>
                <label class="label"><span class="required">*</span>注册手机号</label>
            </div>
            <div class="phone-input">
                <input style="width:100%;" v-model="authForm.phone" disabled="true" maxlength="20"/>
            </div>
            <div>
                <label class="label"><span class="required">*</span>姓名</label>
            </div>
            <div class="phone-input">
                <input style="width:100%;" v-model="authForm.name" /> <!--placeholder="请输入真实姓名"-->
            </div>
            <div>
                <label class="label"><span class="required">*</span>身份证号</label>
            </div>
            <div class="phone-input">
                <input style="width:100%;" v-model="authForm.icCard" /> <!--placeholder="请输入身份证号"-->
            </div>
            <div>

            </div>
            <div class="file-upload">
                <div>
                    <div class="select tc">
                        <label for="upload">身份证正面上传</label>
                        <input type="file" id="upload" multiple="multiple" accpet="image/*" capture="camera" @change="changeUpper()">
                    </div>
                    <div class="preview">
                        <img class="previewImg" :src="require('../../../../src/assets/imgs/ICUpper.png')">
                        <!--<img :src="upperPicUrl">-->
                    </div>
                </div>
                <div>
                    <div class="select tc">
                        <label for="upload2">身份证反面上传</label>
                        <input type="file" id="upload2" multiple="multiple" accpet="image/*" capture="camera" @change="changeBottom()">
                    </div>
                    <div class="preview2">
                        <img class="previewImg2" :src="require('../../../../src/assets/imgs/ICBottom.png')">
                        <!--<img :src="bottomPicUrl">-->
                    </div>

                </div>
            </div>
            <div class="agreement">
                <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox"
                      v-show="showConfirmCheckBox">
                    <img style="margin-bottom: -2px" width="15" :src="require('../../../../src/assets/imgs/checkbox.png')" alt/>
                </span>
                    <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox"
                          v-show="!showConfirmCheckBox">
                    <img width="15" style="margin-bottom: -2px" :src="require('../../../../src/assets/imgs/checkbox01.png')" alt/>
                </span>
                我已阅读并同意：<span @click="showXieyi=true">《数字认证协议》</span>、<span @click="showZhengce=true">《权易宝隐私政策》</span>
            </div>
            <div class="login-btn">
                <button @click="apply()">提交认证申请</button>
            </div>

            <!--状态-->
            <mt-popup class="showStatus" v-show="showSuccess" position="top">
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
                    <div class="pop-button">
                        <button @click="goToLogin">首页</button>
                    </div>
                </div>
            </mt-popup>
            <div class="showStatus" v-show="showFail">
                <div>
                <span>
                    <img class="logo-img" width="25" height="25" :src="require('../../../../src/assets/imgs/fail.png')">
                </span>
                </div>
                <div>
                <span class="pop-text">
                    认证失败
                </span>
                </div>
                <div class="login-btn">
                    <button @click="goToLogin">首页</button>
                    <button @click="closePop">返回修改</button>
                </div>
            </div>
        </div>
        <!--数字认证协议-->
        <div class="showStatus" v-show="showXieyi">
            <div class="box" style="margin:0 auto 60px 0;">
                <div style="tab-interval:21pt; text-justify-trim:punctuation; ">
                    <!--StartFragment-->
                    <div class="Section0" style="layout-grid:15.6000pt;">
                        <h1 align="center"
                            style="margin-bottom:7.8000pt;text-indent:0.0000pt;mso-char-indent-count:0.0000;text-align:center;"><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:15.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">数字证书服务协议</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:15.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </h1>
                        <p class="MsoNormal" style="text-indent:0.0000pt;mso-char-indent-count:0.0000;mso-outline-level:1;"><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">特别提示</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="MsoNormal"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">欢迎用户（以下简称</font>“用户”或“您”）申请数字证书并用于【权易宝资产数字化服务平台】（以下简称“权易宝服务平台”，其运营者为上海易涟信息技术有限公司，简称为“权易宝”）服务。在使用数字证书之前，您应当认真阅读并遵守《数字证书服务协议》（以下简称“本协议”），</span><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、争议解决和法律适用条款，您应重点阅读。</font></span></u></b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">如您对协议有任何疑问的，应向【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】咨询。</font></span><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，或您按照安全认证页面提示填写信息、阅读并同意本协议且完成全部激活程序后，或您以其他权易宝允许的方式实际使用权易宝服务平台服务时，即表示您已充分阅读、理解并接受本协议的全部内容，并与【</font></span></u></b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）</font></span><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">】达成协议。</font></span></u></b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您承诺接受并遵守本协议的约定，届时</font></span><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您不得以未阅读本协议的内容等理由，主张本协议无效，或要求撤销本协议。</font></span></u></b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="p" style="margin-bottom:7.8000pt;"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                face="宋体">数字证书的制作方为【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】，【北京世纪速码公司（英文缩写</font><font
                                face="Times New Roman">CSCA</font><font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】是经国家密码管理局、工业和信息化部批准的权威的、合法的、公正的第三方电子认证服务机构，是可以信赖的、专业的信息安全服务机构。【北京世纪速码公司（英文缩写</font><font
                                face="Times New Roman">CSCA</font><font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】作为【北京世纪速码公司（英文缩写</font><font
                                face="Times New Roman">CSCA</font><font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】授权电子认证服务商，负责审核用户身份和证书颁发、升级等。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                        </p>
                        <p class="p" style="margin-bottom:7.8000pt;"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                face="宋体">您通过权易宝服务平台使用数字证书获得电子签名信任服务，成为【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】电子认证体系不可分割的部分；</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                        </p>
                        <p class="p" style="margin-bottom:7.8000pt;"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:0.0000pt;"><font
                                face="宋体">为进一步明确双方的权利、义务，根据《中华人民共和国电子签名法》、《电子认证服务管理办法》的规定，签订如下协议：</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:0.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:21.2500pt;text-indent:-21.2500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level1 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">1<span>&nbsp;</span></span></span><!--[endif]--><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">名词解释</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">1.1<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">订户：指从【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font face="Times New Roman">CFCA</font><font
                                face="宋体">）】数字认证中心获得证书的个人、组织机构。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">1.2<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">数字证书：是指一段信息，它至少包含了一个名字，标识特定的</font>CA<font face="宋体">或标识特定的订户，包含了订户的公钥、证书有效期、证书序列号，及</font><font
                                face="Times New Roman">CA</font><font face="宋体">数字签名。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">1.3<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书私钥：数字证书包含证书本身和一个密钥对，密钥对的一部分是公钥，另一部分称为私钥。公钥公之于众，谁都可以使用。私钥只有自己知道，一般信息都是由公钥进行加密，相对应的私钥进行解密。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">1.4<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">权易宝服务平台：指域名为</font>“</span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;">e-pex.com</span><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;">”的网站，即权易宝基于信息化、电子化的技术手段为用户提供康养公寓会籍、车位使用权、长租公寓及商铺相关权益等资产提供交易平台服务。</span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">1.5<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">权易宝：权易宝服务平台的运营者，上海易涟信息技术有限公司。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:21.2500pt;text-indent:-21.2500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level1 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">2<span>&nbsp;</span></span></span><!--[endif]--><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">数字证书的使用</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">2.1<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您应按照【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font face="Times New Roman">CFCA</font><font
                                face="宋体">）】规定的证书申请流程向权易宝提供有关资料，并保证所填写的注册信息和所提供的资料的真实性、准确性和完整性，否则权易宝或【北京世纪速码公司（英文缩写</font><font
                                face="Times New Roman">CSCA</font><font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】有权拒绝您的申请请求。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">2.2<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】提供的数字证书服务符合《中华人民共和国电子签名法》的相关规定。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">2.3<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您的证书信息在证书有效期限内变更的，应当及时书面告知权易宝和【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】，并终止使用该证书。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">2.4<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您同意权易宝及【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】向有关部门和个人核实您的信息。权易宝及【北京世纪速码公司（英文缩写</font><font
                                face="Times New Roman">CSCA</font><font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】应合法地收集、处理、传递及应用您的资料，按照国家有关规定及本协议的约定予以保密。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">2.5<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您对证书享有独立的使用权。您使用证书产生的权利，由您享有；您使用证书产生的义务、责任，由您承担。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">2.6<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您同意并确认，【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】以电子签章的形式对协议内容进行确认，且【北京世纪速码公司（英文缩写</font><font
                                face="Times New Roman">CSCA</font><font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】将使用电子签章的协议保存在权易宝服务平台上；您已对该协议所有内容理解确认，并同意履行协议全部内容，并不因其签章形式否认其法律效力。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:21.2500pt;text-indent:-21.2500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level1 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">3<span>&nbsp;</span></span></span><!--[endif]--><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">数字证书的限制</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;text-decoration:none;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">3.1<span>&nbsp;</span></span></span><!--[endif]--><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">本证书只能在数字证书有效期限内、在权易宝服务平台上使用。</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;text-decoration:none;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">3.2<span>&nbsp;</span></span></span><!--[endif]--><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书有效期限届满，您需要继续使用的，应当及时办理证书更新手续。</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;text-decoration:none;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">3.3<span>&nbsp;</span></span></span><!--[endif]--><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您应当妥善保管证书私钥。因您原因致使证书私钥泄露、损毁或者丢失的，损失由您承担。</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;text-decoration:none;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">3.4<span>&nbsp;</span></span></span><!--[endif]--><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书私钥在证书有效期内损毁、丢失、泄露的，您应当及时申请办理吊销手续。吊销自手续办妥时起生效。吊销生效前发生的损失由您承担。</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo2;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;text-decoration:none;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">3.5<span>&nbsp;</span></span></span><!--[endif]--><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您知悉证书私钥已经丢失或者可能已经丢失时，应当及时告知权易宝及【</font></span></u></b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）</font></span><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">】，协助完成吊销该证书的工作，并终止使用该证书。</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:21.2500pt;text-indent:-21.2500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level1 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">4<span>&nbsp;</span></span></span><!--[endif]--><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">数字证书的吊销</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="MsoNormal" style="margin-left:21.2500pt;text-indent:0.0000pt;mso-char-indent-count:0.0000;"><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您有下列情形之一，【</font></span></u></b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）</font></span><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">】有权吊销证书并不承担任何责任。由此给【电子签章服务机构名称】造成损失的，您应当向【电子签章服务机构名称】承担赔偿责任：</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">4.1<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您向权易宝提供的资料或者信息不真实、不完整或者不准确的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">4.2<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您证书的信息有变更，未终止使用该证书并通知权易宝及【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">4.3<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您知悉证书私钥已经丢失或者可能已经丢失时，未终止使用该证书并通知权易宝及【北京世纪速码公司（英文缩写</font>CSCA<font
                                face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font face="Times New Roman">CFCA</font><font
                                face="宋体">）】的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">4.4<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您超过证书的有效期限及应用范围使用证书的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">4.5<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您使用证书用于违法、犯罪活动的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:21.2500pt;text-indent:-21.2500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level1 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">5<span>&nbsp;</span></span></span><!--[endif]--><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">责任承担与限制</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">5.1<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】有下列情形的，【北京世纪速码公司（英文缩写</font><font face="Times New Roman">CSCA</font><font
                                face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font face="Times New Roman">CFCA</font><font face="宋体">）】应向您承担赔偿责任：</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:85.0500pt;text-indent:-35.4500pt;mso-char-indent-count:0.0000;mso-list:l1 level3 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">5.1.1<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">由于【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】的原因导致证书私钥被破译、窃取，致使您遭受损失的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;text-decoration:none;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">5.2<span>&nbsp;</span></span></span><!--[endif]--><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">因设备故障、电力故障及通讯故障或者电脑病毒、自然灾害等因素造成您损失的，【</font></span></u></b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）</font></span><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">】不承担任何责任。</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:21.2500pt;text-indent:-21.2500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level1 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">6<span>&nbsp;</span></span></span><!--[endif]--><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">信息保护</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="MsoNormal" style="margin-left:21.2500pt;text-indent:0.0000pt;mso-char-indent-count:0.0000;"><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">【</font></span></u></b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）</font></span><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">】将根据国家有关法律的规定，依从严谨、安全的保密原则，妥善保管您提交的资料。除下列情形外，【</font></span></u></b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）</font></span><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">】不会向第三方泄露您的资料：</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">6.1<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">经过您同意提供的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">6.2<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">根据执法单位的要求或为公共目的向相关单位提供的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">6.3<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">根据有关法律、法规、证券交易所规则等要求向政府、证券交易所或其他监管机构、【北京世纪速码公司（英文缩写</font>CSCA<font
                                face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font face="Times New Roman">CFCA</font><font face="宋体">）】的法律、会计、商业及其他顾问、雇员提供的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">6.4<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">其他【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】依法应当提供的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:21.2500pt;text-indent:-21.2500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level1 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">7<span>&nbsp;</span></span></span><!--[endif]--><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">协议的期限和终止</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">7.1<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">本协议的有效期限为证书的有效期限。证书期限届满，您更新证书的，本协议有效期限顺延至证书更新期限届满日。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">7.2<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">有下列情形之一的，本协议终止：</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:85.0500pt;text-indent:-35.4500pt;mso-char-indent-count:0.0000;mso-list:l1 level3 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">7.2.1<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您的证书期限届满。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:85.0500pt;text-indent:-35.4500pt;mso-char-indent-count:0.0000;mso-list:l1 level3 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">7.2.2<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您的证书被吊销。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:85.0500pt;text-indent:-35.4500pt;mso-char-indent-count:0.0000;mso-list:l1 level3 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">7.2.3<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您向【北京世纪速码公司（英文缩写</font>CSCA<font face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font
                                face="Times New Roman">CFCA</font><font face="宋体">）】申请终止本协议，【北京世纪速码公司（英文缩写</font><font face="Times New Roman">CSCA</font><font
                                face="宋体">）、中金金融认证中心有限公司（英文缩写</font><font face="Times New Roman">CFCA</font><font face="宋体">）】同意的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:85.0500pt;text-indent:-35.4500pt;mso-char-indent-count:0.0000;mso-list:l1 level3 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">7.2.4<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">双方协商终止本协议的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:85.0500pt;text-indent:-35.4500pt;mso-char-indent-count:0.0000;mso-list:l1 level3 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">7.2.5<span>&nbsp;</span></span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">依据法律、法规等规定，本协议应当终止的。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:21.2500pt;text-indent:-21.2500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level1 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">8<span>&nbsp;</span></span></span><!--[endif]--><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">争议解决</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="MsoNormal" style="margin-left:21.2500pt;text-indent:0.0000pt;mso-char-indent-count:0.0000;"><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">在本协议履行过程中，如发生任何争议或纠纷，若无法协商一致的，若协商解决未果，任何一方均有权将有关争议提交由上海仲裁委员会按照其届时有效的仲裁规则予以仲裁，仲裁裁决是终局的且对双方均具有约束力。</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:21.2500pt;text-indent:-21.2500pt;mso-char-indent-count:0.0000;mso-outline-level:1;mso-list:l1 level1 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">9<span>&nbsp;</span></span></span><!--[endif]--><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">其他</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;text-decoration:none;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">9.1<span>&nbsp;</span></span></span><!--[endif]--><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您确认已全部阅读、理解并确认《数字证书服务申请须知》，申请成功后您立即使用证书签署《数字证书服务协议》；</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="23"
                           style="margin-bottom:7.8000pt;margin-left:49.6000pt;text-indent:-28.3500pt;mso-char-indent-count:0.0000;mso-list:l1 level2 lfo1;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:normal;text-decoration:none;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">9.2<span>&nbsp;</span></span></span><!--[endif]--><b><u><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">您声明申请证书时提交的资料真实完整有效，并承诺认可使用数字证书签署的所有电子文书，承担使用数字证书所产生的一切法律责任。</font></span></u></b><b><u><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></u></b>
                        </p>
                        <p class="MsoNormal"><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;">&nbsp;</o:p></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-bottom:0.0000pt;mso-para-margin-bottom:0.0000gd;text-indent:0.0000pt;mso-char-indent-count:0.0000;mso-pagination:widow-orphan;text-align:left;">
                            <b><span
                                    style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><br
                                    clear="all" style="page-break-before:always"></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="MsoNormal" style="text-indent:0.0000pt;mso-char-indent-count:0.0000;text-align:left;"><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">附：《数字证书服务申请须知》</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </p>
                        <p class="MsoNormal"><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;">&nbsp;</o:p></span>
                        </p>
                        <h1 align="center"
                            style="margin-bottom:7.8000pt;text-indent:0.0000pt;mso-char-indent-count:0.0000;text-align:center;"><b><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:15.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">数字证书服务申请须知</font></span></b><b><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:15.0000pt;mso-font-kerning:1.0000pt;"></span></b>
                        </h1>
                        <p class="24" style="text-indent:18.0000pt;"><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:9.0000pt;mso-font-kerning:1.0000pt;">&nbsp;</o:p></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">一、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">数字证书订户（包括订户本人和</font>/<font face="宋体">或其授权代理人）在申请数字证书时，应提供真实、完整和准确的信息及证明材料</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';color:rgb(255,0,0);font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">。</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">如因故意或过失未向【电子签章服务机构名称】</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:华文楷体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">或业务受理单位</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">提供真实、完整和准确的信息，导致【电子签章服务机构名称】签发证书错误或邮寄错误，订户应承担由此造成的相关各方损失。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">二、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">【电子签章服务机构名称】</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:华文楷体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">负责</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">及时受理各证书业务受理单位提交的证书申请业务请求，通过【电子签章服务机构名称】自有的数字证书认证系统及时为通过审核的订户签发证书。如果由于设备或网络故障而导致签发数字证书错误、延迟、中断或者无法签发，【电子签章服务机构名称】不承担任何赔偿责任。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">三、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">【电子签章服务机构名称】签发的数字证书必须用于《电子认证业务规则》和《证书策略》规定的用途，不能用于《电子认证业务规则》和《证书策略》规定外的其他任何用途，【电子签章服务机构名称】不承担因数字证书用于其他用途而产生的法律责任。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">四、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">【电子签章服务机构名称】认定：所有使用数字证书在网上交易和网上作业中的活动均为证书订户所为。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">五、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书订户应妥善保管【电子签章服务机构名称】签发的数字证书私钥存储介质及其保护口令，不得交付或告之他人。证书订户因丢失、转让、转借或其他故意、过失等行为而产生的一切责任均由</font></span><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';color:rgb(0,0,0);font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书订户自行负责。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;color:rgb(0,0,0);font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">六、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书订户必须保证数字证书私钥的安全，【电子签章服务机构名称】不承担因证书订户的私钥保存出现问题而产生的所有法律责任。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">七、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">【电子签章服务机构名称】承诺，在现有的技术条件下，由【电子签章服务机构名称】签发的数字证书不会被伪造、篡改。如果发生数字证书被篡改、伪造，经确认确属【电子签章服务机构名称】责任，【电子签章服务机构名称】承担赔偿责任。赔偿方法参照《电子认证业务规则》。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">八、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">【电子签章服务机构名称】有权要求证书订户及时更新数字证书。证书订户在收到更新通知时，应在规定的期限内到注册机构更新证书，若逾期证书订户没有更新证书，所引起的后果由证书订户承担。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">九、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">数字证书的有效期自证书签发之日起计算。如证书订户仍需继续使用数字证书，必须在数字证书到期前一个月内向【电子签章服务机构名称】提出数字证书更新请求。否则，证书到期将自动失效。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">十、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">如果发生数字证书私钥泄露或丢失、证书中的相关信息发生重大变更、或订户不希望继续使用数字证书的情况，证书订户应当立即告知【电子签章服务机构名称】并申请吊销证书。【电子签章服务机构名称】接到吊销申请后，在</font>24<font
                                face="宋体">小时内吊销证书订户的数字证书。证书订户应当对证书吊销之前所有的数字证书使用行为负责。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">十一、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">对于下列情形之一，【电子签章服务机构名称】有权主动吊销所签发的证书：</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal" style="text-indent:21.0000pt;"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书的更新费用未按规定及时缴纳；</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal" style="text-indent:21.0000pt;"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书订户不能履行相关法律、法规和协议所规定的责任和义务；</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal" style="text-indent:21.0000pt;"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书订户申请时，提供不真实材料；</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal" style="text-indent:21.0000pt;"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">证书已被盗用、伪造、篡改或出现证书的安全性得不到保障的其它情况；</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">十二、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">【电子签章服务机构名称】不对由于不可抗力事件（含政府行为）而导致暂停或终止全部或部分证书服务承担任何责任。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">十三、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">本协议书如有修订而涉及证书订户的权利、义务时，【电子签章服务机构名称】将通过网站【网址】进行公告。证书订户应当于公告发布之日起十五日内，向【电子签章服务机构名称】提出申请。如果逾期没有提出异议，则视为同意接受修订后的协议。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">十四、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">订户应经常浏览【电子签章服务机构名称】网站，并仔细阅读《电子认证业务规则》的各项规定。其它未尽事宜，以《电子认证业务规则》相关规定为准。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"
                           style="margin-left:0.0000pt;text-indent:21.0000pt;mso-char-indent-count:0.0000;mso-list:l0 level1 lfo3;">
                            <!--[if !supportLists]--><span
                                style="font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><span
                                style="mso-list:Ignore;">十五、</span></span><!--[endif]--><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">订户或其授权代理人确认已经认真阅读并完全理解本协议中的各项规定，点击确认本协议即表明接受本协议的约束，并接受业务受理单位的服务，本协议即时生效。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                        <p class="MsoNormal"><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;">&nbsp;</o:p></span>
                        </p>
                        <p class="MsoNormal" style="text-indent:0.0000pt;mso-char-indent-count:0.0000;"><span
                                style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"><font
                                face="宋体">备注：业务受理单位包括权易宝。</font></span><span
                                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"></span>
                        </p>
                    </div>
                    <!--EndFragment-->
                </div>
            </div>
            <div class="close-btn">
                <button @click="showXieyi = false">关闭</button>
            </div>
        </div>
        <div class="showStatus" v-show="showZhengce">
            <div>
                <div class="box" style="margin:0 auto;">
                    <div style="tab-interval:2pt; text-justify-trim:punctuation; ">
                        <!--StartFragment-->
                        <div class="Section0" style="layout-grid:15.6000pt; ">
                            <p class="MsoNormal" style="text-align:center;">
                                <a name="_Hlk12021119"></a>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:14.0000pt;mso-font-kerning:1.0000pt;"
                                >【权易宝资产数字化服务平台】</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:14.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p class="MsoNormal" style="text-align:center;">
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:14.0000pt;mso-font-kerning:1.0000pt;"
        >隐私政策</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:14.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-align:center;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:10.5000pt;mso-font-kerning:1.0000pt;"
        >
          版本生效时间：【
          <font face="Times New Roman">2019</font>
          <font face="宋体">年</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:10.5000pt;mso-font-kerning:1.0000pt;"
                                >11</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:10.5000pt;mso-font-kerning:1.0000pt;"
                                >月</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:10.5000pt;mso-font-kerning:1.0000pt;"
                                >5</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:10.5000pt;mso-font-kerning:1.0000pt;"
                                >日】</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-style:italic;font-size:10.5000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >
          上海易涟信息技术有限公司（以下称为
          <font face="Times New Roman">“</font>
          <font face="宋体">我们</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">或</font>
          <font face="Times New Roman">“</font>
          <font face="宋体">易涟信息</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">）系【权易宝资产数字化服务平台】</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          （以下简称
          <font face="Times New Roman">“</font>
          <font face="宋体">权易宝服务平台</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">或</font>
          <font face="Times New Roman">“</font>
          <font face="宋体">平台</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">）官网（网址：</font>
          <font face="Times New Roman">https://www.e-pex.com）</font>
          <font face="宋体">的所有者和管理运营方，注册成为权易宝用户（以下简称</font>
          <font face="Times New Roman">“</font>
          <font face="宋体">您</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">或</font>
          <font face="Times New Roman">“</font>
          <font face="宋体">用户</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">）时请务必仔细阅读以下条款。</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >我们非常重视用户个人信息及隐私权的保护，因此我们制订了涵盖如何收集、存储、使用、共享和保护用户信息以及我们为您提供的访问、更新、删除和保护这些信息方式的隐私政策。我们希望通过</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >《隐私政策》</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          （以下简称
          <font face="Times New Roman">“</font>
          <font face="宋体">本隐私政策</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">或</font>
          <font face="Times New Roman">“</font>
          <font face="宋体">本政策</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">）向您清晰地介绍我们对您个人信息及其他信息的处理方式。</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.1000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >
          权易宝服务平台中可能含有第三方产品或服务的链接或信息。如果您将个人信息填写在其他平台上或通过第三方提交
          <font face="Times New Roman">/</font>
          <font
                  face="宋体"
          >发布，则该方可能会获知您的信息。该第三方可能有其相应的服务条款及隐私政策规定，请您仔细阅读其条款，并在提供个人信息前请谨慎考虑。本隐私政策仅适用于我们所收集的信息，并不适用于任何第三方向您提供服务和收集使用信息的行为，我们无法控制第三方的行为，因此对任何第三方收集、使用您信息的行为不承担任何责任。</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >本隐私政策与您使用权易宝</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >服务</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >平台的服务息息相关，</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >请您在使用权易宝</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >服务</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >平台服务前，完整阅读并透彻理解本隐私政策（尤其是加粗划线的内容）并确定了解我们对您个人信息（定义见下文）及其他信息的处理规则，并相应作出您认为适当的选择。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:0.0000pt;mso-outline-level:1;mso-list:l0 level1 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            一、
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们如何收集和使用您的个人信息</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或若反映特定自然人活动情况的各种信息。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >我们的服务包括如下核心功能，这些功能包含了通过平台进行资产交易的功能、改进我们的服务所必须的功能及保障交易安全所必须的功能。我们可能会收集、保存和使用下列与您有关的信息才能实现上述这些功能。如果您不提供相关信息，您将无法享受我们提供的服务。这些功能包括：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:7.1000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;mso-list:l1 level3 lfo2;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            1.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >用户注册</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >您首先需要注册一个我们平台账户成为平台用户。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >您注册账户时同意我们收集您的个人基本信息，包括但不限于您的姓名、手机号、电子邮箱地址、创建的用户名和密码、身份证号、银行卡卡号、身份证正反面图片等；我们将通过验证银行卡卡号、身份证正反面图片、身份证号、手机验证码的方式进行用户身份的实名验证。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;text-decoration:underline;text-underline:single;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:7.1000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;mso-list:l1 level3 lfo2;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            2.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >用户进行资产交易</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="NewStyle22"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >您在进行资产交易的过程中，我们将自动收集您在平台上的操作行为记录，并调取您在平台注册时提供的个人基本信息用于验证身份的真实性。您知悉并同意我们收集、使用用户的操作行为记录是提供在线资产交易平台服务所必要的条件。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:7.1000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;mso-list:l1 level3 lfo2;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            3.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >改进我们的服务所必须的功能</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >为更加充分地了解您的情况以便向您提供服务及提升服务质量，您同意并授权我们通过包括但不限于以下方式披露及使用您的信息：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >通过【手机号、电子邮件、站内信】等方式向您发送资产信息、交易状态通知、营销活动或其他商业性电子信息。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:0.0000pt;mso-outline-level:1;mso-list:l0 level1 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            二、
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们如何共享、转让、公开披露您的个人信息</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （一）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >共享</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >我们不会与</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >易涟信息</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >以外的任何公司、组织和个人分享您的个人信息，但以下情况除外：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l12 level3 lfo3;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            1.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l12 level3 lfo3;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            2.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l12 level3 lfo3;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            3.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >与我们的关联公司共享：您的个人信息可能会与我们的关联公司共享。我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束。关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >我们的关联公司包括：【绿地金融投资控股集团有限公司、绿地控股集团有限公司、</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >上海绿地青城置业有限公司、</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >上海绿地康养养老服务有限公司、河南绿东置业有限公司等</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >及不限于未在上述公司之外的我们的关联公司</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >】。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            4.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >与授权合作伙伴共享：仅为实现本政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >目前我们的授权合作伙伴包括：提供资产勘测服务的机构、资产</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >经营者</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >、提供在线签署交易合同服务的</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >数字认证</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >服务机构、其他外部协助方等。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （二）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >转让</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            1.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            2.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >在涉及合并、收购或破产清算时，如涉及个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （三）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >公开披露</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >我们仅会在以下情况下，公开披露您的个人信息：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            1.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >获得您明确同意后；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            2.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:0.0000pt;mso-outline-level:1;mso-list:l0 level1 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            三、
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们如何保护您的个人信息</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            1.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。例如，在您的浏览器与</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >平台</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          之间交换数据时受
          <font face="Times New Roman">SSL</font>
          <font face="宋体">加密保护；我们同时对</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >权易宝资产数字化服务平台</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          网站提供
          <font face="Times New Roman">https</font>
          <font
                  face="宋体"
          >安全浏览方式；我们会使用加密技术确保数据的保密性；我们会使用受信赖的保护机制防止数据遭到恶意攻击；我们会部署访问控制机制，确保只有授权人员才可访问个人信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            2.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            3.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            4.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:0.0000pt;mso-outline-level:1;mso-list:l0 level1 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            四、
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >您的权利</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （一）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >访问您的个人信息</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >
          账户信息
          <font face="Times New Roman">——</font>
          <font face="宋体">如果您希望访问或编辑您的账户中的个人资料信息、更改您的登录或转让密码、添加安全信息等，您可以通过访问个人资料图标执行此类操作。</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >
          如果您无法通过上述链接访问这些个人信息，您可以随时使用我们的
          <font face="Times New Roman">Web</font>
          <font face="宋体">表单联系，或发送电子邮件至【</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >service@e-pex.com</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >】。我们将在</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >3</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >天内回复您的访问请求。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >对于您在使用我们的服务过程中产生的其他个人信息，只要我们不需要过多投入，我们会向您提供。如果您想行使数据访问权，请发送电子邮件至【</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >service@e-pex.com</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >】。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （二）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >更正您的个人信息</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >
          当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。您可以通过
          <font face="Times New Roman">“</font>
          <font face="宋体">（一）访问您的个人信息</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">中罗列的方式提出更正申请。</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >
          如果您无法通过上述链接更正这些个人信息，您可以随时使用我们的
          <font face="Times New Roman">Web</font>
          <font face="宋体">表单联系，或发送电子邮件至</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >service@e-pex.com</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >。我们将在</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >3</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >天内回复您的更正请求。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （三）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >删除您的个人信息</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >在以下情形中，您可以向我们提出删除个人信息的请求：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            1.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >如果我们处理个人信息的行为违反法律法规；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            2.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >如果我们收集、使用您的个人信息，却未征得您的同意；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            3.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >如果我们处理个人信息的行为违反了与您的约定；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            4.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >如果您不再使用我们的服务，或您注销了账号；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            5.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >如果我们不再为您提供服务</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >若我们决定响应您的删除请求，我们还将同时通知从我们获得您的个人信息的实体，要求其及时删除，除非法律法规另有规定或这些实体获得您的独立授权。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >当您从我们的服务中删除信息后，我们可能不会立即备份系统中删除相应的信息，但会在备份更新时删除这些信息。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （四）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >改变您授权同意的范围</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >
          每个业务功能需要一些基本的个人信息才能得以完成（见本政策
          <font face="Times New Roman">“</font>
          <font face="宋体">第一部分</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">）。对于额外收集的个人信息的收集和使用，您可以随时给予或收回您的授权同意。</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;">
            <span
                    class="18"
                    style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
            >您可以通过发送电子邮件至service@e-pex.com</span>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >联系客服人员。我</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >们将在</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >3</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >天内回复您的更正请求</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （五）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >个人信息主体注销账户</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >您随时可注销此前注册的账户，您可以通过</span>
                                <span>
          <span
                  class="18"
                  style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
          >发送电子邮件至service@e-pex.com</span>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >联系客服人员。我</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >们将在</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >3</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >天内回复您的更正请求</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >在技术可行的前提下，例如数据接口匹配，我们还可按您的要求，直接将您的个人信息副本传输给您指定的第三方。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （六）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >约束信息系统自动决策</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:14.2000pt;mso-para-margin-bottom:0.5000gd;text-indent:7.1000pt;mso-outline-level:2;mso-list:l0 level2 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            （七）
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >响应您的上述请求</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。我们将在收到您的请求之日起</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >3</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >天内作出答复。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情况收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际（例如，涉及备份磁带上存放的信息）的请求，我们可能会予以拒绝。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >在以下情形中，按照法律法规要求，我们将无法响应您的请求：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            1.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >与国家安全、国防安全直接相关的；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            2.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >与公共安全、公共卫生、重大公共利益直接相关的；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            3.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >与犯罪侦查、起诉、审判和判决执行等直接相关的；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            4.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >有充分证据表明您存在主观恶意或滥用权利的；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            5.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            6.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >涉及商业秘密的。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:0.0000pt;mso-outline-level:1;mso-list:l0 level1 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            五、
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们如何处理儿童的个人信息</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >我们的服务、网站主要面向成年人（即年满十八周岁的完全民事行为能力人）。如果没有父母或监护人的同意，未成年人不得创建自己的用户账户。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >对于经父母同意而收集未成年人个人信息的情况，我们只会在受到法律允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用或公开披露此信息。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >如果我们发现自己在未事先获得可证实的父母同意的情况下收集了未成年人的个人信息，则会设法尽快删除相关数据。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:0.0000pt;mso-outline-level:1;mso-list:l0 level1 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            六、
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >您的个人信息如何在全球范围转移</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >原则上，我们在中华人民共和国境内收集和产生的个人信息，将存储在中华人民共和国境内。如您使用跨境交易服务，且需要向境外传输您的个人信息完成交易的，我们会单独征得您的授权同意并要求接收方按照我们的说明、本政策以及其他任何相关的保密和安全措施来处理这些个人信息。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:0.0000pt;mso-outline-level:1;mso-list:l0 level1 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            七、
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >本政策如何更新</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >我们的隐私政策可能变更。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利。我们会在本页面上发布对本政策所做的任何变更。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >对于重大变更，我们还会提供更为显著的通知（包括对于某些服务，我们会通过电子邮件发送通知，说明隐私政策的具体变更内容）。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >本政策所指的重大变更包括但不限于：</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            1.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            2.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            3.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >个人信息共享、转让或公开披露的主要对象发生变化。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            4.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >您参与个人信息处理方面的权利及其行使方式发生重大变化。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            5.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            6.
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >个人信息安全影响评估报告表明存在高风险时。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:24.0000pt;mso-char-indent-count:2.0000;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >我们还会将本政策的旧版本存档，供您查阅。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:0.0000pt;mso-outline-level:1;mso-list:l0 level1 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            八、
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >适用法律和争议解决</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            1.
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >本隐私政策的效力、解释、履行和争议解决，均应适用中华人民共和国法律（不包括香港特别行政区、澳门特别行政区与台湾地区法律）。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.3000pt;mso-list:l13 level3 lfo4;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            2.
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >若您和我们之间发生任何纠纷或争议，</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >双方应通过友好协商解决，若协商解决未果，任何一方均有权将有关纠纷或争议提交由上海仲裁委员会</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >按照其届时有效的仲裁规则予以仲裁，仲裁裁决是终局的且对双方均具有约束力。</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;margin-left:0.0000pt;mso-para-margin-bottom:0.5000gd;text-indent:0.0000pt;mso-outline-level:1;mso-list:l0 level1 lfo1;"
                            >
                                <!--[if !supportLists]-->

                                <span
                                        style="font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >
          <span style="mso-list:Ignore;">
            九、
            <span>&nbsp;</span>
          </span>
        </span>
                                <!--[endif]-->
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >如何联系我们</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.0000pt;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >如果您对本隐私政策有任何疑问、意见或建议，请通过发送邮件至</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >service@e-pex.com 或拨打我们的</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:宋体;mso-ascii-font-family:'Times New Roman';mso-hansi-font-family:'Times New Roman';mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >官网</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >客服电话等多种方式与我们联系。&nbsp;&nbsp;</span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p
                                    class="MsoNormal"
                                    style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;text-indent:21.0000pt;"
                            >
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >
          如果您对我们的回复不满意，特别是我们的个人信息处理行为损害了您的合法权益，您还可以通过
          <font face="Times New Roman">“</font>
          <font face="宋体">适用法律和争议解决</font>
          <font face="Times New Roman">”</font>
          <font face="宋体">列明的外部途径寻求解决办法。</font>
        </span>
                                <span
                                        style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:宋体;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
                                >

        </span>
                            </p>
                            <p class="MsoNormal" style="margin-bottom:7.8000pt;mso-para-margin-bottom:0.5000gd;">
        <span
                style="mso-spacerun:'yes';font-family:'Times New Roman';mso-fareast-font-family:等线;font-size:12.0000pt;mso-font-kerning:1.0000pt;"
        >

        </span>
                            </p>
                            <div style="height: 60px;">

                            </div>
                        </div>
                        <!--EndFragment-->
                    </div>
                </div>
            </div>
            <div class="close-btn">
                <button @click="showZhengce = false">关闭</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'login',
        data() {
            return {
                authForm: {
                    phone: sessionStorage.getItem('yjgf_userName'),
                    name: '',
                    icCard: '',
                },
                authFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                loading: false,
                upTitle: '111',
                showFace: false,
                imgList: [],
                size: 0,
                limit: 6, //限制图片上传的数量
                tempImgs: [],
                showClick: false,
                upperPicUrl: '',
                bottomPicUrl: '',
                showSuccess: false,
                showFail: false,
                attachArr0: {},
                attachArr1: {},
                showXieyi: false,
                showZhengce: false,
                showConfirmCheckBox: true,

            }
        },
        methods: {
            submitForm() {
            },
            // 初始化图片宽度
            // 使得图片高度一致
            initHW() {
                let previewImgList = document.querySelector('.preview_img_list');
                let Lis = previewImgList.getElementsByTagName('li');

                let LisLen = Lis.length;

                if (LisLen > 1) {
                    let img = Lis[0].getElementsByTagName('img')[0];

                    let imgW = img.width;
                    let imgH = img.height;

                    for (let i = 1; i < LisLen; i++) {
                        let img = Lis[i].getElementsByTagName('img')[0];
                        img.style.width = imgW + 'px';
                        img.style.height = imgH + 'px';
                    }
                }

            },
            apply() {
                if(this.showConfirmCheckBox) return this.$global.errMsg('请勾选数字认证协议!')
                if (this.authForm.phone == '') return this.$global.errMsg('请填写手机号!')
                if (this.authForm.name == '') return this.$global.errMsg('请填写姓名!')
                if (this.authForm.name.length > 20) return this.$global.errMsg('姓名最长只支持20个字符!')
                if (this.authForm.icCard == '') return this.$global.errMsg('请填写身份证号!')
                let regIC = '/(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}[0-9Xx]$) | (^[\u0000-\u00ff]+$)/'
                let testReg = eval(regIC)
                if (!testReg.test(this.authForm.icCard)) return this.$global.errMsg('请填写正确的身份证!')


                let url = this.$appConst.userUrl
                let api = `/api/v1.0/real-name-authentication?withoutManualAudit=true`
                let params = {
                    attachments:[],
                    userId: '',
                    realName: '',
                    credentialType:{
                        value:"ID_CARD"
                    },
                    idCardNo:''
                }
                params.attachments.push(this.attachArr0)
                params.attachments.push(this.attachArr1)
                params.userId = sessionStorage.getItem('yjgf_userId')
                params.realName = this.authForm.name
                params.idCardNo = this.authForm.icCard
                this.$post(url+api, params).then((res) => {
                    if (res.data.status === this.$appConst.status) {
                        this.$global.errMsg('实名认证成功！')
                        //将已经登录的用户实名认证之后 verified改为已认证
                        sessionStorage.setItem('verified', true)
                        this.$router.push('/authSuccess')
                    }
                }).catch(() => {
                    this.$router.push('/authFail')
                })

            },
            goToLogin() {
                this.$router.push("/login")
            },
            closePop() {
                this.showFail = false
            },
            checkFile(file){
                if (!file) {
                    this.test1("请上传文件,上传格式支持：" + fileExtensions.toString());
                    return false;
                }
                var fileName = file.name;
                // var fileSize = (file.size / (1024 * 1024)).toFixed(2);
                if(file.size >= 5242880){
                    this.test1("上传文件大小大于5m，请重新选择文件上传");
                    return false
                }


                var fileExt = /\.[^\.]+$/.exec(fileName);
                var fileExtensions = [".png", ".gif", ".jpg", ".jpeg",".PNG",".GIF",".JPG",".JPEG", ".pdf", "PDF"];
                if (-1 == fileExtensions.indexOf(fileExt.toString())) {
                    this.test1("上传失败,上传格式支持：" + fileExtensions.toString());
                    return false;
                }
                if (/[\u4e00-\u9fa5]/.test(fileName)) {
                    this.test1("不支持以中文命名的照片" );
                    return false;
                }
                return true;
            },
            changeUpper () {
                var file = document.getElementById("upload").files[0];
                // if(!this.checkFile(file)){
                //     document.getElementById("file4").value = '';
                //     return false;
                // }
                let url = this.$appConst.uploadUrl
                let api = `/upload`
                this.$uploadFile(url+api, file).then((res) => {
                    if (res.data.status === this.$appConst.status) {
                        let attachObj = {
                            category: '',
                            contentType: '',
                            fileName: '',
                            size: 0,
                            uid: ''
                        };
                        attachObj.category = '身份证正面'
                        attachObj.contentType = res.data[0].contentType
                        attachObj.fileName = res.data[0].fileName
                        attachObj.size = res.data[0].size
                        attachObj.uid = res.data[0].fileId
                        this.attachArr0 = attachObj
                    }
                }).catch(() => {
                })
            },
            changeBottom () {
                var file = document.getElementById("upload2").files[0];
                // if(!this.checkFile(file)){
                //     document.getElementById("file4").value = '';
                //     return false;
                // }
                let url = this.$appConst.uploadUrl
                let api = `/upload`
                this.$uploadFile(url+api, file).then((res) => {
                    if (res.data.status === this.$appConst.status) {
                        let attachObj = {
                            category: '',
                            contentType: '',
                            fileName: '',
                            size: 0,
                            uid: ''
                        };
                        attachObj.category = '身份证反面'
                        attachObj.contentType = res.data[0].contentType
                        attachObj.fileName = res.data[0].fileName
                        attachObj.size = res.data[0].size
                        attachObj.uid = res.data[0].fileId
                        this.attachArr1 = attachObj
                    }
                }).catch(() => {
                })
            }
        },
        created() {
        },
        mounted() {
            this.showXieyi = false
            this.showZhengce = false
            let uploadBtn = document.querySelector('#upload');
            let uploadBtn2 = document.querySelector('#upload2');
            // let previewImgList = document.querySelector('.preview_img_list');
            // let submitBtn = document.querySelector('.submit');

            let imgArr = new Array();
            let imgArr2 = new Array();

            uploadBtn.addEventListener('change', function () {
                let imgLen = this.files.length;
                // let liLen = previewImgList.getElementsByTagName('li').length;
                // let ImgLen = imgLen + liLen;
                //
                // if (ImgLen > 9) {
                //   alert("上传最大数量不能大于9");
                //   return false;
                // }

                document.querySelector(".preview").style.display = 'block';

                for (let i = 0; i < imgLen; i++) {
                    let file = this.files[i];
                    let imgType = /^image\//;

                    if (!imgType.test(file.type)) {
                        continue;
                    }

                    let img = document.getElementsByClassName("previewImg")[0]

                    let reader = new FileReader();
                    reader.onload = (function (aImg) {
                        return function (e) {
                            aImg.src = e.target.result;
                            // this.initHW();
                            imgArr.push(e.target.result);
                        };
                    })(img);
                    reader.readAsDataURL(file);
                    // let objectUrl = window.URL.createObjectURL(file);
                    // img.src = objectUrl;
                }

            }, false);
            uploadBtn2.addEventListener('change', function () {
                let imgLen2 = this.files.length;
                // let liLen = previewImgList.getElementsByTagName('li').length;
                // let ImgLen = imgLen + liLen;
                //
                // if (ImgLen > 9) {
                //   alert("上传最大数量不能大于9");
                //   return false;
                // }

                document.querySelector(".preview2").style.display = 'block';

                for (let i = 0; i < imgLen2; i++) {
                    let file = this.files[i];
                    let imgType = /^image\//;

                    if (!imgType.test(file.type)) {
                        continue;
                    }

                    let img2 = document.getElementsByClassName("previewImg2")[0]

                    let reader = new FileReader();
                    reader.onload = (function (aImg) {
                        return function (e) {
                            aImg.src = e.target.result;
                            // this.initHW();
                            imgArr2.push(e.target.result);
                        };
                    })(img2);
                    reader.readAsDataURL(file);
                    // let objectUrl = window.URL.createObjectURL(file);
                    // img.src = objectUrl;
                }

            }, false);

            // submitBtn.addEventListener('click', function () {
            //   if (!imgArr.length) {
            //     alert('请选择要上传的图片');
            //     return false;
            //   }
            //   let form = document.querySelector('form');
            //   let fd = new FormData(form);
            //   for (let i = 0; i < imgArr.length; i++) {
            //     fd.append('file[]', imgArr[i]);
            //   }
            //
            //   let request = new XMLHttpRequest();
            //   let url = "./file_preview.php";
            //   request.open('post', url);
            //   request.send(fd);
            // }, false);

        }
    }
</script>

<style scoped lang="less">

</style>
