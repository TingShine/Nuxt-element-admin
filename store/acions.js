export default {
  addVisitedViews({ commit }, view) {
    //通过解构赋值得到commit方法
    commit('ADD_VISITED_VIEWS', view) //去触发ADD_VISITED_VIEWS，并传入参数
  },

  delVisitedViews({ commit, state }, view) {
    //删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
    //commit('DEL_VISITED_VIEWS',view)
    return new Promise((resolve) => {
      //resolve方法：未来成功后回调的方法
      commit('DEL_VISITED_VIEWS', view)
      resolve([...state.visitedviews])
    })
  },
}
