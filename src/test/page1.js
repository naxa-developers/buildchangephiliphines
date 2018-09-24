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
// import Icon from 'react-native-vector-icons/FontAwesome';
//
// class Page1 extends Component {
//
//   onGoodPhotoTapped() {
//       Actions.ComparePhotosScene({ title: this.props.substep.title, substep: this.props.substep });
//   }
//   onBadPhotoTapped() {
//       Actions.BadPhoto({ title: this.props.substep.title, substep: this.props.substep });
//   }
//   onReportTapped() {
//       Actions.ReportForm(this.props.data);
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
//         <View style={[styles.buttonContainer, styles.buttonContainerGoodPhotoBadPhoto]}>
//           <TouchableOpacity style={{ flex: 1, paddingRight: 4 }} onPress={this.onGoodPhotoTapped.bind(this)}>
//             <Text style={[styles.buttonText, { backgroundColor: '#8dc540' }]}>Good Photo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{ flex: 1, paddingLeft: 4 }} onPress={this.onBadPhotoTapped.bind(this)}>
//             <Text style={[styles.buttonText, { backgroundColor: 'red' }]}>Bad Photo</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={[styles.buttonContainer, styles.buttonContainerCallInspectorReport]}>
//         { this.props.substep.call_inspector && <TouchableOpacity style={{ flex: 1, paddingTop: 8, paddingRight: 4 }} onPress={this.onBadPhotoTapped.bind(this)}>
//           <Text style={[styles.buttonText, { backgroundColor: '#4f82ad' }]}>Call Inspector</Text>
//         </TouchableOpacity>}
//
//         <TouchableOpacity style={this.props.substep.call_inspector ? { flex: 1, paddingTop: 8, paddingLeft: 4 } : { flex: 1, paddingTop: 8 }} onPress={this.onReportTapped.bind(this)}>
//           <Text style={[styles.buttonText, { backgroundColor: '#4f82ad' }]}>Report</Text>
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
//     backgroundColor: 'white',
//     paddingTop: 15,
//     marginTop: 12
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
//     borderRadius: 5
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     paddingLeft: 8,
//     paddingRight: 8,
//     backgroundColor: 'white'
//   },
//   buttonContainerGoodPhotoBadPhoto: {
//
//   },
//   buttonContainerCallInspectorReport: {
//     paddingBottom: 8,
//   },
//   buttonText: {
//     padding: 15,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: 'white',
//     borderRadius: 5
//   }
// });

// <View style={[styles.buttonContainer, styles.buttonContainerGoodPhotoBadPhoto]}>
//   <TouchableOpacity style={{ flex: 1, paddingRight: 4 }} onPress={this.onGoodPhotoTapped.bind(this)} >
//     <Text style={[styles.buttonText, { backgroundColor: '#8dc540' }]}>Good Photo</Text>
//   </TouchableOpacity>
//   <TouchableOpacity style={{ flex: 1, paddingLeft: 4 }} onPress={this.onBadPhotoTapped.bind(this)}>
//     <Text style={[styles.buttonText, { backgroundColor: 'red' }]}>Bad Photo</Text>
//   </TouchableOpacity>
// </View>








import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
TouchableOpacity } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

class Page1 extends Component {

  constructor() {
    super();
    this.state = {
        primary_photo: {}
    };
}


componentWillMount() {
  RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
      .then((exist) => {
          console.log(exist);
        if (exist) {
          if (this.props.substep.primary_photo === null) {
            this.setState({
              primary_photo: require('../../app_images/no_image.png')
            });
          }
          else if (this.props.substep.primary_photo !== null) {
            this.setState({
              primary_photo: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/' + this.props.substep.primary_photo }
            });
          }
      }
      else if (!exist) {
        if (this.props.substep.primary_photo === null) {
          this.setState({
            primary_photo: require('../../app_images/no_image.png')
          });
        }
        else if (this.props.substep.primary_photo !== null) {
          this.setState({
            primary_photo: require('../../app_images/no_image.png')
          });
        }
      }
      })
      .catch(() => {
          console.log('error while checking file');
      });
}


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
          style={styles.image}
          source={this.state.primary_photo}
        />
        </View>


        <View style={[styles.buttonContainer, styles.buttonContainerGoodPhotoBadPhoto]}>

          <TouchableOpacity onPress={this.onGoodPhotoTapped.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#8dc540', paddingTop: 8, paddingBottom: 8, marginRight: 4, borderRadius: 5 }}>
            <Icon name={'check'} size={35} style={styles.iconStyle} />
            <Text style={styles.buttonText}>Good Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onBadPhotoTapped.bind(this)} style={this.props.substep.call_inspector ? { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', paddingTop: 8, paddingBottom: 8, marginLeft: 4, borderRadius: 5 } : { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', paddingTop: 8, paddingBottom: 8, borderRadius: 5 }}>
            <Icon name={'close'} size={35} style={styles.iconStyle} />
            <Text style={styles.buttonText}>Bad Photo</Text>
          </TouchableOpacity>

        </View>

        <View style={[styles.buttonContainer, styles.buttonContainerCallInspectorReport]}>

          { this.props.substep.call_inspector &&
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4f82ad', paddingTop: 8, paddingBottom: 8, marginRight: 4, borderRadius: 5 }}>
            <Icon name={'phone-square'} size={35} style={styles.iconStyle} />
            <Text style={styles.buttonText}>Call Inspector</Text>
          </TouchableOpacity>
          }

          <TouchableOpacity onPress={this.onReportTapped.bind(this)} style={this.props.substep.call_inspector ? { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4f82ad', paddingTop: 8, paddingBottom: 8, marginLeft: 4, borderRadius: 5 } : { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4f82ad', paddingTop: 8, paddingBottom: 8, borderRadius: 5 }}>
            <Icon name={'newspaper-o'} size={35} style={styles.iconStyle} />
            <Text style={styles.buttonText}>Report</Text>
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
    marginTop: 12,
  },
  titleContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
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
    alignItems: 'center',
    paddingBottom: 8
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
    backgroundColor: 'white',
    paddingBottom: 8
  },
  buttonContainerGoodPhotoBadPhoto: {

  },
  buttonContainerCallInspectorReport: {
    paddingBottom: 8,
  },
  iconStyle: {
    color: 'white'
  },
  buttonText: {
    paddingLeft: 5,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16
  }
});
