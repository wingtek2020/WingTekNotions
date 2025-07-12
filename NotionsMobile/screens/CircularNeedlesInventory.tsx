import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Block from "../components/Block";
import Text from "../components/Text";
import Button from "../components/Button";

interface Needle {
  id: string;
  size: string;
  length: string;
}

const STORAGE_KEY = "needles_inventory";

const CircularNeedlesInventory: React.FC = () => {
  const [needles, setNeedles] = useState<Needle[]>([]);
  const [size, setSize] = useState("");
  const [length, setLength] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadNeedles();
  }, []);

  const loadNeedles = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setNeedles(JSON.parse(stored));
    } catch (e) {
      Alert.alert("Error", "Failed to load needles");
    }
  };

  const saveNeedles = async (newNeedles: Needle[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newNeedles));
      setNeedles(newNeedles);
    } catch (e) {
      Alert.alert("Error", "Failed to save needles");
    }
  };

  const onAddOrUpdate = () => {
    if (!size.trim() || !length.trim()) {
      Alert.alert("Validation", "Please enter size and length");
      return;
    }

    if (editingId) {
      // Update existing
      const updated = needles.map((n) =>
        n.id === editingId ? { ...n, size, length } : n
      );
      saveNeedles(updated);
      setEditingId(null);
    } else {
      // Add new
      const newNeedle = {
        id: Date.now().toString(),
        size,
        length,
      };
      saveNeedles([...needles, newNeedle]);
    }
    setSize("");
    setLength("");
  };

  const onEdit = (needle: Needle) => {
    setSize(needle.size);
    setLength(needle.length);
    setEditingId(needle.id);
  };

  const onDelete = (id: string) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const filtered = needles.filter((n) => n.id !== id);
          saveNeedles(filtered);
        },
      },
    ]);
  };

  return (
    <Block padding={16} flex>
      <Text h4 marginBottom={16}>
        Circular Needles Inventory
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Size (e.g. 6 mm)"
        value={size}
        onChangeText={setSize}
      />

      <TextInput
        style={styles.input}
        placeholder="Length (e.g. 24 inches)"
        value={length}
        onChangeText={setLength}
      />

      <Button onPress={onAddOrUpdate} marginBottom={24}>
        <Text white center>
          {editingId ? "Update Needle" : "Add Needle"}
        </Text>
      </Button>

      <FlatList
        data={needles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Block
            row
            justify="space-between"
            padding={12}
            marginBottom={12}
            card
            borderRadius={8}
          >
            <View>
              <Text bold>{item.size}</Text>
              <Text gray>{item.length}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onEdit(item)}
              >
                <Text color="blue">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginLeft: 12 }]}
                onPress={() => onDelete(item.id)}
              >
                <Text color="red">Delete</Text>
              </TouchableOpacity>
            </View>
          </Block>
        )}
        ListEmptyComponent={
          <Text center gray>
            No needles added yet.
          </Text>
        }
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
  },
  button: {
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});

export default CircularNeedlesInventory;
