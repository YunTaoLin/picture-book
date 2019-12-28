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
        cart: []
    },
    mutations: {
        login(state, user) {
            state.user = user
            state.cart = state.cart.concat(user.cart)
            state.user.cart = state.cart
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        logout(state) {
            state.user = {}
            state.cart = []
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
        },
        getCart(state) {
            state.cart = JSON.parse(localStorage.getItem('cart'))
        },
        addCart(state, data) {
            //先更新暫存購物車
            state.cart.unshift(data)
                //若有登入，再加入會員購物車
            if (state.user._id) {
                state.user.cart.unshift(data)
            }
        },
        removeCart(state) {
            state.cart = []
        }
    },
    actions: {
        a_getCommodity(context) {
            axios.get('http://127.0.0.1:3000/backstage/getCommodity')
                .then(res => {
                    context.commit('getCommodity', res.data.commodity)
                })
        },
        a_like(context, data) {
            axios.post('http://127.0.0.1:3000/ajax/like', data)
                .then(() => {
                    console.log('增加完成')
                })
        },
        a_dislike(context, data) {
            axios.post('http://127.0.0.1:3000/ajax/dislike', data)
                .then(() => {
                    console.log('刪除完成')
                })
        },
        a_updateUser(context, data) {
            axios.post('http://127.0.0.1:3000/ajax/updateUser', data)
                .then((res) => {
                    if (res.data.err_code == '1') {
                        alert('密碼錯誤')
                    } else {
                        context.commit('updateUser', data)
                    }
                })
        },
        a_updateCart(context) { //data是會員購物車陣列
            axios.post('http://127.0.0.1:3000/ajax/updateCart', {
                    cart: context.state.user.cart,
                    userID: context.state.user._id
                })
                .then((res) => {
                    if (res.data.err_code == '1') {
                        alert('伺服器錯誤，請稍後再試')
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