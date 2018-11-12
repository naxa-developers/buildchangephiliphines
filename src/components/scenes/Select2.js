import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, NetInfo, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { strings } from '../../../locales/strings';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { openedGuidelinesCategoryScene } from '../../actions';


class Select2 extends Component {

  componentDidMount() {
    this.getLocale();
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem('token')
        .then((token) => {
          this.props.openedGuidelinesCategoryScene(token);
        });
      }
      else if (!isConnected) {
        Alert.alert('No internet Connection!');
      }
    });
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
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#5184ac', marginBottom: 5 }]} onPress={() => Actions.GuidelineCategoryScene()}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textStyle}>{strings.view_select2_title1}</Text>
          <Text style={styles.textBoldStyle}>{strings.view_select2_subtitle1}</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]} onPress={() => Actions.Select3()}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textStyle}>{strings.view_select2_title2}</Text>
          <Text style={styles.textBoldStyle}>{strings.view_select2_subtitle2}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ram: 'ram'
  };
};

export default connect(mapStateToProps, { openedGuidelinesCategoryScene })(Select2);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10
  },
  subContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  iconStyle: {
    color: 'white',
    fontSize: 35,
    marginBottom: 20,
    width: 70,
    height: 70,
    lineHeight: 70,
    borderRadius: 70,
    backgroundColor: 'rgba(0,0,0,.1)',
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
  }
});
