import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import BottomNavigation from "../../components/BottomNavigation";

type Exercicio = {
  id: number;
  nome: string;
  grupo_muscular: string;
  // outros campos se necessário
};

export default function Favorites({ navigation }: { navigation: any }) {
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<Exercicio[]>([]);
  const [userName, setUsername] = useState("");
  const insets = useSafeAreaInsets();

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
        .maybeSingle();

      if (!error && data) {
        setUsername(data.nome);
      }
    }
  };

  const fetchFavorites = async () => {
    // 1. Buscar usuário autenticado
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // 2. Buscar o id inteiro do usuário na tabela usuario
    const { data: usuarioData, error: usuarioError } = await supabase
      .from("usuario")
      .select("id")
      .eq("email", user.email)
      .maybeSingle();

    if (usuarioError || !usuarioData) {
      console.error("Erro ao buscar usuário na tabela usuario:", usuarioError);
      return;
    }

    const usuarioIdInt = usuarioData.id;

    // 3. Buscar todos os favoritos desse usuário
    const { data: favoritos, error: favoritosError } = await supabase
      .from("favorito")
      .select("exercicio_id")
      .eq("usuario_id", usuarioIdInt);

    if (favoritosError) {
      console.error("Erro ao buscar favoritos:", favoritosError);
      return;
    }

    if (!favoritos || favoritos.length === 0) {
      setFavoriteWorkouts([]);
      return;
    }

    // 4. Buscar os dados dos exercícios favoritados
    const exercicioIds = favoritos.map((fav) => fav.exercicio_id);

    const { data: exercicios, error: exerciciosError } = await supabase
      .from("exercicio")
      .select("*")
      .in("id", exercicioIds);

    if (exerciciosError) {
      console.error("Erro ao buscar exercícios favoritos:", exerciciosError);
      return;
    }

    setFavoriteWorkouts(exercicios);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.statusBarContainer, { height: insets.top }]}>
        <StatusBar style="light" />
      </View>

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View>
          <Text style={styles.headerTitle}>Favoritos</Text>
          <Text style={styles.headerSubtitle}>
            Seus treinos e exercícios salvos
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercícios Favoritos</Text>
          {favoriteWorkouts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="star-outline" size={48} color="#666" />
              <Text style={styles.emptyStateText}>
                Você ainda não tem treinos favoritos
              </Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate("Exercises")}
              >
                <Text style={styles.emptyStateButtonText}>
                  Explorar Exercícios
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={favoriteWorkouts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("ExerciseDetail", { exercise: item })
                  }
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {item.nome}
                  </Text>
                  <Text style={{ color: "#666" }}>{item.grupo_muscular}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>

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
  statusBarContainer: {
    backgroundColor: "#007AFF",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
