import { StatusBar } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import 'react-native-url-polyfill/auto';
import { supabase } from './src/lib/supabase';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="lightgray" />
      <Routes />
    </NavigationContainer>
  );
}
