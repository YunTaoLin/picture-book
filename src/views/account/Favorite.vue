<template>
  <div class="favorite">
    <Sidebar theTitle="我的收藏">
      <h1>我的收藏</h1>
      <ul v-if="favoriteList.length >0 ">
        <li v-for="item in favoriteList" :key="item._id">
          <div class="item">
            <div class="pic mr-3">
              <img :src="item.img" alt="商品圖片">
            </div>
            <div class="info">
              <div class="title">{{item.title}}</div>
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
              <a href="javascript:;" class="cart">加入購物車</a>
            </div>
          </div>
        </li>
      </ul>
      <div class="nothing" v-else >
        <h3>空空如也，沒有任何收藏喔！</h3>
        <img src="https://i.loli.net/2019/07/29/5d3e11fb330b293931.png" alt="">
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
      like:this.$store.state.user.like,
      commodity:this.$store.state.commodity,
      favoriteList:[]
    }
  },
  methods:{
    async dislike(id){
     this.$store.commit('removeUserLike',id)
        this.$store.dispatch('a_dislike',{
          user:this.$store.state.user,
          commodity_id:id
      })
      this.favoriteList = this.favoriteList.filter(item=>{
        return item._id != id
      })
    },
    getList(){
      let list=[]
      this.like.forEach(id => {
        this.commodity.forEach(commodity=>{
          if(commodity._id == id){
            list.unshift(commodity)
          }
        })
      });
      this.favoriteList = list
    }
  },
  beforeMount(){
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_base.scss';
.favorite{
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
        color: #000;
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
</style>