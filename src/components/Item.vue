<template>
   <div class="myCard">
      <div class="pic">
        <router-link :to="'/detail/'+commodity._id">
          <img :src="commodity.img" alt="商品圖片">
        </router-link>
      </div>
      <div class="classify">
        {{classify(commodity.classify)}}
      </div>
      <div class="title mb-2">
        <router-link :to="'/detail/'+commodity._id">
        {{commodity.title}}
        </router-link>
      </div>
      <div class="group">
        <div class="price">
          <div class="ori_pricee">
            原價：$ <span>{{commodity.ori_price}}</span>
          </div>
          <div class="sale_price">
            NT$ <span>{{commodity.sale_price}}</span>
          </div>
        </div>
        <div class="control_bar">
          <div class="like">
            <a href="javascript:;" v-if="isLike" @click="like" :class="{active:isLike}" title="取消追蹤"><i class="fa fa-heart" aria-hidden="true"></i></a>
            <a href="javascript:;" v-else @click="like" title="追蹤商品"><i class="fa fa-heart-o" aria-hidden="true"></i></a>
          </div>
          <div class="cart">
            <a href="javascript:;" @click="addCart"  :class="{active:isCart}" title="加入購物車" ><i class="fa fa-cart-plus" aria-hidden="true" ></i></a>
          </div>
        </div>
      </div>
     </div>
</template>

<script>
export default {
  props:{
    commodity:{
      type:Object
    }
  },
  data(){
    return {
      isLike:false,
      isCart:false
    }
  },
  methods:{
    like(){
      //先檢查是否有登入
      if(this.$store.state.user._id){
        this.isLike= !this.isLike;
        if(this.isLike){
          this.$emit('like','1')
          //先修改本地端
          this.$store.commit('addUserLike',this.commodity._id)
          //再更新資料庫
          this.$store.dispatch('a_like',{
            user:this.$store.state.user,
            commodity_id:this.commodity._id
          })
        }else{
          this.$emit('like','2')
          this.$store.commit('removeUserLike',this.commodity._id)
          this.$store.dispatch('a_dislike',{
            user:this.$store.state.user,
            commodity_id:this.commodity._id
          })
        }
      }else{
        this.$emit('like','3')
      }
      
    },
    classify(type){
      let classify
      switch(type){
        case -1:
          classify='當季特賣'
          break;
        case 0:
          classify='幼兒繪本'
          break;
        case 1:
          classify= '兒童繪本'
          break;
        case 2:
          classify='少年繪本'
          break;
        case 3:
          classify='其他周邊'
      }
      return classify
    },
    addCart(){
      //先更新本地端
      console.log('addcart')
      this.$store.commit('addCart',{
        id:this.commodity._id,
        number:1,
        checked:true
      })
      localStorage.setItem('cart',JSON.stringify(this.$store.state.cart))
      //若有登入舊更新遠端
      if(this.$store.state.user._id){
        this.$store.dispatch('a_updateCart')
      }
      this.$emit('like','4')
      this.isCart=true;
    }
  },
  created(){
    if(this.$store.state.user._id){
      if(this.$store.state.user.like.some(item=>{return item ==this.commodity._id})){
        this.isLike = true;
      }
    }
    if(this.$store.state.cart.some(item=>{return item.id ==this.commodity._id})){
        this.isCart = true;
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_base.scss';
.myCard{
  width: 100%;
  padding: 12px 20px 8px;
  margin-bottom: 8px;
  position: relative;
  border: 1px solid #dfdfdf;
  .pic{
    width: 100%;
    padding-top: 110%;
    position: relative;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      transition: .5s;
      &:hover{
        transform: scale(1.1);
      }
    }
  }
  .classify{
    border-bottom: 1px dotted #c8cbcc;
    line-height: 2;
  }
  .title{
    text-align: left;
    a{
      padding:8px 0px 0px;
      font-size: 15px;
      display:inline-block;
      color: $primary-color;
      font-weight: 700;
      height: 3em;
      left: 1.2em;
      text-decoration: none;

    }
  }
  .group{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .price{
      display: flex;
      flex-direction: column;
      font-family: $eng-font;
      .ori_pricee{
        text-align: left;
        font-size: 12px;
        color: #888;
        text-decoration: line-through;
      }
      .sale_price {
        color: #C54629;
        font-weight: 700;
        font-size: 16px;
        text-align: left;
      }
    }
  }
}
.control_bar{
  line-height: 26px;
  margin-bottom: 2px;
  width: 8em;
  display: flex;
  align-items: flex-end;
  .like a,.cart a{
    display: inline-block;
    line-height: 26px;
    height: 26px;
    width: 100%;
    background-color: #aaa;
    color: #fff !important;
    border-radius: 4px;
    transition: .3s;
    &:hover{
       background-color: #666;
    }
    &.active{
      background-color: #d45744;
      &:hover{
       background-color: #c5321d;
      }
    }
  }
  .like{
    flex: 2;
  }
  .cart{
    flex: 3;
    margin-left: 4px;
    height: 26px;
    a i{
      font-size: 16px;
      height: 26px;
      line-height: 26px;
    }
  }
  
}
</style>