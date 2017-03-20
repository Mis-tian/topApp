/**
 * Created by jh on 2017-03-15.
 */
 import React,{Component} from 'react';
 import '../../css/header.css'
 import '../../css/swiper.min.css'
 import SwiperAction from '../../css/swiper.min'
 import '../../css/jsonp'

export default class Banner extends Component{
    constructor (props) {
        super(props);
        this.state = {
            imgs: []
        };
    }
     componentDidMount(){


                    this.setState({
                        imgUrls: this.props.imgList,
                    })
                    new SwiperAction('.swiper-container',{
                        loop: true,
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        autoplay : 3000,
                        autoplayDisableOnInteraction : false,
                    });



     }
    render(){
        const imgList=this.props.imgList;
        let countId=0;
        return(
            <div id="header">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            imgList.map((item)=>{
                                return <div className="swiper-slide" key={item.id}>
                                    <img className="img" src={`https://gw.alicdn.com/${item.smallPicUrl}`} />
                                </div>
                            })
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        );
    }
}