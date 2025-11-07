import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store.js";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Colors from "../constants/colors";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SafeAreaView 
          style={{ flex: 1, backgroundColor: Colors.primary }} 
          edges={['top']}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(authenticate)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
}