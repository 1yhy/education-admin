// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//     return {
//         token: getToken(),
//         name: '',
//         avatar: '',
//         roles: ''
//     }
// }

// const state = getDefaultState()

// const mutations = {
//     RESET_STATE: (state) => {
//         Object.assign(state, getDefaultState())
//     },
//     SET_TOKEN: (state, token) => {
//         state.token = token
//     },
//     SET_NAME: (state, name) => {
//         state.name = name
//     },
//     SET_AVATAR: (state, avatar) => {
//         state.avatar = avatar
//     },
//     SET_ROLES: (state, roles) => {
//         state.roles = roles
//     }
// }

// const actions = {
//     // user login
//     async login({ commit }, userInfo) {
//         const { username, password } = userInfo
//         let result = await login({ username: username.trim(), password: password })
//         if (result.code == 200) {
//             commit('SET_TOKEN', result.data.token)
//             setToken(result.data.token)
//             return 'ok'
//         } else {
//             return Promise.reject(new Error('failed'))
//         }
//     },

//     // get user info
//     getInfo({ commit, state }) {
//         return new Promise((resolve, reject) => {
//             getInfo(state.token).then(response => {
//                 const { data } = response

//                 if (!data) {
//                     return reject('Verification failed, please Login again.')
//                 }

//                 const { name, avatar, roles } = data

//                 commit('SET_ROLES', roles)
//                 commit('SET_NAME', name)
//                 commit('SET_AVATAR', avatar)
//                 resolve(data)
//             }).catch(error => {
//                 reject(error)
//             })
//         })
//     },

//     // user logout
//     logout({ commit, state }) {
//         return new Promise((resolve, reject) => {
//             logout(state.token).then(() => {
//                 removeToken() // must remove  token  first
//                 resetRouter()
//                 commit('RESET_STATE')
//                 resolve()
//             }).catch(error => {
//                 reject(error)
//             })
//         })
//     },

//     // remove token
//     resetToken({ commit }) {
//         return new Promise(resolve => {
//             removeToken() // must remove  token  first
//             commit('RESET_STATE')
//             resolve()
//         })
//     }
// }

// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions
// }

import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    buttons: [],
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_BUTTONS: (state, buttons) => {
      state.buttons = buttons
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
      login({ commit }, userInfo) {
          const username = userInfo.username.trim()
          console.log(userInfo.password)
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
         // debugger
            const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // Login({ commit }) {
    //   debugger
    //   const data = {
    //     'token': 'helen'
    //   }
    //   setToken(data.token)// 将token存储在cookie中
    //   commit('SET_TOKEN', data.token)
    // },

    // 获取用户信息
    async getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          // debugger
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          const buttonAuthList = []
          data.permissionValueList.forEach(button => {
            buttonAuthList.push(button)
          })

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_BUTTONS', buttonAuthList)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // GetInfo({ commit }) {
    //   debugger
    //   const data = {
    //     'roles': [
    //       'admin'
    //     ],
    //     'name': 'helen',
    //     'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-5670helen3b4acafe.gif'
    //   }
    //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //     commit('SET_ROLES', data.roles)
    //   }
    //   commit('SET_NAME', data.name)
    //   commit('SET_AVATAR', data.avatar)
    // },

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          debugger
          commit('SET_TOKEN', '')// 清空前端vuex中存储的数据
          commit('SET_ROLES', [])// 清空前端vuex中存储的数据
          commit('SET_BUTTONS', [])
          removeToken()// 清空cookie
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        debugger
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user