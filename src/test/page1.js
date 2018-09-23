// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity
// } from 'react-native';
// import { Actions } from 'react-native-router-flux';
//
// class Page1 extends Component {
//
//   onGoodPhotoTapped() {
//       Actions.ComparePhotosScene({ title: this.props.substep.title, substep: this.props.substep });
//   }
//   onBadPhotoTapped() {
//       Actions.BadPhoto({ title: this.props.substep.title, substep: this.props.substep });
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//
//         <View style={styles.titleContainer}>
//           <Text style={styles.titleText}>{this.props.substep.title}</Text>
//         </View>
//
//         <View style={styles.imageContainer}>
//         <Image
//           resizeMode={'contain'}
//           style={styles.image}
//           source={require('../../app_images/spreadfooting.jpg')}
//         />
//         </View>
//
//         <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, backgroundColor: 'white' }}>
//           <TouchableOpacity style={{ flex: 1, paddingRight: 4,  }} onPress={this.onGoodPhotoTapped.bind(this)}>
//             <Text style={{ padding: 15, backgroundColor: "#8dc540", textAlign: "center", fontWeight: "bold", color: 'white', borderRadius: 10 }}>Good Photo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{ flex: 1, paddingLeft: 4}} onPress={this.onBadPhotoTapped.bind(this)}>
//             <Text style={{ padding: 15, backgroundColor: "red", textAlign: "center", fontWeight: "bold", color: 'white', borderRadius: 10}}>Bad Photo</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{ flexDirection: 'row', flex: 1, paddingLeft: 8, paddingRight: 8, paddingBottom: 8, backgroundColor: 'white'}}>
//         { this.props.substep.call_inspector && <TouchableOpacity style={{ flex: 1, paddingTop: 8, paddingRight: 4 }} onPress={this.onBadPhotoTapped.bind(this)}>
//           <Text style={{ padding: 15, backgroundColor: "#4f82ad", textAlign: "center", fontWeight: "bold", color: 'white', borderRadius: 10}}>Call Inspector</Text>
//         </TouchableOpacity>}
//
//         <TouchableOpacity style={{ flex: 1, paddingTop: 8, paddingLeft: 4 }} onPress={this.onBadPhotoTapped.bind(this)}>
//           <Text style={{ padding: 15, backgroundColor: "#4f82ad", textAlign: "center", fontWeight: "bold", color: 'white', borderRadius: 10}}>Report</Text>
//         </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }
//
// export default Page1;
//
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'transparent',
//     paddingTop: 15
//   },
//   titleContainer: {
//     backgroundColor: 'white',
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     paddingLeft: 8,
//     color: 'black',
//     textAlign: 'center'
//   },
//   imageContainer: {
//     backgroundColor: 'white',
//     alignItems: 'center'
//   },
//   image: {
//     width: Dimensions.get('window').width - 16,
//     height: 240,
//     borderRadius: 10
//   }
// });














import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Page1 extends Component {

  onGoodPhotoTapped() {
      Actions.ComparePhotosScene({ title: this.props.substep.title, substep: this.props.substep });
  }
  onBadPhotoTapped() {
      Actions.BadPhoto({ title: this.props.substep.title, substep: this.props.substep });
  }
  onReportTapped() {
      Actions.ReportForm(this.props.data);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{this.props.substep.title}</Text>
        </View>

        <View style={styles.imageContainer}>
        <Image
          resizeMode={'contain'}
          style={styles.image}
          source={require('../../app_images/spreadfooting.jpg')}
        />
        </View>

        <View style={[styles.buttonContainer, styles.buttonContainerGoodPhotoBadPhoto]}>
          <TouchableOpacity style={{ flex: 1, paddingRight: 4 }} onPress={this.onGoodPhotoTapped.bind(this)}>
            <Text style={[styles.buttonText, { backgroundColor: '#8dc540' }]}>Good Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, paddingLeft: 4 }} onPress={this.onBadPhotoTapped.bind(this)}>
            <Text style={[styles.buttonText, { backgroundColor: 'red' }]}>Bad Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonContainer, styles.buttonContainerCallInspectorReport]}>
        { this.props.substep.call_inspector && <TouchableOpacity style={{ flex: 1, paddingTop: 8, paddingRight: 4 }} onPress={this.onBadPhotoTapped.bind(this)}>
          <Text style={[styles.buttonText, { backgroundColor: '#4f82ad' }]}>Call Inspector</Text>
        </TouchableOpacity>}

        <TouchableOpacity style={this.props.substep.call_inspector ? { flex: 1, paddingTop: 8, paddingLeft: 4 } : { flex: 1, paddingTop: 8 }} onPress={this.onReportTapped.bind(this)}>
          <Text style={[styles.buttonText, { backgroundColor: '#4f82ad' }]}>Report</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Page1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 15,
    marginTop: 12
  },
  titleContainer: {
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 8,
    color: 'black',
    textAlign: 'center'
  },
  imageContainer: {
    backgroundColor: 'white',
    alignItems: 'center'
  },
  image: {
    width: Dimensions.get('window').width - 16,
    height: 240,
    borderRadius: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white'
  },
  buttonContainerGoodPhotoBadPhoto: {

  },
  buttonContainerCallInspectorReport: {
    paddingBottom: 8,
  },
  buttonText: {
    padding: 15,
    backgroundColor: '#8dc540',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 5
  }
});
