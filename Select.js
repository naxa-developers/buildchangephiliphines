import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { language, languages } from 'react-native-languages';
import { strings } from './locales/locale';

import { i18nString } from './locales/i18n';

class Select extends Component {

  render() {
    console.log('language', language);
    console.log('languages', languages);

    const { height } = Dimensions.get('window');

    strings.setLanguage('ne');
    console.log('duck', strings.getLanguage());
    
    return (
      <View>
          <Tile
            titleStyle={{fontSize: 40}}
            captionStyle={{fontSize: 20}}
            imageSrc={require('./app_images/schools_background.jpg')}
            title={strings.view_schools_title}
            titleStyle={{ fontSize: 40 }}
            height={height * 0.5}
            featured
            caption={strings.view_schools_subtitle}
            onPress={() => Actions.Successful_Login()}
            captionStyle={{ fontSize: 25 }}
          />
          <Tile
            titleStyle={{fontSize: 40}}
            captionStyle={{fontSize: 20}}
            imageSrc={require('./app_images/guidelines_background.jpg')}
            title={strings.view_guidelines_title}
            height={height * 0.5}
            titleStyle={{ fontSize: 40 }}
            featured
            caption={strings.view_guidelines_subtitle}
            onPress={() => Actions.GuidelineCategoryScene()}
            captionStyle={{ fontSize: 25 }}
          />
      </View>
    );
  }
}

export default Select;
