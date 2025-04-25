import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "../../components/BottomNavigation";

const DRAWER_WIDTH = Dimensions.get("window").width * 0.7;
//Função Membrs Superiores
const upperBodyParts = [
  {
    id: "1",
    name: "Peito",
    image: require("../../assets/peito.jpg"),
    color: "#FF6B6B",
  },
  {
    id: "2",
    name: "Costas",
    image: require("../../assets/costas.jpg"),
    color: "#4ECDC4",
  },
  {
    id: "3",
    name: "Bíceps",
    image: require("../../assets/biceps.jpg"),
    color: "#96CEB4",
  },
  {
    id: "4",
    name: "Ombro",
    image: require("../../assets/ombro.jpg"),
    color: "#FFEEAD",
  },
  {
    id: "5",
    name: "Abdômen",
    image: require("../../assets/abdomen.jpg"),
    color: "#D4A5A5",
  },
];
//Função Membros Inferiores
const lowerBodyParts = [
  {
    id: "6",
    name: "Quadríceps",
    image: require("../../assets/quadriceps.jpg"),
    color: "#45B7D1",
  },
  {
    id: "7",
    name: "Posterior",
    image: require("../../assets/posterior.jpg"),
    color: "#9B59B6",
  },
  {
    id: "8",
    name: "Glúteos",
    image: require("../../assets/gluteos.jpg"),
    color: "#E74C3C",
  },
  {
    id: "9",
    name: "Panturrilha",
    image: require("../../assets/panturrilha.jpg"),
    color: "#F1C40F",
  },
];

export default function Home({ navigation }: { navigation: any }) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");

  //Função para Mostrar Nome do Usuário
  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Erro ao buscar usuário logado:", userError);
        return;
      }

      if (user) {
        const { data, error } = await supabase
          .from("usuario")
          .select("nome, email")
          .eq("email", user.email)
          .single();

        if (!error && data) {
          setUsername(data.nome);
          setEmail(data.email);
        } else {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, []);
  //Função para Abrir Drawer
  const openDrawer = () => {
    setIsDrawerVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  //Função para fechar Drawer
  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerVisible(false);
    });
  };
  //Ícones no Drawer
  const menuItems = [
    {
      icon: (
        <Ionicons
          name="person-circle-outline"
          size={24}
          color={"black"}
        ></Ionicons>
      ),
      label: "Meu Perfil",
      onPress: () => navigation.navigate("Profile"),
    },

    {
      icon: <Ionicons name="stats-chart" size={24} color={"black"}></Ionicons>,
      label: "Estatísticas",
      onPress: () => navigation.navigate("Statistics"),
    },
    {
      icon: (
        <Ionicons
          name="help-circle-outline"
          size={24}
          color={"black"}
        ></Ionicons>
      ),
      label: "Ajuda",
      onPress: () => navigation.navigate("Help"),
    },
    {
      icon: (
        <Ionicons name="settings-outline" size={24} color={"black"}></Ionicons>
      ),
      label: "Configurações",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      icon: (
        <Ionicons name="log-out-outline" size={24} color={"black"}></Ionicons>
      ),
      label: "Sair",
      onPress: () => navigation.navigate("SignIn"),
    },
  ];

  //Cards de grupos Musculares
  const renderBodyPart = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.bodyPartCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate("Exercises", { bodyPart: item.name })}
    >
      {item.image ? (
        <View style={styles.imageCard}>
          <Image source={item.image} style={styles.bodyPartImage} />
          <Text style={styles.imageCardLabel}>{item.name}</Text>
        </View>
      ) : (
        <View style={styles.emojiCard}>
          <Text style={styles.bodyPartEmoji}>{item.emoji}</Text>
          <Text style={styles.bodyPartLabel}>{item.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#007AFF" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>
                Olá, {userName || "Usuário"} 👋!
              </Text>
              <Text style={styles.subGreeting}>
                O que você vai treinar hoje?
              </Text>
            </View>
            //Aperte para abrir o Drawer//
            <TouchableOpacity style={styles.profileButton} onPress={openDrawer}>
              <View style={styles.profileImageContainer}>
                <View style={styles.profileImage}>
                  <Text style={styles.avatarEmoji}>
                    {userName ? userName.charAt(0).toUpperCase() : "?"}
                  </Text>
                </View>
                <View style={styles.profileBadge} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        //Grupos Musculares Inferiores
        <View style={styles.bodyPartSelector}>
          <Text style={styles.sectionTitle}>Membros Superiores</Text>
          <FlatList
            data={upperBodyParts}
            renderItem={renderBodyPart}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bodyPartList}
          />
        </View>
        //Grupos Musculares Superiores
        <View style={styles.bodyPartSelector}>
          <Text style={styles.sectionTitle}>Membros Inferiores</Text>
          <FlatList
            data={lowerBodyParts}
            renderItem={renderBodyPart}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bodyPartList}
          />
        </View>
        //Sessão para personalizar treino
        <View style={styles.workoutSection}>
          <Text style={styles.sectionTitle}>Treino Personalizado</Text>
          <TouchableOpacity
            style={styles.customWorkoutCard}
            onPress={() => navigation.navigate("CustomWorkout")}
          >
            <View style={styles.customWorkoutContent}>
              <View style={styles.customWorkoutHeader}>
                <Ionicons name="fitness" size={24} color="#007AFF" />
                <Text style={styles.customWorkoutTitle}>Monte seu treino</Text>
              </View>
              <Text style={styles.customWorkoutDescription}>
                Crie um treino personalizado com base nos seus objetivos
              </Text>
              <View style={styles.customWorkoutFeatures}>
                <View style={styles.featureItem}>
                  <Ionicons name="barbell-outline" size={20} color="#666" />
                  <Text style={styles.featureText}>Escolha exercícios</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate("CustomWorkout")}
            >
              <Text style={styles.createButtonText}>Criar Treino</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" top={1.5} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigation currentRoute="Home" />
      //Quando o drawer está aberto
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
            //Círculo do perfil
            <View style={styles.drawerHeader}>
              <View style={styles.drawerProfileImage}>
                <Text style={styles.drawerProfile}>
                  {userName ? userName.charAt(0).toUpperCase() : "?"}
                </Text>
              </View>
              <Text style={styles.drawerUsername}>{userName || "Usuário"}</Text>
              <Text style={styles.drawerEmail}>
                {email || "email@email.com"}
              </Text>
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
    marginBottom: 60,
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
  subGreeting: {
    fontWeight: "600",
    fontSize: 16,
    color: "#666",
    marginTop: 10,
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
    color: "#fff",
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
  drawerProfile: {
    fontSize: 40,
    color: "#fff",
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
  bodyPartSelector: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  bodyPartList: {
    paddingRight: 20,
  },
  bodyPartCard: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  imageCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyPartImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageCardLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    padding: 5,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  bodyPartEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  bodyPartLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  workoutSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  customWorkoutCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  customWorkoutContent: {
    flex: 1,
  },
  customWorkoutHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  customWorkoutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  customWorkoutDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  customWorkoutFeatures: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  createButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
});
