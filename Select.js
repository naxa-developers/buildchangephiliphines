import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class Select extends Component {
 render() {

   var { height, width } = Dimensions.get('window');
   return (
     <View>

         <Tile
           imageSrc={require('./app_images/schools_background.jpg')}
           title="View Schools"
           height={height * 0.5}
           featured
           caption="Click to see schools in this project"
           onPress={() => Actions.Successful_Login()}
         />
         <Tile
           imageSrc={require('./app_images/guidelines_background.jpg')}
           title="View Guidelines"
           height={height * 0.5}
           featured
           caption="Click to explore safe construction guidelines"
           onPress={() => Actions.GuidelineCategoryScene()}
         />
     </View>
   );
 }
}
export default Select;
