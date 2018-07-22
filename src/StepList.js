import React from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LibraryList from './components/LibraryList';
import { CardSection, Card } from '../src/components/common';

class StepList extends React.Component {

  onViewMap() {
    Actions.ShowMap();
  }
  onViewDocumentList() {
    Actions.DocumentList();
  }
  render() {
    console.log('steplistbhitra');
    console.log(this.props);
  return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ paddingTop: 10 }}>
                  <LibraryList list={this.props} />
                </ScrollView>
            </View >

  );
}
}

export default StepList;
