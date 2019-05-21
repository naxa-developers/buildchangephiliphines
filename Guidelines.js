import React, { Component } from "react";

import {
  Text,
  StyleSheet,
  View,
  ListView,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

export default class Guidelines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: ""
    };
  }

  componentDidMount() {
    return AsyncStorage.getItem("token").then(token => {
      fetch("http://139.59.67.104:4001/core/api/material-list/2/", {
        method: "GET",
        headers: {
          Authorization: "token " + token
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          });
          //  Alert.alert(responseJson.data.username+'');
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(
              responseJson.map(each => each.category)
            )
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#000"
        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={rowData => (
            <Text style={styles.rowViewContainer}>{rowData.category}</Text>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 7
  },

  rowViewContainer: {
    fontSize: 17,
    padding: 10
  },

  TextInputStyleClass: {
    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7,
    backgroundColor: "#FFFFFF"
  }
});
