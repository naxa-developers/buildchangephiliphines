import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Alert,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import styles from './styles';

class SignUp extends Component {

	constructor() {
		super();
		this.state = {
			username: null,
      email: null,
			password: null,
      repassword: null
		};
	}

	userSignup() {
    if ( this.state.password === this.state.repassword) {
		if (this.state.username && this.state.email && this.state.password) {
			//change the url
			fetch('http://139.59.67.104:4001/core/api/users/', {
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
    Alert.alert('Password did not match!')

  }
	}

	render() {
		return (
			<View style={styles.container}>
				<Image
						source={require('../app_images/buildchange.jpeg')}
						style={styles.image}
				/>
				<View style={styles.form}>

          <TextInput
            editable
            onChangeText={(username) => this.setState({ username })}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.username}
          />

					<TextInput
						editable
						onChangeText={(email) => this.setState({ email })}
						placeholder='Email'
						ref='email'
						returnKeyType='next'
						style={styles.inputText}
						value={this.state.email}
					/>
					<TextInput
						editable
						onChangeText={(password) => this.setState({ password })}
						placeholder='Password'
						ref='password'
						returnKeyType='next'
						//secureTextEntry
						style={styles.inputText}
						value={this.state.password}
					/>
          <TextInput
						editable
						onChangeText={(repassword) => this.setState({ repassword })}
						placeholder='Retype Password'
						ref='repassword'
						returnKeyType='next'
						//secureTextEntry
						style={styles.inputText}
						value={this.state.repassword}
		       />
					<TouchableOpacity
						style={styles.buttonWrapper}
						onPress={this.userSignup.bind(this)}
					>
						<Text style={styles.buttonText}>
							SignUp
						</Text>
					</TouchableOpacity>

				</View>
			</View>
		);
	}
}

export default SignUp;
