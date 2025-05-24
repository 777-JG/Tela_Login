import { supabase } from "../lib/supabase";
// Serviço para buscar sugestões de treino com base nos grupos musculares
export const getWorkoutSuggestions = async (gruposMusculares: string[]) => {
  try {
    const { data, error } = await supabase
      .from("sugestao_treino")
      .select("*, exercicio(*)")
      .in("grupo_muscular", gruposMusculares);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erro ao buscar sugestões de treino:", error);
    return [];
  }
};
