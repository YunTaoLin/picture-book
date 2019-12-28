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
      banner:'https://cdn.hk01.com/di/media/images/1353616/org/4d51d01451ede1698fa3189206cc2354.jpg/creG5tM9azUAvRS5kEMckaZPHftTQSci1mMJ5dZjCeU?v=w1920',
      title:'6~12歲兒童繪本'
    }
  }
}
</script>

<style>

</style>