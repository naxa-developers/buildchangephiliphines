// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   Image,
//   TouchableOpacity
// } from 'react-native';
//
// class Page1 extends Component {
//
//   render() {
//     return (
//       <View>
//       <View style={{ padding: 15, margin: 15, marginBottom: 0, backgroundColor: "#FFF" }}>
//         <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>{this.props.substep.title}</Text>
//         <Image
//         resizeMode={'cover'}
//         style={{ height: 170 }}
//         source={require('../../app_images/spreadfooting.jpg')}
//         />
//         <View style={{ flexDirection: 'row', marginTop: 10 }}>
//           <TouchableOpacity style={{ flex: 1}}>
//             <Text style={{ padding: 15, backgroundColor: "rgba(0,0,0,.1)", textAlign: "center", fontWeight: "bold"}}>Good</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{ flex: 1 }}>
//             <Text style={{ padding: 15, backgroundColor: "rgba(0,0,0,.2)", textAlign: "center", fontWeight: "bold"}}>Bad</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{ flex: 1 }}>
//             <Text style={{ padding: 15, backgroundColor: "rgba(0,0,0,.3)", textAlign: "center", fontWeight: "bold" }}>Call</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//
//       </View>
//     );
//   }
// }
//
// export default Page1;












import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

class Page1 extends Component {

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

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text style={{ padding: 15, backgroundColor: "rgba(0,0,0,.1)", textAlign: "center", fontWeight: "bold"}}>Good</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text style={{ padding: 15, backgroundColor: "rgba(0,0,0,.2)", textAlign: "center", fontWeight: "bold"}}>Bad</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Page1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingTop: 15
  },
  titleContainer: {
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 8
  },
  imageContainer: {
    backgroundColor: 'white',
    alignItems: 'center'
  },
  image: {
    width: Dimensions.get('window').width - 16,
    height: 240,
    borderRadius: 10
  }
});
