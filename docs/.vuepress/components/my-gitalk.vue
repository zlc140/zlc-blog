<template>
    <div id="gitalk-container"></div>
</template>

<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk' 
export default {
    data(){
        return {
            configData: {
                clientID: '34b8c6b940c34e67e854',
                clientSecret: '6e57c6bc273517bf5ad7e9142069379f6001daa6',
                repo: 'zlc-blog',
                owner: 'zlc140',
                admin: 'zlc140',
                id: location.pathname,      // Ensure uniqueness and length less than 50
                distractionFreeMode: false  // Facebook-like distraction free mode
            }
        }
    },
    mounted(){
        const gitalk = new Gitalk(this.configData)
        gitalk.render('gitalk-container')
    }
}
</script>

<style>

</style>
