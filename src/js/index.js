import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

//同步加载组件
import configureStore from './store/configureStore.js';
import Movie from './containers/Movie.js';
import App from './containers/App.js';

//样式
import '../css/movie.less';
import '../css/index.less';

let store = configureStore();

//如果只是想去掉 ?_k=adseis 这样的字符串的话，可以使用外部的 history 模块。
//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
// 创建一个增强版的history来结合store同步导航事件
const appHistory = syncHistoryWithStore(browserHistory, store);

const routes = (
    <Route path="/" component={App}>
    <IndexRoute component={Movie} />

    </Route>
);

render(
    <Provider store={store}>
        <Router history={appHistory} routes={routes} />
    </Provider>,
    document.getElementById('init')
);