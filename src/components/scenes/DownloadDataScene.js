import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ListView,
  TextInput,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from "react-native";
import { ListItem, Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import RNFS from "react-native-fs";

export default class DownloadDataScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDownloadCompleted: false,
      msg: ''
    };
  }

  onDownloadButtonPress() {
    this.setState({ msg: 'Download Starting' });
    RNFS.downloadFile({
      fromUrl: 'https://facebook.github.io/react-native/img/header_logo.png',
      toFile: `${RNFS.DocumentDirectoryPath}/react-native.png`
    }).promise.then(r => {
      this.setState({ msg: 'Download Completed' });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text> Downloading data for offline use</Text>
        <Text> {this.state.msg}</Text>
        <Button
          title="DOWNLOAD"
          onPress={this.onDownloadButtonPress.bind(this)}
        />


      </View>
    );
  }
}
