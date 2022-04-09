// 引入vuex
import { createStore, Commit } from 'vuex'
import { IColumnProps, IPostProps, UserMsg, IUserProps } from '../utils/interfaceDefinition'
import axios from 'axios'
// store接受的类型
export interface IGlobalData {
    token: string,
    loding: boolean,
    columns: IColumnProps[];
    columnList: IPostProps[];
    user: IUserProps;

}
const store = createStore<IGlobalData>({
  state: {
    token: '',
    loding: false,
    columns: [],
    columnList: [],
    user: UserMsg
  },
  // mutations必须是同步函数，因为异步可能破坏vuex的可追溯性
  mutations: {
    login (state, rawData) {
      state.user = { ...state.user, status: true, name: '' }
      const { token } = rawData.data.token
      state.token = token
      axios.defaults.headers.common.Authrization = 'Bearer' + token
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    // 带参数的mutations,即在.commit是传入额为的参数 称为载荷（PayLoad）
    cratePost (state, newPost) {
      state.columnList.push(newPost)
    },
    // 创建与actions中对应的fetchColumns
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columnList = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.columnList = rawData.data.list
    },
    setLoding (state, status) {
      state.loding = status
    }
  },
  // 可以包含任意异步操作，用于替换mutations，他提交一个mutations，而不是之间变更状态
  actions: {
    // 接受一个与store实例，具有相同方法和属性的对象-> context (注意不是store本身)
    fetchColumns ({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, columnID) {
      getAndCommit('/column/' + columnID, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, columnID) {
      getAndCommit('/column/' + columnID + '/posts', 'fetchPosts', commit)
    },
    fetchCurrentUser ({ commit }) {
      getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login ({ commit }, postData) {
      return postAndCommit('/user/login', 'login', commit, postData)
    }
  },
  // store的计算属性
  getters: {
    getColumnById: (state) => (id:string) => {
      return state.columns.find(item => item._id === id)
    },
    getPostById: (state) => (id:string) => {
      return state.columnList.filter(item => item.column === id)
    }
  // 返回一个函数 实现给getters传参
  }
})
// url:请求地址 mutations:触发哪个mutations commit:是个函数，从vue中可以导出
const getAndCommit = async (url:string, mutations:string, commit:Commit) => {
  const { data } = await axios.get(url)
  commit(mutations, data)
}
const postAndCommit = async (url:string, mutations:string, commit:Commit, postData:any) => {
  const { data } = await axios.post(url, postData)
  commit(mutations, data)
}

export default store
