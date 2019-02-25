import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class DocumentList extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <View>
      <List containerStyle={{ borderTopWidth: 0, marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 0 }}>
      {
        this.props.array.map((l, i) => (
          <ListItem
          roundAvatar
          avatar={require('../../../app_images/pdf.png')}
          onPress={() => Actions.ShowDocuments({ path: l.file.replace('http://bccms.naxa.com.np', 'file:///storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines'), title: 'Site Plan' })}
          key={i}
          title={l.file.replace('http://bccms.naxa.com.np/media/site/documents/', '').replace('.pdf', '')}
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
  console.log('siteplans bhitra', state);
  let siteDocuments = state.schoolList.data.sites.filter((site) => site.id === state.currentSelectedSchool.selectedSchoolId)[0].site_document;
  console.log('school', siteDocuments);
  return {
  array: state.schoolList.data.sites.filter((site) => site.id === state.currentSelectedSchool.selectedSchoolId)[0].site_document
  };
};

export default connect(mapStateToProps)(DocumentList);
