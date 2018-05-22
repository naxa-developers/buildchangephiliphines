import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Circle } from '../common/Circle';


export default class GuidelinesListScene extends React.Component {

constructor(){
    super();
    this.state = {
        selectedGuideline: null,
    };
}


onGuidelineTapped(guideline){
    console.log(guideline);
    Actions.ComparePhotosScene({ title: guideline.title, guideline });
}

render() {
    // Actions.refresh({ title: this.props.categoryName });

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.props.guidelines}
          renderItem={({ item }) => 
            <ListItem
                onPress={this.onGuidelineTapped.bind(this, item)}
                title={item.title}
                subtitle={item.description}
            />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
