# JavaScript 高阶部分

### - 目标

- 理解面向对象开发思想
- 掌握JavaScript面向对象开发相关模式
- 掌握在JavaScript中使用正则表达式

### - 案例演示

- 贪吃蛇



# 一、回顾

### （1）重新介绍JavaScript

#### JavaScript是什么

- 解析执行：轻量级解释型
  - 解释执行：解释一行执行一行（慢）
  - 编译执行：java、c#，一次性把代码编译成可执行的代码，再逐行执行（快）
- 语言特点：动态，头等函数（First-class Function）
  - 又称函数是JavaScript中的一等公民
- 执行环境：在宿主环境（Host environment）下运行，浏览器是最常见的JavaScript宿主环境。
  - 但是在很多非浏览器环境中也使用JavaScript，例如node.js

#### JavaScript的组成

- ECMAScript - 语法规范
  - 变量、数据类型、类型转换、操作符
  - 流程控制语句：判断、循环语句
  - 数组、函数、作用域、预解析
  - 对象、属性、方法、简单类型和复杂类型的区别
  - 内置对象：Math、Date、Array，基本包装类型String、Number、Boolean
- Web APIs
  - BOM
    - onload页面加载事件，window顶级对象
    - 定时器
    - location、history
  - DOM
    - 获取页面元素，注册事件
    - 属性操作，样式操作
    - 节点属性，节点层级
    - 动态创建元素
    - 事件：注册事件的方式、事件的三个阶段、事件对象

#### JavaScript 可以做什么

> 阿特伍德定律：
>
> Any application that can be written in JavaScript, will eventually be written in JavaSript.
>
> 阿特伍德——stackoverflow的创始人之一

### （2）浏览器是如何工作的

<img src="./img/浏览器工作流程.png" style="zoom: 33%;" />

[^User Interface]: 用户界面，我们看到的浏览器。
[^Browser engine]: 浏览器引擎，用来查询和操作渲染引擎。
[^*Rendering engine]:渲染引擎，用来显示请求的内容，负责解析HTML、CSS，并把解析的内容显示出来。
[^Networking]:网络，负责发送网络请求
[^*JavaScript Interpreter]:JS解析器，负责执行JS代码
[^UI Backend]:UI后端，用来绘制类似组合框和弹出窗口
[^Data Persistence]:数据持久化，数据存储 cookie、HTML5中的sessionStorage



### （3）JavaScript的执行过程

JavaScript 运行分为两个阶段：

- 预解析

  - 全局预解析（所有变量和函数声明都会提前：同名的函数和变量，函数的优先级高）
  - 函数内部预解析（所有的变量、函数和形参都会参与预解析）
    - 函数
    - 形参
    - 普通变量

- 执行：

  先预解析全局作用域，然后执行全局作用域中的代码，在执行全局代码的过程中遇到函数调用就会先进行函数预解析，然后再执行函数内代码。



# 二、JS面向对象编程

### （1）面向对象介绍

#### 什么是对象

> Everything is object.

对象到底是什么，我们可以从两个层次来理解：

**(1) 对象是单个事物的抽象**

一本书、一辆汽车、一个人可以是对象，一个数据库、一个网页、一个与远程服务器的连接也可以是对象。当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。

**(2) 对象是一个容器，封装了属性(property)和方法(method)**

属性是对象的状态，方法是对象的行为（完成某种任务）。比如，我们可以把动物抽象为animal对象，使用“属性”记录具体是哪一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。

在实际研发中，对象是一个抽象的概念，可以将其简单理解为：**数据集或功能集**。

ECMAScript-262 把对象定义为：**无序属性的集合，其属性可以包含基本值、对象或者函数**。严格来讲，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都映射到一个值。

提示：每个对象都是基于一个引用类型创建的，这些类型可以是系统内置的原生类型，也可以是开发人员自定义的类型。



#### 什么是面向对象

面向对象编程——Object Oriented Programming，简称OOP，是一种编程开发思想。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。

在面向对象程序开发思想中，每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。

因此，面向对象编程具有**灵活、代码可复用、高度模块化**等特点，容易维护和开发，比起一系列函数或指令组成的传统的过程式编程（Procedural Programming），更适合多人合作的大型软件项目。

#### 面向对象与面向过程

- 面向过程就是亲历亲为，事无巨细，面面俱到，步步紧跟，有条不紊
- 面向对象就是找一个对象，指挥得结果
- 面向对象将执行者转变为指挥者
- 面向对象不是面向过程的替代，而是面向过程的封装

#### 面向对象的特性

- 封装性
- 继承性
- [多态性] 抽象

 #### 演示面向对象

```js
// 1. 面向过程
// 1.1 记录学生的成绩
  var stu1 = {name:'Aa',subject:'English',socre:90}
  var stu2 = {name:'Bb',subject:'English',socre:80}
// 1.2 打印学生的成绩
  console.log(stu1.name, stu1.subject, stu1.socre)
  console.log(stu2.name, stu2.subject, stu2.socre)

// 2. 面向对象
// 创建一个模板，用于创建对象（创建实例instance）
// 在JavaScript中创建对象的模板是构造函数
// 而在其他语言中创建对象的模板是类，ES6新增了class
  function Student(name,subject,score){
    this.name = name
    this.subject = subject
    this.score = score
    this.printScore = function(){
      console.log(this.name, this.subject, this.score)
    }
  }

  var stu1 = new Student('Aa','English',90)
  var stu2 = new Student('Bb','English',80)

  stu1.printScore()
  stu2.printScore()
```

