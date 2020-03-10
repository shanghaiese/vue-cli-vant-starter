<template>
    <div class="container">
        <div>
            <div class="top">
                <mt-tabbar v-model="selectedType">
                    <button v-show="ifAdd" class="list-content-add-button" @click="handleAddOrder()">+ 新增订单</button>
                    <button class="list-content-search-button" @click="showFilter()">筛选</button>
                    <mt-tab-item id="all" @click="searchList('all')">
                        意向转让
                    </mt-tab-item>
                    <!--                <mt-tab-item id="toConfirmed" @click="searchList('toConfirmed')">-->
                    <!--                    待确认订单-->
                    <!--                </mt-tab-item>-->
                    <!--                <mt-tab-item id="confirmed" @click="searchList('confirmed')">-->
                    <!--                    确定交易-->
                    <!--                </mt-tab-item>-->
                    <!--                <mt-tab-item id="sold" @click="searchList('sold')">-->
                    <!--                    交易完成-->
                    <!--                </mt-tab-item>-->
                </mt-tabbar>
            </div>
            <div>
                <mt-tab-container v-model="selectedType" value="selectedType">
                    <mt-tab-container-item id="all">
                        <div v-show="showData">
                            <div v-for="(item, index) in contentList" :key="index" class="list-content">
                                <div class="list-card">
                                    <div class="list-content-title">
                                        <span class="list-content-title-dev">{{item.projectName}}</span>
                                        <span class="list-content-title-status">{{$appConst.handleHouseSellerStatus(item.status)}}</span>
                                    </div>
                                    <div class="list-content-title-detail">
                                        <div class="list-content-title-detail">
