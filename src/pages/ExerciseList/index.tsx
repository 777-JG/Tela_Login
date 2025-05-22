import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExerciseList({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  // 1. Obter o grupo muscular selecionado
  const { muscleGroup } = route.params;
  // 2. Definir estado para armazenar os exercícios
  const [exercises, setExercises] = useState<any[]>([]);
  // 3. Definir estado para armazenar a consulta de pesquisa
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchExercises();
  }, []);
  // 4. Buscar exercícios do grupo muscular selecionado
  const fetchExercises = async () => {
    const { data, error } = await supabase
      .from("exercicio")
      .select("id, nome, descricao, grupo_muscular, video_gif_url")
      .eq("grupo_muscular", muscleGroup);

    if (!error) setExercises(data || []);
    else console.error("Erro ao buscar exercícios:", error);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("ExerciseDetail", { exercise: item })}
    >
      <Text style={styles.name}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{muscleGroup}</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Procurar exercício..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
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
  list: { padding: 8 },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  name: { fontSize: 16, color: "#333", fontWeight: "bold" },
  description: { fontSize: 14, color: "#666", marginTop: 4 },
});
