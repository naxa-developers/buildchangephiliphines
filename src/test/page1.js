import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Page1 extends Component {

  render() {
    return (
      <TouchableOpacity onPress={() => Actions.jump('testtabbar', { testProps: 'ram' })}>
        <Text>Welcome to page1!</Text>
      </TouchableOpacity>
    );
  }
}

export default Page1;
