
// ---------------- tools----------------------
;(function(){
  var Tools = {
    getRandom: function(min, max){
      // 返回min和max之间的随机数，max不包含在内
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
  window.Tools = Tools
})()

// ---------------- food----------------------
;(function () {

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
      elements[i].parentNode.removeChild(elements[i])
      elements.splice(i,1)
    }
  }

  window.Food = Food
})()

// ---------------- snake----------------------
;(function (){
  var elements = [] // 记录之前创建的蛇节
  function Snake(options){
      // 蛇节的大小
    options = options || {}
    this.width = options.width || 20
    this.height = options.height || 20
    // 蛇移动方向
    this.direction = options.direction || 'right'
    // 蛇身 （第一个元素是蛇头）
    this.body = [
      {x:3, y:2, color: 'red'},
      {x:2, y:2, color: 'navy'},
      {x:1, y:2, color: 'navy'}
    ]
  }

  Snake.prototype.render = function(map){
    // 删除之前创建的蛇
    remove()
    // 把每一个蛇节渲染到地图上
    for (var i=0, len = this.body.length; i < len ; i++){
      var object = this.body[i]
      var div = document.createElement('div')
      map.appendChild(div)
      // 记录蛇节
      elements.push(div)
      // 设置样式
      div.style.position = 'absolute'
      div.style.width = this.width + 'px'
      div.style.height = this.height + 'px'
      div.style.top = object.y * this.height + 'px'
      div.style.left = object.x * this.width + 'px'
      div.style.backgroundColor = object.color
    }
  }

  // 控制蛇移动的方法
  Snake.prototype.move = function(food,map){
    // 控制蛇的身体移动（当前蛇节 到 上一个蛇节的位置）
    for(var i = this.body.length - 1; i > 0 ; i--){
      this.body[i].x = this.body[i-1].x
      this.body[i].y = this.body[i-1].y
    }
    // 控制蛇头的移动
    // 判断蛇移动的方向
    var head = this.body[0]

    switch(this.direction){
      case 'right':
        head.x += 1
        break;
      case 'left':
        head.x -= 1
        break;
      case 'up':
        head.y -= 1
        break;
      case 'down':
        head.y += 1
        break;
    }

    // 判断蛇头是否和食物坐标重合
    var headX = head.x * this.width
    var headY = head.y * this.height
    if(headX == food.x && headY == food.y){
      food.render(map)
      // 新增一个蛇节
      var last = this.body[this.body.length-1]
      // this.body.push({
      //   x:last.x,
      //   y:last.y,
      //   color:last.color
      // })

      var obj = {}
      extend(last,obj)
      this.body.push(obj)
    }
  }

  // 复制对象成员给另一个对象
  function extend(parent,child){
    for(var key in parent){
      if(child[key]){
        continue;
      }
      child[key] = parent[key]
    }
  }

  function remove(){
    for(var i = elements.length-1 ; i >=0 ; i--){
      //删除div
      elements[i].parentNode.removeChild(elements[i])
      //删除数组中的元素
      elements.splice(i,1)
    }
  }

  // 暴露构造函数给外部
  window.Snake = Snake
})()

// ---------------- game----------------------
;(function(){
  var that
  function Game(map){
    this.food = new Food()
    this.snake = new Snake()
    this.map = map
    this.forbiddenKey = 'ArrowLeft'
    that = this
  }

  Game.prototype.start = function(){
    // 1. 把蛇和食物渲染到地图上
    this.food.render(this.map)
    this.snake.render(this.map)

    // 2. 开始游戏的逻辑
    // 2.1 让蛇移动起来
    runSnake()
    // 2.2 当蛇遇到边界，游戏结束
    // 2.3 通过键盘控制移动方向
    bindKey()
    // 2.4 当蛇遇到食物，做相应的处理
  }

  function bindKey(){
    // document.onkeydown = function(){}
    document.addEventListener('keydown',
    function(e){
        switch(e.key){
          case this.forbiddenKey:
            break;
          case 'ArrowUp':
            this.snake.direction = 'up'
            this.forbiddenKey = 'ArrowDown'
            break;
          case 'ArrowDown':
            this.snake.direction = 'down'
            this.forbiddenKey = 'ArrowUp'
            break;
          case 'ArrowLeft':
            this.snake.direction = 'left'
            this.forbiddenKey = 'ArrowRight'
            break;
          case 'ArrowRight':
            this.snake.direction = 'right'
            this.forbiddenKey = 'ArrowLeft'
            break;
        }
      }.bind(that),false
    )
  }

  // 私有的函数
  function runSnake(){
    // 遇到边界游戏结束
    var timerId = setInterval(function(){
      var maxX = this.map.offsetWidth / this.snake.width
      var maxY = this.map.offsetHeight / this.snake.height
      var headX = this.snake.body[0].x
      var headY = this.snake.body[0].y  
      if(headX < 0 || headY < 0 || headX >= maxX || headY >= maxY){
        clearInterval(timerId)
        alert('Game Over')
      } else {
        //让蛇走一格
        //定时器的function中，this是指向window对象的
        this.snake.move(this.food,this.map)
        this.snake.render(this.map)
      }
    // },3000)
    }.bind(that),200)

    
  }

  window.Game = Game
})()

// ---------------- main----------------------
;(function(){
  var map = document.getElementById('map')
  var game = new Game(map)
  game.start()
})()

