<template>
  <header class="header" :class="{active: active,bgc:bgc}">
    <div class="header_container">
      <div class="log">
        <router-link to="/"><img src="../assets/mylogo3.png" alt="LOGO"></router-link>
      </div>
      <nav class="nav">
        <div class="navbar">
          <ul>
            <li class="commodity"><a href="javascript:;">商品分類<i class="fa fa-chevron-down" aria-hidden="true"></i></a>
              <ul :class="{fadeOut:fadeOut}">
                <li @click="toFadeOut"><router-link to="/commodity/total" >全部商品</router-link></li>
                <li @click="toFadeOut"><router-link to="/commodity/season" >當季精選繪本</router-link></li>
                <li @click="toFadeOut"><router-link to="/commodity/elementary" >0~6歲幼兒繪本</router-link></li>
                <li @click="toFadeOut"><router-link to="/commodity/junior" >6~12歲兒童繪本</router-link></li>
                <li @click="toFadeOut"><router-link to="/commodity/senior" >少年繪本</router-link></li>
                <li @click="toFadeOut"><router-link to="/commodity/other" >其他周邊商品</router-link></li>
              </ul>
            </li>
            <li><router-link to="/story">品牌故事</router-link></li>
            <li><router-link to="/store">門市資訊</router-link></li>
            <li><router-link to="/send">寄送說明</router-link></li>
            <li><router-link to="/contact">聯絡我們</router-link></li>
          </ul>
        </div>
        <div class="user_area">
           <div class="userbar">
             <div class="user_control" v-if="!username">
               <router-link to="/login" class="user_btn">
                 <span>會員登入/註冊</span>
                <i class="fa fa-user-circle" aria-hidden="true"></i>
              </router-link>
              <div class="cart_control">
                <router-link to="/cart" class="cart_btn">
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                  <p class="cart_items">{{cartNumber}}</p>
                </router-link>
                <ul :class="{fadeOut:fadeOut}">
                  <li @click="toFadeOut"><router-link to="/cart">登入並結帳</router-link></li>
                </ul>  
              </div>
             </div>
             
            <div v-else>
              <div class="user_control" >
                <a href="#" class="user_btn">
                  <span>{{'Hi '+username}}</span>
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                </a>  
                <ul :class="{fadeOut:fadeOut}">
                  <li @click="toFadeOut"><router-link to="/favorite">我的收藏</router-link></li>
                  <li @click="toFadeOut"><router-link to="/order">訂單查詢</router-link></li>
                  <li @click="toFadeOut"><router-link to="/profile">會員資料</router-link></li>
                  <li @click="toFadeOut"><a href="javascript:;" @click="logout">登出帳號</a></li>
                </ul>  
              </div>
              <div class="cart_control">
                <router-link to="/cart" class="cart_btn">
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                  <p class="cart_items">{{cartNumber}}</p>
                </router-link>
                <ul :class="{fadeOut:fadeOut}">
                  <li @click="toFadeOut"><router-link to="/cart">前往結帳</router-link></li>
                </ul>  
              </div>
            </div>
          </div>
          <div class="search_bar">
            <form class="search_form">
              <input type="text" v-model.trim="search" placeholder="搜尋">
              <router-link :to="'/search/'+search">
                <i class="fa fa-search" aria-hidden="true"></i>
              </router-link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>

