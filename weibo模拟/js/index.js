//{a:1} {b:1,a:2} {a:1,b:2}
function extend(o1, o2) {
    for (var i in o2) {
        if (typeof o1[i] === 'undefined')
            o1[i] = o2[i];
    }
    return o1;
}
function html2node(para) {
    var container = document.createElement('div');
    container.innerHTML = para;
    return container.children[0];
}


var data = {
    src: "./img/header.jpg", //头像地址
    userName: '一块八', //用户名
    customPort: '微博weibi.com' //发布微博的客户端
}

//微博内容结构
//-----------------------------------------
/**
 * @param {*} p 父级容器
 * @param {*} t 发布时间
 * @param {*} val 发布内容
 */
function content(p, t, val, callback) {
    var html =
        '<div class="contentList">\
           <div class="content clear">\
                    <img class="header" src="" alt="头像">\
                    <div class="contentMesg">\
                        <p class="user-name"></p>\
                        <p><span class="publicTime"></span>来自<span class="customPort"</span></p>\
                        <p class="publicContent"></p>\
                    </div>\
                    <div class="con-options">\
                        <i class="iconfont icon-down">&#xe600;</i>\
                        <ul class="hidden">\
                            <li class="del">删除</li>\
                        </ul>\
                        <div class="del-modal hidden">\
                            <p class="del-tip">\
                                <i class="iconfont icon-help">&#xe6f9;</i>\
                                <span>确定要删除这条微博吗？</span>\
                            </p>\
                            <p class="del-btn">\
                                <input type="button" class="confirm orange" value = "确定">\
                                <input type="button" class="cancel" value = "取消">\
                            </p>\
                        </div>\
                    </div>\
                </div>\
                <div class="options">\
                    <a href="javascript:;">推广</a>\
                    <a href="javascript:;"><i class="iconfont">&#xe61f;</i>评论</a>\
                    <a href="javascript:;">\
                        <span class = "light"></span>\
                       <span class = "supportIcon"></span>\
                        <i>赞</i>\
                    </a>\
                </div>\
        ';
    var node = $(html2node(html));
    p.prepend(node);

    node.find('.header').attr('src', data.src);
    node.find('.user-name').html(data.userName);
    node.find('.customPort').html(data.customPort)
    node.find('.publicContent').html(val);
    node.find('.publicTime').html(t);
    node.hide();
    callback && callback();

}

