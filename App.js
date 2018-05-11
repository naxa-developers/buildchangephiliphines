import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      isLoading: true,
      text: '',

    };

    this.arrayholder = [];
  }

  componentDidMount() {
    return fetch('https://gist.githubusercontent.com/nishontan/86d7503c7f2796c59bf48dcf7a248525/raw/453b759bb075a851df37d71029d2f72750a590ad/schoollist.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.sites),
        }, function() {

          // In this block you can do something with new state.
          this.arrayholder = responseJson.sites;

        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  GetListViewItem(site_name) {

   Alert.alert(site_name);

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
          backgroundColor: "#000",
        }}
      />
    );
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
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

          onPress={this.GetListViewItem.bind(this, rowData.name)} >{rowData.name}</Text>}

          enableEmptySections={true}

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
