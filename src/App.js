import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import MainPageDesktop from "./desktop/containers/MainPage";
import MainPageMobile from "./mobile/containers/MainPage";
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from "redux";
function App() {
  return (

        <Router>


          <Switch>
            <Route exact path={"/"} component={ MainPageDesktop}></Route>
            <Route exact path={"/mobile"} component={ MainPageMobile}></Route>

          </Switch>


        </Router>






  );
}

export default App;
