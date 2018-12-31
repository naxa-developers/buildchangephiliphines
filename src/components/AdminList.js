import React, { Component } from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import call from 'react-native-phone-call';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class AdminList extends Component {

onCallInspectorTapped(l) {
  const args = {
  number: l.phone_number, // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
};
if (l.phone_number) {
  AsyncStorage.getItem('token').then(token => {
    const url = 'http://bccms.naxa.com.np/core/api/call-log/';
    const formdata = new FormData();

    formdata.append('call_to', l.id);
    formdata.append('call_from', this.props.from);
    console.log(formdata);
    const req = {
      method: 'POST',
      headers: {
        Authorization: 'token ' + token,
        'Content-Type': 'multipart/form-data'
      },
      body: formdata
    };
    fetch(url, req)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
});
  call(args).catch(console.error);
} else {
  Alert.alert('Phone number not available');
}
}

  render() {
    console.log('engineerlist', this.props);
    return (
      <View>
      <List containerStyle={{ borderTopWidth: 0, marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 0 }}>
{
  this.props.admin.map((l, i) => (
    <ListItem
      roundAvatar
      avatar={require('../../app_images/person.png')}
      onPress={this.onCallInspectorTapped.bind(this, l)}
      key={i}
      title={l.user__username}
      containerStyle={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15, borderColor: '#EFEFF4', borderWidth: 10, borderBottomWidth: 0 }}

    />
  ))
}
</List>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('AdminList', state);
return {
  admin: state.schoolList.data.project_managers,
  from: state.currentUserGroup.currentUserId
};
};

export default connect(mapStateToProps)(AdminList);
