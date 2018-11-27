import React, { Component } from 'react';
import { View,
    Image,
    Dimensions,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal
 } from 'react-native';
 import { ImageViewer } from 'react-native-image-zoom-viewer';
 import RNFetchBlob from 'react-native-fetch-blob';


class BadPhoto extends Component {

  constructor() {
    super();
    this.state = {
        imageViewerShown: false,
        id: 0,
        images: []
    };
}

componentWillMount() {
  console.log(' bad photo kocomponent will mount ko bhitra', this.props.substep.bad_photos);
  this.props.substep.bad_photos.forEach((ea) => {
    //images.push({ url: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines' + ea.image });
    RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
        .then((exist) => {
            console.log(exist);
          if (exist) {
            if (ea.image === null || ea.image === '') {
              this.setState({
                images: this.state.images.push({ primary_photo: require('../../../app_images/no_image.png') })
              });
            } else {
              console.log('good_photo');
              this.setState({
                images: this.state.images.push({ primary_photo: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/' + ea.image } })
              });
            }
        }
        else if (!exist) {
          console.log('doesnt exist');
          if (ea.image === null || ea.image === '') {
            console.log('null athawa empty');
            this.setState({
              images: [...this.state.images, require('../../../app_images/no_image.png')]
            });
          }
          else {
            console.log('downloading image from web');
            this.setState({
              images: [...this.state.images, { uri: 'http://bccms.naxa.com.np' + ea.image }] });
          }
        }
        })
        .catch(() => {
            console.log('error while checking file');
        });
  });

}

showImageViewer(id) {
    this.setState({ ...this.state, imageViewerShown: true, id: id });
}

show = ({ item }) => {
{
  console.log('showbhitra', this.state);
  return (<TouchableOpacity onPress={this.showImageViewer.bind(this, this.props.substep.bad_photos.indexOf(item))} style={styles.imageContainer}>
    <Image style={styles.image} resizeMode={'contain'} source={this.state.images[this.props.substep.bad_photos.indexOf(item)]} />
  </TouchableOpacity>);
}
}

  render() {
    const images = [];
    this.props.substep.bad_photos.forEach((ea) => {
      //images.push({ uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines' + ea.image, props: { height: 400, width: 400 } });
      images.push({ url: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines' + ea.image });

      //images.push({ uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines' + ea.image });
    });
    console.log(images);
    return (
      <View style={styles.container}>
      <Modal
               visible={this.state.imageViewerShown}
               transparent
               onRequestClose={() => {
               this.setState({ ...this.state, imageViewerShown: false });
               }}
            >
                    <ImageViewer
                        imageUrls={images}
                    />
              </Modal>
        <FlatList
          data={this.props.substep.bad_photos}
          renderItem={this.show.bind(this)}
        />
      </View>
    );
  }
}

export default BadPhoto;

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8
  },
  imageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 10
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: 225,
    backgroundColor: 'white',
  }
});
