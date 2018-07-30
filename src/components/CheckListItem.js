import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
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
    if (!_.isEmpty(this.props.data.last_submission)) {
      this.setState({ checked: this.props.data.last_submission.report_status });
    }
}


  render() {
    console.log('render_bhitra');
    console.log('render_bhitra_last_submissionko_value');
    console.log(this.props.data.last_submission);
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
            this.props.dispatch(requestPerson({ checklistItemData: this.props.data, checklistItemValue: !this.state.checked }));
            this.setState({ checked: !this.state.checked });
          }}
          checked={this.state.checked}
          containerStyle={{ padding: 20, margin: 0, marginRight: 0, marginLeft: 0, backgroundColor: 'white' }}
          textStyle={{ fontSize: 16 }}
        />
        <TouchableOpacity
          onPress={() => Actions.ReportForm()}
          style={{ backgroundColor: '#FAFAFA', height: 40, borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Report</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  }
});

export default connect()(CheckListItem);
