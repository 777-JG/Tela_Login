import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Welcome">;

export default function Welcome() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Text style={styles.appName} animation="flipInY" delay={500}>
          MaxMuscle
        </Animatable.Text>
        <Animatable.Text
          style={styles.slogan}
          animation="fadeInUp"
          delay={1000}
        >
          Mais do que um app, um parceiro de treino.
        </Animatable.Text>
      </View>
      <Animatable.View
        style={styles.containerForm}
        animation="fadeInUp"
        delay={600}
      >
        <Text style={styles.title}>Bem vindo(a) de volta!</Text>
        <Text style={styles.text}>Faça login para continuar</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  containerLogo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007AFF",
  },
  slogan: {
    fontSize: 18,
    color: "#555",
    fontStyle: "italic",
    marginTop: 5,
  },
  containerForm: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
  },
  text: {
    color: "#a1a1a1",
    fontSize: 20,
    fontWeight: "600",
  },
  button: {
    height: 50,
    width: "80%",
    marginTop: 25,
    marginLeft: "10%",
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
    color: "white",
    fontWeight: "bold",
  },
});
