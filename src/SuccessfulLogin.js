import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Alert,
  ListView,
  ActivityIndicator,
  AsyncStorage,
  PermissionsAndroid
} from "react-native";
import { connect } from "react-redux";
import { unzip } from "react-native-zip-archive";
import RNFetchBlob from "react-native-fetch-blob";
import { checkInternetConnection } from "react-native-offline";
import PlaceholderListItem from "./components/PlaceholderListItem";
import {
  tappedOnViewSchools,
  intelliSearch,
  checkOnline,
  setDownloadInfo
} from "./actions";
import { strings } from "./../locales/strings";
import { platformSpecificConfigForDownload } from "./downloadinfo";

class SuccessfulLogin extends Component {
  // componentWillMount() {
  componentDidMount() {
    this.getLocale();
    AsyncStorage.getItem("token").then(token => {
      this.props.tappedOnViewSchools(token);
    });
    if (Platform.OS === "ios") {
      this.downloadZip();
    } else {
      this.requestStoragePermission();
    }
  }

  async getLocale() {
    return await AsyncStorage.getItem("locale").then(value => {
      strings.setLanguage(value);
    });
  }

  downloadZip() {
    checkInternetConnection()
      .then(res => {
        if (res) {
          if (!this.props.hasDownloadStarted) {
            RNFetchBlob.fs
              .exists(this.props.pathForExtracted)
              .then(exist => {
                if (!exist) {
                  this.props.setDownloadInfo({ hasDownloadStarted: true });
                  RNFetchBlob.config(platformSpecificConfigForDownload)
                    .fetch("GET", "http://bccms.naxa.com.np/core/download-zip/")
                    .then(resp => {
                      this.props.setDownloadInfo({ hasDownloadStarted: false });
                      const sourcePath = resp.path();
                      const targetPath = resp.path().replace(".zip", "");

                      unzip(sourcePath, targetPath)
                        .then(path => {
                          console.log(`unzip completed at ${path}`);
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    })
                    .catch(error => {
                      this.props.setDownloadInfo({ hasDownloadStarted: false });
                    });
                }
              })
              .catch(error => {
                console.log("error while checking file");
              });
          }
        } else if (!res) {
          Alert.alert("No internet connection!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission Needed",
          message:
            "App requires storage permission to store data for offline usage "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.downloadZip();
      }
    } catch (err) {
      console.warn(err);
    }
  }
  ListViewItemSeparator = () => (
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "#ddd"
      }}
    />
  );

  render() {
    console.log("SuccessFull Login render");
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
          renderRow={rowData => (
            <PlaceholderListItem
              rowData={rowData}
              style={styles.rowViewContainer}
            >
              {rowData.name}
            </PlaceholderListItem>
          )}
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
    margin: 7
  },

  rowViewContainer: {
    fontSize: 17,
    padding: 10
  },

  TextInputStyleClass: {
    textAlign: "left",
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 0,
    backgroundColor: "#FFFFFF",
    paddingLeft: 15,
    paddingRight: 15
  },
  addressContainer: {
    backgroundColor: "white"
  },
  addressText: {
    color: "black",
    fontSize: 23,
    fontWeight: "bold",
    paddingLeft: 5
  }
});

const mapStateToProps = state => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  const Daram = state.schoolList.data.sites.filter(function(school) {
    const schoolAddress = school.address.toUpperCase();
    return (
      schoolAddress.indexOf(
        state.currentSelectedAddress.currentSelectedAddress.toUpperCase()
      ) > -1
    );
  });

  return {
    isLoading: state.schoolList.isLoading,
    list: ds,
    daram: Daram,
    hasDownloadStarted: state.downloadInfo.hasDownloadStarted,
    pathForExtracted: state.downloadInfo.pathForExtracted,
    pathForZip: state.downloadInfo.pathForZip
  };
};

export default connect(
  mapStateToProps,
  { tappedOnViewSchools, intelliSearch, checkOnline, setDownloadInfo }
)(SuccessfulLogin);
