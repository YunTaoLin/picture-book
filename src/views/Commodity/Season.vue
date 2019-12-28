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
      banner:'https://miro.medium.com/max/4096/1*0KBsEsdUfgvxwctzdB2cdg.jpeg',
      title:'當季精選繪本'
    }
  }
}
</script>

<style>

</style>