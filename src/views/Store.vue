<template>
  <div class="store">
    <div class="container  wow fadeIn">
      <h1><i class="fa fa-map-marker" aria-hidden="true"></i> 門市資訊</h1>
      <hr>
      <div class="store_item" v-for="item in store" :key="item.title">
        <h2>{{item.title}}</h2>
        <p v-html="item.info"></p>
       <div class="pic">
          <img :src="item.img" alt="假圖">
       </div>
      </div>
    </div>
    <myFooter />
  </div>
</template>

<script>
import myFooter from '../components/Footer'
export default {
  components:{
    myFooter
  },
  data(){
    return{
      store:[
        {title:'台北 - 信義門市',img:'https://images.squarespace-cdn.com/content/v1/5945650ebf629ab97deea141/1501005586803-OIPFRSN30U9VDK43QMDX/ke17ZwdGBToddI8pDm48kFmfxoboNKufWj-55Bgmc-J7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iXS6XmVv7bUJ418E8Yoc1hjuviiiZmrL38w1ymUdqq4JaGeFUxjM-HeS7Oc-SSFcg/image-asset.jpeg',
        info:
        `OPEN / 週一 ～ 週四 | 11:00 - 23:00 <br>
        週五 ～ 週六 | 11:00 - 23:30<br>
        週日 | 11:00 - 23:00 <br> 
        ADD / 110台北市信義區信義路五段0號<br>
        電話 / (02)2025-1234<br>
        Credit card service / 提供刷卡服務`},
        {title:'台中 - 中港新光門市',img:'https://i.pinimg.com/originals/e5/2b/f0/e52bf016752354a1491a09e4bcaf856d.jpg',
        info:
        `OPEN / 週一 ～ 週四 | 11:00 - 23:00 <br>
        週五 ～ 週六 | 11:00 - 23:30<br>
        週日 | 11:00 - 23:00 <br> 
        ADD / 407台中市西屯區台灣大道三段301號<br>
        電話 / (04)881-4567<br>
        Credit card service / 提供刷卡服務`},
        {title:'高雄 - 漢神巨蛋門市',img:'https://dluxeinternacional.com/wp-content/uploads/2017/02/full-color-kids-library-interior-design.jpg',
        info:
        `OPEN / 週一 ～ 週四 | 11:00 - 23:00 <br>
        週五 ～ 週六 | 11:00 - 23:30<br>
        週日 | 11:00 - 23:00 <br> 
        ADD / 813高雄市左營區博愛二路777號<br>
        電話 / (07)520-7788<br>
        Credit card service / 提供刷卡服務`}

      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.store{
  margin-top: 200px;
  h1{
    text-align:left;
    font-size: 26px;
    font-weight: 700;
  }
}
.store_item{
  text-align: left;
  margin: 5vh 0 10vh;
  h2{
    color: #000;
    font-weight: 700;
    font-size: 22px;
  }
  p{
    font-size: 14px;
    margin: 0;
    line-height: 2;
  }
  .pic{
    margin-top: 20px;
    width: 100%;
    padding-top: 45%;
    position: relative;
    img{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>