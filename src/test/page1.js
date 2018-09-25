import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import PrimaryPhoto from '../components/PrimaryPhoto';

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
  onCallInspectorTapped() {
      Actions.EngineerList();
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{this.props.substep.title}</Text>
        </View>

        <ListView
          dataSource={ds.cloneWithRows(this.props.substep.primary_photos)}
          renderRow={(rowData) => <PrimaryPhoto primaryPhoto={rowData} />}
        />


        <View style={[styles.buttonContainer, styles.buttonContainerGoodPhotoBadPhoto]}>

          { this.props.substep.good_photo &&
            <TouchableOpacity onPress={this.onGoodPhotoTapped.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#8dc540', paddingTop: 8, paddingBottom: 8, marginRight: 4, borderRadius: 5 }}>
              <Icon name={'check'} size={35} style={styles.iconStyle} />
              <Text style={styles.buttonText}>Good Photo</Text>
            </TouchableOpacity>
          }

          { this.props.substep.bad_photo &&
            <TouchableOpacity onPress={this.onBadPhotoTapped.bind(this)} style={this.props.substep.call_inspector ? { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', paddingTop: 8, paddingBottom: 8, marginLeft: 4, borderRadius: 5 } : { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', paddingTop: 8, paddingBottom: 8, borderRadius: 5 }}>
              <Icon name={'close'} size={35} style={styles.iconStyle} />
              <Text style={styles.buttonText}>Bad Photo</Text>
            </TouchableOpacity>
          }

        </View>

        <View style={[styles.buttonContainer, styles.buttonContainerCallInspectorReport]}>

          { this.props.substep.call_inspector &&
          <TouchableOpacity onPress={this.onCallInspectorTapped.bind(this)}style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4f82ad', paddingTop: 8, paddingBottom: 8, marginRight: 4, borderRadius: 5 }}>
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
