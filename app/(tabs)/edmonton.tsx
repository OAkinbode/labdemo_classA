import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CityDetails from "../../components/cityDetails";

export default function EdmontonScreen() {
  const cityDetails = {
    name: "Edmonton",
    image:
      "https://i.pinimg.com/736x/8a/b5/dd/8ab5dda38f5d0ebf88cad694a179a2c4.jpg",
    facts: [
      "Edmonton is the capital city of Alberta, Canada.",
      "It is known as the 'Gateway to the North' due to its proximity to northern resources.",
      "The city is home to the West Edmonton Mall, one of the largest shopping malls in North America.",
      "Edmonton hosts the annual Edmonton International Fringe Theatre Festival, the largest fringe festival in North America.",
      "The city has a vibrant arts scene, with numerous galleries, theaters, and music festivals.",
    ],
    url: "https://www.edmonton.ca/",
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome to Edmonton</Text> */}
      <CityDetails city={cityDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
