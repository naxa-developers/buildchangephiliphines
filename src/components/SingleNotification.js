import React, { Component } from "react";
import { View, Text } from "react-native";

import { CardSection } from "./common";

class SingleNotification extends Component {
  render() {
    const { titleStyle, subtitleStyle, cointainerStyle } = styles;
    const { notification } = this.props;

    return (
      <CardSection>
        <View style={cointainerStyle}>
          <Text numberOfLines={2} style={titleStyle}>
            {notification.title}
          </Text>

          <Text style={subtitleStyle}>{notification.body}</Text>

          <Text style={subtitleStyle}>{notification.date}</Text>
        </View>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    paddingLeft: 16,
    fontSize: 17,
    fontWeight: "bold",
    color: "#000"
  },
  subtitleStyle: {
    paddingLeft: 16,
    fontSize: 15,
    color: "#908989"
  },
  cointainerStyle: {
    marginTop: 16,
    marginBottom: 16,
    justifyContent: "center",
    borderBottomWidth: 0,
    backgroundColor: "#fff",
    flexDirection: "column"
  }
};

export default SingleNotification;
