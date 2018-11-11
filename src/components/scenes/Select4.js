import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


class Select4 extends Component {

  showPdf(array, category) {

    array.forEach((ea) => {
      console.log('ea', ea);
      console.log('category', category);
      if (ea.name === category) {
        if (ea.pdf === '') {
          Alert.alert('No pdf available for this option!')
        } else {
          if (ea.name === 'CONSTRUCTION QUALITY') {
            Actions.ShowDocuments({ path: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/media/' + ea.pdf, value: 'ram' });
          } else {
            Actions.ShowDocuments({ path: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/media/' + ea.pdf });
          }
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginBottom: 5 }]} onPress={this.showPdf.bind(this, this.props.data, 'CONFIGURATION')}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textBoldStyle}>Configuration</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]} onPress={this.showPdf.bind(this, this.props.data, 'CONNECTION')}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textBoldStyle}>Connection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]} onPress={this.showPdf.bind(this, this.props.data, 'CONSTRUCTION QUALITY')}>
          <Icon name={'info'} size={35} style={styles.iconStyle} />
          <Text style={styles.textBoldStyle}>Construction Quality</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.guideLineCategory.data[1].build_a_house[0].my_house_strong
  };
};

export default connect(mapStateToProps)(Select4);

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
