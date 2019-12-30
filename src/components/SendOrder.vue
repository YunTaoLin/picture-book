<template>
  <div class="container">
    <div class="sendOrder">
      <h2>請確認資料是否有誤</h2>
      <hr>
      <div class="order_info">
        <p><span>收件者：</span>{{data.name}}</p>
        <p><span>連絡電話：</span>{{data.tel}}</p>
        <p><span>郵寄地址：</span>{{data.address}}</p>
        <p><span>付款方式：</span>{{data.pay}}</p>
        <p><span>應付金額：</span>${{data.total}}</p>
      </div>
      <div class="btn_group">
        <a href="javascript:;" @click="toBack">取消，回上一步</a>
        <a href="javascript:;" @click="final">下訂單</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object
    }
  },
  methods:{
    toBack(){
      this.$emit('toBack')
    },
    final(){
      this.$emit('addOrder',{
        name :this.data.name,
        address:this.data.address,
        tel:this.data.tel,
        pay:this.data.pay,
        total:this.data.total,
        buy:this.$store.state.checkout.buy,
        userId:this.$store.state.user._id
      })
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.container{
  display: flex;
  justify-content: center;
}
.sendOrder{
  width: 375px;
  padding: 24px 28px;
  background-color: #fff;
  text-align: left;
  h2{
    font-weight: 700;
    font-size: 24px;
    position: relative;
  }
  .order_info{
    span{
      width: 6em;
      font-weight: 700;
      display: inline-block;
      text-align: right;
    }
  }
}
.btn_group{
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
  a{
    font-size: 14px;
    display: inline-block;
    line-height: 2.5;
    margin: 0 12px;
    border-radius: 2px;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
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
</style>