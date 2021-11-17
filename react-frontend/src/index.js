import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './index.css';
import {BrowserRouter, Switch, Route, Link } from "react-router-dom";
import App from './App';
import HomeMasthead from './components/homeMasthead';
import SearchResults from './components/searchResults';
import SignIn from './components/signIn';
import SignUpPage from './components/SignUpPage';
import reportWebVitals from './reportWebVitals';
import CreateRecipePage from './components/CreateRecipe';
import ProfilePage from './components/profile';
import DisplayPage from './components/DisplayPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
          <Route path="/display/:id" component={DisplayPage}/>
          <Route path="/search" component={SearchResults}/>
          <Route path="/sign-up" component={SignUpPage}/>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/create" component={CreateRecipePage}/>
          <Route path="/profile/:id" component={ProfilePage}/>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/" component={HomeMasthead}/>
      </Switch>
    </BrowserRouter>
    {/*<App />*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
