import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLocalizedText } from '../../../locales/strings';


class Select5 extends Component {

  onSecondOptionPressed(user) {
    if (user === 'Field Engineer') {
      Actions.StepList({ title: getLocalizedText('PINDOTA AN PAMAAGI PARA MAS MABARUAN AN PROSESO', 'What Construction Step Do You Want to Check?') });
    } else {
      Actions.StepList({ title: getLocalizedText('PINDOTA AN PAMAAGI PARA MAS MABARUAN AN PROSESO', 'Click on the Stage to Learn More') });
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginBottom: 5 }]} onPress={() => Actions.DocumentList()}>
        <View style={styles.backgroundContainer}>
          <Image
          style={styles.bgImage}
          source={require('../../../app_images/blueprint.jpg')}
          resizeMode={'stretch'}
          />
        </View>
        <View style={styles.contentStyle}>
        <Icon name={'info'} size={35} style={styles.iconStyle} />
        <Text style={styles.textBoldStyle}>{getLocalizedText('GUSTO KO MAKITA AN PLANO', 'I WANT TO LOOK AT THE BLUEPRINT')}</Text>
        </View>
</TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]} onPress={this.onSecondOptionPressed.bind(this, this.props.user)}>
        <View style={styles.backgroundContainer}>
          <Image
          style={styles.bgImage}
          source={require('../../../app_images/construction_stages.jpg')}
          resizeMode={'stretch'}
          />
        </View>
        <View style={styles.contentStyle}>
        <Icon name={'info'} size={35} style={styles.iconStyle} />
        <Text style={styles.textBoldStyle}>{getLocalizedText('GUSTO KO MAKITA AN MGA PAMAAGI HAN PAG AYAD', 'I WANT TO SEE THE CONSTRUCTION STAGES')}</Text>
        </View>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.subContainer, { backgroundColor: '#8cc63f', marginTop: 5 }]} onPress={() => Actions.ShowMap()}>
        <View style={styles.backgroundContainer}>
          <Image
          style={styles.bgImage}
          source={require('../../../app_images/map.jpg')}
          resizeMode={'stretch'}
          />
        </View>
        <View style={styles.contentStyle}>
        <Icon name={'info'} size={35} style={styles.iconStyle} />
        <Text style={styles.textBoldStyle}>{getLocalizedText('GUSTO KO MAKITA AN AKON ESKWELAHAN HA MAPA', 'I WANT TO SEE MY SCHOOL ON A MAP')}</Text>
        </View>

        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUserGroup.currentUserGroup
  }
};


export default connect(mapStateToProps)(Select5);

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
