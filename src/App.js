import React from "react";
import "./App.css";
import NavSidebar from "./NavSidebar/NavSidebar";
import TopAppBar from "./TopAppBar/TopAppBar";
import { Route, Switch } from "react-router-dom";
import RenderList from "./RenderList/RenderList";
import Emitter from "./services/Emitter";
import Starred from "./Starred/Starred";
import Lists from "./Lists/Lists";
import RetrieveOrphanTaskList from "./RetrieveOrphanTaskList/RetrieveOrphanTaskList";
import ConfirmationDialog from "./ConfirmationDialog/ConfirmationDialog";

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
          <Route
            exact
            path="/tasks"
            render={() => <RetrieveOrphanTaskList />}
          />
          <Route
            exact
            path="/tasks/:listID?"
            render={(routeProps) => (
              <RenderList listID={routeProps.match.params.listID} />
            )}
          />
          <Route exact path="/starred" render={() => <Starred />} />
          <Route exact path="/lists" render={() => <Lists />} />
        </Switch>
      </div>
      <ConfirmationDialog />
    </div>
  );
}

export default App;
