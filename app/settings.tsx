import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { constantStyles } from "../components/constants";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Settings</Text>
      <TouchableOpacity style={constantStyles.button2} onPress={handlePress}>
        <Text style={constantStyles.text}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
