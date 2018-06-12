import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import SecondPage from './SecondPage';
import SignUp from './SignUp';
import StepList from './StepList';
import Login from './Login';
import SuccessfulLogin from './SuccessfulLogin';
import CheckList from './components/CheckList';
import ReportForm from './components/ReportForm';
import GuidelineCategoryScene from './components/scenes/GuidelineCategoryScene';
import GuidelinesListScene from './components/scenes/GuidelinesListScene';
import Select from '../Select';
import ComparePhotosScene from './components/scenes/ComparePhotosScene';
import DownloadDataScene from './components/scenes/DownloadDataScene';

class Scenes extends Component {

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

  async userLogout() {
			try {
				await AsyncStorage.removeItem('token');
				Actions.SecondPage();
			} catch (error) {
				console.log(error.message);
			}
		}

  render() {
    if (!this.state.isTokenLoaded) {
      return (
        <ActivityIndicator />
      );
    }
    return (

          <Router>
            <Scene key="root">
                <Scene

                  key="SignUp"
                  component={SignUp}
                  title="SignUp"
                />

                <Scene
                 //initial={!this.state.hasToken}
                  key="SecondPage"
                  component={SecondPage}
                  title="SecondPage"
                  hideNavBar
                />

                <Scene

                  key="Login"
                  component={Login}
                  title="Login"
                  type="replace"

                />

                <Scene
                  key="StepList"
                  component={StepList}
                  title="Steps"
                />

                <Scene
                  key="Successful_Login"
                  component={SuccessfulLogin}
                  title="Schools"
                  onRight={() => {
                    this.userLogout();
                  }}
                  rightTitle='Log Out'

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
                  //initial={this.state.hasToken}
                  key="Select"
                  component={Select}
                  title="Select"
                  hideNavBar
                />


                <Scene
                  initial
                  key="DownloadDataScene"
                  component={DownloadDataScene}
                  hideNavBar
                />

                </Scene>
          </Router>
      );
    }

  }

export default Scenes;
