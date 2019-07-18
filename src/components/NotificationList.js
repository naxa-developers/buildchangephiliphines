import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import SingleNotification from "./SingleNotification";

class NotificationList extends Component {
  render() {
    return this.props.notifications.length > 0 ? (
      <View>
        <FlatList
          data={this.props.notifications}
          renderItem={({ item }) => <SingleNotification notification={item} />}
        />
      </View>
    ) : (
      <View style={styles.containerStyle}>
        <Text style={styles.subtitleStyle}>You have no notification.</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ notifications }) => ({
  notifications
});

const styles = StyleSheet.create({
  subtitleStyle: {
    textAlign: "center",
    fontSize: 17,
    color: "#908989"
  },
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(mapStateToProps)(NotificationList);
