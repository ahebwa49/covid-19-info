import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "./styles/index.css";
import App from "./App";
import { Transmission } from "./common/Transmission";
import About from "./common/About";
import Symptoms from "./common/Symptoms";

import * as serviceWorker from "./serviceWorker";

class Routing extends React.Component {
  render() {
    return (
      <Provider store={store()}>
        <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/symptoms" component={Symptoms} />
            <Route exact path="/about" component={About} />
            <Route exact path="/transmission" component={Transmission} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
