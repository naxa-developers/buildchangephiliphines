import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ListView,
  ActivityIndicator,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { openedGuidelinesCategoryScene } from '../../actions';
import { getLocalizedText } from '../../../locales/strings';

class GuidelineCategoryScene extends Component {
  componentDidMount() {
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
            onPress={() => {
              Actions.MaterialPhoto({ photoData: rowData });
            }}
              title={getLocalizedText(rowData.name_de, rowData.name)}
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
    data: state.guideLineCategory.data[0].more_about_materials,
    isLoading: state.guideLineCategory.isLoading,
    list: ds,
  };
};

export default connect(mapStateToProps, { openedGuidelinesCategoryScene })(GuidelineCategoryScene);

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 7
  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10
  }
});
