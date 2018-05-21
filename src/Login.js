import React, { Component } from 'react';
import {
	AsyncStorage,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			username: null,
			password: null
		};
	}

	async onValueChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			console.log(error.message);
		}
	}

	async onUserIdChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			console.log(error.message);
		}
	}


	userLogin() {
		if (this.state.username && this.state.password) {
			//change the url
			fetch('http://139.59.67.104:4001/core/api/api-token-auth/', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					//change the name of the properties email_or_username and password as per api
					username: this.state.username,
					password: this.state.password,
				})
			})
			.then((response => {

				console.log(response.json());
				if (response.ok) {
					return response;
				} 
			
				Alert.alert('Failed to login');
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}))
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
				this.onValueChange('token', responseData.token);
				this.onUserIdChange('user_id', responseData.user_id);
											// 				try {
											//   const value = await AsyncStorage.getItem(');
											//   if (value !== null){
											//     // We have data!!
											//     console.log(value);
											//   }
											// } catch (error) {
											//   // Error retrieving data
											// }
				Actions.Successful_Login({ type: 'replace' });
			})
			.catch((error) => console.log(error))

			.done();
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
						placeholder='Email'
						ref='username'
						returnKeyType='next'
						style={styles.inputText}
						value={this.state.username}
					/>
					<TextInput
						editable
						onChangeText={(password) => this.setState({ password })}
						placeholder='Password'
						ref='password'
						returnKeyType='next'
						secureTextEntry
						style={styles.inputText}
						value={this.state.password}
					/>
					<TouchableOpacity
						style={styles.buttonWrapper}
						onPress={this.userLogin.bind(this)}
					>
						<Text style={styles.buttonText}>
							Login
						</Text>
					</TouchableOpacity>

				</View>
			</View>
		);
	}
}

export default Login;
