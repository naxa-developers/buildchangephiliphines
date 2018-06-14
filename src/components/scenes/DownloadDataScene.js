import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import RNFS from 'react-native-fs';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';


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
      fromUrl: 'http://bccms.naxa.com.np/core/project-material-photos/2',
      toFile: `${RNFS.DocumentDirectoryPath}/photos.zip`
    }).promise.then(r => {
      this.setState({ msg: 'Download Completed' });
    });
  }

  onFileSystemButtonPress() {
    console.log(`${DocumentDirectoryPath}/photos.zip`);

    const sourcePath = `${DocumentDirectoryPath}/photos.zip`
    const targetPath = DocumentDirectoryPath

    unzip(sourcePath, targetPath)
    .then((path) => {
      console.log(`unzip completed at ${path}`)
    })
    .catch((error) => {
      console.log(error)
    })










    // get a list of files and directories in the main bundle
RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    console.log('GOT RESULT', result);
console.log(RNFS.stat(result[0].path));
    // stat the first file
   console.log(Promise.all([RNFS.stat(result[0].path), result[0].path]));
  //  return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  return result;
  })
  .then((statResult) => {
    console.log(statResult[0]);
    if (statResult[0].isFile()) {
      // if we have a file, read it
      // return RNFS.readFile(statResult[1], 'utf8');
      console.log('ram');
     //RNFS.readFile(statResult[1], 'utf8');
     console.log(RNFS.readFile(statResult[1], 'utf8'));
    }
    return 'no file';
  })
  .then((contents) => {
    // log the file contents
    console.log(contents);
  })
  .catch((err) => {
    console.log(err.message, err.code);
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
        <Button
          title='filesystem'
          onPress={this.onFileSystemButtonPress.bind(this)}
        />
<Image source={{ uri: 'file:///data/user/0/com.guide/files/media/material/bad_photo/2018/05/05/23/18/Steel_Plate_with_rust.jpg' }} style={{ height: 200, width: 200 }}/>
<Image source={{ uri: 'file:///data/user/0/com.guide/files/media/material/bad_photo/2018/05/05/20/18/drone.png' }} style={{ height: 200, width: 200 }}/>

      </View>
    );
  }
}
