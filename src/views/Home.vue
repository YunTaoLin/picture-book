<template>
  <div class="home">
    <carousel :img='carouselImg'/>
    <div class="container">
    <!--start 季節精選主題 -->
      <div class="topic">
        <h2>Season Collections</h2>
        <div class="row">
          <div class="col-4" v-for="item in topicImg" :key="item">
            <img :src="item" alt="圖片">
            <a href="#" class="topic_inner">
              <p>聖誕精選商品</p>
            </a>
          </div>
        </div>
      </div>
    <!--end 季節精選主題 -->
    <!--start 特色話語 -->
      <div class="missionary">
        <h2>Always Be With You</h2>
        <img src="../assets/missionary.png" alt="海報">
      </div>
    <!--end 特色話語 -->
      <div class="delete"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import carousel from '@/components/Carousel'
import 'bootstrap'

export default {
  name: 'home',
  components: {
    carousel
  },
  data(){
    return {
      carouselImg:[
        'https://www.openbook.org.tw/sites/default/files/styles/article_main_image/public/field/image/ju_ren_de_shi_jian_.jpg?itok=MDOjeN9o',
        'https://imgs.cwgv.com.tw/articles/81/6181/preview/6181.png',
        'https://www.openbook.org.tw/sites/default/files/styles/article_main_image/public/field/image/anton3.jpg?itok=eFC0UKcI'
      ],
      topicImg:[
        'https://pic.pimg.tw/bonnie6068/1484106268-2671189120_n.jpg',
        'https://cf.shopee.tw/file/9360f98d5181bf507e5c316b0c06b81f',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-mykofAB4MBa3h-8o3lQ2bjOLdEr2dNQsFfQGq3eObeJwJhb&s'
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
      width: 8em;
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





.delete{
  height: 100vh
}
</style>