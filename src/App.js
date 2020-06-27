import React from "react";
import "./App.css";
import NavSidebar from "./NavSidebar/NavSidebar";
import TopAppBar from "./TopAppBar/TopAppBar";
import { Route, Switch } from "react-router-dom";
import Tasks from "./Tasks/Tasks";
import Starred from "./Starred/Starred";
import Emitter from "./services/Emitter";

function App() {
  const handleClick = () => {
    Emitter.emit("CLOSE_NAV_SIDE_BAR");
  };

  return (
    <div className="App">
      <TopAppBar />
      <div className="App-sidebar-wrapper">
        <NavSidebar />
      </div>
      <div className="App-center-content-wrapper" onClick={handleClick}>
        <Switch>
          <Route exact path="/" render={() => <p>WELCOME</p>} />
          <Route exact path="/tasks" render={() => <Tasks />} />
          <Route exact path="/starred" render={() => <Starred />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
