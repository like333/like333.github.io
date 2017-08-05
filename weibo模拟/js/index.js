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
    src: "./img/header.jpg",
    userName: '一块八',
    customPort: '微博weibi.com'
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
                       <span class = "supportIcon"></span>\
                        赞\
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
    console.log("12")
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
        $('input.public').on("click", function () {
            _this._submit();
        });
    },
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
    _release: function () {
        var btn = $('input.public');

        if (this.textArea.val().length != 0) {

            btn.addClass('orange');
        } else {
            btn.removeClass('orange')
        }

    },
    _submit: function () {
        var btn = $('input.public')
        var count = $('.count em');
        var _this = this;
        var val = _this.textArea.val();
        var $span = _this.mask.find('span');
        var $img = _this.mask.find('img');

        if (val.length > 0) {
            content($('#wbList'), "50s前", val, function () {
                _this.mask.show('fast', function () {
                    $span.css('WebkitTransform', 'scale(1,1)');
                    $img.css('WebkitTransform', 'scale(1,1)');
                    $span.on('webkitTransitionEnd', function () {
                        setTimeout(function () {
                            _this.mask.animate({ opacity: '0' }, 300, "linear", function () {
                                $(this).hide();
                                $(this).css('opacity', '1');
                                $span.css('WebkitTransform', 'scale(0,0)');
                                $img.css('WebkitTransform', 'scale(0,0)');
                                var $wbList = $('#wbList').find('.contentList:first');
                                var h = $wbList.outerHeight(true);
                                // $wbList.find('.options a:last').children().not('i').hide();
                                $wbList.show("500");
                            })
                        }, 1000)
                    });

                });
                $('.icon-down:first').on('click', function () {
                    _this._del($(this));
                })
                $('.options').find('a:last').on('click', function () {
                    _this._support($(this));
                })
            });
            _this.textArea.val("");
            count.html(0);
        }
    },
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
    _support: function (obj) {
        var $options = obj.parents('.options:first');
        var $support = $options.find('a:last');
        $support.find('span').
        css('background-image',"url(../img/hand2.png)").
        addClass('supportAnimate');
    }
})

var R1 = new Release();

