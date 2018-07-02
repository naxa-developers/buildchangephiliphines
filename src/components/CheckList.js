import React from 'react';
import { FlatList, View } from 'react-native';
import CheckListItem from './CheckListItem';

export default class CheckList extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.props.item.checklists}
          renderItem={({ item }) => <CheckListItem data={item} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
