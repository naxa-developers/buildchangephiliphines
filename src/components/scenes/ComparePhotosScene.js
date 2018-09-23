// import React, { Component } from 'react';
// import { View,
//     Modal,
//     Text,
//     Image,
//     Dimensions,
//     TouchableOpacity
//  } from 'react-native';
// import ImageViewer from 'react-native-image-zoom-viewer';
// import RNFetchBlob from 'react-native-fetch-blob';
//
// class ComparePhotosScene extends Component {
//
//
//     constructor() {
//         super();
//         this.state = {
//             imageViewerShown: false,
//             imageViewerCurIndex: 0,
//             good_photo: {},
//             bad_photo: {}
//         };
//     }
//
// componentWillMount() {
//   RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
//       .then((exist) => {
//           console.log(exist);
//         if (exist) {
//           if (this.props.guideline.good_photo === null) {
//             this.setState({
//               good_photo: require('../../../app_images/no_image.png')
//             });
//           }
//           else if (this.props.guideline.good_photo !== null) {
//             this.setState({
//               good_photo: { uri: this.props.guideline.good_photo.replace('http://bccms.naxa.com.np', 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines') }
//             });
//           }
//           if (this.props.guideline.bad_photo === null) {
//             this.setState({
//               bad_photo: require('../../../app_images/no_image.png')
//             });
//           }
//           else if (this.props.guideline.bad_photo !== null) {
//             this.setState({
//               bad_photo: { uri: this.props.guideline.bad_photo.replace('http://bccms.naxa.com.np', 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines') }
//
//             });
//           }
//       }
//       else if (!exist) {
//         if (this.props.guideline.good_photo === null) {
//           this.setState({
//             good_photo: require('../../../app_images/no_image.png')
//           });
//         }
//         else if (this.props.guideline.good_photo !== null) {
//           this.setState({
//             good_photo: { uri: this.props.guideline.good_photo }
//           });
//         }
//         if (this.props.guideline.bad_photo === null) {
//           this.setState({
//             bad_photo: require('../../../app_images/no_image.png')
//           });
//         }
//         else if (this.props.guideline.bad_photo !== null) {
//           this.setState({
//             bad_photo: { uri: this.props.guideline.bad_photo }
//
//           });
//         }
//       }
//       })
//       .catch(() => {
//           console.log('error while checking file');
//       });
// }
//
//
//     showImageViewer(index) {
//         console.log(index);
//         this.setState({ ...this.state, imageViewerCurIndex: index, imageViewerShown: true });
//     }
//
//     renderImageList() {
//         const { description } = this.props.guideline;
//         const { width } = Dimensions.get('window');
//
//
//         const images = [{
//             url: this.props.guideline.good_photo,
//             props: {
//                 // headers: ...
//             }
//         },
//         {
//             url: this.props.guideline.bad_photo,
//             props: {
//                 // headers: ...
//             }
//         }];
//
//         return (
//           <View>
//               <Modal
//                  visible={this.state.imageViewerShown}
//                  transparent
//                  onRequestClose={() => {
//                  this.setState({ ...this.state, imageViewerShown: false });
//                  }}
//               >
//                       <ImageViewer
//                           index={this.state.imageViewerCurIndex}
//                           imageUrls={images}
//                       />
//                 </Modal>
//                 <View style={{ backgroundColor: '#FFF', padding: 20 }}>
//                   <Text style={{ fontSize: 16 }}>Description Here</Text>
//                 </View>
//                 <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, padding: 10, position: 'relative' }}>
//                   <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginLeft: 25 }}>Good Practice</Text>
//                   <TouchableOpacity onPress={() => this.showImageViewer(0)}>
//                   <Image style={{ height: 193, width: width - 50 }} source={this.state.good_photo} />
//                   </TouchableOpacity>
//                   <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'green', position: 'absolute', left: 10, top: 15 }} />
//                 </View>
//                 <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, padding: 10, position: 'relative' }}>
//                   <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginLeft: 25 }}>Bad Practice</Text>
//                   <TouchableOpacity onPress={() => this.showImageViewer(1)}>
//                   <Image style={{ height: 193, width: width - 50 }} source={this.state.bad_photo} />
//                   </TouchableOpacity >
//                   <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'red', position: 'absolute', left: 10, top: 15 }} />
//                 </View>
//           </View>
//         );
//     }
//
//     render() {
//         return (
//             this.renderImageList()
//         );
//     }
// }
//
// export default ComparePhotosScene;












import React, { Component } from 'react';
import { View,
    Modal,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
 } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFetchBlob from 'react-native-fetch-blob';

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
  this.setState({
    good_photo: require('../../../app_images/spreadfooting.jpg')
  });
  this.setState({
    bad_photo: require('../../../app_images/no_image.png')
  });
}


    showImageViewer(index) {
        console.log(index);
        this.setState({ ...this.state, imageViewerCurIndex: index, imageViewerShown: true });
    }

    renderImageList() {
        const { width } = Dimensions.get('window');


        const images = [{
            url: this.props.substep.good_photo,
            props: {
                // headers: ...
            }
        },
        {
            url: this.props.substep.bad_photo,
            props: {
                // headers: ...
            }
        }];

        return (
          <View>
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
                <View style={{ backgroundColor: '#FFF', padding: 20 }}>
                  <Text style={{ fontSize: 16 }}>Description Here</Text>
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, padding: 10, position: 'relative' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginLeft: 25 }}>Good Practice</Text>
                  <TouchableOpacity onPress={() => this.showImageViewer(0)}>
                  <Image style={{ height: 193, width: width - 50 }} source={this.state.good_photo} />
                  </TouchableOpacity>
                  <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'green', position: 'absolute', left: 10, top: 15 }} />
                </View>
          </View>
        );
    }

    render() {
        return (
            this.renderImageList()
        );
    }
}

export default ComparePhotosScene;
