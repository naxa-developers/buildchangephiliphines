import React, { Component } from 'react';
import { View,
    Modal
 } from 'react-native';
import Gallery from 'react-native-image-gallery';
import { Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';


class ComparePhotosScene extends Component {


    constructor() {
        super();
        this.state = {
            imageViewerShown: false,
            imageViewerCurIndex: 0
        };
    }

    renderImageViewer() {
        return (
            <Gallery
                style={{ flex: 1, backgroundColor: 'black' }}
                images={[
                { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                ]}
            />
        );
    }

    renderImageViewer2() {

        const images = [{
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
            props: {
                // headers: ...
            }
        },
        {
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
            props: {
                // headers: ...
            }
        }];
        

        return (
            <Modal visible transparent >
            <ImageViewer imageUrls={images} />
        </Modal>
        );
    }

    renderImageList() {
        return (
            <View 
                 style={styles.container}
            >
                <Tile
                    activeOpacity={0.9}
                    icon={{ name: 'check-outline', type: 'material-community', color: '#8CC63E' }}
                    imageSrc={{ uri: this.props.guideline.good_photo }}
                    title="Good photo"
                    caption="Tap to open"
                    featured
                />
                <Tile
                    activeOpacity={0.9}
                    icon={{ name: 'highlight-off', type: 'material-community', color: '#E8656A' }}
                    imageSrc={{ uri: this.props.guideline.bad_photo }}
                    title="Bad photo"
                    caption="Tap to open"
                    featured
                />
       </View>
        );
    }

    render() {
        
        return (
            this.renderImageViewer2()
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
