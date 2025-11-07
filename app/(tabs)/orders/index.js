import { StyleSheet, Text, View, Pressable, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";
import moment from "moment";
import "moment/locale/tr";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set moment locale to Turkish
    moment.locale('tr');
    
    // Mock orders data - Firebase olmadan
    const mockOrders = [
      {
        id: "order-1",
        address: {
          houseNo: "Kat 3 Daire 5",
          landmark: "Park yanı"
        },
        pickuptime: "09:00 - 11:00",
        deliveryTime: "15:00 - 17:00",
        createdAt: new Date(),
        status: "Hazırlanıyor"
      },
      {
        id: "order-2",
        address: {
          houseNo: "Kat 1 Daire 2",
          landmark: "Çarşı karşısı"
        },
        pickuptime: "14:00 - 16:00",
        deliveryTime: "18:00 - 20:00",
        createdAt: new Date(Date.now() - 86400000), // 1 gün önce
        status: "Teslim Edildi"
      }
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const getOrderStatus = (order) => {
    return order.status || "Hazırlanıyor";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hazırlanıyor":
        return "#FFA500";
      case "Yolda":
        return "#2196F3";
      case "Teslim Edildi":
        return "#4CAF50";
      case "İptal":
        return "#F44336";
      default:
        return Colors.primary;
    }
  };

  const handleDeleteOrder = (orderId) => {
    Alert.alert(
      "Siparişi Sil",
      "Bu siparişi silmek istediğinizden emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          style: "destructive",
          onPress: () => {
            setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            Alert.alert("Başarılı", "Sipariş silindi.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Ionicons name="receipt-outline" size={28} color={Colors.onPrimary} />
            <Text style={styles.headerTitle}>Siparişlerim</Text>
          </View>

        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Ionicons name="refresh" size={32} color={Colors.primary} />
            <Text style={styles.loadingText}>Siparişler yükleniyor...</Text>
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color={Colors.mutedText} />
            <Text style={styles.emptyTitle}>Henüz siparişiniz yok</Text>
            <Text style={styles.emptySubtitle}>
              İlk siparişinizi vermek için ana sayfaya gidin
            </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.map((order) => {
              const status = getOrderStatus(order);
              const statusColor = getStatusColor(status);
              
              return (
                <Pressable key={order.id} style={styles.orderCard}>
                  {/* Order Header */}
                  <View style={styles.orderHeader}>
                    <View style={styles.orderInfo}>
                      <Text style={styles.orderNumber}>
                        Sipariş #{order.id.slice(-8).toUpperCase()}
                      </Text>
                      <Text style={styles.orderDate}>
                        {moment(order.createdAt).format("DD MMMM YYYY, HH:mm")}
                      </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                      <Text style={styles.statusText}>{status}</Text>
                    </View>
                  </View>

                  {/* Order Details */}
                  <View style={styles.orderDetails}>
                    <View style={styles.detailRow}>
                      <Ionicons name="location-outline" size={20} color={Colors.primary} />
                      <Text style={styles.detailText}>
                        {order?.address?.houseNo} {order?.address?.landmark}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Ionicons name="time-outline" size={20} color={Colors.primary} />
                      <Text style={styles.detailText}>
                        Alım: {order?.pickuptime || "Planlanıyor"}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Ionicons name="checkmark-circle-outline" size={20} color={Colors.primary} />
                      <Text style={styles.detailText}>
                        Teslimat: {order?.deliveryTime || "Planlanıyor"}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Ionicons name="card-outline" size={20} color={Colors.primary} />
                      <Text style={styles.detailText}>Kapıda Ödeme</Text>
                    </View>
                  </View>

                  {/* Order Actions */}
                  <View style={styles.orderActions}>
                    <Pressable style={styles.actionButton}>
                      <Ionicons name="star-outline" size={20} color={Colors.primary} />
                      <Text style={styles.actionText}>Değerlendir</Text>
                    </Pressable>
                    
                    <Pressable 
                      style={[styles.actionButton, styles.deleteActionButton]}
                      onPress={() => handleDeleteOrder(order.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color="#F44336" />
                      <Text style={[styles.actionText, styles.deleteActionText]}>Sil</Text>
                    </Pressable>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
    padding: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.mutedText,
    textAlign: 'center',
    lineHeight: 24,
  },
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  orderHeader: {
    backgroundColor: Colors.primary,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onPrimary,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  orderDetails: {
    padding: 16,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
    lineHeight: 20,
  },
  orderActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  deleteActionButton: {
    backgroundColor: '#FFF5F5',
    borderColor: '#F44336',
  },
  deleteActionText: {
    color: '#F44336',
  },
});