import React, { Component } from 'react';
import {
	AsyncStorage,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { storeUserGroup, setDownloadInfo } from './actions';
import styles from './styles';
import { filePaths } from './downloadinfo';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			username: null,
			password: null
		};
	}

	componentWillMount() {
		this.props.dispatch(setDownloadInfo({ filePaths }));
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
	async onUserChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			console.log(error.message);
		}
	}

	sendToken(userId, authToken) {
		PushNotification.configure({
	    	onRegister: function(token) {
	    	const formdata = new FormData();
				formdata.append('registration_id', token.token);
				formdata.append('active', true);
				formdata.append('type', 'android');

				const req = {
					method: 'POST',
					headers: {
						Authorization: 'token ' + authToken,
						'Content-Type': 'multipart/form-data',
					},
					body: formdata,
				};
				console.log(req);

				fetch('http://bccms.naxa.com.np/core/api/device', req)
				.then((response => {
					//Alert.alert('Setup Successful!');
					console.log('response', response);
				}))
				.catch((error) => Alert.alert(error.message));
	    	},
	    	    onNotification: function(notification) {
        		console.log('NOTIFICATION:', notification);
    	},
	    	senderID: "6095782395",
	    	popInitialNotification: true,
	 	});
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

			console.log(formdata);

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
				this.onUserChange('user', responseData.group);
				this.sendToken(responseData.user_id.toString(), responseData.token);
				const { dispatch } = this.props;
				dispatch(storeUserGroup({ userGroup: responseData.group, userId: responseData.user_id }));
				if (responseData.group === 'Field Engineer') {
					Actions.Address();
				}
				else if (responseData.group !== 'Field Engineer') {
					Actions.Select();
				}
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

export default connect(null)(Login);
