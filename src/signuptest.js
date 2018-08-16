import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Alert,
	TextInput,
  Animated,
  Keyboard
} from 'react-native';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './stylestest';

class SignUpTest extends Component {

	constructor() {
		super();
		this.state = {
			username: null,
      email: null,
			password: null,
      repassword: null
		};
    this.keyboardHeight = new Animated.Value(0);

    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
	}

  componentWillMount() {
  this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
  this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
}

componentWillUnmount() {
  this.keyboardDidShowSub.remove();
  this.keyboardDidHideSub.remove();
}

keyboardDidShow = (event) => {
  console.log('keyboardDidShow');
  console.log(event);
  Animated.parallel([
    Animated.timing(this.keyboardHeight, {
      duration: 1000,
      toValue: event.endCoordinates.height,
    }),
    Animated.timing(this.imageHeight, {
      duration: 300,
      toValue: IMAGE_HEIGHT_SMALL,
    }),
  ]).start();
}

keyboardDidHide = (event) => {
  console.log('keyboardDidHide');
  console.log(event);
  Animated.parallel([
    Animated.timing(this.keyboardHeight, {
      duration: 1000,
      toValue: 0,
    }),
    Animated.timing(this.imageHeight, {
      duration: 300,
      toValue: IMAGE_HEIGHT,
    }),
  ]).start();
}


	userSignup() {
    if (this.state.password === this.state.repassword) {
		if (this.state.username && this.state.email && this.state.password) {
			//change the url
			fetch('http://bccms.naxa.com.np/core/api/users/', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					//change the name of the properties email_or_username and password as per api
					username: this.state.username,
          email: this.state.email,
					password: this.state.password,
				})
			})
      .then((response) => {
        switch (response.status) {
          case 201:
            Alert.alert('Successful Signup');
            Actions.Login();
            break;
            case 400:
              Alert.alert('Username Already Exists');
              break;
          default:
            Alert.alert('Unknown Error Occured!');
        }
      })
			.catch((error) => console.log(error))

			.done();
		}
  }
  else {
    Alert.alert('Password did not match!');

  }
	}

	render() {
    return (
    <Animated.View style={[styles.container, { paddingBottom: 50 }]}>
      <Animated.Image source={require('../app_images/buildchange.jpeg')} style={[styles.logo, { height: this.imageHeight }]} />
      <TextInput
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
      />
    </Animated.View>
  );
	}
}

export default SignUpTest;
