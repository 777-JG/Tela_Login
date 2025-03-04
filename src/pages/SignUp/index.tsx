import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp({ navigation }: { navigation: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSignUp() {
    setLoading(true);
    const idadeMinima = 14;

    if (!name || !email || !password || !idade || !peso || !altura) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }
    if (parseInt(idade) < idadeMinima) {
      Alert.alert(
        "idade mínima",
        `A idade mínima para o cadastro é ${idadeMinima} anos.`
      );
      return;
    }
  }

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

            <Text style={styles.title}>Idade:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua idade..."
              keyboardType="numeric"
              value={idade}
              onChangeText={setIdade}
            />

            <Text style={styles.title}>Peso (kg):</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu peso..."
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
            />
            <Text style={styles.title}>Altura (cm):</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua altura"
              keyboardType="numeric"
              value={altura}
              onChangeText={setAltura}
            />

            <Text style={styles.title}>Email:</Text>
            <TextInput
              placeholder="Digite seu email..."
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.title}>Senha:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Digite sua senha..."
                style={[
                  styles.textInputPassword,
                  { flex: 1, paddingHorizontal: 16 },
                ]}
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

  icon: {
    padding: 10,
    marginRight: 10,
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
  textInputPassword: {
    fontSize: 16,
  },
});
