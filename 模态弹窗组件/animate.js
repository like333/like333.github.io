// 过程 show:找到节点--> 添加class -->animationend --> 移除class
//hide:添加class -->animationend --> 移除class --> 移除节点

//功能函数
 function addClass(node, className){
    var current = node.className || "";
    if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
      node.className = current? ( current + " " + className ) : className;
        if(current){
            node.setAttribute('class', current + " " + className);
        }else{
             node.setAttribute('class', className);
        }
      }
     
    //  console.log(node.className);
     
  }

  function delClass(node, className){
    var current = node.className || "";
    node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
  }

function animateClass( node, className, callback){

    function onAnimateEnd(){
        //2.移除类名
        delClass(node, className);

        node.removeEventListener('animationend',onAnimateEnd);

        //3.执行回调
        callback && callback();

    }
    //1.添加类名触发animation
    addClass(node, className);
    node.addEventListener( 'animationend', onAnimateEnd);
}

