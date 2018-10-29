import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { storeAddress } from '../../actions';


class Address extends React.Component {
  render() {
    return (
              <View style={styles.mainContainer}>
                <View style={styles.promptContainer}><Text style={styles.headingText}>Where is your school?</Text></View>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={[styles.option, { marginBottom: 10 }]}
                    onPress={() => {
                    this.props.dispatch(storeAddress({ selectedAddress: 'Daram' }));
                    Actions.Successful_Login();
                  }}
                  >
                    <Text style={styles.textStyle}>Daram, Samar</Text>
                    <Image
                    style={styles.image}
                    source={require('../../../app_images/daram.jpg')}
                    resizeMode={'stretch'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.option, { marginBottom: 10 }]} onPress={() => {
                    this.props.dispatch(storeAddress({ selectedAddress: 'Zumarraga' }));
                    Actions.Successful_Login();
                  }}
                  >
                    <Text style={styles.textStyle}>Zumarraga, Samar</Text>
                    <Image
                    style={styles.image}
                    source={require('../../../app_images/zumarraga.jpg')}
                    resizeMode={'stretch'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pdfOption}>
                    <Text style={styles.optionTextStyle}>I want to look at a</Text>
                    <Text style={[styles.optionTextStyle, {fontWeight: 'bold'}]}> Standard School Design</Text>
                  </TouchableOpacity>
                </View>

              </View >
            );
}
}

export default connect(null)(Address);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8
  },
  promptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    backgroundColor: 'white',
    flex: 10,
    justifyContent: 'space-between'
  },
  option: {
    backgroundColor: '#5184ac',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  pdfOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',

    backgroundColor: '#8cc63f',
    borderRadius: 5,

  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 24,
    position: 'absolute',
    zIndex: 2,
    textShadowColor: 'rgba(0, 0, 0, .5)',
   textShadowOffset: { width: 0, height: 1 },
   textShadowRadius: 10
  },
  optionTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,.1)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  headingText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});
