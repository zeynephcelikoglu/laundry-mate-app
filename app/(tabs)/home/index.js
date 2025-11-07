import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "../../../constants/colors";

export default function Index() {
    const router = useRouter();

  return (
    <ScrollView 
      style={{ backgroundColor: Colors.background }} 
      contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{ 
          backgroundColor: Colors.primary,
          padding: 28, 
          paddingTop: 5, 
          paddingBottom: 55, 
          borderBottomLeftRadius: 18, 
          borderBottomRightRadius: 18, 
          shadowColor: "#000", 
          shadowOpacity: 0.12, 
          shadowRadius: 8, 
          shadowOffset: { width: 0, height: 4 } 
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 15
          }}
        >
          <View>
            <Text style={{ color: Colors.onPrimary, fontSize: 40, fontWeight: "800", letterSpacing: 1 }}>
              WashHub
            </Text>
          </View>
        </View>

        <View>
          <Text style={{ marginTop: 16, fontSize: 28, color: Colors.onPrimary, fontWeight: "800" }}>
            Hoş geldiniz
          </Text>
          <Text style={{ marginTop: 8, fontSize: 18, color: "rgba(255,255,255,0.9)" }}>
            Çamaşırlarınızı biz hallederiz. 
            Sadece sipariş verin.
          </Text>
        </View>
      </View>
      

      <View style={{ padding: 16, paddingTop: 20, gap: 12 }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            onPress={() => router.push("/home/address")}
            style={{ flex: 1, backgroundColor: Colors.surface, borderRadius: 12, padding: 14, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6 }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: -2 }}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700", color: Colors.text }}>Hızlı Sipariş</Text>
                <Text style={{ marginTop: 10, color: Colors.mutedText }}>Adres seç, teslimat zamanını ayarla</Text>
              </View>
              <MaterialCommunityIcons name="truck" size={28} color={Colors.primary} />
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(tabs)/basket")}
            style={{ flex: 1, backgroundColor: Colors.surface, borderRadius: 12, padding: 14, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6 }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize:20, fontWeight: "700", color: Colors.text }}>Sepetim</Text>
                <Text style={{ marginTop: 10, color: Colors.mutedText }}>Ürünleri gözden geçir</Text>
              </View>
              <Ionicons name="basket-outline" size={26} color={Colors.primary} />
            </View>
          </Pressable>
        </View>

        <View style={{ marginTop: -8}} />

        <View style={{ backgroundColor: Colors.surface, borderRadius: 12, padding: 14, marginTop: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: Colors.text, marginBottom: 5 }}>Hızlı İşlemler</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <Pressable style={{ width: "47%", backgroundColor: Colors.background, borderRadius: 10, padding: 18, alignItems: "center" }}>
              <Ionicons name="shirt-outline" size={28} color={Colors.primary} />
              <Text style={{ marginTop: 8, color: Colors.primary }}>Yıkama</Text>
            </Pressable>
            <Pressable style={{ width: "47%", backgroundColor: Colors.background, borderRadius: 10, padding: 18, alignItems: "center" }}>
              <MaterialCommunityIcons name="iron" size={28} color={Colors.primary} />
              <Text style={{ marginTop: 8, color: Colors.primary }}>Ütü</Text>
            </Pressable>
            <Pressable style={{ width: "47%", backgroundColor: Colors.background, borderRadius: 10, padding: 18, alignItems: "center" }}>
              <MaterialCommunityIcons name="tshirt-crew-outline" size={28} color={Colors.primary} />
              <Text style={{ marginTop: 8, color: Colors.primary }}>Kuru Temizleme</Text>
            </Pressable>
            <Pressable style={{ width: "47%", backgroundColor: Colors.background, borderRadius: 10, padding: 18, alignItems: "center" }}>
              <Entypo name="leaf" size={28} color={Colors.primary} />
              <Text style={{ marginTop: 8, color: Colors.primary }}>Eko Seçenek</Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/home/address")}
          style={{ marginTop: 10, backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: "center" }}
        >
          <Text style={{ color: Colors.onPrimary, fontWeight: "800", fontSize: 18 }}>Hemen Başla</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});