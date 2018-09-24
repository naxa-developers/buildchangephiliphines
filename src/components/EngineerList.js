import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class EngineerList extends Component {

  render() {
    console.log('DocumentList_bhitra');
    console.log('this.propsko_value');
    console.log(this.props);
    return (
      <View>
      <List containerStyle={{ borderTopWidth: 0, marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 0 }}>
{
  this.props.engineers.map((l, i) => (
    <ListItem
      roundAvatar
      avatar={require('../../app_images/pdf.png')}
      onPressRightIcon={() => Actions.ShowDocuments({ path: l.file })}
      key={i}
      title={l.user}
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
  console.log('ShowMapko_mapstatetoprops_bhitra');
  const { sites } = state.schoolList.data;
  const { selectedSchoolId } = state.currentSelectedSchool;

const found = sites.find(function(element) {
  return element.id === selectedSchoolId;
});

console.log('foundKO_value');
console.log(found);
const str = found.site_engineers;
return {
  engineers: str
};
};

export default connect(mapStateToProps)(EngineerList);
