/* eslint-disable */
import Vue from 'vue'

const FbAuth = 'https://identitytoolkit.googleapis.com/v1/accounts'
const FbApiKey = 'AIzaSyCsweWo4jsGnzsjRHaPNLqypG42N03sOK0'

const admin = {
    namespaced: true,
    state: {
        token: null,
        refresh: null
    },
    getters: {

    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken
            state.refresh = authData.refreshToken
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
                    type: 'sigin'
                });

                localStorage.setItem("token", authData.idToken)
                localStorage.setItem("refresh", authData.refreshToken)
            })
        }
    }
}


export default admin;