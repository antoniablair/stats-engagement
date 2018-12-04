import React from 'react';
import { Route, Switch, } from 'react-router-dom';
import Help from './components/Help';
import GameLogicContainer from './components/GameLogicContainer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={GameLogicContainer}/>
          <Route exact path="/help" component={Help}/>
        </Switch>
      </div>
    );
  }
}

export default App;
