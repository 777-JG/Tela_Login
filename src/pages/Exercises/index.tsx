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

const muscleGroups = [
  {
    id: "1",
    name: "Peito",
    image: require("../../assets/peito.jpg"),
  },
  {
    id: "2",
    name: "Costas",
    image: require("../../assets/costas.jpg"),
  },
  {
    id: "3",
    name: "Pernas",
    image: require("../../assets/quadriceps.jpg"),
  },
  {
    id: "4",
    name: "Glúteos",
    image: require("../../assets/gluteos.jpg"),
  },
  {
    id: "5",
    name: "Ombros",
    image: require("../../assets/ombro.jpg"),
  },
  {
    id: "6",
    name: "Bíceps",
    image: require("../../assets/biceps.jpg"),
  },
];

export default function Exercises({ navigation }: { navigation: any }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("all");
  const [loading, setLoading] = useState(true);

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

  const filteredMuscleGroups = muscleGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMuscleGroup = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.muscleGroupItem}
      onPress={() =>
        navigation.navigate("ExerciseList", { muscleGroup: item.name })
      }
    >
      <Image source={item.image} style={styles.muscleIcon} />
      <Text style={styles.muscleGroupName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
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
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exercícios</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Procurar"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Muscle Groups List */}
      <FlatList
        data={filteredMuscleGroups}
        renderItem={renderMuscleGroup}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

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
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  listContainer: {
    paddingTop: 8,
  },
  muscleGroupItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  muscleIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  muscleGroupName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
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
