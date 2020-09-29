import '../node_modules/react-app-polyfill/ie9'
import '../node_modules/react-app-polyfill/ie11';
import '../node_modules/react-app-polyfill/stable';
import React from 'react';
import { render } from 'react-dom';
import store,{history} from "./store/store";
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from "react-redux";

import "./assets/fonts/Roboto-Regular.ttf";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./assets/css/bootstrap4/css/bootstrap-grid.min.css";
import "./assets/css/bootstrap4/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.css';

// import "bootstrap";
// import 'react-bootstrap/dist/react-bootstrap';

// import {ConnectedRouter} from 'connected-react-router';


render(<Provider store={store}>
        <ConnectedRouter history={history}>
        
                <App />
        </ConnectedRouter>
    </Provider>,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
