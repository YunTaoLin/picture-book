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
      banner:'https://www.blindtour.tw/wp-content/uploads//2019/08/29/8982/%E6%84%9B%E6%B2%BB5.png',
      title:'其他周邊商品'
    }
  }
}
</script>

<style>

</style>