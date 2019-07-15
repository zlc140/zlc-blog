<template>
    <div>
        <ul>
            <li @click="move(1)">匀速</li>
            <li @click="move(2)">匀加速</li>
            <li @click="move(3)">抖一抖</li>
        </ul>
        <div class="box"></div>
    </div>
</template>

<script>
    export default {
        data() {
          return {
              value: 0,
              box: null
          }
        },
        created(){
            //因为这里要操作dom,如何在created中需要放在nextTick中执行，mounted则不需要
            this.$nextTick(() => {
                console.log(this.$page,this.$site)
                this.box = document.querySelector('.box')
                // requestAnimationFrame(this.add)
                this.animate(100, 400, 1000, value => {
                    this.box.style.transform = `translateX(${value}px)` // 将数值设置给 方块 的 css 属性 transform 属性可以控制元素在水平方向上的位移
                })
            })
        },
        methods: {
            add() {
                if(this.value > 200) {
                    cancelAnimationFrame(this.add)
                }
                requestAnimationFrame(this.add)
                this.value += 5;
                this.box.style.transform = `translateX(${this.value}px)`
            },
            move(type){
                let timingFunction;
                switch (type) {
                    case 3:
                        timingFunction = this.shake
                        break;
                    case 2:
                        timingFunction = this.easeIn
                        break;
                    default:
                        timingFunction = undefined;
                        break;

                }
                this.animate(0, 400, 1000, value => {
                    this.box.style.transform = `translateX(${value}px)` // 将数值设置给 方块 的 css 属性 transform 属性可以控制元素在水平方向上的位移
                },timingFunction)
            },
            /**
             *  执行补间动画方法
             *
             * @param      {Number}    start     开始数值
             * @param      {Number}    end       结束数值
             * @param      {Number}    time      补间时间
             * @param      {Function}  callback  每帧的回调函数
             */
            animate(start, end, time, callback, timingFunction) {
                let startTime = performance.now() // 设置开始的时间戳
                let differ = end - start // 拿到数值差值
                let _this  = this
                // 创建每帧之前要执行的函数
                function loop() {
                    raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
                    const passTime = performance.now() - startTime // 获取当前时间和开始时间差
                    let per = passTime / time // 计算当前已过百分比
                    if (per >= 1) { // 判读如果已经执行
                        per = 1 // 设置为最后的状态
                        cancelAnimationFrame(raf) // 停掉动画
                    }
                    const pass = differ * (timingFunction ? timingFunction(per) : per) // 通过已过时间百分比*开始结束数值差得出当前的数值
                    callback(pass) // 调用回调函数，把数值传递进去
                }
                let raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
            },
             shake(time) {
                if (time < 0.6) {
                    return (time / 0.6) ** 2
                } else {
                    return Math.sin((time-0.6) * ((3 * Math.PI) / 0.4)) * 0.2 + 1
                }
            },
            easeIn(time) {
                return time ** 2;
            }
        }

    }
</script>

<style lang="less" scoped>
    ul{
        li{
            list-style: none;
            display: inline-block;
            padding: 2px 5px;
            border: 1px solid #f0f0f0;
            border-radius: 4px;
            color: #555;
            text-align: center;
            cursor: pointer;
        }
    }
.box{
    width: 100px;
    height: 100px;
    background-color: #00adb5;
}
</style>
