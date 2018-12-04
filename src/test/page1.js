import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  ListView } from 'react-native';
  import { ImageViewer } from 'react-native-image-zoom-viewer';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import PrimaryPhoto from '../components/PrimaryPhoto';
import { getLocalizedText, strings } from '../../locales/strings';


class Page1 extends Component {

  constructor() {
    super();
    this.state = {
        imageViewerShown: false,
        id: 0
    };
}

  componentWillMount() {
    this.getLocale();
  }
  onGoodPhotoTapped() {
      Actions.ComparePhotosScene({ title: getLocalizedText(this.props.substep.local_title, this.props.substep.title), substep: this.props.substep });
  }
  onBadPhotoTapped() {
      Actions.BadPhoto({ title: getLocalizedText(this.props.substep.local_title, this.props.substep.title), substep: this.props.substep });
  }
  onReportTapped() {
      Actions.ReportForm({ substep: this.props.substep, stepId: this.props.stepId });
  }
  onCallInspectorTapped() {

      Actions.EngineerList();
  }
  async getLocale() {
    return await AsyncStorage.getItem('locale').then((value) => {
      strings.setLanguage(value);
    });
}
showImageViewer(id) {
    this.setState({ ...this.state, imageViewerShown: true, id: id });
}

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const images = [];
    this.props.substep.primary_photos.forEach((ea) => {
      images.push({ url: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines' + ea.image });
    });

    return (
      <View style={styles.container}>

      <Modal
         visible={this.state.imageViewerShown}
         transparent
         onRequestClose={() => {
         this.setState({ ...this.state, imageViewerShown: false });
         }}
      >
              <ImageViewer
                  imageUrls={images}
                  index={this.state.id}
              />
        </Modal>

  <View style={styles.titleContainer}>
    <Text style={styles.titleText}>{getLocalizedText(this.props.substep.local_title, this.props.substep.title)}</Text>
  </View>

  <ListView
    dataSource={ds.cloneWithRows(this.props.substep.primary_photos)}
    renderRow={(rowData) => {
      return (<TouchableOpacity onPress={this.showImageViewer.bind(this, this.props.substep.primary_photos.indexOf(rowData))}><PrimaryPhoto primaryPhoto={rowData} /></TouchableOpacity>);
    }
    }
  />
  <Text style={{ paddingLeft: 8, paddingRight: 8 }}>{this.props.substep.description}</Text>
        <View style={[styles.buttonContainer, styles.buttonContainerGoodPhotoBadPhoto]}>

          { this.props.substep.good_photos.length !== 0 &&
            <TouchableOpacity onPress={this.onGoodPhotoTapped.bind(this)} style={{ marginTop: 5, flexWrap: 'wrap', flex: 1, flexDirection: 'row', backgroundColor: '#8dc540', padding: 8, borderRadius: 5, marginRight: 4 }}>
              <Icon name={'check'} size={35} style={styles.iconStyle} />
              <View style={{ flexDirection: 'column', paddingRight: 15, width: 100 }}><Text style={styles.buttonText}>{strings.view_good_photo_title}</Text></View>
            </TouchableOpacity>
          }

          { this.props.substep.bad_photos.length !== 0 &&
            <TouchableOpacity onPress={this.onBadPhotoTapped.bind(this)} style={this.props.substep.call_inspector ? { marginTop: 5, flex: 1, flexDirection: 'row', backgroundColor: 'red', padding: 8, borderRadius: 5 } : { flex: 1, marginTop: 5, flexDirection: 'row', backgroundColor: 'red', paddingTop: 8, paddingBottom: 8, borderRadius: 5, marginLeft: 4 }}>
              <Icon name={'close'} size={35} style={styles.iconStyle} />
              <Text style={styles.buttonText}>{strings.view_bad_photo_title}</Text>
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
            <Text style={styles.buttonText}>{strings.view_upload_reprot}</Text>
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
    flex: 1,
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
