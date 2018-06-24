import React, { Component } from 'react';
import { Text, NetInfo } from 'react-native';


class InternetStatus extends Component {
  constructor() {
    super();
    this.state = {
      internetAvailable: true
   };
  }


  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
      if (!isConnected) {
        this.setState({ internetAvailable: false })
      }
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
