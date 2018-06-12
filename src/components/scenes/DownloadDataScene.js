import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import RNFS from 'react-native-fs';


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
      fromUrl: 'http://bccms.naxa.com.np/core/project-material-photos/1',
      toFile: `${RNFS.DocumentDirectoryPath}/photos.zip`
    }).promise.then(r => {
      this.setState({ msg: 'Download Completed' });
    });
  }

  onFileSystemButtonPress() {
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

      </View>
    );
  }
}
