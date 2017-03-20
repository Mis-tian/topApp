/**
 * Created by admin on 2017/3/15.
 */
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
import movie from './movie.js' // 引入cinema这个reducer

//可以看到我们利用 combineReducers 把 reducer 做了拆分
export default combineReducers({
    movie,
    routing:routerReducer
})