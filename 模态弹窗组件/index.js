
var emitter = {
    //注册事件
    on:function(event,fn){
        var handles = this._handles || (this._handles = {}),
        calls = handles[event] || (handles[event] = []);

        //找到对应名字的栈
        calls.push(fn);
        return this;
        
    },
    //解绑事件
    off:function(event, fn){
        if(!event || !this._handles) this._handles = {};
        if(!this._handles) return;

        var handles = this._handles,calls;
        if(calls = handles[event]){
            if(!fn){
                handles[event] = [];
                return this;
            }
               //找到栈内对应listener 并移除
            for(var i = 0, len = calls.length;i<len;i++){
                if(fn === calls[i]){
                    alls.splice(i,1);
                    return this;
                }
            }
        }
        return this;
    },
 
    //触发时间
    emit:function(event){
        console.log(this._handles);
        var args = [].slice.call(arguments,1),
            handles = this._handles, calls;

            if(!handles || !(calls = handles[event])) return this;
            //触发素有对应名字的listeners
            for(var i = 0,len = calls.length; i<len; i++){
                calls[i].apply(this,args)
            }
            return this;
    }
}



var template =
' <div class = "m-modal">\
        <div class = "modal_align"></div>\
        <div class = "modal_wrap animated">\
            <div class = "modal_head">标题</div>\
            <div class = "modal_body">内容</div>\
            <div class = "modal_foot">\
                <a href="#" class="confirm">确认</a>\
                <a href="#" class="cancel">取消</a>\
            </div>\
        </div>';

function Modal(options){
    options = options || {};
    //div.m-modal节点
    this.container = this._layout.cloneNode(true);//每个实例都有独一无二的container节点
    //标题内容
    this.head = this.container.querySelector('.modal_head');
    //body用于插入自定义内容
    this.body = this.container.querySelector('.modal_body');
   //窗体节点，在应用动画时
    this.wrap = this.container.querySelector('.modal_wrap');

    //将options复制到组件实例上
    extend(this, options);

    this._initEvent();
}


//原型方法
extend(Modal.prototype,{
    _layout:html2node(template),
    setHead:function(title){
        if(!title) return;
        this.head.innerHTML = title;
    },
    setContent:function(content){//设置窗体内容
        if(!content) return;
        if(content.nodeType === 1){//元素节点
            this.body.innerHTML = '';
            this.body.appendChild(content);
        }else{//字符串
            this.body.innerHTML = content;
        }
    },
    //显示窗体
    show: function(opt){
        opt = opt || {};
        if(opt.title) this.setHead(opt.title);
        if(opt.content) this.setContent(opt.content);
        document.body.appendChild(this.container);
        animateClass(this.wrap, this.animation.enter);
    },
    //隐藏窗体
    hide:function(){
        var container= this.container;
        animateClass(this.wrap,this.animation.leave,function(){
            document.body.removeChild(container);
        })
    },
    //初始化
    _initEvent:function(){
        this.container.querySelector('.confirm').addEventListener(
            'click',this._onConfirm.bind(this));
        this.container.querySelector('.cancel').addEventListener(
            'click',this._onCancel.bind(this));//将回调函数的this指向当前实例
    },
    //确定按钮
    _onConfirm:function(){
        this.emit('confirm');
        this.hide();
    },
    //取消按钮
    _onCancel:function(){
        this.emit('cancel');
        this.hide();
    }
})




//功能函数
//将html转换成节点
function html2node(str){
    var container = document.createElement('div');
    container.innerHTML = str;
    return container.children[0];
}


//赋值属性
//extend({a:1},{b:1,a:2})->{a:1,b:1}
function extend(o1,o2){
    for(var i in o2){
        if(typeof o1[i] === 'undefined'){
            o1[i] = o2[i]
        }
    }
    return o1;
}

extend(Modal.prototype,emitter);
//Modal
//---------------
