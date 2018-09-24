import React, { Component } from 'react';
import { StyleSheet, View, Alert, ListView, TextInput, ActivityIndicator, AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import RNFetchBlob from 'react-native-fetch-blob';
import { checkInternetConnection } from 'react-native-offline';
import PlaceholderListItem from './components/PlaceholderListItem';
import { tappedOnViewSchools, intelliSearch, checkOnline } from './actions';
import { strings } from './../locales/strings';

class SuccessfulLogin extends Component {

  componentDidMount() {
    checkInternetConnection().then(res => {
      if (res) {
        AsyncStorage.getItem('token')
        .then(token => {
          console.log('AsyncStorageko_bhitra');
          this.props.tappedOnViewSchools(token);
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
        });
      } else if (!res) {
        Alert.alert('No internet connection!');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }


  GetListViewItem(school) {
    Actions.ShowMap();
   // Actions.ShowMap({
   //   id: school.id,
   //   realName: school.name,
   //   address: school.address,
   //   location: school.address,
   //   steps: school.steps
   // });
  }

   SearchFilterFunction(text) {
     this.props.intelliSearch(text);
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
    if (this.props.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>

      <TextInput
       style={styles.TextInputStyleClass}

       value={this.props.typedText}
       onChangeText={(text) => this.SearchFilterFunction(text)}

       underlineColorAndroid='transparent'
       placeholder={strings.action_search_here}
      />

        <ListView
          dataSource={this.props.list.cloneWithRows(this.props.hasTyped ? this.props.newData : this.props.data.sites)}

          renderSeparator={this.ListViewItemSeparator}

          renderRow={(rowData) => <PlaceholderListItem
            rowData={rowData}

            style={styles.rowViewContainer}

            onPress={this.GetListViewItem.bind(this, rowData)}
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

  justifyContent: 'center',
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

   }

});

const mapStateToProps = (state) => {
  console.log('mapStateToPropsko_bhitra');
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const newData = state.schoolList.data.sites.filter(function (item) {
      const itemData = item.name.toUpperCase();
      const textData = state.schoolSearchReducer.typedText.toUpperCase();
      return itemData.indexOf(textData) > -1;
  });
  return {
            isLoading: state.schoolList.isLoading,
            data: state.schoolList.data,
            list: ds,
            typedText: state.schoolSearchReducer.typedText,
            hasTyped: state.schoolSearchReducer.hasTyped,
            newData,
            hasInternetConnection: state.checkOnline.hasInternetConnection
         };
};

export default connect(mapStateToProps, { tappedOnViewSchools, intelliSearch, checkOnline })(SuccessfulLogin);
