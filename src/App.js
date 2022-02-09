import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Header,
  ListApplications,
  AddApplication,
  ViewApplication,
  EditApplication,
  ViewTrace,
  ViewDump
} from "./components";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ListApplications} />
        <Route path="/add" component={AddApplication} />
        <Route path="/app/:appID" component={ViewApplication} />
        <Route path="/edit/:appID" component={EditApplication} />
        <Route path="/trace/:appID/:frameID" component={ViewTrace} />
        <Route path="/dump/:appID/:callID" component={ViewDump} />
      </Switch>
    </Router>
  );
}

export default App;
