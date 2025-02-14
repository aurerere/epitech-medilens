import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { loadAsync } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { RootContainer } from "./navigation/rootContainer";
import { AuthScreen } from "./screens/authScreen";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await loadAsync({
          Inter: require("./assets/fonts/Inter_variable.ttf"),
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoggedIn(false);
        setIsAppReady(true);
      }
    })();
  }, []);

  if (!isAppReady) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <Stack.Screen name="Auth">{() => <AuthScreen />}</Stack.Screen>
          ) : (
            <Stack.Screen name="MainContainer">
              {() => <RootContainer />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
