import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { strings } from '../../../locales/strings';


class Select3 extends Component {
  componentDidMount() {
    this.getLocale();
  }
  async getLocale() {
    return await AsyncStorage.getItem('locale').then((value) => {
      strings.setLanguage(value);
      this.setState({
        isLoading: false
      });
    });
}
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginBottom: 5 }]} onPress={() => Actions.Select4()}>
        <View style={styles.backgroundContainer}>
          <Image
          style={styles.bgImage}
          source={require('../../../app_images/what_makes_my_house_strong.jpg')}
          resizeMode={'stretch'}
          />
        </View>
        <View style={styles.contentStyle}>
        <Icon name={'info'} size={35} style={styles.iconStyle} />
        <Text style={styles.textStyle}>{strings.view_select3_title1}</Text>
        <Text style={styles.textBoldStyle}>{strings.view_select3_subtitle1}</Text>
        </View>
</TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]} onPress={() => Actions.HouseParts()}>
        <View style={styles.backgroundContainer}>
          <Image
          style={styles.bgImage}
          source={require('../../../app_images/key_parts_of_a_house.jpg')}
          resizeMode={'stretch'}
          />
        </View>
        <View style={styles.contentStyle}>
        <Icon name={'info'} size={35} style={styles.iconStyle} />
        <Text style={styles.textStyle}>{strings.view_select3_title2}</Text>
        <Text style={styles.textBoldStyle}>{strings.view_select3_subtitle2}</Text>
        </View>

        </TouchableOpacity>
      </View>
    );
  }
}

export default Select3;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10
  },
  subContainer: {
    flex: 1,

    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden'
  },
  iconStyle: {
    color: 'rgba(0,0,0,.5)',
    fontSize: 35,
    marginBottom: 20,
    width: 70,
    height: 70,
    lineHeight: 70,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,.9)',
    textAlign: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 18
  },
  textBoldStyle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  backgroundContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0

  },
  bgImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
  contentStyle: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.1)'
  }

});
