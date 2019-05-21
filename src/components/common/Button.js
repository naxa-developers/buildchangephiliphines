import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../../styles";

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Text style={styles.buttonText}>{children.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export default Button;
