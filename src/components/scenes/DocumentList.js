import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class DocumentList extends Component {
constructor() {
  super();
  this.state = {
    isLoading: true,
    documentList: []
  };
}
  componentDidMount() {
    console.log('component_did_mount_bhitraaaaaaa');
    fetch('http://bccms.naxa.com.np/core/api/site-documents/'+this.props.selectedSchoolId+'/')
      .then((res) => res.json())
      .then((array) => {
        console.log('fetch_bhitra');
        console.log(array);
        this.setState({
          documentList: array,
          isLoading: false
        });
      });
  }


  render() {
    console.log('DocumentList_bhitra');
    console.log('this.propsko_value');
    console.log(this.props);
    if (this.props.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
      <List containerStyle={{ borderTopWidth: 0, marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 0 }}>
{
  this.state.documentList.map((l, i) => (
    <ListItem
      roundAvatar
      avatar={require('../../../app_images/pdf.png')}
      onPressRightIcon={() => Actions.ShowDocuments({ path: l.file })}
      key={i}
      title={l.document_name}
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
  console.log('documentLIstko_mapstatetoprops_bhitra');
  console.log(state);
return {
  selectedSchoolId: state.currentSelectedSchool.selectedSchoolId
};
};

export default connect(mapStateToProps)(DocumentList);
