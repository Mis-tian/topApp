/**
 * Created by admin on 2017/3/15.
 */

import fetch from 'isomorphic-fetch';
import {RECEIVE_BANNER_LIST} from '../constants/constants'

//接收issues
function receiveBannerList(data){
    return{
        type:RECEIVE_BANNER_LIST,
        bannerList:data
    }
}


//获取banner列表
export function fetchBannerList(){
    return dispatch =>{
        return fetch('../../data/bannerList.json')
            .then(response=>response.json())
            .then(data=>{
                dispatch(receiveBannerList(data.data.returnValue))
            }).catch(e=>{});
    }
}