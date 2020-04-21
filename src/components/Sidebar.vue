<template>
  <div class="container">
      <div class="myBreadcrumb">
        <router-link to='/'>首頁</router-link>
        <span class="icon">></span>
        <span>{{theTitle}}</span>
      </div>
      <hr>
      <div class="row">
        <div class="col-3">
          <h2 class="title">會員相關</h2>
          <ul class="menu">
            <li><router-link to="/cart">>前往購物車</router-link></li>
            <li><router-link to="/favorite">>我的收藏</router-link></li>
            <li><router-link to="/order">>訂單查詢</router-link></li>
            <li><router-link to="/profile">>會員資料</router-link></li>
          </ul>
        </div>
        <div class="col-9 main">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    theTitle:{
      type:String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_base.scss';
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
    color: $primary-color;
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

</style>