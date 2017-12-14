import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import routes from './router';
import { HashRouter } from 'react-router-dom';
import { Provider } from "mobx-react";
import * as stores from './store/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider { ...stores }>
        <HashRouter children={routes}></HashRouter>
    </Provider>,document.getElementById('root'));
registerServiceWorker();
