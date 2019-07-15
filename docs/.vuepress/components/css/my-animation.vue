<template>
    <div class="box">
        <div class="view1">
            <div></div>
        </div>
        <div class="view2">
            <div></div>
        </div>
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
    .box{
        width: 100%;
        height: 150px;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        &>div{
            width: 150px;
            height: 150px;
            display: inline-block;

        }
        .view1{
            position: relative;
            background-color: #cccccc;
            div{
                transition: all 1s ease;
                width: 100%;
                height: 100%;
                background-color: #00adb5;
                transform: scale(0);

            }
            &:hover div{
                transform: scale(1);
            }
        }
        .view2 {
            div{
                width: 100%;
                height: 100%;
                background-color: #00adb5;
                transform: translateZ(0);
                animation: view2Box 1s ease-in infinite alternate;
            }
        }
    }

    @keyframes view2Box {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

</style>
