<template>
  <div class="item">
    <div class="checkbox"><input type="checkbox"  v-model="item.checked" @change="updateCheck" ></div>
    <div class="item_inner">
      <div class="pic"><img :src="commodity.img" :alt="commodity.title"></div>
      <div class="title">{{commodity.title}}</div>
    </div>
    <div class="price"><span>${{commodity.ori_price}}</span> ${{commodity.sale_price}}</div>
    <div>
      <div class="number_control">
        <button @click="number--" :disabled="number<2">-</button>
        <input type="number" v-model="number"  @change="positive" >
        <button  @click="number++">+</button>
      </div>
    </div>
    <div>${{commodity.sale_price*number}}</div>
    <div><a href="javascript:;" @click="remove">刪除</a></div>
  </div>
</template>

<script>
export default {
  props:{
    item:{
      type:Object
    }
  },
  data(){
    return {
      commodity:this.$store.state.commodity.find(item=>{return item._id == this.item.id}),
      number:this.item.number,
      checked:this.item.checked
    }
  },
  methods:{
    positive(){
      this.number = parseInt(this.number)<1? 1 : parseInt(this.number)
    },
    updateCheck(){
      this.$emit('updateChecked',this.item.checked)
    },
    remove(){
      this.$emit('remove')
    }
  },
  watch:{
    number(newData){
      this.$emit('updateNumber',newData)
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  background-color: #fff;
  display: flex;
  align-items: center;
  line-height: 55px;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.2);
  div:nth-of-type(1){
    flex:2;
  }
  div:nth-of-type(2){
    text-align: left;
    flex:9;
    display: flex;
    align-items: flex-start;
  }
  div:nth-of-type(3){
    flex:3;
  }
  div:nth-of-type(4){
    flex:3;
  }
  div:nth-of-type(5){
    flex:3;
  }
  div:nth-of-type(6){
    flex:3;
    a{
      color: #222;
      text-decoration: none;
      transition: .3s;
      &:hover{
        color: #888;
      }
    }
  }
}
input[type="checkbox"]{
  display:inline-block;
  width:19px;
  height:19px;
  margin:-2px 0 0 0;
  vertical-align:middle;
  cursor:pointer; 
}
.pic{
  width: 80px;
  padding-top: 80px;
  position: relative;
  overflow: hidden;
  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.title{
  line-height: 2;
  padding-left: 1em;
}
.number_control{
  display: flex;
  margin-left: 12px;;
  button{
    width: 40px;
    height: 36px;
    padding: 8px;
    border: 1px solid #ccc;
    outline: none;
    background-color: #fafafa;
    position: relative;
    z-index: 2;
  }
  input{
    width:40%;
    margin: 0 -1px;
    line-height: 20px;
    text-align: center;
    border:none;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: #fafafa;
    color: #666;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0; 
    }
    &:focus{
      outline: rgb(143, 165, 184) solid 1px;
    }
  }
}

.price span{
  font-size:13px ;
  text-decoration: line-through;
  color: #888;
  margin-right: 1em;
}
</style>