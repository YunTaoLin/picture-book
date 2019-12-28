<template>
  <div class="wow fadeIn">
    <list :banner="banner" :title="title"/>
  </div>
</template>

<script>
import list from '../../components/List'
export default {
  components:{
    list
  },
  data(){
    return {
      banner:'https://s3.envato.com/files/130035190/bookB.jpg',
      title:'0~6歲幼兒繪本'
    }
  }
}
</script>

<style>

</style>