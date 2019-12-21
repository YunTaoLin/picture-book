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
              <ul>
                <li><router-link to="/commodity/total">全部商品</router-link></li>
                <li><router-link to="/commodity/season">當季精選繪本</router-link></li>
                <li><router-link to="/commodity/elementary">0~6歲幼兒繪本</router-link></li>
                <li><router-link to="/commodity/junior">6~12歲兒童繪本</router-link></li>
                <li><router-link to="/commodity/senior">青少年繪本</router-link></li>
                <li><router-link to="/commodity/other">其他周邊商品</router-link></li>
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
             </div>
            <div v-else>
              <div class="user_control" >
                <a href="#" class="user_btn">
                  <span>{{'Hi '+username}}</span>
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                </a>  
                <ul>
                  <li>我的收藏</li>
                  <li>訂單查詢</li>
                  <li>資料修改</li>
                  <li ><a href="javascript:;" @click="logout">登出帳號</a></li>
                </ul>  
              </div>
              <div class="cart_control">
                <a href="#" class="cart_btn">
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                </a>
                <p class="cart_items">0</p>
              </div>
            </div>
          </div>
          <div class="search_bar">
            <form class="search_form">
              <input type="search" placeholder="搜尋">
              <a href="#">
                <i class="fa fa-search" aria-hidden="true"></i>
              </a>
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
      bgc:false
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
      localStorage.removeItem('user')
    }
  },
  computed:{
    username(){
      if(this.$store.state.user.firstname){
        return this.$store.state.user.firstname
      }else return ''
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
      flex:4;
      display: flex;
      justify-content: center;
      > ul{
        display: flex;
        padding-inline-start:0;
        margin:0;
        list-style-type: none;
        line-height: 100px;
        margin-right: 40px;
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
      flex:1;
      display: flex;
      flex-direction: column;
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

.user_control{
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
    font-size: 14px;
    margin-right: 1em;
    text-decoration: none;
    color: #fefefe;
    span{
      margin-right: 1em;
    }
  }
}

.cart_control{
  margin-left: 12px;
  p{
    margin:0 4px ;
    padding: 2px 12px;
    background-color: #f00;
    border-radius: 100px;
    font-size: 14px;
    color: #fefefe;

  }
}

.search_bar{
  .search_form{
    display: flex;
    align-items: center;
    padding: 0 15px;
    background-color: #e4e2e2;
    // border: 1px solid #000;
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