<template>
  <div class="contact ">
    <div class="container wow fadeIn">
      <div class="sendSeccess" v-if="sending">
         <h1><i class="fa fa-envelope" aria-hidden="true"></i>信件已送出</h1>
         <button @click="otherMail">發送其他信件</button>
      </div>
      <div class="contact_inner" v-else>
        <h1><i class="fa fa-envelope" aria-hidden="true"></i>聯絡我們</h1>
        <hr>
        <p>親愛的會員及網友您好，若您有任何意見或疑問，我們誠摯地邀請您來信到我們專人服務的電子郵件信箱，<br>或撥打免付費售後服務專線： 0800-778-877 要求提供協助。我們將盡力為您解答！
        <br>
          為了加速來信處理時間，請在主旨欄位選擇正確的分類選項。感謝您的配合！
        </p>
        <form>
          <div class="group">
            <label for="name">
              您的姓名：
              <input type="text" id="name" name="name" v-model.trim="mail.name">
            </label>
            <label for="member">
              是否為會員：
              <input type="checkbox" name="member" id="member" v-model="mail.member">
            </label>
          </div>
          <div class="group">
            <label for="email">
              您的信箱：
              <input type="email" id="email" name="email" v-model.trim="mail.email">
            </label>
            <label for="tel">
              您的電話：
              <input type="tel" id="tel" name="tel" v-model.trim="mail.tel">
            </label>
          </div>
          <div class="group">
            <label for="subject">
            信件主旨：
              <select name="subject" id="subject" v-model="mail.subject">
                <option value="請選擇" disabled>請選擇</option>
                <option value="商品退換貨">商品退換貨</option>
                <option value="商品寄送疑問">商品寄送疑問</option>
                <option value="會員相關疑問">會員相關疑問</option>
                <option value="其他">其他</option>
              </select>
          </label>
          </div>
          <label for="content">
            您的留言：
            <textarea name="content" id="content" cols="30" rows="10" v-model.trim="mail.content"></textarea>
          </label>
         <div class="submit">
            <a href="javascript:;" id="submit" class="myBtn mt-4" @click="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i>{{submitText}}</a>
         </div>
        </form>
      </div>
    </div>
    <MyFooter />
  </div>

</template>

<script>
import MyFooter from '@/components/Footer.vue'
import $ from 'jquery'
export default {
  components: {
    MyFooter
  },
  data(){
    return {
      submitText:'確認送出',
      mail:{
        name:'',
        member:false,
        email:'',
        tel:'',
        subject:'請選擇',
        content:''
      },
      sending:false
    }
  },
  methods:{
    submit(){
      const cors = 'https://cors-anywhere.herokuapp.com/';
      if(!this.mail.name){
        return alert('請輸入姓名')
      }
      if(!this.mail.email){
        return alert('請輸入信箱')
      }
      if(!this.mail.tel){
        return alert('請輸入電話')
      }
      if(this.mail.subject == '請選擇'){
        return alert('請選擇信件主旨')
      }
      if(!this.mail.content){
        return alert('請輸入信件內容')
      }
      this.submitText='信件寄送中...'
      $.ajax({
        url: cors+'https://script.google.com/macros/s/AKfycbzkGYpHWxr9vcWrq4dWBLJOOJhzjVV0VR8gPJifJhzv5uhgK4U/exec',
        type: 'post',
        datatype: 'json',
        data: this.mail
      }).done(()=>{
        this.sending = true
        this.submitText='確認送出'
        this.clear()
      })
    },
    clear(){
      this.mail= {
        name:'',
        member:false,
        email:'',
        tel:'',
        subject:'',
        content:''
      }
    },
    otherMail(){
      this.sending=false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.contact{
  margin-top: 200px;
  font-family: $tw-font;
  h1{
    font-size: 24px;
    font-weight: 700;
    i{
      margin-right: .4em;
    }
  }
  .contact_inner{
    height: 65vh;
    padding:0 20%;
    text-align: left;
    p{
      font-size: 14px;
    }
    form{
      margin-bottom: 10vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      .group > label:first-child{
        margin-right: 2em;
      }
      input{
        width: 12em;
        &#member{
          width: 2em;
        }
      }
      select{
        width: 12em
      }
      label{
        margin: 12px 0;
      }
      >label{
        display: flex;
      }
      textarea{
        width: 80%;
      }
      .submit{
        width: 100%;
        display: flex;
        justify-content:center;
      }
    }
  }
}

.myBtn{
  display: inline-block;
  width: 95%;
  padding:11px 0;
  background-color: $primary-color;
  color: #fefefe;
  border:1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  text-decoration: none;
  i{
    margin-right: .5em;
  }
}

.sendSeccess{
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1{
    font-size: 48px;
    margin-bottom: 48px;
  }
  button{
    background-color: #777;
    border:none;
    padding: 16px 24px;
    color: #fefefe;
    border-radius: 2px;
    letter-spacing: 2px;
    font-weight: 700;
    font-size: 18px;
    outline: none;
  }
}
</style>