### 使用说明
```html
<link rel="stylesheet" type="text/css" href="./style.css">
<link rel="stylesheet" type="text/css" href="./animate.css">
<script src="http://code.jquery.com/jquery.js"></script>
<script src = "./animate.js"></script>
<script src="./index.js"></script>
```
```javascript

 var modal = new Modal({
    //1.内容配置
            content:"内容在此",
    //2.动画设置
            animation:{
                enter:"bounceIn",
                leave:"bounceOut"
            }
        })

        //方法调用
        modal.on('confirm', function(){
            console.log('confirm');
        })
        modal.on('cancel', function(){
            console.log('cancel');
        })
        document.querySelector('.u-trigger').addEventListener(
            'click', function(){
                modal.show({
                   content: "<h3>显示弹框内容</h3>"
                })
        })

```