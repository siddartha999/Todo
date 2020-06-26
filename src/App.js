import React from "react";
import "./App.css";
import NavSidebar from "./NavSidebar/NavSidebar";
import TopAppBar from "./TopAppBar/TopAppBar";
import { Route, Switch } from "react-router-dom";
import Tasks from "./Tasks/Tasks";

function App() {
  return (
    <div className="App">
      <TopAppBar />
      <div className="App-sidebar-wrapper">
        <NavSidebar />
      </div>
      <div className="App-content-wrapper">
        <Switch>
          <Route exact path="/" render={() => <p>WELCOME</p>} />
          <Route exact path="/tasks" render={() => <Tasks />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
