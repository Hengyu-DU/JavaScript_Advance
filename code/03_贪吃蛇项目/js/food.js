// 所有JS文件中书写代码，都是全局作用域

// function fn(){
//   // 局部作用域
//   var n = 1
// }
// fn()

// 自调用函数: 开启一个新的作用域，避免命名冲突
(function () {

  // 记录上一次创建的食物，为删除做准备
  var elements = []

  function Food(options){
    options = options || {}
    this.x = options.x || 0
    this.y = options.y || 0
    this.width = options.width || 20
    this.height = options.height || 20
    this.color = options.color || '#7bbf0f'
  
  }
  
  Food.prototype.render = function(map){
    // 删除之前的食物
    remove() // 这个方法不希望被外界所访问到，因为删除仅在创建后才发生，不会单独发生
  
    // 随即设置x和y的值
    this.x = Tools.getRandom(0, map.offsetWidth/this.width) * this.width
    this.y = Tools.getRandom(0, map.offsetHeight/this.height) * this.height
  
    // 动态创建一个div
    var div = document.createElement('div')
    map.appendChild(div)
  
    elements.push(div)
  
      // 设置div的样式
    div.style.position = 'absolute'
    div.style.left = this.x + 'px'
    div.style.top = this.y + 'px'
    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.color
    div.style.borderRadius = '50%'
  }
  
  function remove(){
    for (var i = elements.length-1 ; i>=0 ;i--){
      // 删除div
      elements[i].parentNode.removeChild(elements[i])
      // 删除数组中的元素
      // splice(startNode, count)
      elements.splice(i,1)
    }
  }

  // 要把Food构造函数，让外部可以访问，利用window
  window.Food = Food
})()

  // 测试
  // var map = document.getElementById('map')
  // var food = new Food()
  // food.render(map)
