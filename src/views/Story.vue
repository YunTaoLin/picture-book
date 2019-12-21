<template>
  <div class="story wow fadeIn">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-12">
          <h2>我們的故事</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis earum molestias veniam, suscipit itaque omnis ea rerum, quasi enim reiciendis, praesentium adipisci unde. Cupiditate officiis porro vero rem, hic voluptatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim asperiores velit aliquid vitae quibusdam.</p>
        </div>
        <div class="col-sm-6 col-12">
          <img src="https://www.smohouse.com/books/wp-content/uploads/2017/05/sinter-slide-1024x416.jpg" alt="介紹圖片">
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="specialBackground">
          <img src="../assets/send.png" alt="">
        </div>
      <div class="container">
          <div class="row">
            <div class="col-sm-6 col-12">
            <div class="pic">
              <img src="../assets/fang - 複製.png" alt="介紹圖片">
            </div>
            <p class="founder_name"> <span>方方繪本創辦人</span> - 方柏翰 先生</p>
            </div>
            <div class="col-sm-6 col-12">
              <p class="founder_info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis earum molestias veniam, suscipit itaque omnis ea rerum, quasi enim reiciendis, praesentium adipisci unde. Cupiditate officiis porro vero rem, hic voluptatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim asperiores velit aliquid vitae quibusdam, nihil eos eveniet architecto nulla cum min.</p>
            </div>
          </div>
          <div class="col-12 mt-5">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, a! Earum ipsa eaque officiis beatae quae. Impedit nam alias dolor debitis, asperiores magnam dignissimos beatae veritatis accusamus neque, eius voluptatibus?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, a! Earum ipsa eaque officiis beatae quae. Impedit nam alias dolor debitis, asperiores magnam dignissimos beatae veritatis accusamus neque, eius voluptatibus? </p>
          </div>
      </div>
    </div>
    <div class="container history">
      <h3>回顧 Review</h3>
      <history />
    </div>
    <div class="container-fulid under_img">
      <img src="../assets/666.png" alt="">
    </div>
    <MyFooter />
  </div>
</template>

<script>
import history from '../components/History'
import MyFooter from '@/components/Footer.vue'
export default {
  components:{
    history,MyFooter
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
  .story{
    margin-top: 200px;
    text-align: left;
      // background-image:url('../assets/storybgc.png') ;
      // background-size: cover;
      // background-repeat: no-repeat;
      // background-position: right top;
    h2{
      font-weight: 700;
      color: #9b5c3a;
    }
    p{
      font-size: 16px;
      line-height: 2;
      &.founder_name{
        color: #000;
        font-size: 18px;
        text-align: center;
        span{
          font-weight: 700;
        }
      }
      &.founder_info{
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
    img{
      width: 100%;
      object-fit: cover;
    }
    .pic{
      display: flex;
      justify-content: center;
      img{
        width: 300px;
      }
    }
  }

//特殊背景
.container-fluid{
  position: relative;
  padding: 0;
  .specialBackground{
    width: 50vw;
    position: absolute;
    top: -7vh;

  }
}

// 歷史沿革
.history{
  margin: 120px auto -27vh;
  width: 100%;
  h3{
    width: 100%;
    text-align: center;
    color: #9b5c3a;
    font-weight: 700;
    position: relative;
    margin-bottom: 60px;
    &:after{
      content: '';
      width: 2em;
      height: 3px;
      position: absolute;
      bottom: -40%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #9b5c3a;
    }
  }
}
.under_img{
  margin-bottom: -60px;
}
</style>