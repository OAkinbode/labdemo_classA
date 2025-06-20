import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { constantStyles, welcome_message } from "../components/constants";

const Welcome = () => {
  const router = useRouter();

  const handleRoutingPress = (route: string) => {
    router.push(`/${route}`);
  };
  return (
    <View style={constantStyles.container}>
      <Text>{welcome_message}</Text>
      <Button
        title="Settings"
        color="#EE4B2B"
        onPress={() => handleRoutingPress("settings")}
      />
      <Button
        title="interesting facts"
        onPress={() => handleRoutingPress("interesting_facts")}
      />
      <Button title="Tabs" onPress={() => handleRoutingPress("(tabs)")} />

      {/* <Counter /> */}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    color: "white",
    fontSize: 20,
  },
});

export default Welcome;
