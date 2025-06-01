import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./button";

interface Person {
  name: string;
  age: number;
}

const initialPerson: Person = {
  name: "John Doe",
  age: 30,
};

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const [person, setPerson] = useState<Person>(initialPerson);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Increment"
          onPress={() => {
            setCount(count + 1);
          }}
          color="green"
        />
        <Button
          title="Decrement"
          onPress={() => {
            setCount(count - 1);
          }}
        />
      </View>
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
  counterText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },
});
export default Counter;
