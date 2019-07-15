<template>
    <div>
    <div class="box">
        <div class="div1">left/top</div>
    </div>
    <div class="box">
        <div class="div2">transform</div>
    </div>
    <div class="box">
        <div class="div3">transform + left/top</div>
    </div>
    <div class="box">
        <div class="div4">margin</div>
    </div>
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
.box {
    width: 150px;
    height: 150px;
    display: inline-block;
    border: 1px solid #00ffff;
    border-radius: 4px;
    position: relative;
    div{
        width: 75px;
        height: 75px;
        background-color: #cccccc;
    }
    .div1{
        position: absolute;
        top: 50%;
        left: 50%;
    }
    .div2{
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(50%,50%);
    }
    .div3{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .div4{
        position: absolute;
        top: 0%;
        left: 0%;
        margin-left: 50%;
        margin-top: 50%;
    }
}

</style>
