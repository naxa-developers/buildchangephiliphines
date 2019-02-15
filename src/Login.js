import React, { Component } from 'react';
import {
	AsyncStorage,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Alert,
	Platform,
	Animated,
	Keyboard
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { storeUserGroup, setDownloadInfo } from './actions';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import { filePaths } from './downloadinfo';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			username: null,
			password: null
		};
		this.keyboardHeight = new Animated.Value(0);
		this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
	}

	componentWillMount() {
		const keyboardOnScreen = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
		const keyboardNotOnScreen = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

		this.keyboardDidShowSub = Keyboard.addListener(keyboardOnScreen, this.keyboardDidShow);
		this.keyboardDidHideSub = Keyboard.addListener(keyboardNotOnScreen, this.keyboardDidHide);
		this.props.dispatch(setDownloadInfo({ filePaths }));
	}

	componentWillUnmount() {
		this.keyboardDidShowSub.remove();
		this.keyboardDidHideSub.remove();
	}

	async saveValues(userData) {
		console.log('inside save values', userData);
		try {
			userData.map(async each => await AsyncStorage.setItem(each.key, each.value));
		} catch (error) {
			console.log(error.message);
		}
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
				const userData = [{ key: 'token', value: responseData.token }, { key: 'user_id', value: responseData.user_id.toString() }, { key: 'user', value: responseData.group }];
				this.saveValues(userData);
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
			<Animated.View style={[styles.container, { paddingBottom: 20 }]}>
				<Animated.Image
						source={require('../app_images/buildchange.jpeg')}
						style={[styles.logo, { height: this.imageHeight }]}
				/>
				<ScrollView style={styles.form} keyboardShouldPersistTaps='always'>
					<TextInput
						editable
						onChangeText={(username) => this.setState({ username })}
						placeholder='Username'
						ref='username'
						returnKeyType='next'
						style={styles.inputText}
						value={this.state.username}
						autoCapitalize='none'
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
						onPress={() => {
							this.userLogin();
							Keyboard.dismiss();
						}}
					>
						<Text style={styles.buttonText}>
							Login
						</Text>
					</TouchableOpacity>

				</ScrollView>
			</Animated.View>
		);
	}
}

export default connect(null)(Login);
