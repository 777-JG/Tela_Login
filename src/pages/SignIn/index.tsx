import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";

export default function SignIn({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Erro ao logar", error.message);
      return;
    }

    const { data: usuario, error: userError } = await supabase
      .from("usuario")
      .select("*")
      .eq("email", email)
      .single();

    if (userError || !usuario) {
      Alert.alert("Erro", "Usuário não cadastrado no sistema.");
      return;
    }

    navigation.replace("Home");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#007AFF" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Animatable.View animation="fadeInDown" delay={300}>
          <ImageBackground
            source={require("../../assets/topLogin.jpg")}
            style={styles.headerImage}
            imageStyle={styles.headerImgStyle}
          >
            <View style={styles.overlay}>
              <Text style={styles.message}>Bem vindo(a) ao MaxMuscle!</Text>
            </View>
          </ImageBackground>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.form}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite seu email..."
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <MaterialIcons
              name="email"
              size={20}
              color="#007AFF"
              style={styles.icon}
            />
          </View>

          <Text style={styles.label}>Senha:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite sua senha..."
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={20}
              color="#007AFF"
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.registerText}>
              Não tem uma conta? Cadastre-se!
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headerImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  headerImgStyle: {
    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  overlay: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  message: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  form: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: "8%",
    paddingTop: "8%",
  },
  label: {
    fontSize: 20,
    marginTop: 28,
    color: "#333",
    fontWeight: "600",
  },
  inputContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    backgroundColor: "#fafafa",
    marginTop: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 50,
  },
  icon: {
    padding: 5,
  },
  button: {
    height: 55,
    width: "100%",
    marginTop: 25,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  buttonRegister: {
    alignSelf: "center",
    marginTop: 14,
    paddingVertical: 10,
  },
  registerText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
});
