import React, { Component } from 'react';
import { StyleSheet, View, ListView, TextInput, ActivityIndicator, AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PlaceholderListItem from './components/PlaceholderListItem';
import { tappedOnViewSchools, intelliSearch } from './actions';
import { strings } from './../locales/strings';

class SuccessfulLogin extends Component {

  componentDidMount() {
    AsyncStorage.getItem('token')
    .then((token) => {
      this.props.tappedOnViewSchools(token);
    });
  }

  GetListViewItem(school) {
   Actions.StepList(school);
  }

   SearchFilterFunction(text) {
     this.props.intelliSearch(text);
 }

  ListViewItemSeparator = () => (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#ddd',
        }}
      />
    )


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

       value={this.props.typedText}
       onChangeText={(text) => this.SearchFilterFunction(text)}

       underlineColorAndroid='transparent'
       placeholder={strings.search_here}
      />

        <ListView
          dataSource={this.props.list.cloneWithRows(this.props.hasTyped ? this.props.newData : this.props.data.sites)}

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
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const newData = state.schoolList.data.sites.filter(function(item){
      const itemData = item.name.toUpperCase();
      const textData = state.schoolSearchReducer.typedText.toUpperCase();
      return itemData.indexOf(textData) > -1;
  });

  return {
            isLoading: state.schoolList.isLoading,
            data: state.schoolList.data,
            list: ds,
            typedText: state.schoolSearchReducer.typedText,
            hasTyped: state.schoolSearchReducer.hasTyped,
            newData
         };
};

export default connect(mapStateToProps, { tappedOnViewSchools, intelliSearch })(SuccessfulLogin);
