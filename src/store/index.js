import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        commodity: [],
        //商城目前配置
        config: {
            freight: 60, //運費
            rebate: 1 //折扣倍率
        },
        cart: [],
        checkout: {
            totalPrice: 0,
            buy: []
        },
        orderObjList: [],
        //目前正在處理的訂單id
        nowOrder:''
    },
    mutations: {
        login(state, user) {
            state.user = user
            state.cart = state.cart.concat(user.cart)
            state.user.cart = state.cart.slice(0)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        logout(state) {
            state.user = {}
            state.cart = []
            state.checkout = {}
            localStorage.removeItem('cart')
            localStorage.removeItem('user')
        },
        getCommodity(state, array) {
            array.forEach(item => {
                state.commodity.unshift(item)
            })
        },
        addUserLike(state, commodity_id) {
            state.user.like.push(commodity_id)
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        removeUserLike(state, commodity_id) {
            let newList = state.user.like.filter(item => { return item != commodity_id })
            state.user.like = newList
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        updateUser(state, data) {
            state.user.firstname = data.firstname;
            state.user.lastname = data.lastname;
            state.user.email = data.email;
            state.user.gender = data.gender;
            state.user.birthday = data.birthday;
            state.user.tel = data.tel;
            state.user.address = data.address;
            state.user.identity = data.identity;
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        getCart(state) {
            if (localStorage.getItem('cart')) {
                state.cart = JSON.parse(localStorage.getItem('cart'))
            }
        },
        addCart(state, data) {
            //先更新暫存購物車
            state.cart.unshift(data)
            localStorage.setItem('cart', JSON.stringify(state.cart))
                //若有登入，再加入會員購物車
            if (state.user._id) {
                state.user.cart = state.cart
                localStorage.setItem('user', JSON.stringify(state.user))
            }
        },
        removeCart(state) {
            state.cart = []
        },
        updateCartList(state, data) { //data是新的購物車列表
            state.cart = data
            localStorage.setItem('cart', JSON.stringify(state.cart))
                //若有登入，再加入會員購物車
            if (state.user._id) {
                state.user.cart = data
                localStorage.setItem('user', JSON.stringify(state.user))
            }
        },
        updateTotalPrice(state, data) {
            state.checkout.totalPrice = data.totalPrice
            state.checkout.buy = data.buy
        },
        addOrder(state, id) {
            state.nowOrder = id
            state.user.order.unshift(id)
            state.user.cart = []
            state.cart = [] 
            localStorage.setItem('user', JSON.stringify(state.user))
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        getOrder(state, data) {
            state.orderObjList.unshift(data)
        },
        clearOrderObjList(state){
          state.orderObjList = []
        }
    },
    actions: {
        a_getCommodity(context) {
            axios.get('/backstage/getCommodity')
                .then(res => {
                    context.commit('getCommodity', res.data.commodity)
                })
        },
        a_like(context, data) {
            axios.post('/ajax/like', data)
                .then(() => {})
        },
        a_dislike(context, data) {
            axios.post('/ajax/dislike', data)
                .then(() => {})
        },
        a_updateUser(context, data) {
            axios.post('/ajax/updateUser', data)
                .then((res) => {
                    if (res.data.err_code == '1') {
                        alert('密碼錯誤')
                    } else {
                        context.commit('updateUser', data)
                    }
                })
        },
        a_updateCart(context) { //data是會員購物車陣列
            axios.post('/ajax/updateCart', {
                    cart: context.state.user.cart,
                    userID: context.state.user._id
                })
                .then((res) => {
                    if (res.data.err_code == '1') {
                        alert('伺服器錯誤，請稍後再試')
                    }
                })
        },
        a_addOrder(context,data){
          // 1.將訂單儲存到訂單資料庫
          axios.post('/ajax/addOrder', {
            order: data
          })
          .then((res) => {
            if (res.data.err_code == '1') {
              return alert('伺服器錯誤，請稍後再試')
            }else{
              context.commit('addOrder',res.data.order._id)
              context.commit('getOrder',res.data.order)
            //2.更新使用者資料
              axios.post('/ajax/updateOrder', {
                  order: context.state.user.order,
                  cart: context.state.user.cart,
                  userID: context.state.user._id
              })
              .then((res) => {
                  if (res.data.err_code == '1') {
                     return alert('伺服器錯誤，請稍後再試')
                  }
              })
            }
          })
        },
        a_getOrder(context, id) {
            axios.post('/ajax/getOrder', {
                    id: id
                })
                .then(res => {
                  if(res.data.order){
                    context.commit('getOrder', res.data.order)
                  }
                })
        }
    },
    modules: {},
    getters: {
        season(state) {
            return state.commodity.filter(item => {
                return item.classify == -1
            })
        },
        elementary(state) {
            return state.commodity.filter(item => {
                return item.classify == 0
            })
        },
        junior(state) {
            return state.commodity.filter(item => {
                return item.classify == 1
            })
        },
        senior(state) {
            return state.commodity.filter(item => {
                return item.classify == 2
            })
        },
        other(state) {
            return state.commodity.filter(item => {
                return item.classify == 3
            })
        }

    }
})