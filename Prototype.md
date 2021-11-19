前些天，有个做开发多年的朋友，突然在面试的时候被面试官问到这个，一脸茫然，因此更不用说初学的小伙伴了，今天我们就来给大家分析下，__proto__和prototype到底有什么区别？

##  **一、** **概念区分**



其实说__proto__并不准确，确切的说是对象的[[prototype]]属性，只不过在主流的浏览器中，都用__proto__来代表[[prototype]]属性，因为[[prototype]]只是一个标准，而针对这个标准，不同的浏览器有不同的实现方式。在ES5中用Object.getPrototypeOf函数获得一个对象的[[prototype]]。ES6中，使用Object.setPrototypeOf可以直接修改一个对象的[[prototype]]。为了方便，我下面的文章用__proto__来代表对象的[[prototype]]。

而prototype属性是只有函数才特有的属性，当你创建一个函数时，js会自动为这个函数加上prototype属性，值是一个空对象。所以，函数在js中是非常特殊的，是所谓的一等公民。

## **二、** **必须明确**

### **1.** **万物皆对象**

在JS里，万物皆对象。方法（Function）是对象，方法的原型(Function.prototype)是对象。因此，它们都会具有对象共有的特点。

即：对象具有属性**__proto__**，可称为**隐式原型**，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。

### **2.** **方法(Function)**

方法这个特殊的对象，除了和其他对象一样有上述_proto_属性之外，还有自己特有的属性——**原型属性（prototype）**，这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

Function.constructor.constructor

![img](https://pic3.zhimg.com/80/v2-5e55da48225128b0281dcec72950f93a_1440w.jpg)

如上图所示，person1、person2都是对象，对象具有__proto__属性，此隐式原型指向构造此对象的构造函数Person的原型Person.prototype。

方法Person也是对象，他有自己特有的属性prototype（原型属性），这个属性指向的对象，包含有所有实例共享的属性和方法（也称为原型对象），此原型对象也有一个属性constructor，constructor属性包含一个指针指向原构造函数Person。

其实，大家一旦理解了这张图，也就差不多理解了__proto__和prototype，如果一时还没彻底明白，我们接下来看代码，结合代码再来看这张图，你就会豁然开朗。

## **三、** **实践检验**

### **1.** **__proto__和prototype概要（隐式原型与原型对象）**

![img](https://pic4.zhimg.com/80/v2-abd4882fcf871a08a58c2266eaae952f_1440w.jpg)

上图，可以看出：

**【1】构造函数Person()**

构造函数的原型属性Person.prototype指向了原型对象，在原型对象里有共有的方法，所有构造函数声明的实例（这里是person1，person2）都可以共享这些方法（sayName）。

![img](https://pic4.zhimg.com/80/v2-4abd45ff3cc53602c8b1ab4f1e3d3fd7_1440w.jpg)

【2】原型对象Person.prototype

Person.prototype保存着实例共享的方法（sayName），有一个指针constructor指回构造函数。

![img](https://pic4.zhimg.com/80/v2-e7e55f78e19dcfc6c24dc0e54991487f_1440w.png)

【3】实例

person1和person2是Person这个对象的两个实例，这两个对象也有属性__proto__，指向构造函数Person的原型对象，这样子就可以像上面【1】所说的访问原型对象的所有方法。这也就是为什么person1、person2都可以访问Person的原型对象Person.prototype的sayName方法。

【4】构造函数Person()除了是方法，也是对象，它也有__proto__属性，指向谁呢？

指向它的构造函数的原型对象，函数的构造函数是Function，因此这里的__proto__指向了Function.prototype。也就是上上图中打印的Person.__proto__: f(){**native code**}.

**其实除了Person()，Function()、Object()也是一样的道理。**

原型对象也是对象啊，它的__proto__属性，又指向谁呢？

同理，指向它的构造函数的原型对象，也就是说**Function.prototype对象的__proto__属性指向Object.prototype**。

最后，**Object.prototype的__proto__属性指向null**。如下图所示：

![img](https://pic4.zhimg.com/80/v2-a80b9ee9a6407bb12301b1eea8c565ef_1440w.jpg)

函数Person既有__proto__隐式属性，也有prototype原型对象。那么一般对象有没有prototype属性呢？我们继续看下面案例。

### **3.** **函数特有prototype属性，对象无**

![img](https://pic2.zhimg.com/80/v2-d7e0915bd14bb3390ba10a86b400ba35_1440w.jpg)

由此，可见**对象并不具有prototype属性，只有函数才有prototype属性。**

最后，再通过下列代码帮助大家进一步理解最开始那张图。

![img](https://pic1.zhimg.com/80/v2-741416bd1cad007e3e67de77ba68895c_1440w.png)

## **四、** **总结**

【1】对象有属性__proto__，指向该对象的构造函数的原型对象。

【2】方法除了有属性__proto__，还有属性prototype，prototype指向该方法的原型对象。

关于原型和原型链，我们后续文章再给大家解析，感兴趣的朋友可以关注我们。

https://zhuanlan.zhihu.com/p/92894937

