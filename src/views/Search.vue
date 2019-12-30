<template>
  <div class="search ">
    <div class="container wow fadeIn">
      <div class="result">
        <p>搜尋：{{context}}</p>
        <p>找到 {{itemList.length}} 筆搜尋結果</p>
      </div>
        <ul v-if="itemList.length >0 ">
          <li v-for="item in itemList" :key="item._id">
            <div class="item">
                <div class="pic mr-3">
                  <router-link :to="'/detail/'+item._id">
                  <img :src="item.img" alt="商品圖片">
                  </router-link>
                </div>

              <div class="info">
                <div class="title">
                  <router-link :to="'/detail/'+item._id">{{item.title}}</router-link>
                </div>
                <div class="price">
                  <div class="ori_pricee">
                    原價：$ <span>{{item.ori_price}}</span>
                  </div>
                  <div class="sale_price">
                    NT$ <span>{{item.sale_price}}</span>
                  </div>
                </div>
              </div>
              <div class="control_bar">
                <a href="javascript:;" class="delete" @click="dislike(item._id)"><i class="fa fa-times" aria-hidden="true"></i></a>
                <a href="javascript:;" class="cart" @click="addCart(item._id)">加入購物車</a>
              </div>
            </div>
          </li>
        </ul>
        <div class="nothing" v-else >
          <h3>空空如也，沒有任何收藏喔！</h3>
          <img src="https://i.loli.net/2019/07/29/5d3e11fb330b293931.png" alt="">
        </div>
          <div class="myToast cart" v-if="toastContent_cart">
          <p>已將商品加入購物車</p> 
        </div>
    </div>
    <MyFooter />
  </div>

</template>

<script>
import MyFooter from '@/components/Footer.vue'
export default {
  props:['context'],
  components: {
    MyFooter
  },
  data(){
    return {
      toastContent_cart: false
    }
  },
  methods:{
    addCart(id){
      //先更新本地端
      this.$store.commit('addCart',{
        id:id,
        number:1,
        checked:true
      })
      localStorage.setItem('cart',JSON.stringify(this.$store.state.cart))
      //若有登入舊更新遠端
      if(this.$store.state.user._id){
        this.$store.dispatch('a_updateCart')
      }
      this.toastContent_cart = false;
      this.toastContent_cart = true;
      setTimeout(()=>{
        this.toastContent_cart = false;
      },1500)
    }
  },
  computed:{
    itemList(){
      return this.$store.state.commodity.filter(item=>{
        return item.title.indexOf(this.context) != -1
      })
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.search{
  margin-top: 200px;
  font-family: $tw-font;
  .container{
    min-height: 50vh;
  }
  .result{
    display: flex;
    justify-content: space-between;
  }
  ul{
    list-style: none;
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
      // cursor: pointer;
      .pic{
        width: 17%;
        padding-top: 17%;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
        }
      }
      .title{
        font-size: 15px;
        font-weight: 500;
        a{
          text-decoration: none;
          color: #000;
        }
      }
      .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        font-family: $eng-font;
        .ori_pricee{
          text-align: left;
          font-size: 12px;
          color: #888;
          text-decoration: line-through;
        }
        .sale_price {
          color: red;
          font-weight: 700;
          font-size: 16px;
          text-align: left;
        }
      }
      .control_bar{
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        .delete{
          color:#999;
          font-size: 20px;
          padding: 2px 4px;
          transform: translate(2px,-8px)
        }
        .cart{
          background-color: rgb(216, 60, 32);
          color: #fff;
          padding: 8px 24px;
          text-decoration: none;
          transition: .3s;
          &:hover{
            background-color: rgb(170, 45, 22);
          }
        }
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