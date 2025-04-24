import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import BottomNavigation from "../../components/BottomNavigation";

export default function Favorites({ navigation }: { navigation: any }) {
  const [favoriteWorkouts, setFavoriteWorkouts] = useState([]);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    fetchUserData();
    fetchFavorites();
  }, []);

  const fetchUserData = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Erro ao buscar usuário:", userError);
      return;
    }

    if (user) {
      const { data, error } = await supabase
        .from("usuario")
        .select("nome")
        .eq("email", user.email)
        .single();

      if (!error && data) {
        setUsername(data.nome);
      }
    }
  };

  const fetchFavorites = async () => {
    // Implementar busca de favoritos no banco de dados
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#007AFF" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Favoritos</Text>
          <Text style={styles.headerSubtitle}>
            Seus treinos e exercícios salvos
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Seção de Treinos Favoritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Treinos Favoritos</Text>
          {favoriteWorkouts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="star-outline" size={48} color="#666" />
              <Text style={styles.emptyStateText}>
                Você ainda não tem treinos favoritos
              </Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate("Workouts")}
              >
                <Text style={styles.emptyStateButtonText}>
                  Explorar Treinos
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text>Lista de favoritos aqui</Text>
          )}
        </View>
      </ScrollView>

      <BottomNavigation currentRoute="Favorites" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  content: {
    flex: 1,
    marginBottom: 60,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  emptyStateButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  emptyStateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
