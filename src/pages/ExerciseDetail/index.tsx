import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

export default function ExerciseDetail({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { exercise } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{exercise.nome}</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {exercise.video_gif_url ? (
          <Image
            source={{ uri: exercise.video_gif_url }}
            style={styles.exerciseGif}
            contentFit="contain"
          />
        ) : (
          <View style={styles.gifPlaceholder}>
            <Text style={{ color: "#aaa" }}>GIF não disponível</Text>
          </View>
        )}
        <Text style={styles.description}>{exercise.descricao}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 18, fontWeight: "600", color: "#333" },
  content: { padding: 16 },
  exerciseGif: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 24,
  },
  gifPlaceholder: {
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  description: { fontSize: 16, color: "#333" },
});
