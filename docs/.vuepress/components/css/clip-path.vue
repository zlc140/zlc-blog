<template>
    <div class="clip-container">
        <div class="inset-box">inset()</div>
        <div class="circle-box">circle()</div>
        <div class="ellipse-box">ellipse()</div>
        <div class="polygon-box">polygon()</div>
    </div>
</template>

<script>

    export default {
        mounted(){
            console.log(this.$page,this.$site)
        },
        components: {

        },
    }
</script>

<style lang="less">
.clip-container{
    width: 100%;
    border: 1px solid #f0f0f0;
    height: 200px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    >div{
        width: 100px;
        height: 100px;
        background-color: #f0f0f0;
        position: relative;
        font-size: 20px;
        display: inline-block;
    }
}
.circle-box{
    &:before{
        content: '';
        z-index: 1;
        width: 5em;
        height: 5em;
        background: url("../../public/img/contact-bg.jpg") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0;
        animation: circleBox 2s linear infinite;
    }
}
.inset-box{
    &:after{
        content: '';
        z-index: 1;
        width: 5em;
        height: 5em;
        background: url("../../public/img/logo.jpg") no-repeat;
        background-size: 100%;
        position: absolute;
        left: 0;
        top: 0;
        animation: insetBox 2s linear infinite;
    }
}
.ellipse-box{
    &:after{
        content: '';
        z-index: 1;
        width: 5em;
        height: 5em;
        background: url("../../public/img/skills-bg.jpg") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0;
        animation: ellipseBox 2s linear infinite;
    }
}
.polygon-box{
    &:after{
        content: '';
        z-index: 1;
        width: 5em;
        height: 5em;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #FFEB3B;
        animation: polygonBox 2s linear infinite;
        clip-path: polygon(
                50% 0%,
                65.43% 25%,
                93.3% 25%,
                78.87% 50%,
                93.3% 75%,
                64.43% 75%,
                50% 100%,
                35.57% 75%,
                6.7% 75%,
                21.13% 50%,
                6.7% 25%,
                35.57% 25%);
    }
}

@keyframes insetBox {
    0% {
        clip-path: inset(2em 3em 2em 1em);
    }
    50% {
        clip-path: inset(0);
    }
    100% {
        clip-path: inset(2em 3em 2em 1em);
    }
}
@keyframes circleBox {
        0% {
            clip-path: circle(0.5em at 2.5em 2.5em);
        }
        50% {
            clip-path: circle(5em at 2.5em 2.5em);
        }
        100% {
            clip-path: circle(0.5em at 2.5em 2.5em);
        }
}
@keyframes ellipseBox {
        0% {
            clip-path: ellipse(5% 3% at 50% 50%);
        }
        50% {
            clip-path: ellipse(80% 30% at 50% 50%);
        }
        100% {
            clip-path: ellipse(5% 3% at 50% 50%);
        }
}
@keyframes polygonBox {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.25);
        }

        100% {
            transform: scale(1);
        }
}
</style>
