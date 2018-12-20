import React, { Component } from 'react';
import { View, ScrollView, Text, AsyncStorage, Alert, TextInput } from 'react-native';
import {
  Button
} from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import { strings } from './../../locales/strings';

class ReportForm extends Component {
  state = {
    avatarSource: null,
    comments: '',
    uploading: false,
    uri: null
  };

  componentWillMount() {
    this.getLocale();
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('else bhitra', response);
        let source = { uri: response.uri };
        this.setState({ ...this.state, uri: response.uri });

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  async getLocale() {
    return await AsyncStorage.getItem('locale').then((value) => {
      strings.setLanguage(value);
    });
}

  uploadComment(checklist) {
    console.log('uploadCommentko_bhitra');
    console.log(this.props);
    const { id } = checklist.substep;

    if (!this.state.comments) {
      return;
    }
    console.log('hello check return');
    this.setState({ ...this.state, uploading: true });
    AsyncStorage.multiGet(['user_id', 'token']).then(user => {
      let userID;
      let token;

      if (user[0][0] === 'user_id') {
        userID = user[0][1];
      } else if (user[1][0] === 'user_id') {
        userID = user[1][1];
      }

      if (user[0][0] === 'token') {
        userID = user[0][1];
      } else if (user[1][0] === 'token') {
        token = user[1][1];
      }
      console.log(userID);
      console.log(token);

      const url = 'http://bccms.naxa.com.np/core/api/report/';

      const formdata = new FormData();
      formdata.append('comment', this.state.comments);
      formdata.append('user', userID);
      formdata.append('substep', id);
      formdata.append('site', this.props.siteId)
      formdata.append('step', this.props.stepId)
      //step ra site pani thapne
      if (this.state.uri !== null) {
        formdata.append('photo', {
          uri: this.state.uri,
          type: 'image/jpeg',
          name: 'comment.jpeg'
        });
      }

      const req = {
        method: 'POST',
        headers: {
          Authorization: 'token ' + token,
          'Content-Type': 'multipart/form-data'
        },

        body: formdata
      };

      fetch(url, req)
        .then(response => {
          if (response.ok) {
            console.log('response ok');
            this.setState({ ...this.state, uploading: false });
            this.setState({ ...this.state, comments: '' });
            Alert.alert(strings.event_upload_success_title, strings.event_upload_sucess_text, [
              { text: strings.action_close, onPress: () => Actions.pop(), style: 'cancel' }
            ]);
            return response;
          }

          this.setState({ ...this.state, uploading: false });
          Alert.alert(
            strings.event_upload_failed_title,
            strings.event_no_intenet_text,
            [
              {
                text: strings.action_close,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              }
            ]
          );

          console.log('response error');
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
        })
        .catch(error => console.log(error));
      console.log(req);
    });
  }

  toggleUploadAnim() {
    this.setState({ ...this.state, uploading: !this.state.uploading });
  }



  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.centerHeader}>
            Please fill up the form and send your report
          </Text>
          <View style={{ margin: 15, borderWidth: 1, padding: 10, paddingTop: 5, borderColor: 'rgba(0,0,0,.3)' }}>
          <TextInput
            editable
            onChangeText={(comments) => this.setState({ ...this.state, comments })}
            placeholder={strings.error_field_cannot_be_empty}
            ref='comments'
            returnKeyType='next'
            value={this.state.comments}
            autoCapitalize='none'
            underlineColorAndroid='transparent'
            style={{ textAlignVertical: 'top', minHeight: 100, lineHeight: 24, fontWeight: 'normal', fontSize: 16 }}
            multiline
            autoFocus
          />
          </View>
          <Button
            icon={{
              name: 'camera',
              size: 24,
              color: 'white'
            }}
            onPress={this.selectPhotoTapped.bind(this)}
            title={strings.view_take_photo}
            titleStyle={{ fontWeight: '700' }}
            containerStyle={{ marginTop: 20 }}
          />
          <Button
            onPress={this.uploadComment.bind(this, this.props)}
            loading={this.state.uploading}
            title={strings.action_report}
            loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: '#8CC63E',
              marginTop: 10
            }}
          />
          <Button
            onPress={() => Actions.pop()}
            title={strings.action_cancel}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: '#E8656A',
              marginTop: 10
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  centerHeader: { marginTop: 10, fontSize: 16, marginLeft: 15 },
  buttonStyle: {
    width: 200,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  }
};

const mapStateToProps = (state) => {
  console.log('ShowMapko_mapstatetoprops_bhitra');
  const { sites } = state.schoolList.data;
  const { selectedSchoolId } = state.currentSelectedSchool;

const found = sites.find(function(element) {
  return element.id === selectedSchoolId;
});

console.log('foundKO_value');
console.log(found);
return {
  siteId: found.id
};
};

export default connect(mapStateToProps)(ReportForm);
