import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LaunchesPage from "./LaunchesPages";
import LaunchDetailPage from "./LauchDetailPage";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>SpaceX Launches</h1>
        <Switch>
          <Route exact path="/" component={LaunchesPage} />
          <Route path="/launch/:flightNumber" component={LaunchDetailPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
