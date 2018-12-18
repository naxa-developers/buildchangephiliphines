// import React, { Component } from 'react';
// import { StyleSheet, View, Alert, ListView, ActivityIndicator, AsyncStorage, PermissionsAndroid
// } from 'react-native';
// import { connect } from 'react-redux';
// import { unzip } from 'react-native-zip-archive';
// import RNFetchBlob from 'react-native-fetch-blob';
// import { checkInternetConnection } from 'react-native-offline';
// import PlaceholderListItem from './components/PlaceholderListItem';
// import { tappedOnViewSchools, intelliSearch, checkOnline } from './actions';
// import { strings } from './../locales/strings';
//
// class SuccessfulLogin extends Component {
//
//   componentWillMount() {
//     console.log('componentDidMountkobhitra');
//     this.getLocale();
//     AsyncStorage.getItem('token')
//        .then(token => {
//          console.log('AsyncStorageko_bhitra');
//          this.props.tappedOnViewSchools(token);
// });
//     this.requestStoragePermission();
//   }
//
//   async getLocale() {
//     return await AsyncStorage.getItem('locale').then((value) => {
//       strings.setLanguage(value);
//     });
// }
//
//   downloadZip() {
//         checkInternetConnection().then(res => {
//           if (res) {
//             RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
//                 .then((exist) => {
//                     if (!exist) {
//                       RNFetchBlob
//                       .config({
//                           addAndroidDownloads: {
//                               useDownloadManager: true,
//                               //changes here
//                               path: RNFetchBlob.fs.dirs.SDCardApplicationDir + '/build_change_philippines.zip',
//                               description: 'Images Zip',
//                               mediaScannable: true,
//                           }
//                       })
//                       .fetch('GET', 'http://bccms.naxa.com.np/core/project-material-photos/1')
//                       .then((resp) => {
//                         const sourcePath = resp.path();
//                         const targetPath = resp.path().replace('.zip', '');
//
//                         unzip(sourcePath, targetPath)
//                         .then((path) => {
//                           console.log(`unzip completed at ${path}`);
//                         })
//                         .catch((error) => {
//                           console.log(error);
//                         });
//                       });
//                     }
//                 })
//                 .catch(() => {
//                     console.log('error while checking file');
//                 });
//           } else if (!res) {
//             Alert.alert('No internet connection!');
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//   }
//
//
//
//
// async requestStoragePermission() {
//   try {
//    const granted = await PermissionsAndroid.request(
//      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//      {
//        'title': 'Storage Permission Needed',
//        'message': 'App requires storage permission to store data for offline usage '
//      }
//    )
//    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//      console.log("You can use the camera")
//      this.downloadZip();
//    } else {
//      console.log("Camera permission denied")
//    }
//  } catch (err) {
//    console.warn(err)
//  }
// }
//   ListViewItemSeparator = () => (
//       <View
//         style={{
//           height: 0.5,
//           width: '100%',
//           backgroundColor: '#ddd',
//         }}
//       />
//     )
//
//
//   render() {
//     console.log('SuccessfulLogin_ko_render');
//     if (this.props.isLoading) {
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <ActivityIndicator />
//         </View>
//       );
//     }
//
//     return (
//
//       <View style={styles.MainContainer}>
//
//       <ListView
//         dataSource={this.props.list.cloneWithRows(this.props.daram)}
//
//         renderSeparator={this.ListViewItemSeparator}
//
//         renderRow={(rowData) => <PlaceholderListItem
//           rowData={rowData}
//
//           style={styles.rowViewContainer}
//         >
//          {rowData.name}
//          </PlaceholderListItem>}
//
//         enableEmptySections
//
//         style={{ marginTop: 10 }}
//
//       />
//
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//
//  MainContainer: {
//   flex: 1,
//   margin: 7,
//
//   },
//
//  rowViewContainer: {
//    fontSize: 17,
//    padding: 10
//   },
//
//   TextInputStyleClass: {
//
//    textAlign: 'left',
//    height: 40,
//    borderWidth: 1,
//    borderColor: 'rgba(0, 0, 0, 0.2)',
//    borderRadius: 0,
//    backgroundColor: '#FFFFFF',
//    paddingLeft: 15,
//    paddingRight: 15
//
//  },
//  addressContainer: {
//    backgroundColor: 'white'
//  },
//  addressText: {
//    color: 'black',
//    fontSize: 23,
//    fontWeight: 'bold',
//    paddingLeft: 5
//  }
//
// });
//
// const mapStateToProps = (state) => {
//   console.log('SuccessfulLogin_map_state_to_props', state);
//   let ds = new ListView.DataSource({
//     rowHasChanged: (r1, r2) => r1 !== r2,
//   });
//
//   const Daram = state.schoolList.data.sites.filter(function (school) {
//     const schoolAddress = school.address.toUpperCase();
//     return schoolAddress.indexOf(state.currentSelectedAddress.currentSelectedAddress.toUpperCase()) > -1;
//   });
//
//   return {
//             isLoading: state.schoolList.isLoading,
//             list: ds,
//             daram: Daram,
//          };
// };
//
// export default connect(mapStateToProps, { tappedOnViewSchools, intelliSearch, checkOnline })(SuccessfulLogin);