### （2）创建对象的方式

#### 1. new Object( )
```js
  var hero = new Object()
  hero.blood = 100
  hero.name = '刘备'
  hero.weapon = '剑'

  hero.attack = function(){
    console.log('使用' + this.weapon + '攻击敌人')
  }
```

#### 2. 对象字面量
```js
  // var hero = {} // 空对象
  var hero1 = {
    blood:100,
    name:'刘备',
    weapon:'剑',
    attack: function(){
      console.log('使用' + this.weapon + '攻击敌人')
    }
  }
  var hero2 = {
    blood:120,
    name:'关羽',
    weapon:'大刀',
    attack: function(){
      console.log('使用' + this.weapon + '攻击敌人')
    }
  }
  // ...hero3 ...hero4
  // 当创建单个对象，可用对象字面量。当创建多个对象会产生很多冗余。
```

#### 3.工厂函数 创建多个对象
```js
  function createHero(name,blood,weapon){
    var o = new Object()
    o.name = name
    o.blood = blood
    o.weapon = weapon
    o.attack = function(){
      console.log('使用' + o.weapon + '攻击敌人')
    }
    return o
  }

  var hero1 = createHero('刘备',100,'剑')
  var hero2 = createHero('关羽',120,'刀')

  // 工厂函数创造出的对象无法使用instanceof，而typeof无法辨别复杂对象
  console.log(hero1 instanceof ??)
  console.log(typeof hero1) // object

  var arr = []
  console.log(typeof arr) // object
```

#### 4.构造函数

1. 会在内存中创建一个空对象
2. 设置构造函数的this，让this指向刚刚创建好的对象
3. 执行构造函数中的代码
4. 返回对象

```js
  function Hero(name,blood,weapon){ // 函数名大写
    this.name = name                // 无需手动创建对象
    this.blood = blood
    this.weapon = weapon
    this.attack = function(){
      console.log('使用' + this.weapon + '攻击敌人')
    }
  }                                 // 无需手动return

  var hero1 = new Hero('刘备',100,'剑') // 使用 new
  var hero2 = new Hero('关羽',120,'刀')

  // 【1】无法使用 typeof获得具体的对象类型
  // 【2】constructor 构造器 - 获取对象的具体类型 - 不建议
  console.log(hero1.constructor) // Hero
  var arr = [] // new Array()
  console.log(arr.constructor) // Array

  // 【3】instanceof 判断某个对象是否是某个构造函数的实例/对象
  console.log(hero1 instanceof Hero) // true
  var arr = []
  console.log(arr instanceof Array) // true
  
```

### （3）静态成员和实例成员

#### 静态成员

1. 直接使用对象来调用
2. 使用场景：工具中使用，如内置对象Math、自定义的MyMath.PI、MyMath.max()
```js
  // 利用对象封装自己的数学对象 里面有PI、最大值和最小值
  var myMath = {
      PI: 3.141592653,
      max: function () {},
      min: function () {}
  }
```

#### 实例成员

1. 构造函数中的成员就是实例成员
2. 使用场景：当有很多个对象的时候，使用构造函数的形式来创建对象 



### （4）原型：解决sayHi存储多份的问题

多个对象时，会存储多个相同的sayHi方法：
```js
  function Student(name, age, sex){
    this.name = name
    this.age = age
    this.sex = sex
    this.sayHi = function (){
      console.log("Hello, I'm" + this.name) // 谁调用，this就指向谁
    }
  }
  var s1 = new Student('A',12,'male')
  var s2 = new Student('B',12,'female')

  console.log(s1.sayHi === s2.sayHi) // false
```

解决方式1——放在外层：
```js
  function Student(name, age, sex){
      this.name = name
      this.age = age
      this.sex = sex
      this.sayHi = sayHi
    }
  function sayHi(){
    console.log("Hello, I'm" + this.name)
      }
```

解决方式2——原型：

每一个构造函数都有一个属性：原型/原型对象
```js
  function Student(name,age,sex){
    this.name = name
    this.age = age
    this.sex = sex
  }

  Student.prototype.sayHi = function () {
    console.log("Hello, I'm" + this.name)
  }

  // 通过Student构造函数，创建的对象，可以访问Student.prototype中的成员
  var s1 = new Student('A',12,'male')
  var s2 = new Student('B',12,'female')

  s1.sayHi()
  s2.sayHi()

  console.log(s1.sayHi === s2.sayHi) // true,说明占用的是同一块儿内存空间

```

### （5）实例对象的原型

当调用对象的属性或者方法的时候，先去找对象本身的属性或方法；如果本身没有，此时去调用原型中的属性或方法；如果原型中也没有，会报错。

