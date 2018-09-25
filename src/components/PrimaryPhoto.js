import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';


class PrimaryPhoto extends Component {

  constructor() {
      super();
      this.state = {
          primary_photo: {},
      };
  }



  componentWillMount() {
    RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
        .then((exist) => {
            console.log(exist);
          if (exist) {
            this.setState({
              primary_photo: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/' + this.props.primaryPhoto.image }
            });
        }
        else if (!exist) {
          if (this.props.substep.primary_photo === null) {
            this.setState({
              primary_photo: require('../../app_images/no_image.png')
            });
          }
          else if (this.props.substep.primary_photo !== null) {
            this.setState({
              primary_photo: require('../../app_images/no_image.png')
            });
          }
        }
        })
        .catch(() => {
            console.log('error while checking file');
        });
  }

  render() {
    return (
      <View style={styles.imageContainer}>
      <Image
        resizeMode={'contain'}
        style={styles.image}
        source={this.state.primary_photo}
      />
      </View>
    );
  }
}

export default PrimaryPhoto;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 8
  },
  image: {
    width: Dimensions.get('window').width - 16,
    height: 240,
    borderRadius: 10
  }
});
