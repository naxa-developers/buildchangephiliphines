import React, { Component } from 'react';
import { View,
    Modal,
 } from 'react-native';
import { Tile, Card } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFetchBlob from 'react-native-fetch-blob';
import { strings, getLocalizedText } from '../../../locales/strings';



class ComparePhotosScene extends Component {


    constructor() {
        super();
        this.state = {
            imageViewerShown: false,
            imageViewerCurIndex: 0,
            good_photo: {},
            bad_photo: {}
        };
    }

componentWillMount() {
  RNFetchBlob.fs.exists('/storage/emulated/0/DCIM/build_change_philippines')
      .then((exist) => {
          console.log(exist);
        if (exist) {
          if (this.props.guideline.good_photo === null) {
            this.setState({
              good_photo: require('../../../app_images/no_image.png')
            });
          }
          else if (this.props.guideline.good_photo !== null) {
            this.setState({
              good_photo: { uri: this.props.guideline.good_photo.replace('http://bccms.naxa.com.np', 'file:///storage/emulated/0/DCIM/build_change_philippines') }
            });
          }
          if (this.props.guideline.bad_photo === null) {
            this.setState({
              bad_photo: require('../../../app_images/no_image.png')
            });
          }
          else if (this.props.guideline.bad_photo !== null) {
            this.setState({
              bad_photo: { uri: this.props.guideline.bad_photo.replace('http://bccms.naxa.com.np', 'file:///storage/emulated/0/DCIM/build_change_philippines') }

            });
          }
      }
      else if (!exist) {
        if (this.props.guideline.good_photo === null) {
          this.setState({
            good_photo: require('../../../app_images/no_image.png')
          });
        }
        else if (this.props.guideline.good_photo !== null) {
          this.setState({
            good_photo: { uri: this.props.guideline.good_photo }
          });
        }
        if (this.props.guideline.bad_photo === null) {
          this.setState({
            bad_photo: require('../../../app_images/no_image.png')
          });
        }
        else if (this.props.guideline.bad_photo !== null) {
          this.setState({
            bad_photo: { uri: this.props.guideline.bad_photo }

          });
        }
      }
      })
      .catch(() => {
          console.log('error while checking file');
      });
}


    showImageViewer(index) {
        console.log(index);
        this.setState({ ...this.state, imageViewerCurIndex: index, imageViewerShown: true });
    }

    renderImageList() {
        const { description } = this.props.guideline;

        const images = [{
            url: this.props.guideline.good_photo,
            props: {
                // headers: ...
            }
        },
        {
            url: this.props.guideline.bad_photo,
            props: {
                // headers: ...
            }
        }];

        return (
            <View
                style={styles.container}
            >

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

                <Card
                    style={{ flex: 0.4 }}
                    title={description}

                />

                <Tile
                    containerStyle={{ flex: 1 }}
                    onPress={() => this.showImageViewer(0)}
                    activeOpacity={0.9}
                    icon={{ name: 'check-outline', type: 'material-community', color: '#8CC63E' }}
                    imageSrc={this.state.good_photo}
                    title={strings.view_good_photo_title}
                    caption={strings.view_tap_to_open}
                    featured
                />
                <Tile
                    containerStyle={{ flex: 1 }}
                    onPress={() => this.showImageViewer(1)}
                    activeOpacity={0.5}
                    icon={{ name: 'close-outline', type: 'material-community', color: '#E8656A' }}
                    imageStyle={{ height: 200, width: 200 }}
                    imageSrc={this.state.bad_photo}
                    title={strings.view_bad_photo_title}
                    caption={strings.view_tap_to_open}
                    featured
                />

       </View>
        );
    }

    render() {
        return (
            this.renderImageList()
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'space-between'
    }
};

export default ComparePhotosScene;