<!--                                            <div class="list-content-title-pic">-->
<!--                                                <img width="90" height="90" :src="require('../../../../src/assets/imgs/house/houseList.png')">-->
<!--                                            </div>-->
                                            <div class="list-content-title-project">
                                                <div class="list-content-title-project-info">
                                                    <div class="list-content-title-project-name">
                                                        {{item.dev}}
                                                    </div>
                                                </div>
                                                <div class="list-content-title-project-sub-info">
                                                    <div class="list-content-title-project-sub-info-detail">
                                                        买方名称:   {{item.buyer}}
                                                    </div>
                                                    <div class="list-content-title-project-sub-info-detail">
                                                        卖方名称:   {{item.seller}}
                                                    </div>
                                                    <div class="list-content-title-project-sub-info-detail">
                                                        付款人姓名:   {{item.paymentName}}
                                                    </div>
                                                    <div class="list-content-title-project-sub-info-detail">
                                                        收款金额:   {{item.receiptAmount}}
                                                    </div>
                                                    <div class="list-content-title-project-sub-info-detail">
                                                        付款账号:   {{item.bankAccount}}
                                                    </div>
                                                    <div class="list-content-title-project-sub-info-detail">
                                                        备注:   {{item.buyerRemarks}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-content-action" v-show="item.status !== 'CANCEL'">
                                    <button v-show="item.status === 'SELLER_CONFIRMED' && ifEdit" class="list-content-edit-button" @click="handleEditOrder(item)">编辑订单</button>
                                    <button v-show="item.status !== 'CANCEL' && ifCancel" class="list-content-cancel-button" @click="handleCancelOrder(item)">商家取消订单</button>
                                    <button v-show="item.status === 'BUYER_CONFIRMED' && ifConfirm" class="list-content-action-button" @click="handleOrderInfo(item)">已支付意向金</button>
                                </div>
                                <!--                                <div class="list-content-action" v-if="item.orderStatus === 'TO_BE_COMPLETE_BY_BUYER'">-->
                                <!--                                    <button class="list-content-action-button" @click="doubleConfirmOrder(item)">完成交易</button>-->
                                <!--                                </div>-->
                            </div>
                        </div>
                        <div v-show="showEmpty" class="empty-data">
                            <div>
                            <span>
                                <img class="logo-img" width="42" height="42" :src="require('../../../../src/assets/imgs/nodata.png')">
                            </span>
                            </div>
                            <div class="empty-text">
                                <span>没有找到符合条件的数据</span>
                            </div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <!--弹窗-->
        <div>
            <div>
                <mt-popup
                        v-model="showDoubleConfirmOrder"
                        position="middle">
                    <div class="pop-up">
                        <div class="confirm-info">
                            <div class="confirm-title">付款已收确认</div>
                        </div>
                        <div class="confirm-info">
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>收款金额: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="receiptAmount" placeholder="请输入金额">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>收款人姓名: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="receiptName" placeholder="请输入收款人姓名">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>意向项目: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="intentProjectName" placeholder="请输入意向项目">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>备注: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="sellerRemarks" placeholder="请输入备注">
                                </div>
                            </div>
                        </div>
                        <div class="pop-up-agree">
                            <!--                            <input class="select-tag-input" type="checkbox" id="tag-id"-->
                            <!--                                   @click="handleSelectChange">-->
                            <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox" v-show="!showConfirmCheckBox">
                                <img width="15" :src="require('../../../../src/assets/imgs/checkbox.png')" alt />
                            </span>
                            <span class="select-tag-input pop-up-agree-checkbox" @click="showConfirmCheckBox = !showConfirmCheckBox" v-show="showConfirmCheckBox">
                                <img width="15" :src="require('../../../../src/assets/imgs/checkbox01.png')" alt />
                            </span>
                            <span class="pop-up-agree-text">您已了解和确认此订单，勾选本项后可点击和阅读，</span>
                            <span class="agreement" @click="goRisk('INTENT')">《权益期保障方案》</span><span class="agreement" @click="goRisk('RISKAJ')">《风险揭示书》</span>
                        </div>
                        <div class="pop-up-action">
                            <button class="cancel-btn" @click="showDoubleConfirmOrder=false">取消</button>
                            <button class="ok-btn" @click="submitDoubleConfirm()">确认</button>
                            <!-- :disabled="!showConfirmCheckBox"-->
                        </div>
                    </div>
                </mt-popup>
            </div>
            <div>
                <mt-popup
                        v-model="showCancelConfirmOrder"
                        position="middle">
                    <div class="pop-up">
                        <div class="confirm-info">
                            <div class="confirm-title">取消订单</div>
                        </div>
                        <div class="confirm-info" style="margin-top: 20px">
                            <div class="confirm-title">是否取消这笔{{cancelMessage}}的订单?</div>
<!--                            <div class="text-line">-->
<!--                                <div class="inline-text"><span class="required">*</span>取消原因: </div>-->
<!--                                <div class="inline-text margin-text">-->
<!--                                    <textarea rows="5" class="input-textarea" v-model="cancelReason" cols="5" placeholder="请输入取消原因"/>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                        <div class="pop-up-action">
                            <button class="cancel-btn" @click="showCancelConfirmOrder=false">返回</button>
                            <button class="ok-btn" @click="submitCancel()">取消订单</button>
                        </div>
                    </div>
                </mt-popup>
            </div>
            <div>
                <mt-popup
                        v-model="showEditOrder"
                        position="top"
                        @touchmove.native.stop.prevent
                >
                    <div class="pop-up">
                        <div class="confirm-info">
                            <div class="confirm-title">编辑订单</div>
                        </div>
                        <div class="confirm-info">
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>收款人姓名: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="receiptName" placeholder="请输入付款人姓名">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>收款金额: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="receiptAmount" placeholder="请输入支付金额">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text">意向项目: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="intentProjectName" placeholder="请输入付款人姓名">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text">备注: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="sellerRemarks" placeholder="请输入用户银行账号">
                                </div>
                            </div>
                        </div>
                        <div class="pop-up-action">
                            <button class="cancel-btn" @click="showEditOrder=false">取消</button>
                            <button class="ok-btn" @click="submitEdit()">确认</button>
                            <!-- :disabled="!showConfirmCheckBox"-->
                        </div>
                    </div>
                </mt-popup>
            </div>
            <div>
                <mt-popup
                        v-model="showAddOrder"
                        position="top"
                        @touchmove.native.stop.prevent
                >
                    <div class="pop-up">
                        <div class="confirm-info">
                            <div class="confirm-title">新增订单</div>
                        </div>
                        <div class="confirm-info">
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>用户姓名: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="buyer" placeholder="请输入付款人姓名">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>付款人姓名: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="paymentName" placeholder="请输入付款人姓名">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>收款人姓名: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="receiptName" placeholder="请输入付款人姓名">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>用户身份证号: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="idCard" placeholder="请输入用户银行账号">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>用户银行账号: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="bankAccount" placeholder="请输入用户银行账号">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>用户手机号: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="mobile" placeholder="请输入该用户注册的手机号">
                                </div>
                            </div>
                            <div class="add-choose-text-line">
                                <div class="inline-text"><span class="required">*</span>所属项目: </div>
                                <div class="inline-text margin-text">
<!--                                    <input type="text" class="input" v-model="projectName" placeholder="请输入所属项目">-->
                                    <span>
                                        <button class="select-project-btn" @click="chooseProject()">选择项目</button> {{selectedProjectName}}
                                    </span>
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span class="required">*</span>支付金额: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="receiptAmount" placeholder="请输入支付金额">
                                </div>
                            </div>
                            <div class="add-text-line">
                                <div class="inline-text"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>项目名称: </div>
                                <div class="inline-text margin-text">
                                    <input type="text" class="input" v-model="intentProjectName" placeholder="请输入项目名称">
                                </div>
                            </div>
                        </div>
                        <div class="pop-up-action">
                            <button class="cancel-btn" @click="showAddOrder=false">取消</button>
                            <button class="ok-btn" @click="submitAdd()">确认添加</button>
                            <!-- :disabled="!showConfirmCheckBox"-->
                        </div>
                    </div>
                </mt-popup>
            </div>
            <mt-popup
                    v-model="showSearchProjectPopup"
                    position="top"
                    @touchmove.native.stop.prevent
            >
                <div class="search-popup">
                    <div>
                        <div>
                            <mt-search
                                    v-model="searchValue"
                                    cancel-text="取消"
                                    placeholder="搜索"
                                    :show="true"
                                    @keyup.enter.native="searchProject()">
                                <div class="search-list">
                                    <div>搜索结果（点击来选取）</div>
                                    <div  @click="selectList(item)"  v-for="item in projectSearchList">
                                        <mt-cell
                                                :title="item.projectName"
                                                :value="item.propertyType"
                                        >
                                        </mt-cell>
                                    </div>
                                </div>
                            </mt-search>
                        </div>


<!--                        <ul>-->
<!--                            <li-->
<!--                                    v-for="item in projectSearchList"-->
<!--                            >-->
<!--                                {{item.projectName}}-->
<!--                            </li>-->
<!--                        </ul>-->
                    </div>
                </div>
            </mt-popup>
            <!-- 筛选弹窗 -->
            <mt-popup
                    v-model="showTrans"
                    position="right"
                    :style="{ width: '85%', height: '100%' }">
                <div class="popup">
                    <div>
                        <div>
                            <p class="title">客户名称(登录名):</p>
                            <div class="btn">
                                <input type="text" class="input" v-model="buyer" placeholder="请输入客户名称">
                            </div>
                        </div>
<!--                        <div>-->
<!--                            <p class="title">客户名称(注册名):</p>-->
<!--                            <div class="btn">-->
<!--                                <input type="text" class="input" v-model="customerRealName" placeholder="请输入客户名称">-->
<!--                            </div>-->
<!--                        </div>-->
                        <div>
                            <p class="title">项目名称:</p>
                            <div class="btn">
                                <input type="text" class="input" v-model="projectName" placeholder="请输入项目名称">
                            </div>
                        </div>
                        <div>
                            <p class="title">订单状态:</p>
                            <div class="areaList" style="margin-bottom: 24px">
                                <div class="categoryTag" v-for="item in typeCategoryList" @click="chooseTypeCategory($event,item)">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="foot">
                        <div class="reset" @click="resetKanyangFilter()">重置</div>
                        <div class="enter" @click="searchFilterData()">确定</div>
                    </div>
                </div>
            </mt-popup>
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
    // import {appConst} from "../../../global/appConst";
    // import {global} from "../../../global/global";

    export default {
        name: 'purchase',
        props: [],
        computed: {
            newContentList: function () {
                let newArr = []
                this.contentList.map(item => {
                    if (item['attachments'] && item['attachments'].length > 0) {
                        let itemAttachmentsthis = appConst.handleGetListImgUrl(item['attachments'], 'offlineProtocol')
                        item.url = itemAttachmentsthis[0] ? itemAttachmentsthis[0].url: ''
                    }
                    if (item['orderStatus']) {
                        item['orderStatusFlag'] = appConst.orderStatus[item['orderStatus']]
                        item['orderOptionText'] = appConst.orderOption[item['orderStatus']]
                    }
                    if(item['properties']){
                        item['amount'] = appConst.processingMoneyFormatValue(item['properties'].price)
                    }
                    newArr.push(item)
                })
                return newArr
            }
        },
        data () {
            return {
                status:'',
                buyer: '',
                receiptName: '',
                customerName: '',
                customerRealName: '',
                projectFilterName: '',
                filterType: '',
                showTrans:false,
                typeCategoryList: [
                    {
                        name:'待买家确认',
                        value:'TO_BE_CONFIRMED',
                        key: 0
                    },
                    {
                        name:'买家已确认',
                        value:'BUYER_CONFIRMED',
                        key: 1
                    },
                    {
                        name:'卖家已确认',
                        value:'SELLER_CONFIRMED',
                        key: 2
                    },
                    {
                        name:'取消交易',
                        value:'CANCEL',
                        key: 3
                    }
                ],
                postEditObj: {
                    paymentName:'',
                    receiptAmount:'',
                    intentProjectName:'',
                    sellerRemarks:'',
                },
                selectedProjectName: '',
                projectSearchList: [],
                showSearchProjectPopup: false,
                searchValue: '',
                idCard: '',
                bankAccount: '',
                mobile: '',
                projectName: '',
                projectAddName: '',
                projectId: '',
                // ifCancel:sessionStorage.getItem('authorities').indexOf('INTORDERCANCEL') > 0,
                // ifEdit:sessionStorage.getItem('authorities').indexOf('INTORDEREDIT') > 0,
                // ifAdd:sessionStorage.getItem('authorities').indexOf('INTORDERADD') > 0,
                // ifConfirm:sessionStorage.getItem('authorities').indexOf('INTORDERCONF') > 0,
                ifCancel:false,
                ifEdit:false,
                ifAdd:false,
                ifConfirm:false,
                cancelMessage: '',
                showQuanyi: false,
                showXieyi: false,
                showCancelConfirmOrder: false,
                showEditOrder: false,
                showAddOrder: false,
                cancelReason: '',
                receiptAmount:'',
                paymentName:'',
                intentProjectName:'',
                sellerRemarks:'',
                orderId:'',
                showData: false,
                showEmpty: false,
                selectedType: 'all', //all所有订单 toConfirmed 待订单确认 confirmed 确定订单 sold 交易完场
                showStatus: [false, false, false],
                contentList: [],
                contentShow: false,
                isActionSheetShow: false,
                dialogOption: {
                    tit: '',
                    confirm: true
                },
                currOrderInfo: {},
                orderBtnStatus: true,
                //确认订单弹窗
                userId: '',
                allowDayCount: 0,
                allAmount: 0,
                serviceAmount: 0,
                completeDate: '',
                completeFileId: '',
                showConfirmOrder: false,
                showDoubleConfirmOrder: false,
                showFinishOrder: false,
                showCompleteOrder: false,
                showConfirmCheckBox: false,
                showCompleteCheckBox: false,
                selectedId: '',
                selectedStatus: '',
                showFinishOrderPickerValue: null,
                completeSkuId: '',
                selectedOrderStatus: ''
            }
        },
        methods: {
            init () {
                this.handleGetData('all')
                this.searchProject()
                this.ifCancel = (sessionStorage.getItem('authorities').indexOf('INTORDERCANCEL') > 0)
                this.ifEdit = (sessionStorage.getItem('authorities').indexOf('INTORDEREDIT') > 0)
                this.ifAdd = (sessionStorage.getItem('authorities').indexOf('INTORDERADD') > 0)
                this.ifConfirm = (sessionStorage.getItem('authorities').indexOf('INTORDERCONF') > 0)
            },
            chooseProject() {
                this.showSearchProjectPopup = true;
            },
            searchProject() {
                let url = ''
                if(this.searchValue == '' || this.searchValue === undefined){
                     url = `/ld/lh/back/projects?page=0&size=10&sort=lastUpdateTime`;
                }else{
                     url = `/ld/lh/back/projects?page=0&size=10&sort=lastUpdateTime&projectName=${this.searchValue}`;
                }

                this.$apiGet(url).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        // eslint-disable-next-line no-console
                        this.projectSearchList = response.data.data.content
                        // this.projectId = response.data.content[0].projectId
                        // this.projectName = response.data.content[0].projectName
                    }
                }).catch(() => {
                })
            },
            searchList(type) {
                this.handleGetData(type)
            },
            handleGetData (type) {
                this.userId = sessionStorage.getItem('yjgf_userId');
                // let url = `/ld/order/list`;
                let url = `/ld/lh/orders?page=0&size=150&type=SELLER`;
                this.$apiGet(url).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        // eslint-disable-next-line no-console
                        this.contentShow = true
                        this.contentList = response.data.data.content
                        if(response.data.data.content && response.data.data.content.length > 0){
                            this.showData = true
                            this.showEmpty = false
                        }else{
                            this.showData = false
                            this.showEmpty = true
                        }
                    }
                }).catch(() => {
                })
            },
            handleOrderOption (isClose,isConfirm) {
                if(isConfirm === 'confirm'){
                    if(this.currOrderInfo.orderStatus==='TO_BE_CONFIRMED_BY_BUYER'){
                        let tagId = document.getElementById("tag-id");
                        if (!tagId.checked) {
                            this.$global.errMsg('请勾选《转让协议》！')
                        } else {
                            this.handleOrderConfirm ('CONFIRM')
                        }
                    }else if(this.currOrderInfo.orderStatus==='TO_BE_COMPLETE_BY_BUYER'){
                        this.handleOrderConfirm ('COMPLETE')
                    } else if(this.currOrderInfo.orderStatus==='TO_BE_CONFIRMED_BY_DEV'){
                        this.handleOrderConfirm ('CANCEL')
                    }
                } else this.isActionSheetShow = false

            },
            handleSelectChange () {
                let tagId = document.getElementById("tag-id");
                if (tagId.checked) {
                    this.orderBtnStatus = true
                } else this.orderBtnStatus = false
            },
            handleTransAgreement () {
                if(this.selectedOrderStatus == '交易完成' || this.selectedOrderStatus == '交易成功'){
                    let url = this.$appConst.apiUrl
                    let projectId = this.completeFileId
                    let skuId = this.completeSkuId
                    let api = `/ld/agreement/TRADE/get/${projectId}/attachments?skuId=${skuId}`
                    this.$axios.post((url + api)).then((response) => {
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
                    let projectId = this.completeFileId
                    let skuId = this.completeSkuId
                    let api = `/ld/agreement/TRADE/get/template/upload/file?projectId=${projectId}`
                    let params = {
                        projectId: projectId
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
            handleCheckAgreement (type) {
                let url = this.$appConst.apiUrl
                let projectId = this.currOrderInfo.project.id
                let api = `/project/${projectId}/type/${type}/preview`
                window.open(url + api)
            },
            handleConfirm (item) {
                this.currOrderInfo = item
                let tit = ''

                tit = appConst.orderOption[item.orderStatus]

                this.dialogOption.tit = tit
                this.isActionSheetShow = true

                // this.$vux.confirm.show({
                //   title: title,
                //   content: content,
                //   confirmText: '确定',
                //   cancelText: '取消',
                //   onCancel () {
                //     _this.$vux.confirm.hide()
                //   },
                //   onConfirm () {
                //     _this.handleOrderConfirm(item)
                //   }
                // })
            },
            handleOrderConfirm (status) {
                let url = `/ld/order/confirm/${this.currOrderInfo.id}?confirmStatus=${status}`
                let params = {
                    // confirmStatus: status
                }
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        this.$global.errMsg('操作成功!')
                        this.isActionSheetShow = false
                        this.handleGetData()
                    }
                }).catch(() => {
                })

            },
            handleEditOrder (item) {

                this.postEditObj = item
                this.orderId = item.id

                this.orderId = item.id
                this.receiptName = item.receiptName
                this.receiptAmount = item.receiptAmount
                this.intentProjectName = item.intentProjectName
                this.sellerRemarks = item.sellerRemarks
                this.showEditOrder = true
            },
            handleOrderInfo (item) {
                this.showDoubleConfirmOrder = true
                this.orderId = item.id
            },
            handleCancelOrder (item) {
                this.showCancelConfirmOrder = true
                this.orderId = item.id
                this.cancelMessage = item.projectName
            },
            handleAddOrder () {
                this.showAddOrder = true
            },
            //打开确认订单弹窗
            confirmOrder (item) {
                this.selectedId = item.id;
                this.selectedStatus = item.orderStatus;
                this.showConfirmOrder = true
                this.allowDayCount = item.payment.payDate
                if(item.project.type === 'STOR' || item.project.type === 'CARPORT'){
                    if(item.payment.amount === '0' || item.payment.amount === 0){
                        this.allAmount = 0
                    }else{
                        this.allAmount = (!item.payment.amount || item.payment.amount == '') ? '待协商' : appConst.processingMoneyFormatValue(item.payment.amount) //非正常值均赋值待协商
                    }
                }else{
                    this.allAmount = appConst.processingMoneyFormatValue(item.payment.amount)
                }
                this.serviceAmount = appConst.processingMoneyFormatValue(item.payment.serviceFee)
                this.completeDate = item.payment.interactionDate
                this.completeFileId = item.project.id
                this.completeSkuId = item.skuId
                this.selectedOrderStatus = item.orderStatusFlag
            },
            doubleConfirmOrder (item) {
                this.selectedId = item.id;
                this.selectedStatus = item.orderStatus;
                this.showDoubleConfirmOrder = true
                this.allowDayCount = item.payment.payDate
                if(item.project.type === 'STOR' || item.project.type === 'CARPORT'){
                    if(item.payment.amount === '0' || item.payment.amount === 0){
                        this.allAmount = 0
                    }else{
                        this.allAmount = (!item.payment.amount || item.payment.amount == '') ? '待协商' : appConst.processingMoneyFormatValue(item.payment.amount) //非正常值均赋值待协商
                    }
                }else{
                    this.allAmount = appConst.processingMoneyFormatValue(item.payment.amount)
                }
                this.serviceAmount = appConst.processingMoneyFormatValue(item.payment.serviceFee)
                this.completeDate = item.payment.interactionDate
                this.completeFileId = item.project.id
                this.completeSkuId = item.skuId
                this.selectedOrderStatus = item.orderStatusFlag
            },
            submitDoubleConfirm() {
                if(!this.receiptAmount){
                    this.$global.errMsg('请输入收款金额！')
                    return false
                }

                if(!this.receiptName){
                    this.$global.errMsg('请输入收款人姓名！')
                    return false
                }

                if (!this.showConfirmCheckBox) {
                    this.$global.errMsg('请先勾选保障方案和揭示书！')
                    return false
                }else{
                    let url = `/ld/lh/order/confirm`
                    let params = {
                        orderId: this.orderId,
                        receiptAmount: this.receiptAmount,
                        receiptName: this.receiptName,
                        intentProjectName: this.intentProjectName,
                        sellerRemarks: this.sellerRemarks,
                        status:"SELLER_CONFIRMED"
                    }
                    this.$apiPost(url, params).then((response) => {
                        if (response.data.status === this.$appConst.status) {
                            this.$global.errMsg('确认支付成功!')
                            this.showConfirmOrder = false
                            this.handleGetData()
                            this.receiptAmount = ''
                            this.receiptName = ''
                            this.intentProjectName = ''
                            this.sellerRemarks = ''
                        }
                    }).catch(() => {
                    })
                    this.showDoubleConfirmOrder = false
                }
            },
            //选择数据
            selectList(item) {
                this.projectId = item.id;
                this.projectName = item.projectName;
                this.selectedProjectName = item.projectName;
                this.showSearchProjectPopup = false
                this.searchValue = ''
            },
            //提交新增订单
            submitAdd() {
                if(!this.buyer){
                    this.$global.errMsg('请输入用户姓名！')
                    return false
                }
                if(!this.paymentName){
                    this.$global.errMsg('请输入付款人姓名！')
                    return false
                }
                if(!this.receiptName){
                    this.$global.errMsg('请输入收款人姓名！')
                    return false
                }
                if(!this.idCard){
                    this.$global.errMsg('请输入用户身份证号！')
                    return false
                }
                if(!this.bankAccount){
                    this.$global.errMsg('请输入用户银行账号！')
                    return false
                }
                if(!this.idCard){
                    this.$global.errMsg('请输入用户身份证号！')
                    return false
                }
                if(!this.mobile){
                    this.$global.errMsg('请输入付款人手机号！')
                    return false
                }
                if(!this.selectedProjectName){
                    this.$global.errMsg('请选择所属项目！')
                    return false
                }
                if(!this.receiptAmount){
                    this.$global.errMsg('请输入支付金额！')
                    return false
                }

                let url = `/ld/lh/order/seller/create`
                let params = {
                    buyer: this.buyer,
                    idCard: this.idCard,
                    mobile: this.mobile,
                    paymentName: this.paymentName,
                    receiptName: this.receiptName,
                    bankAccount: this.bankAccount,
                    projectId: this.projectId,
                    projectName: this.projectName,
                    receiptAmount: this.receiptAmount,
                    intentProjectName: this.intentProjectName,
                }
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        this.$global.errMsg('新增订单成功!')
                        this.showAddOrder = false
                        this.showSearchProjectPopup = false
                        this.handleGetData()
                        this.buyer = ''
                        this.idCard = ''
                        this.bankAccount = ''
                        this.paymentName = ''
                        this.mobile = ''
                        this.selectedProjectName = ''
                        this.receiptAmount = ''
                        this.receiptName = ''
                        this.intentProjectName = ''
                    }
                }).catch(() => {
                })
            },
            submitEdit() {
                if(!this.receiptName){
                    this.$global.errMsg('请输入收款人！')
                    return false
                }

                if(!this.receiptAmount){
                    this.$global.errMsg('请输入付款金额！')
                    return false
                }

                // if(!this.intentProjectName){
                //     this.$global.errMsg('请输入意向项目！')
                //     return false
                // }
                //
                // if(!this.sellerRemarks){
                //     this.$global.errMsg('请输入备注！')
                //     return false
                // }

                let url = `/ld/lh/order/edit/${this.orderId}`
                let params = this.postEditObj;
                params.receiptAmount = this.receiptAmount;
                params.receiptName = this.receiptName;
                params.intentProjectName = this.intentProjectName;
                params.sellerRemarks = this.sellerRemarks;
                // params.orderStatus = "SELLER_CONFIRMED";

                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        this.$global.errMsg('编辑订单成功!')
                        this.showEditOrder = false
                        this.handleGetData()
                        this.orderId = ''
                        this.receiptAmount = ''
                        this.paymentName = ''
                        this.receiptName = ''
                        this.intentProjectName = ''
                        this.sellerRemarks = ''
                    }
                }).catch(() => {
                })
            },
            submitCancel() {
                // if(!this.cancelReason){
                //     this.$global.errMsg('请输入取消原因！')
                //     return false
                // }

                let url = `/ld/lh/order/cancel/${this.orderId}`
                let params = {
                    orderId: this.orderId
                }
                this.$apiPost(url, params).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        this.$global.errMsg('取消订单成功!')
                        this.showCancelConfirmOrder = false
                        this.handleGetData()
                        this.cancelReason = ''
                    }
                }).catch(() => {
                })
            },
            handlePicker (value) {
                this.selectedDate = value
            },
            openPicker () {
                this.$refs.picker.open();
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
            showFilter () {
              this.showTrans = true
            },
            activeProvince(item) {
                this.province = item.label;
                this.cityList = item.children;
            },
            active(item) {
                this.activeCity = item.label;
                this.city = item.label;
                this.openActive = '';
                this.province = '';
                this.cityList = [];
            },
            //重置
            resetKanyangFilter () {
                var allSelectedElements = document.getElementsByClassName("area selected");
                var allSelectedcategoryTagElements = document.getElementsByClassName("categoryTag selected");
                for(var i = 0; i < allSelectedElements.length;i++){
                    allSelectedElements[i].className = 'area'
                    i--
                }
                for(var l = 0; l < allSelectedcategoryTagElements.length;l++){
                    allSelectedcategoryTagElements[i].className = 'categoryTag'
                    l--
                }

                this.customerName = ''
                this.customerRealName = ''
                this.buyer = ''
                this.projectName = ''
                this.filterType = ''

            },
            chooseTypeCategory (e, item) {
                if (e.target.className.indexOf('selected') === -1) {
                    var allSelectedcategoryTagElements = document.getElementsByClassName("categoryTag selected");
                    for(var i = 0; i < allSelectedcategoryTagElements.length;i++){
                        allSelectedcategoryTagElements[i].className = 'categoryTag'
                        i--
                    }
                    e.target.className = 'categoryTag selected'; // 选中
                    this.status = item.value
                } else {
                    e.target.className = 'categoryTag'// 反选
                    // for (var i = 0; i < this.houseAreaArr.length; i++) {
                    //     if (this.houseAreaArr[i] === item.value) {
                    //         this.houseAreaArr.splice(i, 1);
                    //         break
                    //     }
                    // }
                    this.status = ''
                }
            },
            searchFilterData (type) {
                this.userId = sessionStorage.getItem('yjgf_userId');
                // let url = `/ld/order/list`;
                let url = `/ld/lh/orders?page=0&size=150&type=SELLER&buyer=${this.buyer}&projectName=${this.projectName}&status=${this.status}`;
                this.$apiGet(url).then((response) => {
                    if (response.data.status === this.$appConst.status) {
                        // eslint-disable-next-line no-console
                        this.contentShow = true
                        this.contentList = response.data.data.content
                        if(response.data.data.content && response.data.data.content.length > 0){
                            this.showData = true
                            this.showEmpty = false
                        }else{
                            this.showData = false
                            this.showEmpty = true
                        }
                        this.showTrans = false
                    }
                }).catch(() => {
                })
            },
        },
        mounted () {
            this.init()
        },
        components: {
            actionSheetComponent
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