function Release(options) {
    this.options = options || {};
    this.$input = $('.input');
    this.$doc = $(document);
    this.textArea = $('textarea');
    this.mask = $('.mask');
    this.init();
}
extend(Release.prototype, {
    init: function () {
        var _this = this;
        this.mask.hide();
        _this.$input.click(function () {
            $(this).addClass('click');
            return false;
        })
        _this.$doc.click(function () {
            _this.$input.removeClass('click');
        })
        _this.setCount();
        this._release();
        //发布微博按钮点击事件
        $('input.public').on("click", function () {
            _this._submit();
        });
        _this._getTime();
    },
    //微博字数计数
    setCount: function () {
        var _this = this;
        var count = $('.count em');
        var btn = $('input.public')
        count.html(_this.textArea.html().length);
        _this.textArea.on('input', function () {

            if (_this.textArea.val().length != 0) {
                btn.addClass('orange')
            } else {
                btn.removeClass('orange')
            }

            var len = _this.textArea.val().length;
            count.html(len);
        })
        $('#pop').click(function () {
            var len = _this.textArea.val().length;
            count.html(len);
        })
    },
    //发布微博按钮启动
    _release: function () {
        var btn = $('input.public');
        this.textArea.on('input', function () {
            if ($(this).val().length != 0) {
                btn.addClass('orange');
            } else {
                btn.removeClass('orange')
            }
        })
    },
    //发布微博，微博删除，点赞控制
    _submit: function () {
        var btn = $('input.public'),//发布按钮
            count = $('.count em'),//微博文字技术
             _this = this,
            val = _this.textArea.val(),//微博内容
            $span = _this.mask.find('span'),//发布成功提示
            $img = _this.mask.find('img');//提示图片

        if (val.length > 0) {
            
            content($('#wbList'), "刚刚", val, function () {//创建节点
                
                var $t = $('.contentMesg .publicTime:first');
                $t.attr({
                    "date-sec":_this._getTime().ms,
                    "date-time":_this._getTime().time,
                    "date-date":_this._getTime().date,
                    "date-day":_this._getTime().day,
                    "date-year":_this._getTime().year,
                });
               
                _this.mask.show('fast', function () {//显示成功遮罩层
                    _this.textArea.css('height','68px');
                    $span.css('WebkitTransform', 'scale(1,1)');
                    $img.css('WebkitTransform', 'scale(1,1)');
                    $span.on('webkitTransitionEnd', function () {//遮罩消失后显示节点
                        setTimeout(function () {
                            _this.mask.animate({ opacity: '0' }, 300, "linear", function () {//遮罩消失
                                $(this).hide();
                                $(this).css('opacity', '1');
                                $span.css('WebkitTransform', 'scale(0,0)');
                                $img.css('WebkitTransform', 'scale(0,0)');
                                var $wbList = $('#wbList').find('.contentList:first');
                                $wbList.show("500",function(){
                                    _this._unload();
                                });//显示节点

                            })
                        }, 1000)
                    });
                });
                $('.icon-down:first').on('click', function () {//删除操作
                    _this._del($(this));
                });
                //点赞操作
                //------------------------------------
                var num = 0;
                var isClick = false;
                $('.options').find('a:last').on('click', function () {
                    if (!isClick) {
                        num += 1;
                        _this._support($(this), isClick, num);
                    } else {
                        _this._support($(this), isClick, "赞");
                        num = 0;
                    }
                     isClick = !isClick;
                });
                //-----------------------------------------------------
            });
            _this.textArea.val("");
            count.html(0);
            //微博发布时间更新
        }
    },
    //删除微博
    /**
     *  * @param {*} obj 当前操作的微博
     */
    _del: function (obj) {
        var conOpt = obj.parents('.con-options');
        conOpt.find('ul').toggleClass('hidden').on(
            'click', function () {
                $(this).addClass('hidden');
                conOpt.find('.del-modal')
                    .removeClass("hidden")
                    .find('.confirm').on('click', function () {
                        $(this).parents('.contentList').hide("500", function () {
                            $(this).remove();
                        });
                    });
                conOpt.find('.del-modal').find('.cancel').on(
                    'click', function () {
                        $(this).parents('.del-modal').addClass('hidden');
                    }
                )

            }
        );

    },
    //微博点赞
    /**
     *  * @param {*} obj 当前操作的微博的父级
     *  * @param {*} isClick 当前用户是否已经点赞
     *  * @param {*} num 点赞数
     */
    _support: function (obj, isClick, num) {
        var $options = obj.parents('.options:first');
        var $support = $options.find('a:last');
        if (!isClick) {
            $support.find('span:last').addClass('supportAnimate')
            $support.find('span:first').addClass('lightAnimate');
            $support.find('i').html(num);
        } else {
            $support.find('i').html(num);
            $support.find('span:last').removeClass('supportAnimate')
            $support.find('span:first').removeClass('lightAnimate');
        }
    },
    _getTime:function(){
        var t = new Date();
        function addZero(t){
            if(t<10){
                return "0" + t;
            }else return t;
        }
        var time =addZero(t.getHours())+":"+ addZero(t.getMinutes());
        var date =(t.getMonth()+1) +"月" + t.getDate()+"日";
       return {
           ms:t.getTime(),
           time:time,
           date:date,
           day:t.getDate(),
           year:t.getFullYear()
       };
    },
    //发布新微博之后更新其他微博的发布时间
    _unload:function(){
        var $arrT = $('.contentMesg .publicTime');
       
        $arrT.each(function(index,elem){
            var disT =Number($arrT.eq(0).attr('date-sec'))-Number($(this).attr('date-sec'));
            var disD = Number($arrT.eq(0).attr('date-day'))-Number($(this).attr('date-day'));
            var disY = Number($arrT.eq(0).attr('date-year'))-Number($(this).attr('date-year'));
            if(disT == 0){
                    $(this).html("刚刚");
            }else if(disT>=1000 && disT<60000){
                console.log(disT);
                $(this).html(parseInt(disT/1000)+"秒前");
            }else if(disT/1000>=60 && disT/1000/60<60){
                 $(this).html(parseInt(disT/1000/60)+'分钟前');
            }else if(disT/1000/60>=60 && disD==0 && disT/1000/60/60<24){
                 $(this).html('今天'+" "+$(this).attr('date-time'));
            }else if(disT/1000/60/60>=24 && disY == 0 &&  disD >= 1 ){
                 $(this).html($(this).attr('date-date'));
            }else{
                 $(this).html($(this).attr('date-year')+"年"+$(this).attr('date-date'));
            }
        })
    }

})

var R1 = new Release();

