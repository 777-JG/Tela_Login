import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ExerciseCardProps {
  nome: string;
  descricao: string;
  series: number;
  repeticoes: string;
  videoGifUrl?: string;
  onPress?: () => void;
}

export default function ExerciseCard({
  nome,
  series,
  repeticoes,
  onPress,
}: ExerciseCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{nome}</Text>

          <View style={styles.details}>
            <Text style={styles.detailText}>{series} séries</Text>
            <Text style={styles.detailText}>{repeticoes} repetições</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  gif: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
});
