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
            title:"弹出框标题",
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

### Demo
http://like333.github.io/模态弹窗组件/index.html

### 说明
* 动画使用添加css样式的方法
* 引用动画的样式来自`animate.css`  https://daneden.github.io/animate.css/
