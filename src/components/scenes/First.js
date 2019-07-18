import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class First extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.promptContainer}>
          <Text style={styles.textStyle}>What do you want to do today?</Text>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              { backgroundColor: "green", marginBottom: 5 }
            ]}
          >
            <Text style={styles.textStyle}>Check out my school</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, { marginTop: 5 }]}>
            <Text style={styles.textStyle}>
              Learn more about houses and general construction
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default First;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 8
  },
  promptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  optionsContainer: {
    backgroundColor: "white",
    flex: 5,
    justifyContent: "space-between"
  },
  option: {
    backgroundColor: "purple",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  textStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  }
});
