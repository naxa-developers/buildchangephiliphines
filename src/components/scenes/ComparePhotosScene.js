import React, { Component } from 'react';
import { View,
 } from 'react-native';
import Gallery from 'react-native-image-gallery';
import { Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

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
