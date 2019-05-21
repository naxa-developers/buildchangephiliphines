import React from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  AsyncStorage,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { checkInternetConnection } from "react-native-offline";
import { connectionState, requestPersonByUrl } from "../actions";
import { Actions } from "react-native-router-flux";
import call from "react-native-phone-call";
import CheckListItem from "./CheckListItem";

class CheckList extends React.Component {
  componentDidMount() {
    checkInternetConnection().then(res => {
      const { dispatch, actionQueue } = this.props;
      dispatch(connectionState({ status: res }));
      if (res && actionQueue.length > 0) {
        actionQueue.forEach(eachElement => {
          this.props.dispatch(requestPersonByUrl(eachElement));
        });
      }
    });
  }

  onCallAdmin() {
    Actions.AdminList();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}>
        {this.props.item.map(group => {
          return (
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 15,
                backgroundColor: "white",
                borderWidth: 1,
                borderBottomWidth: 2,
                borderColor: "rgba(0,0,0,0.1)"
              }}
            >
              <View style={styles.subContainer}>
                <Text style={styles.descriptionText}>{group.title}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text style={[styles.descriptionText, { fontSize: 15 }]}>
                  {group.specification}
                </Text>
              </View>
              <FlatList
                data={group.sub_checklists}
                renderItem={({ item }) => <CheckListItem data={item} />}
                keyExtractor={(item, index) => index}
              />
            </View>
          );
        })}

        {this.props.item.length !== 0 && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() =>
                Actions.ReportEngineer({
                  substep: this.props.item[0].sub_checklists[0].substep,
                  stepId: this.props.item[0].sub_checklists[0].step
                })
              }
              style={{
                backgroundColor: "#FAFAFA",
                height: 40,
                borderWidth: 0,
                alignItems: "center",
                justifyContent: "center",
                flex: 1
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold"
                }}
              >
                Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onCallAdmin()}
              style={{
                backgroundColor: "#FAFAFA",
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderLeftWidth: 1,
                borderColor: "rgba(0,0,0,0.08)"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold"
                }}
              >
                Call Admin
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    actionQueue: state.actionQueue.actionQueue,
    isConnected: state.isConnected.isConnected,
    admin: state.schoolList.data.project_managers[0],
    currentUserId: state.currentUserGroup.currentUserId
  };
};

export default connect(mapStateToProps)(CheckList);

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row"
  },
  subContainer: {
    padding: 15
  },
  descriptionText: {
    fontWeight: "bold",
    fontSize: 20
  }
});
