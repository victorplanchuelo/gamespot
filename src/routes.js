/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './Store/store'

import Home from './components/Home/Index.vue'
import SignIn from './components/SignIn/Index.vue'
import Dashboard from './components/Dashboard/Index.vue'
import MainDashboard from './components/Dashboard/Main.vue'
import AddPosts from './components/Dashboard/AddPosts.vue'
import PostsList from './components/Dashboard/ListPosts.vue'
import Post from './components/Post/Post.vue'
import NotFound from './components/404/Index.vue'

Vue.use(VueRouter)

const authGuard = {
    beforeEnter: (to, from, next) => {

        const redirect = () => {
            (store.state.admin.token) 
            ? 
                (to.path === '/signin') ? next('/dashboard') : next() 
            :
                (to.path === '/signin') ? next() : next('/')
        }

        if( store.state.admin.refreshLoading) {
            //// async code
            store.watch((state, getters) => getters['admin/refreshLoading'], () => {
                redirect();
            })
        }
        else {
            redirect();
        }

        
    }
}

const routes = [
    {
        path: '/',
        component:Home
    },
    {
        path: '/signin',
        component:SignIn,
        ...authGuard 
    },
    {
        path: '/dashboard',
        component:Dashboard,
        children: [
            {
                path: '/',
                component: MainDashboard
            },
            {
                path: 'add_posts',
                component: AddPosts
            },
            {
                path: 'posts_list',
                component: PostsList
            }
        ],
        ...authGuard 
    },
    {
        path: '/post/:id',
        component: Post
    },
    {
        path:'*',
        component: NotFound
    }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(from,to,savedPosition) {
        return {x:0, y:0}
    }
})