import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MuscleGroupSelector from "../../components/MuscleGroupSelector";
import ExerciseCard from "../../components/ExerciseCard";
import { getWorkoutSuggestions } from "../../services/workoutService";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function SuggestedWorkout() {
  const insets = useSafeAreaInsets();
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigation = useNavigation();

  const handleSelectGroup = async (group: string) => {
    let newSelectedGroups = [...selectedGroups];

    if (selectedGroups.includes(group)) {
      newSelectedGroups = selectedGroups.filter((g) => g !== group);
    } else if (selectedGroups.length < 2) {
      newSelectedGroups.push(group);
    }

    setSelectedGroups(newSelectedGroups);

    if (newSelectedGroups.length > 0) {
      const data = await getWorkoutSuggestions(newSelectedGroups);
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.statusBarContainer, { height: insets.top }]}>
        <StatusBar style="light" />
      </View>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sugestão de Treino</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MuscleGroupSelector
          selectedGroups={selectedGroups}
          onSelectGroup={handleSelectGroup}
        />
        <View style={styles.suggestionsContainer}>
          {suggestions.length === 0 && (
            <Text style={styles.infoText}>
              Selecione até 2 grupos musculares para ver sugestões de treino.
            </Text>
          )}
          {suggestions.map((suggestion, index) => (
            <ExerciseCard
              key={index}
              nome={suggestion.exercicio?.nome || suggestion.nome}
              descricao={
                suggestion.exercicio?.descricao || suggestion.descricao || ""
              }
              series={suggestion.series}
              repeticoes={suggestion.repeticoes}
              videoGifUrl={
                suggestion.exercicio?.video_gif_url ||
                suggestion.video_gif_url ||
                ""
              }
              onPress={() =>
                (navigation as any).navigate("ExerciseDetail", {
                  exercise: {
                    ...suggestion,
                    ...suggestion.exercicio,
                  },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  title: {},
  scrollContent: {
    paddingBottom: 20,
  },
  suggestionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  infoText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
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
    marginBottom: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    flex: 1,
    paddingTop: 10,
  },
});
