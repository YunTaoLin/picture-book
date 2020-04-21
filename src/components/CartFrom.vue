<template>
  <div class="container">
    <div class="cartFrom">
      <!-- 訂單商品 -->
      <div class="commodity">
        <div class="header">
          <div>訂單商品</div>
          <div>單價</div>
          <div>數量</div>
          <div>總計</div>
        </div>
        <div class="item" v-for="item in itemList" :key="item.obj._id">
          <div class="item_inner">
            <div class="pic">
              <img :src="item.obj.img" alt="">
            </div>
            <div class="title">{{item.obj.title}}</div>
          </div>
          <div>${{item.obj.sale_price}}</div>
          <div>{{item.number}}</div>
          <div>${{item.obj.sale_price * item.number}}</div>
        </div>
      </div>
      <!-- 寄送地點 -->
      <div class="send">
        <div class="header">
          <div>寄送資料
            <label >
              <input type="checkbox" @change="toMember">
              同會員資料
            </label>
          </div>
        </div>
        <form>
          <label >
            <span>收件人：</span>
            <input type="text" v-model.trim="name">
          </label>
          <label >
            <span>寄送地址：</span>
            <input type="text" v-model.trim="address"> 
          </label>
          <label >  
            <span>連絡電話：</span>
            <input type="tel" v-model.trim="tel">
          </label>
        </form>
      </div>
      <!-- 第三步驟 -->
      <div class="pay">
        <div class="header">
          <div>付款方式</div>
        </div>
        <form>
          <label >
            <input type="radio" v-model="pay" value="貨到付款">
            <span>貨到付款</span>
          </label>
          <label >
            <input type="radio" v-model="pay" value="郵局轉帳">
            <span>郵局轉帳</span> 
          </label>
          <label >  
            <input type="radio" v-model="pay" value="順豐到付">
            <span>順豐到付<span>（陸港澳）</span></span>
          </label>
        </form>
        <div class="total">
          <p>商品總金額：<span>${{totalPrice}}</span></p>
          <p v-if="pay =='順豐到付' ">海外宅配郵資計算重量：<span>{{overseaWeight}}公克</span></p>
          <p>運費總金額：<span>${{freight}}</span></p>
          <p>本次訂單金額：<span>${{freight+totalPrice}}</span></p>
        </div>
      </div>
      <div class="btn_group">
          <a href="javascript:;" @click="toBack">取消，回上一步</a>
          <a href="javascript:;" @click="next">確認資料</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name:'',
      address:'',
      tel:'',
      pay:'貨到付款',
      totalPrice: this.$store.state.checkout.totalPrice
    }
  },
  computed:{
    itemList(){
      let itemList=[]
      this.$store.state.checkout.buy.forEach(item=>{
        let obj  =this.$store.state.commodity.find(commodity=>{return commodity._id == item.id})
        itemList.push({
          number:item.number,
          obj:obj
        })
      })
      return itemList
    },
    overseaWeight(){
      let weight= 0;
      if(this.pay == '順豐到付'){
        this.itemList.forEach(item=>{
          if(item.obj.classify == '3'){
            weight+=1000*item.number
          }else{
            weight+=475*item.number
          }
        })
      }
      return weight
    },
    freight(){
       if(this.pay == '順豐到付'){
         if(this.overseaWeight/1000 < 1){
           return 120
         }
        return 120+Math.floor(this.overseaWeight/1000-1)*50
      }else{
        return this.$store.state.config.freight
      }
    }
  },
  methods:{
    toMember(){
      if(this.$store.state.user._id){
        this.name =this.$store.state.user.lastname+this.$store.state.user.firstname
        this.address=this.$store.state.user.address
        this.tel=this.$store.state.user.tel
      }
    },
    toBack(){
      this.$emit('toBack')
    },
    next(){
      if(this.name ==''){
        return alert('請輸入收件人姓名')
      }else if(this.address == ''){
        return alert('請輸入寄送地址')
      }else if(this.tel == ''){
        return alert('請輸入連絡電話')
      }else{
        this.$emit('next',{
          name:this.name,
          address:this.address,
          tel:this.tel,
          pay:this.pay,
          total:this.freight+this.totalPrice
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.cartFrom{
  .commodity{
    margin-bottom: 12px;
    background-color: #fff;
  }
  .send{
    margin-bottom: 12px;
    background-color: #fff;
    form{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 8px 20px;
      line-height: 2;
      label span{
        display: inline-block;
        width: 6em;
        text-align: right;
        font-weight: 700;
        color: $primary-color;
      }
      input{
        width: 360px;
        line-height: 1.5;
        border-radius: 2px;
        border:1px solid #aaa;
      }
    }
  }
  .pay{
    margin-bottom: 12px;
    background-color: #fff;
    form{
      display: flex;
      align-items: flex-start;
      padding: 8px 20px;
      line-height: 2;
      border-bottom: 1px dotted #ccc; 
      margin-bottom: 12px;
      input{
        visibility: hidden;
      }
      input~ span{
        display: inline-block;
        width: auto;
        padding: 3px 12px;
        text-align: right;
        font-weight: 700;
        color: $primary-color;
        cursor: pointer;
        border: 1px solid #ccc;
        position: relative;
        &>span{
          font-size: 12px;
          color: #666;  
        }
      }
      input:checked~ span{
        border: 1px solid $th4-color;
        background-color: #f6f6f6;
        &:after{
          content: '';
          border-bottom: 20px solid $th4-color;
          border-left: 24px solid transparent;
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 55;
        }
        &:before{
          content: ' ✓ ';
          font-size: 12px;
          line-height: 13px;
          position: absolute;
          color: #fff;
          right: 0;
          bottom: 0;
          z-index: 56;
        }
      }
    }
  }
  .total{
    p{
      text-align: right;
      font-size: 16px;
      span{
        display: inline-block;
        width: 120px;
        color: #888;
        padding-right: 28px;
        font-weight: 700;
      }
    }
    p:last-child{
      text-align: right;
      background-color: $primary-color;
      color: #fff;
      line-height: 3;
      font-size: 18px;
      margin: 0;
      span{
        display: inline-block;
        width: 120px;
        color: #fff;
        padding-right: 28px;
      }
    }
  }
}

.btn_group{
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  a{
    font-size: 17px;
    display: inline-block;
    line-height: 2.5;
    margin: 0 12px;
    border-radius: 2px;
    font-weight: 700;
    text-decoration: none;
    &:first-child{
      border: 1px solid #aaa;
      width: 10em;
      color: #888;
      background: #dedede48;
    }
    &:last-child{
      border: 1px solid rgb(238, 77, 45);;
      background: rgb(238, 77, 45);;
      width: 12em;
      color: #fff;
    }
  }
}
.header{
  background-color: #fff;
  display: flex;
  line-height: 28px;
  color:#888;
  padding: 12px 20px;
  border-bottom: 1px dotted #dfdfdf;
  div:nth-of-type(1){
    text-align: left;
    flex:10;
    font-size: 18px;
    color: #333;
    font-weight: 700;
  }
  div:nth-of-type(2){
    flex:3;
  }
  div:nth-of-type(3){
    flex:3;
  }
  div:nth-of-type(4){
    flex:3;
  }
  label{
    margin-left: 12px;
    font-size: 14px;
    color: #333;
    font-weight: 700;
  }
}

.item{
  // background-color: #fff;
  display: flex;
  line-height: 28px;
  color:#888;
  padding :20px;
  border-bottom: 1px dotted #dfdfdf;
  >div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  >div:nth-of-type(1){
    text-align: left;
    flex:10;
    font-size: 18px;
    color: #333;
    font-weight: 700;
  }
  >div:nth-of-type(2){
    flex:3;
  }
  >div:nth-of-type(3){
    flex:3;
  }
  >div:nth-of-type(4){
    flex:3;
  }
}
.item_inner{
  display: flex;
  justify-content: center;
  align-items: center;
  .pic{
    width: 52px;
    padding-top: 52px;
    position: relative;
    overflow: hidden;
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .title{
    padding-left: 1em;
    margin-right: auto;
    font-size: 14px;
    color: #333;
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


</style>