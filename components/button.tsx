import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  color?: string;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, color, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color ? color : "#2196F3",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        elevation: 3,
      }}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
