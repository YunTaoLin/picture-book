<template>
  <div class="cart" >
    <header>
      <div class="flow" v-if="step != 4">
        <p :class="{active:step==1}">購物明細</p>
        <p :class="{active:step==2}">付款方式</p>
        <p :class="{active:step==3}">資料確認</p>
      </div>
    </header>
    <div class="nothing" v-if="idList.length < 1">
      <h3>空空如也，購物車內沒有任何東西！</h3>
      <img src="https://thumbs.dreamstime.com/t/%E4%BA%BA%E6%89%8B%E6%89%93%E5%BC%80%E5%9C%A8%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%E9%9A%94-%E7%9A%84%E4%B8%80%E4%B8%AA%E7%A9%BA%E7%9A%84%E9%92%B1%E5%8C%85%E4%B8%8E-94426914.jpg" alt="">
    </div>
  <!-------------- 第一步驟 ------------->
    <div class="container" v-else-if="step ==1 ">
      <div class="header">
        <div class="checkbox"><input type="checkbox" :checked="totalChecked" @change="selectAll()" ></div>
        <div>商品</div>
        <div>單價</div>
        <div>數量</div>
        <div>總計</div>
        <div>操作</div>
      </div>
      <div class="main">
        <cartItem v-for="(item,index) in idList"
         @updateChecked="item.checked = $event ; updateCart()"
         @updateNumber="item.number = $event; updateCart()"
         @remove="idList.splice(index,1);updateCart() "
         :item="item" :key="item.id"/>
      </div>
      <div class="checkout">
        <p>總金額：<span>＄{{totalPrice}}</span></p>
        <a href="javascript:'" @click="step=2">前往結帳</a>
      </div>
    </div>
<!-------------- 第二步驟 ------------->
    <cartFrom  v-if="step ==2"
    @next="next($event)"
    @toBack="step--"
    />
<!-------------- 第三步驟 -------------> 
    <sendOrder 
    :data="orderData"
    @addOrder="addOrder($event)"
    @toBack="step--"
    v-else-if="step ==3 "
    /> 
<!-------------- 第四步驟 -------------> 
    <div class="final" v-else-if="step ==4 ">
      <h1>已送出訂單</h1>
      <h3 v-if="this.$store.state.nowOrder">訂單編號：{{this.$store.state.nowOrder}}</h3>
      <h3 v-if="orderData.pay == '郵局轉帳'">轉帳帳號：123-456-789-887</h3>
      <p>提醒您：可到訂單查詢專區查看您的所有訂單</p>
    </div>
    <myFooter />
  </div>
  
</template>

<script>
import cartItem from '../components/CartItem.vue'
import myFooter from '../components/Footer.vue'
import cartFrom from '../components/CartFrom.vue'
import sendOrder from '../components/SendOrder.vue'
export default {
  components:{
    cartItem,myFooter,cartFrom,sendOrder
  },
  data(){
    return {
      idList:this.$store.state.cart,
      step:1,
      orderData:{}
    }
  },
  methods:{
    updateCart(){
      this.$store.commit('updateCartList',this.idList)
      //如果有登入，更新遠端
      this.$store.dispatch('a_updateCart')
    },
    selectAll(){
      if(this.totalChecked){
        this.idList.forEach(item => {
          item.checked=false
        });
        this.updateCart()
      }else{
        this.idList.forEach(item => {
          item.checked=true
        });
        this.updateCart()
      }
    },
    next(e){
      this.orderData = e;
      this.step=3
    },
    addOrder(e){
      this.$store.dispatch('a_addOrder',e)
      // 3.顯示畫面
      this.step=4
    }
  },
  computed:{
    totalChecked(){
      return this.idList.every(item => item.checked == true )
    },
    totalPrice(){
      let total=0
      this.idList.forEach(item=>{
        if(item.checked){
          let commodity =this.$store.state.commodity.find(one=>{return one._id == item.id})
          total += commodity.sale_price*item.number
        }
      })
      return total
    }
  },
  watch:{
    totalPrice(newData){
      this.$store.commit('updateTotalPrice',{
        totalPrice : newData,
        buy: this.idList.filter(item =>{return item.checked == true })
      })
    }
  },
  created(){
    if(!this.$store.state.user._id){
      return this.$router.push({ path: '/login' })
    }
    this.$store.commit('updateTotalPrice',{
      totalPrice : this.totalPrice,
      buy: this.idList.filter(item =>{return item.checked == true })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_base.scss';

.cart{
  margin-top: 130px;
  font-size: 14px;
  background-color: #f1f1f1;
}
//網站開頭
header{
  // background-color: #fff;
  h1{
    line-height: 3;
    font-weight: 700;
    text-align: left;
  }
}


// 表格標題
.header{
  background-color: #fff;
  display: flex;
  line-height: 55px;
  margin-bottom: 12px;
  div:nth-of-type(1){
    flex:2;
  }
  div:nth-of-type(2){
    text-align: left;
    flex:9;
  }
  div:nth-of-type(3){
    flex:3;
  }
  div:nth-of-type(4){
    flex:3;
  }
  div:nth-of-type(5){
    flex:3;
  }
  div:nth-of-type(6){
    flex:3;
  }
}
input[type="checkbox"]{
  display:inline-block;
  width:19px;
  height:19px;
  margin:-2px 0 0 0;
  vertical-align:middle;
  cursor:pointer; 
}

.flow{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-bottom: 12px;
  p{
    display: inline-block;
    width: 140px;
    line-height: 2;
    border-bottom: 3px solid #ccc;
    position: relative;
    &.active{
      border-color:$th4-color
    }
    &:nth-of-type(3){
      &:after{
        content: '☺';
        width: 24px;
        height: 24px;
        border-radius: 50%;
        position: absolute;
        right: -12px;
        bottom: -12px;
        background-color: #ccc;
        line-height: 20px;
        font-size: 24px;
        color: #fff;
        font-weight: 700;
        font-family: arial;
      }
    }
    &:before{
      width: 24px;
      height: 24px;
      border-radius: 50%;
      position: absolute;
      left: -12px;
      bottom: -12px;
      line-height: 24px;
      color: #fff;
      font-weight: 700;
      font-family: arial;
      background-color: #ccc;
    }
    &.active:before{
      background-color: $th4-color;
    }
    &:nth-of-type(1):before{
      content: '1';
    }
    &:nth-of-type(2):before{
      content: '2';
    }
    &:nth-of-type(3):before{
      content: '3';
    }
    
  }
}
.main{
  margin-bottom: 20px;
  min-height: 20vh;
}

.checkout{
  background-color: #fdfdfd;
  box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.2);
  height: 88px;
  display:flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 18px 20px;
  position: sticky;
  bottom:0;
  z-index: 888;
  a{
    display: inline-block;
    width: 180px;
    height: 40px;
    background-color: #ee4d2d;
    line-height: 40px;
    color: #efefef;
    text-decoration: none;
    border-radius: 3px;
    font-size: 14px;
    font-family: $tw-font;
    font-size: 15px;
    letter-spacing: 2px;
  }
  p{
    margin: 0 20px;
    font-size: 16px;
    span{
      font-size: 28px;
      font-weight: 700;
      color: #ee4d2d;
    }
  }
}

.nothing{
  h3{
    font-weight: 700;
    margin: 20px 0;
  }
  img{
    width: 20%;
    object-fit: cover;
  }
}


.final{
  height: 50vh;
  padding-top: 10vh;
  p{
    font-size:18px;
    margin-top: 32px;
  }

}






</style>
