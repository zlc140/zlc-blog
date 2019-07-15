<template>
    <div>
        <div class="box"></div>
    </div>
</template>

<script>
    export default {
        mounted(){
            console.log(this.$page,this.$site)
        },

    }
</script>

<style lang="less" scoped>
.box{
    width: 200px;
    height: 200px;
    border-radius: 6px;
    background-color: #23b7e5;
    position: relative;
    &:before{
        content: "";
        position: absolute;
        top: 50%;
        left: 25%;
        transform: translate(-50%, -50%);
        width: 36px;
        height: 36px;
        background: #fff;
        border-radius: 50%;
        box-shadow:
                #fff 22px -15px 0 6px,
                #fff 57px -6px 0 2px,
                #fff 87px 4px 0 -4px,
                #fff 33px 6px 0 6px,
                #fff 61px 6px 0 2px,
                #ccc 29px -23px 0 6px,
                #ccc 64px -14px 0 2px,
                #ccc 94px -4px 0 -4px;
        z-index: 2;
    }
    &:after{
        content: "";
        position: absolute;
        top:50%;
        left: 25%;
        width: 4px;
        height: 14px;
        background: #fff;
        border-radius: 2px;
        animation: rainDrop 1s linear infinite;
        box-shadow:
                #fff 25px -10px 0,
                #fff 50px 0 0,
                #fff 75px -10px 0,
                #fff 0 25px 0,
                #fff 25px 15px 0,
                #fff 50px 25px 0,
                #fff 75px 15px 0,
                #fff 0 50px 0,
                #fff 25px 40px 0,
                #fff 50px 50px 0,
                #fff 75px 40px 0;
        z-index: 2;
    }
}
@keyframes rainDrop {
       0% {
           transform: translate(0, 0) rotate(10deg);
       }
       100% {
           transform: translate(-4px, 24px) rotate(10deg);
           box-shadow:
           #fff 25px -10px 0,
           #fff 50px 0 0,
           #fff 75px -10px 0,
           #fff 0 25px 0,
           #fff 25px 15px 0,
           #fff 50px 25px 0,
           #fff 75px 15px 0,
           rgba(255, 255, 255, 0) 0 50px 0,
           rgba(255, 255, 255, 0) 25px 40px 0,
           rgba(255, 255, 255, 0) 50px 50px 0,
           rgba(255, 255, 255, 0) 75px 40px 0;
       }
   }

</style>
