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
      banner:'https://webtribune.rs/wp-content/uploads/2018/05/ghfdekiurhfgeiwsj.jpg',
      title:'少年繪本'
    }
  }
}
</script>

<style>

</style>