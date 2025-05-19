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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import BottomNavigation from "../../components/BottomNavigation";
import { LinearGradient } from "expo-linear-gradient";

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
    name: "Ombros",
    image: require("../../assets/ombro.jpg"),
  },
  {
    id: "4",
    name: "Bíceps",
    image: require("../../assets/biceps.jpg"),
  },
  {
    id: "5",
    name: "Tríceps",
    image: require("../../assets/triceps.jpg"),
  },
  {
    id: "6",
    name: "Antebraço",
    image: require("../../assets/antebraco.jpg"),
  },
  {
    id: "7",
    name: "Trapézio",
    image: require("../../assets/trapezio.jpg"),
  },
  {
    id: "8",
    name: "Lombar",
    image: require("../../assets/lombar.jpg"),
  },
  {
    id: "9",
    name: "Pernas",
    image: require("../../assets/quadriceps.jpg"),
  },
  {
    id: "10",
    name: "Glúteos",
    image: require("../../assets/gluteos.jpg"),
  },
  {
    id: "11",
    name: "Panturrilha",
    image: require("../../assets/panturrilha.jpg"),
  },
];

export default function Exercises({ navigation }: { navigation: any }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("all");
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMuscleGroups = muscleGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMuscleGroup = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.muscleGroupCard}
      onPress={() =>
        navigation.navigate("ExerciseList", { muscleGroup: item.name })
      }
    >
      <Image source={item.image} style={styles.muscleGroupImage} />
      <View style={styles.muscleGroupOverlay}>
        <Text style={styles.muscleGroupName}>{item.name}</Text>
      </View>
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
      <View style={[styles.statusBarContainer, { height: insets.top }]}>
        <StatusBar style="dark" />
      </View>

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
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
          placeholder="Procurar..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Muscle Groups List */}
      <FlatList
        data={filteredMuscleGroups}
        renderItem={renderMuscleGroup}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.muscleGroupsGrid}
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

      <View style={styles.bottomGradient}>
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.9)", "#fff"]}
          style={styles.gradient}
        />
      </View>
      <BottomNavigation currentRoute="Exercises" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarContainer: {
    backgroundColor: "#007AFF",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
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
  muscleGroupsGrid: {
    padding: 8,
    paddingBottom: 80,
  },
  muscleGroupCard: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    height: 160,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  muscleGroupImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  muscleGroupOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
  },
  muscleGroupName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  exerciseList: {
    padding: 15,
    paddingBottom: 80,
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
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    pointerEvents: "none",
  },
  gradient: {
    flex: 1,
  },
});
