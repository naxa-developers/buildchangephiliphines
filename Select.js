import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage, Text, Image, TouchableOpacity } from 'react-native';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import RNFetchBlob from 'react-native-fetch-blob';
import LinearGradient from 'react-native-linear-gradient';
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
  console.log('react_native_fetch_blob_bhitra');
  console.log(RNFetchBlob.fs.dirs);
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
            .fetch('GET', 'http://bccms.naxa.com.np/core/project-material-photos/1')
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
    const { height, width } = Dimensions.get('window');
    this.reactNativeFetchBlob();
    return (
      <View style={{ position: 'relative', overflow: 'hidden' }}>
        <View style={{ height: 30, position: 'absolute', left: -5, right: -5, top: height / 2 - 15, backgroundColor: '#FFF', zIndex: 10, transform: [{ rotate: '4deg'}] }} />
        <TouchableOpacity onPress={() => Actions.Successful_Login()} activeOpacity={0.6}>
                    <View style={{ position: 'relative', height: height / 2, width }}>
                          <View style={{ position: 'absolute', zIndex: 9, left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '#00A2E8', opacity: 0.7}} />
                           <Image style={{ height: height / 2, width }} source={require('./app_images/schools_background.jpg')} blurRadius={5} />
                           <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white'}}>{strings.view_schools_title}</Text>
                            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{strings.view_schools_subtitle}</Text>
                           </View>

                    </View>
                    </TouchableOpacity>
                  <TouchableOpacity onPress={() => Actions.GuidelineCategoryScene()} activeOpacity={0.6}>
        <View style={{ position: 'relative', height: height / 2, width }}>
              <View style={{ position: 'absolute', zIndex: 9, left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '#22B14C', opacity: 0.7}} />
              <Image style={{ height: height / 2, width }} source={require('./app_images/guidelines_background.jpg')} blurRadius={5} />
              <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 10, alignItems: 'center', justifyContent: 'center'}}>
               <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white'}}>{strings.view_guidelines_title}</Text>
               <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{strings.view_guidelines_subtitle}</Text>
              </View>

        </View>
        </TouchableOpacity>
      </View>

    );
  }
}

export default Select;
