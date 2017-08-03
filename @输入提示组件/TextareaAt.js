!function () {
    var template =
        '<div id="container">\
                    <textarea id="t" class="textarea"></textarea>\
                    <div id="pop"></div>\
                    <div id="d" class="textarea"></div>\
                 </div>';

    // 功能函数
    function html2node(str) {
        var container = document.createElement('div');
        container.innerHTML = str;
        return container.children[0];
    }

    function extend(o1, o2) {
        for (var key in o2) {
            if (typeof o1[key] === "undefined") {
                o1[key] = o2[key]
            }
        }
        return o1;
    }

    function TextareaAt(props) {
        this.props = props || {};
        this.at = this.props.at || "@";
        this.isAt = this.props.isAt || true;
        this.container = this._layout.cloneNode(true);

        this.textarea = $(this.container).find('#t');
        this.div = $(this.container).find('#d');
        this.pop = $(this.container).find('#pop')

        this._init();
    }

    extend(TextareaAt.prototype, {
        _init: function () {
            this.pop.hide();
            document.body.appendChild(this.container);
            this._popClick();
            this.fn_isAt();
        },
        _layout: html2node(template),
        fn_isAt: function () {
            var _this = this;
            if (_this.isAt) {
                _this.textarea.on("input", function (event) {

                    value = _this.textarea.val(),
                        target = event.target,
                        cursor = target.selectionStart;
                    //设置pop位置

                    value = value.replace(eval('/' + _this.at + '/g'), '<span>' + _this.at + '</span>');
                    _this.div.html("<pre>" + value + "</pre>");
                    var span = _this.div.find('span:last'),
                        divpos = _this.div.offset(),
                        pos = span.offset();
                    //如果span存在，即如果有输入@,设置pop位置跟@一样

                    if (pos !== undefined) {
                        _this.pop.css({
                            left: (pos.left - divpos.left) + 'px',
                            top: (pos.top - divpos.top + 15) + 'px'
                        })
                    }

                    //输入的是@显示pop,否则隐藏
                    if (_this.textarea.val().charAt(cursor - 1) === _this.at) {
                        _this.pop.show();
                    } else {
                        _this.pop.hide();
                    }
                    // var pr = _this.container.find('pre');
                    _this.textarea.on('input', function () {
                        $(this).css('height', _this.div.height());
                    })
                });
            }
        },

        _popClick: function () {
            var _this = this;
            this.pop.on("click", function () {
                _this.pop.hide();
            })
        }
    })
    //Export
    //---------------------------------
    //暴露API:Amd || Commonjs || Global
    //支持commomjs
    if (typeof exports === 'object') {
        module.exports = TextareaAt;
    } else if (typeof define === 'function' && define.amd) {
        defined(function () {
            return TextareaAt
        });
    } else {
        window.TextareaAt = TextareaAt;
    }

}()