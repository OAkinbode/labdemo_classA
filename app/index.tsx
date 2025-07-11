import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Button from "../components/button";
import { constantStyles, welcome_message } from "../components/constants";
import { useRouter } from "expo-router";
import Login from "../components/login";
import Welcome from "../components/welcome";
import ApiCallSample from "../components/api_call_sample";
import DatabaseCrud from "../components/database_crud";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <View style={constantStyles.container}>
      {isLoggedIn && (
        <Pressable
          style={constantStyles.button}
          onPress={() => setIsLoggedIn(!isLoggedIn)}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {isLoggedIn ? "Logout" : "Login"}
          </Text>
        </Pressable>
      )}
      {/* {isLoggedIn ? <Welcome /> : <Login setIsLoggedIn={setIsLoggedIn} />} */}
      {isLoggedIn ? <DatabaseCrud /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    color: "white",
    fontSize: 20,
  },
});
