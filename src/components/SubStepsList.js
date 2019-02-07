import React, { Component } from 'react';
import { ListView, Modal, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ImageViewer } from 'react-native-image-zoom-viewer';
import RNFetchBlob from 'react-native-fetch-blob';
import Page1 from '../test/page1';


class SubStepsList extends Component {
  constructor() {
    super();
    this.state = {
        imageViewerShown: false,
        zipAvailable: null
    };
}
    componentWillMount() {


      RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines')
          .then((exist) => {
              if (!exist) {
                this.setState({ zipAvailable: false });
              } else {
                this.setState({ zipAvailable: true });
              }
          })
          .catch((error) => {
            console.log(error);
              console.log('error while checking file');
          });



        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        function compareValues(key, order='asc') {
          return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
              // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
              a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
              b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
              comparison = 1;
            } else if (varA < varB) {
              comparison = -1;
            }
            return (
              (order == 'desc') ? (comparison * -1) : comparison
            );
          };
        }

        this.dataSource = ds.cloneWithRows(this.props.sub_steps.sort(compareValues('order', 'asc')));
    }
    showImageViewer() {
        this.setState({ ...this.state, imageViewerShown: true });
    }
    render() {
      const images = [{ url: 'file:///storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines/media/' + this.props.image }];
        return (
            <ScrollView>
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

            { !this.state.zipAvailable && this.props.image !== '' && <TouchableOpacity onPress={this.showImageViewer.bind(this)} style={styles.stepImageContainer}>
              <Image style={styles.stepImage} resizeMode={'contain'} source={{ uri: 'http://bccms.naxa.com.np/media/' + this.props.image }} />
            </TouchableOpacity> }
            { this.state.zipAvailable && this.props.image !== '' && <TouchableOpacity onPress={this.showImageViewer.bind(this)} style={styles.stepImageContainer}>
              <Image style={styles.stepImage} resizeMode={'contain'} source={{ uri: 'file:///storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines/media/' + this.props.image }} />
            </TouchableOpacity> }

            <ListView
            dataSource={this.dataSource}
            renderRow={(rowData) => (<Page1 substep={rowData} stepId={this.props.stepId} />)
            }
            />
            </ScrollView>
        );
    }

}


export default SubStepsList;

const styles = StyleSheet.create({

  stepImageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 10,
  },
  stepImage: {
    width: Dimensions.get('window').width - 32,
    height: 225,
    backgroundColor: 'white',
    borderRadius: 10
  }
});
