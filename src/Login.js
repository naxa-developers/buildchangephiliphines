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
import { connect } from 'react-redux';
import { storeUserGroup } from './actions';

import styles from './styles';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			// username: 'arun@bc',
			// password: '@naxa123'
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

			const formdata = new FormData();
			formdata.append('username', this.state.username);
			formdata.append('password', this.state.password);


			const req = {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				body: formdata,
			};

			//change the url
			fetch('http://bccms.naxa.com.np/core/api/api-token-auth/', req)
			.then((response => {

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
				this.onValueChange('token', responseData.token);
				this.onUserIdChange('user_id', responseData.user_id.toString());
											// 				try {
											//   const value = await AsyncStorage.getItem(');
											//   if (value !== null){
											//     // We have data!!
											//     console.log(value);
											//   }
											// } catch (error) {
											//   // Error retrieving data
											// }
				const { dispatch } = this.props;
				dispatch(storeUserGroup({ userGroup: responseData.group, userId: responseData.user_id }));
				if (responseData.group === 'Field Engineer') {
					Actions.Address();
				}
				else if (responseData.group !== 'Field Engineer') {
					Actions.Select();
				}
				//Actions.Successful_Login({ type: 'replace' });
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
						placeholder='Username'
						ref='username'
						returnKeyType='next'
						style={styles.inputText}
						value={this.state.username}
						autoCapitalize='none'
						autoFocus
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
						autoCapitalize='none'
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

const mapStateToProps = (state) => {
  console.log('login_mapstatetoprops_bhitra');
console.log(state);
return {
};
};

export default connect(mapStateToProps)(Login);
