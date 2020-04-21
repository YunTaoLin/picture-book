<template>
  <div class="order">
    <Sidebar theTitle="我的訂單">
      <h1>我的訂單</h1>
      <ul v-if="orderList.length">
        <li v-for="item in orderList" :key="item._id">
          <div class="item">
            <ul>
              <li>訂單編號：{{item._id}}</li>
              <li>收件者：{{item.name}}</li>
              <li>連絡電話：{{item.tel}}</li>
              <li>寄送地址：{{item.address}}</li>
              <li>應付金額：${{item.total}}</li>
              <li>付款方式：{{item.pay}}</li>
              <li v-if="item.pay == '郵局轉帳'">轉帳帳號：123-456-789-887</li>
              <li>訂單日期：{{new Date(item.create_time).toLocaleString()}}</li>
              <li class="status">訂單狀態：{{showStatus(item.status)}}</li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="nothing" v-else >
        <h3>沒有任何訂單喔！快去結帳！</h3>
        <img src="https://memeprod.s3.ap-northeast-1.amazonaws.com/user-wtf/1573047906706.jpg" alt="">
      </div>
    </Sidebar>
    <myFooter />
  </div>
</template>

<script>
import myFooter from '@/components/Footer'
import Sidebar from '@/components/Sidebar.vue'



export default {
   components:{
    myFooter,Sidebar
  },
  data(){
    return {
      orderList:this.$store.state.orderObjList
    }
  },
  methods:{
    //訂單狀態顯示
    showStatus(status){
      var res = ''
      switch (status){
            case 0 : 
              res = '訂單處理中'
              break;
            case 1 :
              res = '商品已送出'
              break;
            case 2 :
              res = '訂單已完成' 
          }
          return res;
      }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_base.scss';
.order{
  margin-top: 150px;
  font-size: 14px;
  .container{
    min-height: 50vh;
  }
  h1{
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    color: $primary-color;
    position: relative;
    &:before{
      content: '';
      position: absolute;
      left:-12px;
      top: 3px;
      width: 4px;
      height: 1em;
      background: $primary-color;
    }
  }
  ul{
    margin-top: 20px;
    list-style: none;
    padding-inline-start: 0;
    
  }
}
//item 樣式
.item{
  width:100%;
  background: #fdfdfd;
  border:1px solid #dedede;
  padding: 10px;
  box-shadow: 0 1px 2px rgba(71,73,72,0.2);
  margin-bottom: 10px;
  display: flex;
  ul{
    text-align: left;
    margin:0;
  }
  .status{
    color: rgb(206, 62, 10);
    font-weight: 700;
  }
  

}

.nothing{
  h3{
  font-weight: 700;
    margin: 20px 0;
  }
  img{
    width: 40%;
    object-fit: cover;
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