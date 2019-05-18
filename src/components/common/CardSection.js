import React from "react";
import { Text, View } from "react-native";

const CardSection = props => {
  return <View style={styles.cointainerStyle}>{props.children}</View>;
};

const styles = {
  cointainerStyle: {
    borderBottomWidth: 5,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#EFEFF4",
    position: "relative"
  }
};

export { CardSection };
