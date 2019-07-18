import React, { Component } from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import { Actions, Router, Scene } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import SecondPage from "./SecondPage";
import SignUp from "./SignUp";
import BadPhoto from "./components/scenes/BadPhoto";
import StepList from "./StepList";
import Login from "./Login";
import SuccessfulLogin from "./SuccessfulLogin";
import SubStepsList from "./components/SubStepsList";
import Category from "./components/Category";
import CheckList from "./components/CheckList";
import ReportForm from "./components/ReportForm";
import ReportEngineer from "./components/ReportEngineer";
import ReportSchool from "./components/ReportSchool";
import GuidelineCategoryScene from "./components/scenes/GuidelineCategoryScene";
import GuidelinesListScene from "./components/scenes/GuidelinesListScene";
import First from "./components/scenes/First";
import GoodBad from "./components/scenes/goodbad";
import Address from "./components/scenes/Address";
import Select2 from "./components/scenes/Select2";
import HouseParts from "./components/scenes/HouseParts";
import Select3 from "./components/scenes/Select3";
import Select4 from "./components/scenes/Select4";
import Select5 from "./components/scenes/select5";
import MaterialPhoto from "./components/scenes/MaterialPhoto";
import Select from "../Select";
import ComparePhotosScene from "./components/scenes/ComparePhotosScene";
import DownloadDataScene from "./components/scenes/DownloadDataScene";
import Onboarding from "./components/scenes/Onboarding";
import ShowDocuments from "./components/scenes/ShowDocuments";
import ShowBigImages from "./components/scenes/ShowBigImages";
import Notification from "./components/scenes/Notification";
import SettingsScene from "./components/SettingsComponent";
import EngineerList from "./components/EngineerList";
import AdminList from "./components/AdminList";
import ShowMap from "./components/scenes/ShowMap";
import SitePlan from "./components/scenes/SitePlan";
import DocumentList from "./components/scenes/DocumentList";
import Responded from "./components/scenes/Responded";
import Pending from "./components/scenes/Pending";
import Rejected from "./components/scenes/Rejected";
import DraftList from "./components/DraftList";
import NotificationList from "./components/NotificationList";

import { strings, getLocalizedText } from "../locales/strings";
import InternetStatus from "./components/scenes/InternetStatus";
import Page1 from "./test/page1";

