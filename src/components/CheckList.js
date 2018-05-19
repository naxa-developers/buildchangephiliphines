import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import CheckListItem from './CheckListItem';


class CheckList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checklist: [],
      loading: true,
    };
  }

  componentDidMount(){
    this.makeRemoteRequest();    
  }

   
  makeRemoteRequest = () => {
        this.setState({ loading: true });
        const url = 'http://139.59.67.104:4001/core/api/project/1/';
        fetch(url, {
          method: 'GET',
          headers: {
            Authorization: 'token 335bc7914bd685c9b40db52fceead19248edccfb'
          }
        })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.sites[0].steps[0].checklists);
          this.setState(
            {
              isLoading: false,
              data: responseJson.sites[0].steps[0].checklists,
            },
            function() { // do something with new state\
              this.data = responseJson.sites[0].steps[0].checklists;
            }
          );
        })
        .catch(error => { console.error(error); });
        
    };
    
    render() {
      console.log(this.state.data);
      return (
        <FlatList
          data={this.state.data}
          renderItem={({ item: rowData }) => {
            return (
                <CheckListItem rowData={rowData} />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      );
  }
}

const mapStateToProps = state => {
    return { images: state.images };
};

export default connect(mapStateToProps)(CheckList);

