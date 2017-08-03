
function Release(options) {
    this.options = options || {};
    this.$input = $('.input');
    this.$doc = $(document);
    this.textArea = $('textarea');
    this.init();
}
extend(Release.prototype, {
    init: function () {
        var _this = this;

        _this.$input.click(function () {
            $(this).addClass('click');
            return false;
        })
        _this.$doc.click(function () {
            _this.$input.removeClass('click');
        })
        _this.setCount();
        _this.setAt();
    },
    setCount: function () {
        var _this = this;
        var count = $('.count em');

        count.html(_this.textArea.html().length);
        _this.textArea.on('input', function () {
            var len = _this.textArea.val().length;
            count.html(len);
        })
    },
    setAt: function () {
        var _this = this;
        var $textArea = _this.textArea;
        $textArea.on('input', function (event) {
            var target = event.target,
                cursor = target.selectionStart;
               
            // if (target.val().charAt(cursor - 1) === '@') {
            //     doShowList(function (name) {
            //         var end = cursor + name.length;
            //         target.setRangeText(name, cursor, end, 'end');
            //     });
            // }

            function doShowList(callback) {
                var $list = $('#message .list');
                $list.removeClass('hidden');
                $list.attr('left')
                callback()
            };
        });
    },

})

var R1 = new Release();

//{a:1} {b:1,a:2} {a:1,b:2}
function extend(o1, o2) {
    for (var i in o2) {
        if (typeof o1[i] === 'undefined')
            o1[i] = o2[i];
    }
    return o1;
}
