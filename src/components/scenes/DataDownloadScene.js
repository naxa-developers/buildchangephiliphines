import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ListView,
  TextInput,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  ImageBackground
} from "react-native";
import { ListItem, Button, Tile, Text } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import RNFS from "react-native-fs";
import { connect } from "react-redux";
import { tappedOnViewSchools } from "./../../actions";

class DataDownloadScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      msg: ""
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("token").then(token => {
      this.props.tappedOnViewSchools(token);
    });
  }

  render() {
    return (
      <View>
        <Text
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          loading...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: null,
    height: null
  },
  loginForm: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});
const mapStateToProps = state => {
  return { isLoading: state.schoolList.isLoading, data: state.schoolList.data };
};

export default connect(
  mapStateToProps,
  { tappedOnViewSchools }
)(DataDownloadScene);
