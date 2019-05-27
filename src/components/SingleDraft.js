import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { CardSection } from "./common";
import { storeCurrentSelectedSchool, storeAddress } from "../actions/index";

class SingleDraft extends Component {
  onSiteTapped = () => {
    const {
      draft,
      storeAddress,
      storeCurrentSelectedSchool,
      currentUserGroup
    } = this.props;
    storeAddress({ selectedAddress: draft.address });
    storeCurrentSelectedSchool({ schoolId: draft.id });
    if (draft.stepId && draft.subStepId) {
      if (currentUserGroup === "Field Engineer") {
        Actions.ReportEngineer({
          substep: {
            id: draft.subStepId
          },
          stepId: draft.stepId,
          inDraft: true
        });
      } else {
        Actions.ReportForm({
          substep: {
            id: draft.subStepId
          },
          stepId: draft.stepId,
          inDraft: true
        });
      }
    } else {
      Actions.ReportSchool({
        inDraft: true
      });
    }
  };

  render() {
    const { titleStyle, subtitleStyle, cointainerStyle } = styles;
    const { draft } = this.props;

    return (
      <TouchableOpacity onPress={this.onSiteTapped.bind(this)}>
        <CardSection>
          <View style={cointainerStyle}>
            <Text numberOfLines={2} style={titleStyle}>
              {draft.name}
            </Text>

            {draft.stepName && (
              <Text style={subtitleStyle}>{draft.stepName}</Text>
            )}
            {draft.subStepTitle && (
              <Text style={subtitleStyle}>{draft.subStepTitle}</Text>
            )}

            <Text style={subtitleStyle}>{draft.comment}</Text>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  }
}

const styles = {
  titleStyle: {
    paddingLeft: 16,
    fontSize: 17,
    fontWeight: "bold",
    color: "#000"
  },
  subtitleStyle: {
    paddingLeft: 16,
    fontSize: 15,
    color: "#908989"
  },
  cointainerStyle: {
    marginTop: 16,
    marginBottom: 16,
    justifyContent: "center",
    borderBottomWidth: 0,
    backgroundColor: "#fff",
    flexDirection: "column"
  }
};

export default connect(
  null,
  { storeAddress, storeCurrentSelectedSchool }
)(SingleDraft);
