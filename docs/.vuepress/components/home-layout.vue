<template>
    <div class="home-container">
        <div class="main one-bg">
            <div class="content-box">
                <img src="../public/logo.jpg" />
            </div>
        </div> 
        <div class="main three-bg">
            <ul>
                <li class="button" v-for="(item,index) in lists" :key="index">
                    <div>{{item.name}}</div>
                </li>
            </ul>
        </div>
         <div class="main two-bg">
            <my-header></my-header>
            <my-gitalk></my-gitalk>
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
import myGitalk from './my-gitalk'
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
        myHeader,myGitalk
    },
    mounted(){
        console.log(this.$page)
    }
}
</script>

<style lang="less">
@keyframes changimg {
    0% {
        width: 300px;
        height: 300px;
        border-radius: 0;
        transform: rotate(360deg)
    }
    50% {
        width: 0;
        height: 0;
        border-radius: 50%;
        transform: rotate(-360deg)
    }
    100%{
        width: 300px;
        height: 300px;
        border-radius: 0;
        transform: rotate(360deg)
    }
}
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
        background: url(../public/img/skills-bg.jpg);  
        background-attachment: fixed;
        .content-box{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            img{ 
                width: 300px;
                height: 300px;
                transform: translate3d(0,0,0);
                animation: changimg 3s ease-in-out .2s 1; 
            }
        }
    }

    .two-bg{
        background: url(../public/img/services-bg.jpg);  
        background-attachment: fixed;
        flex-flow: column nowrap;
        overflow-y: auto;
        div.bottom{ 
            color:transparent;
            font-size: 40px;
            font-weight: bold;
            background: linear-gradient(45deg, rgb(154, 239, 243) 0%, rgba(2, 92, 97, 0.4)  100%);
            -webkit-background-clip: text;
        }
        &::-webkit-scrollbar {
            width: 8px;
            background: white;
        }
        &::-webkit-scrollbar-corner, /* 滚动条角落 */
        &::-webkit-scrollbar-thumb,
        &::-webkit-scrollbar-track {
            border-radius: 4px;
        }
        &::-webkit-scrollbar-corner,
        &::-webkit-scrollbar-track {
        /* 滚动条轨道 */
            background-color: rgba(180, 160, 120, 0.1);
            box-shadow: inset 0 0 1px rgba(180, 160, 120, 0.5);
        }
        &::-webkit-scrollbar-thumb {
        /* 滚动条手柄 */
            background-color: #00adb5;
        }
    }
    .three-bg{
        background: url(../public/img/contact-bg.jpg);  
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
                position: relative;
                transition:transform .5s;
                div{ 
                    border-radius: 50%;
                    background-color: #0D1B2E;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1;
                }
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
        .footer{
            text-shadow: 0 0 2px rgba(0, 173, 181, .2882),
            0 0 2px rgba(0, 173, 181, .2882),
            0 0 2px rgba(0, 173, 181, .2882),
            0 0 2px rgba(0, 173, 181, .2882),
            0 0 2px rgba(0, 173, 181, .2882),
            0 0 2px rgba(0, 173, 181, .2882),
            0 0 2px rgba(0, 173, 181, .2882),
            0 0 2px rgba(0, 173, 181, .2882),
            0 0 2px rgba(0, 173, 181, .2882);
        }
    }
}

 .button{ 
    position: relative; 
    margin:30px auto;
    box-sizing: border-box;
    cursor: pointer; 
    &::before{
      content:'';
      width:0;
      height:0;
      background:  #00adb5;
      position: absolute;
      top:-5px;right:-5px;
      z-index: -1;
      border-radius: 50%;
      transition: width .5s,height .5s; 
    }
    &::after{
      content:'';
      width:0;
      height:0;
      background:  #00adb5;
      position: absolute;
      bottom:-5px;left:-5px;
      z-index: -1;
      border-radius: 50%;
      transition: width .5s,height .5s;
    }
    &:hover{
        transform: rotate(360deg);
    }
    &:hover::before{
      z-index:0;
      width:calc(100% + 10px);
      height:calc(100% + 10px); 
    }
    &:hover::after{
      z-index:0;
      width:calc(100% + 2px);
      height:calc(100% + 2px); 
    }
  }
</style>
