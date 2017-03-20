/**
 * Created by admin on 2017/3/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import Banner from '../components/banner'
import {fetchBannerList} from '../actions/actions'

class Movie extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {bannerList} =this.props;
        return(
            <Banner imgList={bannerList}/>
        )
    }
};

function mapStateToProps(state){
    return{
        bannerList:state.movie.bannerList
    }
}

export default  connect(mapStateToProps,{
    fetchBannerList
})(Movie);



/**
 * Created by admin on 2017/3/15.
 */
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router'
// import {bindActionCreators} from 'redux';
// import Banner from '../components/banner'
// import * as ActionCreators from '../actions/actions'
// class Movie extends Component{
//     constructor(props){
//         super(props);
//         // console.log(this.props.bindActionCreators)
//         this.props.fetchBannerList();
//     }
//     render(){
//         const {bannerList} =this.props;
//         return(
//             <Banner imgList={bannerList}/>
//         )
//     }
// };

// function mapStateToProps(state){
//     return{
//         bannerList:state.movie.bannerList
//     }
// }

// export default  connect(mapStateToProps,
//    ActionCreators
// )(Movie);