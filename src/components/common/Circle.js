import React from 'react';
import { Text } from 'react-native';

const Circle = (props) => {
  return (
      <Text style={styles.circleRed}>{props.text}</Text>
  );
};


const styles = {
    circleGreen: {
        borderWidth: 1,
        color: '#8CC63E',
        borderColor: '#8CC63E',
        fontSize: 30,
        textAlign: 'center',
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 16,
        width: 55,
        height: 55,
        borderRadius: 55 / 2
    },
    circleRed: {
        borderWidth: 2,
        color: '#00A2E8',
        borderColor: '#00A2E8',
        fontSize: 25,
        textAlign: 'center',
        justifyContent: 'center',
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 16,
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        paddingTop: 4
     }
};

export { Circle };
