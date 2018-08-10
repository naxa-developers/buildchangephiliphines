import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Page2 extends Component {

  render() {
    console.log('page2_bhitra');
    console.log('props_ko_value');
    console.log(Actions.currentParams);
    return (
      <TouchableOpacity>
        <Text>Welcome to page2!</Text>
      </TouchableOpacity>
    );
  }
}

export default Page2;
