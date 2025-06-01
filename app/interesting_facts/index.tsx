import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

interface Fact {
  id: number;
  text: string;
  source?: string;
}

const InterestingFacts = () => {
  const facts: Fact[] = [
    {
      id: 1,
      text: "A day on Venus is longer than a year on Venus. It takes Venus 243 Earth days to rotate once on its axis but only 225 Earth days to orbit the Sun.",
      source: "NASA",
    },
    {
      id: 2,
      text: "The Great Barrier Reef is the largest living structure on Earth, stretching over 2,300 kilometers and visible from space.",
      source: "National Geographic",
    },
    {
      id: 3,
      text: "Octopuses have three hearts, nine brains, and blue blood.",
      source: "Smithsonian Magazine",
    },
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const nextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentFactIndex((prevIndex) =>
      prevIndex === 0 ? facts.length - 1 : prevIndex - 1
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Interesting World Facts</Text>

      <View style={styles.factCard}>
        <Text style={styles.factText}>{facts[currentFactIndex].text}</Text>
        {facts[currentFactIndex].source && (
          <Text style={styles.source}>
            Source: {facts[currentFactIndex].source}
          </Text>
        )}
        <Text style={styles.counter}>
          {currentFactIndex + 1} of {facts.length}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={prevFact}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextFact}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  factCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    minHeight: 200,
    justifyContent: "center",
  },
  factText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  source: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
    fontStyle: "italic",
  },
  counter: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 12,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default InterestingFacts;