- `s1.__proto__`(实例对象的__proto__)等于构造函数Student的prototype
- `__proto__`属性是非标准的属性

```js
  console.log(s1.__proto__ === Student.prototype) // true
  console.dir(s1.__proto)
  console.dir(Student.prototype)
```

在实例对象的原型对象（`s1.__proto__`，即`Student.prototype`）中有一个属性`constructor`，记录了创建该对象的构造函数。
```js
  console.log(s1.constructor === Student) // true

  var arr = []
  console.log(arr.constructor === Array) // true
  // 实际上调用的是Array.prototype.constructor
```

### （6）原型三角关系

<img src="./img/构造函数、实例、原型之间的关系.png" style="zoom: 50%;" />

### （7）原型链

<img src="./img/原型链.png" style="zoom: 33%;" />

s1对象的原型对象的原型对象 = Object构造函数的原型对象
```js
  console.log(s1.__proto__.__proto__ === Object.prototype) // true
```

- 属性查找、对象查找规则：先从实例对象身上找，如果没有然后就沿原型链向上找，**就近原则**。

- 属性设置规则：如果test属性在原型对象上，给实例对象设置test属性时并不会搜索原型链，而是直接给该对象新增一个test属性（不妨碍其他实例对象查找原型对象上的test属性）。

```js
  Student.prototype.test = 'abc'
  s1.name = 'xxx'
  s1.test = '123xxx'

  console.log(s1.test) // '123xxx'
  console.log(s2.test) // 'abc'
```

- 注意点：当我们改变构造函数的prototype的时候，**需要重新设置constructor属性**，来模仿原来的prototype，本质上，原来的原型对象也只是一个普通的object而已。

```js
  Student.prototype = {
      constructor:Student,
      sayHi: function (){  // 我们想新增的属性
        console.log('Hi!')
      },
  } 
```

  ### （8）扩展内置对象

数组或String中的prototype默认是不可以直接赋值修改的，因为里面已经内置了大量方法，但可以新增方法：
```js
  // 新增一个偶数求和的方法
  Array.prototype.getSum = function () {
    var sum = 0
    for (var i = 0; i <this.length; i++){
      if (this[i] % 2 === 0 ){
        sum += this[i]
      }
    }
    return sum
  }
  
  // 如果直接以赋值的形式来新增，会失败：
  Array.prototype = {
    getSum: function(){...}
  }

```



### * 随机方块项目

对象：

1. 工具对象，生成随机数
2. 方块对象（包括大小、颜色、坐标属性）



# 三、游戏案例：贪吃蛇

### （1）案例介绍

游戏的目的是用来体会JavaScript高级语法的使用，不需要具备抽象对象的能力，使用面向对象的方式分析问题，需要一个漫长的过程。

### （2）分析对象

- 游戏对象（处理逻辑）
- 蛇对象
- 食物对象

### （3）创建食物对象

- Food
  - 属性：
    - x
    - y
    - width
    - height
    - color
  - 方法：
    - render 随机创建一个食物对象，并输出到map上

* 注意：
  为了防止js文件内变量与其他文件的变量的命名冲突，可以使用自调用函数，形成局部作用域。而需要被外部访问的变量，则利用js的顶级对象window来暴露：
  ```js
  (function (){
    // 局部作用域
    var a = 1
    window.a = a
  })
  
  console.log(a) // 1
  ```

### （4）创建蛇对象

- Snake
  - 属性：
    - width
    - height
    - body 数组，蛇头+蛇身
    - direction 运动方向
  - 方法：
    - render 渲染


### （5）创建游戏对象

- Game
  - 属性：
    - food
    - snake
    - map 
  - 方法：
    - start 开始游戏(绘制所有游戏对象)

### （6）bind 用于绑定this指向
ES5中新增的方法（IE9以上）：
    - 用于新建一个方法，bind中的第一个参数可以改变函数中的this指向
    - bind 并没有调用方法
```js
    var a = 123
    function fn(){
      console.log('我是this.a：',this.a)
    }
    fn() // 123

    var obj = {a:'abc'}
    var fn1 = fn.bind(obj)
    fn1() // 'abc'

    var fn2 = function(){
      console.log('我是this.a：',this.a)
    }.bind(obj)
    fn2() // 'abc'
```


### （7）自调用函数的问题
使用自调用函数时前面要加分号:

```js
    ;(function(){
      console.log('1');
    })()

    ;(function(){  
      console.log('2');
    })()

    var fn = function(){
      console.log('普通函数');
    }

    ;(function(){  
      console.log('2');
    })()
```



# 四、继承

面向对象三大特征：封装、继承、多态（抽象）

### （1）什么是继承

- 现实生活中的继承
- 程序中的继承

### （2）对象的继承

- 继承：类型和类型之间的关系。
- 继承的目的：把子类型中共同的成员提取到父类中，代码重用。
- 例如，学生管理系统：学生类型 老师类型 继承了=> Person类型


#### 1. 对象的拷贝

