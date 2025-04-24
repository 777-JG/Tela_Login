import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

type BottomNavigationProps = {
  currentRoute: string;
};

export default function BottomNavigation({
  currentRoute,
}: BottomNavigationProps) {
  const navigation = useNavigation();

  const navItems = [
    {
      name: "Home",
      icon: "menu",
      label: "Menu",
      route: "Home",
    },
    {
      name: "Favorites",
      icon: "star",
      label: "Favoritos",
      route: "Favorites",
    },
    {
      name: "Exercises",
      icon: "barbell-outline",
      label: "Exercícios",
      route: "Exercises",
    },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = currentRoute === item.route;
        return (
          <TouchableOpacity
            key={item.name}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => navigation.navigate(item.route as never)}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={isActive ? "#007AFF" : "#333"}
            />
            <Text style={[styles.navText, isActive && styles.navTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  navText: {
    fontSize: 12,
    color: "#333",
    marginTop: 4,
  },
  navTextActive: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
