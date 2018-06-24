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
    console.log(this.props);
  return (
            <View style={{ flex: 1 }}>
                <Card>
                    <CardSection>
                            <Text style={{ fontSize: 20, paddingLeft: 15, color: 'red' }}>{this.props.name}</Text>
                    </CardSection>
                    <CardSection>
                            <Text style={{ fontSize: 20, paddingLeft: 15, color: 'red' }}>{this.props.address}</Text>
                    </CardSection>
                </Card>
                <Card>
                <Card>

                      <Button
                        title="View Map"
                        onPress={this.onViewMap.bind(this)}
                      />
                      </Card>
                      <Card>

                      <Button
                        title="View Documents"
                        onPress={this.onViewDocumentList.bind(this)}
                      />
                      </Card>

                </Card>

                <ScrollView style={{ paddingTop: 10 }}>
                  <LibraryList list={this.props} />
                </ScrollView>
            </View >

  );
}
};

export default StepList;
