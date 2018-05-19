import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SecondPage from './src/SecondPage';
import SignUp from './src/SignUp';
import reducers from './src/reducers';
import StepList from './src/StepList';
import Login from './src/Login';
import SuccessfulLogin from './src/SuccessfulLogin';
import CheckList from './src/components/CheckList';
import ReportForm from './src/components/ReportForm';

class App extends Component {


  render() {
      return (

        <Provider store={createStore(reducers)}>
          <Router>
            <Scene key="root">
                <Scene
                  key="SignUp"
                  component={SignUp}
                  title="SignUp"
                />

                <Scene
                  key="SecondPage"
                  component={SecondPage}
                  title="SecondPage"
                  hideNavBar
                  initial
                />

                <Scene
                  key="Login"
                  component={Login}
                  title="Login"
                />

                <Scene
                  key="StepList"
                  component={StepList}
                  title="Step list"
                />

                <Scene
                  key="Successful_Login"
                  component={SuccessfulLogin}
                  title="Site list"
                />
                <Scene
                  key="CheckList"
                  component={CheckList}
                  title="Checklist"
                />
                <Scene
                  key="ReportForm"
                  component={ReportForm}
                  title="Report form"
                  
                  
                />
                </Scene>
          </Router>
        </Provider>
      );
    }
  }

export default App;
