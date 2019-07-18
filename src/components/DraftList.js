import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import SingleDraft from "./SingleDraft";

class DraftList extends Component {
  render() {
    return this.props.drafts.length > 0 ? (
      <View>
        <FlatList
          data={this.props.drafts}
          renderItem={({ item }) => (
            <SingleDraft
              draft={item}
              currentUserGroup={this.props.currentUserGroup}
            />
          )}
        />
      </View>
    ) : (
      <View style={styles.containerStyle}>
        <Text style={styles.subtitleStyle}>You have no reports in Draft.</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { sites } = state.schoolList.data;
  const { drafts } = state.drafts;
  const { currentUserGroup, currentUserId } = state.currentUserGroup;
  const updatedDrafts = [];

  if (drafts.length > 0) {
    drafts
      .filter(draft => draft.draftUserId === currentUserId)
      .forEach((filteredDraft, i) => {
        sites.forEach((site, ind) => {
          if (site.id === filteredDraft.siteId) {
            const siteInDraft = {};
            siteInDraft["id"] = site.id;
            siteInDraft["name"] = site.name;
            siteInDraft["address"] = site.address.split(", ")[1];
            if (filteredDraft.stepId) {
              site.site_steps.forEach(step => {
                if (step.id === filteredDraft.stepId) {
                  siteInDraft["stepId"] = step.id;
                  siteInDraft["stepName"] = step.step;
                  if (filteredDraft.subStepId) {
                    step.sub_steps.forEach(subStep => {
                      if (subStep.id === filteredDraft.subStepId) {
                        siteInDraft["subStepId"] = subStep.id;
                        siteInDraft["subStepTitle"] = subStep.title;
                      }
                    });
                  }
                }
              });
            }
            siteInDraft["comment"] = filteredDraft.comment;
            siteInDraft["key"] = `${filteredDraft.siteId}${ind}${i}${
              site.name
            }`;
            updatedDrafts.push(siteInDraft);
          }
        });
      });
  }

  return {
    drafts: updatedDrafts,
    currentUserGroup,
    currentUserId
  };
};

const styles = StyleSheet.create({
  subtitleStyle: {
    textAlign: "center",
    fontSize: 17,
    color: "#908989"
  },
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(mapStateToProps)(DraftList);
