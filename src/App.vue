<template>
  <div id="app">
    <img alt="Vigil Logo" src="./assets/TrellisLogo2.png">
    <PipelineWrapper/>
  </div>
</template>

<script>
import PipelineWrapper from './components/PipelineWrapper.vue'

export default {
  name: 'app',
  components: {
    PipelineWrapper
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
