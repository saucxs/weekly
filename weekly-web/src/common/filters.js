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

export {
  dateTimeFormat,
  dateFormat
}
