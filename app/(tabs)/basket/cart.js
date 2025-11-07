import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../../redux/CartReducer";
import { useRouter } from "expo-router";
import Colors from "../../../constants/colors";

export default function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const total = cart
    ?.map((item) => item.item.price * item.item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  const emptyBasket = () => {
    cart.forEach((item) => {
      dispatch(removeFromCart(item.item));
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            backgroundColor: Colors.primary,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.onPrimary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="basket" size={22} color={Colors.primary} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.onPrimary }}>
              Sepet Toplamı
            </Text>
          </View>
        </View>

        {/* Cart Items */}
        {cart.length > 0 ? (
          <View style={{ padding: 12 }}>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: "600", 
              marginBottom: 12,
              color: Colors.text
            }}>
              Sepetinizdeki Ürünler
            </Text>

            {cart?.map((item, index) => (
              <View
                style={{
                  padding: 14,
                  backgroundColor: Colors.surface,
                  marginVertical: 6,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  borderRadius: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
                key={index}
              >
                {/* Product Image */}
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 45, height: 45 }}
                    source={{ uri: item?.item?.image }}
                  />
                </View>

                {/* Product Info */}
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: 15, 
                    fontWeight: "600",
                    color: Colors.text,
                    marginBottom: 4
                  }}>
                    {item?.item.name}
                  </Text>
                  <Text style={{ 
                    fontSize: 13, 
                    color: Colors.mutedText,
                    marginBottom: 6
                  }}>
                    {item?.category}
                  </Text>
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: "700",
                    color: Colors.primary
                  }}>
                    ₺{(item?.item.price * item?.item.quantity).toFixed(2)}
                  </Text>
                  <Text style={{ 
                    fontSize: 12, 
                    color: Colors.mutedText,
                    marginTop: 2
                  }}>
                    Birim fiyat: ₺{item?.item.price.toFixed(2)}
                  </Text>
                </View>

                {/* Quantity Controls */}
                <View style={{ alignItems: "center" }}>
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
                      onPress={() => dispatch(decrementQuantity(item.item))}
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
                      {item?.item.quantity}
                    </Text>

                    <Pressable
                      onPress={() => dispatch(incrementQuantity(item.item))}
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
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View
            style={{
              padding: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.surface,
              borderRadius: 12,
              marginTop: 30,
              marginHorizontal: 16,
            }}
          >
            <Ionicons name="basket-outline" size={64} color={Colors.mutedText} />
            <Text style={{ 
              fontSize: 18, 
              fontWeight: "600",
              marginTop: 16,
              color: Colors.text
            }}>
              Sepetiniz Boş
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: Colors.mutedText,
              marginTop: 8,
              textAlign: "center"
            }}>
              Henüz sepetinize ürün eklemediniz
            </Text>
          </View>
        )}

        {/* Price Breakdown */}
        {cart.length > 0 && (
          <View style={{ 
            marginHorizontal: 16, 
            marginTop: 16,
            marginBottom: 20,
            backgroundColor: Colors.surface,
            borderRadius: 12,
            padding: 16,
          }}>
            <View style={{ 
              flexDirection: "row", 
              justifyContent: "space-between",
              marginBottom: 12
            }}>
              <Text style={{ fontSize: 15, color: Colors.mutedText }}>
                Ara Toplam
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "600", color: Colors.text }}>
                ₺{total.toFixed(2)}
              </Text>
            </View>
            <View style={{ 
              flexDirection: "row", 
              justifyContent: "space-between",
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: "#e0e0e0"
            }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.text }}>
                Toplam Tutar
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.primary }}>
                ₺{total.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      {cart.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            alignItems: "center",
            gap: 12,
            backgroundColor: Colors.surface,
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Pressable
            onPress={emptyBasket}
            style={{
              backgroundColor: "#e0e0e0",
              padding: 16,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "600", fontSize: 15 }}>
              Sepeti Boşalt
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/checkout")}
            style={{
              backgroundColor: Colors.primary,
              padding: 16,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: Colors.onPrimary,
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              Siparişi Onayla
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});