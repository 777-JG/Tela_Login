import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";

const DRAWER_WIDTH = Dimensions.get("window").width * 0.7;

export default function Home({ navigation }: { navigation: any }) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

  const openDrawer = () => {
    setIsDrawerVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerVisible(false);
    });
  };

  const menuItems = [
    {
      icon: "👤",
      label: "Meu Perfil",
      onPress: () => navigation.navigate("Profile"),
    },

    {
      icon: "📊",
      label: "Estatísticas",
      onPress: () => navigation.navigate("Statistics"),
    },
    { icon: "❓", label: "Ajuda", onPress: () => navigation.navigate("Help") },
    {
      icon: "⚙️",
      label: "Configurações",
      onPress: () => navigation.navigate("Settings"),
    },
    { icon: "🚪", label: "Sair", onPress: () => navigation.navigate("SignIn") },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Olá! 👋</Text>
              <Text style={styles.subGreeting}>
                Pronto para mais um dia de evolução?
              </Text>
            </View>

            <TouchableOpacity style={styles.profileButton} onPress={openDrawer}>
              <View style={styles.profileImageContainer}>
                <View style={styles.profileImage}>
                  <Text style={styles.avatarEmoji}>🏋️</Text>
                </View>
                <View style={styles.profileBadge} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isDrawerVisible}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDrawer}
        >
          <Animated.View
            style={[
              styles.drawer,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <View style={styles.drawerProfileImage}>
                <Text style={styles.drawerAvatarEmoji}>🏋️</Text>
              </View>
              <Text style={styles.drawerUsername}>Usuário</Text>
              <Text style={styles.drawerEmail}>usuario@email.com</Text>
            </View>

            <View style={styles.drawerContent}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.drawerItem}
                  onPress={() => {
                    closeDrawer();
                    item.onPress();
                  }}
                >
                  <Text style={styles.drawerItemIcon}>{item.icon}</Text>
                  <Text style={styles.drawerItemLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subGreeting: {
    fontWeight: "600",
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  profileButton: {
    padding: 5,
  },
  profileImageContainer: {
    position: "relative",
    width: 50,
    height: 50,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: {
    fontSize: 24,
  },
  profileBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#f5f5f5",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    marginTop: 5,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    position: "absolute",
    right: 0,
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  drawerHeader: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  drawerProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  drawerAvatarEmoji: {
    fontSize: 40,
  },
  drawerUsername: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  drawerEmail: {
    fontSize: 14,
    color: "#666",
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 25,
  },
  drawerItemIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  drawerItemLabel: {
    fontSize: 16,
    color: "#333",
  },
});
