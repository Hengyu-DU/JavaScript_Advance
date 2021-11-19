function Box(parent,options){
  // 传parent，指定父容器
  // 设置对象的属性，options留给调用的人来传参数
  options = options || {} //给默认值，防止调用者不传参
  this.backgroundColor = options.backgroundColor || 'navy'
  this.width = options.width || 20
  this.height = options.height || 20
  this.x = options.x || 0
  this.y = options.y || 0


  // 创建对应的div
  this.div = document.createElement('div')
  this.parent = parent
  parent.appendChild(this.div)

  // 设置div的样式
  this.init()
}

// 初始化div方块的样式
Box.prototype.init = function(){
  var div = this.div
  div.style.backgroundColor = this.backgroundColor
  div.style.width = this.width + "px"
  div.style.height = this.height + "px"
  div.style.left = this.x + "px"
  div.style.top = this.y + "px"
  // 脱离文档流
  div.style.position = 'absolute'
}

// 随机生成位置
Box.prototype.random = function(){
  // 父容器的宽度/方块的宽度 = 最多能放多少方块
  var x = Tools.getRandom(0, this.parent.offsetWidth / this.width) * this.width
  var y = Tools.getRandom(0, this.parent.offsetHeight / this.height) * this.height

  this.div.style.left = x + 'px'
  this.div.style.top = y + 'px'
}