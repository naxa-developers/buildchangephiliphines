import React from 'react';
import { Provider } from 'react-redux';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Scenes from './src/Scenes';
import { store } from './src/store';

class App extends React.Component {

  constructor(props) {
  super(props);
  Alert.alert('Username');
  PushNotification.configure({
    onRegister: function(token) {
        console.log(token)
        Alert.alert('ram ram ram '+token.token);
    },
    senderID: "6095782395",
    popInitialNotification: true,
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
