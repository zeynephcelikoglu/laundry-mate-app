import { Tabs } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7CB9E8",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Anasayfa",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="home" size={24} color="#7CB9E8" />
            ) : (
              <Feather name="home" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          tabBarLabel: "Sepetim",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="basket-outline" size={24} color="#7CB9E8" />
            ) : (
              <Ionicons name="basket-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarLabel: "Siparişlerim",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="receipt-outline" size={24} color="#7CB9E8" />
            ) : (
              <Ionicons name="receipt-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="account" size={24} color="#7CB9E8" />
            ) : (
              <MaterialCommunityIcons name="account" size={24} color="black" />
            ),
        }}
      />
    </Tabs>
  );
}