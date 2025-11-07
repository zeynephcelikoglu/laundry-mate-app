import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/tr";
import { useRouter } from "expo-router";
import Colors from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../../../redux/CartReducer";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Address() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.item.price * item.item.quantity)
    .reduce((prev, curr) => prev + curr, 0);
  
  const quickOrderBasePrice = 150;
  const quickOrderMultiplier = 1.2;
  const estimatedQuickOrderPrice = Math.round(quickOrderBasePrice * quickOrderMultiplier);
  const [step, setStep] = useState(1);
  const [currentDate, setCurrentDate] = useState(moment());
  const [deliveryDate, setDeliveryDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedAdress, setSelectedAdress] = useState("");
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedPickupDate, setSelectedPickupDate] = useState(new Date());
  const [selectedPickupTime, setSelectedPickupTime] = useState(new Date());
  
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);
  const [showDeliveryTimePicker, setShowDeliveryTimePicker] = useState(false);
  const [selectedDeliveryPickupDate, setSelectedDeliveryPickupDate] = useState(new Date());
  const [selectedDeliveryPickupTime, setSelectedDeliveryPickupTime] = useState(new Date());

  const userUid = "mock-user-id";

  const handleBack = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleDeleteAddress = (addressId) => {
    Alert.alert(
      "Adresi sil",
      "Bu adresi silmek istiyor musunuz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          style: "destructive",
          onPress: () => {
            setAddresses((prev) => prev.filter((a) => a.id !== addressId));
            if (selectedAdress?.id === addressId) {
              setSelectedAdress("");
            }
            Alert.alert("Başarılı", "Adres silindi.");
          },
        },
      ]
    );
  };

  const handleEditAddress = (address) => {
    router.push({
      pathname: "/(tabs)/home/add",
      params: {
        edit: "1",
        id: String(address.id || ""),
        name: String(address.name || ""),
        houseNo: String(address.houseNo || ""),
        landmark: String(address.landmark || ""),
        postalCode: String(address.postalCode || ""),
      },
    });
  };

  const pickupTimeOptions = [
    { startTime: "6:30 AM", endTime: "9:00 AM" },
    { startTime: "9:00 AM", endTime: "11:30 AM" },
    { startTime: "5:00 PM", endTime: "7:30 PM" },
    { startTime: "7:30 PM", endTime: "10:00 PM" },
  ];

  useEffect(() => {
    moment.locale('tr');
    
    const mockAddresses = [
      {
        id: "address-1",
        name: "Ev Adresim",
        houseNo: "Kat 3 Daire 5",
        landmark: "Park yanı",
        postalCode: "34000"
      },
      {
        id: "address-2",
        name: "İş Adresim",
        houseNo: "Plaza Kat 8",
        landmark: "AVM karşısı",
        postalCode: "34100"
      }
    ];
    
    setAddresses(mockAddresses);
  }, []);

  const handleNext = () => {
    setStep((prevStep) => {
      if (prevStep === 1 && !selectedAdress) {
        Alert.alert("Adres seçin", "Lütfen ilerlemeden önce bir adres seçiniz.");
        return prevStep;
      }

      if (prevStep === 2 && !selectedTime) {
        Alert.alert("Saat seçin", "Lütfen ilerlemeden önce bir alım saati seçiniz.");
        return prevStep;
      }

      if (prevStep === 3 && !selectedDeliveryTime) {
        Alert.alert("Teslimat saati seçin", "Lütfen ilerlemeden önce bir teslimat saati seçiniz.");
        return prevStep;
      }

      const nextStep = prevStep + 1;

      if (nextStep == 5) {
        placeOrder();
      }

      return nextStep;
    });
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDateOnly = new Date(selectedDate);
      selectedDateOnly.setHours(0, 0, 0, 0);
      
      if (selectedDateOnly >= today) {
        setSelectedPickupDate(selectedDate);
      }
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const hour = selectedTime.getHours();
      
      if (hour >= 8 && hour <= 19) {
        const now = new Date();
        const selectedDateTime = new Date(selectedPickupDate);
        selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDateOnly = new Date(selectedPickupDate);
        selectedDateOnly.setHours(0, 0, 0, 0);
        
        if (selectedDateOnly.getTime() === today.getTime()) {
          const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
          if (selectedDateTime >= oneHourFromNow) {
            setSelectedPickupTime(selectedTime);
          } else {
            Alert.alert(
              "Geçersiz Saat", 
              "Alım saati en az 1 saat sonrasından olmalıdır.",
              [{ text: "Tamam" }]
            );
          }
        } else {
          setSelectedPickupTime(selectedTime);
        }
      } else {
        Alert.alert(
          "Geçersiz Saat", 
          "Alım saati 08:00 - 19:00 arasında olmalıdır.",
          [{ text: "Tamam" }]
        );
      }
    }
  };

  const formatTimeInTurkish = (time) => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const formattedMinute = minute.toString().padStart(2, '0');
    
    if (hour === 0) {
      return `00:${formattedMinute}`;
    } else if (hour < 12) {
      return `${hour}:${formattedMinute}`;
    } else if (hour === 12) {
      return `12:${formattedMinute}`;
    } else {
      return `${hour}:${formattedMinute}`;
    }
  };

  const handleDeliveryDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const pickupDate = new Date(selectedPickupDate);
      pickupDate.setHours(0, 0, 0, 0);
      const deliveryDateOnly = new Date(selectedDate);
      deliveryDateOnly.setHours(0, 0, 0, 0);
      
      if (deliveryDateOnly >= pickupDate) {
        setSelectedDeliveryPickupDate(selectedDate);
      }
    }
  };

  const handleDeliveryTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const hour = selectedTime.getHours();
      
      if (hour >= 8 && hour <= 19) {
        const pickupDateTime = new Date(selectedPickupDate);
        pickupDateTime.setHours(selectedPickupTime.getHours(), selectedPickupTime.getMinutes(), 0, 0);
        
        const deliveryDateTime = new Date(selectedDeliveryPickupDate);
        deliveryDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
        
        const pickupDateOnly = new Date(selectedPickupDate);
        pickupDateOnly.setHours(0, 0, 0, 0);
        const deliveryDateOnly = new Date(selectedDeliveryPickupDate);
        deliveryDateOnly.setHours(0, 0, 0, 0);
        
        if (pickupDateOnly.getTime() === deliveryDateOnly.getTime()) {
          const threeHoursAfterPickup = new Date(pickupDateTime.getTime() + 3 * 60 * 60 * 1000);
          if (deliveryDateTime >= threeHoursAfterPickup) {
            setSelectedDeliveryPickupTime(selectedTime);
          } else {
            Alert.alert(
              "Geçersiz Teslimat Saati", 
              "Teslimat saati alım saatinden en az 3 saat sonra olmalıdır.",
              [{ text: "Tamam" }]
            );
          }
        } else {
          setSelectedDeliveryPickupTime(selectedTime);
        }
      } else {
        Alert.alert(
          "Geçersiz Saat", 
          "Teslimat saati 08:00 - 19:00 arasında olmalıdır.",
          [{ text: "Tamam" }]
        );
      }
    }
  };

  const placeOrder = () => {
    dispatch(cleanCart());
    Alert.alert("Başarılı", "Siparişiniz alındı!");
    router.replace("/(tabs)/orders");
  };

  const getNextDays = () => {
    const nextDays = [];
    let startDate = moment().add(1, "days");

    if (moment(selectedDate).isSameOrBefore(moment().add(2, "days"), "day")) {
      startDate = moment(selectedDate).add(2, "days");
    }

    for (let i = 0; i < 5; i++) {
      const nextDate = moment(startDate).add(i, "days");
      nextDays.push(nextDate);
    }

    return nextDays;
  };

  const renderButtons = () => {
    const next6Days = getNextDays();

    return next6Days.map((date, index) => (
      <TouchableOpacity
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 6,
          width: 50,
          backgroundColor: date.isSame(deliveryDate, "day")
            ? "#0066b2"
            : "white",
          borderColor: date.isSame(deliveryDate, "day")
            ? "transparent"
            : "#0066b2",
          borderWidth: date.isSame(deliveryDate, "day") ? 0 : 1,
        }}
        onPress={() => setDeliveryDate(date)}
        key={index}
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 3,
            fontSize: 13,
            color: date.isSame(deliveryDate, "day") ? "white" : "black",
          }}
        >
          {date?.format("D")}
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 3,
            fontSize: 13,
            color: date.isSame(deliveryDate, "day") ? "white" : "black",
          }}
        >
          {date?.format("dddd")}
        </Text>
      </TouchableOpacity>
    ));
  };

  const renderTimeOptions = () => {
    return pickupTimeOptions.map((option, index) => {
      const startTime = moment(
        selectedDate.format("YYYY-MM-DD") + " " + option.startTime,
        "YYYY-MM-DD LT"
      );

      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSelectedDeliveryTime(option);
          }}
          style={{
            margin: 10,
            padding: 10,
            borderRadius: 5,
            backgroundColor:
              selectedDeliveryTime &&
              selectedDeliveryTime.startTime === option.startTime &&
              selectedDeliveryTime.endTime === option.endTime
                ? "#0066b2"
                : "white",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color:
                selectedDeliveryTime &&
                selectedDeliveryTime.startTime === option.startTime &&
                selectedDeliveryTime.endTime === option.endTime
                  ? "white"
                  : "black",
            }}
          >{`${option.startTime} - ${option.endTime}`}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* ÜST KONUM VE ZAMAN KISMI KALDIRILDI */}

      <View style={{ backgroundColor: Colors.background, flex: 1, padding: 10 }}>
        <ScrollView>
          {step == 1 && (
            <View>
              <Pressable
                onPress={() => router.push("/(tabs)/home/add")}
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <AntDesign name="plus" size={24} color={Colors.primaryDark} />
                <Text style={{ fontSize: 16, color: Colors.primaryDark, fontWeight: "600" }}>Adres ekle</Text>
              </Pressable>

              <View>
                {addresses?.map((item, index) => (
                  <Pressable
                    onPress={() => setSelectedAdress(item)}
                    key={index}
                    style={{
                      backgroundColor: Colors.surface,
                      padding: 10,
                      marginVertical: 10,
                      borderRadius: 15,
                      borderWidth: selectedAdress === item ? 2 : 1,
                      borderColor: Colors.primary,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Ionicons
                          name="location-outline"
                          size={24}
                          color={Colors.primaryDark}
                        />
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>
                          Adres
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Pressable onPress={() => handleEditAddress(item)}>
                          <Ionicons name="create-outline" size={22} color={Colors.primaryDark} />
                        </Pressable>
                        <Pressable onPress={() => handleDeleteAddress(item.id)}>
                          <Ionicons name="trash-outline" size={22} color="#DC2626" />
                        </Pressable>
                      </View>
                    </View>

                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 15,
                        fontWeight: "500",
                        width: "95%",
                      }}
                    >
                      {item?.houseNo} {item?.landmark}
                    </Text>
                    <Text
                      style={{
                        marginTop: 6,
                        color: "gray",
                        fontSize: 15,
                        fontWeight: "500",
                      }}
                    >
                      {item?.postalCode}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {step == 2 && (
            <View
              style={{
                marginTop: 10,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <EvilIcons name="location" size={24} color={Colors.primaryDark} />
                <Text style={{ fontSize: 16, color: Colors.text, fontWeight: "600" }}>Alım Zamanı</Text>
              </View>

              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={{
                  backgroundColor: Colors.primary,
                  padding: 15,
                  borderRadius: 10,
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Ionicons name="calendar-outline" size={24} color={Colors.onPrimary} />
                <Text style={{ color: Colors.onPrimary, fontWeight: "600", fontSize: 16 }}>
                  {selectedDate.format("DD MMMM YYYY, dddd")}
                </Text>
              </Pressable>

              {selectedTime && (
                <Pressable
                  onPress={() => setShowTimePicker(true)}
                  style={{
                    backgroundColor: Colors.primary,
                    padding: 15,
                    borderRadius: 10,
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <Ionicons name="time-outline" size={24} color={Colors.onPrimary} />
                  <Text style={{ color: Colors.onPrimary, fontWeight: "600", fontSize: 16 }}>
                    {selectedTime.startTime}
                  </Text>
                </Pressable>
              )}

              {!selectedTime && (
                <View style={{
                  backgroundColor: Colors.border,
                  padding: 15,
                  borderRadius: 10,
                  marginVertical: 10,
                  alignItems: "center",
                }}>
                  <Text style={{ color: Colors.mutedText, fontSize: 14 }}>
                    Önce tarih seçin, ardından saat seçimi yapılacak
                  </Text>
                </View>
              )}
            </View>
          )}

          {step == 3 && (
            <>
              <View
                style={{
                  backgroundColor: "white",
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                {selectedTime && (
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.onPrimary,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="time-outline" size={20} color={Colors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: Colors.onPrimary, fontSize: 14, fontWeight: "500" }}>
                        Seçilen Alım Zamanı
                      </Text>
                      <Text style={{ color: Colors.onPrimary, fontSize: 16, fontWeight: "600", marginTop: 2 }}>
                        {selectedDate.format("DD MMMM YYYY, dddd")} - {selectedTime.startTime}
                      </Text>
                    </View>
                  </View>
                )}

                {selectedDeliveryTime && (
                  <View
                    style={{
                      backgroundColor: "#4CAF50",
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "white", fontSize: 14, fontWeight: "500" }}>
                        Seçilen Teslimat Zamanı
                      </Text>
                      <Text style={{ color: "white", fontSize: 16, fontWeight: "600", marginTop: 2 }}>
                        {moment(deliveryDate).format("DD MMMM YYYY, dddd")} - {selectedDeliveryTime.startTime}
                      </Text>
                    </View>
                  </View>
                )}

                <View style={{ height: 20 }} />

                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}
                >
                  <EvilIcons name="location" size={24} color={Colors.primaryDark} />
                  <Text style={{ fontSize: 16, color: Colors.text, fontWeight: "600" }}>Teslimat Zamanı</Text>
                </View>

                <Pressable
                  onPress={() => setShowDeliveryDatePicker(true)}
                  style={{
                    backgroundColor: Colors.primary,
                    padding: 15,
                    borderRadius: 10,
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <Ionicons name="calendar-outline" size={24} color={Colors.onPrimary} />
                  <Text style={{ color: Colors.onPrimary, fontWeight: "600", fontSize: 16 }}>
                    {moment(deliveryDate).format("DD MMMM YYYY, dddd")}
                  </Text>
                </Pressable>

                {selectedDeliveryTime && (
                  <Pressable
                    onPress={() => setShowDeliveryTimePicker(true)}
                    style={{
                      backgroundColor: Colors.primary,
                      padding: 15,
                      borderRadius: 10,
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    <Ionicons name="time-outline" size={24} color={Colors.onPrimary} />
                    <Text style={{ color: Colors.onPrimary, fontWeight: "600", fontSize: 16 }}>
                      {selectedDeliveryTime.startTime}
                    </Text>
                  </Pressable>
                )}

                {!selectedDeliveryTime && (
                  <View style={{
                    backgroundColor: Colors.border,
                    padding: 15,
                    borderRadius: 10,
                    marginVertical: 10,
                    alignItems: "center",
                  }}>
                    <Text style={{ color: Colors.mutedText, fontSize: 14 }}>
                      Önce teslimat tarihi seçin, ardından saat seçimi yapılacak
                    </Text>
                  </View>
                )}
              </View>
            </>
          )}

          {step == 4 && (
            <View
              style={{
                marginTop: 10,
                backgroundColor: "white",
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View style={{ 
                padding: 20, 
                borderBottomWidth: 1, 
                borderBottomColor: '#f0f0f0',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
              }}>
                <Ionicons name="document-text-outline" size={24} color={Colors.primary} />
                <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.text }}>
                  Sipariş Özeti
                </Text>
              </View>

              <View style={{ padding: 15 }}>
                {cart && cart.length > 0 ? (
                  cart.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 15,
                        borderBottomWidth: index < cart.length - 1 ? 1 : 0,
                        borderBottomColor: '#f0f0f0',
                      }}
                    >
                      <Image
                        style={{ 
                          width: 60, 
                          height: 60, 
                          borderRadius: 10,
                          backgroundColor: '#f5f5f5'
                        }}
                        source={{ uri: item?.item?.image }}
                      />

                      <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text style={{ 
                          fontSize: 16, 
                          fontWeight: "600", 
                          color: Colors.text,
                          marginBottom: 5
                        }}>
                          {item?.item.name}
                        </Text>
                        <Text style={{ 
                          fontSize: 14, 
                          color: Colors.mutedText,
                          marginBottom: 5
                        }}>
                          Adet: {item?.item.quantity}
                        </Text>
                        <Text style={{ 
                          fontSize: 16, 
                          fontWeight: "600", 
                          color: Colors.primary
                        }}>
                          ₺{(item?.item.price * item?.item.quantity).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 15,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 10,
                    padding: 15,
                  }}>
                    <View style={{
                      width: 60,
                      height: 60,
                      borderRadius: 10,
                      backgroundColor: Colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Ionicons name="shirt-outline" size={30} color="white" />
                    </View>

                    <View style={{ flex: 1, marginLeft: 15 }}>
                      <Text style={{ 
                        fontSize: 16, 
                        fontWeight: "600", 
                        color: Colors.text,
                        marginBottom: 5
                      }}>
                        Hızlı Sipariş - Kıyafet Yıkama
                      </Text>
                      <Text style={{ 
                        fontSize: 14, 
                        color: Colors.mutedText,
                        marginBottom: 5
                      }}>
                        Tüm kıyafetleriniz için tahmini fiyat
                      </Text>
                      <Text style={{ 
                        fontSize: 16, 
                        fontWeight: "600", 
                        color: Colors.primary
                      }}>
                        ₺{estimatedQuickOrderPrice.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <View
                style={{
                  backgroundColor: Colors.primary,
                  padding: 20,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ color: Colors.onPrimary, fontWeight: "500", fontSize: 16 }}>
                    {cart && cart.length > 0 ? 'Ürün Tutarı' : 'Yıkama Ücreti'}
                  </Text>
                  <Text style={{ color: Colors.onPrimary, fontWeight: "600", fontSize: 16 }}>
                    ₺{cart && cart.length > 0 ? (total?.toFixed(2) || '0.00') : estimatedQuickOrderPrice.toFixed(2)}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ color: Colors.onPrimary, fontWeight: "500", fontSize: 16 }}>
                    Teslimat Ücreti
                  </Text>
                  <Text style={{ color: Colors.onPrimary, fontWeight: "600", fontSize: 16 }}>
                    ₺50.00
                  </Text>
                </View>

                {cart && cart.length === 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 15,
                    }}
                  >
                    <Text style={{ color: Colors.onPrimary, fontWeight: "500", fontSize: 14 }}>
                      *Hızlı sipariş tahmini fiyatıdır
                    </Text>
                    <Text style={{ color: Colors.onPrimary, fontWeight: "500", fontSize: 14 }}>
                      +%20
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    height: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    marginVertical: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: Colors.onPrimary, fontWeight: "700", fontSize: 18 }}>
                    Toplam Tutar
                  </Text>
                  <Text style={{ color: Colors.onPrimary, fontWeight: "700", fontSize: 18 }}>
                    ₺{cart && cart.length > 0 ? 
                      ((total || 0) + 50).toFixed(2) : 
                      (estimatedQuickOrderPrice + 50).toFixed(2)
                    }
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      <View
        style={{
          backgroundColor: "white",
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          marginTop: "auto",
        }}
      >
        <Pressable
          onPress={() => {
            if (step === 1) {
              router.replace("/(tabs)/home");
            } else {
              handleBack();
            }
          }}
          style={{
            backgroundColor: Colors.border,
            padding: 15,
            borderRadius: 10,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "500" }}>Geri</Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          style={{
            backgroundColor: Colors.primary,
            padding: 15,
            borderRadius: 10,
            flex: 1,
          }}
        >
          <Text
            style={{ textAlign: "center", color: Colors.onPrimary, fontWeight: "500" }}
          >
            {step == 4 ? "Siparişi Ver" : "İleri"}
          </Text>
        </Pressable>
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Alım Tarihi Seçin</Text>
              <Pressable
                onPress={() => setShowDatePicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </Pressable>
            </View>
            <DateTimePicker
              value={selectedPickupDate}
              mode="date"
              display="spinner"
              minimumDate={new Date()}
              onChange={handleDateChange}
              style={styles.datePicker}
            />
            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setShowDatePicker(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const selectedDateOnly = new Date(selectedPickupDate);
                  selectedDateOnly.setHours(0, 0, 0, 0);
                  
                  if (selectedDateOnly >= today) {
                    setSelectedPickupDate(selectedPickupDate);
                    setSelectedDate(moment(selectedPickupDate));
                    setShowDatePicker(false);
                    setShowTimePicker(true);
                  } else {
                    Alert.alert(
                      "Geçersiz Tarih", 
                      "Alım tarihi bugünden önce olamaz.",
                      [{ text: "Tamam" }]
                    );
                  }
                }}
                style={[styles.modalButton, styles.confirmButton]}
              >
                <Text style={styles.confirmButtonText}>Seç</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Alım Saati Seçin</Text>
              <Pressable
                onPress={() => setShowTimePicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </Pressable>
            </View>
            <DateTimePicker
              value={selectedPickupTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
              style={styles.datePicker}
            />
            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setShowTimePicker(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  const hour = selectedPickupTime.getHours();
                  
                  if (hour >= 8 && hour <= 19) {
                    const now = new Date();
                    const selectedDateTime = new Date(selectedPickupDate);
                    selectedDateTime.setHours(selectedPickupTime.getHours(), selectedPickupTime.getMinutes(), 0, 0);
                    
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const selectedDateOnly = new Date(selectedPickupDate);
                    selectedDateOnly.setHours(0, 0, 0, 0);
                    
                    if (selectedDateOnly.getTime() === today.getTime()) {
                      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
                      if (selectedDateTime >= oneHourFromNow) {
                        const timeString = formatTimeInTurkish(selectedPickupTime);
                        
                        const timeSlot = {
                          startTime: timeString,
                          endTime: timeString
                        };
                        setSelectedTime(timeSlot);
                        setShowTimePicker(false);
                      } else {
                        Alert.alert(
                          "Geçersiz Saat", 
                          "Alım saati en az 1 saat sonrasından olmalıdır.",
                          [{ text: "Tamam" }]
                        );
                      }
                    } else {
                      const timeString = formatTimeInTurkish(selectedPickupTime);
                      
                      const timeSlot = {
                        startTime: timeString,
                        endTime: timeString
                      };
                      setSelectedTime(timeSlot);
                      setShowTimePicker(false);
                    }
                  } else {
                    Alert.alert(
                      "Geçersiz Saat", 
                      "Alım saati 08:00 - 19:00 arasında olmalıdır.",
                      [{ text: "Tamam" }]
                    );
                  }
                }}
                style={[styles.modalButton, styles.confirmButton]}
              >
                <Text style={styles.confirmButtonText}>Seç</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delivery Date Picker Modal */}
      <Modal
        visible={showDeliveryDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeliveryDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Teslimat Tarihi Seçin</Text>
              <Pressable
                onPress={() => setShowDeliveryDatePicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </Pressable>
            </View>
            <DateTimePicker
              value={selectedDeliveryPickupDate}
              mode="date"
              display="spinner"
              minimumDate={selectedPickupDate}
              onChange={handleDeliveryDateChange}
              style={styles.datePicker}
            />
            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setShowDeliveryDatePicker(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  const pickupDate = new Date(selectedPickupDate);
                  pickupDate.setHours(0, 0, 0, 0);
                  const deliveryDateOnly = new Date(selectedDeliveryPickupDate);
                  deliveryDateOnly.setHours(0, 0, 0, 0);
                  
                  if (deliveryDateOnly >= pickupDate) {
                    setDeliveryDate(moment(selectedDeliveryPickupDate));
                    setShowDeliveryDatePicker(false);
                    setShowDeliveryTimePicker(true);
                  } else {
                    Alert.alert(
                      "Geçersiz Teslimat Tarihi", 
                      "Teslimat tarihi alım tarihinden önce olamaz.",
                      [{ text: "Tamam" }]
                    );
                  }
                }}
                style={[styles.modalButton, styles.confirmButton]}
              >
                <Text style={styles.confirmButtonText}>Seç</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delivery Time Picker Modal */}
      <Modal
        visible={showDeliveryTimePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeliveryTimePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Teslimat Saati Seçin</Text>
              <Pressable
                onPress={() => setShowDeliveryTimePicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </Pressable>
            </View>
            <DateTimePicker
              value={selectedDeliveryPickupTime}
              mode="time"
              display="spinner"
              onChange={handleDeliveryTimeChange}
              style={styles.datePicker}
            />
            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setShowDeliveryTimePicker(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  const hour = selectedDeliveryPickupTime.getHours();
                  
                  if (hour >= 8 && hour <= 19) {
                    const pickupDateTime = new Date(selectedPickupDate);
                    pickupDateTime.setHours(selectedPickupTime.getHours(), selectedPickupTime.getMinutes(), 0, 0);
                    
                    const deliveryDateTime = new Date(selectedDeliveryPickupDate);
                    deliveryDateTime.setHours(selectedDeliveryPickupTime.getHours(), selectedDeliveryPickupTime.getMinutes(), 0, 0);
                    
                    const pickupDateOnly = new Date(selectedPickupDate);
                    pickupDateOnly.setHours(0, 0, 0, 0);
                    const deliveryDateOnly = new Date(selectedDeliveryPickupDate);
                    deliveryDateOnly.setHours(0, 0, 0, 0);
                    
                    if (pickupDateOnly.getTime() === deliveryDateOnly.getTime()) {
                      const threeHoursAfterPickup = new Date(pickupDateTime.getTime() + 3 * 60 * 60 * 1000);
                      if (deliveryDateTime >= threeHoursAfterPickup) {
                        const timeString = formatTimeInTurkish(selectedDeliveryPickupTime);
                        
                        const timeSlot = {
                          startTime: timeString,
                          endTime: timeString
                        };
                        setSelectedDeliveryTime(timeSlot);
                        setShowDeliveryTimePicker(false);
                      } else {
                        Alert.alert(
                          "Geçersiz Teslimat Saati", 
                          "Teslimat saati alım saatinden en az 3 saat sonra olmalıdır.",
                          [{ text: "Tamam" }]
                        );
                      }
                    } else {
                      const timeString = formatTimeInTurkish(selectedDeliveryPickupTime);
                      
                      const timeSlot = {
                        startTime: timeString,
                        endTime: timeString
                      };
                      setSelectedDeliveryTime(timeSlot);
                      setShowDeliveryTimePicker(false);
                    }
                  } else {
                    Alert.alert(
                      "Geçersiz Saat", 
                      "Teslimat saati 08:00 - 19:00 arasında olmalıdır.",
                      [{ text: "Tamam" }]
                    );
                  }
                }}
                style={[styles.modalButton, styles.confirmButton]}
              >
                <Text style={styles.confirmButtonText}>Seç</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    padding: 5,
  },
  datePicker: {
    height: 200,
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  confirmButtonText: {
    color: Colors.onPrimary,
    fontWeight: '600',
    fontSize: 16,
  },
});