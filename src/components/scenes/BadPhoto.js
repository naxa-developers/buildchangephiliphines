import React, { Component } from 'react';
import { View,
    Modal,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
 } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFetchBlob from 'react-native-fetch-blob';

class BadPhoto extends Component {


    constructor() {
        super();
        this.state = {
            imageViewerShown: false,
            imageViewerCurIndex: 0,
            bad_photo: {}
        };
    }

componentWillMount() {
  this.setState({
    //good_photo: require('../../../app_images/spreadfooting.jpg')
    bad_photo: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/' + this.props.substep.bad_photo }
  });
}


    showImageViewer(index) {
        console.log(index);
        this.setState({ ...this.state, imageViewerCurIndex: index, imageViewerShown: true });
    }

    renderImageList() {
        const { width } = Dimensions.get('window');


        const images = [{
            url: this.props.substep.good_photo,
            props: {
                // headers: ...
            }
        },
        {
            url: this.props.substep.bad_photo,
            props: {
                // headers: ...
            }
        }];

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
                          index={this.state.imageViewerCurIndex}
                          imageUrls={images}
                      />
                </Modal>
                <View style={{ backgroundColor: '#FFF', padding: 20 }}>
                  <Text style={{ fontSize: 16 }}>Description Here</Text>
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, padding: 10, position: 'relative' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginLeft: 25 }}>Bad Practice</Text>
                  <TouchableOpacity onPress={() => this.showImageViewer(1)}>
                  <Image style={{ height: 193, width: width - 50 }} source={this.state.bad_photo} />
                  </TouchableOpacity >
                  <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'red', position: 'absolute', left: 10, top: 15 }} />
                </View>
          </View>
        );
    }

    render() {
        return (
            this.renderImageList()
        );
    }
}

export default BadPhoto;
