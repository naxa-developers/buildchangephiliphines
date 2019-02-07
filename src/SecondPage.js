import React, { Component } from 'react';
import { View, Text, Button, ImageBackground, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

class SecondPage extends Component {

  forgotCredentials() {
      Alert.alert('Nothing we can do about it right now!');
  }

    communityMemberLogin() {
        Actions.SignUp();
    }

    authorizedMemberLogin() {
      Actions.Login();
    }

  render() {
    const { mainContainer, subContainer1, subContainer2 } = styles;


    return (
                <ImageBackground source={require('../app_images/login_screen_background2.jpg')} style={mainContainer}>
                <View style={subContainer1}>
                                      <Button
                                      title='Log in'
                                      color='#4B84B2'
                                      onPress={this.authorizedMemberLogin}
                                      />


                                      <Button
                                      title='Sign Up'
                                      color='#90C341'
                                      onPress={this.communityMemberLogin}
                                      />
                    </View>
                  
                </ImageBackground>
    );
  }
}

export default SecondPage;

const styles = {
  mainContainer: {
    flex: 1,
    height: null,
    width: null,
    justifyContent: 'center',

  },
  subContainer1: {
    height: 180,
  //  width: 200,
  //backgroundColor: 'red',
    borderColor: 'black',
    justifyContent: 'space-around',
    paddingLeft: 80,
    paddingRight: 80,
    paddingTop: 40
  },
  subContainer2: {
      //backgroundColor: 'blue',
      alignItems: 'center',
      height: 30

  }
};
