  
<template>
   <div class="footer">
        <div class="info">
            <div class="row">
                <div class="fb">
                    <iframe allowtransparency='true' scrolling='no' src='//www.facebook.com/v2.5/plugins/page.php?href=https://www.facebook.com/%E6%96%B9%E6%96%B9-%E8%BC%94%E5%A4%A7%E5%BF%83%E7%90%86%E5%B0%8F%E5%B8%A5%E5%93%A5-527133017812867/&amp;width=300&amp;show_facepile=false&amp;small_header=false&amp;hide_cover=false&amp;show_posts=false&amp;locale=zh_TW' style='border:none; overflow:hidden;max-width: 100%; width: 300px; '></iframe>
                </div>
                <div class="info-inner">
                    <p>
                        方方繪本 - 官方購物網站<br>
                        提供各種造型、髮質護理服務
                    </p>
                    <p>
                        平日晚上與假日顧客較多<br>
                        <span>Weekdays and holidays</span>
                        
                    </p>
                </div>
                <div class="img">
                    <img src="../assets/mylogo3.png" alt="">
                </div>
            </div>
        </div>
         <div class="container">
             <nav>
                <router-link to="/serve">品牌故事</router-link>
                <router-link to="/popularCut">門市資訊</router-link>
                <router-link to="/location">寄送說明</router-link>
                <a href="javascript:;" @click="FB">聯絡我們</a>
                <router-link to="/reservation">帳戶中心</router-link>
            </nav>
         </div>
        <div class="coyRight">Copyright © YunTao.Lin  <a href="https://github.com/YunTaoLin/play-hair"> Github  </a></div>
   </div>
</template>

<script>
export default {
    methods:{
        FB(){
            alert('敬請期待');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss' ;
    .footer{
      margin-top: 60px;
        padding: 40px 10vw 20px;
        background-color: rgb(124, 103, 78);
        font-family: '微軟正黑體';
        display: flex;
        flex-direction: column;
        align-content: center;
        color: #ddd;
        box-shadow: 0 -2px 2px 0 rgba(207, 170, 170, 0.5);
        .row{
            justify-content: center;
        }
        .info{
            display: flex;
            justify-content: center;
            align-content: center;
            margin-bottom: 12px;
            .info-inner{
                margin:0 60px 12px;
                letter-spacing: 2px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: left;
                @media (max-width:767px) {
                    text-align: center;
                    line-height: 2;
                }
                p:nth-of-type(1){
                    padding: 8px 0;
                    border-bottom: 1px solid #dedede;
                }
                p:nth-of-type(2){
                    font-size: 15px;
                }
                span{
                    font-family: $eng-font;
                }
                @media (min-width:768px) {
                    .sp-br{
                        display: none;
                    }
                }
            }
            .img{
              img{
                width: 300px;
                height: 130px;
                object-fit: cover;
              }
            }
            
        }
        nav{
            padding: 0 30%;
            width: 100%;
            display: flex;
            justify-content: space-around;
            
            @media (max-width:767px) {
                flex-direction: column;
            }
            a{
                color: #eee;
                font-size: 14px;
                transition: .5s;
                text-align: center;
                margin-bottom: 24px;
                &:hover{
                    text-decoration: none;
                    transform: scale(1.2);
                }
            }
        }
        .coyRight{
            font-size: 14px;
            margin-bottom: 24px;
            text-align: center;
            vertical-align: middle;
            img{
                height: 1.5em;
                margin: 0 0px 6px;
            }
            a{
                color:#eee;
                font-family: $eng-font;
                margin-left: 4px;
                transition: .3s;
                letter-spacing: 1px;
                font-weight: 600;
                &:hover{
                    text-decoration: none;
                    color: #444;
                }
            }
        }
    }
</style>