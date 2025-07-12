import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function Welcome({navigation, onLogin}) {

  const handleAuthorizedPress = () => {
     onLogin?.();
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {/* Company info here */}
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button onPress={handleAuthorizedPress} title="Authorized" color="#841584">
        <Text></Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