复制对象成员给另一个对象(对象的拷贝)，并不是真的继承：
```js
function extend(parent,child){
  for(var key in parent){
    if(child[key]){
      continue;
    }
    child[key] = parent[key]
  }
}
```

#### 2. 原型继承

原型继承：无法设置函数的参数（缺点，不实用）
```js
function Person(){  // 父类型
      this.name = 'Zhang'
      this.age = 18
      this.sex = '男'
    }

function Student(){  // 子类型
  this.score = 100
  }

Student.prototype = new Person()
Student.prototype.constructor = Student  
// 当改变prototype时，一定要给constructor赋值

var s1 = new Student()
console.log(s1.constructor) // Student
console.dir(s1);
```


#### 3. 借用构造函数

- call(this指向, 其他参数)
- 作用：改变函数的this,并直接调用函数

```js
 function fn(x,y){
      console.log(this);
      console.log(x + y);
  }

  var o = { name:'zs' }
  fn.call(o, 1, 2) // o 3 
```

借用构造函数，即利用call，在子类型中调用父类型，可按需输入不同的参数

```js
// 借用构造函数
    function Person(name,age,sex){  // 父类型
      this.name = name
      this.age = age
      this.sex = sex
    }

    Person.prototype.sayHi = function(){
      console.log(this.name);
    }

    // 子类型
    function Student(name, age, sex, score){  // 子类型
      Person.call(this,name,age,sex)
      this.score = score
    }

    var s1 = new Student('zs',18,'male',100)
    console.dir(s1)
```


#### 4. 组合继承

组合继承：借用构造函数 + 原型继承

```js
  function Teacher(name,age,sex,salary){
    // 1. 借用构造函数
    Person.call(this, name, age, sex)
    this.salary = salary;
  }

  // 2. 通过原型，让子类型继承父类型中的方法，而访问不到其他子类型添加的方法
  Teacher.prototype = new Person()
  Teacher.prototype.constuctor = Teacher

  var t1 = new Teacher('王五',30,'男',10101010)
  console.dir(t1); // 输出结果见下图
```

<img src="./img/组合继承.jpg" style="zoom: 67%;" />

- 组合继承，原型三角图：

  <img src="./img/组合继承三角图1.jpg" style="zoom:50%;" />

  <img src="./img/组合继承三角图2.jpg" style="zoom: 33%;" />


- 将贪吃蛇中蛇对象和食物对象的width和height利用组合继承改造后发现，代码量变多了，变得更复杂了。我们可以总结，一般在做网页特效，我们不会使用继承。而继承更多被使用在**写框架**的时候。



# 五、函数进阶

### （1）函数的定义方式

- 1. 函数声明和函数表达式

```js
  // 1 函数声明
  function fn(){
      console.log('test');
    }
  fn()

  // 2 函数表达式
  var fn = function(){
      console.log('test');
    }
```

函数声明和函数表达式的区别：
- 函数表达式的变量声明会自动提前：
```js
  var fn // 声明提前

  fn = function(){
      console.log('test');
    }
```
注意： 现代浏览器不会提升if语句中的函数声明，但在老的IE版本中，if语句中的函数声明也会提升。解决该问题的办法，就是不要使用函数声明，而使用函数表达式：
```js
  var fn // 使用函数表达式

  if (true){
    fn = function(){
      console.log('fn - true');
    }
  } else {
    fn = function (){
      console.log('fn - false');
    }
  }
  fn()
```

- 2. new Function()

特点：
1.要写在字符串里
2.运行速度较前两种较慢，因此不推荐

```js
  var fn = new Function('var name = "张三"; console.log(name) ')
  fn()
  console.dir(fn); // 但由此可知，函数也是一个对象

  // 传递参数的写法
  var fnn = new Function('a','b','console.log(a+b)')
  fnn(1,2) // 3
```

### （2）函数的调用方式及this指向
1. 普通函数调用(this指向window)
```js
function fn(){
  console.log(this) // window
}
fn()
```
2. 方法调用(this指向调用该方法的对象)
```js
var obj = {
  fn: function(){}
}
obj.fn
```
3. 作为构造函数调用
(构造函数内部的this指向由该构造函数创建的实例对象)

4. 作为事件的处理函数
(this指向触发该事件的对象)
```js
btn.onclick = function(){
  console.log(this) // btn
}
```

5. 作为定时器的参数
(this指向window)
```js
setInterval(function(){
  console.log(this) // window
},1000)
```

### （3）函数内this指向的不同场景
终极总结：函数内部的this，不是书写的时候决定的，而是由函数调用的时候来确定其指向的。

```js
var obj = {
  name:'zs',
  fn:functon(){
    console.log(this)
  }
}

var fn = obj.fn
fn()  // this -> window

obj.fn()  // this -> obj
```

【注意】箭头函数的this定义： 箭头函数的this是在**定义函数时绑定的**，不是在执行过程中绑定的。

​	由于箭头函数不绑定this， 它会捕获**其所在（即定义的位置）上下文的this值**， 作为自己的this值，所以 call () / apply () / bind () 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。

### （4）call\apply\bind

- call 
  - 用法：call(this指向, 其他参数)
  - 作用：改变this，并直接调用函数

