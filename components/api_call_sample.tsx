import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";

const ApiCallSample: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("");

  //   useEffect(() => {
  //     weatherApiCall();
  //   }, []);

  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apikey = "591e60f89932c42f1b095e0794df9b0b";

  const geoConverterAPI = "https://geocoding-api.open-meteo.com/v1/search";

  const weatherApiCall = async () => {
    try {
      const response = await fetch(
        `${baseUrl}?lat=44.34&lon=10.99&appid=${apikey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
      console.log("Weather data:", jsonData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data");
    }
  };

  const handleGetTemperature = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const geoResponse = await fetch(`${geoConverterAPI}?name=${city}`);
      if (!geoResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const geoData = await geoResponse.json();
      if (geoData.results.length === 0) {
        setError("City not found");
        setLoading(false);
        return;
      }
      const { latitude, longitude } = geoData.results[0];
      const weatherResponse = await fetch(
        `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apikey}`
      );
      if (!weatherResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const weatherData = await weatherResponse.json();
      setData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Data</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Enter city name"
        onChangeText={setCity}
        value={city}
      />
      <Pressable style={styles.button} onPress={handleGetTemperature}>
        <Text>Get Temperature</Text>
      </Pressable>
      {data && (
        <ScrollView>
          <Text style={styles.body}>
            City: {data.name}
            {"\n"}
            Temperature: {Math.round(data.main.temp - 273.15)}°C{"\n"}
            Weather: {data.weather[0].description}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});
export default ApiCallSample;
