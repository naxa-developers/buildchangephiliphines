import React from 'react';
import { FlatList, View } from 'react-native';


export default class GuidelinesListScene extends React.Component {

render() {
    console.log(this.props.guidelines);
    
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {/* <FlatList
          data={this.props.checklists}
          renderItem={({ item }) => <CheckListItem data={item} />}
          keyExtractor={(item, index) => index}
        /> */}
      </View>
    );
  }
}
