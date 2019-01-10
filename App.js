import React from 'react';
import { Provider } from 'react-redux';
import { Alert, AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Scenes from './src/Scenes';
import { store } from './src/store';

class App extends React.Component {

  constructor() {
    console.log('hello from constructor');
    super();
    PushNotification.configure({
      onNotification: function(notification) {
        if (notification.hasOwnProperty('notification')) {
          //const notif = JSON.parse(notification.report_data);
          //Alert.alert('Admin sent feedback ' + notif.feedback + ' for substep ' + notif.substep + ' in step ' + notif.step + 'in ' + notif.site);
          Alert.alert('ram');
          console.log('NOtification', notification);
        }
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Scenes />
      </Provider>
    );
  }
}

export default App;
