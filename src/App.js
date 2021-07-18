import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Articles from './components/Articles';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route exact path="/">
      <Login></Login>
      </Route>
      <Route exact path="/articles">
      <Articles></Articles>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
