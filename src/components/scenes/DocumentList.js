import React, { Component } from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";

import { List, ListItem } from "react-native-elements";
import { connect } from "react-redux";

class DocumentList extends Component {
  componentDidMount() {}

  render() {
    console.log("DocumentList render");
    return (
      <View>
        <List
          containerStyle={{
            borderTopWidth: 0,
            marginBottom: 20,
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 0
          }}
        >
          {this.props.array.map((l, i) => (
            <ListItem
              roundAvatar
              avatar={require("../../../app_images/pdf.png")}
              onPress={() => Actions.SitePlan({ path: l.file })}
              key={i}
              title={l.file
                .replace("http://bccms.naxa.com.np/media/site/documents/", "")
                .replace(".pdf", "")}
              containerStyle={{
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 15,
                paddingRight: 15,
                borderColor: "#EFEFF4",
                borderWidth: 10,
                borderBottomWidth: 0
              }}
            />
          ))}
        </List>
      </View>
    );
  }
}

const mapStateToProps = state => {
  let siteDocuments = state.schoolList.data.sites.filter(
    site => site.id === state.currentSelectedSchool.selectedSchoolId
  )[0].site_document;
  return {
    array: state.schoolList.data.sites.filter(
      site => site.id === state.currentSelectedSchool.selectedSchoolId
    )[0].site_document
  };
};

export default connect(mapStateToProps)(DocumentList);
