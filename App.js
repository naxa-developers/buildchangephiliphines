import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import store from './src/reducers/store';
import SecondPage from './src/SecondPage';
import SignUp from './src/SignUp';
import StepList from './src/StepList';
import Login from './src/Login';
import SuccessfulLogin from './src/SuccessfulLogin';
import CheckList from './src/components/CheckList';
import ReportForm from './src/components/ReportForm';
import GuidelineCategoryScene from './src/components/scenes/GuidelineCategoryScene';
import GuidelinesListScene from './src/components/scenes/GuidelinesListScene';

import Select from './Select';

import ComparePhotosScene from './src/components/scenes/ComparePhotosScene';

class App extends Component {

  constructor() {
    super();
    this.state = { hasToken: false, isTokenLoaded: false };
  }

  componentWillMount() {
    AsyncStorage.getItem('token')
    .then((token) => {
      this.setState({ hasToken: token !== null, isTokenLoaded: true });
    });
  }
  render() {
    if (!this.state.isTokenLoaded) {
      return (
        <ActivityIndicator />
      );
    }
    return (

        <Provider store={store}>
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
                />

                <Scene
                  initial={!this.state.hasToken}
                  type="replace"
                  key="Login"
                  component={Login}
                  title="Login"
                  type="replace"
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
                <Scene
                  
                  key="GuidelineCategoryScene"
                  component={GuidelineCategoryScene}
                  title="Guideline Catergories"
                />

                <Scene
                  
                  key="GuidelinesListScene"
                  component={GuidelinesListScene}
                  title="Guidelines "
                />
    
                <Scene
                  
                  key="ComparePhotosScene"
                  component={ComparePhotosScene}
                  title="Compare photos"
                />
  

                <Scene
                  initial={this.state.hasToken}
                  key="Select"
                  component={Select}
                  title="Select"
                  hideNavBar
                  
                />

                </Scene>
          </Router>
        </Provider>
      );
    }

  }

export default App;
