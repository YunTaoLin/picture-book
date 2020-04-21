<template>
    <div :id="id" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li :data-target="'#'+id"  :data-slide-to="index" :class="{active: index==0}" v-for="(item,index) in img" :key="item"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item" :class="{active: index==0}" v-for="(item,index) in img" :key="item">
          <img :src="item" class="d-block w-100" alt="輪播圖片">
          <div class="inner-text">
            <div class="text1">
              <p>熱銷商品</p>
            </div>
            <div class="text2">
              <p>方方繪本精選<br>年度排行榜熱銷商品</p>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" :href="'#'+id" role="button" data-slide="prev">
        <div class="btn-box">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </div>
      </a>
      <a class="carousel-control-next" :href="'#'+id"  role="button" data-slide="next">
        <div class="btn-box">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </div>
      </a>
    </div>
</template>

<script>
export default {
  props:{
    img:{
      type:Array
    },
    id:{
      type:String
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss' ;
// banner
.carousel-item{
  height: 55vh ;
  position: relative;
  @media (max-width:1023px) {
    height:400px;
  }
  @media (max-width:767px) {
    height: 350px;
  }
  @media (max-width:575px) {
    height: 280px;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    
  }
  &:after{
      content: '';
      background:rgba(0, 0, 0, 0.568);
      opacity: 0.5;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .inner-text{
      width: 27%;
      height: 90%;
      text-align: left;
      position: absolute;
      top: 0;
      right: 5%;
      z-index: 1;
      font-family: $tw-font;
      @media (max-width:575px) {
        width: 32%;
        height: 80%;
      }
      @media (max-width:425px) {
        width: 40%;
        height: 80%;
      }
      .text1{
        width: 100%;
        height: 40%;
        // background: url('http://picn64.huitu.com/pic/20140715/20140715131454681900_0.jpg');
        background-color: #C9A491;
        display:flex;
        justify-content: center;
        align-items: center;
       
        p{
          font-size: 48px;
          font-weight: 700;
          color: #fff;
          @media (max-width:991px) {
            font-size: 28px;
          }
          @media (max-width:765px) {
            font-size: 20px;
          }
          
        }
      }
      .text2{
        width: 100%;
        height: 60%;
        background-color: #fff;
        display:flex;
        justify-content: center;
        align-items: center;
        p{
          font-size: 24px;
          font-weight: 700;
          color: #756566;
          @media (max-width:991px) {
            font-size: 18px;
          }
          @media (max-width:765px) {
            font-size: 14px;
          }
          @media (max-width:375px) {
            font-size: 12px;
          }
          
          
        }
      }
      h3{
        color:#eee;
        font-size: 68px;
        line-height: 68px;
        font-weight: 700;
        @media (max-width:1200px) {
          font-size: 52px;
          line-height: 52px;
        }
        @media (max-width:991px) {
          font-size: 40px;
          line-height: 40px;
        }
        @media (max-width:767px) {
          font-size: 32px;
          line-height: 32px;
        }
        @media (max-width:425px) {
          font-size: 24px;
          line-height: 24px;
        }
      }
      h2{
        color:#eee;
        font-size: 80px;
        line-height: 120px;
        font-weight: 700;
        margin-top: 10%;
        @media (max-width:1200px) {
          font-size: 52px;
          line-height: 52px;
        }
        @media (max-width:991px) {
          font-size: 40px;
          line-height: 40px;
        }
        @media (max-width:767px) {
          font-size: 32px;
          line-height: 32px;
        }
        @media (max-width:425px) {
          font-size: 24px;
          line-height: 24px;
        }
        span{
          font-family: serif;
          font-size: 160px;
        }
      }
      .inner-btn{
        display: inline-block;
        padding: 12px 24px;
        border: 1px solid #fefefe;
        border-radius: 1em;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.2);
        margin: 20px 0;
        letter-spacing: 4px;
        transition: .3s;
        &:hover{
          text-decoration: none;
          // color: #111;
          background-color: rgba(161, 92, 92, 0.3);
        }
        @media (max-width:991px) {
          font-size: 14px;
          padding: 8px 20px;
          margin: 12px 0 20px;
        }
      }
      
    }
}
.carousel-indicators{
  li{
    height: 12px;
    width: 12px;
    border-radius: 50%;
    margin: 8px;
    &.active{
      background-color: $special-color;
      }
    }
}
.btn-box{
  border: 2px solid #aaa;
  background-color: #aaa;
  padding: 0px;
  border-radius: 100%;
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width:767px) {
    padding: 10px;
    height: 40px;
    width: 40px;
  }
}
.carousel-control-prev,
.carousel-control-next{
  transition: .8s;
  opacity: 0;
  &:hover{
    opacity: 1;
  }
}

</style>