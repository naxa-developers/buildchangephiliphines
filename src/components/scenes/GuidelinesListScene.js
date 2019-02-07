import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { getLocalizedText } from './../../../locales/strings';


export default class GuidelinesListScene extends React.Component {


onGuidelineTapped(guideline) {
    console.log(guideline);
    Actions.GoodBad({ photoData: guideline, title: guideline.title });
}

render() {
    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        <FlatList
          data={this.props.data.materials}
          renderItem={({ item }) =>
            <ListItem
                onPress={this.onGuidelineTapped.bind(this, item)}
                title={item.title}
                subtitle={item.title}
                containerStyle={{ backgroundColor: 'white', borderBottomWidth: 5, borderBottomColor: '#EFEFF4' }}
            />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
