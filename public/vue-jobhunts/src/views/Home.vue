<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>{{ views }}</h1>
    <h1 @click="addView">Test </h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
    return {
      views: this.$store.state.views
    }
  },
  components: {
    HelloWorld
  },
  methods:{
    addView(){
      this.$store.commit('addView')
      this.views = this.$store.state.views
    }
  },
  created(){
  }
}
</script>
