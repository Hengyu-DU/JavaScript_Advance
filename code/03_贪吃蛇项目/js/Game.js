(function(){
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
          case that.forbiddenKey:
            break;
          case 'ArrowUp':
            that.snake.direction = 'up'
            that.forbiddenKey = 'ArrowDown'
            break;
          case 'ArrowDown':
            that.snake.direction = 'down'
            that.forbiddenKey = 'ArrowUp'
            break;
          case 'ArrowLeft':
            that.snake.direction = 'left'
            that.forbiddenKey = 'ArrowRight'
            break;
          case 'ArrowRight':
            that.snake.direction = 'right'
            that.forbiddenKey = 'ArrowLeft'
            break;
        }
      }
    )
  }

  // 私有的函数
  function runSnake(){
    // 遇到边界游戏结束
    var maxX = that.map.offsetWidth / that.snake.width
    var maxY = that.map.offsetHeight / that.snake.height
    
    var timerId = setInterval(function(){
      var headX = that.snake.body[0].x
      var headY = that.snake.body[0].y  
      if(headX < 0 || headY < 0 || headX >= maxX || headY >= maxY){
        clearInterval(timerId)
        alert('Game Over')
      } else {
        //让蛇走一格
        //定时器的function中，this是指向window对象的
        that.snake.move(that.food,that.map)
        that.snake.render(that.map)
      }
    // },3000)
    },200)

    
  }

  window.Game = Game
})()

