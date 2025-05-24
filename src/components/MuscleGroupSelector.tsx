import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface MuscleGroupSelectorProps {
  selectedGroups: string[];
  onSelectGroup: (group: string) => void;
}

// Componente para selecionar grupos musculares
const muscleGroups = [
  { id: "1", name: "Peito" },
  { id: "2", name: "Costas" },
  { id: "3", name: "Bíceps" },
  { id: "4", name: "Tríceps" },
  { id: "5", name: "Ombro" },
  { id: "6", name: "Pernas" },
  { id: "7", name: "Glúteos" },
  { id: "8", name: "Panturrilha" },
];

export default function MuscleGroupSelector({
  selectedGroups,
  onSelectGroup,
}: MuscleGroupSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione até 2 grupos musculares</Text>
      <View style={styles.grid}>
        {muscleGroups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={[
              styles.groupButton,
              selectedGroups.includes(group.name) && styles.selectedGroup,
            ]}
            onPress={() => onSelectGroup(group.name)}
            disabled={
              selectedGroups.length >= 2 && !selectedGroups.includes(group.name)
            }
          >
            <Text
              style={[
                styles.groupText,
                selectedGroups.includes(group.name) && styles.selectedGroupText,
              ]}
            >
              {group.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  groupButton: {
    width: "48%",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedGroup: {
    backgroundColor: "#007AFF",
  },
  groupText: {
    fontSize: 16,
    color: "#333",
  },
  selectedGroupText: {
    color: "#fff",
  },
});
