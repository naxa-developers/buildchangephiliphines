import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class ShowMap extends Component {

  render() {
    console.log('showmap_ko_bhitra');
    console.log(this.props);
    return (
            <MapView
            style={styles.map}
            initialRegion={{
             latitude: 37.78825,
             longitude: -122.4324,
             latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
            }}
            />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
