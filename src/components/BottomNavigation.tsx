import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
      icon: "menu-outline",
      activeIcon: "menu",
      label: "Menu",
      route: "Home",
    },
    {
      name: "Favorites",
      icon: "star-outline",
      activeIcon: "star",
      label: "Favoritos",
      route: "Favorites",
    },
    {
      name: "Exercises",
      icon: "barbell-outline",
      activeIcon: "barbell",
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
            <View
              style={[
                styles.iconContainer,
                isActive && styles.iconContainerActive,
              ]}
            >
              <Ionicons
                name={isActive ? (item.activeIcon as any) : (item.icon as any)}
                size={24}
                color={isActive ? "#007AFF" : "#666"}
              />
            </View>
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
    paddingVertical: 8,
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
    paddingVertical: 4,
  },
  navItemActive: {
    backgroundColor: "transparent",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  iconContainerActive: {
    backgroundColor: "#E5F1FF",
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  navTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
