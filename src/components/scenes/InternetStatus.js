import React, { Component } from "react";
import { Text, NetInfo, Alert } from "react-native";
import { checkInternetConnection } from "react-native-offline";

class InternetStatus extends Component {
  constructor() {
    super();
    this.state = {
      internetAvailable: true
    };
  }

  componentDidMount() {
    checkInternetConnection().then(res => {
      NetInfo.isConnected.fetch().then(isConnected => {
        Alert.alert(isConnected ? "online" : "offline");
        if (!isConnected) {
          this.setState({ internetAvailable: false });
        }
      });
    });
  }

  render() {
    if (this.state.internetAvailable) {
      return <Text> Working Internet Connection!</Text>;
    }
    return (
      <Text>Something went wrong! Check your internet connection! Reload!</Text>
    );
  }
}

export default InternetStatus;
