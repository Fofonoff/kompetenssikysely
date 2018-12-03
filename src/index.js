import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import test from './components/test';
import Admin from './components/Admin';
import AuthorizedRoute from './components/AuthorizedRoute';

ReactDOM.render(
    <Router>
        <Switch>
        <Route path="/login" component={test}></Route>
        <AuthorizedRoute exact path="/admin" component={Admin} />
        <Route path="/" component={App}></Route>
        </Switch>
    </Router>
    
, document.getElementById('root'));
registerServiceWorker();
