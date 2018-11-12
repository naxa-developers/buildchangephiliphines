import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import call from 'react-native-phone-call';
import { getLocalizedText } from '../../locales/strings';
import { requestPerson } from '../actions';


class CheckListItem extends Component {
  constructor() {
    console.log('constructor');
    super();
    this.state = {
      checked: false
    };
  }
  componentDidMount() {
      this.setState({ checked: this.props.data.status });
}

onCallAdmin() {
  const args = {
  number: this.props.admin.phone_number, // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
};
AsyncStorage.getItem('token').then(token => {
  const url = 'http://bccms.naxa.com.np/core/api/call-log/';
  const formdata = new FormData();

  formdata.append('call_to', this.props.admin.user);
  formdata.append('call_from', this.props.currentUserId);
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

}


  render() {
    console.log('********');
    console.log(this.props.data);
    console.log('**********');
    console.log(this.state.checked);
    const name = getLocalizedText(
      this.props.data.localtext,
      this.props.data.text
    );

    return (
      <View style={styles.container}>
      <CheckBox
        title={name}
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        uncheckedColor='red'
        onPress={() => {
          this.props.dispatch(requestPerson({ checklistItemData: this.props.data, checklistItemValue: !this.state.checked, userId: this.props.currentUserId }));
          this.setState({ checked: !this.state.checked });
        }}
        checked={this.state.checked}
        containerStyle={{ padding: 20, margin: 0, marginRight: 0, marginLeft: 0, backgroundColor: 'white' }}
        textStyle={{ fontSize: 16 }}
      />
      <View style={styles.buttonWrapper}>
      <TouchableOpacity
        onPress={() => Actions.ReportEngineer({ substep: this.props.data.substep, stepId: this.props.data.step })}
        style={{ backgroundColor: '#FAFAFA', height: 40, borderWidth: 0, alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Report</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.onCallAdmin()}
        style={{ backgroundColor: '#FAFAFA', height: 40, alignItems: 'center', justifyContent: 'center', flex: 1, borderLeftWidth: 1, borderColor: 'rgba(0,0,0,0.08)' }}
      >
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Call Admin</Text>
      </TouchableOpacity>
      </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('CHECKLISTKO_mapStateToPropsko_bhitra');
  console.log(state);
  return {
    currentUserGroup: state.currentUserGroup.currentUserGroup,
    currentUserId: state.currentUserGroup.currentUserId,
    admin: state.schoolList.data.admin[0]
  };
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  },
buttonWrapper: {
  flexDirection: 'row'
}
});

export default connect(mapStateToProps)(CheckListItem);
