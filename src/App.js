import React from "react";
import "./App.css";
import NavSidebar from "./NavSidebar/NavSidebar";
import TopAppBar from "./TopAppBar/TopAppBar";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App-sidebar-wrapper">
        <NavSidebar />
      </div>
      <div className="App-content-wrapper">
        <TopAppBar />
        <Switch>
          <Route exact path="/" render={() => <p>WELCOME</p>} />
          <Route exact path="/tasks" render={() => <p>Tasks</p>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
