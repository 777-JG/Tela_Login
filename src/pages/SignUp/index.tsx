import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp({ navigation }: { navigation: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  function handleSignUp() {}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Animatable.View
            animation="fadeInLeft"
            delay={500}
            style={styles.containerHeader}
          >
            <Pressable
              style={styles.buttonBack}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </Pressable>

            <Text style={styles.message}>Cadastre-se agora!</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <Text style={styles.title}>Nome completo:</Text>
            <TextInput
              placeholder="Digite seu nome..."
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.title}>Email:</Text>
            <TextInput
              placeholder="Digite seu email..."
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.title}>Senha:</Text>
            <TextInput
              placeholder="Digite sua senha..."
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

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
  containerHeader: {
    marginTop: "8%",
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    minHeight: "100%",
    paddingBottom: "100%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 50,
    marginBottom: 16,
    fontSize: 16,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  buttonBack: {
    marginTop: 5,
    padding: 8,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
});
