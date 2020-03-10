import Vue from 'vue';
//实现金额每隔三位以’，‘分隔，同时保留两位小数。
Vue.filter('MoneyFormat', function(money) {
    if (money && money != null  && !isNaN(Number(money))) {
      money = String(money);
      var left = money.split('.')[0], right = money.split('.')[1];
      right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
      var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
      return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
    } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
      return '0.00';
    } else {
      return '';
    }
})


//只展示日期
Vue.filter('dateOnly',function(value){
  if(value == '') return '';
  return String(value).split(' ')[0];
})

Vue.filter('timeTransfer',function(value){
    if(value == '' || value == undefined) return '';
    let values=new Date(value);
    //先判断转化格式后是否成功，
    if(!isNaN(values)){
        var  year=values.getFullYear();
        var  month=values.getMonth()+1;
        if(month<10){
            month='0'+month;
        }
        let date=values.getDate();
        if(date<10){
            date='0'+date;
        }
        return year+'-'+month+'-'+date;
    }else{
        //例如日期为“2019-04-28T06:38:02.618+0000”，将+及后面的去掉。
        var value2 = value.substring(0,value.length-5);
        var newValue = new Date(new Date(value2).getTime() + 3600000 * 8);
        let  year = newValue.getFullYear();
        let  month = newValue.getMonth()+1;
        if(month<10){
            month='0'+month;
        }
        let date=newValue.getDate();
        if(date<10){
            date='0'+date;
        }
        return year+'-'+month+'-'+date;
    }
})

//过滤tag字数长短
Vue.filter('tagLength',function(value){
    if(!value || value == ''){
        return '';
    } else {
        return value.slice(0,8) + '...';
    }
})

Vue.filter('projectNameLength',function(value){
    if(!value || value == ''){
        return '';
    } else if(value.length > 25){
        return value.slice(0,25) + '...';
    } else {
        return value
    }
})
