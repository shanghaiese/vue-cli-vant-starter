import Vue from 'vue';
// import VueResource from 'vue-resource';
// Vue.use(VueResource);


//封装一些全局元素。如全站通用功能函数和http请求等
export const global = {
    webUrl:'http://192.168.10.102:8086/',
    /**
     * 统一接口处理：get请求方法封装。this.$http.get(url, [options])
     * @param url { String } -必选 接口url
     * @param options { Object } -必选 含官方的所有options对象。传参为{params:{key:11}}
     * @param sucCb { Function } -必选 成功回调
     * @param errorCb { Function } -可选 失败回调
     * @param isLoading { Boolean } -可选 是否显示加载状态
     * @param isLogin { Boolean } -可选 是否登陆信息（移动端使用得较多，设置头部信息）
     */
    /*get: function (url, options = {}, sucCb, errorCb, isLoading = true) {
        if (!url) {
            console.log('接口url不能为空！');
            return false;
        }
        Vue.http.get(url, options).then((response) => {
            // 响应成功回调
            sucCb(response);
        }, (response) => {
            // 响应错误回调
            errorCb(response);
            console.log('请求失败');
        })
    },*/

    //修改get请求，添加token
      get:function (url,type,data, $sessionStorage) {
         if(!url){
           // eslint-disable-next-line no-console
            console.log('接口url不能为空!')
            return false
         }
          Vue.$http.get({
              method:type,
              url: url,
              data:data,
              headers:{
                  'access_token': $sessionStorage.accessToken
              }
          })
      },
    //post 请求
    post: function (url, options, sucCb, errorCb) {
        if (!url) {
          // eslint-disable-next-line no-console
            console.log('接口url不能为空！');
            return false;
        }
        Vue.http.post(url, options).then((response) => {
            // 响应成功回调
            sucCb(response);
        }, (response) => {
            // 响应错误回调
            errorCb(response);
          // eslint-disable-next-line no-console
            console.log('请求失败');
        })
    },

    //关闭弹出框时，内容清空
    resetForm: function (form) {
        for (var obj in form) {
            form[obj] = '';
        }
    },
    //提示框
    confirmBox: function (title, callback) {
        // MessageBox.confirm(title, '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        // }).then(() => {
        //     callback();//点击确定时的操作。
        // }).catch(() => {
        //     Message.info('已取消操作');//点击取消时的提示。
        // });
      // eslint-disable-next-line no-console
      console.log(title, callback)
    },
    //删除，启用等操作时公共逻辑
    /**
     * param 一般为某行的id值
     * title为弹出框的提示语
     * URL为点击确定时的请求路径
     * succCallBack为请求成功后的操作
     * succTitle为操作成功后的提示语
     * errTitle为操作失败后的提示语
     */
    common:function(param,title,url,succCallBack,succTitle,errTitle){
        var self=this;
        self.confirmBox(title,function(){
            self.submitCommon(url,{},succCallBack,succTitle,errTitle);
        });
    },
    //添加或编辑的公共部分提取。
      submitCommon(url,params,succCallBack,errorCallBack,sussTitle,errTitle){
        var self=this;
        self.get(url,{ params:params},function (res) {
            if(res.body.result){
              self.succMsg(sussTitle);
              succCallBack(res);
            }
            else{
              errorCallBack();
              self.errMsg(errTitle);
            }
          }, function () {
             errorCallBack();
             self.errMsg(errTitle);
          })
      },
      //post提交
      postSubmit(url,params,succCallBack,errorCallBack,sussTitle,errTitle){
        var self=this;
        self.post(url,params,function (res) {
            if(res.body.result){
              self.succMsg(sussTitle);
              succCallBack(res);
            }
            else{
              errorCallBack();
              self.errMsg(errTitle);
            }
          }, function () {
             errorCallBack();
             self.errMsg(errTitle);
          })
      },
    //message成功提示
    succMsg(){
        // Message.success({
        //     message:message,
        //     showClose:true
        // });
        
    },
    //message操作提示
     info(){
        // Message.info({
        //     message:message,
        //     showClose:true
        // });
    },
    //message失败提示
    errMsg(message){
      Vue.$vux.toast.show({
        type: 'text',
        text: message,
        width: 'auto'
      })
    },
    //messageBox警告提示
    warningMesBox(){
        // MessageBox.alert(message,'提示');
    },
    //保留几位小数
    toDecimal(x,num) {
        var val = Number(x)
        if(!isNaN(parseFloat(val))) {
            val = val.toFixed(num);
            return val;
        }
        else{
            return '0';
        }
    },
    //日期格式转化 格式为2017-06-06
    timeTransfer(value){
        if(value == '' || value == undefined) return '';
        let values = new Date(value);
        var year = values.getFullYear();
        var month = values.getMonth() + 1;
        if(month<10){
            month='0'+month;
        }
        var date = values.getDate();
        if(date < 10){
            date = '0'+date;
        }
        return year + '-' + month + '-' + date;
    },
     //生成随机UUID
     uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
     
        if (len) {
          // Compact form
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
          // rfc4122, version 4 form
          var r;
     
          // rfc4122 requires these characters
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
     
          // Fill in random data.  At i==19 set the high bits of clock sequence as
          // per rfc4122, sec. 4.1.5
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random()*16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
          }
        }
     
        return uuid.join('');
    },
    concateUrl(url1, url2){
        if(!url1 || !url1.length || url1.length == 0 || url1.trim().length == 0){
            return url2;
        }else if(!url2|| !url2.length || url2.length == 0 || url2.trim().length == 0){
            return url1;
        }else{
            url1 = url1.trim();
            url2 = url2.trim();
            if(url1[url1.length -1] == '/' && url2[0] == '/'){
                return url1 + url2.substring(1);
            }else if(url1[url1.length - 1] != '/' && url2[0] != '/'){
                return url1 + '/' + url2;
            }else{
                return url1 + url2;
            }
        }
    },

};

