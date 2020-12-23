import "./App.css";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Upload from "./Upload";
import Towns from "./Towns";
import Landscapes from "./Landscapes";
import Restaurants from "./Restaurants";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Underwater from "./Underwater";
import Signup from "./Signup";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path="/underwater">
            <Header />
            <Underwater />
          </Route>
          <Route path="/upload">
            <Header />
            <Upload />
          </Route>
          <Route path="/towns">
            <Header />
            <Towns />
          </Route>
          <Route path="/landscapes">
            <Header />
            <Landscapes />
          </Route>
          <Route path="/restaurants">
            <Header />
            <Restaurants />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
