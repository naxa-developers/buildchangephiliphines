import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from './Header';


class SecondPage extends Component {


  communityMemberLogin() {
      Actions.SignUp();
  }

  authorizedMemberLogin() {
    Actions.Login();
  }


  render() {
    const { mainContainer, subContainer, textStyle } = styles;
    return (

    <View style={mainContainer}>
              <Header headerText={'Construction Monitoring App'} />


                        <View
                        style={subContainer}
                        >
                                <Button
                                title='Continue Without Login'
                                color='#90C341'
                                onPress={this.communityMemberLogin}
                                />

                        </View>

                        <View
                        style={subContainer}
                        >

                                <Button
                                title='Login'
                                color='#4B84B2'
                                onPress={this.authorizedMemberLogin}
                                />

                                <Text style={textStyle}>IF YOU ARE AN AUTHORIZED ENGINEER</Text>

                        </View>
    </View>
    );
  }
}

export default SecondPage;

const styles = {
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subContainer: {
    marginLeft: 10,
    marginRight: 10

  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center'
  },

};
