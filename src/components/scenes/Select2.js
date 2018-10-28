import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class Select2 extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#5184ac', marginBottom: 5 }]}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textStyle}>I want to know</Text>
          <Text style={styles.textBoldStyle}>More About Materials</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textStyle}>I want to know how to</Text>
          <Text style={styles.textBoldStyle}>Build a House</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Select2;

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