export default {
  props:{
    transparent:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      active: true,
      bgc:false,
      fadeOut:false,
      search:''
    }
  },
  methods:{
    transparentHandler(){
      if(window.scrollY >200){
        this.active=true
      }else{
        this.active=false
      }
    },
    logout(){
      alert('已成功登出')
      this.$router.push('/login')
      this.$store.commit('logout')
    },
    toFadeOut(){
      this.fadeOut=true;
      setTimeout(()=>{
        this.fadeOut=false
      },1000)
    }
  },
  computed:{
    username(){
      if(this.$store.state.user.firstname){
        return this.$store.state.user.firstname
      }else return ''
    },
    cartNumber(){
      let total=0
      this.$store.state.cart.forEach(item => {
        total += parseInt(item.number)
      });
      return total
    }
  },
  watch:{
    transparent(data){
      if(data){
        this.bgc=false;
        this.active=false
        document.addEventListener('scroll',this.transparentHandler)
      }else{
        this.bgc=true;
        document.removeEventListener('scroll',this.transparentHandler)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss' ;
  .header{
    padding-top: 30px;
    position: fixed;
    z-index: 998;
    left: 0;
    top: 0;
    width: 100vw;
    transition: .5s;
    &.active{
      background-color: $primary-color;
    }
    &.bgc{
      transition: 0s;
      background-color: $primary-color;
    }
  }
  .header_container{
    
    height: 100px;
    box-sizing: border-box;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    .log{
      box-sizing: border-box;
      // height: 100px;
      width: 320px;
      padding: 5px 0 30px 50px;
      img{
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .nav{
    display: flex;
    width: 100%;
    
    .navbar{
      flex:8;
      display: flex;
      justify-content: center;
      > ul{
        display: flex;
        padding-inline-start:0;
        margin:0;
        list-style-type: none;
        line-height: 100px;
        > li >a{
          display: inline-block;
          margin-top: 12px;
          padding: 0 16px;
          font-size: 14px;
          letter-spacing: 2px;
          text-align: center;
          color: #fefefe;
          text-decoration: none;
          position: relative;
          &:after{
            content:'';
            width: 4.7em;
            height: 2px;
            background-color: #ddd;
            position: absolute;
            z-index: 55;
            bottom: 25%;
            left: 16px;
            opacity: 0;
            transition: .5s;
          }
          &:hover:after{
            opacity: 1;
            bottom: 35%;
          }
        }
      }
    }
    .user_area{
      flex:3;
      display: flex;
      flex-direction: column;
      padding-top: 8px;
      .userbar{
        display: flex;
        justify-content: flex-end;
        padding-right: 12px;
        flex:1;
        >div{
          display:flex;
        }
        .user_control,
        .cart_control{
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 1;
          height: auto;
          i{
            font-size: 20px;
            color: #fefefe;
          }
        }
          
      }
      .search_bar{
        flex:2;

      }
    }
  }

.user_control,
.cart_control{
  position: relative;
  &:hover{
    ul{
      opacity: 1;
      visibility: visible;
    }
  }
  ul{
    opacity: 0;
    visibility: hidden;
    list-style: none;
    padding-inline-start:0;
    width: 150px;
    line-height: 30px;
    text-align: left;
    position: absolute;
    top: 70%;
    right: 0;
    font-size: 14px;
    background-color: #fefefe;
    box-shadow: 0 1px 1px 1px #dedede;
    transition: .2s;
    &.fadeOut{
      opacity: 0;
      visibility: hidden !important;
    }
    li{
      padding: 4px 12px;
      a{
        color: $primary-color;
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
    li:hover{
      background-color: #eee;
      
    }
  }
  a{
    text-decoration: none;
    color: #fefefe;
    span{
      margin-right: .5em;
      font-size: 14px;
    }
  }
}

.cart_control{
  margin-left: 12px;
  a{
    display: flex;
    text-decoration: none;
  }
  p{
    margin:0 4px ;
    padding: 2px 12px;
    background-color: #f00;
    border-radius: 100px;
    font-size: 14px;
    color: #fefefe;
  }
  // ul{
  //   background-color: rgb(218, 230, 255);
  //   &:hover li{
  //     background-color: rgb(203, 220, 255); 
  //   }
  //   li a{
  //     color: #000;
  //     font-weight: 700;
  //   }
    
  // }
}

.search_bar{
  padding-left: 80px;
  padding-top: 4px;
  .search_form{
    display: flex;
    align-items: center;
    padding: 0 15px;
    background-color: #e4e2e2;
    max-width: 200px;
    border-radius: 100px;
    input{
      background-color: transparent;
      outline: none;
      border: none;
      line-height: 23px;
      font-size: 14px;
    }
    a{
      color: #666 ;
      padding: 2px 4px;
    }
  }
}

//商品下拉選單
.commodity{
  position: relative;
  &:hover ul{
    opacity: 1; 
    visibility: visible;
    transform: translateX(0) translateY(100%);
  }
  ul{
    opacity: 0;
    visibility: hidden;
    transition: .2s;
    position: absolute;
    right: 0;
    bottom: 1.5em;
    transform: translateX(-1em) translateY(100%);
    background-color: #fdfdfd;
    display: flex;
    flex-direction: column;
    margin-right: 1em ;
    padding-inline-start:0;
    list-style-type: none;
    text-align: left;
    border: 1px solid #ccc;
    &.fadeOut{
      opacity: 0;
      visibility: hidden !important;
    }
    li{
      width: 10em;
      height: 2.5em;
      line-height: 2.5em;
      font-size: 14px;
      a{
        color: $primary-color;
        display: inline-block;
        padding-left: 12px;
        width: 100%;
        height:100%;
        text-decoration: none;
        transition: .3s;
        &:hover{
          background-color: #dfdfdf;
        }
      }
    }

  }
}
</style>