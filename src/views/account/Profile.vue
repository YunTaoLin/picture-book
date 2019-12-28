<template>
  <div class="profile">
    <Sidebar theTitle="會員資料">
      <h1>會員資料<span>（會員資料可在結帳時快速填入）</span></h1>
      <div class="info">
        <div >
          <label for="firstname">姓名：</label>
          <input type="text" v-if="editing" id="firstname" v-model.trim="data.firstname" placeholder="名">
          <input class="ml-3" type="text" v-if="editing" id="lastname" v-model.trim="data.lastname" placeholder="姓">
          <span v-else>{{user.firstname}} {{user.lastname}}</span>
        </div>
        <div >
          <label for="identity">身分證字號：</label>
          <input type="text" v-if="editing" id="identity" v-model.trim="data.identity" placeholder="請設定您的身分證">
          <span v-else>{{user.identity != ''?user.identity:'未設定'}}</span>
        </div>
        <div >
          <label for="gender">性別：</label>
          <select id="gender" v-if="editing" v-model.trim="data.gender">
            <option value="-1">保密</option>
            <option value="0">女性</option>
            <option value="1">男性</option>
          </select>
          <span v-else>{{showGender}}</span>
        </div>
        <div >
          <label for="birthday">生日：</label>
          <input type="date" id="birthday" v-if="editing" v-model="data.birthday">
          <span v-else>{{user.birthday != ''?new Date(user.birthday).toLocaleDateString():'未設定'}}</span>
        </div>
        <div >
          <label for="tel">聯絡電話：</label>
          <input type="tel" id="tel" v-if="editing" v-model.trim="data.tel" placeholder="請設定您的聯絡電話">
          <span v-else>{{user.tel != ''?user.tel:'未設定'}}</span>
        </div>
        <div >
          <label for="address">住家地址：</label>
          <input type="text" v-if="editing" id="address" v-model.trim="data.address" placeholder="請設定您的住家地址">
          <span v-else>{{user.address != ''?user.address:'未設定'}}</span>
        </div>
        <div >
          <label for="email">登入信箱：</label>
          <input type="email" v-if="editing" id="email" v-model.trim="data.email" placeholder="請設定您的登入信箱">
          <span v-else>{{user.email}}</span>
        </div>
        <div v-if="editing">
          <label for="password">確認密碼：</label>
          <input type="password" v-if="editing" id="password" v-model.trim="data.password" placeholder="輸入密碼">
        </div>    
        <div class="group" v-if="editing">
          <button class="mt-4 save"  @click="save">保存修改</button>
          <button class="mt-4 ml-2 cancel" @click="editing = false">取消</button>
        </div>
        <button class="mt-4" @click="editing = true"  v-else><i class="fa fa-pencil" aria-hidden="true"></i> 修改資料</button>
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
      user: this.$store.state.user,
      editing:false,
      data:{
        _id:this.$store.state.user._id,
        firstname:this.$store.state.user.firstname,
        lastname:this.$store.state.user.lastname,
        email:this.$store.state.user.email,
        gender:this.$store.state.user.gender,
        birthday:new Date(this.$store.state.user.birthday),
        tel:this.$store.state.user.tel,
        address:this.$store.state.user.address,
        identity:this.$store.state.user.identity
      }
      
      
    }
  },
  computed:{
    showGender(){
      let gender = '';
      switch(parseInt(this.$store.state.user.gender)){
        case -1:
          gender='保密'
          break;
        case 0:
          gender='女性'
          break;
        case 1:
          gender = '男性'  
      }
      return gender
    },
  },
  methods:{
    save(){
      this.$store.dispatch('a_updateUser',this.data)
      this.editing =false;
    }
  }

 
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_base.scss';
.profile{
  margin-top: 150px;
  font-size: 14px;
  .container{
    min-height: 60vh;
  }
  h1{
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    color: $primary-color;
    position: relative;
    span{
      font-size: 14px;
      color: $secondary-color ;
    }
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
  .info{
    font-size: 16px;
    font-weight: 500;
    text-align: justify;
    margin: 32px 0;
    font-weight: 700;
    color: #666;
    div{
      width: 60%;
      min-width: 300px;
      margin: 16px 0;
      display: flex;
      align-items: center;
      line-height: 1.7em;
      label{
        line-height: 1.7em;
        margin-right: .5em;
        margin-bottom: 0;
        color: #123;
        font-size: 18px;
        width:6em;
        text-align:right;
      }
      input,select{
        flex: 1;
        line-height: 1.6em;
        font-size: 15px;
        border-radius: 2px;
        padding:2px 4px;
        border: 1px solid #c1c1c1;
      }
    }
    button{
      background-color: #2a3a5d;
      font-family: $tw-font;
      font-weight: 400;
      letter-spacing: 2px;
      color: #dedede;
      outline: none;
      border: none;
      border-radius: 4px;
      padding: 12px 18px;
      &.cancel{
        background-color: rgba(0, 0, 0, 0.6);
        color: #fefefe;
      }
    }    
  }
}

</style>