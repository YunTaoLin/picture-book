<template>
  <div class="login">
    <div class="container">
      <div class="col-5">
        <div class="btn_group">
          <a href="javascript:;" :class="{active:status === 0}" @click="statusHandler(0)">登入會員</a>
          <a href="javascript:;" :class="{active:status === 1}" @click="statusHandler(1)">註冊帳號</a>
        </div>
        <div class="main">
          <div class="login_area" v-if="status === 0">
            <div class="row">
              <div class="col-12 inner">
                <form >
                  <h2>Welcome back！</h2>
                  <label for="email">
                    <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                    <input type="email" id="email" placeholder="請輸入電子信箱" v-model.trim="login.email">
                    
                  </label>
                  <label for="password">
                    <span><i class="fa fa-key" aria-hidden="true"></i></span>
                    <input :type="eye_login? 'text':'password'" id="password" placeholder="請輸入密碼" v-model.trim="login.password">
                    <span class="eye" @click="eye_login = !eye_login"><i class="fa fa-eye" aria-hidden="true" v-if="eye_login"></i><i class="fa fa-eye-slash" aria-hidden="true" v-else></i></span>
                  </label>
                  <button @click.prevent="loginHandler" :disabled="loading">{{loading?'處理中...': '登入'}}</button>
                </form>
              </div>
            </div>
          </div>
          <div class="registered_area" v-else>
            <div class="row">
              <div class="col-12 inner">
                <form >
                  <h2>註冊成為會員</h2>
                  <label for="email">
                    <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                    <input type="email" id="email" placeholder="設定登入信箱" v-model.trim="registered.email">
                  </label>
                  <label for="lastname">
                    <span><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
                    <input type="text" id="lastname" placeholder="姓氏" v-model.trim="registered.lastname">
                    <input type="text" id="firstname" placeholder="名字" v-model.trim="registered.firstname">
                  </label>
                  <label for="password">
                    <span><i class="fa fa-key" aria-hidden="true"></i></span>
                    <input :type="eye_regsitered? 'text':'password'" id="password" placeholder="設定密碼" v-model.trim="registered.password">
                    <span class="eye" @click="eye_regsitered = !eye_regsitered"><i class="fa fa-eye" aria-hidden="true" v-if="eye_regsitered"></i><i class="fa fa-eye-slash" aria-hidden="true" v-else></i></span>
                  </label>
                  <button @click.prevent="registeredHandler" :disabled="loading">{{loading?'處理中...': 'Join us！'}}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyFooter />
  </div>
</template>

