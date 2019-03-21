import React, {Component} from 'react';
import Game from './Game';
import './App.css';

/** Simple app that just shows the LightsOut game. */

class App extends Component {
  render() {
    return (
        <div className="App">
          <Game/>
        </div>
    );
  }
}

export default App;
