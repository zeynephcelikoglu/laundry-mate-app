import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Octicons, AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import DressItem from "../../../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../../redux/CartReducer";
import { useRouter } from "expo-router";

export default function Select() {
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.item.price * item.item.quantity)
    .reduce((prev, curr) => prev + curr, 0);
  const menData = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/776/776623.png",
      name: "Erkek Pantolon",
      price: 75,
    },
    {
      id: "1",
      image: "https://cdn-icons-png.flaticon.com/128/2806/2806045.png",
      name: "Erkek Şalvar",
      price: 80,
    },
    {
      id: "2",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "Erkek Tişört",
      price: 60,
    },
    {
      id: "3",
      image: "https://cdn-icons-png.flaticon.com/128/3531/3531849.png",
      name: "Erkek Gömlek",
      price: 85,
    },
    {
      id: "8",
      image: "https://cdn-icons-png.flaticon.com/128/2405/2405604.png",
      name: "Erkek Şort",
      price: 85,
    },
  ];
  const womenData = [
    {
      id: "10",
      image: "https://cdn-icons-png.flaticon.com/128/1348/1348247.png",
      name: "Kadın Kot Pantolon",
      price: 75,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/6183/6183080.png",
      name: "Kadın Tunik",
      price: 80,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/5980/5980963.png",
      name: "Kadın Sweatshirt",
      price: 60,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/5386/5386732.png",
      name: "Kadın Tayt",
      price: 85,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/8491/8491258.png",
      name: "Kadın Bluz",
      price: 85,
    },
  ];
  const kidsData = [
    {
      id: "20",
      image: "https://cdn-icons-png.flaticon.com/128/6609/6609556.png",
      name: "Çocuk Elbise",
      price: 75,
    },
    {
      id: "21",
      image: "https://cdn-icons-png.flaticon.com/128/1083/1083825.png",
      name: "Çocuk Jile",
      price: 80,
    },
    {
      id: "22",
      image: "https://cdn-icons-png.flaticon.com/128/405/405130.png",
      name: "Çocuk Tişört",
      price: 60,
    },
    {
      id: "23",
      image: "https://cdn-icons-png.flaticon.com/128/5386/5386732.png",
      name: "Çocuk Kazak",
      price: 85,
    },
  ];
  const houseData = [
    {
      id: "30",
      image: "https://cdn-icons-png.flaticon.com/128/11543/11543825.png",
      name: "Mutfak Önlüğü",
      price: 75,
    },
    {
      id: "31",
      image: "https://cdn-icons-png.flaticon.com/128/5696/5696987.png",
      name: "Banyo Havlusu",
      price: 80,
    },
    {
      id: "32",
      image: "https://cdn-icons-png.flaticon.com/128/1026/1026562.png",
      name: "Ev Paspası",
      price: 60,
    },
    {
      id: "33",
      image: "https://cdn-icons-png.flaticon.com/128/9096/9096915.png",
      name: "Yastık Kılıfı",
      price: 85,
    },
  ];
  const [option, setOption] = useState("Erkek");
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("Yıka + Katla");

  const renderItem = (item, index) => (
    <Pressable
      key={index}
      style={{
        padding: 14,
        backgroundColor: Colors.surface,
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 45, height: 45 }}
          source={{ uri: item?.image }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "600", color: Colors.text }}>
          {item?.name}
        </Text>
        <Text style={{ marginTop: 6, fontSize: 16, fontWeight: "700", color: Colors.primary }}>
          ₺
          {selectedOption == "Yıka + Ütüle"
            ? (item.price + 20).toFixed(2)
            : selectedOption == "Buharlı Ütü"
            ? (item.price + 35).toFixed(2)
            : selectedOption == "Kuru Temizleme"
            ? (item.price + 45).toFixed(2)
            : item.price.toFixed(2)}
        </Text>
      </View>

      {cart.some((c) => c.item.id == item.id) ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
            borderRadius: 20,
            paddingHorizontal: 4,
            paddingVertical: 4,
          }}
        >
          <Pressable
            onPress={() => dispatch(decrementQuantity(item))}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: Colors.surface,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.primary }}>
              −
            </Text>
          </Pressable>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              paddingHorizontal: 14,
              color: Colors.text,
            }}
          >
            {cart.find((c) => c.item.id === item.id)?.item.quantity}
          </Text>

          <Pressable
            onPress={() => dispatch(incrementQuantity(item))}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: Colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.onPrimary }}>
              +
            </Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            dispatch(addToCart({ item, category: selectedOption }));
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: Colors.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="plus" size={20} color={Colors.onPrimary} />
        </Pressable>
      )}
    </Pressable>
  );

  return (
    <>
      <ScrollView style={{ backgroundColor: Colors.background }}>
        <View style={{ backgroundColor: Colors.primary, padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Pressable
                onPress={() => router.back()}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: Colors.onPrimary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="chevron-back" size={24} color={Colors.primary} />
              </Pressable>
              <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.onPrimary }}>
                Çamaşır Listesi
              </Text>
            </View>
          </View>
        </View>

        {/* Service Selection */}
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <Pressable
            onPress={() => setSelectedOption("Yıka + Katla")}
            style={{
              backgroundColor: Colors.surface,
              flex: 1,
              height: 95,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              borderWidth: 2,
              borderColor:
                selectedOption == "Yıka + Katla" ? Colors.primary : "transparent",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: selectedOption == "Yıka + Katla" ? 0.1 : 0.05,
              shadowRadius: 3,
              elevation: selectedOption == "Yıka + Katla" ? 3 : 1,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/7769/7769829.png",
              }}
            />
            <Text style={{ 
              textAlign: "center", 
              fontSize: 12, 
              marginTop: 8,
              fontWeight: selectedOption == "Yıka + Katla" ? "600" : "500",
              color: selectedOption == "Yıka + Katla" ? Colors.primary : Colors.text
            }}>
              Yıka + Katla
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedOption("Yıka + Ütüle")}
            style={{
              backgroundColor: Colors.surface,
              flex: 1,
              height: 95,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              borderWidth: 2,
              borderColor:
                selectedOption == "Yıka + Ütüle" ? Colors.primary : "transparent",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: selectedOption == "Yıka + Ütüle" ? 0.1 : 0.05,
              shadowRadius: 3,
              elevation: selectedOption == "Yıka + Ütüle" ? 3 : 1,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/802/802826.png",
              }}
            />
            <Text style={{ 
              textAlign: "center", 
              fontSize: 12, 
              marginTop: 8,
              fontWeight: selectedOption == "Yıka + Ütüle" ? "600" : "500",
              color: selectedOption == "Yıka + Ütüle" ? Colors.primary : Colors.text
            }}>
              Yıka + Ütüle
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedOption("Buharlı Ütü")}
            style={{
              backgroundColor: Colors.surface,
              flex: 1,
              height: 95,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              borderWidth: 2,
              borderColor:
                selectedOption == "Buharlı Ütü" ? Colors.primary : "transparent",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: selectedOption == "Buharlı Ütü" ? 0.1 : 0.05,
              shadowRadius: 3,
              elevation: selectedOption == "Buharlı Ütü" ? 3 : 1,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/12299/12299913.png",
              }}
            />
            <Text style={{ 
              textAlign: "center", 
              fontSize: 12, 
              marginTop: 8,
              fontWeight: selectedOption == "Buharlı Ütü" ? "600" : "500",
              color: selectedOption == "Buharlı Ütü" ? Colors.primary : Colors.text
            }}>
              Buharlı Ütü
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedOption("Kuru Temizleme")}
            style={{
              backgroundColor: Colors.surface,
              flex: 1,
              height: 95,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              borderWidth: 2,
              borderColor:
                selectedOption == "Kuru Temizleme" ? Colors.primary : "transparent",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: selectedOption == "Kuru Temizleme" ? 0.1 : 0.05,
              shadowRadius: 3,
              elevation: selectedOption == "Kuru Temizleme" ? 3 : 1,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/7029/7029276.png",
              }}
            />
            <Text style={{ 
              textAlign: "center", 
              fontSize: 11, 
              marginTop: 8,
              fontWeight: selectedOption == "Kuru Temizleme" ? "600" : "500",
              color: selectedOption == "Kuru Temizleme" ? Colors.primary : Colors.text
            }}>
              Kuru Temizleme
            </Text>
          </Pressable>
        </View>

        {/* Category Tabs */}
        <View>
          <View
            style={{
              marginVertical: 24,
              marginHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "space-around",
            }}
          >
            <Pressable
              onPress={() => setOption("Erkek")}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                backgroundColor: option == "Erkek" ? Colors.primary : Colors.surface,
                borderRadius: 25,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: option == "Erkek" ? 0.15 : 0.05,
                shadowRadius: 3,
                elevation: option == "Erkek" ? 3 : 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  textAlign: "center",
                  color: option == "Erkek" ? Colors.onPrimary : Colors.mutedText,
                }}
              >
                Erkek
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setOption("Kadın")}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                backgroundColor: option == "Kadın" ? Colors.primary : Colors.surface,
                borderRadius: 25,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: option == "Kadın" ? 0.15 : 0.05,
                shadowRadius: 3,
                elevation: option == "Kadın" ? 3 : 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  textAlign: "center",
                  color: option == "Kadın" ? Colors.onPrimary : Colors.mutedText,
                }}
              >
                Kadın
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setOption("Çocuk")}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                backgroundColor: option == "Çocuk" ? Colors.primary : Colors.surface,
                borderRadius: 25,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: option == "Çocuk" ? 0.15 : 0.05,
                shadowRadius: 3,
                elevation: option == "Çocuk" ? 3 : 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  textAlign: "center",
                  color: option == "Çocuk" ? Colors.onPrimary : Colors.mutedText,
                }}
              >
                Çocuk
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setOption("Ev")}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                backgroundColor: option == "Ev" ? Colors.primary : Colors.surface,
                borderRadius: 25,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: option == "Ev" ? 0.15 : 0.05,
                shadowRadius: 3,
                elevation: option == "Ev" ? 3 : 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  textAlign: "center",
                  color: option == "Ev" ? Colors.onPrimary : Colors.mutedText,
                }}
              >
                Ev Tekstili
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{ marginHorizontal: 12, paddingBottom: 100 }}>
          {option == "Erkek" && (
            <View>
              {menData?.map((item, index) => renderItem(item, index))}
            </View>
          )}
          {option == "Kadın" && (
            <View>
              {womenData?.map((item, index) => renderItem(item, index))}
            </View>
          )}
          {option == "Çocuk" && (
            <View>
              {kidsData?.map((item, index) => renderItem(item, index))}
            </View>
          )}
          {option == "Ev" && (
            <View>
              {houseData?.map((item, index) => renderItem(item, index))}
            </View>
          )}
        </View>
      </ScrollView>

      {cart.length > 0 && (
        <Pressable 
          onPress={() => router.push("/basket/cart")}
          style={{ 
            backgroundColor: Colors.surface, 
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="basket" size={22} color={Colors.onPrimary} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: "700", color: Colors.text }}>
                Sepet Toplamı: ₺{total.toFixed(2)}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: "500", marginTop: 2, color: Colors.mutedText }}>
                {cart.length} ürün sepetinizde
              </Text>
            </View>

            <View style={{ 
              paddingVertical: 10, 
              paddingHorizontal: 20, 
              backgroundColor: Colors.primary, 
              borderRadius: 8 
            }}>
              <Text style={{ color: Colors.onPrimary, fontWeight: "600", fontSize: 14 }}>
                Görüntüle
              </Text>
            </View>
          </View>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({});