import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

  const { inputStyle, labelStyle, containestyle } = styles;

  return (
    <View style={containestyle}>
      <Text style={labelStyle}>
        { label }
      </Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
        />
    </View>

  );
}


const styles = {
  inputStyle: {
      paddingRight: 5,
      paddingLeft: 5,
      color: '#000',
      fontSize: 16,
      lineHeight: 21,
      flex: 2
  },
  labelStyle: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 16
  },
  containestyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

}

export { Input }
