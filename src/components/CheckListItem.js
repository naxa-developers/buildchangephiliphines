import React, { Component } from 'react';
import { Button, View, StyleSheet, NetInfo } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { getLocalizedText } from '../../locales/strings';
import { connectionState, requestPersonByUrl, requestPerson } from '../actions';

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
  NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
}

componentWillUnmount() {
  NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
}

_handleConnectionChange = (isConnected) => {
  const { dispatch, actionQueue } = this.props;
  dispatch(connectionState({ status: isConnected }));

  if (isConnected && actionQueue.length > 0) {
    actionQueue.forEach((eachElement) => {
      this.props.dispatch(requestPersonByUrl(eachElement));
    });
  }
};

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
          iconType='material-community'
          checkedIcon='check-outline'
          uncheckedIcon='close-outline'
          uncheckedColor='red'
          onPress={() => {
            //checkmarkId not defined yet
            this.props.dispatch(requestPerson({ checklistItemData: this.props.data, checklistItemValue: !this.state.checked }));
            this.setState({ checked: !this.state.checked });
          }}
          checked={this.state.checked}
        />
        <Button
        onPress={() => Actions.ReportForm()}
         title='REPORT' style={{ justifyContent: 'flex-end' }} />
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

const mapStateToProps = (state) => {
  console.log('mapStateToPropsko_bhitra');
  console.log(state);
  return {
    actionQueue: state.actionQueue.actionQueue,
    isConnected: state.isConnected.isConnected,
  };
};

export default connect(mapStateToProps)(CheckListItem);
