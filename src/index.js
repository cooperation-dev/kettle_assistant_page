import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';
// import {HashRouter as Router} from 'react-router-dom';
// import {BrowserRouter as Router} from 'react-router-dom';
import {Router} from 'react-router-dom';

import history from './router/history';

import MainFrame from 'components/MainFrame/MainFrame';

// renderWithHotReload(App);
renderWithHotReload(MainFrame);
/* 热更新 */
if(module.hot){
    module.hot.accept('components/MainFrame/MainFrame', () => {
    // module.hot.accept('components/App/App', () => {
        const NextApp = require('components/MainFrame/MainFrame').default;
        // const NextApp = require('components/App/App').default;
        renderWithHotReload(NextApp);
    })
}

function renderWithHotReload(RootElement){
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router history={history}>
                    <RootElement/>
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}