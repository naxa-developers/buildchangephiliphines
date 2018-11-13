import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import { View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView
 } from 'react-native';
 import { getLocalizedText } from '../../../locales/strings';

class MaterialPhoto extends Component {

  constructor() {
    super();
    this.state = {
        good_photo: {},
        bad_photo: {}
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
            console.log('good_photo');
            this.setState({
              good_photo: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/media/' + this.props.photoData.good_photo }
            });
          }
          if (this.props.photoData.bad_photo === null || this.props.photoData.bad_photo === '') {
            this.setState({
              bad_photo: require('../../../app_images/no_image.png')
            });
          } else {
            console.log('bad_photo');
            this.setState({
              bad_photo: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/media/' + this.props.photoData.bad_photo }

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

    renderImageList() {
        const { width } = Dimensions.get('window');

        return (
          <ScrollView>
                <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, padding: 15, position: 'relative', borderRadius: 5}}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15, marginLeft: 25 }}>{getLocalizedText('AMO INI IT SAKTO NA ITSURA', 'This is what it should look like')}</Text>
                  <TouchableOpacity>
                  <Image style={{ height: 193, width: width - 50, marginBottom: 10 }} source={this.state.good_photo} />
                  </TouchableOpacity>
                  <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'green', position: 'absolute', left: 15, top: 20 }} />
                <Text style={{ fontSize: 17, lineHeight: 22 }}>{getLocalizedText(this.props.photoData.good_photo_desc_de, this.props.photoData.good_photo_desc)}</Text>
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, marginBottom: 15, padding: 15, position: 'relative', borderRadius: 5 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15, marginLeft: 25 }}>{getLocalizedText('AMO INI IT DIRI SAKTO NA ITSURA', 'This is what it should not look like')}</Text>
                  <TouchableOpacity>
                  <Image style={{ height: 193, width: width - 50, marginBottom: 10 }} source={this.state.bad_photo} />
                  </TouchableOpacity >
                  <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'red', position: 'absolute', left: 15, top: 20 }} />
                  <Text style={{ fontSize: 17, lineHeight: 22 }}>{getLocalizedText(this.props.photoData.bad_photo_desc_de, this.props.photoData.bad_photo_desc)}</Text>
                </View>
          </ScrollView>
        );
    }

    render() {
      console.log('state', this.state);
        return (
            this.renderImageList()
        );
    }
}

export default MaterialPhoto;
