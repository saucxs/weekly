/*
* 日期时间戳
* */
let dateTimeFormat = item => {
  if(!item) return '--';
  var date = new Date(parseInt(item));
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h=h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second=date.getSeconds();
  second=second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}

/*
* 日期戳
* */
let dateFormat = item => {
  if(!item) return '--';
  var date = new Date(parseInt(item));
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h=h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second=date.getSeconds();
  second=second < 10 ? ('0' + second) : second;
  return y + '.' + m + '.' + d;
}

/*
* 职务
* */
let roleFilter = item => {
  if(!item) return '--';
  var role_name;
  if(item == 1){
    role_name = '管理员'
  }else if(item == 2){
    role_name = '总监'
  }else if(item == 3){
    role_name = '部门经理'
  }else if(item == 4){
    role_name = '成员'
  }
  return role_name;
}

export {
  dateTimeFormat,
  dateFormat,
  roleFilter
}
