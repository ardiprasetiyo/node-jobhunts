<template>
  <div class="about">
    <h1>There's {{ viewers }} viewers</h1>
  </div>
</template>
<script>
export default {
  data(){
    return {
      viewers: this.$store.state.views
    }
  }
}
</script>
