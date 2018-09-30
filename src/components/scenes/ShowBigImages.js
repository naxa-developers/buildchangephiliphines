import React, { Component } from 'react';
import {
    Modal
 } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Actions } from 'react-native-router-flux';

class ShowBigImages extends Component {

  render() {
    const images = [];
    this.props.photos.forEach((ea) => {
      images.push({ props: { source: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/' + ea.image } } });
    });
    console.log(images);
//     const images = [{
//     // Simplest usage.
//     url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
//     // You can pass props to <Image />.
//     props: {
//         // headers: ...
//     }
// }, {
//     props: {
//         // Or you can set source directory.
//         source: require('../background.png')
//     }
// }]
    return (
    <Modal visible={true} transparent={true}>
              <ImageViewer imageUrls={images} />
          </Modal>
    );
  }
}

export default ShowBigImages;
