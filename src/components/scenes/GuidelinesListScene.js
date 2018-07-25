import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { getLocalizedText } from './../../../locales/strings';


export default class GuidelinesListScene extends React.Component {

constructor() {
    super();
    this.state = {
        selectedGuideline: null,
    };
}

onGuidelineTapped(guideline) {
    console.log(guideline);
    Actions.ComparePhotosScene({ title: guideline.title, guideline });
}

render(){

  console.log(this.props.guidelines);
  const title = getLocalizedText(this.props.guidelines.local_title,
     this.props.guidelines.title);

    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        <FlatList
          data={this.props.guidelines}
          renderItem={({ item }) =>
            <ListItem
                onPress={this.onGuidelineTapped.bind(this, item)}
                title={title}
                subtitle={item.description}
                containerStyle={{ backgroundColor: 'white', borderBottomWidth: 5, borderBottomColor: '#EFEFF4' }}
            />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
