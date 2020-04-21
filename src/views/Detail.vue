<template>
  <div class="detail">
    <div class="container">
      <div class="myBreadcrumb">
        <router-link to='/'>首頁</router-link>
        <span class="icon">></span>
        <router-link :to='"/commodity/"+classify_id'>{{classify}}</router-link>
        <span class="icon">></span>
        <span>{{commodity.title}}</span>
      </div>
      <div class="row">
          <div class="col-5">
           <div class="side_bar">
              <div class="pic">
                <img :src="commodity.img" alt="商品圖片">
              </div>
              <div class="share">
                分享：
                <a :href="'https://www.facebook.com/dialog/feed?app_id=382498665271383&link='+link"><img src="../assets/fb666.png" alt="fb" class="icon"></a>
                <a :href="'https://www.facebook.com/dialog/send?app_id=382498665271383&display=popup&link='+link"><img src="../assets/message666.png" alt="message" class="icon"></a>
                <a :href="'https://plus.google.com/share?url='+link"><img src="../assets/google.png" alt="google" class="icon"></a>
                <a :href="'https://www.pinterest.com/pin/create/button/?url='+link"><img src="../assets/pintere.png" alt="pintere" class="icon"></a>
                <a :href="'https://twitter.com/intent/tweet?original_referer='+link"><img src="../assets/twtter.png" alt="推特" class="icon"></a>
                <div class='line-it-button' style='display: none;' data-type='share-b' data-lang='zh-Hant'></div>
              </div>
           </div>
          </div>
          <div class="col-7">
            <div class="main_bar">
              <h1><span>{{commodity.title}}</span></h1>
              <div class="group">
                <div class="lik"><span>{{commodity.like.length}}</span> 人追蹤</div>
                <div class="sale"><span>{{commodity.sale}}</span> 已售出</div>
                <div class="time">上架日期：{{new Date(commodity.last_time).toLocaleDateString()}}</div>
              </div>
              <div class="price">
                <span><span>原價:</span>${{commodity.ori_price}}</span><span><span>NT</span>${{commodity.sale_price}}</span>
              </div>
              <div class="status">
                存貨狀況：<span>{{status}}</span>
              </div>
              <div class="freight">
                寄送時間：<span>{{delivery}}</span>
              </div>
              <div class="number">
                購買數量：
                <div class="number_control">
                  <button @click="number--" :disabled="number<2">-</button>
                  <input type="number" v-model="number"  @change="positive " >
                  <button  @click="number++">+</button>
                </div>
              </div>
              <div class="control_bar">
                <div class="like">
                  <a href="javascript:;" v-if="isLike" @click="like" :class="{active:isLike}" title="取消追蹤"><i class="fa fa-heart" aria-hidden="true"></i><span>取消追蹤</span> </a>
                  <a href="javascript:;" v-else  @click="like" title="追蹤商品"><i class="fa fa-heart-o" aria-hidden="true"></i><span>追蹤商品</span> </a>
                </div>
                <div class="cart">
                  <a href="javascript:;" @click="addCart" title="加入購物車"><i class="fa fa-cart-plus" aria-hidden="true" ></i> <span>加入購物車</span> </a>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="Introduction">
        <h2>商品介紹</h2>
        <hr>
        <div class="info" v-html="info">
        </div>
      </div>
    </div>
    <!-- 彈跳吐司 -->
    <div class="myToast" v-if="toastContent_like">
      <p>已追蹤該商品</p>
    </div>
    <div class="myToast" v-if="toastContent_dislike">
      <p>已取消追蹤</p>
    </div>
    <div class="myToast cart" v-if="toastContent_cart">
      <p>已將商品加入購物車<br><span v-if="!$store.state.user._id">提醒您：登入後才可保存購物車內的資料</span></p> 
    </div>
    <div class="myToast noFadeOut" v-if="toastContent_login">
      <p>登入後才可以追蹤商品喔</p>
      <div class="group">
        <router-link to="/login">前往登入</router-link>
        <a href="javascript:;" @click="toastContent_login = false">繼續保持訪客狀態</a>
      </div>
    </div>
    <myFooter />
  </div>
</template>

