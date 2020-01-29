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
        authFailed: false,
        refreshLoading: true,
        addPost: false,
        imageUpload: null
    },
    getters: {
        isAuth(state) {
            return (state.token) ? true : false;
        },
        refreshLoading(state) {
            return state.refreshLoading;
        },
        addPost(state) {
            return state.addPost;
        },
        imageUpload(state) {
            return state.imageUpload;
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
        },
        refreshLoading(state)
        {
            state.refreshLoading = false;
        },
        addPost(state) {
            state.addPost = true;
        },
        clearAddPost(state) {
            state.addPost = false;
        },
        imageUpload(state, imageData) {
            state.imageUpload = imageData.secure_url
        },
        clearImageUpload(state) {
            state.imageUpload = null
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
        },
        refreshToken({commit}) {
            const refreshToken = localStorage.getItem('refresh')

            if (refreshToken) {
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`, {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                .then( response => response.json())
                .then( authData => {
                    commit('authUser', {
                        idToken: authData.id_token,
                        refreshToken: authData.refresh_token,
                        type: 'refresh'
                    });

                    commit('refreshLoading')
                    localStorage.setItem("token", authData.id_token)
                    localStorage.setItem("refresh", authData.refresh_token)
                })
            }
            else {
                commit('refreshLoading')
            }
        },
        addPost({commit, state}, payload) {
            Vue.http.post(`posts.json?auth=${state.token}`, payload)
            .then(response => response.json())
            .then(response => {
                commit('addPost')
                setTimeout(() => {
                    commit('clearAddPost')
                },3000)
            })
        },
        imageUpload({commit}, file) {
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfj8xaqmv/image/upload';
            const CLOUDINARY_PRESET = 'axznd8a5'

            let formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_PRESET);

            Vue.http.post(CLOUDINARY_URL, formData, {
                headers: {
                    'Content-type':'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(response => {
                commit('imageUpload', response)
            });
        }
    }
}


export default admin;