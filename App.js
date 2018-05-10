import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://gist.githubusercontent.com/nishontan/86d7503c7f2796c59bf48dcf7a248525/raw/453b759bb075a851df37d71029d2f72750a590ad/schoollist.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.sites,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.name}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
