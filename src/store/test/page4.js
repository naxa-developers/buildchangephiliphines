import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Page4 extends Component {

  render() {
    return (
      <TouchableOpacity onPress={() => Actions.Page2()}>
        <Text>Welcome to page4!</Text>
      </TouchableOpacity>
    );
  }
}

export default Page4;
