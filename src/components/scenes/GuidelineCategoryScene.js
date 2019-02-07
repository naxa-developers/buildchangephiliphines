import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ListView,
  Alert,
  NetInfo,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { openedConstructionMaterialsScene } from '../../actions';
import { getLocalizedText } from '../../../locales/strings';

class GuidelineCategoryScene extends Component {
  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem('token')
        .then((token) => {
          this.props.openedConstructionMaterialsScene(token);
        });
      }
      else if (!isConnected) {
        Alert.alert('No internet Connection!');
      }
    });
  }

  GetListViewItem(data) {
    Actions.GuidelinesListScene({ data });
  }


  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#000'
        }}
      />
    );
  };

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

        <ListView
          dataSource={this.props.list.cloneWithRows(this.props.data)}
          containerStyle={{ marginTop: 5 }}
          renderRow={rowData => (
            <ListItem
              onPress={this.GetListViewItem.bind(this, rowData)}
              title={getLocalizedText(rowData.localname, rowData.name)}
              containerStyle={{ borderBottomWidth: 5, borderBottomColor: '#EFEFF4', backgroundColor: 'white' }}
            />
          )}
          style={{ marginTop: 7 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {

  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  return {
    isLoading: state.guideLineCategory.isLoading,
    list: ds,
    data: state.constructionMaterial.data
  };
};

export default connect(mapStateToProps, { openedConstructionMaterialsScene })(GuidelineCategoryScene);

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 7
  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10
  },

  TextInputStyleClass: {
    textAlign: 'left',
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 0,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15
  }
});
