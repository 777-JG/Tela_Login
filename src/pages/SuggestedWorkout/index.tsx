import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MuscleGroupSelector from "../../components/MuscleGroupSelector";
import ExerciseCard from "../../components/ExerciseCard";
import { getWorkoutSuggestions } from "../../services/workoutService";
import { useNavigation } from "@react-navigation/native";

export default function SuggestedWorkout() {
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
      <Text style={styles.title}>Sugestão de Treino</Text>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
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
});
