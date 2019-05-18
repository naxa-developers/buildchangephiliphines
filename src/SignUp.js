import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { Alert, Animated, Keyboard, ScrollView, Platform } from "react-native";
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from "./styles";
import Input from "./components/common/Input";
import Button from "./components/common/Button";

class SignUpTest extends Component {
  constructor() {
    super();
    this.state = {};
    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.inputFields = [
      {
        name: "username",
        placeholder: "Username",
        handleInputChange: this.handleInputChange,
        secureTextEntry: false
      },
      {
        name: "email",
        placeholder: "Email",
        handleInputChange: this.handleInputChange,
        secureTextEntry: false
      },
      {
        name: "password",
        placeholder: "Password",
        handleInputChange: this.handleInputChange,
        secureTextEntry: true
      },
      {
        name: "retypePassword",
        placeholder: "Retype Password",
        handleInputChange: this.handleInputChange,
        secureTextEntry: true
      }
    ];
  }

  componentWillMount() {
    const keyboardOnScreen =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const keyboardNotOnScreen =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";

    this.keyboardDidShowSub = Keyboard.addListener(
      keyboardOnScreen,
      this.keyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      keyboardNotOnScreen,
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  keyboardDidShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: 1000,
        toValue: event.endCoordinates.height
      }),
      Animated.timing(this.imageHeight, {
        duration: 300,
        toValue: IMAGE_HEIGHT_SMALL
      })
    ]).start();
  };

  keyboardDidHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: 1000,
        toValue: 0
      }),
      Animated.timing(this.imageHeight, {
        duration: 300,
        toValue: IMAGE_HEIGHT
      })
    ]).start();
  };

  userSignup() {
    if (this.state.password === this.state.retypePassword) {
      if (this.state.username && this.state.email && this.state.password) {
        //change the url
        fetch("http://bccms.naxa.com.np/core/api/users/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            //change the name of the properties email_or_username and password as per api
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
          })
        })
          .then(response => {
            switch (response.status) {
              case 201:
                Alert.alert("Successful Signup");
                Actions.Login();
                break;
              case 400:
                Alert.alert("Username Already Exists");
                break;
              default:
                Alert.alert("Unknown Error Occured!");
            }
          })
          .catch(error => console.log(error))

          .done();
      }
    } else {
      Alert.alert("Password did not match!");
    }
  }

  handleInputChange(text, name) {
    this.setState({ ...this.state, [name]: text });
  }

  render() {
    return (
      <Animated.View style={[styles.container, { paddingBottom: 20 }]}>
        <Animated.Image
          source={require("../app_images/buildchange.jpeg")}
          style={[styles.logo, { height: this.imageHeight }]}
        />
        <ScrollView style={styles.form} keyboardShouldPersistTaps="always">
          {this.inputFields.map(inputField => (
            <Input {...inputField} />
          ))}
          <Button onPress={this.userSignup.bind(this)}>SignUp</Button>
        </ScrollView>
      </Animated.View>
    );
  }
}

export default SignUpTest;
