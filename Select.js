import React, { Component } from 'react';
import { View } from 'react-native';
import { Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class Select extends Component {
  render() {
    return (
      <View>

          <Tile
            imageSrc={require('./app_images/login_screen_background2.jpg')}
            title="View Schools"
            featured
            caption="Click to see schools in this project"
            onPress={() => Actions.Successful_Login()}
          />
          <Tile
            imageSrc={{ require: './app_images/login_screen_background2.jpg' }}
            title="View Guidelines"
            featured
            caption="Click to explore safe construction guidelines"
            onPress={() => Actions.GuidelineCategoryScene()}
          />
      </View>
    );
  }
}

export default Select;
