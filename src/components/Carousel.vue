<template>
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="img[0]" class="d-block w-100" alt="輪播圖片">
          <div class="inner-text">
            <h3>聖誕年度好禮選購</h3>
            <h2>滿千送書套</h2>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="img[1]" class="d-block w-100" alt="輪播圖片">
          <div class="inner-text">
            <h3>歡慶15周年慶全館</h3>
            <h2><span>85</span> 折起</h2>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="img[2]" class="d-block w-100" alt="輪播圖片">
          <div class="inner-text">
            <h3>學齡前兒童繪本</h3>
            <h2><span>75</span> 折起</h2>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="img[3]" class="d-block w-100" alt="輪播圖片">
          <div class="inner-text">
            <h3>眾多精選商品</h3>
            <h2>全新上架</h2>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    img:{
      type:Array
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss' ;
// banner
.carousel-item{
  height: 105vh ;
  position: relative;
  @media (max-width:1023px) {
    height: 60vh;
  }
  @media (max-width:767px) {
    height: 40vh;
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
      width: auto;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      letter-spacing: 8px;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 3;
      font-family: $tw-font;
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
 
</style>