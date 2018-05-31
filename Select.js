import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage } from 'react-native';
import { Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { language, languages } from 'react-native-languages';
import Realm from 'realm';

import { strings } from './locales/locale';
import { i18nString } from './locales/i18n';


class Select extends Component {

  state = {
    isLoadingLocale: true
  };

  async getLocale() {
    return await AsyncStorage.getItem('locale').then((value) => {
      console.log('Setting value to ' + value);
      strings.setLanguage(value);
      this.setState({
        isLoading: false
      });
    });
}

  componentDidMount() {
    this.getLocale();
  }

  render() {
    const { height } = Dimensions.get('window');
   
    // strings.setLanguage(this.getLocale());

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
