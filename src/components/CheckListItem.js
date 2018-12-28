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


  render() {
    console.log('********');
    console.log(this.props.data);
    console.log('**********');
    console.log(this.state.checked);

    return (
      <View style={styles.container}>
      {this.props.data.description && <View style={styles.subContainer}><Text style={styles.descriptionText}>{this.props.data.description}</Text></View>}
      <CheckBox
        title={this.props.data.title}
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        uncheckedColor='red'
        onPress={() => {
          this.props.dispatch(requestPerson({ checklistItemData: this.props.data, checklistItemValue: !this.state.checked, userId: this.props.currentUserId }));
          this.setState({ checked: !this.state.checked });
        }}
        checked={this.state.checked}
        containerStyle={{ padding: 15, margin: 0, marginRight: 0, marginLeft: 0, backgroundColor: 'white' }}
        textStyle={{ fontSize: 16, fontWeight: 'normal' }}
      />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('checklist ITEM ko_mapStateToPropsko_bhitra');
  console.log(state);
  return {
    currentUserGroup: state.currentUserGroup.currentUserGroup,
    currentUserId: state.currentUserGroup.currentUserId,
  };
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    flex: 1,

    backgroundColor: 'white'
  },
buttonWrapper: {
  flexDirection: 'row'
},
subContainer: {
  padding: 15,
  backgroundColor: 'rgba(255,255,255,1)',
  borderBottomWidth: 1,
  borderColor: 'rgba(0,0,0,0.08)'
},
descriptionText: {

}
});

export default connect(mapStateToProps)(CheckListItem);
