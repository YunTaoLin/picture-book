<template>
  <div id="app">
    <myHeader />
    <router-view/>
  </div>
</template>

<script>

import myHeader from './components/Header'
export default {
  components:{
    myHeader
  }
}
</script>


<style lang="scss">
*{
  font-family: '微軟正黑體';
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
