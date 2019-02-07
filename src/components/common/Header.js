import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;


  return (
    <View style={viewStyle}>
    <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
      paddingTop: 15,
      height: 60,
      justifyContent: 'center',
      alignItems: 'flex-start',
      shadowOffset: { width: 0, height: 2 },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      backgroundColor: '#FFFFFF',
      elevation: 10,
      position: 'relative'
  },
  textStyle: {
    color: '#000',
    fontSize: 20,
    marginLeft: 16
  }
};

export { Header };
