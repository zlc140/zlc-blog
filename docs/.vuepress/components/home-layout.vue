<template>
    <div class="home-container">
        <div class="main one-bg">
            <div class="content-box">
                <img src="../public/logo.jpg" />
            </div>
        </div> 
        <div class="main three-bg">
            <ul>
                <li v-for="(item,index) in lists" :key="index">{{item.name}}</li>
            </ul>
        </div>
         <div class="main two-bg">
            <my-header></my-header>
        </div>
        <div class="main footer-box">
            <div class="footer">
                MIT Licensed | Copyright © 2019-love Zhanglc 
            </div>
        </div>
    </div>
</template>

<script>
import myHeader from './my-header'
export default {
    data() {
        return {
            lists: [
                {name: 'JS'},
                {name: 'CSS'},
                {name: 'nodeJs'},
                {name: 'webpack'},
            ]
        }
    },
    components: {
        myHeader
    }
}
</script>

<style lang="less">
.home-container{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column; 
    flex-basis: auto;
    .main{
        width: 100%;
        height: 800px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    } 
    .one-bg{
        background: url(/img/skills-bg.jpg);  
        background-attachment: fixed;
        .content-box{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 80%;
            }
        }
    }
    .two-bg{
        background: url(/img/services-bg.jpg);  
        background-attachment: fixed;
    }
    .three-bg{
        background: url(/img/contact-bg.jpg);  
        background-attachment: fixed;
        ul{
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            justify-content: space-evenly;
            li{
                width: 150px;
                height: 150px;
                font-size: 25px; 
                border: 5px solid white;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                margin-bottom: 20px;
            }
        }
    }
      .one-bg,.two-bg,.three-bg{
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .footer-box{
        height: 120px;
        background-color: #243346;
        color: white;
    }
}
</style>
