import React, { Component } from 'react';
import { View,
    Image,
    Dimensions,
    StyleSheet,
    FlatList
 } from 'react-native';

class ComparePhotosScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.substep.primary_photos}
          renderItem={({ item }) => <View style={styles.imageContainer}>
            <Image style={styles.image} resizeMode={'contain'} source={{ uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/' + item.image }} />
          </View>}
        />
      </View>
    );
  }
}

export default ComparePhotosScene;

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8
  },
  imageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 10
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: 225,
    backgroundColor: 'white',
  }
});
