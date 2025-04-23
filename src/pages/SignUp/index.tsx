import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../../lib/supabase";

export default function SignUp({ navigation }: { navigation: any }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignUp() {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (signUpError) {
      Alert.alert("Erro ao cadastrar", signUpError.message);
      return;
    }

    const { error: insertError } = await supabase.from("usuario").insert({
      nome,
      email,
      senha: "sem-uso",
      tipo: "aluno",
      permissoes: "comum",
    });

    if (insertError) {
      Alert.alert("Erro ao salvar no banco", insertError.message);
      return;
    }

    Alert.alert("Cadastro realizado!", "Agora você pode fazer login.");
    navigation.replace("SignIn");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#007AFF" />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Animatable.View animation="fadeInDown" delay={300}>
            <ImageBackground
              source={require("../../assets/topCadastro.jpg")}
              style={styles.headerImage}
              imageStyle={styles.headerImgStyle}
            >
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#007AFF" />
              </TouchableOpacity>
              <View style={styles.overlay}>
                <Text style={styles.title}>Cadastre-se agora!</Text>
              </View>
            </ImageBackground>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" style={styles.form}>
            <Text style={styles.label}>Nome completo:</Text>
            <TextInput
              placeholder="Digite seu nome..."
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
              placeholder="Digite seu email..."
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Senha:</Text>
            <View style={{ position: "relative" }}>
              <TextInput
                placeholder="Digite sua senha..."
                style={styles.input}
                secureTextEntry={!showPassword}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity
                style={styles.togglePassword}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#007AFF"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  headerImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  headerImgStyle: {
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  form: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: "5%",
    minHeight: "100%",
  },
  label: {
    fontSize: 20,
    marginTop: 28,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#fafafa",
  },
  togglePassword: {
    position: "absolute",
    right: 16,
    top: 18,
    padding: 10,
    zIndex: 1,
  },
  button: {
    height: 55,
    width: "100%",
    marginTop: 25,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
    borderRadius: 12,
  },
});
