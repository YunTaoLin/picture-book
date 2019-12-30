<template>
  <div class="wrapper">
    <div class="banner">
      <img :src="banner" alt="">
      <div class="title">
        <p>{{title}}</p>
      </div>
    </div>
    <div class="filter_bar">
      <div class="sort">
          排序方式：
        <select v-model="sort" @change="sortList(sort)">
          <option value="1">依上架時間（ 由新到舊 ）</option>
          <option value="2">由舊到新排列</option>
          <option value="3">價格高到低排列</option>
          <option value="4">價格低到高排列</option>
        </select>
      </div>
      <div class="showHowMany">
        搜尋商品數量：
        <span>{{list.length}}</span>筆
      </div>
    </div>
    <div class="list">
      <div class="row">
        <div class="col-4" v-for="item in list" :key="item._id">
          <item @like="showToast($event)" :commodity="item"/>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
import item from '../components/Item'
export default {
  props:{
    banner:{
      type:String
    },
    title:{
      type:String
    }
  },
  components:{
    item
  },
  data(){
    return {
       list:[],
       sort:1,
       toastContent_like:false,
       toastContent_dislike:false,
       toastContent_cart:false,
       toastContent_login:false
    }
  },
  methods:{
    sortList(sort){
      switch(sort){
        case '1':
          this.list.sort((a,b)=>{
            return a.create_time < b.create_time? 1:-1
          })
          break;
        case '2':
           this.list.sort((a,b)=>{
            return a.create_time > b.create_time? 1:-1
          })
          break;
        case '3':
           this.list.sort((a,b)=>{
            return a.sale_price < b.sale_price? 1:-1
          })
          break;
        case '4':
            this.list.sort((a,b)=>{
            return a.sale_price > b.sale_price? 1:-1
          })
      }
    },
    showToast(e){
      console.log(e)
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
    }
  },
  created(){
    if(this.$route.name =='total'){
      this.list =  this.$store.state.commodity
    }else{
      this.list = this.$store.getters[this.$route.name]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.wrapper{
  width: 100%;
  font-family: $tw-font;
  .row{
    margin: -8px;
  }
  .col-4{
    padding:8px;
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
  .title{
    width: 10em;
    font-size: 28px;
    background-color: rgba(63, 68, 109, 0.98);
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 13%;
    left:-.8em;
    font-weight: 500;
    font-family: $tw-font; 
    letter-spacing: 6px;
    &:after{
      content:'';
      border-right: .8em solid rgb(22, 23, 75);
      border-top: .25em solid transparent;
      // border-bottom: 1em solid #00f;
      position: absolute;
      top: -.25em;
      left: 0;
    }
    p{
      color: #fff;
      line-height: 2.5em;
      margin: 0;  
      
    }
  }
}
.filter_bar{
  padding: 20px 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .sort,.showHowMany{
    line-height: 34px;
    font-size: 15px;
    font-family: $tw-font;
    color: #333;
    letter-spacing: 1px;
    select{
      padding: 4px 8px;
      color: #333;
    }
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