import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import SecondPage from './src/SecondPage';
import SchoolList from './src/SchoolList';
import Login from './src/Login';


class App extends Component {


  render() {
      return (
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
                          initial
                          hideNavBar
                        />

                        <Scene
                          key="Login"
                          component={Login}
                          title="Login"
                        />

                  </Scene>

        </Router>
      );
    }
  }

export default App;
