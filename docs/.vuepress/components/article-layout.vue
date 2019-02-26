<template>
    <div>
        <component custom/> 
        <div>
            <my-gitalk></my-gitalk>
        </div>
    </div>
</template>

<script>
import myGitalk from './my-gitalk'
export default {
    mounted(){
        console.log(this.$page,this.$site)
    },
    components: {
        myGitalk
    },
}
</script>

<style>

</style>
