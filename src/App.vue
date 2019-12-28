<template>
  <div id="app">
    <myHeader :transparent="headerTransparent"/>
    <router-view/>
  </div>
</template>

<script>

import myHeader from './components/Header'
export default {
  components:{
    myHeader
  },
  data(){
    return{
      headerTransparent:false
    }
  },
  beforeMount(){
    let user = JSON.parse(localStorage.getItem('user'))
    if(user){
      this.$store.commit('login',user)
    }
    this.$store.dispatch('a_getCommodity')
    this.$store.commit('getCart')
  },
  mounted(){
    if(this.$route.name=="home"){
      this.headerTransparent=true;
    }
  },
  updated(){
    if(this.$route.name=="home"){
      this.headerTransparent=true;
    }else{
      this.headerTransparent=false;
    }
    window.scrollTo(0,0)
  }
}
</script>


<style lang="scss">
@import './assets/scss/_reset.scss' ;
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
