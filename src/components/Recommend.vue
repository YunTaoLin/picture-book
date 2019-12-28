<template>
  <div class="recommend">
    <h2>熱銷排行</h2>
    <ul>
      <li v-for="(item,index) in list" :key="item._id">
        <div class="myCard" >
          <div class="hot">No.<span>{{index+1}}</span></div>
          <div class="pic">
            <router-link :to="'/detail/'+item._id">
              <img :src="item.img" alt="商品圖片">
            </router-link>
          </div>
          <div class="title">
            <router-link :to="'/detail/'+item._id">
              {{item.title}}
             </router-link>
          </div>
          <div class="price"> 優惠價格：<span>$</span><span>{{item.sale_price}}</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{list:{type:Array}},
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.recommend{
  width: 80%; 
  h2{
    width: 50%;
    font-size: 1.2em;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 8px 4px;
    margin: 0;
    color:#Fefefe;
    background-color: #666;
  }
  ul{
    list-style: none;
    border:1px solid #ddd;
    border-top: 3px solid #666;
    padding-inline-start: 0;
    li{
      border-bottom: 1px solid #dfdfdf;
    }
  }
}

.myCard{
  width: 100%;
  padding: 38px 20px 16px;
  position: relative;
  .hot{
    position: absolute;
    top: 0;
    right: 0;
    padding: 0px 12px;
    color: #f00;
    font-family: $eng-font;
    font-size: 16px;
    font-weight: 700;
    span{
      font-size: 24px;
    }
  }
  .pic{
    width: 100%;
    padding-top: 100%;
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
  .title {
    text-align: left;
    a{
      display: inline-block;
      text-decoration: none;
      padding:8px 0px 0px;
      font-size: 16px;
      text-align: left;
      font-weight: 700;
      color: $primary-color;
    }
  }
  .price{
    // padding:0 8px;
    font-size: 13px;
    text-align: left;
    color: #888;
    span{
      color: $th4-color;
      font-size: 15px;
      font-family: $eng-font;
      font-weight: 700;
      &:last-child{
        margin-left: .2em;
        font-size: 20px;
      }
    }
  }
}

</style>