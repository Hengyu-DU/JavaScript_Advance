// main.js 作为入口文件

// 生成10个方块，并随机生成颜色
var container = document.getElementById('container')

// 数组，存储创建的方块对象
var arr = []

for (var i = 0 ; i < 10; i++){
  var r = Tools.getRandom(0,256)
  var g = Tools.getRandom(0,256)
  var b = Tools.getRandom(0,256)
  var box = new Box(container,{
    backgroundColor:'rgb('+r+','+g+','+b+')'
  })
  // 把创建好的方块对象添加到数组中。为了定时器可以找到
  arr.push(box)
}

// 调用一次，使页面一加载就产生随机坐标
randomlizeBox()

// 设置随机位置，开启定时器
setInterval(randomlizeBox,300)

function randomlizeBox(){
    // 随机生成方块的坐标
    for(var i = 0 ; i < arr.length; i++){
      var box = arr[i]
      box.random()
    }
}