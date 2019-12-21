<template>
  <div class="commodity">
    <div class="container">
      <div class="myBreadcrumb">
        <router-link to='/'>首頁</router-link>
        <span class="icon">></span>
        <span>{{classify}}</span>
      </div>
      <hr>
      <div class="row">
        <div class="col-3">
          <ul class="menu">
            <li><router-link to="/commodity/total">全部商品 | 好書通通有</router-link></li>
            <li><router-link to="/commodity/season">精選繪本 | 當季特賣</router-link></li>
            <li><router-link to="/commodity/elementary">幼兒繪本 | 適合0~6歲幼兒</router-link></li>
            <li><router-link to="/commodity/junior">兒童繪本 | 適合6~12歲兒童</router-link></li>
            <li><router-link to="/commodity/senior">少年繪本 | 適合12歲以上</router-link></li>
            <li><router-link to="/commodity/other">其他周邊商品</router-link></li>
          </ul>
        </div>
        <div class="col-9">
          <router-view />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
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
  .menu{
    padding-inline-start:0;
    text-align: left;
    list-style: none;
    font-size: 14px;
    li{
      margin: 12px 0;
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
</style>