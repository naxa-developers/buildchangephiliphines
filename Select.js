import React, { Component } from 'react';
import { View } from 'react-native';
import { Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class Select extends Component {
  render() {
    return (
      <View>

          <Tile
            activeOpacity={0.9}
            imageSrc={require('./app_images/schools_background.jpg')}
            title="View Schools"
            featured
            caption="Click to see schools in this project"
            onPress={() => Actions.Successful_Login()}
          />
          <Tile
            activeOpacity={0.9}
            imageSrc={require('./app_images/guidelines_background.jpg')}
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
