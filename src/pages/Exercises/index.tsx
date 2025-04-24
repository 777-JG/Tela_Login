import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import BottomNavigation from "../../components/BottomNavigation";

type Exercise = {
  id: string;
  name: string;
  muscle_group: string;
  description: string;
  image_url: string;
};

export default function Exercises({ navigation }: { navigation: any }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("all");
  const [loading, setLoading] = useState(true);

  const muscleGroups = [
    { id: "all", name: "Todos" },
    { id: "chest", name: "Peito" },
    { id: "back", name: "Costas" },
    { id: "legs", name: "Pernas" },
    { id: "shoulders", name: "Ombros" },
    { id: "arms", name: "Braços" },
    { id: "abs", name: "Abdômen" },
  ];

  useEffect(() => {
    fetchExercises();
  }, [selectedMuscleGroup]);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      let query = supabase.from("exercises").select("*");

      if (selectedMuscleGroup !== "all") {
        query = query.eq("muscle_group", selectedMuscleGroup);
      }

      const { data, error } = await query;

      if (error) throw error;
      setExercises(data || []);
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderExerciseCard = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => navigation.navigate("ExerciseDetail", { exercise: item })}
    >
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseMuscleGroup}>{item.muscle_group}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#007AFF" />

      {/* Header com Pesquisa */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar exercícios..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filtros de Grupo Muscular */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {muscleGroups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={[
              styles.filterButton,
              selectedMuscleGroup === group.id && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedMuscleGroup(group.id)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedMuscleGroup === group.id &&
                  styles.filterButtonTextActive,
              ]}
            >
              {group.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de Exercícios */}
      {loading ? (
        <View style={styles.centerContent}>
          <Text>Carregando exercícios...</Text>
        </View>
      ) : filteredExercises.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="fitness-outline" size={48} color="#666" />
          <Text style={styles.emptyText}>Nenhum exercício encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={filteredExercises}
          renderItem={renderExerciseCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.exerciseList}
        />
      )}

      <BottomNavigation currentRoute="Exercises" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  filterContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  filterButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "#fff",
  },
  exerciseList: {
    padding: 15,
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  exerciseMuscleGroup: {
    fontSize: 14,
    color: "#666",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
});