<script>
import myFooter from '../components/Footer'
export default {
  props:['id'],
  components:{
    myFooter
  },
  data(){
    return {
      link: window.location.href,
      number:1,
      isLike:false,
      toastContent_like:false,
      toastContent_dislike:false,
      toastContent_cart:false,
      toastContent_login:false
    }
  },
  methods:{
    positive(){
      this.number = parseInt(this.number)<0? 1 : parseInt(this.number)
    },
    like(){
      //先檢查是否有登入
      if(this.$store.state.user._id){
        this.isLike= !this.isLike;
        if(this.isLike){
          this.showToast(1)
          //先修改本地端
          this.$store.commit('addUserLike',this.commodity._id)
          //再更新資料庫
          this.$store.dispatch('a_like',{
            user:this.$store.state.user,
            commodity_id:this.commodity._id
          })
        }else{
          this.showToast(2)
          this.$store.commit('removeUserLike',this.commodity._id)
          this.$store.dispatch('a_dislike',{
            user:this.$store.state.user,
            commodity_id:this.commodity._id
          })
        }
      }else{
        this.showToast(3)
      }
    },
    showToast(e){
      if(e == 1){
        this.toastContent_like = false;
        this.toastContent_like = true;
        setTimeout(()=>{
        this.toastContent_like = false;
        },1500)
      }else if(e ==2){
        this.toastContent_dislike = false;
        this.toastContent_dislike = true;
        setTimeout(()=>{
        this.toastContent_dislike = false;
        },1500)
      }else if(e ==3){
        this.toastContent_login = false;
        this.toastContent_login = true;
      }else{
        this.toastContent_cart = false;
        this.toastContent_cart = true;
        setTimeout(()=>{
        this.toastContent_cart = false;
        },1500)
      }
    },
    addCart(){
      //先更新本地端
      this.$store.commit('addCart',{
        id:this.id,
        number:this.number,
        checked:true
      })
      localStorage.setItem('cart',JSON.stringify(this.$store.state.cart))
      //若有登入舊更新遠端
      if(this.$store.state.user._id){
        this.$store.dispatch('a_updateCart')
      }
      this.showToast(4)
    }
  },
  computed:{
    commodity(){
      return this.$store.state.commodity.find(item=>{return item._id == this.id})
    },
    classify(){
      let classify=''
     switch(this.commodity.classify){
       case -1: classify='當季特賣'; break;
        case 0:classify='幼兒繪本';break;
        case 1: classify= '兒童繪本';  break;
        case 2: classify='少年繪本'; break;
        case 3:classify='其他周邊'
      }
      return classify
    },
     classify_id(){
      let classify=''
      switch(this.commodity.classify){
        case -1: classify ='season' ; break;
        case 0: classify='elementary' ; break;
        case 1: classify='junior' ; break;
        case 2: classify='senior' ; break;
        case 3: classify='other' ; break;
      }
      return classify
    },
    status(){
      let status=''
      switch(this.commodity.status){
        case 0: status ='現貨充足' ; break;
        case 1: status='預購商品' ; break;
        case 2: status='補貨中，需等待時間較長' ; break;
      }
      return status
    },
    delivery(){
      let delivery=''
      switch(this.commodity.status){
        case 0: delivery ='2~3個工作天' ; break;
        case 1: delivery ='此為預購商品，需等待發售後2~3個工作天' ; break;
        case 2: delivery ='需一周以上' ; break;
      }
      return delivery
    },
    info(){
      return this.commodity.info.replace(/\n/g,"<br>")
    }
  },
  created(){
    if(this.$store.state.user._id){
      if(this.$store.state.user.like.some(item=>{return item ==this.commodity._id})){
        this.isLike = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_base.scss';
.detail{
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
}
.side_bar{
  padding: 12%;
  // border: 1px solid #ccc;
  .pic{
    width: 100%;
    padding-top: 110%;
    position: relative;
    overflow: hidden;
    margin-bottom: 12px;
    img{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      transition: .5s;
    }
  }
  .share{
    text-align: left;
    display:flex;
    align-items: flex-end;
    .icon{
      width: 24px;
      height: 24px;
      margin: 0 2px; 
    }
  }
}
.main_bar{
  text-align: left;
  padding: 12px;
  h1{
    font-size: 24px;
    font-weight: 700;
    margin: 12px 0;
  }
  .group{
    display: flex;
    align-items: flex-end;
    div{
      font-size: 14px;
      line-height: 1;
      padding:0 8px;
      border-right: 1px solid #ccc;
      letter-spacing: 1px;
      color: #666;
      &:last-child{
        border: none;
      }
      span{
        font-size: 16px;
        text-decoration: underline;
      }
    }
  }
  .price{
    margin: 32px 0 28px;
    >span:first-child{
      color: #666;
      font-size: 16px;
      text-decoration: line-through;
      span{
        font-size: 12px;
      }
    }
    >span:last-child{
      margin-left: .5em;
      color: $th4-color;
      font-weight: 700;
      font-size: 30px;
      font-family: $eng-font;
      span{
        font-size: 26px;
      }
    }
  }
  .status{
    font-size: 16px;
    color: #666;
    margin-bottom: 28px;
    span{
      color: #444;
      font-weight: 700;
    }
  }
  .freight{
    font-size: 16px;
    color: #666;
    margin-bottom: 28px;
    span{
      color: #444;
    }
  } 
  .number{
    display: flex;
    align-items: flex-end;
    font-size: 16px;
    margin-bottom: 36px;
    .number_control{
      display: flex;
      margin-left: 12px;;
      button{
        width: 40px;
        height: 40px;
        padding: 8px;
        border: 1px solid #ccc;
        outline: none;
        background-color: #fafafa;
        position: relative;
        z-index: 2;
      }
      input{
        width:120px;
        margin: 0 -1px;
        line-height: 36px;
        text-align: center;
        border:none;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background-color: #fafafa;
        color: #666;
        -moz-appearance: textfield;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
          margin: 0; 
        }
        &:focus{
          outline: rgb(143, 165, 184) solid 1px;
        }
      }
    }
  }
  .control_bar{
      display: flex;
      a{
        display: inline-block;
        height: 48px; 
        color: #fefefe;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        transition: .3s;
        i{
          font-size: 18px;
          margin-right: 8px;
        }

      }
      .like a{
        width: 140px;
        color:#ee4d2d;
        border: 1px solid #ee4d2d;
        background-color: #ffeeee;
        &:hover{
          background-color: #f3e0e0;
        }
      }
      .cart a{
        width: 156px;
        margin-left: 15px;
        background-color: #ee4d2d;
        border: 1px solid #ee4d2d;
        &:hover{
          background-color: #c03e24;
        }
      }
    }
}

.Introduction{
  text-align: left;
  padding:0px 36px;
  // min-height: 30vh;
  h2{
    font-size: 24px;
    font-weight: 700;
  }
  hr{
    border-top: 1px solid rgba(0,0,0,.3);
  }
  .info{
    line-height: 2;
  }
}



//彈跳吐司
.myToast{
  position: fixed;
  display: block;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%,-50%);
  background-color: #282D41;
  width: 320px;
  height: 100px;
  border-radius: 8px;
  color: #fff;
  font-size: 36px;
  line-height: 100px;
  animation: bound 1.5s;
  opacity: 0;
  &.noFadeOut{
    animation: bound2 .3s;
    opacity: 1;
    font-size: 24px;
    width: 360px;
    height: 150px;
    line-height: 1.5;
    padding:20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a{text-decoration: none;margin-left: 1em;}
    a:nth-of-type(1){
      padding: 6px 14px;
      border-radius: 4px;
      background-color: rgba(255, 96, 11, 0.897);
      font-weight: 500;
      color: #fdfdfd;
      font-size: 18px;
      transition: .3s;
      &:hover{
         background-color: rgba(207, 77, 7);
      }
    }
    a:nth-of-type(2){
      padding: 4px 12px;
      color: #ffefef;
      font-size: 14px;
      color: #ccc;
      vertical-align: bottom;
      transition: .3s;
      &:hover{
         color: #bbb;
      }
    }
  }
  &.cart{
    font-size: 18px;
    line-height: 1.5;
    padding:20px;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      margin: 0;
      padding: 0;
    }
    span{
      font-size: 14px;
      color: #dedede;
    }
  }
}
@keyframes bound {
  0%{
    opacity: 0;
  }
  25%{
    opacity: 1;
  }
  85%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
@keyframes bound2 {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>
