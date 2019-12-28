<template>
  <div class="commodity wow fadeIn">
    <div class="container">
      
      <div class="myBreadcrumb">
        <router-link to='/'>首頁</router-link>
        <span class="icon">></span>
        <span>{{classify}}</span>
      </div>
      <hr>
      <div class="row">
        <div class="col-3">
          <h2 class="title">商品分類</h2>
          <ul class="menu">
            <li><router-link to="/commodity/total">全部商品 | 好書通通有</router-link></li>
            <li><router-link to="/commodity/season">精選繪本 | 當季特賣</router-link></li>
            <li><router-link to="/commodity/elementary">幼兒繪本 | 適合0~6歲幼兒</router-link></li>
            <li><router-link to="/commodity/junior">兒童繪本 | 適合6~12歲兒童</router-link></li>
            <li><router-link to="/commodity/senior">少年繪本 | 適合12歲以上</router-link></li>
            <li><router-link to="/commodity/other">其他周邊商品</router-link></li>
          </ul>
          <recommend class="mt-5" :list="recommoendList"/>
        </div>
        <div class="col-9">
          <router-view />
        </div>
      </div>
      
    </div>
    <myFooter />
  </div>
</template>

<script>
import recommend from '../components/Recommend.vue'
import myFooter from '../components/Footer'
export default {
  components:{
    recommend,myFooter
  },
  data(){
    return {
      recommoendList: []
    }
  },
  computed:{
    classify(){
      let classify=''
     switch(this.$route.name){
        case 'season': classify ='精選繪本 | 當季特賣' ; break;
        case 'elementary': classify='幼兒繪本 | 適合0~6歲幼兒' ; break;
        case 'junior': classify='兒童繪本 | 適合6~12歲兒童' ; break;
        case 'senior': classify='少年繪本 | 適合12歲以上' ; break;
        case 'other': classify='其他周邊商品' ; break;
        case 'total': classify='全部商品 | 好書通通有' ; break;
      }
      return classify
    }
  },
  methods:{
    getRecommoendList(){
      // let length = this.$store.state.commodity.length  
      if(this.$route.name == 'total'){
      this.recommoendList =  this.$store.state.commodity.slice(5,10)
      }else{
        this.recommoendList = this.$store.getters[this.$route.name].slice(5,10)
      }
    }
  },
  created(){
    this.getRecommoendList()
  },
  beforeUpdate(){
    this.getRecommoendList()
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.commodity{
  margin-top: 150px;
  font-size: 14px;
  .myBreadcrumb{
    display: flex;
    justify-content: flex-start;
    a{
      color: #888;
      text-decoration: none;
    }
    span.icon{
      margin: 0 12px;
    }
  }
  .title{
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    color: $th4-color;
  }
  .menu{
    padding-inline-start:0;
    text-align: left;
    list-style: none;
    font-size: 14px;
    li{
      margin: 16px 0;
      a{
        color: $primary-color;
        text-decoration: none;
        letter-spacing: 2px;
        transition: .1s;
        &:hover{
          color: $th4-color;
        }
      }
    }
  }
}

.banner{
  width: 100%;
  padding-top: 35%;
  position: relative;
  img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
}
</style>