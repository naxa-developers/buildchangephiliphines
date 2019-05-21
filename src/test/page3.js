import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

class Page3 extends Component {
  render() {
    return (
      <TouchableOpacity>
        <Text>Welcome to page3!</Text>
      </TouchableOpacity>
    );
  }
}

export default Page3;
