import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { constantStyles } from "./constants";
import { set } from "date-fns";
import credentials from "../lib/credentials.json";

interface LoginProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   useEffect(() => {
  //     if (username.length > 10) {
  //       console.log("Username is valid: ", username);
  //     }
  //   }, [username]);

  const checkCredentials = () => {
    if (credentials) {
      const user = credentials.find(
        (cred) =>
          cred.username === username.trim() && cred.password === password.trim()
      );
      if (user) {
        console.log("Welcome: ", user.username);
        setIsLoggedIn(true);
      } else {
        console.log("Invalid credentials. Please try again.");
      }
    }
  };

  const handleLogin = () => {
    if (username.length < 3) {
      console.log("Username must be at least 4 characters long.");
      return;
    }
    if (password.length < 6) {
      console.log("Password must be at least 6 characters long.");
      return;
    } else {
      checkCredentials();
    }
  };

  return (
    <View style={constantStyles.container}>
      <Text style={styles.text}>Welcome to login screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable style={constantStyles.button} onPress={handleLogin}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Login
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 5,
    minWidth: 180,
    maxWidth: 300,
  },
});
export default Login;
