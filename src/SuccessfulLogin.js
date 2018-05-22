import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PlaceholderListItem from './components/PlaceholderListItem';

export default class SuccessfulLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {

      isLoading: true,
      text: '',

    };

    this.arrayholder = [];
  }

  componentDidMount() {
    return AsyncStorage.getItem('token').then((token) => {
    fetch('http://139.59.67.104:4001/core/api/project/2/', {
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
      //  Alert.alert(responseJson.data.username+'');
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.sites),
          },
          function() { // do something with new state\
            this.arrayholder = responseJson.sites;
          }
        );
      })
      .catch(error => { console.error(error); });
    });


  }

  GetListViewItem(school) {

   //Alert.alert(site_name.name);
   Actions.StepList(school);

  }

   SearchFilterFunction(text){

     const newData = this.arrayholder.filter(function(item){
         const itemData = item.name.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#ddd",
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

          renderRow={(rowData) => <PlaceholderListItem
            rowData={rowData}

            style={styles.rowViewContainer}

            onPress={this.GetListViewItem.bind(this, rowData)}
          >
           {rowData.name}
           </PlaceholderListItem>}

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
