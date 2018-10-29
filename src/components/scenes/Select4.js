import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


class Select4 extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginBottom: 5 }]}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textBoldStyle}>Configuration</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textBoldStyle}>Connection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textBoldStyle}>Construction Quality</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Select4;

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
    fontSize: 30,
    marginBottom: 10,
    width: 60,
    height: 60,
    lineHeight: 60,
    borderRadius: 60,
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
