/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './Store/store'

import Home from './components/Home/Index.vue'
import SignIn from './components/SignIn/Index.vue'
import Dashboard from './components/Dashboard/Index.vue'

Vue.use(VueRouter)

const authGuard = {
    beforeEnter: (to, from, next) => {
        (store.state.admin.token) ? next() : next('/')
    }
}

const routes = [
    {
        path: '/',
        component:Home
    },
    {
        path: '/signin',
        component:SignIn
    },
    {
        path: '/dashboard',
        component:Dashboard,
        children: [
            
        ],
        ...authGuard 
    }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(from,to,savedPosition) {
        return {x:0, y:0}
    }
})