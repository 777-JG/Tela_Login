import React, { useState, useEffect } from "react";
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
import { supabase } from "../../lib/supabase";

export default function ExerciseDetail({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { exercise } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const getUsuarioIdInt = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: usuarioData, error: usuarioError } = await supabase
      .from("usuario")
      .select("id")
      .eq("email", user.email)
      .single();

    if (usuarioError || !usuarioData) {
      console.error("Erro ao buscar usuário na tabela usuario:", usuarioError);
      return null;
    }

    return usuarioData.id;
  };

  const checkIfFavorite = async () => {
    try {
      const usuarioIdInt = await getUsuarioIdInt();
      if (!usuarioIdInt) return;

      const { data, error } = await supabase
        .from("favorito")
        .select("*")
        .eq("usuario_id", usuarioIdInt)
        .eq("exercicio_id", exercise.id)
        .maybeSingle();

      if (error) throw error;
      setIsFavorite(!!data);
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const usuarioIdInt = await getUsuarioIdInt();
      if (!usuarioIdInt) return;

      const exercicioIdInt =
        typeof exercise.id === "string" ? parseInt(exercise.id) : exercise.id;

      if (isFavorite) {
        // Remover dos favoritos
        const { error } = await supabase
          .from("favorito")
          .delete()
          .eq("usuario_id", usuarioIdInt)
          .eq("exercicio_id", exercicioIdInt);

        if (error) throw error;
      } else {
        // Adicionar aos favoritos
        const { error } = await supabase.from("favorito").insert([
          {
            usuario_id: usuarioIdInt,
            exercicio_id: exercicioIdInt,
          },
        ]);

        if (error) throw error;
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{exercise.nome}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#ff3b30" : "#333"}
          />
        </TouchableOpacity>
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