- apply
  - 用法：apply(this指向, [数组])
  - 作用：改变this，并展开数组，将每一项一起传给函数并调用

- bind
  - 用法：bind(this指向)
  - 作用：改变this，但不调用函数


### （5）函数的其它成员
```js
function fn(x,y){
      // 【需要掌握的】 函数内部的私有变量arguments
      console.log(arguments);

      // 伪数组 获取到的是函数的实参
      console.log(fn.arguments);
      // 函数的调用者，如果在全局范围内caller是null
      console.log(fn.caller);
      // 函数的名称 字符串类型
      console.log(fn.name);
      // 函数的形参个数
      console.log(fn.length);
    }

    console.dir(fn);

    function foo(){
      fn(1,2,3)
    }

    foo()
```

- arguments
    - 作用：当函数的参数个数不固定的时候，在函数内部可以通过arguments获取到实际传过来的参数
```js
    function max(){
      var max = arguments[0]
      for (var i = 0 ; i < arguments.length; i++){
        if(max < arguments[i]){
          max = arguments[i]
        }
      }
      return max
    }

    console.log(max(1,2,3,999)); // 999
```

### （6）严格模式

JavaScript除了提供正常模式外，还提供了**严格模式（strict mode）**。ES5的严格模式是采用具有限制性JavaScript变体的一种方式，即在严格的条件下运行JS代码。

严格模式在IE10以上版本的浏览器中才会被支持，旧版本浏览器中会被忽略。

严格模式对正常的 JavaScript语义做了一些更改：
1. 消除了 Javascript语法的一些不合理、不严谨之处，了一些怪异行为
2. 消除代码运行的一些不安全之处，保证代码运行的安全。
3. 提高编译器效率，增加运行速度。
4. 禁用了在 ECMAScript的未来版本中可能会定义的一些语法，为未来新版本的 Javascript做好铺垫。比如一些保留字如: class，enum， export， extends，import，super不能做变量名。

严格模式可以应用到整个脚本或个别函数中。因此在使用时，我们可以将严格模式分为**为脚本开启严格模式**和**为函数开启严格模式**两种情况

#### 为脚本开启严格榄式
有的script基本是严格模式，有的script脚本是正常模式，这样不利于文件合并，所以可以将整个脚本文件放在一个立即执行的匿名函数之中，这独立创建一个作用域而不影响其他 script脚本文件。
```html
<script>
  (function(){
    "use strict";
    var a = 10
  })()
</script>
```
#### 为函数开启严格榄式
要给某个函数开启严格模式，需要把 "use strict"; 声明放在该函数体所有语句之前。
```js
function fn(){
  'use strict'
}
```

#### 严格模式中的变化

1. 变量规定

   ① 在正常模式中，如果一个变量没有声明就賦值，默认是全局变量。严格模式禁止这种用法，**变量都必须先用var命令声明，然后再使用**

   ② **严禁删除已经声明变量**。例如， delete x语法是错误的。


2. this指向

   |                                 | 正常模式   | 严格模式    |
   | ------------------------------- | ---------- | ----------- |
   | 全局作用域中的this              | window对象 | undefined   |
   | 构造函数不加new，当普通函数调用 | window对象 | undefined |
   | 构造函数加new                   | 实例对象   | 同左        |
   | 定时器this                      | window     | 同左        |
   | 事件、对象                      | 调用者     | 同左        |

3. 函数变化

  ① 函数不能有重名的参数

  ② 函数必须声明在顶层新版本的 JavaScript会引入“块级作用域”（ES6中已引入）。为了与新版本接轨，不允许在**非函数的代码块内**（如if、for语句中）声明函数。





### （7）高阶函数
高阶函数：
  1. 函数作为参数
  2. 函数作为返回值的时候

- sort排序：
```js
    var arr = [35, 1, 6, 20, 100, 23, 34, 12, 45, 1, 50, 13]
    arr.sort(function(a,b){
      return a - b // 从小到大排列
      // return b - a
    })
    console.log(arr); 
```

- 高阶函数： 函数作为返回值的时候
```js
    function getSum(n){
      return function(m){
        return n + m
      }
    }

    var fn100 = getSum(100)
    var fn1000 = getSum(1000)
    console.log(fn100(7)); // 107
    console.log(fn1000(7)); // 1007
```
### （8）函数闭包

- 闭包(MDN,2021年11月)

一个函数和对其周围状态 **（lexical environment，词法环境）**的引用捆绑在一起（或者说函数被引用包围），这样的组合就是**闭包（closure）**。

也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

- 闭包(黑马，2018年)
在一个作用域中可以访问另一个作用域的变量


// 闭包特点： 延展了函数的作用域范围

- 经典面试题：点击li分别输出其索引
```html
<ul id="heroes">
  <li>安琪拉</li>
  <li>李白</li>
  <li>诸葛亮</li>
  <li>狄仁杰</li>
</ul>
```

