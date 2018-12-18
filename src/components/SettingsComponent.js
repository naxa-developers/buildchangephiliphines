import React, { Component } from 'react';
import {
  SettingsCategoryHeader,
  SettingsPicker
} from 'react-native-settings-components';
import { Actions } from 'react-native-router-flux';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import RNFetchBlob from 'react-native-fetch-blob';
import { checkInternetConnection } from 'react-native-offline';
import { ScrollView, Platform, AsyncStorage, Alert, View, Text, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { strings } from './../../locales/strings';

export default class SettingsScene extends Component {
  constructor() {
    super();
    this.state = {
      locale: '',
      gender: ''
    };
  }

  componentDidMount() {
    let value;
    console.log(strings.getLanguage().trim());

    switch (strings.getLanguage().trim()) {
      case 'wa':
        value = 'Warray';
        break;
      default:
        value = 'English';
        break;
    }

    this.setState({
      locale: value
    });
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('token');
      Actions.SecondPage();
    } catch (error) {
      console.log(error.message);
    }
  }

  async requestStoragePermission() {
    try {
     const granted = await PermissionsAndroid.request(
       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
       {
         'title': 'Storage Permission Needed',
         'message': 'App requires storage permission to store data for offline usage '
       }
     )
     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
       console.log("You can use the storage")
       this.downloadZip();
     } else {
       console.log("Storage permission denied")
     }
   } catch (err) {
     console.warn(err)
   }
  }

  downloadZip() {
        checkInternetConnection().then(res => {
          if (res) {
            RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
                .then((exist) => {
                    if (!exist) {
                      RNFetchBlob
                      .config({
                          addAndroidDownloads: {
                              useDownloadManager: true,
                              //changes here
                              path: RNFetchBlob.fs.dirs.SDCardApplicationDir + '/build_change_philippines.zip',
                              description: 'Images Zip',
                              mediaScannable: true,
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
          } else if (!res) {
            Alert.alert('No internet connection!');
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }

  downloadLatestZip() {
    RNFetchBlob.fs.unlink('/storage/emulated/0/Android/data/com.guide/build_change_philippines.zip')
      .then(() => {
        console.log('deleted zip');
        RNFetchBlob.fs.unlink('/storage/emulated/0/Android/data/com.guide/build_change_philippines')

        .then(() => {
          console.log('deleted extracted file');
          this.requestStoragePermission();
        })
        .catch((err) => { console.log(err); });
      })
      .catch((err) => { console.log(err); });
  }

  render() {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          backgroundColor:
            Platform.OS === 'ios' ? colors.iosSettingsBackground : colors.white
        }}
      >
        <View>
        <SettingsCategoryHeader
          title={''}
          textStyle={Platform.OS === 'android' ? { color: colors.monza } : null}
        />

        <SettingsPicker
          title='Language'
          dialogDescription={'Choose your language.'}
          possibleValues={[
            { label: '...', value: '...' },
            { label: 'English', value: 'English' },
            { label: 'Warray', value: 'Warray' }
          ]}
          negativeButtonTitle={'Cancel'}
          positiveButtonTitle={'Save'}
          onSaveValue={value => {
            console.log('locale:', value);

            switch (value) {
              case 'Warray':
                AsyncStorage.setItem('locale', 'wa');
                break;
              default:
                AsyncStorage.setItem('locale', 'en');
                break;
            }

            this.setState({
              locale: value
            });

            Alert.alert('App restart required to change langugage');
          }}
          value={this.state.locale}
          styleModalButtonsText={{ color: colors.monza }}
        />
        </View>
        <View style={{ paddingBottom: 10 }}>
        <View style={{ paddingBottom: 20 }}>
          <Button
            onPress={this.downloadLatestZip.bind(this)}
            style={{ width: 10 }}
            title='DOWNLOAD LATEST ZIP'
            backgroundColor='green'
          />
        </View>
        <Button
          onPress={this.userLogout.bind(this)}
          style={{ width: 10 }}
          title='LOGOUT'
          backgroundColor='red'
        />
        </View>

      </View>
    );
  }
}

const colors = {
  iosSettingsBackground: 'rgb(235,235,241)',
  white: '#FFFFFF',
  monza: '#C70039',
  switchEnabled: Platform.OS === 'android' ? '#C70039' : null,
  switchDisabled: Platform.OS === 'android' ? '#efeff3' : null,
  switchOnTintColor: Platform.OS === 'android' ? 'rgba(199, 0, 57, 0.6)' : null,
  blueGem: '#27139A'
};
