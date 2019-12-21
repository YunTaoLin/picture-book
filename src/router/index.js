import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/store',
        name: 'sotore',
        component: () =>
            import ('../views/Store.vue')
    },
    {
        path: '/contact',
        name: 'contact',
        component: () =>
            import ('../views/Contact.vue')
    },
    {
        path: '/send',
        name: 'send',
        component: () =>
            import ('../views/Send.vue')
    },
    {
        path: '/story',
        name: 'story',
        component: () =>
            import ('../views/Story.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/account/Login.vue')
    },
    {
        path: '/commodity',
        name: 'commodity',
        redirect: '/commodity/total',
        component: () =>
            import ('../views/Commodity.vue'),
        children: [{
                path: 'season',
                name: 'season',
                component: () =>
                    import ('../views/Commodity/Season.vue'),
            },
            {
                path: 'elementary',
                name: 'elementary',
                component: () =>
                    import ('../views/Commodity/Elementary.vue'),
            },
            {
                path: 'junior',
                name: 'junior',
                component: () =>
                    import ('../views/Commodity/Junior.vue'),
            },
            {
                path: 'senior',
                name: 'senior',
                component: () =>
                    import ('../views/Commodity/Senior.vue'),
            },
            {
                path: 'other',
                name: 'other',
                component: () =>
                    import ('../views/Commodity/Other.vue'),
            },
            {
                path: 'total',
                name: 'total',
                component: () =>
                    import ('../views/Commodity/Total.vue'),
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router