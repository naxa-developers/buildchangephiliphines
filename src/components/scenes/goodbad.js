import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import { View,
    Text,
    Image,
    Dimensions,
    Modal,
    TouchableOpacity,
    ScrollView
 } from 'react-native';
 import { ImageViewer } from 'react-native-image-zoom-viewer';
 import { getLocalizedText } from '../../../locales/strings';


class GoodBad extends Component {

  constructor() {
    super();
    this.state = {
        good_photo: {},
        bad_photo: {},
        imageViewerShown: false,
        id: 0
    };
}

  componentWillMount() {
    console.log('photoData', this.props.photoData);
  RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
      .then((exist) => {
          console.log(exist);
        if (exist) {
          if (this.props.photoData.good_photo === null || this.props.photoData.good_photo === '') {
            this.setState({
              good_photo: require('../../../app_images/no_image.png')
            });
          } else {
            console.log('good_photo', { url: this.props.photoData.good_photo.replace('http://bccms.naxa.com.np', 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines') });

            this.setState({
              good_photo: { uri: this.props.photoData.good_photo.replace('http://bccms.com.np', 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines') }
              //good_photo: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/media/' + this.props.photoData.good_photo }
            });
          }
          if (this.props.photoData.bad_photo === null || this.props.photoData.bad_photo === '') {
            this.setState({
              bad_photo: require('../../../app_images/no_image.png')
            });
          } else {
            console.log('bad_photo', { url: this.props.photoData.bad_photo.replace('http://bccms.naxa.com.np', 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines') });
            this.setState({
              bad_photo: { uri: this.props.photoData.bad_photo.replace('http://bccms.com.np', 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines') }
              //bad_photo: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/media/' + this.props.photoData.bad_photo }

            });
          }
      }
      else if (!exist) {
        if (this.props.photoData.good_photo === null || this.props.photoData.good_photo === '') {
          this.setState({
            good_photo: require('../../../app_images/no_image.png')
          });
        }
        else if (this.props.photoData.good_photo !== null) {
          this.setState({
            good_photo: { uri: this.props.photoData.good_photo }
          });
        }
        if (this.props.photoData.bad_photo === null || this.props.photoData.bad_photo === '') {
          this.setState({
            bad_photo: require('../../../app_images/no_image.png')
          });
        }
        else if (this.props.photoData.bad_photo !== null) {
          this.setState({
            bad_photo: { uri: this.props.photoData.bad_photo }

          });
        }
      }
      })
      .catch(() => {
          console.log('error while checking file');
      });
}

    render() {
      const { width } = Dimensions.get('window');
      const images = [];
      if (this.props.photoData.good_photo) {
        images[0] = { url: this.props.photoData.good_photo.replace('http://bccms.naxa.com.np', 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines') };
      }
      if (this.props.photoData.bad_photo) {
        images[1] = { url: this.props.photoData.bad_photo.replace('http://bccms.naxa.com.np', 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines') };
      }
      console.log('images', images);

      return (
        <View>
        <Modal
           visible={this.state.imageViewerShown}
           transparent
           onRequestClose={() => {
           this.setState({ ...this.state, imageViewerShown: false });
           }}
        >
                <ImageViewer
                    imageUrls={images}
                    index={this.state.id}
                />
          </Modal>
        <ScrollView>
              <View style={{ margin: 15, marginBottom: 0 }}><Text style={{ fontSize: 15 }}>{this.props.photoData.description}</Text></View>
              <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, padding: 15, position: 'relative', borderRadius: 5 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15, marginLeft: 25 }}>{getLocalizedText('AMO INI IT SAKTO NA ITSURA', 'This is what it should look like')}</Text>
                <TouchableOpacity
                  onPress={() => {
                  this.setState({ imageViewerShown: true, id: 0 });
                }}
                >
                <Image style={{ height: 193, width: width - 50, marginBottom: 10 }} source={this.state.good_photo} />
                </TouchableOpacity>
                <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'green', position: 'absolute', left: 15, top: 20 }} />
              </View>
              <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, marginBottom: 15, padding: 15, position: 'relative', borderRadius: 5 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15, marginLeft: 25 }}>{getLocalizedText('AMO INI IT DIRI SAKTO NA ITSURA', 'This is what it should not look like')}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ imageViewerShown: true, id: 1 })
                  }}
                >
                <Image style={{ height: 193, width: width - 50, marginBottom: 10 }} source={this.state.bad_photo} />
                </TouchableOpacity >
                <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'red', position: 'absolute', left: 15, top: 20 }} />
              </View>
        </ScrollView>
        </View>
      );
    }
}

export default GoodBad;
