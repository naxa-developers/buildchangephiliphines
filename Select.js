import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage } from 'react-native';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import RNFetchBlob from 'react-native-fetch-blob';

import { Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { strings } from './locales/strings';


class Select extends Component {

  state = {
    isLoadingLocale: true
  };

  componentDidMount() {
    this.getLocale();
  }


  async getLocale() {
    return await AsyncStorage.getItem('locale').then((value) => {
      strings.setLanguage(value);
      this.setState({
        isLoading: false
      });
    });
}
reactNativeFetchBlob() {
  RNFetchBlob.fs.exists('/storage/emulated/0/DCIM/build_change_philippines')
      .then((exist) => {
          if (!exist) {
            RNFetchBlob
            .config({
                addAndroidDownloads: {
                    useDownloadManager: true,
                    path: RNFetchBlob.fs.dirs.DCIMDir + '/build_change_philippines.zip',
                    description: 'Images Zip',
                    mediaScannable: true
                }
            })
            .fetch('GET', 'http://bccms.naxa.com.np/core/project-material-photos/2')
            .then((resp) => {
              const sourcePath = resp.path();
              const targetPath = resp.path().replace('.zip', '');

              unzip(sourcePath, targetPath)
              .then((path) => {
                console.log(`unzip completed at ${path}`);
              })
              .catch((error) => {
                console.log(error);
              });
            });
          }
      })
      .catch(() => {
          console.log('error while checking file');
      });
}

  render() {
    const { height } = Dimensions.get('window');
    this.reactNativeFetchBlob();

    // strings.setLanguage(this.getLocale());

    return (
      <View>
          <Tile
            titleStyle={{ fontSize: 40 }}
            captionStyle={{ fontSize: 20 }}
            imageSrc={require('./app_images/schools_background.jpg')}
            title={strings.view_schools_title}
            titleStyle={{ fontSize: 40 }}
            height={height * 0.5}
            featured
            caption={strings.view_schools_subtitle}
            onPress={() => Actions.Successful_Login()}
            captionStyle={{ fontSize: 25 }}
          />
          <Tile
            titleStyle={{ fontSize: 40 }}
            captionStyle={{ fontSize: 20 }}
            imageSrc={require('./app_images/guidelines_background.jpg')}
            title={strings.view_guidelines_title}
            height={height * 0.5}
            titleStyle={{ fontSize: 40 }}
            featured
            caption={strings.view_guidelines_subtitle}
            onPress={() => Actions.GuidelineCategoryScene()}
            captionStyle={{ fontSize: 25 }}
          />
      </View>
    );
  }
}

export default Select;


//
//
//
// reactNativeFetchBlob() {
//   RNFetchBlob
//   .config({
//       addAndroidDownloads: {
//           useDownloadManager: true,
//           path: RNFetchBlob.fs.dirs.DCIMDir + '/build_change_philippines.zip',
//           description: 'Images Zip',
//           mediaScannable: true
//       }
//   })
//   .fetch('GET', 'http://bccms.naxa.com.np/core/project-material-photos/2')
//   .then((resp) => {
//     const sourcePath = resp.path();
//     const targetPath = resp.path().replace('.zip', '');
//     console.log(resp.path());
//     console.log(resp.path().replace('.zip', ''));
//
//     unzip(sourcePath, targetPath)
//     .then((path) => {
//       console.log(`unzip completed at ${path}`);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   });
// }
