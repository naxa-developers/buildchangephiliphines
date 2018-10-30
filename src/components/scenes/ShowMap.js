import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

class ShowMap extends Component {

  render() {
    console.log('showmap_ko_bhitra');
    console.log(this.props);
    const { latitude, longitude } = this.props.selectedSchoolLocationData
    return (
            <MapView
            style={styles.map}
            initialRegion={{
             latitude: latitude,
             longitude: longitude,
             latitudeDelta: 0.9,
             longitudeDelta: 0.9
            }}
            >
            <MapView.Marker
              coordinate={{ latitude, longitude }}
            />
            </MapView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('ShowMapko_mapstatetoprops_bhitra');
  const { sites } = state.schoolList.data;
  const { selectedSchoolId } = state.currentSelectedSchool;

const found = sites.find(function(element) {
  return element.id === selectedSchoolId;
});

console.log('foundKO_value');
console.log(found);
const str = found.location;
console.log('latitude', parseFloat(str.split("(").pop().split(" ")[0]));
console.log('longitude', parseFloat(str.split(' ').pop().split(')')[0]));
return {
  selectedSchoolLocationData: {
    longitude: parseFloat(str.split("(").pop().split(" ")[0]),
    latitude: parseFloat(str.split(' ').pop().split(')')[0])
  }
};
};

export default connect(mapStateToProps)(ShowMap);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
