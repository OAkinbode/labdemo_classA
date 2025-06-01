import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CityDetails from "../../components/cityDetails";

export default function Index() {
  const citydetails = {
    name: "Calgary",
    image:
      "https://i.pinimg.com/736x/7e/b0/1a/7eb01ae56f1f024cb744426be298d598.jpg", // Make sure to add this image to your assets folder
    facts: [
      'Calgary is home to the annual Calgary Stampede, known as "The Greatest Outdoor Show on Earth"',
      "It hosted the 1988 Winter Olympics",
      "Calgary Tower is 191 meters tall and was built in 1968",
      "The city has over 800 km of pathways and bikeways",
      "Calgary gets the most sunshine of any major Canadian city",
    ],
    url: "https://www.calgary.ca/home.html",
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome to Calgary</Text> */}
      <CityDetails city={citydetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
