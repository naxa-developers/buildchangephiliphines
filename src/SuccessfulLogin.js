// import React, { Component } from 'react';
// import { StyleSheet, View, ListView, TextInput, ActivityIndicator, AsyncStorage
// } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import PlaceholderListItem from './components/PlaceholderListItem';
//
// class SuccessfulLogin extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//
//       isLoading: true,
//       text: '',
//
//     };
//
//     this.arrayholder = [];
//   }
//
//   componentDidMount() {
//     return AsyncStorage.getItem('token').then((token) => {
//     fetch('http://139.59.67.104:4001/core/api/project/2/', {
//         method: 'GET',
//         headers: {
//           Authorization: 'token ' + token,
//           mode: 'no-cors'
//         }
//       })
//       .then(response => response.json())
//       .then(responseJson => {
//         let ds = new ListView.DataSource({
//           rowHasChanged: (r1, r2) => r1 !== r2,
//         });
//       //  Alert.alert(responseJson.data.username+'');
//         this.setState(
//           {
//             isLoading: false,
//             dataSource: ds.cloneWithRows(responseJson.sites),
//           },
//           function() { // do something with new state\
//             this.arrayholder = responseJson.sites;
//           }
//         );
//       })
//       .catch(error => { console.error(error); });
//     });
//
//
//   }
//
//   GetListViewItem(school) {
//
//    //Alert.alert(site_name.name);
//    Actions.StepList(school);
//
//   }
//
//    SearchFilterFunction(text){
//
//      const newData = this.arrayholder.filter(function(item){
//          const itemData = item.name.toUpperCase()
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
//           backgroundColor: "#ddd",
//         }}
//       />
//     );
//   }
//
//
//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
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
//       />
//
//         <ListView
//
//           dataSource={this.state.dataSource}
//
//           renderSeparator={this.ListViewItemSeparator}
//
//           renderRow={(rowData) => <PlaceholderListItem
//             rowData={rowData}
//
//             style={styles.rowViewContainer}
//
//             onPress={this.GetListViewItem.bind(this, rowData)}
//           >
//            {rowData.name}
//            </PlaceholderListItem>}
//
//           enableEmptySections
//
//           style={{ marginTop: 10 }}
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
//  MainContainer: {
//
//   justifyContent: 'center',
//   flex: 1,
//   margin: 7,
//
//   },
//
//  rowViewContainer: {
//    fontSize: 17,
//    padding: 10
//   },
//
//   TextInputStyleClass: {
//
//    textAlign: 'center',
//    height: 40,
//    borderWidth: 1,
//    borderColor: '#009688',
//    borderRadius: 7,
//    backgroundColor: '#FFFFFF'
//
//    }
//
// });
//
// export default SuccessfulLogin;

// import React, { Component } from 'react';
// import { StyleSheet, View, ListView, TextInput, ActivityIndicator, AsyncStorage
// } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import { connect } from 'react-redux';
// import PlaceholderListItem from './components/PlaceholderListItem';
// import { tappedOnViewSchools } from './actions';
//
// class SuccessfulLogin extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: '',
//     };
//     this.arrayholder = [];
//   }
//
//   componentWillMount() {
//     console.log('componentwillmountko starting ma');
//     console.log(this.props.data);
//     AsyncStorage.getItem('token')
//     .then((token) => {
//       this.props.tappedOnViewSchools(token);
//       console.log(token);
//       let ds = new ListView.DataSource({
//         rowHasChanged: (r1, r2) => r1 !== r2,
//       });
//       this.setState(
//         {
//           dataSource: ds.cloneWithRows(this.props.data.sites),
//         },
//         function () {
//           this.arrayholder = this.props.data.sites;
//         });
//     });
//     console.log('ComponentwillMountko end ma');
//   }
//
//   GetListViewItem(school) {
//    Actions.StepList(school);
//   }
//
//    SearchFilterFunction(text) {
//      const newData = this.arrayholder.filter(function (item) {
//          const itemData = item.name.toUpperCase();
//          const textData = text.toUpperCase();
//          return itemData.indexOf(textData) > -1;
//      });
//      this.setState({
//          dataSource: this.state.dataSource.cloneWithRows(newData),
//          text
//      });
//  }
//
//   ListViewItemSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 0.5,
//           width: '100%',
//           backgroundColor: '#ddd',
//         }}
//       />
//     );
//   }
//
//
//   render() {
//     console.log('render bhitra');
//     console.log(this.state.dataSource);
//
//     if (this.props.isLoading) {
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
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
//       />
//
//         <ListView
//
//           dataSource={this.props.list.cloneWithRows(this.props.data.sites)}
//
//           renderSeparator={this.ListViewItemSeparator}
//
//           renderRow={(rowData) => <PlaceholderListItem
//             rowData={rowData}
//
//             style={styles.rowViewContainer}
//
//             onPress={this.GetListViewItem.bind(this, rowData)}
//           >
//            {rowData.name}
//            </PlaceholderListItem>}
//
//           enableEmptySections
//
//           style={{ marginTop: 10 }}
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
//  MainContainer: {
//
//   justifyContent: 'center',
//   flex: 1,
//   margin: 7,
//
//   },
//
//  rowViewContainer: {
//    fontSize: 17,
//    padding: 10
//   },
//
//   TextInputStyleClass: {
//
//    textAlign: 'center',
//    height: 40,
//    borderWidth: 1,
//    borderColor: '#009688',
//    borderRadius: 7,
//    backgroundColor: '#FFFFFF'
//
//    }
//
// });
//
// const mapStateToProps = (state) => {
//   console.log('mapStateToProps bhitra');
//   console.log(state);
//   let ds = new ListView.DataSource({
//     rowHasChanged: (r1, r2) => r1 !== r2,
//   });
//   return { isLoading: state.schoolList.isLoading, data: state.schoolList.data, list: ds };
// };
//
// export default connect(mapStateToProps, { tappedOnViewSchools })(SuccessfulLogin);





import React, { Component } from 'react';
import { StyleSheet, View, ListView, TextInput, ActivityIndicator, AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PlaceholderListItem from './components/PlaceholderListItem';
import { tappedOnViewSchools } from './actions';

class SuccessfulLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.arrayholder = [];
  }

  componentWillMount() {
    console.log('componentwillmountko starting ma');
    console.log(this.props.data);
    AsyncStorage.getItem('token')
    .then((token) => {
      this.props.tappedOnViewSchools(token);
      console.log(token);
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      this.setState(
        {
          dataSource: ds.cloneWithRows(this.props.data.sites),
        },
        function () {
          this.arrayholder = this.props.data.sites;
        });
    });
    console.log('ComponentwillMountko end ma');
  }

  GetListViewItem(school) {
   Actions.StepList(school);
  }

   SearchFilterFunction(text) {
     const newData = this.props.arrayholder1.filter(function (item) {
         const itemData = item.name.toUpperCase();
         const textData = text.toUpperCase();
         return itemData.indexOf(textData) > -1;
     });
     console.log(newData);
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text
     });
 }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#ddd',
        }}
      />
    );
  }


  render() {
    console.log('render bhitra');
    console.log(this.state.dataSource);

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
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
      />

        <ListView

          dataSource={this.props.list.cloneWithRows(this.props.data.sites)}

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

const mapStateToProps = (state) => {
  console.log('mapStateToProps bhitra');
  console.log(state);
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });
  return { isLoading: state.schoolList.isLoading, data: state.schoolList.data, list: ds, arrayholder1: state.schoolList.data.sites };
};

export default connect(mapStateToProps, { tappedOnViewSchools })(SuccessfulLogin);
