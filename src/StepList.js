import React from "react";
import { View, ScrollView, Text, Button } from "react-native";
import { Actions } from "react-native-router-flux";
import LibraryList from "./components/LibraryList";
import { CardSection, Card } from "../src/components/common";

class StepList extends React.Component {
  render() {
    console.log("Steplist render");
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingTop: 10 }}>
          <LibraryList />
        </ScrollView>
      </View>
    );
  }
}

export default StepList;
