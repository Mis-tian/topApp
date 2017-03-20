/**
 * Created by admin on 2017/3/15.
 */

import {RECEIVE_BANNER_LIST} from '../constants/constants'
const initialState={
    bannerList:[]
}

//通过dispatch action 进入
export default function movie(state=initialState,action){
    switch (action.type){
        case RECEIVE_BANNER_LIST:
            return Object.assign({},state,{bannerList:action.bannerList})
        break
        default:
            return state
    }
}