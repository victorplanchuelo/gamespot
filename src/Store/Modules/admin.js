/* eslint-disable */
import Vue from 'vue';
import router from '../../routes'

const FbAuth = 'https://identitytoolkit.googleapis.com/v1/accounts'
const FbApiKey = 'AIzaSyCsweWo4jsGnzsjRHaPNLqypG42N03sOK0'

const admin = {
    namespaced: true,
    state: {
        token: null,
        refresh: null,
        authFailed: false
    },
    getters: {
        isAuth(state) {
            return (state.token) ? true : false;
        }
    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken
            state.refresh = authData.refreshToken

            if (authData.type === 'signin') {
                router.push('/dashboard')
            } 
        },
        authFailed(state, type) {
            (type=== 'reset') ? state.authFailed = false : state.authFailed = true;
        },
        logoutUser(state) {
            state.token = null;
            state.refresh = null;

            localStorage.removeItem('token');
            localStorage.removeItem('refresh');

            router.push('/')
        }
    }, 
    actions: {
        singIn({commit}, payload)
        {
            Vue.http.post(`${FbAuth}:signInWithPassword?key=${FbApiKey}`, {
                ...payload,
                returnSecureToken: true
            })
            .then(response => response.json())
            .then( authData => {
                commit("authUser", {
                    ...authData,
                    type: 'signin'
                });

                localStorage.setItem("token", authData.idToken)
                localStorage.setItem("refresh", authData.refreshToken)
            })
            .catch( error => {
                commit("authFailed")
            })
        }
    }
}


export default admin;