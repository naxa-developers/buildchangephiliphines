import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { checkInternetConnection } from 'react-native-offline';
import { connectionState, requestPersonByUrl } from '../actions';
import CheckListItem from './CheckListItem';

class CheckList extends React.Component {

  componentDidMount() {
    checkInternetConnection().then(res => {
      console.log('checkInternetConnectionko_bhitra');
      console.log('internetko_awastha');
      console.log(res);
      const { dispatch, actionQueue } = this.props;
      dispatch(connectionState({ status: res }));
      if (res && actionQueue.length > 0) {
        actionQueue.forEach((eachElement) => {
          this.props.dispatch(requestPersonByUrl(eachElement));
        });
      }
    });
}

  render() {
    console.log('RENDERGGGGGGGGCHECKLISTKO_mapStateToPropsko_bhitra');
    console.log(this.props);

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.props.item.checklists}
          renderItem={({ item }) => <CheckListItem data={item} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('CHECKLISTKO_mapStateToPropsko_bhitra');
  console.log(state);
  return {
    actionQueue: state.actionQueue.actionQueue,
    isConnected: state.isConnected.isConnected,
  };
};

export default connect(mapStateToProps)(CheckList);