方式一：
```js 
    // 1 给li注册点击事件
    var heroes = document.getElementById('heroes')
    var list = heroes.children
    for ( var i = 0; i < list.length; i ++){
      var li = list[i]
      li.index = i // 将每次的li保存起来
      li.onclick = function(){
        // 2 点击li时输出当前li对应的索引
        console.log(this.index);
      }
    } 
```

**方式二：闭包**
```js
    // 方式二
    var heroes = document.getElementById('heroes')
    var list = heroes.children
    for ( var i = 0; i < list.length; i ++){
      var li = list[i]

      ;(function(i){
        li.onclick = function(){
          console.log(i); // i存储在外层函数中
          // 形成闭包时，其实外层函数的作用域延展了，没有释放内存，性能降低了
        }
      })(i)
    } 
```

### （9）setTimeout的执行过程

- 执行过程示例
```js
console.log('start')

setTimeout(function(){
  console.log('timeout')
},0)

console.log('over')
```
以上代码输出结果依次为start, over, timeout，因为定时器执行时会先把里面的函数放到**任务队列**里，等**执行栈**执行完毕再处理任务队列中的函数。
<img src="./img/setTimeout的执行过程.jpg" style="zoom:67%;" />


- 代码改造
```js
console.log('start')

for (var i = 0; i < 3; i++){
  setTimeout(function(){
    console.log(i)   // 3 3 3 
  }, 0)
}

console.log('end')
```

利用闭包，使每次输出序号：
```js
console.log('start')

for (var i = 0; i < 3; i++){

  ;(function(i){
    setTimeout(function(){
      console.log(i)   // 0 1 2
  }, 0)
  })(i)
}

console.log('end')
```

### （10）代码思考

<img src="./img/代码思考1.jpg" style="zoom: 50%;" />

<img src="./img/代码思考2.jpg" style="zoom:50%;" />


### （11）递归函数

递归函数：函数内部自己调用自己，这个函数就是递归函数。

```js
    var num = 1

    function fn(){
      console.log('我要打印',num)
      if (num == 6){
        return // 递归函数里必须加推出条件，否则会造成栈溢出。
      }
      num++
      fn()
    }

    fn()
```

#### 利用递归求1-n的阶乘

```js
   function fn(n){
      if(n == 1){
        return 1
      }
      return n * fn(n-1)
    }
    console.log(fn(3)); // 6
    console.log(fn(4)); // 24
```

#### 利用递归求斐波那契数列

斐波那契数列（兔子数列），1、1、2、3、5、8、13、21、34... ... 
用户输入一个数字 n 就可以求出这个数字对应的兔子序列值。

```js
    function fn(n){
      if(n == 1){
        return 1
      } else if (n <= 0){
        return 0
      }
      return fn(n-1) + fn(n-2)
    }

    console.log(fn(1));
    console.log(fn(2));
    console.log(fn(3));
    console.log(fn(4));
```



#### 浅拷贝（ES6）和深拷贝

浅拷贝只是拷贝一层，更深层次对象级别的只拷贝引用。
深拷贝拷贝多层，每一级别数据都会拷贝。

- 浅拷贝
```js
  var obj = {
    id: 1,
    name:'Hengyu',
    msg:{
      info:100
    }
  }

  var copy = {}
  for (var k in obj){  // 利用for in遍历实现浅拷贝
    copy[k] = obj[k]
  }

  console.log(copy) // 和obj一模一样,但msg只拷贝了地址
  copy.msg.info = 10
  console.log(obj) // msg也被改变了
```

ES6 提供了一个新方法用于浅拷贝**Object.assign()** ：
```js
  Object.assign(copy,obj)
```

- 深拷贝
```js
  var obj = {
    id: 1,
    name:'hengyu', // 简单数据类型
    msg:{ info:100 }, // 复杂数据类型
    color:['navy','wheat'] // 复杂数据类型
  } 
  
  var copy = {}

  function deepCopy(newObj, oldObj){
    for (var k in oldObj){
      var item = oldObj[k]
      if (item instanceof Array){ // 复杂数据类型
        newObj[k] = []
        deepCopy(newObj[k],item)
      } else if (item instanceof Object){ // 复杂数据类型
        newObj[k] = {}
        deepCopy(newObj[k],item)
      } else { // 简单数据类型
        newObj[k] = item
      }
    }
  }

  deepCopy(copy,obj)
  console.log(copy)
```



# 六、ES6中的类

ES6之前通过**构造函数+原型**实现面向对象编程
ES6通过**类**实现面向对象编程

### （1）基本语法

- 创建类
  语法：
  ```js
  class Name {
    // class body
  }
  ```

- 创建实例(必须使用new实例化对象)
  ```js
  var xx = new name()
  ```

注意事项：
1. 类里面的函数不需要写function
2. 类中的成员不需要加逗号分隔

### （2）类constructor 构造函数

  constructor()方法是类的构造函数（默认方法），**用于传递参数，返回实例对象**，通过new命令生成对象实例时，自动调用该方法。如果没有显示定义，类内部会自动给我们创建一个constructor()
  ```js
  class Star{
      job='star'
      constructor(uname,age){
        this.uname = uname
        this.age = age
      }
    }
  ```

### （3）类的继承

利用extends和super实现类的继承

