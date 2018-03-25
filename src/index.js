import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import AuthRoute from './component/authroute/authroute';
import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import reducers from './reducer'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import './config.js'
import './index.css'

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
   // window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
);

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path = "/bossinfo" component = { BossInfo } />
          <Route path = "/geniusinfo" component = { GeniusInfo } />
          <Route path = "/login" component = { Login } />
          <Route path = "/register" component = { Register } />
          <Route path = "/chat/:user" component = { Chat } />
          <Route component = { Dashboard } />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);


