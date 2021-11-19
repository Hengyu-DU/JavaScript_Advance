// 工具对象
(function(){
  var Tools = {
    getRandom: function(min, max){
      // 返回min和max之间的随机数，max不包含在内
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
  window.Tools = Tools
})()
