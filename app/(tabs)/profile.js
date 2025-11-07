import { StyleSheet, Text, View, Pressable, ScrollView, Alert, TextInput, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import Colors from "../../constants/colors";
import { useRouter } from "expo-router";

export default function Profile(){
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempPhone, setTempPhone] = useState("");

  useEffect(() => {
    // Mock user data - Firebase olmadan
    setUser({
      id: "mock-user-id",
      name: "Test Kullanıcı",
      email: "test@example.com",
      phone: "+90 555 123 4567",
      address: "Test Adres"
    });
    setLoading(false);
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Hesabınızdan çıkış yapmak istediğinizden emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Çıkış Yap",
          style: "destructive",
          onPress: () => {
            router.replace("/(authenticate)/login");
          },
        },
      ]
    );
  };

  const handleEditName = () => {
    setTempName(user?.name || "");
    setEditingName(true);
  };

  const handleEditPhone = () => {
    setTempPhone(user?.phone || "");
    setEditingPhone(true);
  };

  const saveName = () => {
    setUser(prev => ({ ...prev, name: tempName }));
    setEditingName(false);
    Alert.alert("Başarılı", "Ad soyad güncellendi.");
  };

  const savePhone = () => {
    setUser(prev => ({ ...prev, phone: tempPhone }));
    setEditingPhone(false);
    Alert.alert("Başarılı", "Telefon numarası güncellendi.");
  };

  const handleSettings = () => {
    Alert.alert("Bilgi", "Ayarlar sayfası yakında eklenecek.");
  };

  const handleHelp = () => {
    Alert.alert(
      "Yardım & Destek",
      "Çamaşırhanemiz ile iletişime geçmek için:\n\n📞 Telefon: +90 212 555 0123",
      [
        { text: "Kapat", style: "cancel" },
        { 
          text: "Ara", 
          onPress: async () => {
            try {
              const phoneNumber = "tel:+902125550123";
              const canOpen = await Linking.canOpenURL(phoneNumber);
              if (canOpen) {
                await Linking.openURL(phoneNumber);
              } else {
                Alert.alert("Hata", "Telefon uygulaması açılamadı.");
              }
            } catch (error) {
              Alert.alert("Hata", "Arama yapılırken bir sorun oluştu.");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="refresh" size={32} color={Colors.primary} />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Info Card */}
          <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons name="account" size={40} color={Colors.primary} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || "Kullanıcı"}</Text>
              <Text style={styles.userEmail}>{user?.email || "E-posta yok"}</Text>
              <Text style={styles.userPhone}>{user?.phone || "Telefon yok"}</Text>
            </View>
          </View>

          {/* Profile Information Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Profil Bilgileri</Text>
            
            <View style={styles.infoCard}>
              {/* Ad Soyad */}
              <Pressable style={styles.infoRow} onPress={handleEditName}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="person-outline" size={20} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Ad Soyad</Text>
                  {editingName ? (
                    <TextInput
                      style={styles.textInput}
                      value={tempName}
                      onChangeText={setTempName}
                      placeholder="Ad soyadınızı girin"
                      autoFocus
                    />
                  ) : (
                    <Text style={styles.infoValue}>{user?.name || "Belirtilmemiş"}</Text>
                  )}
                </View>
                {editingName && (
                  <Pressable style={styles.saveButton} onPress={saveName}>
                    <Ionicons name="checkmark" size={18} color="white" />
                  </Pressable>
                )}
              </Pressable>

              <View style={styles.divider} />

              {/* E-posta */}
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="mail-outline" size={20} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>E-posta</Text>
                  <Text style={styles.infoValue}>{user?.email || "Belirtilmemiş"}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Telefon */}
              <Pressable style={styles.infoRow} onPress={handleEditPhone}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="call-outline" size={20} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Telefon</Text>
                  {editingPhone ? (
                    <TextInput
                      style={styles.textInput}
                      value={tempPhone}
                      onChangeText={setTempPhone}
                      placeholder="Telefon numaranızı girin"
                      keyboardType="phone-pad"
                      autoFocus
                    />
                  ) : (
                    <Text style={styles.infoValue}>{user?.phone || "Belirtilmemiş"}</Text>
                  )}
                </View>
                {editingPhone && (
                  <Pressable style={styles.saveButton} onPress={savePhone}>
                    <Ionicons name="checkmark" size={18} color="white" />
                  </Pressable>
                )}
              </Pressable>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            <Pressable style={styles.menuItem} onPress={() => router.push("/(tabs)/orders")}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="receipt-outline" size={24} color={Colors.primary} />
                <Text style={styles.menuItemText}>Siparişlerim</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.mutedText} />
            </Pressable>

            <Pressable style={styles.menuItem} onPress={() => router.push("/(tabs)/basket")}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="basket-outline" size={24} color={Colors.primary} />
                <Text style={styles.menuItemText}>Sepetim</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.mutedText} />
            </Pressable>

            <Pressable style={styles.menuItem} onPress={handleSettings}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="settings-outline" size={24} color={Colors.primary} />
                <Text style={styles.menuItemText}>Ayarlar</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.mutedText} />
            </Pressable>

            <Pressable style={styles.menuItem} onPress={handleHelp}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="help-circle-outline" size={24} color={Colors.primary} />
                <Text style={styles.menuItemText}>Yardım & Destek</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.mutedText} />
            </Pressable>

            <Pressable style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="log-out-outline" size={24} color="#F44336" />
                <Text style={[styles.menuItemText, styles.logoutText]}>Çıkış Yap</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.mutedText} />
            </Pressable>
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appVersion}>WashHub v1.0.0</Text>
            <Text style={styles.appDescription}>
              Çamaşırlarınızı güvenle teslim edin
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.mutedText,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  userCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.mutedText,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: Colors.mutedText,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.mutedText,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  textInput: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingVertical: 4,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  logoutText: {
    color: '#F44336',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.mutedText,
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 12,
    color: Colors.mutedText,
    textAlign: 'center',
  },
});