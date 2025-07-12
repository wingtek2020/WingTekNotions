// screens/Inspirations.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Inspirations() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Inspirations!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
  },
});
