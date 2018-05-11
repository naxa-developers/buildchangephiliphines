// import React from 'react';
// import { FlatList, ActivityIndicator, Text, View } from 'react-native';
// import Header from './src/header';
//
// export default class App extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//        isLoading: true,
//      };
//   }
//
//   componentDidMount() {
//     return fetch('https://gist.githubusercontent.com/nishontan/86d7503c7f2796c59bf48dcf7a248525/raw/453b759bb075a851df37d71029d2f72750a590ad/schoollist.json')
//       .then((response) => response.json())
//       .then((responseJson) => {
//           this.setState({
//           isLoading: false,
//           dataSource: responseJson
//           }, function() {
//
//         });
//
//       })
//       .catch((error) =>{
//         console.error(error);
//       });
//   }
//
//
//
//   render() {
//
//     if (this.state.isLoading) {
//       return (
//         <View style={{ flex: 1, padding: 20 }}>
//           <ActivityIndicator />
//         </View>
//       )
//     }
//
//     return(
//       <View style={{ flex: 1, paddingTop: 20 }}>
//
//         <Header headerText={this.state.dataSource.name} />
//
//         <FlatList
//           data={this.state.dataSource.sites}
//           renderItem={({ item }) => <Text>{item.name}</Text>}
//           keyExtractor={(item, index) => index}
//         />
//       </View>
//     );
//   }
// }



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
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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

  GetListViewItem (fruit_name) {

   Alert.alert(fruit_name);

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

          renderSeparator= {this.ListViewItemSeparator}

          renderRow={(rowData) => <Text

            style={styles.rowViewContainer}

          onPress={this.GetListViewItem.bind(this, rowData.name)} >{rowData.name}</Text>}

          enableEmptySections={true}

          style={{marginTop: 10}}

        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

 MainContainer :{

  justifyContent: 'center',
  flex:1,
  margin: 7,

  },

 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },

  TextInputStyleClass:{

   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"

   }

});







// import React, { Component } from 'react';
//
// import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';
//
// export default class App extends Component {
//
//   constructor(props) {
//
//     super(props);
//
//     this.state = {
//
//       isLoading: true,
//       text: '',
//
//     }
//
//     this.arrayholder = [] ;
//   }
//
//   componentDidMount() {
//
//     return fetch('https://reactnativecode.000webhostapp.com/FruitsList.php')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//         this.setState({
//           isLoading: false,
//           dataSource: ds.cloneWithRows(responseJson),
//         }, function() {
//
//           // In this block you can do something with new state.
//           this.arrayholder = responseJson ;
//
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//
//   }
//
//   GetListViewItem (fruit_name) {
//
//    Alert.alert(fruit_name);
//
//   }
//
//    SearchFilterFunction(text){
//
//      const newData = this.arrayholder.filter(function(item){
//          const itemData = item.fruit_name.toUpperCase()
//          const textData = text.toUpperCase()
//          return itemData.indexOf(textData) > -1
//      })
//      this.setState({
//          dataSource: this.state.dataSource.cloneWithRows(newData),
//          text: text
//      })
//  }
//
//   ListViewItemSeparator = () => {
//     return (
//       <View
//         style={{
//           height: .5,
//           width: "100%",
//           backgroundColor: "#000",
//         }}
//       />
//     );
//   }
//
//
//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={{flex: 1, paddingTop: 20}}>
//           <ActivityIndicator />
//         </View>
//       );
//     }
//
//     return (
//
//       <View style={styles.MainContainer}>
//
//       <TextInput
//        style={styles.TextInputStyleClass}
//        onChangeText={(text) => this.SearchFilterFunction(text)}
//        value={this.state.text}
//        underlineColorAndroid='transparent'
//        placeholder="Search Here"
//         />
//
//         <ListView
//
//           dataSource={this.state.dataSource}
//
//           renderSeparator= {this.ListViewItemSeparator}
//
//           renderRow={(rowData) => <Text style={styles.rowViewContainer}
//
//           onPress={this.GetListViewItem.bind(this, rowData.fruit_name)} >{rowData.fruit_name}</Text>}
//
//           enableEmptySections={true}
//
//           style={{marginTop: 10}}
//
//         />
//
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//
//  MainContainer :{
//
//   justifyContent: 'center',
//   flex:1,
//   margin: 7,
//
//   },
//
//  rowViewContainer: {
//    fontSize: 17,
//    padding: 10
//   },
//
//   TextInputStyleClass:{
//
//    textAlign: 'center',
//    height: 40,
//    borderWidth: 1,
//    borderColor: '#009688',
//    borderRadius: 7 ,
//    backgroundColor : "#FFFFFF"
//
//    }
//
// });
