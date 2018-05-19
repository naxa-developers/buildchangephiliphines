import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

// https://react-native-training.github.io/react-native-elements/docs/getting_started.html
export default class ToggleCircle extends Component {
    constructor(props) {
        super(props);
        this.state = { isActivated: false };
      }

   onToggleButtonPress() {
    this.setState({ ...this.state, isActivated: !this.state.isActivated });
    console.log(this.state.isActivated);
   }   


  render() {
    const filledCircle = <Text style={styles.circleGreenFilled} >&#10003;</Text>;
    const emptyCircle = <Text style={styles.circleGreenEmpty} />;


    return (
        <TouchableOpacity onPress={this.onToggleButtonPress.bind(this)}>

                {this.state.isActivated ? filledCircle : emptyCircle}
                
        </TouchableOpacity>
    );
  }
}

const styles = {
    circleGreenFilled: {
        borderWidth: 1,
        color: '#fff',
        backgroundColor: '#8CC63E',
        borderColor: '#8CC63E',
        fontSize: 36,
        textAlign: 'center',
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 16,
        width: 55,
        height: 55,
        borderRadius: 55 / 2
    },
    circleGreenEmpty: {
        borderWidth: 1,
        color: '#8CC63E',
        borderColor: '#8CC63E',
        fontSize: 36,
        textAlign: 'center',
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 16,
        width: 55,
        height: 55,
        borderRadius: 55 / 2
     }
};

export { ToggleCircle };
