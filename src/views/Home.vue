<template>
  <div class="home">
    <Carousel :img='carouselImg'/>
    <div class="container">
    <!--start 季節精選主題 -->
      <div class="topic">
        <h2>Season Collections</h2>
        <div class="row">
          <div class="col-4" v-for="item in topicImg" :key="item">
            <img :src="item" alt="圖片">
            <router-link to="/commodity/season" class="topic_inner">
              <p>聖誕精選商品</p>
            </router-link>
          </div>
        </div>
      </div>
    <!--end 季節精選主題 -->
      <h2>Bestseller</h2>
      <a href="#">
        <CarouselSm :img="carouselImgSm" id="carousel2" />
      </a>
      <div class="row card_group">
        <router-link :to="item.link" v-for="item in card" :key="item.title">
          <div class="myCard" >
            <img :src="item.img" :alt="item">
            <p>{{item.title}}</p>
          </div>
        </router-link>
      </div>
      <!--start 特色話語 -->
      <div class="missionary">
        <h2>Always Be With You</h2>
        <img src="../assets/missionary.png" alt="海報">
      </div>
    <!--end 特色話語 -->
      <!-- <div class="delete"></div> -->
    </div>
    <MyFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel'
import CarouselSm from '@/components/Carousel_sm.vue'
import MyFooter from '@/components/Footer.vue'
import 'bootstrap'

export default {
  name: 'home',
  components: {
    Carousel,CarouselSm,MyFooter
  },
  data(){
    return {
      carouselImg:[
        'https://imgs.cwgv.com.tw/articles/81/6181/preview/6181.png',
        'https://img.udnfunlife.com/image/product/DS004830/20180920140224563.jpg?t=20180920140705',
        'https://artouch.com/userfiles/sm/sm1200675_images_EC8/799/2018113058066141.jpg',
        'https://fsv.cmoney.tw/cmstatic/notes/capture/712894/20170828152443985.jpg'
        

      ],
      topicImg:[
        'https://pic.pimg.tw/bonnie6068/1484106268-2671189120_n.jpg',
        'https://cf.shopee.tw/file/9360f98d5181bf507e5c316b0c06b81f',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-mykofAB4MBa3h-8o3lQ2bjOLdEr2dNQsFfQGq3eObeJwJhb&s'
      ],
      carouselImgSm:[
        'http://www.haveanice.com/uploads/articles/fea936b08fab0a1d15981db0791debf50fa14d9b/mrMQdP6ea8WFd4dA89SnzUs28H4ZzX.jpg',
        'https://www.smohouse.com/books/wp-content/uploads/2017/05/sinter-slide-1024x416.jpg',
        'https://www.openbook.org.tw/sites/default/files/styles/article_main_image/public/field/image/picture%20books03.jpg?itok=jRZbJn9f',
        'https://cp.cw1.tw/files/md5/4f/8d/4f8d9f9d0550d6638d39404f4c166c85-462374.jpg',
        'https://www.mocataipei.org.tw/upload/2019_07_083/20190708182202vegzex97D1.jpg'
      ],
      card:[
        {title:'0~6歲繪本',img:'https://www.ankecare.com/wp-content/uploads/2019/04/%E7%86%9F%E9%BD%A1%E7%B9%AA%E6%9C%AC-03.jpg ', link:'/commodity/elementary'},
        {title:'6~12歲繪本',img:'https://pic.pimg.tw/kadokawa592/1343729901-1190829410.jpg', link:'/commodity/junior'},
        {title:'青少年繪本',img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2kBSoesFVD7zyaEnplno-r-H-092VtI1nRbMwAnVOnVeGFRNPg&s', link:'/commodity/senior'},
        {title:'其他精選周邊',img:'https://pic.pimg.tw/zaza1021/1468912413-107059824.jpg', link:'/commodity/other'}
      ]

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss' ;
 h2{
   margin-top: 20px;
    color: $secondary-color;
    font-weight: 700;
    font-size: 24px;
    line-height: 100px;
    position: relative;
    &:after{
      content: '';
      width: 2em;
      height: 2px;
      position: absolute;
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
      background-color: $secondary-color;
    }
  }

.topic{
  &>div{
    position: relative;
    img{
      position: relative;
      z-index: 4;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    a{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 20px;
      text-align: center;
      background-color: rgba(22, 22, 22, 0.6);
      opacity: 0;
      color: #fefefe;
      transition: .8s;
      text-decoration: none;
      font-size: 24px;
      &:hover{
       opacity: 1;
      }
    }
  }
}

.missionary{  
  img{
    width: 100%;
  }
}
.card_group{
  margin: 0 -2px;
  display: flex;
  flex-wrap: wrap;
  a{
    width: calc(25% - 4px);
    margin: 12px 2px;
    @media (max-width:767px) {
      width: calc(50% - 4px);
    }
    &:hover{
      text-decoration: none;
      img{
        transform: scale(1.05)
      }
    }
    .myCard{
      width: 100%;
      height: 35vh;
      background-color: rgb(240, 235, 228);
      @media (max-width:425px) {
        height: 50vw;
      }
      img{
        width: 100%;
        height: 80%;
        box-sizing: border-box;
        padding: 8px;
        object-fit: cover;
        transition: .5s;
      }
      p{
        height: 20%;
        width: 100%;
        display:flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin-bottom: 0;
        color: $secondary-color;
        font-weight: 700;
        @media (max-width:425px) {
          font-size: 18px;
        }
      }
    }
  }
  
}






.delete{
  height: 100vh
}
</style>