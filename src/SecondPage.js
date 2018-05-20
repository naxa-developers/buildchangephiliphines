import React, { Component } from 'react';
import { View, Button } from 'react-native';
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
    const { mainContainer, subContainer } = styles;
    return (

    <View style={mainContainer}>
              <Header headerText={'Construction Monitoring App'} />
                                                <View
                                                style={{
                                                  flex: 1,
                                                  flexDirection: 'column',
                                                  justifyContent: 'space-around',
                                                }}
                                                >

                                            <View
                                            style={subContainer}
                                            >
                                                <Button
                                                title='Log in'
                                                color='#4B84B2'
                                                onPress={this.authorizedMemberLogin}
                                                />

                                            </View>

                                            <View
                                            style={subContainer}
                                            >
                                                <Button
                                                title='Sign Up'
                                                color='#90C341'
                                                onPress={this.communityMemberLogin}
                                                />

                                            </View>

                            </View>

    </View>
    );
  }
}

export default SecondPage;

const styles = {
  mainContainer: {
    flex: 1
  },
  subContainer: {
    marginLeft: 10,
    marginRight: 10

  }
};
