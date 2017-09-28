$(function() {

    !function(window) {
        /* targetDom：[jQselec]必传   在目标区域滑动的元素，接受Dom对象，以及jQ获取方式的css选择器；
         * className：[jQselec]必传   移动的元素，接受Dom对象，以及jQ获取方式的css选择器；
         * num      ：[Object ]选传   X 缩放百分比的比列默认3% ==> 0.03   Y 缩放百分比的比列默认1% ==> 0.01
         * speed    : [number ]选传   每过多久执行一次定时器 默认100ms
         */
        var Fms = function(targetDom, className, num, speed) {
            var $that = this;
            this.className = className;

            // 传空参数，赋值为空对象，如果传递对象还是为原来传递的对象；
            this.num = num || {};
            this.num.x = this.num.x || 0.03;
            this.num.y = this.num.y || 0.01;

            // 定时器速度
            this.speed = speed || 100;

            // 判断构造函数是否使用new创建的  不是通过new则使用new运行
            if (!(this instanceof Fms)) return new Fms(targetDom, className, num, speed);

           /* this.options = this.extend({
               imgSrc: "../static/img/abc.png"
           }, options);
            */
           
            // 判断传进来是Dom还是字符串
            if ( (typeof targetDom) === "string") {
                // querySelector("#"+targetDom) 需要加＃ 通过ID名字获取
                this.targetDom = $(targetDom);
            } else {
                this.targetDom = $(targetDom);
            }

            // 不能写到公共部分prototype  因为每次调用元素的信息不一样
            this.get =  function() {
                // 取一半，中心左边为负数    右半部份为整数移动
                $that.clientX = $that.targetDom.width() / 2;
                $that.clientY = $that.targetDom.height() / 2;
                $that.moveElement = $($that.className);
                $that.ev = {};

                $that.targetDom.mousemove(function(e) {
                    $that.ev = e;
                })
            }
            this.visual = function(ev) {
                var tx = $that.clientX - ev.clientX;
                var ty = $that.clientY - ev.clientY;

                var temp_tr = "translate3d(" + tx * $that.num.x + "px," + ty * $that.num.y + "px,0";

                $that.moveElement.css({
                    "-webkit-transform": temp_tr,
                    "-moz-transform": temp_tr,
                    "-ms-transform": temp_tr,
                    "-o-transform": temp_tr,
                    "transform": temp_tr,
                    "-webkit-transition": "all 300ms ease",
                    "-moz-transition": "all 300ms ease",
                    "-ms-transition": "all 300ms ease",
                    "-o-transition": "all 300ms ease",
                    "transition": "all 300ms ease",
                });
            }

            this.get();
            setInterval(function() {
                $that.visual($that.ev);
            }, $that.speed);
        };

        // 公共部分的代码
        Fms.prototype = {
            // 初始化
            init: function() {
                
            }
        }

        // 暴露给全局
        window.Fms = Fms;

    }(window);

    new Fms('.wrap800', '.pic404', {x: 0.08, y: 0.03});
    new Fms('.wrap800', '.crab', {x: 0.04, y: 0.01});

})