super关键字用于访问和调用对象父类上的函数，可以调用父类的构造函数，也可调用父类的普通函数。

注意：子类如果在构造函数中使用super，如果同时使用了this，必须先写super，再用this。

- 语法：
  ```js
  class Father{
    // 父类
    hi()
  }
  
  class Son extends Father{   // extends ：使子类继承父类的属性和方法
    constructor(x,y){
      super(x,y) // 将参数传给父类的constructor
      this.x = x
    }
    hi(){
      super.hi() // 调用父类的hi函数
    }
  }
  ```

继承中，如果实例化子类输出一个方法，先在子类中查找，如果没有，再查找父类。（就近原则）


### （4）类和对象的三个注意点：

1. 在ES6中类没有变量提提升，所以必须先定义类，才能通过类实例化对象
2. 类里面的共有的属性和方法一定要加this使用
3. 类里的this指向问题

```js
class Star{
  constructor(){
    console.log(this)
    // constructor里的this指的是创建的实例对象
  }
  foo(){
    console.log(this)
    // 函数中的this指的是调用该函数的实例对象
  }
}

var s1 = new Star()
```

### （5）class的set和get
```js
    // get 和 set
    class Phone{
      get price(){ // 通常用来对对象的动态属性进行封装
        console.log("价格属性被读取了")
        return 'iloveyou'
      }

      set price(newVal){  // 通常用来对对象的动态属性进行封装
        console.log("价格属性被修改了");
      }
    }
     
    let s = new Phone()

    console.log(s.price)
    s.price = 'free'
```

### （6）类的本质

类的本质其实还是一个函数，我们也可以简单的认为，类就是构造函数的另外一种简单的写法

ES6之前通过**构造函数+原型**实现面向对象编程

1. 构造函数有原型对象prototype
2. 构造函数原型对象里有constructor指向构造函数本身
3. 构造函数可以通过原型对象添加共有方法
4. 构造函数创建的实例对象有__proto__，指向函数的原型对象

ES6通过**类**实现面向对象编程

ES6的类的绝大部分功能，ES5都能做到，新的class写法只是让原型对象的写法更清晰，更像面向对象编程的语法而已。

所以ES6的类其实就是**语法糖**。



# 七、ES6中的新增方法概述

### （1）数组新增方法

forEach map filter some every

#### 1.forEach 

作用：迭代（遍历）数组

```js
  var arr = [1,2,3]
  var sum = 0
  arr.forEach(function(value,index,array){
    console.log('每个数组元素' + value)
    console.log('每个数组元素的索引号' + index)
    console.log('每个数组元素' + array)
    sum += value
  })
  console.log(sum) // 6
```
#### 2.filter

作用：filter()方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素，主要用于**筛选数组**。

**注意：它直接返回一个新数组，因此需要一个变量来接**

```js
  var arr = [12, 66, 4, 88, 3, 7]
  var newArr = arr.filter(function(value, index，arr){
    return value >= 20
  })
  console.log(newArr) // [66, 88]
```

#### 3.map

作用：map()方法创建一个新数组，数组中的元素是通过对原数组的每个元素分别执行函数得到的。

**注意：它直接返回一个新数组，因此需要一个变量来接**


#### 4.some

作用：some()方法用于检测数组中的元素是否满足指定条件，通俗来说即查找数组中是否有满足条件的元素。

注意：
1. **它的返回值是布尔值**，如果查找到满足条件的元素，即返回true，否则返回false。
2. 当查找到第一个满足条件的元素时，就立刻终止循环，不再继续查找

```js
var arr = [10,30,4]
var flag = arr.some(function(value){
  return value < 3
})
console.log(flag) // false
```

- forEach 和 some 的区别：
  forEach、filter、map中的return true不会终止迭代
  **some中的return true会终止迭代，如果需要在数组中查找唯一的元素，some效率更高**

#### 5.every

与some类似，但用于判断是否数组中所有元素都满足指定条件，返回布尔值。


### （2）字符串新增方法

#### trim

trim()方法会从一个字符串的**两端**删除空白字符，且不影响字符串本身，返回的是一个新的字符串。

```js
  var str = '  andy  '
  console.log(str)
  var str1 = str.trim()
  console.log(str1) //  andy
```

### （3）对象新增方法

#### Object.defineProperty() 

作用：定义对象中新属性或修改原有的属性
参数：
  - obj：必需。目标对象
  - prop：必需。需定义或修改的属性的名字
  - descriptor：必须。目标属性所拥有的特性

第三个参数descriptor需要用对象形式来写：
  - value：设置属性的值，默认为undefined
  - writable：值是否可以重写， true|默认false
  - enumerabke: 目标属性是否可以被枚举（遍历）， true|默认false
  - configurable: 目标属性是否可以被删除或是否可以再次修改特性  true|默认false

```js
var obj = {
  id:1
  name:'xiaomi'
  price:1000
}
obj.defineProperty(obj,'price',{
  value:9.9
  writable:false
})
obj.defineProperty(obj,'address',{
  value:'12121212121121221212'
  enumerable:false  // 这样可以把该属性隐藏起来，无法遍历出来
  configurable:false
})
console.log(obj.keys(obj)) // 'id' 'name' 'price'
delete obj.address // 删不掉
```