class TabIcon extends Component {
  render() {
    var color = this.props.selected ? "#00f240" : "#301c2a";

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          style={{ color: color }}
          name={this.props.iconName || "circle"}
          size={18}
        />
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
    this.getLocale();
    AsyncStorage.getItem("token").then(token => {
      this.setState({ hasToken: token !== null, isTokenLoaded: true });
    });
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem("token");
      Actions.SecondPage();
    } catch (error) {
      console.log(error.message);
    }
  }

  async getLocale() {
    try {
      const value = await AsyncStorage.getItem("locale");
      if (value) {
        strings.setLanguage(value);
      }
    } catch (err) {
      console.log("getLocale Err", err);
    }
  }

  render() {
    if (!this.state.isTokenLoaded) {
      return <ActivityIndicator />;
    }
    return (
      <Router>
        <Scene key="root">
          <Scene
            component={Page1}
            key="Page1"
            hideNavBar
            //initial
          />
          <Scene component={SubStepsList} key="SubStepsList" title="SubSteps" />
          <Scene
            component={Notification}
            key="Notification"
            title="Notification"
          />
          <Scene
            component={Category}
            key="Category"
            title="What Step on the Construction Do You Want to Monitor?"
            titleStyle={{ fontSize: 10 }}
          />
          <Scene component={ShowBigImages} key="ShowBigImages" hideNavBar />

          <Scene
            component={EngineerList}
            key="EngineerList"
            title="Call Engineers"
          />

          <Scene component={AdminList} key="AdminList" title="Call Admin" />

          <Scene component={SitePlan} key="SitePlan" title="Site Plan" />
          <Scene component={BadPhoto} key="BadPhoto" />
          <Scene component={GoodBad} key="GoodBad" />

          <Scene
            initial={!this.state.hasToken}
            component={Onboarding}
            key="Onboarding"
            hideNavBar
          />
          <Scene key="SignUp" component={SignUp} title="SignUp" />

          <Scene
            key="SecondPage"
            component={SecondPage}
            title="SecondPage"
            hideNavBar
          />

          <Scene key="Login" component={Login} title="Login" type="replace" />

          <Scene
            key="StepList"
            component={StepList}
            title={strings.title_steps}
            headerTitleAllowFontScaling={false}
            titleStyle={{ fontSize: 12 }}
          />

          <Scene
            //initial={this.state.hasToken}
            key="Successful_Login"
            component={SuccessfulLogin}
            title={strings.title_schools}
            onRight={() => {
              Actions.SettingsScene();
            }}
            rightButtonImage={require("../app_images/settingsicon.png")}
            rightButtonStyle={{ paddingLeft: 4 }}
          />
          <Scene key="CheckList" component={CheckList} title="Checklist" />
          <Scene key="ReportForm" component={ReportForm} title="Report form" />
          <Scene
            key="ReportEngineer"
            component={ReportEngineer}
            title="Report Engineer"
          />
          <Scene
            key="ReportSchool"
            component={ReportSchool}
            title="Report for School"
          />
          <Scene
            key="GuidelineCategoryScene"
            component={GuidelineCategoryScene}
            title={strings.title_guideline_categories}
            onRight={() => {
              Actions.SettingsScene();
            }}
            rightButtonImage={require("../app_images/settingsicon.png")}
            rightButtonStyle={{ paddingLeft: 4 }}
          />

          <Scene
            key="GuidelinesListScene"
            component={GuidelinesListScene}
            title={strings.title_guideline_details}
          />

          <Scene
            key="ComparePhotosScene"
            component={ComparePhotosScene}
            title="Compare photos"
          />

          <Scene
            //initial
            key="First"
            component={First}
            title="First"
            hideNavBar
          />
          <Scene
            //initial
            key="Address"
            component={Address}
            title={getLocalizedText(
              "HAIN TIM ESKWELAHAN?",
              "Where is your School?"
            )}
            back
            onRight={() => {
              Actions.NotificationList();
            }}
            rightButtonImage={require("../app_images/notification.png")}
            rightButtonStyle={{ paddingLeft: 4 }}
          />

          <Scene
            component={NotificationList}
            key="NotificationList"
            title="Notifications"
          />

          <Scene component={DraftList} key="DraftList" title="Drafts" />
          <Scene
            //initial
            key="Select2"
            component={Select2}
            title="Information"
            back
          />
          <Scene
            //initial
            key="Select3"
            component={Select3}
            title="Information"
            back
          />
          <Scene
            //initial
            key="Select4"
            component={Select4}
            title={getLocalizedText("AN TULO KA K's", "The Three C's")}
            back
          />
          <Scene
            //initial
            key="Select5"
            component={Select5}
            titleStyle={{ fontSize: 17 }}
            back
          />
          <Scene
            key="MaterialPhoto"
            component={MaterialPhoto}
            title="Photos"
            back
          />
          <Scene
            initial={this.state.hasToken}
            renderLeftButton={() => <View />}
            key="Select"
            component={Select}
            title={strings.view_select_header}
            titleStyle={{ flex: 1, textAlign: "center" }}
          />
          <Scene
            //initial
            key="HouseParts"
            component={HouseParts}
            title="HouseParts"
            back
          />

          <Scene
            key="DownloadDataScene"
            component={DownloadDataScene}
            hideNavBar
          />
          <Scene
            key="ShowDocuments"
            component={ShowDocuments}
            title={"Pdf"}
            back
          />
          <Scene
            component={ShowMap}
            key="ShowMap"
            title="Site Location on Map"
          />
          <Scene
            component={DocumentList}
            key="DocumentList"
            title="List of Documents"
          />

          <Scene
            component={SettingsScene}
            key="SettingsScene"
            title={strings.action_setting}
            back
          />
          <Scene component={InternetStatus} key="InternetStatus" />
          <Scene key="tabbar" tabs tabBarPosition="bottom">
            <Scene
              key="Responded"
              title="Responded"
              icon={TabIcon}
              back
              component={Responded}
              iconName="eye"
              swipeEnabled
            />
            <Scene
              key="Pending"
              title="Pending"
              icon={TabIcon}
              back
              component={Pending}
              iconName="eye-slash"
              swipeEnabled
            />
            <Scene
              key="Rejected"
              title="Rejected"
              icon={TabIcon}
              back
              component={Rejected}
              iconName="close"
              swipeEnabled
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default Scenes;
