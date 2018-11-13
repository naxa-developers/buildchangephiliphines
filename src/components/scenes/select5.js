import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLocalizedText } from '../../../locales/strings';


class Select5 extends Component {

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginBottom: 5 }]} onPress={() => Actions.DocumentList()}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textBoldStyle}>{getLocalizedText('GUSTO KO MAKITA AN PLANO', 'I WANT TO LOOK AT THE BLUEPRINT')}</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]} onPress={() => Actions.StepList()}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textBoldStyle}>{getLocalizedText('GUSTO KO MAKITA AN MGA PAMAAGI HAN PAG AYAD', 'I WANT TO SEE THE CONSTRUCTION STAGES')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]} onPress={() => Actions.ShowMap()}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textBoldStyle}>{getLocalizedText('GUSTO KO MAKITA AN AKON ESKWELAHAN HA MAPA', 'I WANT TO SEE MY SCHOOL ON A MAP')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default Select5;

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
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
