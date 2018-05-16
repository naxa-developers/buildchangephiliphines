import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SecondPage from './src/SecondPage';
import SchoolList from './src/SchoolList';
import reducers from './src/reducers';
import Ram from './src/Ram';

class App extends Component {


  render() {
      return (
        <Provider store={createStore(reducers)}>
          <Router>
            <Scene key="root">
                <Scene
                  key="SchoolList"
                  component={SchoolList}
                  title="School List"
                />

                <Scene
                  key="SecondPage"
                  component={SecondPage}
                  title="SecondPage"
                  hideNavBar
                />

                <Scene
                  key="Sita"
                  component={Ram}
                  title="Hari"
                  initial
                  hideNavBar
                />
                </Scene>
          </Router>
        </Provider>
      );
    }
  }

export default App;
