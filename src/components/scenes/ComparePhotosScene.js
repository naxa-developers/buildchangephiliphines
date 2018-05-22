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

    componentDidMount() {
        Actions.refresh({ title: 'Compare photos' });
    }

    render() {
        console.log(this.props.guideline.good_photo);
        return (

            // <Gallery
            // style={{ flex: 1, backgroundColor: 'black' }}
            // images={[
            //   { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
            //   { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
            //   { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
            //   { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
            // ]}
            // />

            <View
                 style={styles.container}
            >
                <Tile
                    imageSrc={{ uri: this.props.guideline.good_photo }}
                    title="Good photo"
                    caption="Tap to open"
                    featured
                />

                <Tile
                    imageSrc={{ uri: this.props.guideline.bad_photo }}
                    title="Bad photo"
                    caption="Tap to open"
                    featured
                />

            </View>
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
