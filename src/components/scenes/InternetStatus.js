import React, { Component } from 'react';
import { Text, NetInfo, Alert } from 'react-native';
import { checkInternetConnection } from 'react-native-offline';


class InternetStatus extends Component {
  constructor() {
    console.log('constructor_bhitra');
    super();
    this.state = {
      internetAvailable: true
   };
  }

  componentDidMount() {
    console.log('component_did_mount_ko_bhitra');
    checkInternetConnection().then(res => {
      console.log(res);
      NetInfo.isConnected.fetch().then(isConnected => {
        console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        Alert.alert(isConnected ? 'online' : 'offline');
        if (!isConnected) {
          this.setState({ internetAvailable: false })
        }
      });
    });

  }


  render() {
    console.log('render bhitra');
    if (this.state.internetAvailable) {
      return (<Text> Working Internet Connection!</Text>);
    }
    return (<Text>Something went wrong! Check your internet connection! Reload!</Text>);
  }
}

export default InternetStatus;