<script>
import MyFooter from '@/components/Footer.vue'
import $ from 'jquery'
export default {
  components: {
    MyFooter
  },
  data(){
    return {
      //0是登入，1是註冊
      status:0,
      eye_login:false,
      eye_regsitered:false,
      login:{
        email:'',
        password:''
      },
      registered:{
        email:'',
        lastname:'',
        firstname:'',
        password:''
      },
      loading:false
    }
  },
  methods:{
    statusHandler(e){
      this.status = e;
    },
    loginHandler(){
      if(!this.login.email) return alert('請輸入email');
      if(!this.login.password) return alert('請輸入密碼');
      this.loading=true;
       $.ajax({
        url: 'http://127.0.0.1:3000/ajax/login',
        type: 'post',
        datatype: 'json',
        crossDomain: true,        
        data: this.login
      }).done((res)=> {
        this.loading=false;
        console.log(res)
        if(res.err_code==0){
          alert('歡迎回來'+res.user.firstname+'！')
          if(this.$store.state.cart.length>0){
            if(!confirm('購物車目前有商品，是否要合併到會員購物車內?')){
              this.$store.commit('removeCart')
            }
          }
          this.$store.commit('login',res.user)
          this.$store.dispatch('a_updateCart')
          this.$store.state.user.order.forEach(item => {
            console.log('查詢一次')
            this.$store.dispatch('a_getOrder',item)
          });
          this.$router.go(-1)
        }else if(res.err_code==1){
          alert('帳號或密碼錯誤')
        }else{
          alert('伺服器忙線中，請稍後再試')
        }
      }).fail((err)=> {
        console.log('失敗了'+err)
        this.loading=false;
      })
    },
    registeredHandler(){
      if(!this.registered.email) return alert('請輸入正確的email');
      if(!this.registered.lastname) return alert('姓氏不可為空');
      if(!this.registered.firstname) return alert('名字不可為空');
      if(this.registered.password.length < 5) return alert('密碼需要6位以上');
      this.loading=true;
      $.ajax({
        url:'http://127.0.0.1:3000/ajax/login',
        type: 'post',
        datatype: 'json',
        crossDomain: true,        
        data: this.registered
      }).done((res) =>{
        this.loading=false;
        console.log(res)
        if(res.err_code==0){
          this.$store.commit('login',res.user)
          localStorage.setItem('user',JSON.stringify(res.user))
          alert('註冊成功！ '+res.user.firstname+'，歡迎您加入方方繪本')
          if(this.$store.state.cart.length>0){
            if(!confirm('購物車目前有商品，是否要合併到會員購物車內?')){
              this.$store.commit('removeCart')
            }
          } 
          this.$store.dispatch('a_updateCart')
          this.$store.state.user.order.forEach(item => {
            this.$store.dispatch('a_getOrder',item)
          });
          this.$router.go(-1)
        }else if(res.err_code==1){
          alert('該信箱已被註冊過囉')
        }else{
          alert('伺服器忙線中，請稍後再試')
        }
      }).fail(()=>{
        this.loading=false;
        alert('伺服器忙線中，請稍後再試')
      })
    }
  },
  mounted(){
    if (this.$store.state.user._id){
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_base.scss' ;
.login{
  padding-top: 240px;
  height: 100vh;
  background: url('https://www.wallpaperflare.com/static/276/53/132/anime-man-sitting-roof-wallpaper.jpg') 0 / cover fixed;
  .btn_group{
    width:100%;
    position: relative;
    z-index: 5;
    a{
      display: inline-block;
      width: 50%;
      height: 44px;
      line-height: 44px;
      color: $primary-color;
      border-top: 4px solid #aaa;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      text-decoration: none;
      background-color: rgba(235, 235, 235, 0.87);
      color: #666;
      font-weight: 700;
      &.active{
        border-top: 4px solid rgb(100%, 75%, 20%);
        border-bottom: none;
        background-color: rgba(250, 250, 250,.87);
        color: #000;
      }
    }
  }
  .container{
    display: flex;
    justify-content: center;
  }
}

.main{
  width: 100%;
  height: 45vh;
  margin-bottom: 15vh;
  border: 1px solid #ccc;
  margin-top:-1px;
  // margin: 0 40px;
  position: relative;
  z-index: 1;
  background: rgba(250, 250, 250, 0.9);
  
  >div{
    height: 100%;
  } 
  .row{
    height: 100%;
    align-items: center;
    .inner{
      height: 80%;
      display:flex;
      justify-content: center;
      align-items: center;
    }
    form{
      height: 100%;
      width: 100%;  
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h2{
        font-weight: 700;
        margin-bottom: 20px;
        font-size: 28px;
      }
      label{
        width: 70%;
        margin: 12px 0;
        display: flex;
        position: relative;
        span{
          padding-right: 1em;
          font-size: 18px;
          display: flex;
          align-items: center;
        }
        input{
          border: none;
          border-bottom: 1px solid #aaa;
          outline: none;
          position: relative;
          width: 100%;
          display: inline-block;
          vertical-align: middle;
          background: none;
          height: 40px;
          font-size: 15px;
          margin: 0;
          border-radius: 0;
          box-sizing: border-box;
          box-shadow: none;
          padding: 0 38px 0 0;
          &:nth-of-type(2){
            margin-left: 1em;
          }
          &::placeholder{
            font-size: 16px;
            color: $primary-color;
            transition: .3s;
          }
          &:focus::placeholder{
           transform: translateY(2em);
          }
        }
        .eye{
          position: absolute;
          right:0;
          bottom: 0;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
        }
      }
      button{
        width: 70%;
        background-color: $primary-color;
        border:none;
        display: inline-block;
        height: 2.5em;
        line-height: 2.5em;
        color: #fff;
        margin: 20px 0;
        border-radius: 4px;
      }
    }
  }
}
</style>