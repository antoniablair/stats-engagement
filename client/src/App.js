import React from 'react';
import { Route, Switch, } from 'react-router-dom';
import './components/Home.css';
import Admin from './components/Admin';
import Home from './components/Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/admin" component={Admin}/>
        </Switch>
      </div>
    );
  }
}

export default App;
