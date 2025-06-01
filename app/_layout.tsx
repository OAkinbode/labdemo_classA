import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { constantStyles } from "../components/constants";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate resource loading (e.g., fonts)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Minimum delay for UX
        await Font.loadAsync({
          // Example font (uncomment and add your font if needed)
          // 'custom-font': require('../assets/fonts/CustomFont.ttf'),
        });
      } catch (e) {
        console.warn("Error loading resources:", e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      {/* Banner Image */}
      {/* <View style={constantStyles.banner}>
        <Image
          source={{
            uri: "https://images.freeimages.com/images/large-previews/678/web-1173065.jpg?fmt=webp&h=350",
          }}
          style={constantStyles.bannerImage}
          resizeMode="cover"
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
        />
      </View> */}
      {/* Navigation Stack */}
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
              headerStyle: { backgroundColor: "#f4511e" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              title: "Settings",
              headerStyle: { backgroundColor: "blue" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}
