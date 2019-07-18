import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

class ShowMap extends Component {
  render() {
    const { latitude, longitude } = this.props.selectedSchoolLocationData;
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.9,
          longitudeDelta: 0.9
        }}
      >
        <MapView.Marker coordinate={{ latitude, longitude }} />
      </MapView>
    );
  }
}

const mapStateToProps = state => {
  const { sites } = state.schoolList.data;
  const { selectedSchoolId } = state.currentSelectedSchool;

  const found = sites.find(function(element) {
    return element.id === selectedSchoolId;
  });

  const str = found.location;

  return {
    selectedSchoolLocationData: {
      longitude: parseFloat(
        str
          .split("(")
          .pop()
          .split(" ")[0]
      ),
      latitude: parseFloat(
        str
          .split(" ")
          .pop()
          .split(")")[0]
      )
    }
  };
};

export default connect(mapStateToProps)(ShowMap);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
