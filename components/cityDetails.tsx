import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRouter, Link } from "expo-router";

interface CityDetailsProps {
  city: {
    name: string;
    image: any;
    facts: string[];
    url: string;
  };
}

const CityDetails: React.FC<CityDetailsProps> = ({ city }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{city.name}</Text>
        <Image
          source={{ uri: city.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.factsContainer}>
          <Text style={styles.factsTitle}>Fun Facts:</Text>
          {city.facts.map((fact, index) => (
            <View key={index} style={styles.factItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.factText}>{fact}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 16 }}>
          <Link href={city ? city.url : "#"} style={styles.factText}>
            Learn more about {city.name}
          </Link>
        </View>

        {/* <Text style={styles.factText}>
        Explore more about {displayCity.name}!
      </Text> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  factsContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
  },
  factsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  factItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bulletPoint: {
    marginRight: 8,
    fontSize: 16,
  },
  factText: {
    fontSize: 16,
    flex: 1,
  },
});

export default CityDetails;
