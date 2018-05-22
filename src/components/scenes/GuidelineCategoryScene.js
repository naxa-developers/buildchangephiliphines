// https://ilikekillnerds.com/2016/05/removing-duplicate-objects-array-property-name-javascript/
import React, { Component } from 'react';
import { Text, 
    StyleSheet,
    View, 
    ListView,
    TextInput, 
    ActivityIndicator, 
    Alert,
    AsyncStorage } from 'react-native';

export default class GuidelineCategoryScene extends Component {

 constructor(props) {
   super(props);
   this.state = {
     isLoading: true,
     text: '',
     materials_list: [],
     categories_list: [],
     selectedCatergoryId: null, 
   };
   this.arrayholder = [];
 }

 componentDidMount() {
   return AsyncStorage.getItem('token').then((token) => {
   fetch('http://139.59.67.104:4001/core/api/material-list/2/', {
       method: 'GET',
       headers: {
         Authorization: 'token '+ token
       }
     })
     .then(response => response.json())
     .then(responseJson => {
       let ds = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
       });

        this.setState({ ...this.state, materials_list: responseJson });
        this.setState({ ...this.state, 
            categories_list: this.removeDuplicates(responseJson, 'category')
        });
        this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(this.state.categories_list),
            },
            function() { // do something with new state\
              this.arrayholder = responseJson;
            }
       );
     })
     .catch(error => { console.error(error); });
   });
 }

 GetListViewItem(fruit_name){
  Alert.alert(fruit_name);
 }

 removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}


SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item){
        const itemData = item.category.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
    })
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newData),
        text: text
    });
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
   if (this.state.isLoading) {
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
      value={this.state.text}
      underlineColorAndroid='transparent'
      placeholder="Search Here"
       />

       <ListView

         dataSource={this.state.dataSource}
         renderSeparator={this.ListViewItemSeparator}
         renderRow={(rowData) => <Text 
            style={styles.rowViewContainer}
            onPress={this.GetListViewItem.bind(this, rowData.category)}>
            {rowData.category
        }</Text>}
         enableEmptySections
         style={{ marginTop: 10 }}

       />

     </View>
   );
 }
}

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
