import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, NetInfo, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { openedGuidelinesCategoryScene } from '../../actions';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


class Select2 extends Component {

  componentDidMount() {
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#5184ac', marginBottom: 5 }]} onPress={() => Actions.GuidelineCategoryScene()}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textStyle}>I want to know</Text>
          <Text style={styles.textBoldStyle}>More About Materials</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]} onPress={() => Actions.Select3()}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textStyle}>I want to know how to</Text>
          <Text style={styles.textBoldStyle}>Build a House</Text>
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
