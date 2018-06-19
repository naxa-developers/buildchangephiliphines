import React, { Component } from 'react';
import { Button, View, Text, LayoutAnimation, StyleSheet } from 'react-native';
import {  CheckBox, Card, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { ToggleCircle } from './common';
import { strings, getLocalizedText } from '../../locales/strings';
import DropdownAlert from 'react-native-dropdownalert';

class CheckListItem extends Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  // ...
  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }

  render() {
    const name = getLocalizedText(
      this.props.data.localtext,
      this.props.data.text
    );

    return (
      <View style={styles.container}>
        <CheckBox
          title={name}
          iconType='material-community'
          checkedIcon='check-outline'
          uncheckedIcon='close-outline'
          uncheckedColor='red'
          onPress={() => {
            this.setState({ checked: !this.state.checked });
          }}
          checked={this.state.checked}
        />
        <Button title='REPORT' style={{ justifyContent: 'flex-end' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  }
});

export default CheckListItem;
