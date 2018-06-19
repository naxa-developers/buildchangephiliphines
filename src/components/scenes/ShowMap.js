import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class ShowMap extends Component {


  render() {
    return (
      <MapView
      style={styles.map}
      initialRegion={{
            latitude: 27.719998,
            longitude: 85.324250,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bubble: {
   backgroundColor: 'rgba(255,255,255,0.7)',
   paddingHorizontal: 18,
   paddingVertical: 12,
   borderRadius: 20,
 },
 button: {
   marginTop: 12,
   paddingHorizontal: 12,
   alignItems: 'center',
   marginHorizontal: 10,
 },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
