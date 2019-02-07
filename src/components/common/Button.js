import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
const { buttonStyle, buttonTextStyle } = styles;

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
    >

      <Text style={buttonTextStyle}>
        {children.toUpperCase()}
      </Text>
      </TouchableOpacity>
    );
};

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#68EFAD',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#68EFAD',
    marginLeft: 5,
    marginRight: 5
  },
  buttonTextStyle: {

    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: '600'
  }
}

export { Button };
