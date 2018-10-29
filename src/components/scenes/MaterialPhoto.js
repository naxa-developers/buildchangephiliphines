import React, { Component } from 'react';
import { View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView
 } from 'react-native';

class MaterialPhoto extends Component {

    renderImageList() {
        const { width } = Dimensions.get('window');

        return (
          <ScrollView>
                <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, padding: 15, position: 'relative', borderRadius: 5}}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15, marginLeft: 25 }}>Good Cement</Text>
                  <TouchableOpacity>
                  <Image style={{ height: 193, width: width - 50, marginBottom: 10 }} source={require('../../../app_images/cement.jpg')} />
                  </TouchableOpacity>
                  <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'green', position: 'absolute', left: 15, top: 20 }} />
                  <Text style={{ fontSize: 17, lineHeight: 22 }}>This material of good quality because of the the reasons specified This material of good quality because of the the reasons specified</Text>
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 15, marginLeft: 15, marginRight: 15, marginBottom: 15, padding: 15, position: 'relative', borderRadius: 5 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15, marginLeft: 25 }}>Bad Cement</Text>
                  <TouchableOpacity>
                  <Image style={{ height: 193, width: width - 50, marginBottom: 10 }} source={require('../../../app_images/cement.jpg')} />
                  </TouchableOpacity >
                  <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: 'red', position: 'absolute', left: 15, top: 20 }} />
                  <Text style={{ fontSize: 17, lineHeight: 22 }}>This material of bad quality because of the the reasons specified</Text>
                </View>
          </ScrollView>
        );
    }

    render() {
        return (
            this.renderImageList()
        );
    }
}

export default MaterialPhoto;
