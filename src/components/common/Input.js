import React, { Component } from 'react';
import { TextInput } from 'react-native';
import styles from '../../stylestest';

class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(text, name) {
    this.props.handleInputChange(text, name);
  }

  render() {
    console.log(this.props);
    return (
      <TextInput
        {...this.props}
        editable
        onChangeText={(text) => {
          this.setState({ text });
          this.props.handleInputChange(text, this.props.name);
        }}
        style={styles.input}
        value={this.state.text}
        autoCapitalize='none'
      />
    );
  }
}

export default Input;
