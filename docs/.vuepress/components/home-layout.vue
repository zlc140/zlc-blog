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
                width: 80%;
            }
        }
    }
    .two-bg{
        background: url(../public/img/services-bg.jpg);  
        background-attachment: fixed;
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
