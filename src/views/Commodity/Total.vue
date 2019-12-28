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
      banner:'https://c4.wallpaperflare.com/wallpaper/605/865/81/baby-book-animals-fairytale-wallpaper-preview.jpg',
      title:'全館商品列表'
    }
  }
}
</script>

<style>

</style>