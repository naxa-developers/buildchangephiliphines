import React from 'react';
import { Provider } from 'react-redux';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Scenes from './src/Scenes';
import { store } from './src/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Scenes />
      </Provider>
    );
  }
}

export default App;
