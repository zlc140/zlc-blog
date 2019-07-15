<template>
  <div class="bottom">
      <h3>{{ text1 }}</h3>
      <h3>{{ text2 }}</h3>
  </div>
</template>
<script>
    export default {
      data() {
        return {
          txt: '回首青春我发现自己失去很多宝贵的东西，但我并不难过，因为我知道，以后我会失去更多。。。',
          text1: '',
          text2: '',
          num: 0,
          num2: 0
        }
      },
      mounted(){
        this.num2 = parseInt(this.txt.length/2) - 4
        this.getVal()
      },
      methods:{
        getVal() {
          let delay = 300, _this = this;
          this.num++;
          if(this.num <= this.num2){
            this.text1 = this.txt.substr(0, this.num)
          }else if(this.num > this.num2 && this.num < this.txt.length+1){
            this.$nextTick(function(){
              _this.text2 = _this.txt.substr(_this.num2, (_this.num - _this.num2))
            })
          }else{
            return
          }
           setTimeout( () => { this.getVal() },delay)
        }
      }

    }
</script>
<style lang="less" scoped>
.bottom {
  h3{
    text-align: center;
  }
}
</style>
