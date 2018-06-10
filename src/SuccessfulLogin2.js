import React, { Component } from 'react';
import { StyleSheet, View, ListView, TextInput, ActivityIndicator, AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PlaceholderListItem from './components/PlaceholderListItem';
import { tappedOnViewSchools } from './actions';

class SuccessfulLogin2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    AsyncStorage.getItem('token') 
    .then((token) => {
      this.props.tappedOnViewSchools(token);
    });
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
  }

  GetListViewItem(school) {
   Actions.StepList(school);
  }

   SearchFilterFunction(text) {
     const newData = this.arrayholder.filter(function (item) {
         const itemData = item.name.toUpperCase();
         const textData = text.toUpperCase();
         return itemData.indexOf(textData) > -1;
     });
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

const mapStateToProps = (state) => {
  return { isLoading: state.schoolList.isLoading, data: state.schoolList.data };
};

export default connect(mapStateToProps, { tappedOnViewSchools })(SuccessfulLogin2);
