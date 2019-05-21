import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import RNFS from "react-native-fs";
import RNFetchBlob from "react-native-fetch-blob";
import { zip, unzip, unzipAssets, subscribe } from "react-native-zip-archive";
import { MainBundlePath, DocumentDirectoryPath } from "react-native-fs";

export default class DownloadDataScene extends Component {
  reactNativeFetchBlob() {
    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        path: RNFetchBlob.fs.dirs.DCIMDir + "/build_change_philippines.zip",
        description: "Images Zip",
        mediaScannable: true
      }
    })
      .fetch("GET", "http://bccms.naxa.com.np/core/project-material-photos/2")
      .then(resp => {
        const sourcePath = resp.path();
        const targetPath = resp.path().replace(".zip", "");

        unzip(sourcePath, targetPath)
          .then(path => {
            console.log(`unzip completed at ${path}`);
          })
          .catch(error => {
            console.log(error);
          });
      });
  }

  render() {
    console.log("DownloadData Scence render");
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Button
          title="react native fetch blob download test"
          onPress={this.reactNativeFetchBlob.bind(this)}
        />
      </View>
    );
  }
}
