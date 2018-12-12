
import React, { Component } from 'react';
import { View,
    Image,
    Dimensions,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal
 } from 'react-native';
 import RNFetchBlob from 'react-native-fetch-blob';
 import { ImageViewer } from 'react-native-image-zoom-viewer';

class BadPhoto extends Component {

  constructor() {
    super();
    this.state = {
        imageViewerShown: false,
        id: 0,
        onlineMode: true
    };
}

componentWillMount() {
  console.log('componentDidMountkobhitra');
  RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
      .then((exist) => {
          if (!exist) {
            this.setState({ onlineMode: true });
          }
          if (exist) {
            this.setState({ onlineMode: false });
          }
      })
      .catch(() => {
          console.log('error while checking file');
      });
}

showImageViewer(id) {
    this.setState({ ...this.state, imageViewerShown: true, id: id });
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
              {this.state.onlineMode &&
                <FlatList
                        data={this.props.substep.bad_photos}
                        renderItem={({ item }) => <TouchableOpacity onPress={this.showImageViewer.bind(this, this.props.substep.bad_photos.indexOf(item))} style={styles.imageContainer}>
                          <Image style={styles.image} resizeMode={'contain'} source={{ uri: 'http://bccms.naxa.com.np' + item.image }} />
                        </TouchableOpacity>}
                />
                }
                {!this.state.onlineMode &&         <FlatList
                          data={this.props.substep.bad_photos}
                          renderItem={({ item }) => <TouchableOpacity onPress={this.showImageViewer.bind(this, this.props.substep.bad_photos.indexOf(item))} style={styles.imageContainer}>
                            <Image style={styles.image} resizeMode={'contain'} source={{ uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/' + item.image }} />
                          </TouchableOpacity>}
                        />
                    }
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
