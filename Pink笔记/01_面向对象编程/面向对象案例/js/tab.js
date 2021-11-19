var that

class Tab {
    constructor(id){
        that = this
        this.main = document.querySelector(id)
        this.add = this.main.querySelector('.addtab')
        this.ul = this.main.querySelector('.boxbar ul:first-child')
        // 获取元素
        this.init()
        // 一开始就调用初始化操作
    }
    
    updateNode(){
        // 获取更新后的元素（动态添加元素）
        this.lis = this.main.querySelectorAll('.boxbar li')
        this.sections = this.main.querySelectorAll('section')
        this.close = this.main.querySelectorAll('.close')
        this.content = this.main.querySelector('.content')
    }
    init(){
        // 初始化操作，让相关事件绑定事件
        this.updateNode()
        this.add.onclick = this.addTab
        for(var i = 0; i < this.lis.length; i++){
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab
            this.close[i].onclick = this.deleteTab
            this.lis[i].ondblclick = this.editTab
            this.sections[i].ondblclick = this.editTab
            }
    }
    
    clearClass(){
        for(var i = 0; i < this.lis.length; i++){
            that.lis[i].className = ''
            that.sections[i].className = ''}
    }

    toggleTab(){
        // 1. 切换功能
        that.clearClass()
        this.className = 'activetab'
        that.sections[this.index].className = 'activecont'
    }
    addTab(){
        // 2. 添加功能
        that.clearClass()
        var li = '<li class="activetab"><span>New Tab</span><span class="close">×</span></li>'
        var sec = '<section class="activecont">新内容</section>'
        that.ul.insertAdjacentHTML('beforeend',li)
        that.content.insertAdjacentHTML('beforeend',sec)
            // insertAdjacentHTML(position, text) 直接把字符串格式元素添加到父元素中
            // 'beforebegin' 'afterbegin' 'beforeend' 'afterend'
        that.init()
    }
    deleteTab(e){
        // 3. 删除功能
        e.stopPropagation() // 阻止冒泡事件
        var index = this.parentNode.index
        // alert(index) // 会冒泡，触发li的激活事件
        that.lis[index].remove()  // remove()方法直接删除指定元素
        that.sections[index].remove()
        if(that.lis.length !=1 && that.lis[index].className == 'activetab'){
            if(index != 0){
                that.lis[index-1].click()
            } else if (index == 0){
                that.lis[index+1].click()
            }
            // 除非只剩一个tab，否则当删除当前页面时，自动跳转为相邻的tab
        }
        that.init()
    }
    editTab(){
        // 4. 编辑功能  ondblclick 双击事件
        // window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        // alert(11)
        var span = this.children[0]
        var str = span.innerHTML
        span.innerHTML= "<input type='text' />"
        var input = span.children[0]
        input.value = str
        input.select() // 点击后直接处于选定状态
        
        input.onblur = function(){
            if(this.value){
                this.parentNode.innerHTML = this.value
            } else{
                this.parentNode.innerHTML = 'Unamed Tag'
            }
        }
        input.onkeyup = function(e){
            if(e.key === 'Enter'){
                //当按回车时，手动调用失去焦点事件
                //  keyCode 不再使用 ，直接用key
                this.blur()
            }
        }
    }
}

new Tab('#tab')