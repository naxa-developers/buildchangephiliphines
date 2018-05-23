import React, { Component } from 'react';
import { View,
    Modal,
    Text
 } from 'react-native';
import Gallery from 'react-native-image-gallery';
import { Tile, Card } from 'react-native-elements';
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

    showImageViewer(index){
        console.log(index);
        this.setState({ ...this.state, imageViewerCurIndex: index, imageViewerShown: true });
    }

    renderImageList() {

      
        const { description, title } = this.props.guideline; 
        console.log(description);


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
                    imageSrc={{ uri: this.props.guideline.good_photo }}
                    title="Good photo"
                    caption="Tap to open"
                    featured
                />
                <Tile
                    containerStyle={{ flex: 1 }}
                    onPress={() => this.showImageViewer(1)}
                    activeOpacity={0.9}
                    icon={{ name: 'close-outline', type: 'material-community', color: '#E8656A' }}
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
