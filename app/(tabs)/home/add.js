import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Colors from "../../../constants/colors";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AddAddress() {
  const routerNav = useRouter();
  const params = useLocalSearchParams();
  const isEdit = String(params?.edit || "") === "1";
  const [name, setName] = useState((params?.name && String(params.name)) || "");
  const [houseNo, setHouseNo] = useState((params?.houseNo && String(params.houseNo)) || "");
  const [landmark, setLandmark] = useState((params?.landmark && String(params.landmark)) || "");
  const [postalCode, setPostalCode] = useState((params?.postalCode && String(params.postalCode)) || "");

  const addAddress = async () => {
    try {
      // Şimdilik sadece alert göster
      Alert.alert("Başarılı", isEdit ? "Adres güncellendi" : "Adres eklendi");
      routerNav.back();
    } catch (error) {
      console.log("error", error);
      Alert.alert("Hata", "Adres kaydedilirken bir sorun oluştu.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {isEdit ? "Adresi Düzenle" : "Yeni Adres"}
        </Text>

        <TextInput
          placeholder="Ev"
          placeholderTextColor={Colors.text}
          style={{
            padding: 10,
            borderColor: Colors.border,
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Ad Soyad</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={Colors.text}
            style={{
              padding: 10,
              borderColor: Colors.border,
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Adınızı girin"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Daire/Bina/No
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={Colors.text}
            style={{
              padding: 10,
              borderColor: Colors.border,
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Örn: 6/3"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Tarif/İşaret</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={Colors.text}
            style={{
              padding: 10,
              borderColor: Colors.border,
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Örn: Parkın yanı"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Posta Kodu</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={Colors.text}
            style={{
              padding: 10,
              borderColor: Colors.border,
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Posta kodu girin"
          />
        </View>

        <Pressable
          onPress={addAddress}
          style={{
            backgroundColor: Colors.primary,
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: Colors.onPrimary, fontWeight: "600" }}>
            {isEdit ? "Güncelle" : "Kaydet"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});