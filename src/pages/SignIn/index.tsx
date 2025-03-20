import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignIn() {
    navigation.replace("Home");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Animatable.View
          animation="fadeInLeft"
          delay={500}
          style={styles.containerHeader}
        >
          <Text style={styles.message}>Bem vindo(a) ao MaxMuscle</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite seu email..."
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <MaterialIcons
              name="email"
              size={20}
              color="#007AFF"
              style={styles.icon}
            />
          </View>

          <Text style={styles.title}>Senha</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite sua senha..."
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
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
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.registerText}>
              Não possui uma conta? Cadastre-se!
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
    backgroundColor: "#E3F2FD",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 10,
  },
  containerForm: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: "8%", // Mais espaço nas laterais
    paddingTop: "8%",
    // Sombra sutil
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  button: {
    height: 55,
    width: "100%",
    marginTop: 25,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    height: 45,
    textAlign: "center",
    lineHeight: 40,
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
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  icon: {
    padding: 10,
    marginRight: 10,
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
  },
});
