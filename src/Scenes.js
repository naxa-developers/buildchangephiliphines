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
import ShowDocuments from './components/scenes/ShowDocuments';
import SettingsScene from './components/SettingsComponent';
import ShowMap from './components/scenes/ShowMap';
import DocumentList from './components/scenes/DocumentList';
import { strings, getLocalizedText } from '../locales/strings';
import InternetStatus from './components/scenes/InternetStatus';

class Scenes extends Component {
  constructor() {
    super();
    this.state = { hasToken: false, isTokenLoaded: false };
  }

  componentWillMount() {
    AsyncStorage.getItem('token').then(token => {
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
      return <ActivityIndicator />;
    }
    return (
      <Router>
        <Scene key='root'>
          <Scene key='SignUp' component={SignUp} title='SignUp' />

          <Scene
            initial={!this.state.hasToken}
            key='SecondPage'
            component={SecondPage}
            title='SecondPage'
            hideNavBar
          />

          <Scene key='Login' component={Login} title='Login' type='replace' />

          <Scene key='StepList' component={StepList} title='Steps' />

          <Scene
            key='Successful_Login'
            component={SuccessfulLogin}
            title='Schools'
            onRight={() => {
              Actions.SettingsScene();
            }}
            rightTitle='setting'
          />
          <Scene key='CheckList' component={CheckList} title='Checklist' />
          <Scene key='ReportForm' component={ReportForm} title='Report form' />
          <Scene
            key='GuidelineCategoryScene'
            component={GuidelineCategoryScene}
            title={strings.title_guideline_categories}
          />

          <Scene
            key='GuidelinesListScene'
            component={GuidelinesListScene}
            title={strings.title_guideline_details}
          />

          <Scene
            key='ComparePhotosScene'
            component={ComparePhotosScene}
            title='Compare photos'
          />

          <Scene
            initial={this.state.hasToken}
            key='Select'
            component={Select}
            title='Select'
            hideNavBar
          />

          <Scene
            key='DownloadDataScene'
            component={DownloadDataScene}
            hideNavBar
          />
          <Scene
            //  initial
            key='ShowDocuments'
            component={ShowDocuments}
            hideNavBar
          />
          <Scene
            component={ShowMap}
            key='ShowMap'
            title='Site Location on Map'
          />
          <Scene
            component={DocumentList}
            key='DocumentList'
            title='List of Documents'
          />

          <Scene
            component={SettingsScene}
            key='SettingsScene'
            title='Settings'
          />
          <Scene
            component={InternetStatus}
            key='InternetStatus'
          />
        </Scene>
      </Router>
    );
  }
}

export default Scenes;
