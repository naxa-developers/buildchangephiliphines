import React from "react";
import { Provider } from "react-redux";
import { Alert, AppState } from "react-native";
import PushNotification from "react-native-push-notification";
import Scenes from "./src/Scenes";
import { store } from "./src/store";
import FlashMessage from "react-native-flash-message";
class App extends React.Component {
  constructor(props) {
    super();
    PushNotification.configure({
      onNotification: function(notification) {
        if (notification.hasOwnProperty("notification")) {
          //const notif = JSON.parse(notification.report_data);
          //Alert.alert('Admin sent feedback ' + notif.feedback + ' for substep ' + notif.substep + ' in step ' + notif.step + 'in ' + notif.site);
          //Alert.alert('ram');
          console.log("NOtification", notification);
        }
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Scenes />
          <FlashMessage position="top" />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