import React, { Component } from 'react';
import { StyleSheet, View, Alert, ListView, ActivityIndicator, AsyncStorage, PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { unzip } from 'react-native-zip-archive';
import RNFetchBlob from 'react-native-fetch-blob';
import { checkInternetConnection } from 'react-native-offline';
import PlaceholderListItem from './components/PlaceholderListItem';
import { tappedOnViewSchools, intelliSearch, checkOnline, setDownloadInfo } from './actions';
import { strings } from './../locales/strings';

class SuccessfulLogin extends Component {

  componentWillMount() {
    console.log('componentDidMountkobhitra');
    this.getLocale();
    AsyncStorage.getItem('token')
       .then(token => {
         console.log('AsyncStorageko_bhitra');
         this.props.tappedOnViewSchools(token);
});
    this.requestStoragePermission();
  }

  async getLocale() {
    return await AsyncStorage.getItem('locale').then((value) => {
      strings.setLanguage(value);
    });
}

  downloadZip() {
        checkInternetConnection().then(res => {
          if (res) {
            if (!this.props.hasDownloadStarted) {
              console.log('rameeee');
              RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
                  .then((exist) => {
                      if (!exist) {
                        this.props.setDownloadInfo({ hasDownloadStarted: true });
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
                          this.props.setDownloadInfo({ hasDownloadStarted: false });
                          const sourcePath = resp.path();
                          const targetPath = resp.path().replace('.zip', '');

                          unzip(sourcePath, targetPath)
                          .then((path) => {
                            console.log(`unzip completed at ${path}`);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                        })
                        .catch((error) => {
                          this.props.setDownloadInfo({ hasDownloadStarted: false });
                          console.log('RNFetchBlobko_error', error);
                        });
                      }
                  })
                  .catch((error) => {
                    console.log(error);
                      console.log('error while checking file');
                  });
            }

          } else if (!res) {
            Alert.alert('No internet connection!');
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
     console.log("You can use the camera")
     this.downloadZip();
   } else {
     console.log("Camera permission denied")
   }
 } catch (err) {
   console.warn(err)
 }
}
  ListViewItemSeparator = () => (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#ddd',
        }}
      />
    )


  render() {
    console.log('SuccessfulLogin_ko_render');
    if (this.props.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>

      <ListView
        dataSource={this.props.list.cloneWithRows(this.props.daram)}

        renderSeparator={this.ListViewItemSeparator}

        renderRow={(rowData) => <PlaceholderListItem
          rowData={rowData}

          style={styles.rowViewContainer}
        >
         {rowData.name}
         </PlaceholderListItem>}

        enableEmptySections

        style={{ marginTop: 10 }}

      />

      </View>
    );
  }
}

const styles = StyleSheet.create({

 MainContainer: {
  flex: 1,
  margin: 7,

  },

 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },

  TextInputStyleClass: {

   textAlign: 'left',
   height: 40,
   borderWidth: 1,
   borderColor: 'rgba(0, 0, 0, 0.2)',
   borderRadius: 0,
   backgroundColor: '#FFFFFF',
   paddingLeft: 15,
   paddingRight: 15

 },
 addressContainer: {
   backgroundColor: 'white'
 },
 addressText: {
   color: 'black',
   fontSize: 23,
   fontWeight: 'bold',
   paddingLeft: 5
 }

});

const mapStateToProps = (state) => {
  console.log('SuccessfulLogin_map_state_to_props', state);
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const Daram = state.schoolList.data.sites.filter(function (school) {
    const schoolAddress = school.address.toUpperCase();
    return schoolAddress.indexOf(state.currentSelectedAddress.currentSelectedAddress.toUpperCase()) > -1;
  });

  return {
            isLoading: state.schoolList.isLoading,
            list: ds,
            daram: Daram,
            hasDownloadStarted: state.downloadInfo.hasDownloadStarted
         };
};

export default connect(mapStateToProps, { tappedOnViewSchools, intelliSearch, checkOnline, setDownloadInfo })(SuccessfulLogin);
