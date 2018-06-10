import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    ListView,
    TextInput,
    ActivityIndicator,
    AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { openedGuidelinesCategoryScene, userSearched } from '../../actions';


class GuidelineCategoryScene extends Component {

 componentDidMount() {
   console.log('component did mount ko start ma');
    AsyncStorage.getItem('token').then((token) => {
      this.props.openedGuidelinesCategoryScene(token);
   });
}

getItemByCategory(myArr, prop) {
    return myArr.filter((obj) => {
        return obj.category === prop;
    });
}

GetListViewItem(categoryName) {
    Actions.GuidelinesListScene({ title: categoryName,
        guidelines: this.getItemByCategory(this.props.data, categoryName) });
}


SearchFilterFunction(text) {
  this.props.userSearched(text);
}

 ListViewItemSeparator = () => {
   return (
     <View
       style={{
         height: 0.5,
         width: '100%',
         backgroundColor: '#000',
       }}
     />
   );
 }


 render() {

   console.log('render bhitra');
console.log(this.props.dataWithoutDuplicates);
if (this.props.isLoading) {
return (
<View style={{ flex: 1, paddingTop: 20 }}>
<ActivityIndicator />
</View>
);
}

return (

<View style={styles.MainContainer}>

<TextInput
   style={styles.TextInputStyleClass}
   onChangeText={(text) => this.SearchFilterFunction(text)}
   value={this.props.typedText}
   underlineColorAndroid='transparent'
   placeholder="Search Here"
/>

<ListView
dataSource={this.props.list.cloneWithRows(this.props.hasTyped ? this.props.newData : this.props.dataWithoutDuplicates)}

renderRow={(rowData) =>
   <ListItem

       onPress={this.GetListViewItem.bind(this, rowData.category)}
       title={rowData.category}

   />
}

style={{ marginTop: 10 }}

/>

</View>
);
}

}

const mapStateToProps = (state) => {
  console.log('map state to props ko bhitra');


const dataWithoutDuplicates = state.guideLineCategory.data.filter((obj, pos, arr) => {
  return arr.map(mapObj => mapObj['category']).indexOf(obj['category']) === pos;
});

const newData = dataWithoutDuplicates.filter(function(item){
    const itemData = item.category.toUpperCase();
    const textData = state.searchReducer.typedText.toUpperCase();
    return itemData.indexOf(textData) > -1;
});

console.log('below is newData');
console.log(newData);

  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });
console.log('below is searchreducer state');
  console.log(state.searchReducer);

  console.log('below is guidelinecatefory reducer state');
    console.log(state.guideLineCategory);

  return {
            data: state.guideLineCategory.data,
            isLoading: state.guideLineCategory.isLoading,
            list: ds,
            dataWithoutDuplicates,
            newData,
            typedText: state.searchReducer.typedText,
            hasTyped: state.searchReducer.hasTyped
 };
};


export default connect(mapStateToProps, { openedGuidelinesCategoryScene, userSearched })(GuidelineCategoryScene);

const styles = StyleSheet.create({

MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 7,
},
rowViewContainer: {
  fontSize: 17,
  padding: 10
 },

 TextInputStyleClass: {
  textAlign: 'center',
  height: 40,
  borderWidth: 1,
  borderColor: '#009688',
  borderRadius: 7,
  backgroundColor: '#FFFFFF'
  }
});
