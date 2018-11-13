import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { checkInternetConnection } from 'react-native-offline';
import { storeAddress, openedAddressScene } from '../../actions';
import { getLocalizedText } from '../../../locales/strings';


class Address extends React.Component {

  componentDidMount() {
    console.log('address_ko_component_did_mount_bhitra');
    checkInternetConnection().then(res => {
      if (res) {
        AsyncStorage.getItem('token')
        .then(token => {
          console.log('AsyncStorageko_bhitra');
          this.props.openedAddressScene(token);
        });
      } else if (!res) {
        Alert.alert('No internet connection!');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    console.log('address_ko_render_bhitra');
    if (this.props.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
              <View style={styles.mainContainer}>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={[styles.option, { marginBottom: 10 }]}
                    onPress={() => {
                    //this.props.dispatch(storeAddress({ selectedAddress: 'Daram' }));
                    this.props.storeAddress({ selectedAddress: 'Daram' });
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
                  <TouchableOpacity
                    style={[styles.option, { marginBottom: 10 }]}
                    onPress={() => {
                    //this.props.dispatch(storeAddress({ selectedAddress: 'Zumarraga' }));
                    this.props.storeAddress({ selectedAddress: 'Zumarraga' });

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
                  {this.props.currentUserGroup === 'Community Member' &&
                  <TouchableOpacity
                    style={styles.pdfOption}
                    onPress={() => Actions.ShowDocuments({ path: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/media/' + this.props.pdf[0].pdf })}
                  >
                    <Text style={styles.optionTextStyle}>{getLocalizedText('GUSTO KO MAKIT.AN PLANO', 'I want to look at a')}</Text>
                    <Text style={[styles.optionTextStyle, { fontWeight: 'bold' }]}>{getLocalizedText('HIT USA KA ESKWELAHAN NA MAY KALIDAD', 'Standard School Design')}</Text>
                  </TouchableOpacity>}

                </View>

              </View >
            );
}
}

const mapStateToProps = (state) => {
  console.log('address_ko_mapstatetoprops', state);
  return {
    isLoading: state.pdf.isLoading,
    currentUserGroup: state.currentUserGroup.currentUserGroup,
    pdf: state.pdf.data
 };
};

export default connect(mapStateToProps, { openedAddressScene, storeAddress })(Address);

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
