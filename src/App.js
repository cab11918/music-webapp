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
