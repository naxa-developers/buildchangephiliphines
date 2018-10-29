// import React, { Component } from 'react';
// import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
//
// class MaterialPhoto extends Component {
//   render() {
//     const imgURI = 'http://alrashedcement.com/wp-content/uploads/2017/08/greycement2.jpg';
//     //console.log('imageko value', imgURI);
//     Image.getSize(imgURI, (width, height) => {
//       console.log('width', width);
//     },() => {
//       console.log("Bad Code");
//     });
//     return (
//       <View style={styles.mainContainer}>
//         <View style={styles.subContainer}>
//           <Text style={styles.imageHeader}>Cement</Text>
//           <Image
//           style={styles.imageStyle}
//           source={require('../../../app_images/cement.jpg')}
//           resizeMode={'contain'}
//           />
//           <Text style={styles.imageDescription}>The Cement is of good quality because of the specified reason</Text>
//         </View>
//       </View>
//     );
//   }
// }
//
// export default MaterialPhoto;
//
//
//
// const styles = StyleSheet.create({
//   mainContainer: {
//
//   },
//   subContainer: {
//
//   },
//   imageHeader: {
//
//   },
//   imageDescription: {
//
//   },
//   imageStyle: {
//     width: Dimensions.get('window').width,
//     height: Math.round((Dimensions.get('window').width * 9) / 16)
//   }
// });



import React, { Component } from 'react';
import { View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
 } from 'react-native';

class MaterialPhoto extends Component {

    renderImageList() {
        const { width } = Dimensions.get('window');

        return (
          <View>
                <View style={{ backgroundColor: '#FFF', padding: 20 }}>
                  <Text style={{ fontSize: 16 }}>Description Here</Text>
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, padding: 10, position: 'relative' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginLeft: 25 }}>Good Practice</Text>
                  <TouchableOpacity>
                  <Image style={{ height: 193, width: width - 50 }} source={require('../../../app_images/cement.jpg')} />
                  </TouchableOpacity>
                  <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'green', position: 'absolute', left: 10, top: 15 }} />
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, padding: 10, position: 'relative' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginLeft: 25 }}>Bad Practice</Text>
                  <TouchableOpacity>
                  <Image style={{ height: 193, width: width - 50 }} source={require('../../../app_images/cement.jpg')} />
                  </TouchableOpacity >
                  <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'red', position: 'absolute', left: 10, top: 15 }} />
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

export default MaterialPhoto;
