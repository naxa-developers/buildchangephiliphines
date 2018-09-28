import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SecondPage from './SecondPage';
import SignUp from './SignUp';
import SignUpTest from './signuptest';
import BadPhoto from './components/scenes/BadPhoto';

import StepList from './StepList';
import Login from './Login';
import SuccessfulLogin from './SuccessfulLogin';
import SubStepsList from './components/SubStepsList';
import CheckList from './components/CheckList';
import ReportForm from './components/ReportForm';
import GuidelineCategoryScene from './components/scenes/GuidelineCategoryScene';
import GuidelinesListScene from './components/scenes/GuidelinesListScene';
import Select from '../Select';
import ComparePhotosScene from './components/scenes/ComparePhotosScene';
import DownloadDataScene from './components/scenes/DownloadDataScene';
import Onboarding from './components/scenes/Onboarding';
import ShowDocuments from './components/scenes/ShowDocuments';
import SettingsScene from './components/SettingsComponent';
import EngineerList from './components/EngineerList';

import ShowMap from './components/scenes/ShowMap';
import DocumentList from './components/scenes/DocumentList';
import { strings } from '../locales/strings';
import InternetStatus from './components/scenes/InternetStatus';
import Page1 from './test/page1';


class TabIcon extends Component {
  render() {
    var color = this.props.selected ? '#00f240' : '#301c2a';

    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
        <Icon style={{ color: color }} name={this.props.iconName || "circle"} size={18} />
      </View>
    );
  }
}

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

        <Scene

          component={Page1}
          key='Page1'
          hideNavBar
          //initial
        />
        <Scene

          component={SubStepsList}
          key='SubStepsList'
          title='SubSteps'
        />

        <Scene

          component={EngineerList}
          key='EngineerList'
          title='Call Engineers'
        />

        <Scene

          component={BadPhoto}
          key='BadPhoto'
        />


        <Scene

          component={SignUpTest}
          key='ram'
          hideNavBar
          //initial
        />

        <Scene
          initial={!this.state.hasToken}
          component={Onboarding}
          key='Onboarding'
          hideNavBar
        />
          <Scene key='SignUp' component={SignUp} title='SignUp' />

          <Scene
            key='SecondPage'
            component={SecondPage}
            title='SecondPage'
            hideNavBar
          />

          <Scene key='Login' component={Login} title='Login' type='replace' />

          <Scene key='StepList' component={StepList} title='Steps' />

          <Scene
            initial={this.state.hasToken}
            key='Successful_Login'
            component={SuccessfulLogin}
            title='Schools'
            onRight={() => {
              Actions.SettingsScene();
            }}
            rightButtonImage={require('../app_images/settingsicon.png')}
            rightButtonStyle={{ paddingLeft: 4 }}
          />
          <Scene key='CheckList' component={CheckList} title='Checklist' />
          <Scene key='ReportForm' component={ReportForm} title='Report form' />
          <Scene
            key='GuidelineCategoryScene'
            component={GuidelineCategoryScene}
            title={strings.title_guideline_categories}
            onRight={() => {
              Actions.SettingsScene();
            }}
            rightButtonImage={require('../app_images/settingsicon.png')}
            rightButtonStyle={{ paddingLeft: 4 }}
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
            back
          />
          <Scene
            component={InternetStatus}
            key='InternetStatus'
          />
          <Scene
          key="tabbar"
          tabs
          tabBarPosition='bottom'
          >
          <Scene key='StepList' title='Steps' icon={TabIcon} back component={StepList} iconName="list-ul" swipeEnabled />
            <Scene key="See Site on Map" title="See Site on Map" icon={TabIcon} back component={ShowMap} iconName="map-marker" swipeEnabled />
            <Scene key='Show Documents' title="Site Documents" icon={TabIcon} back component={DocumentList} iconName="file-pdf-o" swipeEnabled />
          </Scene>

        </Scene>
      </Router>
    );
  }
}

export default Scenes;
