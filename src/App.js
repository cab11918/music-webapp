import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import MainPage from "./containers/MainPage";
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from "redux";
function App() {
  return (

        <Router>


          <Switch>
            <Route path={"/"} component={MainPage}></Route>

          </Switch>


        </Router>






  );
}

export default App;