# 八、正则表达式

正则表达式（Regular Expression）是用于匹配字符串中字符组合的模式。在JavaScript中，正则表达式也是对象。

正则表达式通常被用来检索、替换那些符合某个模式（规则）的文本，例如验证表单：用户名表单只能输入英文字母、数字或下划线，昵称输入框中可以输入中文 **（匹配）**。此外，正则表达式还常用于过滤页面内容中的一些敏感词 **（替换）**，或从字符串中获取我们想要的特定部分 **（提取）**等。

### （1）正则表达式的特点

1. 灵活性、逻辑性和功能性非常的强

2. 可以迅速地用极简单的方式达到字符串的复杂控制。

3. 对于刚接触的人来说，比较嗨涩难懂。

4. 实际开发一般都是直接复制写好的正则表达式，但是要求会使用正则表达式，并且根据实际情况修改正则表达式.比如用户名:/^[a-z0-9_-](3,16)$/

### （2）正则表达式在JavaScript中的使用

#### 1.创建正则表达式

在JavaScript中，可以通过两种方式创建一个正则表达式

1. 通过调用RegExp对象的构造函数创建

   `var 变量名 = new RegExp(/表达式/)`

2. 通过字面量创建

   `var 变量名 = /表达式/`

#### 2.测试正则表达式

test()正则对象方法，用于检测字符串是否符合该规则，该对象会返回true或false，其参数是测试字符串。

`regexObj.test(str)`

1. regexObj 是写的正则表达式
2. str 我们要测试的文本
3. 就是检测str文本是否符合我们写的正则表达式规范

```js
  var rg = /123/
  console.log(rg.test(123)) // true
  console.log(rg.test('abc')) // false
```

#### 3.特殊字符

1. 边界符

   正则表达式中的边界符（位置符）用来**提示字符所处的位置**，主要有两个字符。

   | 边界符          | 说明                        |
   | -------------- | --------------------------- |
   | ^              | 表示匹配行首的文本（以谁开始） |
   | $              | 表示匹配行尾的文本（以谁结束） |

如果 ^ 和 $ 在一起，表示必须是精确匹配



2. 字符类

   (1) [] ：`/^[abc]$/`表示有一系列字符可供选择，只要匹配其中一个就可以了。
   (2) [-] 方括号内部的范围符 - [a-z] [0-9]
   (3) 字符组合：`/^[a-zA-Z0-9_-]$/` 表示26个英文字符大小写、0-9、短横线、下横线都可
   (4) [^]取反：`/^[^a-zA-Z0-9_-]$/` 方括号中的^表示**取反**



3. 量词符

   量词符用来设定某个模式出现的次数。

   | 量词  | 说明             |示例             |
   | ----- | ---------------- | ---------------- |
   | *     | 重复零次或更多次 | /^a*$/   |
   | +     | 重复一次或更多次 | /^a+$/   |
   | ?     | 重复零次或1次    | /^a?$/   |
   | {n}   | 重复n次          | /^a{3}$/ |
   | {n,}  | 重复n次或更多次  | /^a{3,}$/ |
   | {n,m} | 重复n到m次       | /^a{2,3}$/ |

    ```js
    var reg = /^[a-zA-Z0-9_-]{6,16}$/
    // 量词{6,16}中间不要有空格
    ```

    注意：
    `/^abc{3}$/` 表示让c重复三次 => abccc
    `/^(abc){3}$/` 表示让abc重复三次 => abcabcabc
   
   


4. 预定义类

    预定义类指的是**某些常见模式的简写方式**。
    
    | 预定类 | 说明                                                         |
    | ------ | ------------------------------------------------------------ |
    | \d     | 匹配0-9之间任一数字，相当于 [0-9]                            |
    | \D     | 匹配所有0-9以外的字符，相当于 \[^0-9]                        |
    | \w     | 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9]              |
    | \W     | 匹配所有\w以外的字符，相当于 \[^A-Za-z0-9]                   |
    | \s     | 匹配空格（包括换行符、制表符、空格符等），相当于 \[\t\r\n\v\f] |
    | \S     | 匹配所有非空格字符，相当于 \[^\t\r\n\v\f]                    |
    
- 座机号码验证：全国座机号两种格式：010-12345678 或 0530-1234567
  `var reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/`
- 正则里面的或者符号为： | 


#### 4.正则表达式中的替换

1. replace 替换

   `stringObj.replace(regexp/substr,replacement)`

     - 第一个参数：被替换的字符串/正则

     - 第二个参数：替换为的字符串

     - 返回值：一个替换完毕的新字符串


2. 正则表达式参数

    `/表达式/[switch]`

   switch（也称为修饰符），按照什么样的模式来匹配，有三种值：

     - g ：全局匹配 （默认为只匹配一次，全局反之）

     - i ： 忽略大小写

     - gi ： 全局匹配 + 忽略大小写

    比如：
     `text.replace(/激情|gay/g,'**')`

