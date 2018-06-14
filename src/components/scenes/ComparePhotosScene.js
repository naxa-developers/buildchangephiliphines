import React, { Component } from 'react';
import { View,
    Modal,
 } from 'react-native';
import { Tile, Card } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';


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
  if (this.props.guideline.good_photo === null) {
    this.setState({
      good_photo: require('../../../app_images/no_image.png')
    });
  }
  else if (this.props.guideline.good_photo !== null) {
    this.setState({
      good_photo: { uri: this.props.guideline.good_photo.replace('http://bccms.naxa.com.np', 'file:///data/user/0/com.guide/files') }
    });
  }
  if (this.props.guideline.bad_photo === null) {
    this.setState({
      bad_photo: require('../../../app_images/no_image.png')
    });
  }
  else if (this.props.guideline.bad_photo !== null) {
    this.setState({
      bad_photo: { uri: this.props.guideline.bad_photo.replace('http://bccms.naxa.com.np', 'file:///data/user/0/com.guide/files') }

    });
  }
}
    showImageViewer(index) {
        console.log(index);
        this.setState({ ...this.state, imageViewerCurIndex: index, imageViewerShown: true });
    }

    renderImageList() {
      console.log('inside renderImageList');
      console.log(this.props.guideline.good_photo === null ? 'file:///data/user/0/com.guide/files/media/material/bad_photo/2018/05/05/23/18/Steel_Plate_with_rust.jpg' : this.props.guideline.good_photo.replace('http://bccms.naxa.com.np', 'file:///data/user/0/com.guide/files'));
      console.log(this.props.guideline.bad_photo === null ? 'file:///data/user/0/com.guide/files/media/material/bad_photo/2018/05/05/23/18/Steel_Plate_with_rust.jpg' : this.props.guideline.bad_photo.replace('http://bccms.naxa.com.np', 'file:///data/user/0/com.guide/files'));

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
                    title="Good photo"
                    caption="Tap to open"
                    featured
                />
                <Tile
                    containerStyle={{ flex: 1 }}
                    onPress={() => this.showImageViewer(1)}
                    activeOpacity={0.5}
                    icon={{ name: 'close-outline', type: 'material-community', color: '#E8656A' }}
                    imageStyle={{ height: 200, width: 200 }}
                    imageSrc={this.state.bad_photo}
                    caption="Tap to open"
                    title='Bad photo'
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
