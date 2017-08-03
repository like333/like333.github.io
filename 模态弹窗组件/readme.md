###使用说明
```

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