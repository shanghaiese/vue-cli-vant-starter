export const appConst = {
  /*global userUrl*/
  userUrl: userUrl,
  /*global uploadUrl*/
  uploadUrl: uploadUrl,
  /*global apiUrl*/
  apiUrl: apiUrl,
  /*global selectUrl*/
  selectUrl: selectUrl,
  /*global registerUrl*/
  registerUrl: registerUrl,
  pages: 100,
  pageSize: [100, 80, 60, 50, 1], // [20, 30, 50]
  assetType: 'TradeContract',
  roles: {
    'PLATFORM_MANAGER': '平台管理员',
    'CORE_MANAGER': '核心企业管理员',
    'OPERATOR': '业务操作员'
  },
  orderStatus: {
    TO_BE_CONFIRMED_BY_DEV: '待开发商确认',
    TO_BE_CONFIRMED_BY_OPERATOR: '待运营商确认',
    TO_BE_CONFIRMED_BY_BUYER: '待买方确认',
    TO_BE_COMPLETE_BY_BUYER: '待买方完成交易',
    TO_BE_COMPLETE_BY_OPERATOR: '待运营商完成交易',
    TO_BE_COMPLETE_BY_DEV: '待开发商完成交易',
    SUCCEED: '交易成功',
    CANCEL: '交易取消'
  },
  orderOption: {
    TO_BE_CONFIRMED_BY_DEV: '取消订单',
    TO_BE_CONFIRMED_BY_OPERATOR: '确认订单',
    TO_BE_CONFIRMED_BY_BUYER: '确认订单',
    TO_BE_COMPLETE_BY_BUYER: '完成交易',
    TO_BE_COMPLETE_BY_OPERATOR: '完成交易',
    TO_BE_COMPLETE_BY_DEV: '完成交易',
    SUCCEED: '交易成功',
    CANCEL: '交易取消'
  },
  houseStatus: {
    TO_BE_CONFIRMED:'待卖家确认',
    BUYER_CONFIRMED:'买家已确认',
    SELLER_CONFIRMED:'卖家已确认',
  },


  status: 200,
  yzStatus: 2000000,
  userStatus: 1000000,
  handleHouseStatus (value) {
    if(value === 'TO_BE_CONFIRMED'){
      return '待卖家确认'
    }else if(value === 'BUYER_CONFIRMED'){
      return '买家已确认'
    }else if(value === 'SELLER_CONFIRMED'){
      return '卖家已确认'
    }
  },
  handleHouseSellerStatus (value) {
    if(value === 'TO_BE_CONFIRMED'){
      return '待买家确认'
    }else if(value === 'BUYER_CONFIRMED'){
      return '买家已确认'
    }else if(value === 'SELLER_CONFIRMED'){
      return '卖家已确认'
    }else if(value === 'CANCEL'){
      return '取消交易'
    }
  },
  handleGetImgUrl (arr, type) {
    const list = arr.filter(val => val.description === type)
    list.forEach(val => {
      val.name = val.fileName;
      /*global uploadUrl*/
      val.url = `${uploadUrl}/query/${val.fileId}`
    })
    return list
  },
  handleGetListImgUrl (arr, type) {
    const list = arr.filter(val => val.description === type)
    list.forEach(val => {
      val.name = val.fileName;
      /*global uploadUrl*/
      val.url = `${uploadUrl}/download/${val.fileId}`
    })
    return list
  },
  handleGetHouseListImgUrl (arr) {
    const list = arr.filter(val => (val.contentType === 'image/png' || val.contentType === 'image/jpeg' || val.contentType === 'image/jpg'))
    list.forEach(val => {
      val.name = val.fileName;
      /*global uploadUrl*/
      val.url = `${uploadUrl}/download/${val.fileId}`
    })
    return list
  },
  processingMoneyFormatValue (value) {
    // return new bigdecimal.BigDecimal(val || '0')
    //   .divide(new bigdecimal.BigDecimal('10000'))
    //   .setScale(0, bigdecimal.BigDecimal.ROUND_HALF_UP)
    //   .toString() * 1;
    // value = parseInt(value)
    // let k = 10000,
    //   i;
    // if (value < k) {
    //   value = (value/1e4).toFixed(4)
    // } else {
    //   i = Math.floor(Math.log(value) / Math.log(k));
    //
    //   value = ((value / Math.pow(k, i))).toFixed(4);
    // }
    // return value
    var number = value / 10000
    number = String(number).replace(/^(.*\..{4}).*$/,"$1");
    number = Number(number);
    var num = Number.toString();
    if (!(/(^[1-9]\d*$)/.test(num))) {
      return number
    } else {
      return number.toFixed(4)
    }
    // if(val){
    //   return (val/1e4).toFixed(4)
    // }
    // else return 0

  },
  processingMoneyFormatValueShop (value) {
      // if(parseFloat(value).toString === 'NaN'){
      //   return '待协商'
      // }else{
      //   var number = value / 10000
      //   number = String(number).replace(/^(.*\..{4}).*$/,"$1");
      //   number = Number(number);
      //
      //   var num = Number.toString();
      //   if (!(/(^[1-9]\d*$)/.test(num))) {
      //     if(number == 0){
      //       return '待协商'
      //     }else{
      //       return number
      //     }
      //   } else {
      //     if(number == 0){
      //       return '待协商'
      //     }else{
      //       return number.toFixed(4)
      //     }
      //   }
      // }
      // if( value == 0){
      //   return 0
      // }else{
        var number = value / 10000
        number = String(number).replace(/^(.*\..{4}).*$/,"$1");
        number = Number(number);

        var num = Number.toString();
        if (!(/(^[1-9]\d*$)/.test(num))) {
          if(number == 0){
            return '待协商'
          }else{
            return number
          }
        } else {
          if(number == 0){
            return '待协商'
          }else{
            return number.toFixed(4)
          }
        }
      // }


  },
  // fmoney: function (s, n) {
  //   var negative = false
  //   n = n > 0 && n <= 20 ? n : 2
  //   Number(s).toFixed(n)
  //   if (Number(s) < 0) {
  //     negative = true
  //     s = Math.abs(s)
  //   }
  //   s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  //   let l = s.split('.')[0].split('').reverse()
  //   let r = s.split('.')[1]
  //   let t = ''
  //   for (let i = 0; i < l.length; i++) {
  //     t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  //   }
  //   if (s === 0 || s === '0') {
  //     t += '.00'
  //     return t
  //   } else {
  //     if (!r) {
  //       r = ''
  //       for (var i = 0; i < n.length; i++) {
  //         r = r + '0'
  //       }
  //     }
  //     let sT = t.split('').reverse().join('') + '.' + r
  //     if (sT[1] === ',' && sT[0] === '-') {
  //       let arr = sT.split(sT[1])
  //       t = arr[0] + arr[1]
  //     } else {
  //       t = sT
  //     }
  //     if (negative) {
  //       t = '-' + t
  //     }
  //     return t
  //   }
  // },
  // setSizeNum (s, n) {
  //   var negative = false
  //   n = n > 0 && n <= 20 ? n : 2
  //   Number(s).toFixed(n)
  //   if (Number(s) < 0) {
  //     negative = true
  //     s = Math.abs(s)
  //   }
  //   s = s + ''
  //   var l = s.split('').reverse().join('')
  //   var t = ''
  //
  //   for (var i = 0; i < l.length; i++) {
  //     t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  //   }
  //   t = t.split('').reverse().join('')
  //   t += 'byte'
  //   return t
  // },
  handelToPercent (point) {
    var str = Number(point * 100).toFixed(2)
    str += '%'
    return str
  },
  setAmountNum (s) {
    s = s + ''
    if (s.indexOf('.') > -1) {
      let l = s.split('.')[0].split('')
      let m = '.' + s.split('.')[1]
      var n = ''
      for (var i = 0; i < l.length; i++) {
        if (l[i] !== ',') {
          n += l[i]
        }
      }
      n += m
    } else {
      n = s
    }

    return Number(n)
  },
  resetAmountNum (num) {
    if ((num + '').trim() === '') {
      return ''
    }
    if (String(num).indexOf(',') === -1) {
      num = parseFloat(num)
      num = num.toFixed(2)
      num = parseFloat(num)
      num = num.toLocaleString()
    } else {
      num = num.replace(/,/gi, '')
      num = parseFloat(num)
    }
    return num
  },
  handleTabListSort (data, flag, flagVal) {
    let arr1 = []
    let arr2 = []
    data.map((val) => {
      if (val[flag] === flagVal) {
        arr1.push(val)
      } else {
        arr2.push(val)
      }
    })
    return arr1.concat(arr2)
  },
  // isAcrobatPDFPluginInstalled () {
  //   // 下面代码都是处理IE浏览器的情况
  //   let oAcro = null
  //   let oAcro4 = null
  //   let oAcro7 = null
  //   if ((window.ActiveXObject) || (navigator.userAgent.indexOf('Trident') > -1)) {
  //     for (let x = 2; x < 10; x++) {
  //       try {
  //         oAcro = eval("new ActiveXObject('PDF.PdfCtrl." + x + "');")
  //         if (oAcro) {
  //           return true
  //         }
  //       } catch (e) {
  //       }
  //     }
  //     try {
  //       oAcro4 = new ActiveXObject('PDF.PdfCtrl.1')
  //       if (oAcro4) return true
  //     } catch (e) {
  //     }
  //     try {
  //       oAcro7 = new ActiveXObject('AcroPDF.PDF.1')
  //       if (oAcro7) return true
  //     } catch (e) {
  //     }
  //   } else {
  //     // chrome和FF、safrai等其他浏览器
  //     return true
  //   }
  // },
  // handleShiftCheckAll (option) {
  //   let flag = option.flag
  //   let arrs = option.arr
  //   let ele = option.ele
  //   let eleTh = option.eleTh
  //   let handleSetMultipleSection = option.funHandleSetMultipleSection
  //   let handleEmptySelectArr = option.funEmptyMultipleSetion
  //   let className = option.className
  //   let tabListLength = option.tabListLength
  //   let rem = arrs
  //   let arr = []
  //   let flagNum = 0
  //   let nowRemoveSelect = ''
  //   if (flag === false) {
  //     // $(ele).find(".cell").unbind('click');
  //     // $(ele).find(".el-checkbox__inner").unbind("click");
  //     $(ele).find('.el-checkbox__input').unbind('click')
  //
  //     for (let m = 0; m < ele.length; m++) {
  //       if (!className && className !== 'commonTabs' && className !== 'sAccTrade' && className !== 'contractTable' && className !== 'contractAssTable') {
  //         $(ele[m]).find('.el-checkbox__input').removeClass('is-checked')
  //         $(ele[m]).find('.el-checkbox').removeClass('is-checked')
  //       }
  //       if ($(ele[m]).find('.el-checkbox__input').hasClass('is-disabled')) {
  //         flagNum++
  //       }
  //       // $(ele[m]).find('.el-checkbox__inner').eq(0).on('click', function(e) {
  //       $(ele[m]).find('.el-checkbox__input').eq(0).on('click', function (e) {
  //         e.preventDefault()
  //         rem.push(m)
  //         if (rem.length > 3) {
  //           rem.splice(0, 1)
  //         }
  //         flag = false
  //         if (e.shiftKey) {
  //           e.preventDefault()
  //           handleEmptySelectArr()
  //           if (rem[rem.length - 1] <= rem[rem.length - 2]) {
  //             arr = [rem[rem.length - 1], rem[rem.length - 2]]
  //           } else {
  //             arr = [rem[rem.length - 2], rem[rem.length - 1]]
  //           }
  //           let iMin = arr[0]
  //           let iMax = arr[1]
  //           for (let i = iMin; i <= iMax; i++) {
  //             let mEle = $(ele[i]).find('.el-checkbox__input')
  //             let mEleLable = $(ele[i]).find('.el-checkbox')
  //             if (!mEle.hasClass('is-disabled') && mEle.hasClass('is-checked')) {
  //             } else {
  //               if (!mEle.hasClass('is-disabled')) {
  //                 $(mEle).addClass('is-checked')
  //                 $(mEleLable).addClass('is-checked')
  //                 // aria-checked
  //                 $(mEleLable).attr('aria-checked', true)
  //               }
  //             }
  //           }
  //           nowRemoveSelect = ''
  //           let params = {
  //             ele: ele,
  //             flag: flag,
  //             nowRemoveSelect: nowRemoveSelect,
  //             tabListLength: tabListLength,
  //             removeSelect: false
  //           }
  //           handleSetMultipleSection(params)
  //         } else {
  //           e.preventDefault()
  //           let sEle = $(this).parents('tr').find('.el-checkbox__input')
  //           let mEleLable = $(this).parents('tr').find('.el-checkbox')
  //           if (!$(sEle).hasClass('is-disabled')) {
  //             $(sEle).toggleClass('is-checked')
  //             $(mEleLable).toggleClass('is-checked')
  //             if (!$(sEle).hasClass('is-checked')) {
  //               // nowRemoveSelect = $(this).parent().parent().find('.seleAss').attr('val')
  //               nowRemoveSelect = $(this).parents('tr').find('.seleAss').attr('val')
  //             } else {
  //               nowRemoveSelect = ''
  //             }
  //           }
  //           let params = {
  //             ele: ele,
  //             flag: flag,
  //             nowRemoveSelect: nowRemoveSelect,
  //             tabListLength: tabListLength,
  //             removeSelect: false
  //           }
  //           handleSetMultipleSection(params)
  //         }
  //       })
  //     }
  //     if (flagNum === ele.length && ele.length !== 0) {
  //       $(eleTh).addClass('is-disabled')
  //     } else {
  //       $(eleTh).removeClass('is-disabled')
  //     }
  //     $(eleTh).unbind('click')
  //
  //     $(eleTh).click(function (e) {
  //       let flag = false
  //       let params = {
  //         ele: ele,
  //         flag: flag,
  //         nowRemoveSelect: nowRemoveSelect,
  //         tabListLength: tabListLength,
  //         removeSelect: 'noIsChecked'
  //       }
  //
  //       if (!$(this).hasClass('is-disabled')) {
  //         e.preventDefault()
  //         if (!$(this).hasClass('is-disabled') && $(this).hasClass('is-checked')) {
  //           for (let i = 0; i < ele.length; i++) {
  //             $(ele[i]).find('.el-checkbox__input').removeClass('is-checked')
  //             $(ele[i]).find('.el-checkbox').removeClass('is-checked')
  //           }
  //           $(this).removeClass('is-checked')
  //           flag = true
  //           params.removeSelect = 'noIsChecked' // 取消全选
  //         } else if (!$(this).hasClass('is-disabled')) {
  //           for (let i = 0; i < ele.length; i++) {
  //             if (!$(ele[i]).find('.el-checkbox__input').hasClass('is-disabled')) {
  //               $(ele[i]).find('.el-checkbox__input').addClass('is-checked')
  //               $(ele[i]).find('.el-checkbox').addClass('is-checked')
  //             }
  //           }
  //           $(this).addClass('is-checked')
  //           params.removeSelect = 'isChecked'
  //           flag = false
  //         }
  //         let timer = null
  //         clearTimeout(timer)
  //         timer = setTimeout(() => {
  //           params.nowRemoveSelect = true
  //           // alert(nowRemoveSelect)
  //           if ($(eleTh).hasClass('is-checked')) {
  //             params.removeSelect = 'isChecked'
  //           }
  //           if (!$(eleTh).hasClass('is-checked')) {
  //             params.removeSelect = 'noIsChecked'
  //           }
  //           handleSetMultipleSection(params)
  //         }, 20)
  //       }
  //     })
  //     if (className === 'commonTabs') {
  //       nowRemoveSelect = ''
  //       let params = {
  //         ele,
  //         flag, // 是否全选
  //         nowRemoveSelect,
  //         tabListLength,
  //         removeSelect: false
  //       }
  //       // handleSetMultipleSection(params)
  //     }
  //   }
  //   // 与程序无关，是禁止鼠标选中文字。点选的时候容易选中文字 太讨厌 。
  //   document.onselectstart = function (event) {
  //     event = window.event || event
  //     event.returnValue = false
  //     return false
  //   }
  // },
  handleWheel () {
    // function handle (delta) {
    //   var s = delta + ': '
    //   if (delta < 0) s += '您在向下滚……'
    //   else {
    //     s += '您在向上滚……'
    //     document.getElementById('delta').innerHTML = s
    //   }
    // }

    function wheel (event) {
      if (!event) event = window.event

      if (event.shiftKey) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false
      }
    }

    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false)
      window.onmousewheel = document.onmousewheel = wheel
    }
  },
  handleSetTime (time) {
    if (time && (time.indexOf(' ') > -1)) {
      return time.split(' ')[0]
    } else if (time && (time.indexOf('T') > -1)) {
      return time.split('T')[0]
    } else {
      return time
    }
  },
  timeTransfer (value) {
    if (value === '' || value === undefined) return ''
    let values = new Date(value)
    var year = values.getFullYear()
    var month = values.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    var date = values.getDate()
    if (date < 10) {
      date = '0' + date
    }
    return year + '-' + month + '-' + date
  },
  handleTimeTrans (val) { // 时间格式转时间戳
    if (val === '' || val === undefined) return ''
    let date = new Date(val.replace(/-/g, '/')).getTime()
    return date
  }
}
